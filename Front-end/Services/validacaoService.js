import { apiRequest } from "./api";

export function listarValidacoesPendentes() {
  return apiRequest("/api/Validacao/pendentes");
}

export function buscarValidacao(id) {
  return apiRequest(`/api/Validacao/${id}`);
}

export function decidirValidacao(id, dados) {
  return apiRequest(`/api/Validacao/${id}`, {
    method: "PUT",
    body: JSON.stringify(dados),
  });
}
