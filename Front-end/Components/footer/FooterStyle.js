import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 75,

    borderWidth: 2,
    borderBottomWidth: 0,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",

    paddingHorizontal: 10,
    zIndex: 1000,
    elevation: 10,
  },

  botao: {
  flex: 1,
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
},

areaIcone: {
  width: 76,
  height: 64,
  alignItems: "center",
  justifyContent: "center",
},

destaque: {
  borderRadius: 12,

  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.45,
  shadowRadius: 4,
  elevation: 4,
},

  botaoSelecionado: {
  flex: 0.75,
  height: "75%",
  borderRadius: 8,

  shadowColor: "#287F7D",
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.45,
  shadowRadius: 4,
  elevation: 4,
},

  icone: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
});

export default styles;