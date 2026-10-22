
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
          name="ellipsis-horizontal"
          size={27}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      <Text style={styles.titulo}>{titulo}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation?.navigate?.("Perfil")}
      >
        <Ionicons
          name="person-circle-outline"
          size={39}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
}
