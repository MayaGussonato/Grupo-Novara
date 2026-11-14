
import React from "react";

import Importacao from "../../Components/importacao/Importacao";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function ImportacaoRoute() {
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <Importacao navigation={navigation} />
    </ProtectedRoute>
  );
}
