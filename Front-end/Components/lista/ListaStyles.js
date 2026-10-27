
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E7F3F1",
  },

  conteudo: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 15,
    paddingBottom: 10,
  },

  pesquisaContainer: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D3D8D7",
    borderRadius: 5,
    paddingHorizontal: 8,
    gap: 8,
    marginBottom: 16,
  },

  inputPesquisa: {
    flex: 1,
    height: "100%",
    color: "#333333",
    fontSize: 12,
  },

  ferramentas: {
    height: 23,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D3D8D7",
    borderRadius: 5,
    marginBottom: 9,
    paddingHorizontal: 8,
  },

  ordem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  filtros: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    flex: 1,
  },

  textoFerramenta: {
    color: "#555555",
    fontSize: 9,
  },

  lista: {
    flex: 1,
  },

  listaConteudo: {
    gap: 12,
    paddingBottom: 12,
  },

  documento: {
    minHeight: 49,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CDD2D1",
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 7,
  },

  infoDocumento: {
    flex: 1,
    justifyContent: "center",
  },

  nomeDocumento: {
    fontSize: 10,
    color: "#222222",
    fontWeight: "500",
  },

  detalheDocumento: {
    fontSize: 10,
    color: "#A0A0A0",
    marginTop: 4,
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#C8F8C8",
    borderRadius: 5,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },

  textoStatus: {
    fontSize: 8,
    color: "#216B31",
  },

  semResultados: {
    textAlign: "center",
    color: "#777777",
    marginTop: 30,
    fontSize: 13,
  },

  paginacao: {
    borderTopWidth: 1,
    borderTopColor: "#65A9A5",
    paddingTop: 15,
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    flexWrap: "wrap",
  },

  numeroPagina: {
    width: 18,
    height: 18,
    backgroundColor: "#287F7D",
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },

  paginaAtiva: {
    backgroundColor: "#1D6D6B",
  },

  textoPagina: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "500",
  },

  proximaPagina: {
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  fundoModal: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    padding: 25,
  },

  modal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 20,
  },

  tituloModal: {
    fontSize: 18,
    fontWeight: "600",
    color: "#287F7D",
    marginBottom: 15,
  },

  opcaoFiltro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },

  textoOpcao: {
    color: "#333333",
    fontSize: 14,
  },

  fecharModal: {
    alignSelf: "flex-end",
    marginTop: 18,
    padding: 5,
  },

  textoFechar: {
    color: "#287F7D",
    fontWeight: "600",
  },
  
statusErro: {
  backgroundColor: "#FFC9C9",
},

textoStatusErro: {
  color: "#8B2525",
},

statusRevisando: {
  backgroundColor: "#EEF1F8",
},

textoStatusRevisando: {
  color: "#34577D",
},

progressoContainer: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
  marginRight: 4,
},

progressoCirculo: {
  width: 24,
  height: 24,
  borderRadius: 12,
  borderWidth: 3,
  borderColor: "#888888",
  borderRightColor: "#216B31",
  transform: [{ rotate: "35deg" }],
  alignItems: "center",
  justifyContent: "center",
},

progressoCentro: {
  width: 12,
  height: 12,
  borderRadius: 6,
  backgroundColor: "#FFFFFF",
},

textoProgresso: {
  color: "#216B31",
  fontSize: 13,
},

filtrosEstado: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 5,
  marginBottom: 14,
},

botaoEstado: {
  flex: 1,
  minHeight: 52,
  borderRadius: 10,
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: 3,
},

estadoTodos: {
  backgroundColor: "#559C9A",
},

estadoRevisando: {
  backgroundColor: "#DFEBF0",
},

estadoConcluído: {
  backgroundColor: "#C6F8C5",
},

estadoErros: {
  backgroundColor: "#F8C2C2",
},

estadoSelecionado: {
  borderWidth: 2,
  borderColor: "#FFFFFF",
},

textoEstado: {
  fontSize: 13,
  color: "#263238",
  textAlign: "center",
},

textoEstadoSelecionado: {
  fontWeight: "600",
},


});
