using System.Text.Json;
using System.Text.Json.Nodes;
using LabFlowAPI.Services.IA;
using LabFlowAPI.Utils;

namespace LabFlowAPI.Services.Processamento;

/// <summary>Resultado da conferência de uma extração da IA.</summary>
public sealed class ConferenciaExtracao
{
    /// <summary>JSON final gravado em Extracao.Dados_Estruturados.</summary>
    public string JsonFinal { get; init; } = "{}";

    /// <summary>Confiança de 0 a 100 considerando todos os campos.</summary>
    public decimal NivelConfianca { get; init; }

    /// <summary>Campos que não puderam ser confirmados no documento.</summary>
    public List<string> CamposRejeitados { get; init; } = [];

    /// <summary>True quando há motivo para revisão humana.</summary>
    public bool PrecisaRevisaoHumana => CamposRejeitados.Count > 0 || NivelConfianca < LimiteConfianca;

    public const decimal LimiteConfianca = 90m;
}

/// <summary>
/// Confere o que a IA devolveu contra o texto do documento.
///
/// Esta é a etapa que impede a alucinação de chegar ao banco: todo campo precisa de um
/// trecho de origem que exista de verdade no texto. Campo sem prova vira null.
/// </summary>
public interface IConferenciaExtracao
{
    ConferenciaExtracao Conferir(ExtracaoIa extracao, string textoDocumento);
}

public class ConferenciaExtracaoService : IConferenciaExtracao
{
    public ConferenciaExtracao Conferir(ExtracaoIa extracao, string textoDocumento)
    {
        var textoNormalizado = Normalizar(textoDocumento);

        var rejeitados = new List<string>();
        var confiancas = new List<double>();

        var campos = new (string Nome, CampoExtraido? Campo)[]
        {
            ("numero_documento", extracao.NumeroDocumento),
            ("data_emissao", extracao.DataEmissao),
            ("nome", extracao.Nome),
            ("cpf", extracao.Cpf),
            ("cnpj", extracao.Cnpj),
            ("valor_total", extracao.ValorTotal)
        };

        var json = new JsonObject
        {
            ["tipo_documento"] = extracao.TipoDocumento,
            ["observacoes"] = extracao.Observacoes
        };

        foreach (var (nome, campo) in campos)
        {
            var conferido = ConferirCampo(nome, campo, textoNormalizado, rejeitados, confiancas);

            json[nome] = conferido;
        }

        return new ConferenciaExtracao
        {
            JsonFinal = json.ToJsonString(new JsonSerializerOptions { WriteIndented = false }),
            NivelConfianca = CalcularConfianca(confiancas),
            CamposRejeitados = rejeitados
        };
    }

    private static JsonNode? ConferirCampo(
        string nome,
        CampoExtraido? campo,
        string textoNormalizado,
        List<string> rejeitados,
        List<double> confiancas)
    {
        if (campo is null || string.IsNullOrWhiteSpace(campo.Valor))
        {
            // Campo ausente é legítimo: a IA não encontrou e devolveu null
            return null;
        }

        var valor = campo.Valor.Trim();
        var trecho = campo.TrechoOrigem?.Trim();

        // 1. O trecho de origem existe literalmente no documento?
        var trechoConfere = !string.IsNullOrWhiteSpace(trecho)
                            && textoNormalizado.Contains(Normalizar(trecho), StringComparison.Ordinal);

        // 2. O valor aparece no documento (no trecho ou no texto todo)?
        var valorConfere = textoNormalizado.Contains(Normalizar(valor), StringComparison.Ordinal)
                           || (trechoConfere && Normalizar(trecho!).Contains(Normalizar(valor), StringComparison.Ordinal));

        if (!trechoConfere && !valorConfere)
        {
            // Sem prova no documento: descarta o campo em vez de confiar na IA
            rejeitados.Add(nome);
            confiancas.Add(0);
            return null;
        }

        var confianca = campo.Confianca ?? 0.5;

        // Trecho não literal reduz a confiança: pode ser valor deduzido
        if (!trechoConfere)
        {
            confianca = Math.Min(confianca, 0.5);
            rejeitados.Add(nome);
        }

        confianca = Math.Clamp(confianca, 0, 1);
        confiancas.Add(confianca);

        var normalizado = NormalizarCampo(nome, valor);

        if (normalizado is null)
        {
            // Formato inválido (ex.: CPF com dígito errado): preserva o valor original,
            // marca baixa confiança e manda para revisão humana
            rejeitados.Add(nome);
            confiancas[^1] = Math.Min(confianca, 0.3);
        }

        return new JsonObject
        {
            ["valor"] = valor,
            ["valor_normalizado"] = normalizado,
            ["trecho_origem"] = trecho,
            ["confianca"] = Math.Round(confianca, 2),
            ["conferido"] = trechoConfere
        };
    }

    /// <summary>
    /// Padronização determinística. Devolve null quando o valor não passa na validação
    /// (aí o campo fica como suspeito, mas o valor original é preservado).
    /// </summary>
    private static string? NormalizarCampo(string nome, string valor) => nome switch
    {
        "cpf" => ValidadorDocumentos.FormatarCpf(valor),
        "cnpj" => ValidadorDocumentos.FormatarCnpj(valor),
        _ => valor
    };

    private static decimal CalcularConfianca(List<double> confiancas)
    {
        if (confiancas.Count == 0)
        {
            // Nenhum campo preenchido: não há como confiar na extração
            return 0m;
        }

        var media = confiancas.Average() * 100;

        return Math.Round((decimal)Math.Clamp(media, 0, 100), 2);
    }

    /// <summary>
    /// Normaliza para comparação: minúsculas, sem acento e sem espaços repetidos.
    /// Assim "R$ 1.500,00" e "r$  1.500,00" contam como iguais.
    /// </summary>
    private static string Normalizar(string texto)
    {
        var semAcento = new string(texto
            .Normalize(System.Text.NormalizationForm.FormD)
            .Where(c => System.Globalization.CharUnicodeInfo.GetUnicodeCategory(c)
                        != System.Globalization.UnicodeCategory.NonSpacingMark)
            .ToArray());

        return System.Text.RegularExpressions.Regex
            .Replace(semAcento.ToLowerInvariant(), @"\s+", " ")
            .Trim();
    }
}
