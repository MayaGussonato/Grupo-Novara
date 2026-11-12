
import { apiRequest } from "./api";

// ---------- Usuários ----------

export function cadastrarUsuario(dados) {
  return apiRequest("/api/Usuario/registro", {
    method: "POST",
    public: true,
    body: JSON.stringify(dados),
  });
}

export function fazerLogin(email, senha) {
  return apiRequest("/api/Usuario/login", {
    method: "POST",
    public: true,
    body: JSON.stringify({ email, senha }),
  });
}

export function buscarMeuPerfil() {
  return apiRequest("/api/Usuario/me");
}

/** Somente Administrador. */
export function listarUsuarios() {
  return apiRequest("/api/Usuario");
}

export function buscarUsuario(id) {
  return apiRequest(`/api/Usuario/${id}`);
}

export function alterarPerfilUsuario(id, perfilAcesso) {
  return apiRequest(`/api/Usuario/${id}/perfil`, {
    method: "PUT",
    body: JSON.stringify({ perfilAcesso }),
  });
}

/** Soft delete: desativa o acesso e libera o e-mail. Somente Administrador. */
export function excluirUsuario(id) {
  return apiRequest(`/api/Usuario/${id}`, {
    method: "DELETE",
  });
}

/** Reativa um usuário desativado. Somente Administrador. */
export function reativarUsuario(id) {
  return apiRequest(`/api/Usuario/${id}/reativar`, {
    method: "PUT",
  });
}
