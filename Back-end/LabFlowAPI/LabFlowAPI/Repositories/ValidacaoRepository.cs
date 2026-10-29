using LabFlowAPI.Data;
using LabFlowAPI.DTO;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;

namespace LabFlowAPI.Repositories;

public class ValidacaoRepository : IValidacaoRepository
{
    private readonly LabFlowContext _context;

    public ValidacaoRepository(LabFlowContext context)
    {
        _context = context;
    }

    public List<ValidacaoPendenteDTO> ListarPendentes()
    {
        return (
            from v in _context.Validacaos
            join e in _context.Extracaos on v.IdExtracao equals e.IdExtracao
            join d in _context.Documentos on e.IdDocumento equals d.IdDocumento
            where v.Resultado == "Pendente"
            orderby e.DataExtracao
            select new ValidacaoPendenteDTO
            {
                IdValidacao = v.IdValidacao,
                IdExtracao = e.IdExtracao,
                IdDocumento = d.IdDocumento,
                NomeArquivo = d.NomeArquivo,
                TipoDocumento = d.TipoDocumento,
                NivelConfianca = e.NivelConfianca,
                DataExtracao = e.DataExtracao
            }).ToList();
    }

    public Validacao? BuscarPorId(int id)
    {
        return _context.Validacaos.Find(id);
    }

    public Validacao Decidir(
        int idValidacao,
        int idRevisor,
        string resultado,
        string? observacoes,
        string? dadosCorrigidos)
    {
        var validacao = _context.Validacaos.Find(idValidacao)
            ?? throw new InvalidOperationException("Validação não encontrada.");

        var extracao = _context.Extracaos.Find(validacao.IdExtracao)!;
        var documento = _context.Documentos.Find(extracao.IdDocumento)!;

        validacao.IdRevisor = idRevisor;
        validacao.Resultado = resultado;
        validacao.Observacoes = observacoes;
        validacao.DadosCorrigidos = dadosCorrigidos;
        validacao.DataValidacao = DateTime.Now;

        // Status do documento conforme a decisão (limitado aos valores do CHECK):
        //   Aprovado            -> Aprovado
        //   Correcao necessaria -> Revisao
        //   Reprovado           -> Erro
        documento.StatusDocumento = resultado switch
        {
            "Aprovado" => "Aprovado",
            "Correcao necessaria" => "Revisao",
            _ => "Erro"
        };

        _context.HistoricoAtividades.Add(new Historico
        {
            IdDocumento = documento.IdDocumento,
            IdUsuario = idRevisor,
            Acao = $"Validação: {resultado}",
            Detalhes = observacoes,
            DataHora = DateTime.Now
        });

        // Um único SaveChanges já é uma transação: validação, documento e histórico
        // são gravados juntos ou nenhum é.
        _context.SaveChanges();

        return validacao;
    }
}
