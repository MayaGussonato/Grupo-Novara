import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./FooterStyle";
import { useTema } from "../context/TemaContext";

const icones = [
  {
    nome: "Dashboard",
    imagem: require("../../assets/Dashboard.png"),
  },
  {
    nome: "Documento",
    imagem: require("../../assets/Documento.png"),
  },
  {
    nome: "Integrar",
    imagem: require("../../assets/Integrar.png"),
  },
  {
    nome: "Opcoes",
    imagem: require("../../assets/Opcoes.png"),
  },
];

export default function Footer() {
  const [selecionado, setSelecionado] = useState("Documento");
  const { cores } = useTema();

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
        const ativo = selecionado === icone.nome;

        return (
          <TouchableOpacity
            key={icone.nome}
            style={styles.botao}
            onPress={() => setSelecionado(icone.nome)}
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
              {icone.tipo === "icone" ? (
                <Ionicons
                  name={icone.imagem}
                  size={32}
                  color={ativo ? cores.primario : cores.textoSecundario}
                />
              ) : (
                <Image
                  source={icone.imagem}
                  style={[
                    styles.icone,
                    {
                      tintColor: ativo ? cores.primario : cores.textoSecundario,
                    },
                  ]}
                  resizeMode="contain"
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}