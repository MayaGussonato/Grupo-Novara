using System.ComponentModel.DataAnnotations;

namespace LabFlowAPI.DTO;

public class DocumentoUploadDTO
{
    [Required(ErrorMessage = "O arquivo é obrigatório.")]
    public IFormFile? Arquivo { get; set; }

    [StringLength(80)]
    public string? TipoDocumento { get; set; }
}

public class DocumentoResponseDTO
{
    public int IdDocumento { get; set; }

    public int IdUsuario { get; set; }

    public string? NomeUsuario { get; set; }

    public string NomeArquivo { get; set; } = null!;

    public string? TipoDocumento { get; set; }

    public string Formato { get; set; } = null!;

    public long? TamanhoBytes { get; set; }

    public string StatusDocumento { get; set; } = null!;

    public DateTime DataEnvio { get; set; }

    /// <summary>Confiança da extração mais recente (null se ainda não houve extração).</summary>
    public decimal? NivelConfianca { get; set; }
}

public class HistoricoResponseDTO
{
    public int IdHistorico { get; set; }

    public int? IdUsuario { get; set; }

    public string? NomeUsuario { get; set; }

    public string Acao { get; set; } = null!;

    public string? Detalhes { get; set; }

    public DateTime DataHora { get; set; }
}
