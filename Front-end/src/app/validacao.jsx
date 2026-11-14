
import React from "react";
import { useLocalSearchParams } from "expo-router";

import Validacao from "../../Components/Validacao/validacao";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function ValidacaoRoute() {
  const params = useLocalSearchParams();
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <Validacao
        route={{ params }}
        navigation={navigation}
      />
    </ProtectedRoute>
  );
}
