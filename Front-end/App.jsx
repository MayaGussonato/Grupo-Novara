import React, { useState, useRef } from "react";
import {
  View,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

// MOBILE
import LoginMobile from "./Components/login/Login";
import CadastroMobile from "./Components/cadastro/Cadastro";
import DashboardMobile from "./Components/dashboard/Dashboard";
import ImportacaoMobile from "./Components/importacao/Importacao";
import AnaliseMobile from "./Components/analise/Analise";
import ValidacaoMobile from "./Components/Validacao/validacao";
import DadosMobile from "./Components/dados/Dados";
import AdministracaoMobile from "./Components/administracao/Administracao";
import PerfilMobile from "./Components/perfil/Perfil";
import CadastroAdminMobile from "./Components/administracao/CadastroAdmin";

// DESKTOP
import {
  PreferencesProvider,
  usePreferences,
} from "./context/PreferencesContext";

import LoginDesktop from "./pages/desktop/login/Login";
import DashboardDesktop from "./pages/desktop/dashboard/dashboard";
import CentralDeDocumentosDesktop from "./pages/desktop/centralDeDocumentos/centralDeDocumentos";
import CentralDeAtendimentosDesktop from "./pages/desktop/centralDeAtendimentos/centralDeAtendimentos";
import AnaliseDesktop from "./pages/desktop/analiseDeDocumentos/analiseDeDocumentos";
import ImportacaoDesktop from "./pages/desktop/importarDocumentos/importarDocumentos";
import ValidacaoDesktop from "./pages/desktop/centralDeValidacao/centralDeValidacao";
import IntegracoesDesktop from "./pages/desktop/integracoes/integracoes";
import AdministracaoDesktop from "./pages/desktop/administracao/administracao";
import CadastroDesktop from "./pages/desktop/cadastroUsuario/cadastroUsuario";
import PerfilDesktop from "./pages/desktop/meuPerfil/meuPerfil";

// CONTEXTOS E SERVIÇOS
import { IdiomaProvider } from "./Components/idioma/IdiomaContext";
import { TemaProvider } from "./Components/tema/TemaContext";

import {
  AuthProvider,
  useAuth,
} from "./Services/AuthContext";

import { cadastrarUsuario } from "./Services/usuarioService";

// ==========================================
// APLICAÇÃO DESKTOP
// ==========================================

function AppDesktop() {
  const { usuario, carregando, entrar, sair } = useAuth();
  const { colors } = usePreferences();

  const [tela, setTela] = useState("dashboard");
  const [analysisDoc, setAnalysisDoc] = useState(null);
  const [validationDoc, setValidationDoc] = useState(null);
  const [docOverrides, setDocOverrides] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const docsVisited = useRef(false);

  function navigate(key) {
    setTela(key);
  }

  function handleLogout() {
    docsVisited.current = false;
    setAnalysisDoc(null);
    setValidationDoc(null);
    setEditingUser(null);
    sair();
    setTela("login");
  }

  function handleSaveValidation(doc, changes) {
    if (doc) {
      setDocOverrides((prev) => ({
        ...prev,
        [doc.id]: {
          ...(prev[doc.id] || {}),
          ...changes,
        },
      }));
    }

    setValidationDoc(null);
    setTela("documentos");
  }

  function handleSaveAnalysis(doc, changes) {
    if (doc) {
      setDocOverrides((prev) => ({
        ...prev,
        [doc.id]: {
          ...(prev[doc.id] || {}),
          ...changes,
        },
      }));
    }

    setAnalysisDoc(null);
    setTela("documentos");
  }

  function handleAddUser() {
    setEditingUser(null);
    setTela("cadastroUsuario");
  }

  function handleEditUser(usuarioSelecionado) {
    setEditingUser(usuarioSelecionado);
    setTela("cadastroUsuario");
  }

  function handleSaveUser(dados) {
    if (editingUser) {
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...dados }
            : u
        )
      );
    } else {
      setUsuarios((prev) => [
        { id: Date.now(), ativo: true, ...dados },
        ...prev,
      ]);
    }

    setEditingUser(null);
    setTela("administracao");
  }

  function handleCancelUser() {
    setEditingUser(null);
    setTela("administracao");
  }

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  if (!usuario) {
    return (
      <LoginDesktop
        onLogin={async (email, senha) => {
          await entrar(email, senha);
          setTela("dashboard");
        }}
      />
    );
  }

  const common = {
    activeMenu: tela,
    onNavigate: navigate,
  };

  if (
    tela === "documentos" ||
    tela === "analise" ||
    tela === "importar" ||
    tela === "validacao"
  ) {
    docsVisited.current = true;
  }

  function renderScreen() {
    switch (tela) {
      case "importar":
        return (
          <ImportacaoDesktop
            activeMenu="documentos"
            onNavigate={navigate}
            onBack={() => navigate("documentos")}
            onImport={() => navigate("documentos")}
          />
        );

      case "analise":
        return (
          <AnaliseDesktop
            doc={analysisDoc}
            activeMenu="documentos"
            onNavigate={navigate}
            onBack={() => navigate("documentos")}
            onSaveAnalysis={handleSaveAnalysis}
          />
        );

      case "validacao":
        return (
          <ValidacaoDesktop
            doc={validationDoc}
            activeMenu="documentos"
            onNavigate={navigate}
            onBack={() => navigate("documentos")}
            onSave={handleSaveValidation}
            onDelete={() => navigate("documentos")}
          />
        );

      case "atendimentos":
        return (
          <CentralDeAtendimentosDesktop
            {...common}
            onAddAtendimento={() => {}}
            onOpenAtendimento={() => {}}
          />
        );

      case "integracoes":
        return <IntegracoesDesktop {...common} />;

      case "administracao":
        return (
          <AdministracaoDesktop
            {...common}
            usuarios={usuarios}
            onAddUser={handleAddUser}
            onEditUser={handleEditUser}
            onDeleteUser={(id) =>
              setUsuarios((prev) =>
                prev.filter((u) => u.id !== id)
              )
            }
          />
        );

      case "cadastroUsuario":
        return (
          <CadastroDesktop
            usuario={editingUser}
            onSubmit={handleSaveUser}
            onCancel={handleCancelUser}
          />
        );

      case "perfil":
        return (
          <PerfilDesktop
            {...common}
            onLogout={handleLogout}
          />
        );

      case "documentos":
        return (
          <CentralDeDocumentosDesktop
            activeMenu="documentos"
            onNavigate={navigate}
            onAddDocument={() => navigate("importar")}
            onOpenAnalysis={(doc) => {
              setAnalysisDoc(doc);
              navigate("analise");
            }}
            onOpenValidation={(doc) => {
              setValidationDoc(doc);
              navigate("validacao");
            }}
            overrides={docOverrides}
          />
        );

      case "dashboard":
      default:
        return (
          <DashboardDesktop
            {...common}
            onSeeAllActivities={() => navigate("documentos")}
            onOpenProfile={() => navigate("perfil")}
          />
        );
    }
  }

  return renderScreen();
}

// ==========================================
// APLICAÇÃO MOBILE E TABLET
// ==========================================

function AppMobile() {
  const { usuario, carregando, entrar, sair } = useAuth();

  const [tela, setTela] = useState("Login");
  const [parametros, setParametros] = useState({});

  const navigation = {
    navigate: (destino, params = {}) => {
      setParametros(params);
      setTela(destino);
    },

    goBack: () => {
      setParametros({});

      setTela((telaAtual) => {
        if (telaAtual === "CadastroAdmin") {
          return "Administracao";
        }

        if (telaAtual === "Administracao") {
          return "Dashboard";
        }

        return "Dashboard";
      });
    },
  };

  if (carregando) {
    return <ActivityIndicator size="large" />;
  }

  // Usuário ainda não autenticado: Login ou Cadastro público.
  if (!usuario) {
    if (tela === "Cadastro") {
      return (
        <CadastroMobile
          navigation={navigation}
          onCadastrar={async (dados) => {
            await cadastrarUsuario(dados);
            setTela("Login");
          }}
        />
      );
    }

    return (
      <LoginMobile
        navigation={navigation}
        onLogin={async (email, senha) => {
          await entrar(email, senha);
          setTela("Dashboard");
        }}
      />
    );
  }

  switch (tela) {
    case "Importacao":
      return (
        <ImportacaoMobile
          navigation={navigation}
        />
      );

    case "Analise":
      return (
        <AnaliseMobile
          navigation={navigation}
          route={{ params: parametros }}
        />
      );

    case "Validacao":
      return (
        <ValidacaoMobile
          navigation={navigation}
        />
      );

    case "Dados":
      return (
        <DadosMobile
          navigation={navigation}
          route={{ params: parametros }}
        />
      );

    case "Administracao":
      if (
        usuario?.perfilAcesso?.trim().toLowerCase() !==
        "administrador"
      ) {
        return (
          <DashboardMobile
            navigation={navigation}
            usuario={usuario}
          />
        );
      }

      return (
        <AdministracaoMobile
          navigation={navigation}
        />
      );

    case "CadastroAdmin":
      if (
        usuario?.perfilAcesso?.trim().toLowerCase() !==
        "administrador"
      ) {
        return (
          <DashboardMobile
            navigation={navigation}
            usuario={usuario}
          />
        );
      }

      return (
        <CadastroAdminMobile
          navigation={navigation}
          onCancelar={() => {
            setParametros({});
            setTela("Administracao");
          }}
          onSucesso={() => {
            setParametros({});
            setTela("Administracao");
          }}
        />
      );

    case "Perfil":
      return (
        <PerfilMobile
          navigation={navigation}
          onLogout={sair}
          usuario={usuario}
        />
      );

    case "Dashboard":
    default:
      return (
        <DashboardMobile
          navigation={navigation}
          usuario={usuario}
        />
      );
  }
}

// ==========================================
// DETECÇÃO AUTOMÁTICA DA TELA
// ==========================================

function AppResponsive() {
  const { width } = useWindowDimensions();

  const ehDesktop = width >= 1024;

  return (
    <PreferencesProvider>
      {ehDesktop ? <AppDesktop /> : <AppMobile />}
    </PreferencesProvider>
  );
}

// ==========================================
// PROVEDORES GLOBAIS
// ==========================================

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        style="dark"
        backgroundColor="#FFFFFF"
        translucent={false}
      />

      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
        edges={["top", "bottom", "left", "right"]}
      >
        <IdiomaProvider>
          <TemaProvider>
            <AuthProvider>
              <AppResponsive />
            </AuthProvider>
          </TemaProvider>
        </IdiomaProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}