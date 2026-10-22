
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F3F1",
  },

  conteudo: {
    paddingHorizontal: 26,
    paddingTop: 25,
    paddingBottom: 20,
    flexGrow: 1,
  },

  tituloPagina: {
    fontSize: 29,
    fontWeight: "500",
    color: "#111111",
    marginBottom: 28,
  },

  areaSelecao: {
    width: "100%",
    minHeight: 200,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#C8CECD",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 18,
  },

  textoArraste: {
    color: "#222222",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 8,
    textAlign: "center",
  },

  textoSelecione: {
    color: "#929292",
    fontSize: 13,
    marginTop: 5,
    textAlign: "center",
  },

  botaoSelecionar: {
    width: "78%",
    minHeight: 32,
    backgroundColor: "#287F7D",
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
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CDD2D1",
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
    color: "#222222",
    fontWeight: "500",
  },

  tamanhoDocumento: {
    fontSize: 10,
    color: "#A0A0A0",
    marginTop: 4,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C8F8C8",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
    gap: 2,
  },

  textoStatus: {
    fontSize: 9,
    color: "#216B31",
  },

  botaoRemover: {
    padding: 2,
  },

  acoes: {
    paddingHorizontal: 26,
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: "#E7F3F1",
    gap: 22,
  },

  botaoProcessar: {
    width: "100%",
    height: 49,
    backgroundColor: "#287F7D",
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
    color: "#650000",
    fontSize: 14,
  },
});
