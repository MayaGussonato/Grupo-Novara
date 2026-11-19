
import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

import { styles } from "./HeaderStyles";

import { useTema } from "../tema/TemaContext";
import { useIdioma } from "../idioma/IdiomaContext";

import useRouteNavigation from "../navigation/useRouteNavigation";

export default function Header({
  titulo = "Dashboard",
}) {
  const navigation = useRouteNavigation();

  const { cores } = useTema();
  const { t } = useIdioma();

  // Relaciona os títulos utilizados nas telas às traduções.
  const titulosTraduzidos = {
    "Dashboard": "dashboard",
    "Painel": "dashboard",

    "Meu Perfil": "meuPerfil",
    "Perfil": "perfil",

    "Importação": "importacao",
    "Importacao": "importacao",

    "Análise": "analise",
    "Analise": "analise",

    "Validação": "validacao",
    "Validacao": "validacao",

    "Dados": "dados",

    "Administração": "administracao",
    "Administracao": "administracao",

    "Central de Atendimentos": "atendimento",

    "Integrações": "integracoes",
    "Integracoes": "integracoes",
  };

  const chaveTraducao = titulosTraduzidos[titulo];

  const tituloFinal = chaveTraducao
    ? t(chaveTraducao)
    : titulo;

  return (
    <View style={styles.header}>
      {/* Botão voltar */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <Ionicons
          name="arrow-back-outline"
          size={27}
          color={cores.texto}
        />
      </TouchableOpacity>

      {/* Título centralizado */}
      <Text
        style={[
          styles.titulo,
          { color: cores.texto },
        ]}
        numberOfLines={1}
      >
        {tituloFinal}
      </Text>

      {/* Espaço para manter o título centralizado */}
      <View style={styles.sim} />
    </View>
  );
}
