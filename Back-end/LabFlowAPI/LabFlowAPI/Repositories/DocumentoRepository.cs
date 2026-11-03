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
        return _context.Documentos
            .Where(d => d.HashArquivo == hash)
            .Select(d => (int?)d.IdDocumento)
            .FirstOrDefault();
    }

    public Documento? BuscarPorId(int id)
    {
        return _context.Documentos.Find(id);
    }

    public DocumentoResponseDTO? BuscarDetalhe(int id)
    {
        return Projetar(_context.Documentos.Where(d => d.IdDocumento == id))
            .FirstOrDefault();
    }

    public List<DocumentoResponseDTO> Listar(int? idUsuario, string? status, int pagina, int tamanho)
    {
        var consulta = _context.Documentos.AsQueryable();

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
