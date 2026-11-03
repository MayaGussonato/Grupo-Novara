using LabFlowAPI.DTO;
using LabFlowAPI.Models;

namespace LabFlowAPI.Interface;

public interface IDocumentoRepository
{
    /// <summary>Grava o documento e o registro "Upload" no histórico na mesma transação.</summary>
    void Cadastrar(Documento novoDocumento);

    /// <summary>Id do documento que já tem este hash SHA-256, ou null.</summary>
    int? BuscarIdPorHash(string hash);

    Documento? BuscarPorId(int id);

    DocumentoResponseDTO? BuscarDetalhe(int id);

    /// <param name="idUsuario">Quando informado, lista só os documentos desse usuário.</param>
    List<DocumentoResponseDTO> Listar(int? idUsuario, string? status, int pagina, int tamanho);

    /// <summary>
    /// Soft delete: marca Excluido = true e registra a exclusão no histórico, na mesma transação.
    /// Nenhuma linha é apagada do banco. Retorna false se o documento não existir ou já estiver excluído.
    /// </summary>
    bool Excluir(int id, int? idUsuario);
}
