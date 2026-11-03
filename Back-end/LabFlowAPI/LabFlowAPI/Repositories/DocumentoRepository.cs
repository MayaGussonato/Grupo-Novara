using LabFlowAPI.Data;
using LabFlowAPI.DTO;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;

namespace LabFlowAPI.Repositories;

public class DocumentoRepository : IDocumentoRepository
{
    private readonly LabFlowContext _context;

    public DocumentoRepository(LabFlowContext context)
    {
        _context = context;
    }

    public void Cadastrar(Documento novoDocumento)
    {
        using var transacao = _context.Database.BeginTransaction();

        _context.Documentos.Add(novoDocumento);
        _context.SaveChanges();

        _context.HistoricoAtividades.Add(new Historico
        {
            IdDocumento = novoDocumento.IdDocumento,
            IdUsuario = novoDocumento.IdUsuario,
            Acao = "Upload",
            Detalhes = $"Arquivo '{novoDocumento.NomeArquivo}' enviado.",
            DataHora = DateTime.Now
        });
        _context.SaveChanges();

        transacao.Commit();
    }

    public int? BuscarIdPorHash(string hash)
    {
        // Documentos excluídos continuam bloqueando o reenvio: o arquivo já está no servidor.
        return _context.Documentos
            .Where(d => d.HashArquivo == hash)
            .Select(d => (int?)d.IdDocumento)
            .FirstOrDefault();
    }

    public Documento? BuscarPorId(int id)
    {
        return _context.Documentos
            .FirstOrDefault(d => d.IdDocumento == id && !d.Excluido);
    }

    public DocumentoResponseDTO? BuscarDetalhe(int id)
    {
        return Projetar(_context.Documentos.Where(d => d.IdDocumento == id && !d.Excluido))
            .FirstOrDefault();
    }

    public List<DocumentoResponseDTO> Listar(int? idUsuario, string? status, int pagina, int tamanho)
    {
        // Soft delete: documentos excluídos não aparecem em nenhuma listagem da API
        var consulta = _context.Documentos.Where(d => !d.Excluido);

        if (idUsuario != null)
        {
            consulta = consulta.Where(d => d.IdUsuario == idUsuario);
        }

        if (status != null)
        {
            consulta = consulta.Where(d => d.StatusDocumento == status);
        }

        var paginado = consulta
            .OrderByDescending(d => d.DataEnvio)
            .ThenByDescending(d => d.IdDocumento)
            .Skip((pagina - 1) * tamanho)
            .Take(tamanho);

        return Projetar(paginado).ToList();
    }

    public bool Excluir(int id, int? idUsuario)
    {
        var documento = _context.Documentos.FirstOrDefault(d => d.IdDocumento == id && !d.Excluido);

        if (documento == null)
        {
            return false;
        }

        using var transacao = _context.Database.BeginTransaction();

        documento.Excluido = true;

        // O histórico continua no banco; este registro documenta quem excluiu e quando
        _context.HistoricoAtividades.Add(new Historico
        {
            IdDocumento = documento.IdDocumento,
            IdUsuario = idUsuario,
            Acao = "Documento excluído",
            Detalhes = $"Arquivo '{documento.NomeArquivo}' removido da listagem (soft delete).",
            DataHora = DateTime.Now
        });

        _context.SaveChanges();
        transacao.Commit();

        return true;
    }

    private IQueryable<DocumentoResponseDTO> Projetar(IQueryable<Documento> consulta)
    {
        return consulta.Select(d => new DocumentoResponseDTO
        {
            IdDocumento = d.IdDocumento,
            IdUsuario = d.IdUsuario,
            NomeUsuario = _context.Usuarios
                .Where(u => u.IdUsuario == d.IdUsuario)
                .Select(u => u.Nome)
                .FirstOrDefault(),
            NomeArquivo = d.NomeArquivo,
            TipoDocumento = d.TipoDocumento,
            Formato = d.Formato,
            TamanhoBytes = d.TamanhoBytes,
            StatusDocumento = d.StatusDocumento,
            DataEnvio = d.DataEnvio,

            // Confiança da extração mais recente
            NivelConfianca = _context.Extracaos
                .Where(e => e.IdDocumento == d.IdDocumento)
                .OrderByDescending(e => e.DataExtracao)
                .ThenByDescending(e => e.IdExtracao)
                .Select(e => e.NivelConfianca)
                .FirstOrDefault()
        });
    }
}
