
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IdiomaContext = createContext(null);

const traducoes = {
  // ==========================================
  // PORTUGUÊS BRASIL
  // ==========================================
  "pt-BR": {
    idioma: "Idioma",
    portugues: "Português (Brasil)",
    ingles: "Inglês",
    espanhol: "Espanhol",

    // Login
    login: "Entrar",
    tituloLogin: "Login",
    boasVindas: "Bem-vindo(a)",
    email: "E-mail",
    senha: "Senha",
    preencherCampos: "Preencha o e-mail e a senha.",
    esqueceuSenha: "Esqueceu sua senha?",
    entrarGoogle: "Entrar com Google",
    ou: "ou",
    criarConta: "Criar uma conta",
    automacao: "Automação inteligente",
    documentos: "de documentos.",

    // Perfil
    meuPerfil: "Meu Perfil",
    preferencias: "Preferências",
    gerenciePerfil: "Gerencie suas informações e preferências",
    modoEscuro: "Modo escuro",
    perfil: "Perfil",
    seguranca: "Segurança",
    nomeCompleto: "Nome completo",
    cargo: "Função",
    telefone: "Telefone",
    salvarAlteracoes: "Salvar alterações",
    deslogar: "Deslogar",
    cancelar: "Cancelar",
    confirmarSaida: "Tem certeza de que deseja sair da sua conta?",

    // Header e navegação
    dashboard: "Dashboard",
    importacao: "Importação",
    analise: "Análise",
    validacao: "Validação",
    dados: "Dados",
    administracao: "Administração",
    atendimento: "Central de Atendimentos",
    integracoes: "Integrações",

    // Documentos
    documento: "Documento",
    documentosRecentes: "Documentos recentes",
    todos: "Todos",
    processando: "Processando",
    revisando: "Revisando",
    aprovados: "Aprovados",
    erros: "Erros",
    maisRecentes: "Mais recentes",
    maisAntigos: "Mais antigos",
    pesquisar: "Pesquisar",
    nenhumDocumento: "Nenhum documento encontrado.",
    nenhumDado: "Nenhuma informação disponível.",
    carregarDocumento: "Carregando documentos...",

    // Ações e mensagens
    salvar: "Salvar",
    excluir: "Excluir",
    editar: "Editar",
    voltar: "Voltar",
    confirmar: "Confirmar",
    carregando: "Carregando...",
    erro: "Erro",
    sucesso: "Sucesso",
    telefoneAtualizado: "Seu telefone foi atualizado!",
    telefoneInvalido: "Informe um telefone válido com DDD.",
    erroCarregarPerfil: "Não foi possível carregar seu perfil.",
    erroSalvarTelefone: "Não foi possível atualizar seu telefone.",

    // Segurança
    senhaAtual: "Senha atual",
    novaSenha: "Nova senha",
    confirmarSenha: "Confirmar senha",
    alterarSenha: "Alterar senha",
  },

  // ==========================================
  // INGLÊS
  // ==========================================
  en: {
    idioma: "Language",
    portugues: "Portuguese (Brazil)",
    ingles: "English",
    espanhol: "Spanish",

    // Login
    login: "Sign in",
    tituloLogin: "Login",
    boasVindas: "Welcome",
    email: "Email",
    senha: "Password",
    preencherCampos: "Enter your email and password.",
    esqueceuSenha: "Forgot your password?",
    entrarGoogle: "Continue with Google",
    ou: "or",
    criarConta: "Create an account",
    automacao: "Smart document",
    documentos: "automation.",

    // Profile
    meuPerfil: "My Profile",
    preferencias: "Preferences",
    gerenciePerfil: "Manage your information and preferences",
    modoEscuro: "Dark mode",
    perfil: "Profile",
    seguranca: "Security",
    nomeCompleto: "Full name",
    cargo: "Role",
    telefone: "Phone",
    salvarAlteracoes: "Save changes",
    deslogar: "Sign out",
    cancelar: "Cancel",
    confirmarSaida: "Are you sure you want to sign out?",

    // Header and navigation
    dashboard: "Dashboard",
    importacao: "Import",
    analise: "Analysis",
    validacao: "Validation",
    dados: "Data",
    administracao: "Administration",
    atendimento: "Service Center",
    integracoes: "Integrations",

    // Documents
    documento: "Document",
    documentosRecentes: "Recent documents",
    todos: "All",
    processando: "Processing",
    revisando: "Under review",
    aprovados: "Approved",
    erros: "Errors",
    maisRecentes: "Newest first",
    maisAntigos: "Oldest first",
    pesquisar: "Search",
    nenhumDocumento: "No documents found.",
    nenhumDado: "No information available.",
    carregarDocumento: "Loading documents...",

    // Actions and messages
    salvar: "Save",
    excluir: "Delete",
    editar: "Edit",
    voltar: "Back",
    confirmar: "Confirm",
    carregando: "Loading...",
    erro: "Error",
    sucesso: "Success",
    telefoneAtualizado: "Your phone number has been updated!",
    telefoneInvalido: "Enter a valid phone number with area code.",
    erroCarregarPerfil: "Unable to load your profile.",
    erroSalvarTelefone: "Unable to update your phone number.",

    // Security
    senhaAtual: "Current password",
    novaSenha: "New password",
    confirmarSenha: "Confirm password",
    alterarSenha: "Change password",
  },

  // ==========================================
  // ESPANHOL
  // ==========================================
  es: {
    idioma: "Idioma",
    portugues: "Portugués (Brasil)",
    ingles: "Inglés",
    espanhol: "Español",

    // Login
    login: "Iniciar sesión",
    tituloLogin: "Acceso",
    boasVindas: "¡Bienvenido(a)!",
    email: "Correo electrónico",
    senha: "Contraseña",
    preencherCampos: "Introduce tu correo electrónico y contraseña.",
    esqueceuSenha: "¿Olvidaste tu contraseña?",
    entrarGoogle: "Continuar con Google",
    ou: "o",
    criarConta: "Crear una cuenta",
    automacao: "Automatización inteligente",
    documentos: "de documentos.",

    // Perfil
    meuPerfil: "Mi perfil",
    preferencias: "Preferencias",
    gerenciePerfil: "Administra tu información y preferencias",
    modoEscuro: "Modo oscuro",
    perfil: "Perfil",
    seguranca: "Seguridad",
    nomeCompleto: "Nombre completo",
    cargo: "Cargo",
    telefone: "Teléfono",
    salvarAlteracoes: "Guardar cambios",
    deslogar: "Cerrar sesión",
    cancelar: "Cancelar",
    confirmarSaida: "¿Estás seguro de que quieres cerrar sesión?",

    // Encabezado y navegación
    dashboard: "Panel",
    importacao: "Importación",
    analise: "Análisis",
    validacao: "Validación",
    dados: "Datos",
    administracao: "Administración",
    atendimento: "Centro de Atención",
    integracoes: "Integraciones",

    // Documentos
    documento: "Documento",
    documentosRecentes: "Documentos recientes",
    todos: "Todos",
    processando: "Procesando",
    revisando: "En revisión",
    aprovados: "Aprobados",
    erros: "Errores",
    maisRecentes: "Más recientes",
    maisAntigos: "Más antiguos",
    pesquisar: "Buscar",
    nenhumDocumento: "No se encontraron documentos.",
    nenhumDado: "No hay información disponible.",
    carregarDocumento: "Cargando documentos...",

    // Acciones y mensajes
    salvar: "Guardar",
    excluir: "Eliminar",
    editar: "Editar",
    voltar: "Volver",
    confirmar: "Confirmar",
    carregando: "Cargando...",
    erro: "Error",
    sucesso: "Éxito",
    telefoneAtualizado: "¡Tu teléfono ha sido actualizado!",
    telefoneInvalido: "Introduce un teléfono válido con código de área.",
    erroCarregarPerfil: "No se pudo cargar tu perfil.",
    erroSalvarTelefone: "No se pudo actualizar tu teléfono.",

    // Seguridad
    senhaAtual: "Contraseña actual",
    novaSenha: "Nueva contraseña",
    confirmarSenha: "Confirmar contraseña",
    alterarSenha: "Cambiar contraseña",
  },
};

export function IdiomaProvider({ children }) {
  const [idioma, setIdioma] = useState("pt-BR");
  const [carregandoIdioma, setCarregandoIdioma] = useState(true);

  // Carrega o idioma salvo.
  useEffect(() => {
    async function carregarIdioma() {
      try {
        let idiomaSalvo = null;

        if (Platform.OS === "web") {
          idiomaSalvo = localStorage.getItem("@labflow/idioma");
        } else {
          idiomaSalvo = await AsyncStorage.getItem("@labflow/idioma");
        }

        if (
          idiomaSalvo &&
          Object.prototype.hasOwnProperty.call(traducoes, idiomaSalvo)
        ) {
          setIdioma(idiomaSalvo);
        }
      } catch (erro) {
        console.warn("Erro ao carregar idioma:", erro);
      } finally {
        setCarregandoIdioma(false);
      }
    }

    carregarIdioma();
  }, []);

  // Altera e salva o idioma.
  async function alterarIdioma(novoIdioma) {
    if (!traducoes[novoIdioma]) {
      return;
    }

    setIdioma(novoIdioma);

    try {
      if (Platform.OS === "web") {
        localStorage.setItem("@labflow/idioma", novoIdioma);
      } else {
        await AsyncStorage.setItem("@labflow/idioma", novoIdioma);
      }
    } catch (erro) {
      console.warn("Erro ao salvar idioma:", erro);
    }
  }

  // Retorna a tradução da chave solicitada.
  function t(chave) {
    return (
      traducoes[idioma]?.[chave] ??
      traducoes["pt-BR"]?.[chave] ??
      chave
    );
  }

  return (
    <IdiomaContext.Provider
      value={{
        idioma,
        alterarIdioma,
        t,
        carregandoIdioma,
      }}
    >
      {children}
    </IdiomaContext.Provider>
  );
}

export function useIdioma() {
  const contexto = useContext(IdiomaContext);

  if (!contexto) {
    throw new Error(
      "useIdioma precisa estar dentro de IdiomaProvider."
    );
  }

  return contexto;
}
