
import { apiRequest } from "./api";

// ---------- Usuários ----------

export function cadastrarUsuario(dados) {
  return apiRequest("/api/Usuario/registro", {
    method: "POST",
    public: true,
    body: JSON.stringify(dados),
  });
}

export function atualizarMeuTelefone(telefone) {
  return apiRequest("/api/Usuario/me/telefone", {
    method: "PUT",
    body: JSON.stringify({ telefone }),
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

// Lista todos os usuários. Somente Administrador.
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

// Inativa a conta sem apagar o histórico.
export function excluirUsuario(id) {
  return apiRequest(`/api/Usuario/${id}`, {
    method: "DELETE",
  });
}

// Reativa uma conta inativa.
export function reativarUsuario(id) {
  return apiRequest(`/api/Usuario/${id}/reativar`, {
    method: "PUT",
  });
}

// Cadastro administrativo persistente.
export async function cadastrarUsuarioAdmin(dados) {
  // Primeiro, cria o usuário pela rota de registro existente.
  const novoUsuario = await cadastrarUsuario({
    nome: dados.nome,
    email: dados.email,
    senha: dados.senha,
    cargo: dados.cargo,
  });

  const id =
    novoUsuario?.idUsuario ??
    novoUsuario?.IdUsuario;

  if (!id) {
    throw new Error(
      "O usuário foi cadastrado, mas a API não retornou seu identificador."
    );
  }

  // Depois, utiliza o token do administrador para definir o perfil.
  try {
    if (dados.perfilAcesso !== "Funcionario") {
      await alterarPerfilUsuario(id, dados.perfilAcesso);
    }
  } catch (erro) {
    throw new Error(
      "O usuário foi salvo, mas não foi possível alterar seu perfil. " +
      "Ele permanece como Funcionário. " +
      (erro?.message || "")
    );
  }

  return novoUsuario;
}
