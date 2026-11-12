
import { apiRequest } from "./api";

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

export function listarUsuarios() {
  return apiRequest("/api/Usuario");
}

export function alterarPerfilUsuario(id, perfilAcesso) {
  return apiRequest(`/api/Usuario/${id}/perfil`, {
    method: "PUT",
    body: JSON.stringify({ perfilAcesso }),
  });
}
