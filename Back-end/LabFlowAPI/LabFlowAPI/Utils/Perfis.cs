using System.Security.Claims;

namespace LabFlowAPI.Utils;

/// <summary>Valores de Usuario.Perfil_Acesso (iguais ao CHECK do banco).</summary>
public static class Perfis
{
    public const string Administrador = "Administrador";
    public const string Revisor = "Revisor";
    public const string Funcionario = "Funcionario";

    public const string RevisorOuAdmin = "Revisor,Administrador";

    public static readonly string[] Todos = { Administrador, Revisor, Funcionario };
}

public static class UsuarioLogadoExtensions
{
    /// <summary>Id do usuário logado (claim "sub" do JWT).</summary>
    public static int? GetIdUsuario(this ClaimsPrincipal user)
    {
        // O JwtBearer mapeia "sub" para NameIdentifier; NameClaimType também é "name",
        // então vale tentar as três formas.
        var valor = user.FindFirst("sub")?.Value
                    ?? user.FindFirst(ClaimTypes.NameIdentifier)?.Value
                    ?? user.FindFirst("name")?.Value;

        return int.TryParse(valor, out var id) ? id : null;
    }

    /// <summary>Revisores e administradores enxergam os documentos de todos os usuários.</summary>
    public static bool PodeVerTodosDocumentos(this ClaimsPrincipal user)
    {
        return user.IsInRole(Perfis.Revisor) || user.IsInRole(Perfis.Administrador);
    }
}
