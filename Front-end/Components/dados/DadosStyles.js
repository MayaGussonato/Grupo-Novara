import { StyleSheet } from "react-native";

// Estilos gerados a partir das cores do TemaContext.
export const criarDadosStyles = (cores, modoEscuro) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.background,
    },

    conteudo: {
      paddingHorizontal: 30,
      paddingTop: 8,
      paddingBottom: 30,
    },

    cardDados: {
      backgroundColor: cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 7,
      paddingHorizontal: 12,
      paddingVertical: 14,
      minHeight: 320,
      elevation: 3,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    },

    linhaDado: {
      minHeight: 48,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 6,
      backgroundColor: modoEscuro ? cores.input : cores.card,
      marginBottom: 9,
      paddingHorizontal: 13,
      paddingVertical: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },

    nomeCampo: {
      fontSize: 12,
      color: cores.texto,
      flex: 1,
    },

    valorCampo: {
      fontSize: 11,
      color: cores.texto,
      textAlign: "right",
      flexShrink: 1,
    },

    tituloExportar: {
      fontSize: 20,
      fontWeight: "500",
      color: cores.texto,
      marginTop: 20,
      marginBottom: 10,
      marginLeft: 10,
    },

    listaFormatos: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginHorizontal: 5,
      marginBottom: 32,
    },

    formato: {
      width: "23%",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 4,
      borderWidth: 1,
      borderColor: "transparent",
      borderRadius: 5,
    },

    formatoSelecionado: {
      borderColor: cores.secundario,
      backgroundColor: modoEscuro ? "#24403D" : "#E7F3F1",
    },

    iconeArquivo: {
      width: 50,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: modoEscuro ? cores.input : cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 4,
    },

    nomeFormato: {
      fontSize: 9,
      color: cores.texto,
      marginTop: 4,
    },

    botaoExportar: {
      height: 34,
      backgroundColor: modoEscuro ? cores.secundario : cores.primario,
      borderRadius: 4,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 0,
    },

    textoBotao: {
      fontSize: 11,
      color: "#FFFFFF",
    },
  });