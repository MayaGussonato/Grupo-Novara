
import React, { useState, useRef, useEffect } from "react";

import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  Animated,
  ScrollView,
} from "react-native";

import { usePathname } from "expo-router";

import styles from "./FooterStyle";
import { useTema } from "../tema/TemaContext";
import useRouteNavigation from "../navigation/useRouteNavigation";

const icones = [
  {
    nome: "Dashboard",
    destino: "Dashboard",
    imagem: require("../../assets/Dashboard.png"),
  },
  {
    nome: "Documento",
    destino: "Documento",
    imagem: require("../../assets/Documento.png"),
  },
  {
    nome: "Integrar",
    destino: "Integrar",
    imagem: require("../../assets/Integrar.png"),
  },
  {
    nome: "Opcoes",
    imagem: require("../../assets/Opcoes.png"),
  },
];

const outrasTelas = [
  { nome: "Importação", destino: "importacao" },
  { nome: "Análise", destino: "Analise" },
  { nome: "Validação", destino: "Validacao" },
  { nome: "Dados", destino: "Dados" },
  { nome: "Administração", destino: "Administracao" },
];

export default function Footer() {
  const { cores } = useTema();
  const navigation = useRouteNavigation();
  const pathname = usePathname();

  const [menuAberto, setMenuAberto] = useState(false);

  const deslocamento = useRef(new Animated.Value(300)).current;

  // Animação de abertura do HUD
  useEffect(() => {
    if (menuAberto) {
      Animated.timing(deslocamento, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [menuAberto, deslocamento]);

  // Fechar o HUD com animação
  function fecharMenu() {
    Animated.timing(deslocamento, {
      toValue: 300,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setMenuAberto(false);
    });
  }

  // Navegar e fechar o HUD
  function navegarPara(destino) {
    fecharMenu();
    navigation.navigate(destino);
  }

  // Rotas dos botões principais
  const rotas = {
    Dashboard: "/Dashboard",
    Documento: "/atendimento",
    Integrar: "/integracoes",
  };

  return (
    <>
      {/* FOOTER */}
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
          const ativo = icone.destino
            ? pathname.toLowerCase() ===
              rotas[icone.nome].toLowerCase()
            : false;

          return (
            <TouchableOpacity
              key={icone.nome}
              style={styles.botao}
              onPress={() => {
                if (icone.nome === "Opcoes") {
                  setMenuAberto(true);
                } else {
                  navigation.navigate(icone.destino);
                }
              }}
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

      {/* HUD LATERAL */}
      <Modal
        visible={menuAberto}
        transparent
        animationType="none"
        onRequestClose={fecharMenu}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          {/* Área externa para fechar */}
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={fecharMenu}
          />

          {/* PAINEL LATERAL */}
          <Animated.View
            style={{
              width: "75%",
              height: "100%",
              backgroundColor: cores.card,
              padding: 20,
              borderLeftWidth: 1,
              borderColor: cores.secundario,
              transform: [
                { translateX: deslocamento },
              ],
            }}
          >
            {/* CABEÇALHO */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  color: cores.texto,
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Outras opções
              </Text>

              <TouchableOpacity
                onPress={fecharMenu}
                style={{ padding: 5 }}
              >
                <Text
                  style={{
                    color: cores.texto,
                    fontSize: 28,
                  }}
                >
                  ×
                </Text>
              </TouchableOpacity>
            </View>

            {/* LISTA DE TELAS */}
            <ScrollView
              style={{ flex: 1 }}
              showsVerticalScrollIndicator={false}
            >
              {outrasTelas.map((item) => {
                const ativo =
                  pathname.toLowerCase() ===
                  (
                    item.destino === "importacao"
                      ? "/importacao"
                      : `/${item.destino.toLowerCase()}`
                  ).toLowerCase();

                return (
                  <TouchableOpacity
                    key={item.destino}
                    onPress={() => navegarPara(item.destino)}
                    activeOpacity={0.7}
                    style={{
                      paddingVertical: 17,
                      paddingHorizontal: 12,
                      borderBottomWidth: 1,
                      borderBottomColor: cores.secundario,
                      backgroundColor: ativo
                        ? cores.input
                        : "transparent",
                      borderRadius: 6,
                    }}
                  >
                    <Text
                      style={{
                        color: ativo
                          ? cores.primario
                          : cores.texto,
                        fontSize: 16,
                        fontWeight: ativo
                          ? "bold"
                          : "normal",
                      }}
                    >
                      {item.nome}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* PERFIL FIXADO EMBAIXO */}
            <TouchableOpacity
              onPress={() => navegarPara("perfil")}
              activeOpacity={0.7}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingVertical: 16,
                paddingHorizontal: 12,
                borderTopWidth: 1,
                borderTopColor: cores.secundario,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  color:
                    pathname.toLowerCase() === "/perfil"
                      ? cores.primario
                      : cores.texto,
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                Perfil
              </Text>

              <Image
                source={require("../../assets/Perfil.png")}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                }}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}
