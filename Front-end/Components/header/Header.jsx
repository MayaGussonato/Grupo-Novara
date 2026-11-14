
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import { styles } from "./HeaderStyles";
import { useTema } from "../tema/TemaContext";
import useRouteNavigation from "../navigation/useRouteNavigation";

export default function Header({
  titulo = "Dashboard",
}) {
  const navigation = useRouteNavigation();
  const { cores } = useTema();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.goBack()}
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
