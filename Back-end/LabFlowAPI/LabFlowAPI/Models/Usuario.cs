using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace LabFlowAPI.Models;

[Table("Usuario")]
[Index("Email", Name = "UQ__Usuario__A9D1053430E05357", IsUnique = true)]
public partial class Usuario
{
    [Key]
    public int IdUsuario { get; set; }

    [StringLength(250)]
    [Unicode(false)]
    public string Nome { get; set; } = null!;

    [StringLength(250)]
    [Unicode(false)]
    public string Email { get; set; } = null!;

    /// <summary>Hash BCrypt da senha. No banco a coluna chama-se "Senha".</summary>
    [Column("Senha")]
    [StringLength(255)]
    [Unicode(false)]
    public string SenhaHash { get; set; } = null!;

    [StringLength(80)]
    [Unicode(false)]
    public string? Cargo { get; set; }

    [Column("Perfil_Acesso")]
    [StringLength(30)]
    [Unicode(false)]
    public string PerfilAcesso { get; set; } = null!;

    /// <summary>"Local" para login com senha; outros valores reservados para login social.</summary>
    [Column("Provedor_Login")]
    [StringLength(30)]
    [Unicode(false)]
    public string ProvedorLogin { get; set; } = "Local";

    public bool Ativo { get; set; } = true;

    [Column("Data_Criacao")]
    public DateTime DataCriacao { get; set; } = DateTime.Now;

    [InverseProperty("IdUsuarioNavigation")]
    public virtual ICollection<Documento> Documentos { get; set; } = new List<Documento>();

    [InverseProperty("IdUsuarioNavigation")]
    public virtual ICollection<Historico> Historicos { get; set; } = new List<Historico>();

    [InverseProperty("IdRevisorNavigation")]
    public virtual ICollection<Validacao> Validacaos { get; set; } = new List<Validacao>();
}
