
import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3FFFC",
  },

  conteudo: {
    paddingHorizontal: 26,
    paddingTop: 30,
    paddingBottom: 25,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "600",
    color: "#111111",
    marginBottom: 10,
  },

  gradeIndicadores: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 8,
  },

  cardIndicador: {
    width: "48.5%",
    minHeight: 78,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D5D4",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    justifyContent: "space-between",
  },

  linhaIndicador: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  valorIndicador: {
    color: "#222222",
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
  },

  descricaoIndicador: {
    fontSize: 10,
    color: "#222222",
    marginTop: 5,
    lineHeight: 14,
  },

  cardGrafico: {
    marginTop: 28,
    backgroundColor: "#FFFFFF",
    borderRadius: 7,
    padding: 10,
    minHeight: 130,
    elevation: 1,
  },

  cabecalhoGrafico: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  tituloGrafico: {
    fontSize: 9,
    fontWeight: "600",
    color: "#536363",
  },

  seletorPeriodo: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1E7E6",
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 3,
    gap: 3,
  },

  textoPeriodo: {
    fontSize: 7,
    color: "#536363",
  },

  grafico: {
    height: 85,
    flexDirection: "row",
  },

  eixoY: {
    width: 24,
    justifyContent: "space-between",
    paddingBottom: 15,
  },

  textoEixo: {
    fontSize: 6,
    color: "#8B9A99",
  },

  areaBarras: {
    flex: 1,
    position: "relative",
    marginBottom: 15,
  },

  linhaGrade: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#E9EFEE",
  },

  barras: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    zIndex: 1,
  },

  colunaBarra: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  barra: {
    width: "60%",
    minHeight: 3,
  },

  textoMes: {
    position: "absolute",
    top: "105%",
    fontSize: 6,
    color: "#687B79",
  },

  tituloRecentes: {
    fontSize: 18,
    fontWeight: "400",
    color: "#222222",
    marginTop: 25,
    marginBottom: 18,
  },

  listaArquivos: {
    gap: 12,
  },

  cardArquivo: {
    minHeight: 47,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D0D5D4",
    borderRadius: 5,
    paddingHorizontal: 9,
    paddingVertical: 6,
    gap: 8,
  },

  infoArquivo: {
    flex: 1,
    justifyContent: "center",
  },

  nomeArquivo: {
    fontSize: 10,
    fontWeight: "600",
    color: "#222222",
  },

  tamanhoArquivo: {
    fontSize: 10,
    color: "#A0A0A0",
    marginTop: 4,
  },

  statusConcluido: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#BDFFB8",
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },

  textoConcluido: {
    fontSize: 8,
    color: "#17652D",
  },
});
