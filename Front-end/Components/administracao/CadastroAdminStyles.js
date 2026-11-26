
import { StyleSheet } from "react-native";

export const cadastroAdminStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 40,
  },

  topo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  botaoVoltar: {
    marginRight: 12,
    padding: 4,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "600",
  },

  subtitulo: {
    fontSize: 14,
    marginBottom: 25,
    lineHeight: 21,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 13,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 13,
    fontSize: 15,
  },

  campoSenha: {
    justifyContent: "center",
  },

  inputSenha: {
    width: "100%",
  },

  botaoOlho: {
    position: "absolute",
    right: 13,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  seletor: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textoSeletor: {
    fontSize: 15,
  },

  modalFundo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  modalFundoToque: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.60)",
  },

  modalConteudo: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  opcaoSeletor: {
    minHeight: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  textoOpcao: {
    fontSize: 15,
  },

  botaoFechar: {
    alignItems: "center",
    padding: 13,
    marginTop: 8,
  },

  textoFechar: {
    fontWeight: "600",
  },

  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 30,
  },

  botaoCancelar: {
    flex: 1,
    height: 49,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textoCancelar: {
    fontSize: 15,
    fontWeight: "600",
  },

  botaoCadastrar: {
    flex: 1,
    height: 49,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  textoCadastrar: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  botaoDesabilitado: {
    opacity: 0.6,
  },
});
