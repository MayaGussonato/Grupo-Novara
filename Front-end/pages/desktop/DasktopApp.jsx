
import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "../../Services/AuthContext";
import { useAuth } from "../../Services/AuthContext";

import {
  PreferencesProvider,
  usePreferences,
} from "../../context/PreferencesContext";

// TELAS DESKTOP
import Login from "./login/Login";
import Dashboard from "./dashboard/dashboard";
import CentralDeDocumentos from "./centralDeDocumentos/centralDeDocumentos";
import CentralDeAtendimentos from "./centralDeAtendimentos/centralDeAtendimentos";
import AnaliseDeDocumentos from "./analiseDeDocumentos/analiseDeDocumentos";
import ImportarDocumentos from "./importarDocumentos/importarDocumentos";
import Integracoes from "./integracoes/integracoes";
import Administracao from "./administracao/administracao";
import CadastroUsuario from "./cadastroUsuario/cadastroUsuario";
import MeuPerfil from "./meuPerfil/meuPerfil";

function DesktopContent() {
  const {
    usuario,
    carregando,
    entrar,
    sair,
  } = useAuth();

  const { colors } = usePreferences();

  const [tela, setTela] = useState("Dashboard");

  const [documentoSelecionado, setDocumentoSelecionado] =
    useState(null);

  const [usuarios, setUsuarios] = useState([]);

  const [usuarioEditando, setUsuarioEditando] =
    useState(null);

  const [mensagemErro, setMensagemErro] = useState("");

  function navegar(destino) {
    setMensagemErro("");
    setTela(destino);
  }

  async function fazerLogin(dados) {
    try {
      setMensagemErro("");

      await entrar(dados.email, dados.password);

      setTela("Dashboard");
    } catch (erro) {
      console.error("Erro no login:", erro);
      setMensagemErro(
        erro?.message || "Não foi possível entrar."
      );
    }
  }

  async function fazerLogout() {
    try {
      await sair();
      setDocumentoSelecionado(null);
      setTela("Dashboard");
    } catch (erro) {
      console.error("Erro ao sair:", erro);
    }
  }

  function abrirAnalise(documento) {
    setDocumentoSelecionado(documento);
    setTela("analise");
  }

  function abrirImportacao() {
    setTela("importar");
  }

  function salvarUsuario(dados) {
    if (usuarioEditando) {
      setUsuarios((anteriores) =>
        anteriores.map((item) =>
          item.id === usuarioEditando.id
            ? { ...item, ...dados }
            : item
        )
      );
    } else {
      setUsuarios((anteriores) => [
        ...anteriores,
        {
          id: Date.now(),
          ...dados,
          ativo: true,
        },
      ]);
    }

    setUsuarioEditando(null);
    setTela("administracao");
  }

  function editarUsuario(item) {
    setUsuarioEditando(item);
    setTela("cadastroUsuario");
  }

  function excluirUsuario(id) {
    setUsuarios((anteriores) =>
      anteriores.filter((item) => item.id !== id)
    );
  }

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.bg,
        }}
      >
        <ActivityIndicator
          size="large"
          color={colors.accent}
        />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={{ flex: 1 }}>
        <Login onLogin={fazerLogin} />

        {!!mensagemErro && (
          <View
            style={{
              position: "absolute",
              bottom: 20,
              left: 20,
              right: 20,
              padding: 12,
              backgroundColor: "#FDECEC",
              borderRadius: 8,
            }}
          >
            <StatusBar style="dark" />
          </View>
        )}
      </View>
    );
  }

  const propsMenu = {
    activeMenu: tela,
    onNavigate: navegar,
  };

  function renderizarTela() {
    switch (tela) {
      case "Dashboard":
        return (
          <Dashboard
            {...propsMenu}
            onOpenProfile={() => navegar("perfil")}
            onSeeAllActivities={() => navegar("documentos")}
          />
        );

      case "documentos":
        return (
          <CentralDeDocumentos
            {...propsMenu}
            onAddDocument={abrirImportacao}
            onOpenAnalysis={abrirAnalise}
            onOpenValidation={(documento) => {
              setDocumentoSelecionado(documento);
              setTela("validacao");
            }}
          />
        );

      case "atendimentos":
        return (
          <CentralDeAtendimentos
            {...propsMenu}
          />
        );

      case "analise":
        return (
          <AnaliseDeDocumentos
            {...propsMenu}
            doc={documentoSelecionado}
            onBack={() => navegar("documentos")}
            onSaveAnalysis={(documento, alteracoes) => {
              console.log(
                "Alterações da análise:",
                documento,
                alteracoes
              );
              navegar("documentos");
            }}
          />
        );

      case "importar":
        return (
          <ImportarDocumentos
            {...propsMenu}
            onBack={() => navegar("documentos")}
            onImport={(arquivos, tipo) => {
              console.log(
                "Arquivos selecionados:",
                arquivos,
                tipo
              );
              navegar("documentos");
            }}
          />
        );

      case "integracoes":
        return (
          <Integracoes {...propsMenu} />
        );

      case "administracao":
        if (
          usuario?.perfilAcesso?.toLowerCase() !==
          "administrador"
        ) {
          return (
            <Dashboard
              {...propsMenu}
            />
          );
        }

        return (
          <Administracao
            {...propsMenu}
            usuarios={usuarios}
            onAddUser={() => {
              setUsuarioEditando(null);
              navegar("cadastroUsuario");
            }}
            onEditUser={editarUsuario}
            onDeleteUser={excluirUsuario}
          />
        );

      case "cadastroUsuario":
        return (
          <CadastroUsuario
            usuario={usuarioEditando}
            onSubmit={salvarUsuario}
            onCancel={() => navegar("administracao")}
          />
        );

      case "perfil":
        return (
          <MeuPerfil
            {...propsMenu}
            onLogout={fazerLogout}
          />
        );

      default:
        return (
          <Dashboard {...propsMenu} />
        );
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={colors.statusBar} />
      {renderizarTela()}
    </View>
  );
}

export default function DesktopApp() {
  return (
    <PreferencesProvider>
      <DesktopContent />
    </PreferencesProvider>
  );
}
