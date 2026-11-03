using System.Text.Json;
using LabFlowAPI.Data;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;
using LabFlowAPI.Services.Documentos;
using LabFlowAPI.Services.IA;
using LabFlowAPI.Services.Processamento;
using Microsoft.EntityFrameworkCore;

namespace LabFlowAPI.Services.Processamento;

/// <summary>Resultado do processamento de um documento.</summary>
public sealed class ResultadoProcessamento
{
    public int IdDocumento { get; init; }

    public int IdExtracao { get; init; }

    public string StatusDocumento { get; init; } = string.Empty;

    public string Tecnologia { get; init; } = string.Empty;

    public string ProvedorIa { get; init; } = string.Empty;

    public decimal NivelConfianca { get; init; }

    public string? TextoExtraido { get; init; }

    public string? DadosEstruturados { get; init; }

    public List<string> CamposRejeitados { get; init; } = [];

    public bool PrecisaRevisaoHumana { get; init; }
}

public sealed class ProcessamentoException : Exception
{
    public int CodigoHttp { get; }

    public ProcessamentoException(string mensagem, int codigoHttp = 400) : base(mensagem)
    {
        CodigoHttp = codigoHttp;
    }
}

public interface IProcessadorDocumento
{
    Task<ResultadoProcessamento> ProcessarAsync(
        int idDocumento,
        string caminhoCompletoArquivo,
        int idUsuario,
        CancellationToken cancellationToken = default);
}

/// <summary>
/// Orquestra o fluxo da LHAMA IA:
/// ler o arquivo → extrair com IA → conferir contra o original → gravar em Extracao.
///
/// O arquivo é aberto somente para leitura; nada é escrito nele.
/// </summary>
public class ProcessadorDocumento : IProcessadorDocumento
{
    /// <summary>Quantos exemplos aprovados entram no prompt (few-shot).</summary>
    private const int LimiteExemplosFewShot = 3;

    private readonly ILeitorDocumento _leitor;
    private readonly ILhamaIa _ia;
    private readonly IConferenciaExtracao _conferencia;
    private readonly IExtracaoRepository _extracaoRepository;
    private readonly LabFlowContext _context;
    private readonly ILogger<ProcessadorDocumento> _log;

    public ProcessadorDocumento(
        ILeitorDocumento leitor,
        ILhamaIa ia,
        IConferenciaExtracao conferencia,
        IExtracaoRepository extracaoRepository,
        LabFlowContext context,
        ILogger<ProcessadorDocumento> log)
    {
        _leitor = leitor;
        _ia = ia;
        _conferencia = conferencia;
        _extracaoRepository = extracaoRepository;
        _context = context;
        _log = log;
    }

    public async Task<ResultadoProcessamento> ProcessarAsync(
        int idDocumento,
        string caminhoCompletoArquivo,
        int idUsuario,
        CancellationToken cancellationToken = default)
    {
        // 1. Ler o documento (nunca escreve no arquivo)
        var leitura = await _leitor.LerAsync(caminhoCompletoArquivo, cancellationToken);

        if (leitura.Falhou)
        {
            throw new ProcessamentoException(
                leitura.MensagemErro ?? "Não foi possível ler o arquivo.", 422);
        }

        if (leitura.PrecisaOcr)
        {
            // OCR ainda não faz parte deste pipeline: o documento fica sem extração
            throw new ProcessamentoException(
                $"{leitura.MensagemErro} O OCR de imagens e PDFs digitalizados ainda não está habilitado.", 422);
        }

        var documento = await _context.Documentos
            .FirstOrDefaultAsync(d => d.IdDocumento == idDocumento && !d.Excluido, cancellationToken)
            ?? throw new ProcessamentoException("Documento não encontrado.", 404);

        // 2. Buscar correções aprovadas do mesmo tipo (few-shot)
        var exemplos = await BuscarExemplosAsync(documento.TipoDocumento, cancellationToken);

        // 3. Extrair com IA (Groq → Ollama, com fallback automático)
        var (extracaoIa, provedor) = await _ia.ExtrairAsync(
            leitura.Texto,
            documento.TipoDocumento,
            exemplos,
            cancellationToken);

        // 4. Conferir cada campo contra o texto original
        var conferencia = _conferencia.Conferir(extracaoIa, leitura.Texto);

        // 5. Gravar a extração (o repositório também cria a validação e move o status)
        var novaExtracao = new Extracao
        {
            IdDocumento = documento.IdDocumento,
            Tecnologia = $"LHAMA IA ({provedor}+{leitura.Tecnologia})",
            TextoExtraido = leitura.Texto,
            DadosEstruturados = conferencia.JsonFinal,
            NivelConfianca = conferencia.NivelConfianca,
            DataExtracao = DateTime.Now
        };

        _extracaoRepository.Cadastrar(novaExtracao, idUsuario);

        var statusFinal = await _context.Documentos
            .Where(d => d.IdDocumento == idDocumento)
            .Select(d => d.StatusDocumento)
            .FirstAsync(cancellationToken);

        if (conferencia.CamposRejeitados.Count > 0)
        {
            _log.LogInformation(
                "Documento {IdDocumento}: campos sem confirmação no original: {Campos}",
                idDocumento, string.Join(", ", conferencia.CamposRejeitados));
        }

        return new ResultadoProcessamento
        {
            IdDocumento = documento.IdDocumento,
            IdExtracao = novaExtracao.IdExtracao,
            StatusDocumento = statusFinal,
            Tecnologia = novaExtracao.Tecnologia,
            ProvedorIa = provedor,
            NivelConfianca = conferencia.NivelConfianca,
            TextoExtraido = leitura.Texto,
            DadosEstruturados = conferencia.JsonFinal,
            CamposRejeitados = conferencia.CamposRejeitados,
            PrecisaRevisaoHumana = conferencia.PrecisaRevisaoHumana
        };
    }

    /// <summary>
    /// Monta o few-shot com as últimas validações APROVADAS do mesmo tipo de documento.
    /// É assim que a LHAMA IA "aprende": cada correção humana vira exemplo para as próximas.
    /// </summary>
    private async Task<List<ExemploFewShot>> BuscarExemplosAsync(
        string? tipoDocumento,
        CancellationToken cancellationToken)
    {
        var consulta =
            from v in _context.Validacaos
            join e in _context.Extracaos on v.IdExtracao equals e.IdExtracao
            join d in _context.Documentos on e.IdDocumento equals d.IdDocumento
            where v.Resultado == "Aprovado"
                  && !d.Excluido
                  && e.TextoExtraido != null
                  && e.DadosEstruturados != null
            select new { e.TextoExtraido, e.DadosEstruturados, d.TipoDocumento, v.IdValidacao };

        if (!string.IsNullOrWhiteSpace(tipoDocumento))
        {
            consulta = consulta.Where(x => x.TipoDocumento == tipoDocumento);
        }

        var aprovadas = await consulta
            .OrderByDescending(x => x.IdValidacao)
            .Take(LimiteExemplosFewShot)
            .ToListAsync(cancellationToken);

        return aprovadas
            .Select(x => new ExemploFewShot
            {
                // O prompt não precisa do texto inteiro: um recorte já dá o padrão
                TextoDocumento = Truncar(x.TextoExtraido!, 1500),
                JsonAprovado = x.DadosEstruturados!
            })
            .ToList();
    }

    private static string Truncar(string texto, int tamanho)
        => texto.Length <= tamanho ? texto : texto[..tamanho];
}
