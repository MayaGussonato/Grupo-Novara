using LabFlowAPI.Data;
using LabFlowAPI.DTO;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LabFlowAPI.Repositories;

public class AtendimentoRepository : IAtendimentoRepository
{
    private readonly LabFlowContext _context;

    public AtendimentoRepository(LabFlowContext context) => _context = context;

    public void Cadastrar(Atendimento atendimento)
    {
        _context.Atendimentos.Add(atendimento);
        _context.SaveChanges();
    }

    public Atendimento? BuscarPorId(int id) =>
        _context.Atendimentos.FirstOrDefault(a => a.IdAtendimento == id);

    public AtendimentoDetalheDTO? BuscarDetalhe(int id) =>
        Projetar(_context.Atendimentos.AsNoTracking().Where(a => a.IdAtendimento == id))
            .FirstOrDefault();

    public (List<AtendimentoDetalheDTO> Itens, int Total) Listar(
        int? idUsuario, string? status, int pagina, int tamanho)
    {
        var query = _context.Atendimentos.AsNoTracking().AsQueryable();

        if (idUsuario != null)
            query = query.Where(a => a.IdUsuario == idUsuario || a.IdResponsavel == idUsuario);

        if (status != null)
            query = query.Where(a => a.StatusAtendimento == status);

        var total = query.Count();

        var itens = Projetar(query.OrderByDescending(a => a.DataAbertura))
            .Skip((pagina - 1) * tamanho)
            .Take(tamanho)
            .ToList();

        return (itens, total);
    }

    public void AtualizarStatus(int id, string status)
    {
        var atendimento = _context.Atendimentos.First(a => a.IdAtendimento == id);

        atendimento.StatusAtendimento = status;
        atendimento.DataAtualizacao = DateTime.Now;
        atendimento.DataFechamento = status is "Resolvido" or "Fechado" ? DateTime.Now : null;

        _context.SaveChanges();
    }

    private IQueryable<AtendimentoDetalheDTO> Projetar(IQueryable<Atendimento> query) =>
       query.Select(a => new AtendimentoDetalheDTO
       {
           IdAtendimento = a.IdAtendimento,
           Protocolo = a.Protocolo,
           IdUsuario = a.IdUsuario,
           IdResponsavel = a.IdResponsavel,
           NomeResponsavel = _context.Usuarios
               .Where(u => u.IdUsuario == a.IdResponsavel)
               .Select(u => u.Nome).FirstOrDefault(),
           IdDocumento = a.IdDocumento,
           NomeDocumento = _context.Documentos
               .Where(d => d.IdDocumento == a.IdDocumento)
               .Select(d => d.NomeArquivo).FirstOrDefault(),
           Titulo = a.Titulo,
           Descricao = a.Descricao,
           Categoria = a.Categoria,
           Email = a.Email,
           Prioridade = a.Prioridade,
           StatusAtendimento = a.StatusAtendimento,
           DataAbertura = a.DataAbertura,
           DataAtualizacao = a.DataAtualizacao,
           DataFechamento = a.DataFechamento
       });
}