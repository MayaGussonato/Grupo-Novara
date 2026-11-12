
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fazerLogin,
  buscarMeuPerfil,
} from "../Services/usuarioService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Recupera a sessão ao abrir o aplicativo.
  useEffect(() => {
    async function restaurarSessao() {
      try {
        const token = await AsyncStorage.getItem("@labflow/token");

        if (token) {
          const perfil = await buscarMeuPerfil();

          // O /me devolve o mesmo formato do login; normalizamos para o
          // objeto usado pelas telas (idUsuario, nome, perfilAcesso...)
          setUsuario({
            idUsuario: perfil.idUsuario,
            nome: perfil.nome,
            email: perfil.email,
            cargo: perfil.cargo,
            perfilAcesso: perfil.perfilAcesso,
            ativo: perfil.ativo,
          });
        }
      } catch (erro) {
        // Token vencido, usuário desativado ou API fora do ar:
        // a sessão local deixa de valer e a tela de login aparece.
        console.warn("Sessão não restaurada:", erro.message);
        await AsyncStorage.removeItem("@labflow/token");
        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    }

    restaurarSessao();
  }, []);

  async function entrar(email, senha) {
    const resposta = await fazerLogin(email, senha);

    await AsyncStorage.setItem(
      "@labflow/token",
      resposta.token
    );

    setUsuario({
      idUsuario: resposta.idUsuario,
      nome: resposta.nome,
      email: resposta.email,
      perfilAcesso: resposta.perfilAcesso,
    });

    return resposta;
  }

  async function sair() {
    await AsyncStorage.removeItem("@labflow/token");
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, entrar, sair }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
