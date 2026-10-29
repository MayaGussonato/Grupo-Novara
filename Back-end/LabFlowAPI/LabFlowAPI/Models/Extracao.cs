using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LabFlowAPI.Models;

[Table("Extracao")]
public partial class Extracao
{
    [Key]
    public int IdExtracao { get; set; }

    public int IdDocumento { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Tecnologia { get; set; } = null!;

    [Column("Texto_Extraido")]
    [Unicode(false)]
    public string? TextoExtraido { get; set; }

    [Column("Dados_Estruturados")]
    public string? DadosEstruturados { get; set; }

    [Column("Nivel_Confianca", TypeName = "decimal(5, 2)")]
    public decimal? NivelConfianca { get; set; }

    [Column("Data_Extracao")]
    public DateTime DataExtracao { get; set; }

    [ForeignKey("IdDocumento")]
    [InverseProperty("Extracaos")]
    public virtual Documento IdDocumentoNavigation { get; set; } = null!;

    [InverseProperty("IdExtracaoNavigation")]
    public virtual ICollection<Integracao> Integracaos { get; set; } = new List<Integracao>();

    [InverseProperty("IdExtracaoNavigation")]
    public virtual ICollection<Validacao> Validacaos { get; set; } = new List<Validacao>();
}
