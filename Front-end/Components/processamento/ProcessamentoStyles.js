
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F3F1",
  },

  conteudo: {
    paddingHorizontal: 19,
    paddingTop: 17,
    paddingBottom: 25,
  },

  nomeArquivo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },

  nomeDocumento: {
    color: "#222222",
    fontSize: 12,
    fontWeight: "500",
    flex: 1,
  },

  previaDocumento: {
    width: "100%",
    height: 150,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D5D9D8",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 1,
  },

  tituloSecao: {
    fontSize: 12,
    fontWeight: "500",
    color: "#222222",
    marginBottom: 12,
  },

  listaInformacoes: {
    gap: 14,
  },

  cardInformacao: {
    minHeight: 37,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D5D9D8",
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  textosInformacao: {
    flex: 1,
    justifyContent: "center",
  },

  tituloInformacao: {
    fontSize: 10,
    color: "#333333",
    fontWeight: "500",
  },

  valorInformacao: {
    fontSize: 9,
    color: "#A0A0A0",
    marginTop: 2,
  },

  statusConcluido: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#C8F8C8",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },

  textoStatus: {
    fontSize: 8,
    color: "#216B31",
  },
});
