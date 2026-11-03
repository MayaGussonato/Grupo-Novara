import { StyleSheet } from "react-native";

// Estilos gerados a partir das cores do TemaContext.
export const criarAdministracaoStyles = (cores, modoEscuro) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.background,
    },

    conteudo: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 16,
      paddingBottom: 30,
    },

    subtitulo: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginBottom: 20,
    },

    abas: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },

    aba: {
      paddingHorizontal: 6,
      paddingVertical: 5,
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },

    abaSelecionada: {
      borderBottomColor: "transparent",
    },

    textoAba: {
      fontSize: 13,
      color: cores.texto,
    },

    textoAbaSelecionado: {
      color: cores.vinho,
      fontWeight: "600",
    },

    pesquisaContainer: {
      height: 38,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: cores.input,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 6,
      paddingHorizontal: 9,
      marginBottom: 13,
      gap: 8,
    },

    inputPesquisa: {
      flex: 1,
      height: "100%",
      fontSize: 12,
      color: cores.texto,
      paddingVertical: 0,
    },

    cardLista: {
      backgroundColor: cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 6,
      paddingHorizontal: 9,
      paddingVertical: 12,
      elevation: 3,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
    },

    cardUsuario: {
      minHeight: 42,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 5,
      backgroundColor: modoEscuro ? cores.input : cores.card,
      paddingHorizontal: 8,
      paddingVertical: 7,
      marginBottom: 9,
      gap: 7,
    },

    nomeUsuario: {
      flex: 1,
      fontSize: 11,
      color: cores.texto,
    },

    status: {
      minWidth: 49,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 5,
    },

    statusAtivo: {
      backgroundColor: cores.statusAtivo,
    },

    statusInativo: {
      backgroundColor: cores.statusInativo,
    },

    textoStatus: {
      fontSize: 9,
    },

    textoAtivo: {
      color: modoEscuro ? "#BDFFB8" : "#17652D",
    },

    textoInativo: {
      color: modoEscuro ? "#FFC5C5" : "#8A2020",
    },

    semResultados: {
      fontSize: 14,
      color: cores.textoSecundario,
      textAlign: "center",
      paddingVertical: 24,
    },

    botaoNovo: {
      alignSelf: "flex-end",
      minWidth: 120,
      height: 35,
      paddingHorizontal: 14,
      backgroundColor: cores.vinho,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 45,
      marginRight: 0,
    },

    textoBotaoNovo: {
      color: "#FFFFFF",
      fontSize: 12,
    },
  });