using LabFlowAPI.Models;

namespace LabFlowAPI.Interface;

public interface IExtracaoRepository
{
    /// <summary>
    /// Grava a extração, cria a validação "Pendente", move o documento para "Revisao"
    /// e registra no histórico, tudo na mesma transação.
    /// </summary>
    void Cadastrar(Extracao novaExtracao, int idUsuario);

    Extracao? BuscarPorId(int id);

    List<Extracao> ListarPorDocumento(int idDocumento);
}
