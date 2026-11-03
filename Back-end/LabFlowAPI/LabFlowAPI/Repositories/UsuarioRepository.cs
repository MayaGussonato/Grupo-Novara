using LabFlowAPI.Data;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;
using LabFlowAPI.Utils;

namespace LabFlowAPI.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    private readonly LabFlowContext _context;

    public UsuarioRepository(LabFlowContext context)
    {
        _context = context;
    }

    public void Cadastrar(Usuario novoUsuario, string senha)
    {
        novoUsuario.SenhaHash = Criptografia.GerarHash(senha);

        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
    }

    public bool EmailExiste(string email)
    {
        return _context.Usuarios.Any(u => u.Email == email);
    }

    public Usuario? BuscarPorId(int id)
    {
        return _context.Usuarios.Find(id);
    }

    public Usuario? BuscarPorEmailESenha(string email, string senha)
    {
        var usuario = _context.Usuarios.FirstOrDefault(u => u.Email == email);

        if (usuario == null ||
            usuario.Ativo != true ||
            usuario.ProvedorLogin != "Local" ||
            string.IsNullOrEmpty(usuario.SenhaHash))
        {
            return null;
        }

        return Criptografia.CompararHash(senha, usuario.SenhaHash) ? usuario : null;
    }

    public List<Usuario> Listar()
    {
        return _context.Usuarios
            .OrderBy(u => u.Nome)
            .ToList();
    }

    public bool AlterarPerfil(int id, string novoPerfil, int? idQuemAlterou)
    {
        var usuario = _context.Usuarios.Find(id);

        if (usuario == null)
        {
            return false;
        }

        usuario.PerfilAcesso = novoPerfil;

        // Historico.IdDocumento é NOT NULL: a troca de perfil não pertence a um documento,
        // por isso não entra na tabela de histórico (fica registrada no log da aplicação).
        _context.SaveChanges();

        return true;
    }
}
