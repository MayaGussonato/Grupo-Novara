
import { StyleSheet } from "react-native";

export const AnaliseStyles = StyleSheet.create({
    conteudo: {
    paddingHorizontal: 27,
    paddingTop: 12,
    paddingBottom: 25,
  },

  subtitulo: {
    fontSize: 13,
    color: "#929B9A",
    marginBottom: 32,
  },

  documento: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D5D4",
    borderRadius: 5,
    paddingHorizontal: 9,
    paddingVertical: 7,
    gap: 8,
  },

  infoDocumento: {
    flex: 1,
  },

  nomeDocumento: {
    fontSize: 11,
    fontWeight: "600",
    color: "#222222",
  },

  detalheDocumento: {
    fontSize: 11,
    color: "#A0A0A0",
    marginTop: 4,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#BDFFB8",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },

  textoStatus: {
    fontSize: 9,
    color: "#17652D",
  },

  abas: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 7,
  },

  aba: {
    paddingHorizontal: 7,
    paddingVertical: 9,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  abaAtiva: {
    borderBottomColor: "transparent",
  },

  textoAba: {
    fontSize: 13,
    color: "#424A49",
  },

  textoAbaAtiva: {
    color: "#650000",
    fontWeight: "600",
  },

  cardResumo: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D5D4",
    borderRadius: 5,
    minHeight: 346,
    paddingHorizontal: 17,
    paddingTop: 30,
    paddingBottom: 20,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  areaGrafico: {
    alignItems: "center",
    marginBottom: 43,
  },

  grafico: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 18,
    borderColor: "#287F7D",
    borderTopColor: "#76BDB5",
    alignItems: "center",
    justifyContent: "center",
    transform: [{ rotate: "0deg" }],
  },

  graficoInterno: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  valorGrafico: {
    fontSize: 19,
    fontWeight: "600",
    color: "#222222",
  },

  listaIndicadores: {
    gap: 12,
  },

  linhaIndicador: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  textoIndicador: {
    flex: 1,
    fontSize: 11,
    color: "#555555",
  },

  valorIndicador: {
    fontSize: 11,
    color: "#555555",
  },

  tituloPrevia: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginTop: 24,
    marginBottom: 10,
  },

  cardPrevia: {
    minHeight: 210,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D5D4",
    borderRadius: 5,
    padding: 14,
    alignItems: "center",
    elevation: 2,
  },

  paginaDocumento: {
    width: "76%",
    minHeight: 200,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8E0E8",
    padding: 8,
  },

  cabecalhoNota: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },

  logoMicrosoft: {
    width: 13,
    height: 13,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 1,
  },

  quadradoLaranja: {
    width: 5,
    height: 5,
    backgroundColor: "#F25022",
  },

  quadradoVerde: {
    width: 5,
    height: 5,
    backgroundColor: "#7FBA00",
  },

  quadradoAzul: {
    width: 5,
    height: 5,
    backgroundColor: "#00A4EF",
  },

  quadradoAmarelo: {
    width: 5,
    height: 5,
    backgroundColor: "#FFB900",
  },

  textoMicrosoft: {
    fontSize: 9,
    color: "#555555",
    flex: 1,
  },

  textoNfe: {
    fontSize: 9,
    color: "#3373A5",
    fontWeight: "600",
  },

  linhaNota: {
    height: 13,
    borderWidth: 0.5,
    borderColor: "#DCE4EC",
    marginBottom: 4,
  },

  linhaNotaCurta: {
    width: "65%",
    height: 10,
    borderWidth: 0.5,
    borderColor: "#DCE4EC",
    marginBottom: 4,
  },

  cardDados: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D5D4",
    borderRadius: 5,
    padding: 16,
    elevation: 2,
  },

  tituloSecao: {
    fontSize: 15,
    fontWeight: "600",
    color: "#287F7D",
    marginBottom: 12,
  },

  campoExtraido: {
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: "#E7F0EE",
  },

  nomeCampo: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333333",
  },

  valorCampo: {
    fontSize: 12,
    color: "#7D8987",
    marginTop: 4,
  },

  evento: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E7F0EE",
  },

  infoEvento: {
    flex: 1,
  },
});
