
import React from "react";
import { Redirect } from "expo-router";

import Login from "../../Components/login/Login";
import { useAuth } from "../../Services/AuthContext";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function LoginScreen() {
  const { usuario } = useAuth();
  const navigation = useRouteNavigation();

  if (usuario) {
    return <Redirect href="/Dashboard" />;
  }

  return <Login navigation={navigation} />;
}
