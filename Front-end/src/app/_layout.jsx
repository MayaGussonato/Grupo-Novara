// import { Stack } from "expo-router";
// import { SafeAreaProvider } from "react-native-safe-area-context";
// import { TemaProvider, useTema } from "../../Components/tema/TemaContext";
// import { AuthProvider, useAuth } from "../Components/auth/AuthContext";

// function Navegacao() {
//   const { token, carregando } = useAuth();
//   const { cores, carregandoTema } = useTema();

//   // Espera a sessão e o tema salvos carregarem (evita piscar a tela errada)
//   if (carregando || carregandoTema) return null;

//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//         contentStyle: { backgroundColor: cores.background },
//       }}
//     >
//       {/* Só entra aqui quem está logado */}
//       <Stack.Protected guard={!!token}>
//         <Stack.Screen name="(app)" />
//       </Stack.Protected>

//       {/* Só aparece para quem NÃO está logado */}
//       <Stack.Protected guard={!token}>
//         <Stack.Screen name="login" />
//       </Stack.Protected>

//       {/* Cadastro fica livre: visitante se registra e o administrador cadastra usuários */}
//       <Stack.Screen name="cadastro" />
//     </Stack>
//   );
// }

// export default function RootLayout() {
//   return (
//     <SafeAreaProvider>
//       <TemaProvider>
//         <AuthProvider>
//           <Navegacao />
//         </AuthProvider>
//       </TemaProvider>
//     </SafeAreaProvider>
//   );
// }



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