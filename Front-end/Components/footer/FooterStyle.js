
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,

    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#174E4B",
    borderBottomWidth: 0,

    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

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

  icone: {
    width: 28,
    height: 28,
    resizeMode: "contain",
  },
});

export default styles;
