
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import useRouteNavigation from "../../Components/navigation/useRouteNavigation";

export default function RecuperarSenha() {
  const navigation = useRouteNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>
        Recuperar senha
      </Text>

      <Text style={{ marginVertical: 16 }}>
        A recuperação de senha ainda precisa ser implementada.
      </Text>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}
