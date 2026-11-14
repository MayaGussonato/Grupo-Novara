import React from "react";
import Atendimento from "../../Components/atendimento/Atendimento";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function AtendimentoRoute() {
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <Atendimento navigation={navigation} />
    </ProtectedRoute>
  );
}