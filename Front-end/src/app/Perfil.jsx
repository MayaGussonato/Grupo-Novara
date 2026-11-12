
import React from "react";

import Perfil from "../../Components/perfil/Perfil";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function PerfilRoute() {
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <Perfil navigation={navigation} />
    </ProtectedRoute>
  );
}
