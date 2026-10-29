using LabFlowAPI.Data;
using LabFlowAPI.DTO;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;

namespace LabFlowAPI.Repositories;

public class HistoricoRepository : IHistoricoRepository
{
    private readonly LabFlowContext _context;

    public HistoricoRepository(LabFlowContext context)
    {
        _context = context;
    }

    public void Registrar(int? idDocumento, int? idUsuario, string acao, string? detalhes = null)
    {
        // A tabela Historico exige IdDocumento, então eventos que não pertencem a um
        // documento (cadastro, login, troca de perfil) não são gravados nela.
        // Para esses casos a trilha fica nos logs da aplicação.
        if (idDocumento == null)
        {
            return;
        }

        _context.HistoricoAtividades.Add(new Historico
        {
            IdDocumento = idDocumento.Value,
            IdUsuario = idUsuario,
            Acao = acao,
            Detalhes = detalhes,
            DataHora = DateTime.Now
        });

        _context.SaveChanges();
    }

    public List<HistoricoResponseDTO> ListarPorDocumento(int idDocumento)
    {
        return _context.HistoricoAtividades
            .Where(h => h.IdDocumento == idDocumento)
            .OrderBy(h => h.DataHora)
            .ThenBy(h => h.IdHistorico)
            .Select(h => new HistoricoResponseDTO
            {
                IdHistorico = h.IdHistorico,
                IdUsuario = h.IdUsuario,
                NomeUsuario = _context.Usuarios
                    .Where(u => u.IdUsuario == h.IdUsuario)
                    .Select(u => u.Nome)
                    .FirstOrDefault(),
                Acao = h.Acao,
                Detalhes = h.Detalhes,
                DataHora = h.DataHora
            })
            .ToList();
    }
}
