
import { StyleSheet } from "react-native";

export const perfilStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3FFFC",
  },

  conteudo: {
    paddingHorizontal: 14,
    paddingTop: 20,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111111",
  },

  sim:{
    alignItems: "center",
  },

  subtitulo: {
    alignItems: "center",
    fontSize: 12,
    color: "#A0A9A7",
    marginTop: 3,
    marginBottom: 20,
  },

  abas: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  aba: {
    width: "42%",
    alignItems: "center",
    paddingVertical: 7,
  },

  textoAba: {
    fontSize: 14,
    fontWeight: "500",
    color: "#222222",
  },

  abaAtiva: {
    fontWeight: "700",
    color: "#174847",
  },

  linhaAtiva: {
    width: "100%",
    height: 2,
    backgroundColor: "#460303",
    position: "absolute",
    bottom: 0,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 13,
    paddingTop: 22,
    paddingBottom: 20,
  },

  usuario: {
    alignItems: "center",
    marginBottom: 20,
  },

  fotoContainer: {
    width: 62,
    height: 62,
    borderRadius: 35,
    backgroundColor: "#D3EEEE",
    alignItems: "center",
    justifyContent: "center",
  },

  iniciais: {
    fontSize: 24,
    color: "#111111",
  },

  botaoFoto: {
    position: "absolute",
    bottom: -2,
    right: 1,
    width: 20,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#174847",
    alignItems: "center",
    justifyContent: "center",
  },

  nomeUsuario: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111111",
    marginTop: 5,
  },

  cargoUsuario: {
    fontSize: 13,
    color: "#888888",
    marginTop: 3,
  },

  formulario: {
    gap: 15,
  },

  campo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 31,
    gap: 7,
  },

  label: {
    fontSize: 11,
    fontWeight: "500",
    color: "#222222",
    width: "43%",
  },

  input: {
    flex: 1,
    height: 31,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 7,
    fontSize: 9,
    color: "#777777",
  },

  botaoSalvar: {
    height: 37,
    backgroundColor: "#460303",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 23,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 12,
  },

  seguranca: {
    paddingVertical: 10,
  },

  tituloSeguranca: {
    fontSize: 17,
    fontWeight: "600",
    color: "#174847",
    marginBottom: 20,
  },

  labelSeguranca: {
    fontSize: 12,
    color: "#174847",
    marginBottom: 6,
    marginTop: 12,
  },

  inputSeguranca: {
    height: 40,
    borderWidth: 1,
    borderColor: "#70AAA9",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 12,
    backgroundColor: "#FFFFFF",
  },
});
