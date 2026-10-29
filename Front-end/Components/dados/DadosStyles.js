
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3FFFC",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#159BFF",
  },

  conteudo: {
    paddingHorizontal: 30,
    paddingTop: 8,
    paddingBottom: 30,
  },

  
cardDados: {
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#D0D5D4",
  borderRadius: 7,
  paddingHorizontal: 12,
  paddingVertical: 14,
  minHeight: 320,
  elevation: 3,
  shadowColor: "#000000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.12,
  shadowRadius: 4,
},

linhaDado: {
  minHeight: 48,
  borderWidth: 1,
  borderColor: "#D8D8D8",
  borderRadius: 6,
  backgroundColor: "#FFFFFF",
  marginBottom: 9,
  paddingHorizontal: 13,
  paddingVertical: 8,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
},

nomeCampo: {
  fontSize: 12,
  color: "#222222",
  flex: 1,
},

valorCampo: {
  fontSize: 11,
  color: "#222222",
  textAlign: "right",
  flexShrink: 1,
},


  tituloExportar: {
    fontSize: 20,
    fontWeight: "500",
    color: "#222222",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },

  listaFormatos: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: 5,
    marginBottom: 32,
  },

  formato: {
    width: "23%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 5,
  },

  formatoSelecionado: {
    borderColor: "#A8CECA",
    backgroundColor: "#E7F3F1",
  },

  iconeArquivo: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 4,
  },

  nomeFormato: {
    fontSize: 9,
    color: "#333333",
    marginTop: 4,
  },

  botaoExportar: {
    height: 34,
    backgroundColor: "#287F7D",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 0,
  },

  textoBotao: {
    fontSize: 11,
    color: "#FFFFFF",
  },
});
