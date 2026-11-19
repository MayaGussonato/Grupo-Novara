using ImageMagick;
using LabFlowAPI.Interface;
using Syncfusion.DocIO;
using Syncfusion.DocIO.DLS;
using Syncfusion.DocIORenderer;
using Syncfusion.Pdf;
using Syncfusion.XlsIO;
using Syncfusion.XlsIORenderer;

namespace LabFlowAPI.Services.Documentos;

public class ConversorDocumentos : IConversorDocumentos
{
    public MemoryStream ConverterParaPdf(Stream entrada, string extensao) =>
        extensao.ToLowerInvariant() switch
        {
            ".docx" => DocxParaPdf(entrada),
            ".xlsx" => XlsxParaPdf(entrada),
            ".tif" or ".tiff" => TiffParaPdf(entrada),
            _ => throw new NotSupportedException($"Formato {extensao} não suportado.")
        };

    private static MemoryStream DocxParaPdf(Stream entrada)
    {
        using var doc = new WordDocument(entrada, FormatType.Automatic);
        using var renderer = new DocIORenderer();
        using PdfDocument pdf = renderer.ConvertToPDF(doc);

        var saida = new MemoryStream();
        pdf.Save(saida);
        saida.Position = 0;
        return saida;
    }

    private static MemoryStream XlsxParaPdf(Stream entrada)
    {
        using var engine = new ExcelEngine();
        IWorkbook wb = engine.Excel.Workbooks.Open(entrada);
        var renderer = new XlsIORenderer();
        using PdfDocument pdf = renderer.ConvertToPDF(wb);

        var saida = new MemoryStream();
        pdf.Save(saida);
        saida.Position = 0;
        return saida;
    }

    private static MemoryStream TiffParaPdf(Stream entrada)
    {
        using var paginas = new MagickImageCollection(entrada); // TIFF multipágina
        var saida = new MemoryStream();
        paginas.Write(saida, MagickFormat.Pdf);
        saida.Position = 0;
        return saida;
    }
}