using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LabFlowAPI.Models;

[Table("Integracao")]
public partial class Integracao
{
    [Key]
    public int IdIntegracao { get; set; }

    public int IdExtracao { get; set; }

    [Column("Sistema_Destino")]
    [StringLength(100)]
    [Unicode(false)]
    public string SistemaDestino { get; set; } = null!;

    [Column("Status_Arquivo")]
    [StringLength(30)]
    [Unicode(false)]
    public string StatusDocumento { get; set; } = null!;

    [Column("Mensagem_Retorno")]
    [Unicode(false)]
    public string? MensagemRetorno { get; set; }

    [Column("Data_Envio")]
    public DateTime? DataEnvio { get; set; }

    [ForeignKey("IdExtracao")]
    [InverseProperty("Integracaos")]
    public virtual Extracao IdExtracaoNavigation { get; set; } = null!;
}
