using LabFlowAPI.DTO;

namespace LabFlowAPI.Interface;

public interface IHistoricoRepository
{
    void Registrar(int? idDocumento, int? idUsuario, string acao, string? detalhes = null);

    List<HistoricoResponseDTO> ListarPorDocumento(int idDocumento);
}
