using LabFlowAPI.DTO;
using LabFlowAPI.Models;

namespace LabFlowAPI.Interface;

public interface IValidacaoRepository
{
    List<ValidacaoPendenteDTO> ListarPendentes();

    Validacao? BuscarPorId(int id);

    /// <summary>
    /// Registra a decisão do revisor, atualiza o status do documento e grava no histórico,
    /// tudo na mesma transação.
    /// </summary>
    Validacao Decidir(int idValidacao, int idRevisor, string resultado, string? observacoes, string? dadosCorrigidos);
}
