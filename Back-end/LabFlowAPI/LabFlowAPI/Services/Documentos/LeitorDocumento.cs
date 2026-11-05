using System.Text;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using UglyToad.PdfPig;

namespace LabFlowAPI.Services.Documentos;

/// <summary>Resultado da leitura de um arquivo.</summary>
public sealed class TextoDocumento
{
    public string Texto { get; init; } = string.Empty;

    /// <summary>Formato usado para a leitura: pdf, docx, xlsx, txt, imagem.</summary>
    public string Tecnologia { get; init; } = string.Empty;

    /// <summary>True quando o PDF não tinha texto embutido e é preciso OCR (etapa futura).</summary>
    public bool PrecisaOcr { get; init; }

    /// <summary>True quando o arquivo não pôde ser lido (corrompido ou formato não suportado).</summary>
    public bool Falhou { get; init; }

    public string? MensagemErro { get; init; }

    public static TextoDocumento Ok(string texto, string tecnologia) =>
        new() { Texto = texto, Tecnologia = tecnologia };

    public static TextoDocumento Ocr(string motivo) =>
        new() { Tecnologia = "nenhuma", PrecisaOcr = true, MensagemErro = motivo };

    public static TextoDocumento Erro(string mensagem) =>
        new() { Tecnologia = "nenhuma", Falhou = true, MensagemErro = mensagem };
}

public interface ILeitorDocumento
{
    /// <summary>Extrai o texto de um arquivo, sem alterá-lo (somente leitura).</summary>
    Task<TextoDocumento> LerAsync(string caminhoCompleto, CancellationToken cancellationToken = default);
}

/// <summary>
/// Leitura de texto dos formatos aceitos pela API.
/// Nunca escreve no arquivo: abre em modo somente leitura, então o documento original
/// (e o seu HashArquivo) permanecem intactos.
/// </summary>
public class LeitorDocumento : ILeitorDocumento
{
    // Texto mínimo para considerar que um PDF tem camada de texto (e não é digitalizado)
    private const int MinimoCaracteresPdf = 20;

    public async Task<TextoDocumento> LerAsync(
        string caminhoCompleto,
        CancellationToken cancellationToken = default)
    {
        if (!File.Exists(caminhoCompleto))
        {
            return TextoDocumento.Erro("Arquivo físico não encontrado no servidor.");
        }

        var extensao = Path.GetExtension(caminhoCompleto).ToLowerInvariant();

        try
        {
            return extensao switch
            {
                ".pdf" => LerPdf(caminhoCompleto),
                ".docx" => LerDocx(caminhoCompleto),
                ".xlsx" => LerXlsx(caminhoCompleto),
                ".txt" => TextoDocumento.Ok(await File.ReadAllTextAsync(caminhoCompleto, cancellationToken), "txt"),
                ".png" or ".jpg" or ".jpeg" or ".tif" or ".tiff" =>
                    TextoDocumento.Ocr("Imagem: é preciso OCR para obter o texto."),
                _ => TextoDocumento.Erro($"Formato '{extensao}' sem leitor de texto.")
            };
        }
        catch (Exception erro)
        {
            return TextoDocumento.Erro($"Falha ao ler o arquivo: {erro.Message}");
        }
    }

    private static TextoDocumento LerPdf(string caminho)
    {
        var texto = new StringBuilder();

        // PdfPig abre o arquivo em modo leitura; o documento não é alterado
        using var pdf = PdfDocument.Open(caminho);

        foreach (var pagina in pdf.GetPages())
        {
            texto.AppendLine(pagina.Text);
        }

        var conteudo = texto.ToString().Trim();

        // PDF digitalizado: não há camada de texto, só imagem da página
        if (conteudo.Length < MinimoCaracteresPdf)
        {
            return TextoDocumento.Ocr("PDF sem texto embutido (provavelmente digitalizado).");
        }

        return TextoDocumento.Ok(conteudo, "pdf");
    }

    private static TextoDocumento LerDocx(string caminho)
    {
        using var documento = WordprocessingDocument.Open(caminho, false);

        var corpo = documento.MainDocumentPart?.Document?.Body;

        if (corpo is null)
        {
            return TextoDocumento.Erro("DOCX sem conteúdo.");
        }

        var texto = new StringBuilder();

        foreach (var paragrafo in corpo.Descendants<Paragraph>())
        {
            texto.AppendLine(paragrafo.InnerText);
        }

        // Tabelas do Word também fazem parte do conteúdo relevante
        foreach (var celula in corpo.Descendants<TableCell>())
        {
            texto.AppendLine(celula.InnerText);
        }

        var conteudo = texto.ToString().Trim();

        return conteudo.Length == 0
            ? TextoDocumento.Erro("DOCX sem texto.")
            : TextoDocumento.Ok(conteudo, "docx");
    }

    private static TextoDocumento LerXlsx(string caminho)
    {
        using var pasta = new XLWorkbook(caminho);

        var texto = new StringBuilder();

        foreach (var planilha in pasta.Worksheets)
        {
            texto.AppendLine($"### {planilha.Name}");

            foreach (var linha in planilha.RowsUsed())
            {
                var celulas = linha.CellsUsed()
                    .Select(c => c.GetFormattedString())
                    .Where(v => !string.IsNullOrWhiteSpace(v));

                var conteudoLinha = string.Join(" | ", celulas);

                if (!string.IsNullOrWhiteSpace(conteudoLinha))
                {
                    texto.AppendLine(conteudoLinha);
                }
            }
        }

        var conteudo = texto.ToString().Trim();

        return conteudo.Length == 0
            ? TextoDocumento.Erro("Planilha sem conteúdo.")
            : TextoDocumento.Ok(conteudo, "xlsx");
    }
}
