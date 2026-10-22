
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F3F1",
  },

  conteudo: {
    paddingHorizontal: 20,
    paddingTop: 47,
    paddingBottom: 30,
  },

  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },

  indicador: {
    width: "48.5%",
    minHeight: 63,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D3D8D7",
    borderRadius: 5,
    padding: 7,
    justifyContent: "space-between",
  },

  indicadorTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  valor: {
    fontSize: 14,
    color: "#202020",
    fontWeight: "500",
    flexShrink: 1,
  },

  legenda: {
    fontSize: 9,
    color: "#171717",
    marginTop: 4,
  },

  areaGrafico: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 17,
    marginBottom: 18,
  },

  grafico: {
    width: 102,
    height: 102,
    borderRadius: 51,
    backgroundColor: "#287F7D",
    alignItems: "center",
    justifyContent: "center",
  },

  centroGrafico: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 9,
    borderColor: "#79BDB9",
  },

  porcentagem: {
    fontSize: 14,
    color: "#222222",
    fontWeight: "500",
  },

  botaoArquivos: {
    alignSelf: "center",
    width: "76%",
    height: 31,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  textoBotao: {
    fontSize: 12,
    color: "#333333",
  },

  lista: {
    gap: 10,
  },

  documento: {
    minHeight: 39,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D5D9D8",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 7,
  },

  infoDocumento: {
    flex: 1,
    justifyContent: "center",
  },

  nomeDocumento: {
    fontSize: 9,
    color: "#333333",
    fontWeight: "500",
  },

  tamanhoDocumento: {
    fontSize: 9,
    color: "#A0A0A0",
    marginTop: 2,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C8F8C8",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 3,
    gap: 2,
  },

  textoStatus: {
    fontSize: 8,
    color: "#216B31",
    fontWeight: "500",
  },
});
