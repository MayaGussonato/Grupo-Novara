
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./HeaderStyles";

export default function Header({
  navigation,
  titulo = "Dash Board",
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation?.openDrawer?.()}
      >
        <Ionicons
          name="arrow-back-outline"
          size={27}
          color="#000000"
        />
      </TouchableOpacity>

      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.sim}></View>
    </View>
  );
}
