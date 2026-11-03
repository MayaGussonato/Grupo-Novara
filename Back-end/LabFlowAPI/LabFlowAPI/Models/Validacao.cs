using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LabFlowAPI.Models;

[Table("Validacao")]
public partial class Validacao
{
    [Key]
    public int IdValidacao { get; set; }

    public int IdExtracao { get; set; }

    public int? IdRevisor { get; set; }

    [StringLength(40)]
    [Unicode(false)]
    public string Resultado { get; set; } = null!;

    [Unicode(false)]
    public string? Observacoes { get; set; }

    /// <summary>JSON ajustado pelo revisor; a extração original nunca é alterada.</summary>
    [Column("Dados_Corrigidos")]
    public string? DadosCorrigidos { get; set; }

    [Column("Data_Validacao")]
    public DateTime DataValidacao { get; set; }

    [ForeignKey("IdExtracao")]
    [InverseProperty("Validacaos")]
    public virtual Extracao IdExtracaoNavigation { get; set; } = null!;

    [ForeignKey("IdRevisor")]
    [InverseProperty("Validacaos")]
    public virtual Usuario? IdRevisorNavigation { get; set; }
}
