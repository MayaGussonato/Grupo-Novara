
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import Ionicons from "@react-native-vector-icons/ionicons";
import { styles } from "./HeaderStyles";
import { useTema } from "../tema/TemaContext";

export default function Header({
  titulo = "Dash Board",
}) {
  const router = useRouter();
  const { cores } = useTema();

  function voltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/dashboard");
    }
  }

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.botao}
        onPress={voltar}
        activeOpacity={0.7}
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
