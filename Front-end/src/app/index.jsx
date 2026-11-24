
import React from "react";
import {
  View,
  ActivityIndicator,
  useWindowDimensions,
} from "react-native";
import { Redirect } from "expo-router";

import { useAuth } from "../../Services/AuthContext";
import { useTema } from "../../Components/tema/TemaContext";

export default function Index() {
  const { usuario, carregando } = useAuth();
  const { cores } = useTema();
  const { width } = useWindowDimensions();

  const ehDesktop = width >= 1024;

  if (carregando) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: cores.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color={cores.primario}
        />
      </View>
    );
  }

  if (ehDesktop) {
    return <Redirect href="/desktop" />;
  }

  return (
    <Redirect
      href={usuario ? "/Dashboard" : "/login"}
    />
  );
}
