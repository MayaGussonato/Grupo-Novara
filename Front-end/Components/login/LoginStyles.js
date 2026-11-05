import { StyleSheet } from "react-native";

// Agora os estilos são gerados a partir das cores do TemaContext.
export const criarLoginStyles = (cores, modoEscuro) =>
  StyleSheet.create({
    container: {
      flex: 1,
      // background: 'linear-gradient(to right, #004240, #013333)',
    },

    banner: {
      height: "34%",
      minHeight: 220,
      backgroundColor: modoEscuro ? "#0B2523" : "#003C3A",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      paddingTop: 10,
    },

    formaBanner: {
      position: "absolute",
    },

    logo: {
      width: "88%",
      height: 105,
      maxWidth: 330,
    },

    slogan: {
      color: "#F3FFFC",
      fontSize: 20,
      textAlign: "center",
      lineHeight: 29,
      marginTop: -2,
      fontWeight: "400",
    },

    cartao: {
      flex: 1,
      marginTop: -3,
      backgroundColor: cores.background,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
    },

    conteudoCartao: {
      paddingHorizontal: 25,
      paddingTop: 25,
      paddingBottom: 30,
    },

    boasVindas: {
      color: cores.primario,
      fontSize: 13,
      fontWeight: "600",
    },

    titulo: {
      color: cores.texto,
      fontSize: 40,
      fontWeight: "500",
      marginTop: -2,
      marginBottom: 25,
    },

    input: {
      height: 38,
      borderWidth: 1,
      borderColor: cores.secundario,
      borderRadius: 5,
      backgroundColor: cores.input,
      paddingHorizontal: 12,
      fontSize: 16,
      color: cores.texto,
      marginBottom: 15,
    },

    senhaContainer: {
      height: 38,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: cores.secundario,
      borderRadius: 5,
      backgroundColor: cores.input,
    },

    inputSenha: {
      flex: 1,
      height: "100%",
      paddingHorizontal: 12,
      fontSize: 16,
      color: cores.texto,
    },

    iconeSenha: {
      height: "100%",
      justifyContent: "center",
      paddingHorizontal: 10,
    },

    esqueciSenha: {
      alignSelf: "flex-start",
      marginTop: 6,
      marginBottom: 20,
    },

    textoLink: {
      color: modoEscuro ? cores.textoSecundario : "#650000",
      fontSize: 11,
    },

    botaoEntrar: {
      height: 38,
      backgroundColor: cores.vinho,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },

    textoBotaoEntrar: {
      color: "#FFFFFF",
      fontSize: 16,
    },

    divisor: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 12,
    },

    linha: {
      flex: 1,
      height: 1,
      backgroundColor: cores.secundario,
    },

    textoOu: {
      color: cores.primario,
      fontSize: 13,
      fontWeight: "600",
      marginHorizontal: 14,
    },

    botaoGoogle: {
      height: 38,
      backgroundColor: cores.input,
      borderWidth: 1,
      borderColor: cores.secundario,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },

    textoGoogle: {
      paddingLeft: 10,
      fontSize: 16,
      color: cores.textoSecundario,
    },

    criarConta: {
      alignSelf: "flex-start",
      marginTop: 12,
    },

    textoCriarConta: {
      fontSize: 11,
      color: modoEscuro ? cores.textoSecundario : "#650000",
    },
  });