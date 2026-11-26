using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace LabFlowAPI.Services.IA;

/// <summary>
/// Confere se um exemplo de few-shot é seguro para ir ao prompt.
///
/// Um exemplo ruim é pior do que nenhum exemplo: se o texto mostrado não contém o
/// trecho_origem citado no JSON, a IA aprende a inventar citações — exatamente o erro
/// que o ConferenciaExtracaoService rejeita depois.
/// </summary>
public static class ValidadorExemploFewShot
{
    private static readonly JsonSerializerOptions Opcoes = new()
    {
        PropertyNameCaseInsensitive = true,
        NumberHandling = JsonNumberHandling.AllowReadingFromString
    };

    // Aceita CPF/CNPJ com ou sem máscara
    private static readonly Regex Cnpj = new(@"\b\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2}\b");
    private static readonly Regex Cpf = new(@"\b\d{3}\.?\d{3}\.?\d{3}-?\d{2}\b");

    /// <summary>Texto mínimo para um exemplo ensinar alguma coisa.</summary>
    public const int TamanhoMinimoTexto = 80;

    /// <summary>
    /// True se o JSON segue o schema, tem ao menos um campo preenchido e todo
    /// trecho_origem aparece literalmente no texto do exemplo.
    /// </summary>
    public static bool Consistente(string? texto, string? json)
    {
        if (string.IsNullOrWhiteSpace(texto) || string.IsNullOrWhiteSpace(json))
        {
            return false;
        }

        // Texto curto demais não ensina padrão nenhum
        if (texto.Trim().Length < TamanhoMinimoTexto)
        {
            return false;
        }

        try
        {
            var extracao = JsonSerializer.Deserialize<ExtracaoIa>(json, Opcoes);

            if (extracao == null)
            {
                return false;
            }

            var textoNormalizado = Normalizar(texto);
            var preenchidos = 0;

            foreach (var campo in Campos(extracao))
            {
                // Campo ausente no documento: nada a conferir
                if (campo?.Valor == null)
                {
                    continue;
                }

                // Valor sem prova de origem é invenção: descarta o exemplo
                if (string.IsNullOrWhiteSpace(campo.TrechoOrigem))
                {
                    return false;
                }

                var trecho = Normalizar(campo.TrechoOrigem);

                // O trecho precisa existir no texto que a IA vai ler
                if (!textoNormalizado.Contains(trecho, StringComparison.OrdinalIgnoreCase))
                {
                    return false;
                }

                preenchidos++;
            }

            // Zero campos preenchidos costuma significar que a correção do revisor
            // foi gravada em outro formato (não bate com o schema)
            return preenchidos > 0;
        }
        catch (JsonException)
        {
            return false;
        }
    }

    /// <summary>
    /// Troca CPF e CNPJ por valores fictícios, de forma idêntica no texto e no JSON,
    /// para que o exemplo continue consistente.
    ///
    /// Paliativo de LGPD: o documento de um usuário deixa de ir ao provedor de IA com os
    /// dados de outro. Não cobre nomes nem endereços.
    /// </summary>
    public static string Mascarar(string? valor)
    {
        if (string.IsNullOrEmpty(valor))
        {
            return valor ?? string.Empty;
        }

        // CNPJ primeiro: o padrão de CPF também casa com parte de um CNPJ
        return Cpf.Replace(Cnpj.Replace(valor, "00.000.000/0000-00"), "000.000.000-00");
    }

    /// <summary>
    /// Corta o texto SEM quebrar a prova de origem: o recorte sempre termina no fim de uma
    /// linha, para não deixar o trecho_origem "pela metade".
    /// </summary>
    public static string TruncarEmLinha(string texto, int maximo)
    {
        if (string.IsNullOrEmpty(texto) || texto.Length <= maximo)
        {
            return texto ?? string.Empty;
        }

        var corte = texto.LastIndexOf('\n', Math.Min(maximo, texto.Length - 1));

        // Sem quebra de linha no trecho: corta no espaço, para não partir uma palavra
        if (corte <= 0)
        {
            corte = texto.LastIndexOf(' ', Math.Min(maximo, texto.Length - 1));
        }

        return corte <= 0 ? texto[..maximo] : texto[..corte];
    }

    private static IEnumerable<CampoExtraido?> Campos(ExtracaoIa extracao)
    {
        yield return extracao.NumeroDocumento;
        yield return extracao.DataEmissao;
        yield return extracao.Nome;
        yield return extracao.Cpf;
        yield return extracao.Cnpj;
        yield return extracao.ValorTotal;
    }

    private static string Normalizar(string s) => Regex.Replace(s, @"\s+", " ").Trim();
}
