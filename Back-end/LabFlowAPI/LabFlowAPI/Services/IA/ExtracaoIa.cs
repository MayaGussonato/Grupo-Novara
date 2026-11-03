using System.Text.Json.Serialization;

namespace LabFlowAPI.Services.IA;

/// <summary>
/// Contrato de saída da IA. Cada campo traz o valor e o trecho do documento de onde ele
/// saiu — é isso que permite conferir depois se houve invenção.
/// Campo ausente no documento deve vir com Valor = null.
/// </summary>
public sealed class ExtracaoIa
{
    [JsonPropertyName("tipo_documento")]
    public string? TipoDocumento { get; set; }

    [JsonPropertyName("numero_documento")]
    public CampoExtraido? NumeroDocumento { get; set; }

    [JsonPropertyName("data_emissao")]
    public CampoExtraido? DataEmissao { get; set; }

    [JsonPropertyName("nome")]
    public CampoExtraido? Nome { get; set; }

    [JsonPropertyName("cpf")]
    public CampoExtraido? Cpf { get; set; }

    [JsonPropertyName("cnpj")]
    public CampoExtraido? Cnpj { get; set; }

    [JsonPropertyName("valor_total")]
    public CampoExtraido? ValorTotal { get; set; }

    [JsonPropertyName("observacoes")]
    public string? Observacoes { get; set; }
}

/// <summary>Um campo extraído e a prova de onde ele estava no documento.</summary>
public sealed class CampoExtraido
{
    [JsonPropertyName("valor")]
    public string? Valor { get; set; }

    /// <summary>Trecho literal do documento de onde o valor foi lido. null = não encontrado.</summary>
    [JsonPropertyName("trecho_origem")]
    public string? TrechoOrigem { get; set; }

    [JsonPropertyName("confianca")]
    public double? Confianca { get; set; }
}
