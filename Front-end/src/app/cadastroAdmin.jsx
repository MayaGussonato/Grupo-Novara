import React from "react";

import CadastroAdmin from "../../Components/administracao/CadastroAdmin";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function CadastroAdminRoute() {
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <CadastroAdmin
        navigation={navigation}
        onCancelar={() => navigation.navigate("Administracao")}
        onSucesso={() => navigation.navigate("Administracao")}
      />
    </ProtectedRoute>
  );
}