using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace LabFlowAPI.DTO;

public class ExtracaoCreateDTO
{
    [Required(ErrorMessage = "O documento é obrigatório.")]
    public int? IdDocumento { get; set; }

    [Required(ErrorMessage = "A tecnologia usada na extração é obrigatória.")]
    [StringLength(100)]
    public string? Tecnologia { get; set; }

    public string? TextoExtraido { get; set; }

    /// <summary>Objeto JSON com os campos extraídos (ex.: número, data, valores).</summary>
    public JsonElement? DadosEstruturados { get; set; }

    [Range(0, 100, ErrorMessage = "A confiança deve estar entre 0 e 100.")]
    public decimal? NivelConfianca { get; set; }
}

public class ExtracaoResponseDTO
{
    public int IdExtracao { get; set; }

    public int IdDocumento { get; set; }

    public string Tecnologia { get; set; } = null!;

    public string? TextoExtraido { get; set; }

    public JsonElement? DadosEstruturados { get; set; }

    public decimal? NivelConfianca { get; set; }

    public DateTime DataExtracao { get; set; }
}
