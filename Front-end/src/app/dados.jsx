
import React from "react";
import { useLocalSearchParams } from "expo-router";

import Dados from "../../Components/dados/Dados";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function DadosRoute() {
  const params = useLocalSearchParams();
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <Dados
        route={{ params }}
        navigation={navigation}
      />
    </ProtectedRoute>
  );
}
