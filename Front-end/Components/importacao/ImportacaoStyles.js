import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: 26,
    paddingTop: 25,
    paddingBottom: 20,
    flexGrow: 1,
  },

  areaSelecao: {
    width: "100%",
    minHeight: 200,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 18,
  },

  textoArraste: {
    fontSize: 13,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },

  textoSelecione: {
    fontSize: 13,
    marginTop: 5,
    textAlign: "center",
  },

  botaoSelecionar: {
    width: "78%",
    minHeight: 32,
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  textoBotaoSelecionar: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  listaDocumentos: {
    marginTop: 35,
    gap: 12,
  },

  documento: {
    minHeight: 49,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  infoDocumento: {
    flex: 1,
    justifyContent: "center",
  },

  nomeDocumento: {
    fontSize: 11,
    fontWeight: "500",
  },

  tamanhoDocumento: {
    fontSize: 10,
    marginTop: 4,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
    gap: 2,
  },

  textoStatus: {
    fontSize: 9,
  },

  botaoRemover: {
    padding: 2,
  },

  acoes: {
    paddingHorizontal: 26,
    paddingTop: 10,
    paddingBottom: 80,
    gap: 22,
  },

  botaoProcessar: {
    width: "100%",
    height: 49,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  textoBotaoProcessar: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "500",
  },

  botaoLimpar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    minHeight: 28,
  },

  textoLimpar: {
    fontSize: 14,
  },
});