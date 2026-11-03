import { StyleSheet } from "react-native";

export const perfilStyles = StyleSheet.create({
  container: {
    flex: 1,
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
  },

  sim: {
    alignItems: "center",
  },

  subtitulo: {
    alignItems: "center",
    fontSize: 12,
    marginTop: 3,
    marginBottom: 15,
  },

  botaoTema: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 15,
  },

  infoTema: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  textoTema: {
    fontSize: 13,
    fontWeight: "500",
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
  },

  abaAtiva: {
    fontWeight: "700",
  },

  linhaAtiva: {
    width: "100%",
    height: 2,
    position: "absolute",
    bottom: 0,
  },

  card: {
    borderWidth: 1,
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
    alignItems: "center",
    justifyContent: "center",
  },

  iniciais: {
    fontSize: 24,
    color: "#FFFFFF",
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
    marginTop: 5,
  },

  cargoUsuario: {
    fontSize: 13,
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
    width: "43%",
  },

  input: {
    flex: 1,
    height: 31,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 7,
    fontSize: 9,
  },

  botaoSalvar: {
    height: 37,
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
    marginBottom: 20,
  },

  labelSeguranca: {
    fontSize: 12,
    marginBottom: 6,
    marginTop: 12,
  },

  inputSeguranca: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 12,
  },
});