
import { StyleSheet } from "react-native";

export function criarRecuperarSenhaStyles(cores, modoEscuro) {
  return StyleSheet.create({
    container: {
      flex: 1,
      minHeight: "100%",
    },

    banner: {
      width: "100%",
      minHeight: 230,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 35,
      paddingBottom: 30,
      overflow: "hidden",
    },

    formaBanner: {
      position: "absolute",
      width: "100%",
      height: "100%",
      opacity: 0.25,
    },

    logo: {
      width: 190,
      height: 75,
      marginBottom: 12,
    },

    slogan: {
      color: "#FFFFFF",
      fontSize: 16,
      textAlign: "center",
      lineHeight: 23,
      fontWeight: "500",
    },

    cartao: {
      flex: 1,
      width: "100%",
      backgroundColor: cores.background,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      marginTop: -5,
    },

    conteudoCartao: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 24,
      paddingVertical: 35,
    },

    formulario: {
      width: "100%",
      maxWidth: 460,
    },

    voltar: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "flex-start",
      marginBottom: 30,
      gap: 8,
    },

    textoVoltar: {
      color: cores.primario,
      fontSize: 14,
      fontWeight: "600",
    },

    iconeContainer: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: modoEscuro ? "#263E3B" : "#E3F3F0",
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      marginBottom: 22,
    },

    boasVindas: {
      color: cores.primario,
      fontSize: 15,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 8,
    },

    titulo: {
      color: cores.texto,
      fontSize: 27,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 14,
    },

    descricao: {
      color: cores.textoSecundario,
      fontSize: 15,
      lineHeight: 23,
      textAlign: "center",
      marginBottom: 30,
    },

    label: {
      color: cores.texto,
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 9,
    },

    input: {
      width: "100%",
      height: 52,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 10,
      backgroundColor: cores.input,
      paddingHorizontal: 16,
      color: cores.texto,
      fontSize: 15,
      marginBottom: 20,
      outlineStyle: "none",
    },

    botaoEnviar: {
      width: "100%",
      height: 52,
      backgroundColor: cores.primario,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },

    botaoDesabilitado: {
      opacity: 0.6,
    },

    textoBotao: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "bold",
    },

    ajudaContainer: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
      gap: 8,
      marginTop: 25,
      paddingHorizontal: 5,
    },

    ajudaTexto: {
      flex: 1,
      color: cores.textoSecundario,
      fontSize: 13,
      lineHeight: 19,
    },
  });
}
