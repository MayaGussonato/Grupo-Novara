namespace LabFlowAPI.Services.IA;

/// <summary>Exemplo de extração aprovada por um revisor, usado no few-shot.</summary>
public sealed class ExemploFewShot
{
    public string TextoDocumento { get; init; } = string.Empty;

    public string JsonAprovado { get; init; } = string.Empty;
}

/// <summary>
/// Contrato da LHAMA IA para extração de documentos.
/// Diferente do chat livre (ILanguageModelService): aqui a saída é sempre JSON no schema.
/// </summary>
public interface ILhamaIa
{
    /// <summary>
    /// Extrai campos estruturados de um texto de documento.
    /// Tenta o provedor preferido e, se ele falhar, cai para o próximo da lista.
    /// </summary>
    /// <param name="textoDocumento">Texto já lido do arquivo.</param>
    /// <param name="tipoDocumento">Dica opcional (ex.: "Nota Fiscal").</param>
    /// <param name="exemplos">Correções aprovadas por revisores, para few-shot.</param>
    /// <returns>Extração estruturada e o nome do provedor que respondeu.</returns>
    Task<(ExtracaoIa Extracao, string Provedor)> ExtrairAsync(
        string textoDocumento,
        string? tipoDocumento,
        IEnumerable<ExemploFewShot> exemplos,
        CancellationToken cancellationToken = default);
}
