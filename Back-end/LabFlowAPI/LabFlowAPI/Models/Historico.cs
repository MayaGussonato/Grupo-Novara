using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LabFlowAPI.Models;

[Table("Historico")]
public partial class Historico
{
    [Key]
    public int IdHistorico { get; set; }

    public int IdDocumento { get; set; }

    public int? IdUsuario { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string Acao { get; set; } = null!;

    [Unicode(false)]
    public string? Detalhes { get; set; }

    [Column("Data_hora")]
    public DateTime DataHora { get; set; }

    [ForeignKey("IdDocumento")]
    [InverseProperty("Historicos")]
    public virtual Documento IdDocumentoNavigation { get; set; } = null!;

    [ForeignKey("IdUsuario")]
    [InverseProperty("Historicos")]
    public virtual Usuario? IdUsuarioNavigation { get; set; }
}
