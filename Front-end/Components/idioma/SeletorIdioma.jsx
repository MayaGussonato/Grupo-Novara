
import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

import { useIdioma } from "./IdiomaContext";
import { useTema } from "../tema/TemaContext";

export default function SeletorIdioma() {
  const { idioma, alterarIdioma, t } = useIdioma();
  const { cores } = useTema();

  const [aberto, setAberto] = useState(false);

  const idiomas = [
    {
      codigo: "pt-BR",
      sigla: "PT",
      chave: "portugues",
    },
    {
      codigo: "en",
      sigla: "EN",
      chave: "ingles",
    },
    {
      codigo: "es",
      sigla: "ES",
      chave: "espanhol",
    },
  ];

  const selecionado =
    idiomas.find((item) => item.codigo === idioma) || idiomas[0];

  async function selecionarIdioma(codigo) {
    await alterarIdioma(codigo);
    setAberto(false);
  }

  return (
    <View style={{ width: "100%" }}>
      <Text
        style={{
          color: cores.texto,
          fontSize: 13,
          fontWeight: "600",
          marginBottom: 8,
        }}
      >
        {t("idioma")}
      </Text>

      {/* Campo do seletor */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setAberto(true)}
        style={{
          minHeight: 43,
          paddingHorizontal: 13,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: cores.borda,
          backgroundColor: cores.input || cores.card,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Text
            style={{
              color: cores.primario,
              fontSize: 12,
              fontWeight: "700",
            }}
          >
            {selecionado.sigla}
          </Text>

          <Text
            style={{
              color: cores.texto,
              fontSize: 13,
            }}
          >
            {t(selecionado.chave)}
          </Text>
        </View>

        <Ionicons
          name="chevron-down"
          size={18}
          color={cores.textoSecundario}
        />
      </TouchableOpacity>

      {/* Menu de idiomas */}
      <Modal
        visible={aberto}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setAberto(false)}
      >
        <Pressable
          onPress={() => setAberto(false)}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            paddingHorizontal: 28,
          }}
        >
          <Pressable
            onPress={() => {}}
            style={{
              backgroundColor: cores.card,
              borderRadius: 10,
              padding: 9,
              borderWidth: 1,
              borderColor: cores.borda,
              elevation: 8,
            }}
          >
            <Text
              style={{
                color: cores.texto,
                fontSize: 14,
                fontWeight: "600",
                paddingHorizontal: 10,
                paddingVertical: 12,
              }}
            >
              {t("idioma")}
            </Text>

            {idiomas.map((item) => {
              const ativo = idioma === item.codigo;

              return (
                <TouchableOpacity
                  key={item.codigo}
                  activeOpacity={0.7}
                  onPress={() => selecionarIdioma(item.codigo)}
                  style={{
                    minHeight: 46,
                    paddingHorizontal: 11,
                    borderRadius: 7,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: ativo
                      ? cores.primario
                      : "transparent",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: ativo ? "#FFFFFF" : cores.primario,
                        fontSize: 12,
                        fontWeight: "700",
                      }}
                    >
                      {item.sigla}
                    </Text>

                    <Text
                      style={{
                        color: ativo ? "#FFFFFF" : cores.texto,
                        fontSize: 13,
                      }}
                    >
                      {t(item.chave)}
                    </Text>
                  </View>

                  {ativo && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color="#FFFFFF"
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
