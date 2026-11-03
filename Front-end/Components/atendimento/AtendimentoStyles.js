
import { StyleSheet } from "react-native";

export const atendimentoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3FFFC",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#159BFF",
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },

  titulo: {
    fontSize: 14,
    color: "#87918F",
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 20,
  },

  filtros: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  filtro: {
    alignItems: "center",
    paddingHorizontal: 5,
    paddingBottom: 6,
  },

  textoFiltro: {
    fontSize: 12,
    color: "#333333",
  },

  filtroAtivo: {
    color: "#650000",
    fontWeight: "600",
  },

  linhaAtiva: {
    width: "100%",
    height: 2,
    backgroundColor: "#650000",
    position: "absolute",
    bottom: 0,
  },

  lista: {
    gap: 14,
  },

  card: {
    minHeight: 91,
    backgroundColor: "#FFFFFF",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 9,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  informacoes: {
    marginBottom: 7,
  },

  numero: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333333",
  },

  descricao: {
    fontSize: 9,
    color: "#A0A0A0",
    marginTop: 3,
  },

  etiquetas: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 5,
  },

  prioridade: {
    width: 55,
    height: 17,
    backgroundColor: "#BD8585",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  textoPrioridade: {
    fontSize: 9,
    color: "#FFFFFF",
  },

  status: {
    minWidth: 55,
    height: 17,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },

  statusAberto: {
    backgroundColor: "#E3F1F8",
  },

  statusAndamento: {
    backgroundColor: "#F8C5C5",
  },

  textoStatus: {
    fontSize: 9,
  },

  textoAberto: {
    color: "#42627B",
  },

  textoAndamento: {
    color: "#A13E3E",
  },

  rodapeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  data: {
    fontSize: 8,
    color: "#A0A0A0",
  },

  semResultados: {
    textAlign: "center",
    color: "#929B9A",
    fontSize: 13,
    marginTop: 25,
  },
});
