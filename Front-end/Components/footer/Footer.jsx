import React from "react";

import { View, Image, TouchableOpacity } from "react-native";
import { useNavigate, useLocation } from "react-router-dom";

import styles from "./FooterStyle";
import { useTema } from "../tema/TemaContext";

const icones = [
  {
    nome: "Dashboard",
    imagem: require("../../assets/Dashboard.png"),
    rota: "/dashboard",
  },
  {
    nome: "Documento",
    imagem: require("../../assets/Documento.png"),
    rota: "/validacao",
  },
  {
    nome: "Integrar",
    imagem: require("../../assets/Integrar.png"),
    rota: "/integracoes",
  },
  {
    nome: "Opcoes",
    imagem: require("../../assets/Opcoes.png"),
    rota: "/perfil",
  },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const { cores } = useTema();

  function verificarSelecionado(nome) {
    const caminho = location.pathname;

    if (nome === "Dashboard") {
      return caminho === "/dashboard";
    }

    if (nome === "Documento") {
      return [
        "/validacao",
        "/importacao",
        "/analise",
        "/dados",
      ].includes(caminho);
    }

    if (nome === "Integrar") {
      return caminho === "/integracoes";
    }

    if (nome === "Opcoes") {
      return [
        "/perfil",
        "/administracao",
      ].includes(caminho);
    }

    return false;
  }

  return (
    <View
      style={[
        styles.footer,
        {
          backgroundColor: cores.card,
          borderColor: cores.secundario,
        },
      ]}
    >
      {icones.map((icone) => {
        const ativo = verificarSelecionado(icone.nome);

        return (
          <TouchableOpacity
            key={icone.nome}
            style={styles.botao}
            onPress={() => navigate(icone.rota)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.areaIcone,
                ativo && [
                  styles.destaque,
                  {
                    backgroundColor: cores.input,
                    shadowColor: cores.primario,
                  },
                ],
              ]}
            >
              <Image
                source={icone.imagem}
                style={[
                  styles.icone,
                  {
                    tintColor: ativo
                      ? cores.primario
                      : cores.textoSecundario,
                  },
                ]}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}