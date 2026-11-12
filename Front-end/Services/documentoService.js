
import { Platform } from "react-native";
import { apiRequest } from "./api";

export async function enviarDocumento(arquivo, tipoDocumento) {
  const formulario = new FormData();

  formulario.append("TipoDocumento", tipoDocumento || "");

  if (Platform.OS === "web" && arquivo.file) {
    // No navegador, utiliza o objeto File.
    formulario.append("Arquivo", arquivo.file, arquivo.name);
  } else {
    // Android e iOS: envia a URI do arquivo.
    formulario.append("Arquivo", {
      uri: arquivo.uri,
      name: arquivo.name,
      type: arquivo.mimeType || "application/octet-stream",
    });
  }

  return apiRequest("/api/Documento", {
    method: "POST",
    body: formulario,
  });
}

export function listarDocumentos(filtros = {}) {
  const pagina = filtros.pagina || 1;
  const tamanho = filtros.tamanho || 20;

  let rota = `/api/Documento?pagina=${pagina}&tamanho=${tamanho}`;

  if (filtros.status) {
    rota += `&status=${encodeURIComponent(filtros.status)}`;
  }

  return apiRequest(rota);
}

export function buscarDocumento(id) {
  return apiRequest(`/api/Documento/${id}`);
}

export function processarDocumento(id) {
  return apiRequest(`/api/Documento/${id}/processar`, {
    method: "POST",
  });
}

/** Soft delete: o documento some da API, o histórico fica no banco. */
export function excluirDocumento(id) {
  return apiRequest(`/api/Documento/${id}`, {
    method: "DELETE",
  });
}

export function buscarExtracoes(idDocumento) {
  return apiRequest(`/api/Extracao/documento/${idDocumento}`);
}

export function buscarExtracao(idExtracao) {
  return apiRequest(`/api/Extracao/${idExtracao}`);
}

export function buscarHistorico(idDocumento) {
  return apiRequest(`/api/Documento/${idDocumento}/historico`);
}

/** URL do arquivo para download/abertura (o token vai no header, então use apiRequest). */
export async function baixarDocumento(id) {
  return apiRequest(`/api/Documento/${id}/arquivo`);
}
