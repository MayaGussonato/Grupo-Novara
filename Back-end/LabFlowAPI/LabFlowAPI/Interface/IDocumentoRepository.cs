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
}
