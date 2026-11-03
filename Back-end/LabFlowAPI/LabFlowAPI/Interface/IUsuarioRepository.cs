using LabFlowAPI.Models;

namespace LabFlowAPI.Interface;

public interface IUsuarioRepository
{
    /// Cadastra o usuário gravando a senha como hash (BCrypt)
    void Cadastrar(Usuario novoUsuario, string senha);

    bool EmailExiste(string email);

    Usuario? BuscarPorId(int id);

    /// Retorna o usuário se o email existir, estiver ativo e a senha conferir.
    Usuario? BuscarPorEmailESenha(string email, string senha);

    List<Usuario> Listar();

    /// Retorna false se o usuário não existir
    bool AlterarPerfil(int id, string novoPerfil, int? idQuemAlterou);

    //Ativa ou desativa o acesso. Retorna false se o usuário não existir.
    bool AlterarAtivo(int id, bool ativo, int? idQuemAlterou);

    /// <summary>
    /// Soft delete: desativa o acesso, inutiliza a senha e libera o e-mail para um novo
    /// cadastro. Nenhuma linha é apagada — documentos, extrações, validações e histórico
    /// continuam no banco. Retorna false se o usuário não existir.
    /// </summary>
    bool Excluir(int id, int? idQuemExcluiu);

    /// <summary>True se o usuário é dono de documento, aparece no histórico ou revisou alguma validação.</summary>
    bool PossuiDependencias(int id);
}
