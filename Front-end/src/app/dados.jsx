
import React from "react";

import Dados from "../../Components/dados/Dados";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";

export default function DadosRoute() {
  return (
    <ProtectedRoute>
      <Dados />
    </ProtectedRoute>
  );
}
