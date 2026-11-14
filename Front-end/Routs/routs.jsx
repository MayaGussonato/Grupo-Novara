import React from "react";

import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { useAuth } from "./Services/AuthContext";

// Telas
import Login from "./Components/login/Login";
import Cadastro from "./Components/cadastro/Cadastro";
import Dashboard from "./Components/dashboard/Dashboard";
import Validacao from "./Components/Validacao/validacao";
import Importacao from "./Components/importacao/Importacao";
import Analise from "./Components/analise/Analise";
import Dados from "./Components/dados/Dados";
import Integracoes from "./Components/integracoes/Integracoes";
import Administracao from "./Components/administracao/Administracao";
import Perfil from "./Components/perfil/Perfil";

const rotasPorNome = {
  Login: "/login",
  Cadastro: "/cadastro",
  Dashboard: "/Dashboard",
  Validacao: "/validacao",
  Documento: "/validacao",
  Documentos: "/validacao",
  Importacao: "/importacao",
  Importar: "/integracao",
  Analise: "/analise",
  Dados: "/dados",
  Integracoes: "/integracoes",
  Integrar: "/integracoes",
  Administracao: "/administracao",
  Usuarios: "/administracao",
  Perfil: "/perfil",
  RecuperarSenha: "/recuperar-senha",
};

function Carregando() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
      <Text>Carregando...</Text>
    </View>
  );
}

function RotaPrivada() {
  const { usuario, carregando } = useAuth();

  if (carregando) return <Carregando />;

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function RotaPublica() {
  const { usuario, carregando } = useAuth();

  if (carregando) return <Carregando />;

  if (usuario) {
    return <Navigate to="/Dashboard" replace />;
  }

  return <Outlet />;
}

function Tela({ component: Component }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = {
    navigate: (nome, params) => {
      const destino = rotasPorNome[nome] || nome;

      navigate(destino, {
        state: params,
      });
    },

    goBack: () => navigate(-1),

    openDrawer: () => navigate("/Dashboard"),
  };

  const route = {
    params: location.state || {},
  };

  return (
    <Component
      navigation={navigation}
      route={route}
    />
  );
}

function PaginaIndisponivel() {
  const navigate = useNavigate();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text>Funcionalidade ainda não implementada.</Text>

      <TouchableOpacity
        onPress={() => navigate("/login")}
        style={{ padding: 15 }}
      >
        <Text>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function ReactRouter() {
  return (
    <Routes>
      <Route element={<RotaPublica />}>
        <Route
          path="/login"
          element={<Tela component={Login} />}
        />

        <Route
          path="/cadastro"
          element={<Tela component={Cadastro} />}
        />
      </Route>

      <Route
        path="/recuperar-senha"
        element={<PaginaIndisponivel />}
      />

      <Route element={<RotaPrivada />}>
        <Route
          path="/"
          element={<Navigate to="/Dashboard" replace />}
        />

        <Route
          path="/Dashboard"
          element={<Tela component={Dashboard} />}
        />

        <Route
          path="/validacao"
          element={<Tela component={Validacao} />}
        />

        <Route
          path="/documentos"
          element={<Navigate to="/validacao" replace />}
        />

        <Route
          path="/importacao"
          element={<Tela component={Importacao} />}
        />

        <Route
          path="/analise"
          element={<Tela component={Analise} />}
        />

        <Route
          path="/dados"
          element={<Tela component={Dados} />}
        />

        <Route
          path="/integracoes"
          element={<Tela component={Integracoes} />}
        />

        <Route
          path="/administracao"
          element={<Tela component={Administracao} />}
        />

        <Route
          path="/perfil"
          element={<Tela component={Perfil} />}
        />

        <Route
          path="*"
          element={<PaginaIndisponivel />}
        />
      </Route>
    </Routes>
  );
}
