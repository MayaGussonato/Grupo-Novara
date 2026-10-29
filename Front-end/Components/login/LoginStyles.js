
import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003C3A",
  },

  banner: {
    height: "34%",
    minHeight: 220,
    backgroundColor: "#003C3A",
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
    backgroundColor: "#F3FFFC",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 2,
    borderColor: "#159BFF",
  },

  conteudoCartao: {
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 30,
  },

  boasVindas: {
    color: "#398783",
    fontSize: 13,
    fontWeight: "600",
  },

  titulo: {
    color: "#174847",
    fontSize: 40,
    fontWeight: "500",
    marginTop: -2,
    marginBottom: 25,
  },

  input: {
    height: 38,
    borderWidth: 1,
    borderColor: "#65A9A5",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#174847",
    marginBottom: 15,
  },

  senhaContainer: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#65A9A5",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },

  inputSenha: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#174847",
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
    color: "#650000",
    fontSize: 11,
  },

  botaoEntrar: {
    height: 38,
    backgroundColor: "#460303",
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
    backgroundColor: "#65A9A5",
  },

  textoOu: {
    color: "#285F60",
    fontSize: 13,
    fontWeight: "600",
    marginHorizontal: 14,
  },

  botaoGoogle: {
    height: 38,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#65A9A5",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  textoGoogle: {
    paddingLeft: 10,
    fontSize: 16,
    color: "#83B8B8",
  },

  criarConta: {
    alignSelf: "flex-start",
    marginTop: 12,
  },

  textoCriarConta: {
    fontSize: 11,
    color: "#650000",
  },
});
