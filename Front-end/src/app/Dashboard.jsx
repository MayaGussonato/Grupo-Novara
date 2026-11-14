
import React from "react";

import Dashboard from "../../Components/dashboard/Dashboard";
import ProtectedRoute from "../../Components/navigation/ProtectedRoute";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function DashboardRoute() {
  const navigation = useRouteNavigation();

  return (
    <ProtectedRoute>
      <Dashboard navigation={navigation} />
    </ProtectedRoute>
  );
}
