
import { StyleSheet } from "react-native";

export const integracaoStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3FFFC",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderColor: "#159BFF",
  },

  conteudo: {
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 30,
  },

  sim: {
    alinItems: "center",
    justifyContent: "center",
  },    

  subtitulo: {
    fontSize: 13,
    color: "#929B9A",
    lineHeight: 21,
    marginBottom: 13,
  },

  lista: {
    gap: 13,
  },

  card: {
    minHeight: 80,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",

    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
  },

  logoContainer: {
    width: 66,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  logo: {
    width: 49,
    height: 49,
    alignItems: "center",
    justifyContent: "center",
  },

  textoLogo: {
    fontSize: 31,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  sap: {
    width: 49,
    height: 35,
    backgroundColor: "#0879BB",
    transform: [{ skewX: "-10deg" }],
  },

  logoSap: {
    fontSize: 23,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  totvs: {
    borderRadius: 30,
    backgroundColor: "#050505",
  },

  microsoft: {
    backgroundColor: "#0757D5",
    borderRadius: 5,
    transform: [{ rotate: "0deg" }],
  },

  google: {
    backgroundColor: "#4285F4",
    borderRadius: 10,
  },

  onedrive: {
    backgroundColor: "#E5F5FF",
    borderRadius: 30,
  },

  informacoes: {
    flex: 1,
    justifyContent: "center",
  },

  nome: {
    fontSize: 12,
    fontWeight: "700",
    color: "#222222",
    marginBottom: 5,
  },

  status: {
    alignSelf: "flex-start",
    minWidth: 70,
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 4,
  },

  statusConectado: {
    backgroundColor: "#D8F4E9",
  },

  statusAtencao: {
    backgroundColor: "#FFF0C2",
  },

  textoStatus: {
    fontSize: 10,
  },

  textoConectado: {
    color: "#5C9D83",
  },

  textoAtencao: {
    color: "#B68B21",
  },

  ultimaSincronizacao: {
    fontSize: 9,
    color: "#999999",
  },

  data: {
    fontSize: 9,
    color: "#999999",
  },

  menuContainer: {
    alignSelf: "flex-start",
    position: "relative",
    zIndex: 10,
    marginLeft: 5,
  },

  menu: {
    position: "absolute",
    right: 15,
    top: 0,
    width: 125,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    elevation: 6,
    shadowColor: "#000000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    zIndex: 20,
  },

  opcaoMenu: {
    paddingHorizontal: 10,
    paddingVertical: 11,
    borderBottomWidth: 0.5,
    borderBottomColor: "#EEEEEE",
  },

  textoOpcao: {
    fontSize: 10,
    color: "#333333",
  },
});
