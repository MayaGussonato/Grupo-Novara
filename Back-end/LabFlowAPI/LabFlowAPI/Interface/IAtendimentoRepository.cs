using LabFlowAPI.DTO;
using LabFlowAPI.Models;

namespace LabFlowAPI.Interface;

public interface IAtendimentoRepository
{
    void Cadastrar(Atendimento atendimento);
    Atendimento? BuscarPorId(int id);
    AtendimentoDetalheDTO? BuscarDetalhe(int id);
    (List<AtendimentoDetalheDTO> Itens, int Total) Listar(int? idUsuario, string? status, int pagina, int tamanho);
    void AtualizarStatus(int id, string status);
}