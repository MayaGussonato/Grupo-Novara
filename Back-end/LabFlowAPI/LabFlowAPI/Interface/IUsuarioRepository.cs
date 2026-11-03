using LabFlowAPI.Models;

namespace LabFlowAPI.Interface;

public interface IUsuarioRepository
{
    /// <summary>Cadastra o usuário gravando a senha como hash (BCrypt).</summary>
    void Cadastrar(Usuario novoUsuario, string senha);

    bool EmailExiste(string email);

    Usuario? BuscarPorId(int id);

    /// <summary>Retorna o usuário se o email existir, estiver ativo e a senha conferir.</summary>
    Usuario? BuscarPorEmailESenha(string email, string senha);

    List<Usuario> Listar();

    /// <summary>Retorna false se o usuário não existir.</summary>
    bool AlterarPerfil(int id, string novoPerfil, int? idQuemAlterou);
}
