import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  subtitulo: {
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    marginBottom: 20,
  },

  pesquisa: {
    height: 48,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    fontFamily: "Poppins_400Regular",
    fontSize: 13,
    marginBottom: 16,
  },

  filtros: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },

  filtro: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },

  textoFiltro: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
  },

  linhaOrdenacao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  total: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },

  ordenacao: {
    fontFamily: "Poppins_500Medium",
    fontSize: 11,
  },

  lista: {
    flex: 1,
  },

  listaConteudo: {
    paddingBottom: 12,
    flexGrow: 1,
  },

  cardDocumento: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
  },

  linhaDocumento: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 14,
  },

  informacoes: {
    flex: 1,
  },

  documentoIcone: {
    width: 42,
    height: 42,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  iconeDocumento: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },

  descricaoDocumento: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    marginTop: 3,
  },

  nomeDocumento: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },

  tamanho: {
    fontFamily: "Poppins_400Regular",
    fontSize: 11,
    marginTop: 4,
  },

  status: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },

  textoStatus: {
    fontFamily: "Poppins_500Medium",
    color: "#FFFFFF",
    fontSize: 9,
  },

  fundoProgresso: {
    height: 6,
    borderRadius: 5,
    overflow: "hidden",
  },

  progresso: {
    height: "100%",
    borderRadius: 5,
  },

  porcentagem: {
    fontFamily: "Poppins_400Regular",
    fontSize: 10,
    marginTop: 7,
    textAlign: "right",
  },

  vazio: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: 30,
  },

  paginacao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },

  botaoPagina: {
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 8,
  },

  botaoDesativado: {
    backgroundColor: "#AAB8B7",
    opacity: 0.6,
  },

  textoPagina: {
    fontFamily: "Poppins_500Medium",
    color: "#FFFFFF",
    fontSize: 11,
  },

  numeroPagina: {
    fontFamily: "Poppins_500Medium",
    fontSize: 12,
  },
});

export default styles;