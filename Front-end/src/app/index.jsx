// import React from "react";
// import { ActivityIndicator, View } from "react-native";
// import { Redirect } from "expo-router";

// import { useAuth } from "../../Services/AuthContext";
// import { useTema } from "../../Components/tema/TemaContext";

// export default function Index() {
//   const { usuario, carregando } = useAuth();
//   const { cores } = useTema();

//   if (carregando) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: cores.background,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <ActivityIndicator size="large" color={cores.primario} />
//       </View>
//     );
//   }

//   return (
//     <Redirect href={usuario ? "/dashboard" : "/login"} />
//   );
// }



import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";

import { useAuth } from "../../Services/AuthContext";
import { useTema } from "../../Components/tema/TemaContext";

export default function Index() {
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

  return (
    <Redirect
      href={usuario ? "/dashboard" : "/login"}
    />
  );
}