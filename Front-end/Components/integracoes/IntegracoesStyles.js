import { StyleSheet } from "react-native";

// Estilos gerados a partir das cores do TemaContext.
export const criarIntegracaoStyles = (cores, modoEscuro) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.background,
      borderLeftWidth: 2,
      borderRightWidth: 2,
      borderColor: "#159BFF",
    },

    conteudo: {
      paddingHorizontal: 14,
      paddingTop: 14,
      paddingBottom: 30,
    },

    sim: {
      alignItems: "center",
      justifyContent: "center",
    },

    subtitulo: {
      fontSize: 13,
      color: cores.textoSecundario,
      lineHeight: 21,
      marginBottom: 13,
    },

    lista: {
      gap: 13,
    },

    card: {
      minHeight: 80,
      backgroundColor: cores.card,
      borderRadius: 5,
      // No modo escuro a sombra some, então uso uma borda para separar os cards
      borderWidth: modoEscuro ? 1 : 0,
      borderColor: cores.borda,
      paddingHorizontal: 10,
      paddingVertical: 9,
      flexDirection: "row",
      alignItems: "center",

      elevation: 3,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
    },

    logoContainer: {
      width: 66,
      height: 58,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 8,
    },

    // Cores das marcas continuam iguais nos dois temas
    logo: {
      width: 49,
      height: 49,
      alignItems: "center",
      justifyContent: "center",
    },

    textoLogo: {
      fontSize: 31,
      fontWeight: "bold",
      color: "#FFFFFF",
    },

    sap: {
      width: 49,
      height: 35,
      backgroundColor: "#0879BB",
      transform: [{ skewX: "-10deg" }],
    },

    logoSap: {
      fontSize: 15,
      fontWeight: "900",
      color: "#FFFFFF",
    },

    totvs: {
      borderRadius: 30,
      backgroundColor: "#050505",
    },

    microsoft: {
      backgroundColor: "#0757D5",
      borderRadius: 5,
      transform: [{ rotate: "0deg" }],
    },

    google: {
      backgroundColor: "#4285F4",
      borderRadius: 10,
    },

    onedrive: {
      backgroundColor: "#E5F5FF",
      borderRadius: 30,
    },

    informacoes: {
      flex: 1,
      justifyContent: "center",
    },

    nome: {
      fontSize: 12,
      fontWeight: "700",
      color: cores.texto,
      marginBottom: 5,
    },

    status: {
      alignSelf: "flex-start",
      minWidth: 70,
      paddingHorizontal: 9,
      paddingVertical: 4,
      borderRadius: 5,
      marginBottom: 4,
    },

    statusConectado: {
      backgroundColor: modoEscuro ? cores.statusAtivo : "#D8F4E9",
    },

    statusAtencao: {
      backgroundColor: modoEscuro ? "#5A4A1C" : "#FFF0C2",
    },

    textoStatus: {
      fontSize: 10,
    },

    textoConectado: {
      color: modoEscuro ? "#BDFFB8" : "#5C9D83",
    },

    textoAtencao: {
      color: modoEscuro ? "#F2C76B" : "#B68B21",
    },

    ultimaSincronizacao: {
      fontSize: 9,
      color: cores.textoSecundario,
    },

    data: {
      fontSize: 9,
      color: cores.textoSecundario,
    },

    menuContainer: {
      alignSelf: "flex-start",
      position: "relative",
      zIndex: 10,
      marginLeft: 5,
    },

    menu: {
      position: "absolute",
      right: 15,
      top: 0,
      width: 125,
      backgroundColor: modoEscuro ? cores.input : cores.card,
      borderWidth: modoEscuro ? 1 : 0,
      borderColor: cores.borda,
      borderRadius: 5,
      elevation: 6,
      shadowColor: "#000000",
      shadowOpacity: 0.15,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      zIndex: 20,
    },

    opcaoMenu: {
      paddingHorizontal: 10,
      paddingVertical: 11,
      borderBottomWidth: 0.5,
      borderBottomColor: cores.borda,
    },

    textoOpcao: {
      fontSize: 10,
      color: cores.texto,
    },
  });