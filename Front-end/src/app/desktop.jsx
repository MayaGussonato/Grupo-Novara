
import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Redirect } from "expo-router";

import { PreferencesProvider, usePreferences } from "../../context/PreferencesContext";

import { useAuth } from "../../Services/AuthContext";

import Login from "../../pages/desktop/login/Login";
import Dashboard from "../../pages/desktop/dashboard/dashboard";
import CentralDeDocumentos from "../../pages/desktop/centralDeDocumentos/centralDeDocumentos";
import CentralDeAtendimentos from "../../pages/desktop/centralDeAtendimentos/centralDeAtendimentos";
import AnaliseDeDocumentos from "../../pages/desktop/analiseDeDocumentos/analiseDeDocumentos";
import ImportarDocumentos from "../../pages/desktop/importarDocumentos/importarDocumentos";
import CentralDeValidacao from "../../pages/desktop/centralDeValidacao/centralDeValidacao";
import Integracoes from "../../pages/desktop/integracoes/integracoes";
import Administracao from "../../pages/desktop/administracao/administracao";
import CadastroUsuario from "../../pages/desktop/cadastroUsuario/cadastroUsuario";
import MeuPerfil from "../../pages/desktop/meuPerfil/meuPerfil";

function DesktopContent() {
  const { usuario, carregando, entrar, sair } = useAuth();
  const { colors } = usePreferences();

  const [tela, setTela] = useState("dashboard");
  const [analysisDoc, setAnalysisDoc] = useState(null);
  const [validationDoc, setValidationDoc] = useState(null);
  const [docOverrides, setDocOverrides] = useState({});
  const [usuarios, setUsuarios] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

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
      <Login
        onLogin={async (email, senha) => {
          await entrar(email, senha);
          setTela("dashboard");
        }}
      />
    );
  }

  function navegar(destino) {
    setTela(destino);
  }

  function sairDaConta() {
    setAnalysisDoc(null);
    setValidationDoc(null);
    setEditingUser(null);
    setTela("dashboard");
    sair();
  }

  function salvarAnalise(doc, alteracoes) {
    if (doc) {
      setDocOverrides((anterior) => ({
        ...anterior,
        [doc.id]: {
          ...(anterior[doc.id] || {}),
          ...alteracoes,
        },
      }));
    }

    setAnalysisDoc(null);
    setTela("documentos");
  }

  function salvarValidacao(doc, alteracoes) {
    if (doc) {
      setDocOverrides((anterior) => ({
        ...anterior,
        [doc.id]: {
          ...(anterior[doc.id] || {}),
          ...alteracoes,
        },
      }));
    }

    setValidationDoc(null);
    setTela("documentos");
  }

  function salvarUsuario(dados) {
    if (editingUser) {
      setUsuarios((anterior) =>
        anterior.map((item) =>
          item.id === editingUser.id
            ? { ...item, ...dados }
            : item
        )
      );
    } else {
      setUsuarios((anterior) => [
        {
          id: Date.now(),
          ativo: true,
          ...dados,
        },
        ...anterior,
      ]);
    }

    setEditingUser(null);
    setTela("administracao");
  }

  const propriedades = {
    activeMenu: tela,
    onNavigate: navegar,
  };

  function renderizarTela() {
    switch (tela) {
      case "documentos":
        return (
          <CentralDeDocumentos
            {...propriedades}
            onAddDocument={() => navegar("importar")}
            onOpenAnalysis={(doc) => {
              setAnalysisDoc(doc);
              navegar("analise");
            }}
            onOpenValidation={(doc) => {
              setValidationDoc(doc);
              navegar("validacao");
            }}
            overrides={docOverrides}
          />
        );

      case "importar":
        return (
          <ImportarDocumentos
            activeMenu="documentos"
            onNavigate={navegar}
            onBack={() => navegar("documentos")}
            onImport={() => navegar("documentos")}
          />
        );

      case "analise":
        return (
          <AnaliseDeDocumentos
            doc={analysisDoc}
            activeMenu="documentos"
            onNavigate={navegar}
            onBack={() => navegar("documentos")}
            onSaveAnalysis={salvarAnalise}
          />
        );

      case "validacao":
        return (
          <CentralDeValidacao
            doc={validationDoc}
            activeMenu="documentos"
            onNavigate={navegar}
            onBack={() => navegar("documentos")}
            onSave={salvarValidacao}
            onDelete={() => navegar("documentos")}
          />
        );

      case "atendimentos":
        return (
          <CentralDeAtendimentos
            {...propriedades}
          />
        );

      case "integracoes":
        return <Integracoes {...propriedades} />;

      case "administracao":
        return (
          <Administracao
            {...propriedades}
            usuarios={usuarios}
            onAddUser={() => {
              setEditingUser(null);
              navegar("cadastroUsuario");
            }}
            onEditUser={(item) => {
              setEditingUser(item);
              navegar("cadastroUsuario");
            }}
            onDeleteUser={(id) =>
              setUsuarios((anterior) =>
                anterior.filter((item) => item.id !== id)
              )
            }
          />
        );

      case "cadastroUsuario":
        return (
          <CadastroUsuario
            usuario={editingUser}
            onSubmit={salvarUsuario}
            onCancel={() => {
              setEditingUser(null);
              navegar("administracao");
            }}
          />
        );

      case "perfil":
        return (
          <MeuPerfil
            {...propriedades}
            onLogout={sairDaConta}
          />
        );

      case "dashboard":
      default:
        return (
          <Dashboard
            {...propriedades}
            onSeeAllActivities={() => navegar("documentos")}
            onOpenProfile={() => navegar("perfil")}
          />
        );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.bg,
      }}
    >
      <StatusBar style={colors.statusBar} />
      {renderizarTela()}
    </View>
  );
}

export default function Desktop() {
  return (
    <PreferencesProvider>
      <DesktopContent />
    </PreferencesProvider>
  );
}
