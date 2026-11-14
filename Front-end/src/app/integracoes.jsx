import React from "react";

import Integracoes from "../../Components/integracoes/Integracoes";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function IntegracoesRoute() {
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <Integracoes navigation={navigation} />
    </ProtectedRoute>
  );
}