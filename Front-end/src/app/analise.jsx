
import React from "react";
import { useLocalSearchParams } from "expo-router";

import Analise from "../../Components/analise/Analise";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function AnaliseRoute() {
  const params = useLocalSearchParams();
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <Analise
        route={{ params }}
        navigation={navigation}
      />
    </ProtectedRoute>
  );
}
