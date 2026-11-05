import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { styles } from "./HeaderStyles";
import { useTema } from "../tema/TemaContext";

export default function Header({
  navigation,
  titulo = "Dash Board",
}) {
  const { cores, modoEscuro } = useTema();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation?.openDrawer?.()}
      >
        <Ionicons
          name="arrow-back-outline"
          size={27}
          color={cores.texto}
        />
      </TouchableOpacity>

      <Text
        style={[
          styles.titulo,
          { color: cores.texto },
        ]}
      >
        {titulo}
      </Text>

      <View style={styles.sim} />
    </View>
  );
}