
import React from "react";
import {
  Platform,
  useWindowDimensions,
} from "react-native";

import { Stack } from "expo-router";

import { AuthProvider } from "../../Services/AuthContext";
import { TemaProvider } from "../../Components/tema/TemaContext";
import { IdiomaProvider } from "../../Components/idioma/IdiomaContext";

import DesktopApp from "../../pages/desktop/DasktopApp";

function LayoutResponsivo() {
  const { width } = useWindowDimensions();

  // Computador: versão desktop.
  // Celular e tablet: versão mobile.
  const ehDesktop = Platform.OS === "web" && width >= 1024;

  if (ehDesktop) {
    return <DesktopApp />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <IdiomaProvider>
      <TemaProvider>
        <AuthProvider>
          <LayoutResponsivo />
        </AuthProvider>
      </TemaProvider>
    </IdiomaProvider>
  );
}
