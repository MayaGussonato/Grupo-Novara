import React from "react";
import {
  View,
  ActivityIndicator,
} from "react-native";

import { Redirect } from "expo-router";

import { useAuth } from "../../Services/AuthContext";
import { useTema } from "../tema/TemaContext";

export default function ProtectedRoute({ children }) {
  const { usuario, carregando } = useAuth();
  const { cores } = useTema();

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

  if (!usuario) {
    return <Redirect href="/login" />;
  }

  return children;
}