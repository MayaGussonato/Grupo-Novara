import { StyleSheet } from "react-native";

export const atendimentoStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },

  titulo: {
    fontSize: 14,
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
  },

  filtroAtivo: {
    fontWeight: "600",
  },

  linhaAtiva: {
    width: "100%",
    height: 2,
    position: "absolute",
    bottom: 0,
  },

  lista: {
    gap: 14,
  },

  card: {
    minHeight: 91,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderWidth: 1,
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
  },

  descricao: {
    fontSize: 9,
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

  textoStatus: {
    fontSize: 9,
  },

  rodapeCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  data: {
    fontSize: 8,
  },

  semResultados: {
    textAlign: "center",
    fontSize: 13,
    marginTop: 25,
  },
});
