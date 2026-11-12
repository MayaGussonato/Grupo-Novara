import React from "react";
import { Stack } from "expo-router";

import { AuthProvider } from "../../Services/AuthContext";
import { TemaProvider } from "../../Components/tema/TemaContext";

export default function RootLayout() {
  return (
    <TemaProvider>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthProvider>
    </TemaProvider>
  );
}