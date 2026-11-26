using System.ComponentModel.DataAnnotations;

namespace LabFlowAPI.DTO;

public class AtendimentoCriarDTO
{
    [Required, StringLength(150)]
    public string Titulo { get; set; } = null!;

    [Required]
    public string Categoria { get; set; } = null!;

    [Required, StringLength(254)]
    public string Email { get; set; } = null!;

    public string Prioridade { get; set; } = "Media";

    public int? IdDocumento { get; set; }

    [Required, StringLength(4000)]
    public string Descricao { get; set; } = null!;
}

public class AtendimentoStatusDTO
{
    [Required]
    public string Status { get; set; } = null!;
}

public class AtendimentoDetalheDTO
{
    public int IdAtendimento { get; set; }
    public string Protocolo { get; set; } = null!;
    public int IdUsuario { get; set; }
    public int? IdResponsavel { get; set; }
    public string? NomeResponsavel { get; set; }
    public int? IdDocumento { get; set; }
    public string? NomeDocumento { get; set; }
    public string Titulo { get; set; } = null!;
    public string Descricao { get; set; } = null!;
    public string Categoria { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Prioridade { get; set; } = null!;
    public string StatusAtendimento { get; set; } = null!;
    public DateTime DataAbertura { get; set; }
    public DateTime? DataAtualizacao { get; set; }
    public DateTime? DataFechamento { get; set; }
}