using LabFlowAPI.Data;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;

namespace LabFlowAPI.Repositories;

public class ExtracaoRepository : IExtracaoRepository
{
    private readonly LabFlowContext _context;

    public ExtracaoRepository(LabFlowContext context)
    {
        _context = context;
    }

    public void Cadastrar(Extracao novaExtracao, int idUsuario)
    {
        var documento = _context.Documentos.Find(novaExtracao.IdDocumento)
            ?? throw new InvalidOperationException("Documento não encontrado.");

        using var transacao = _context.Database.BeginTransaction();

        _context.Extracaos.Add(novaExtracao);
        _context.SaveChanges();

        // Regra adotada: toda extração entra na fila de revisão humana
        _context.Validacaos.Add(new Validacao
        {
            IdExtracao = novaExtracao.IdExtracao,
            Resultado = "Pendente",
            DataValidacao = DateTime.Now
        });

        documento.StatusDocumento = "Revisao";

        _context.HistoricoAtividades.Add(new Historico
        {
            IdDocumento = documento.IdDocumento,
            IdUsuario = idUsuario,
            Acao = "Extração concluída",
            Detalhes = $"Tecnologia: {novaExtracao.Tecnologia}; " +
                       $"confiança: {novaExtracao.NivelConfianca?.ToString("0.##") ?? "n/d"}",
            DataHora = DateTime.Now
        });

        _context.SaveChanges();
        transacao.Commit();
    }

    public Extracao? BuscarPorId(int id)
    {
        return _context.Extracaos.Find(id);
    }

    public List<Extracao> ListarPorDocumento(int idDocumento)
    {
        return _context.Extracaos
            .Where(e => e.IdDocumento == idDocumento)
            .OrderByDescending(e => e.DataExtracao)
            .ThenByDescending(e => e.IdExtracao)
            .ToList();
    }
}
