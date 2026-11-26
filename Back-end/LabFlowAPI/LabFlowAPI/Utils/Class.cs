using System.Globalization;
using System.Text;

namespace LabFlowAPI.Utils;

public static class NormalizadorAtendimento
{
    private static readonly Dictionary<string, string> CategoriasMap = new()
    {
        ["duvidasdocumentos"] = "DuvidasDocumentos",
        ["duvidassobredocumentos"] = "DuvidasDocumentos",
        ["falhasvalidacao"] = "FalhasValidacao",
        ["falhasdevalidacao"] = "FalhasValidacao",
        ["acessologin"] = "AcessoLogin",
        ["acessoelogin"] = "AcessoLogin",
        ["plataforma"] = "Plataforma"
    };

    private static readonly Dictionary<string, string> PrioridadesMap = new()
    {
        ["baixa"] = "Baixa",
        ["media"] = "Media",
        ["alta"] = "Alta"
    };

    private static readonly Dictionary<string, string> StatusMap = new()
    {
        ["aberto"] = "Aberto",
        ["emandamento"] = "EmAndamento",
        ["resolvido"] = "Resolvido",
        ["fechado"] = "Fechado"
    };

    public static string? Categoria(string? valor) => Resolver(CategoriasMap, valor);
    public static string? Prioridade(string? valor) => Resolver(PrioridadesMap, valor);
    public static string? Status(string? valor) => Resolver(StatusMap, valor);

    private static string? Resolver(Dictionary<string, string> mapa, string? valor)
    {
        if (string.IsNullOrWhiteSpace(valor)) return null;

        return mapa.TryGetValue(Chave(valor), out var canonico) ? canonico : null;
    }

    private static string Chave(string valor)
    {
        var sb = new StringBuilder();

        foreach (var c in valor.Trim().Normalize(NormalizationForm.FormD))
        {
            if (CharUnicodeInfo.GetUnicodeCategory(c) == UnicodeCategory.NonSpacingMark) continue;

            if (char.IsLetterOrDigit(c)) sb.Append(char.ToLowerInvariant(c));
        }

        return sb.ToString();
    }
}