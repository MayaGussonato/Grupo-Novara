using LabFlowAPI.Data;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;
using LabFlowAPI.Utils;

namespace LabFlowAPI.Repositories;

public class UsuarioRepository : IUsuarioRepository
{
    /// <summary>Sufixo gravado no e-mail de um usuário excluído, para liberar o UNIQUE.</summary>
    private const string SufixoEmailExcluido = ".excluido";

    /// <summary>Provedor usado para marcar a conta como excluída (só "Local" loga).</summary>
    private const string ProvedorLoginExcluido = "Excluido";

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
    
    public bool AlterarAtivo(int id, bool ativo, int? idQuemAlterou)
    {
        var usuario = _context.Usuarios.Find(id);

        if (usuario == null)
        {
            return false;
        }

        usuario.Ativo = ativo;

        // Historico.IdDocumento é NOT NULL: eventos sem documento (ativação, desativação,
        // exclusão de usuário) não entram na tabela de histórico — ficam no log da aplicação.
        _context.SaveChanges();

        return true;
    }

    public bool Excluir(int id, int? idQuemExcluiu)
    {
        var usuario = _context.Usuarios.Find(id);

        if (usuario == null)
        {
            return false;
        }

        using var transacao = _context.Database.BeginTransaction();

        // Soft delete: o usuário e todo o rastro dele (documentos, extrações,
        // validações, histórico) continuam no banco; ele apenas perde o acesso
        // e deixa de aparecer nas listagens.
        usuario.Ativo = false;
        usuario.ProvedorLogin = ProvedorLoginExcluido;

        // Anonimiza o e-mail para liberar o UNIQUE e permitir um novo cadastro
        // com o mesmo endereço. O id no sufixo evita colisão entre excluídos.
        if (!usuario.Email.EndsWith(SufixoEmailExcluido, StringComparison.OrdinalIgnoreCase))
        {
            usuario.Email = $"{usuario.Email}#{usuario.IdUsuario}{SufixoEmailExcluido}";
        }

        // A senha é inutilizada: não há como logar com este usuário de novo
        usuario.SenhaHash = Criptografia.GerarHash(Guid.NewGuid().ToString("N"));

        _context.SaveChanges();
        transacao.Commit();

        return true;
    }

    public bool PossuiDependencias(int id)
    {
        return _context.Documentos.Any(d => d.IdUsuario == id)
            || _context.HistoricoAtividades.Any(h => h.IdUsuario == id)
            || _context.Validacaos.Any(v => v.IdRevisor == id);
    }
}
