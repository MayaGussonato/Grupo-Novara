import { StyleSheet } from "react-native";

export const AdministracaoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3FFFC",
  },

  conteudo: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },

  subtitulo: {
    fontSize: 12,
    color: "#929B9A",
    marginBottom: 20,
  },

  abas: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  aba: {
    paddingHorizontal: 6,
    paddingVertical: 5,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },

  abaSelecionada: {
    borderBottomColor: "transparent",
  },

  textoAba: {
    fontSize: 13,
    color: "#343B3A",
  },

  textoAbaSelecionado: {
    color: "#650000",
    fontWeight: "600",
  },

  pesquisaContainer: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D8DEDC",
    borderRadius: 6,
    paddingHorizontal: 9,
    marginBottom: 13,
    gap: 8,
  },

  inputPesquisa: {
    flex: 1,
    height: "100%",
    fontSize: 12,
    color: "#174847",
    paddingVertical: 0,
  },

  cardLista: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D5DBD9",
    borderRadius: 6,
    paddingHorizontal: 9,
    paddingVertical: 12,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  cardUsuario: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 7,
    marginBottom: 9,
    gap: 7,
  },

  nomeUsuario: {
    flex: 1,
    fontSize: 11,
    color: "#242424",
  },

  status: {
    minWidth: 49,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 5,
  },

  statusAtivo: {
    backgroundColor: "#BDFFB8",
  },

  statusInativo: {
    backgroundColor: "#FFC5C5",
  },

  textoStatus: {
    fontSize: 9,
  },

  textoAtivo: {
    color: "#17652D",
  },

  textoInativo: {
    color: "#8A2020",
  },

  semResultados: {
    fontSize: 14,
    color: "#929B9A",
    textAlign: "center",
    paddingVertical: 24,
  },

  botaoNovo: {
    alignSelf: "flex-end",
    minWidth: 120,
    height: 35,
    paddingHorizontal: 14,
    backgroundColor: "#460303",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 45,
    marginRight: 0,
  },

  textoBotaoNovo: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});
