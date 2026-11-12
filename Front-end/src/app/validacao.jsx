
import React from "react";

import Validacao from "../../Components/Validacao/validacao";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";

export default function ValidacaoRoute() {
  return (
    <ProtectedRoute>
      <Validacao />
    </ProtectedRoute>
  );
}
