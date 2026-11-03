import { StyleSheet } from "react-native";

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: 26,
    paddingTop: 30,
    paddingBottom: 80,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "600",
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
    borderWidth: 1,
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
    fontSize: 16,
    fontWeight: "500",
    flexShrink: 1,
  },

  descricaoIndicador: {
    fontSize: 10,
    marginTop: 5,
    lineHeight: 14,
  },

  cardGrafico: {
    marginTop: 28,
    borderRadius: 7,
    padding: 10,
    minHeight: 130,
    borderWidth: 1,
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
  },

  seletorPeriodo: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 3,
    gap: 3,
  },

  textoPeriodo: {
    fontSize: 7,
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
  },

  tituloRecentes: {
    fontSize: 18,
    fontWeight: "400",
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
    borderWidth: 1,
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
  },

  tamanhoArquivo: {
    fontSize: 10,
    marginTop: 4,
  },

  statusConcluido: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 4,
  },

  textoConcluido: {
    fontSize: 8,
  },
});