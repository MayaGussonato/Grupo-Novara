using System.ComponentModel.DataAnnotations;
using System.Text.Json;

namespace LabFlowAPI.DTO;

/// <summary>Decisão do revisor sobre uma extração.</summary>
public class ValidacaoDecisaoDTO
{
    /// <summary>Aprovado, Correcao necessaria ou Reprovado.</summary>
    [Required(ErrorMessage = "O resultado é obrigatório.")]
    public string? Resultado { get; set; }

    public string? Observacoes { get; set; }

    /// <summary>JSON ajustado pelo revisor (a extração original não é alterada).</summary>
    public JsonElement? DadosCorrigidos { get; set; }
}

public class ValidacaoResponseDTO
{
    public int IdValidacao { get; set; }

    public int IdExtracao { get; set; }

    public int? IdRevisor { get; set; }

    public string Resultado { get; set; } = null!;

    public string? Observacoes { get; set; }

    public JsonElement? DadosCorrigidos { get; set; }

    public DateTime DataValidacao { get; set; }
}

/// <summary>Item da fila de revisão.</summary>
public class ValidacaoPendenteDTO
{
    public int IdValidacao { get; set; }

    public int IdExtracao { get; set; }

    public int IdDocumento { get; set; }

    public string NomeArquivo { get; set; } = null!;

    public string? TipoDocumento { get; set; }

    public decimal? NivelConfianca { get; set; }

    public DateTime DataExtracao { get; set; }
}
