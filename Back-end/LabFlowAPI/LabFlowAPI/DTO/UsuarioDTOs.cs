using System.ComponentModel.DataAnnotations;

namespace LabFlowAPI.DTO;

public class RegistroDTO
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [StringLength(250)]
    public string? Nome { get; set; }

    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress(ErrorMessage = "Email inválido.")]
    [StringLength(250)]
    public string? Email { get; set; }

    [Required(ErrorMessage = "A senha é obrigatória.")]
    [StringLength(72, MinimumLength = 8, ErrorMessage = "A senha deve ter de 8 a 72 caracteres.")]
    public string? Senha { get; set; }

    [StringLength(80)]
    public string? Cargo { get; set; }
}

public class LoginDTO
{
    [Required(ErrorMessage = "O Email do usuário é obrigatório.")]
    public string? Email { get; set; }

    [Required(ErrorMessage = "A senha do usuário é obrigatória.")]
    public string? Senha { get; set; }
}

public class LoginResponseDTO
{
    public string Token { get; set; } = null!;

    public DateTime ExpiraEm { get; set; }

    public int IdUsuario { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PerfilAcesso { get; set; } = null!;
}

public class UsuarioResponseDTO
{
    public int IdUsuario { get; set; }

    public string Nome { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Cargo { get; set; }

    public string PerfilAcesso { get; set; } = null!;

    public bool Ativo { get; set; }
}

public class AlterarPerfilDTO
{
    [Required(ErrorMessage = "O perfil é obrigatório.")]
    public string? PerfilAcesso { get; set; }
}
