
import React from "react";

import Cadastro from "../../Components/cadastro/Cadastro";
import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function CadastroScreen() {
  const navigation = useRouteNavigation();

  return <Cadastro navigation={navigation} />;
}
