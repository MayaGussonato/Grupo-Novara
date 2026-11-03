using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LabFlowAPI.Models;

[Table("Documento")]
public partial class Documento
{
    [Key]
    public int IdDocumento { get; set; }

    public int IdUsuario { get; set; }

    [Column("Nome_Arquivo")]
    [StringLength(255)]
    [Unicode(false)]
    public string NomeArquivo { get; set; } = null!;

    [Column("Tipo_Documento")]
    [StringLength(80)]
    [Unicode(false)]
    public string? TipoDocumento { get; set; }

    [StringLength(10)]
    [Unicode(false)]
    public string Formato { get; set; } = null!;

    [Column("Caminho_Arquivo")]
    [StringLength(500)]
    [Unicode(false)]
    public string CaminhoArquivo { get; set; } = null!;

    [Column("Data_Envio")]
    public DateTime DataEnvio { get; set; }

    /// <summary>Processando, Aprovado, Revisao ou Erro. No banco a coluna chama-se "Status_Arquivo".</summary>
    [Column("Status_Arquivo")]
    [StringLength(30)]
    [Unicode(false)]
    public string StatusDocumento { get; set; } = null!;

    [Column("Nivel_Confianca", TypeName = "decimal(5, 2)")]
    public decimal? NivelConfianca { get; set; }

    [Column("TamanhoBytes")]
    public long? TamanhoBytes { get; set; }

    [Column("HashArquivo")]
    [StringLength(64)]
    [Unicode(false)]
    public string? HashArquivo { get; set; }

    [InverseProperty("IdDocumentoNavigation")]
    public virtual ICollection<Extracao> Extracaos { get; set; } = new List<Extracao>();

    [InverseProperty("IdDocumentoNavigation")]
    public virtual ICollection<Historico> Historicos { get; set; } = new List<Historico>();

    [ForeignKey("IdUsuario")]
    [InverseProperty("Documentos")]
    public virtual Usuario IdUsuarioNavigation { get; set; } = null!;
}
