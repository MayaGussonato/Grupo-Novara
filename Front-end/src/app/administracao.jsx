
import React from "react";

import Administracao from "../../Components/administracao/Administracao";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function AdministracaoRoute() {
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <Administracao navigation={navigation} />
    </ProtectedRoute>
  );
}
