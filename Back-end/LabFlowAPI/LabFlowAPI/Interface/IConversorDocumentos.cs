namespace LabFlowAPI.Interface
{
    public interface IConversorDocumentos
    {
        MemoryStream ConverterParaPdf(Stream entrada, string extensao);
    }
}
