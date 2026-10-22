
import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Header from "../header/Header";
import { styles } from "./ProcessamentoStyles";

const informacoes = [
  {
    titulo: "Empresa",
    valor: "Empresa Exemplo Ltda.",
    icone: "domain",
  },
  {
    titulo: "CNPJ",
    valor: "12.345.678/0001-90",
    icone: "card-account-details-outline",
  },
  {
    titulo: "Data",
    valor: "08/10/2026",
    icone: "calendar-month-outline",
  },
  {
    titulo: "Valor",
    valor: "R$ 4.580,00",
    icone: "cash",
  },
  {
    titulo: "Número",
    valor: "NF-18291",
    icone: "file-document-outline",
  },
];

function InformacaoExtraida({ titulo, valor, icone }) {
  return (
    <View style={styles.cardInformacao}>
      <MaterialCommunityIcons
        name={icone}
        size={23}
        color="#640303"
      />

      <View style={styles.textosInformacao}>
        <Text style={styles.tituloInformacao}>{titulo}</Text>
        <Text style={styles.valorInformacao}>{valor}</Text>
      </View>

      <View style={styles.statusConcluido}>
        <Ionicons
          name="checkmark-circle"
          size={11}
          color="#216B31"
        />
        <Text style={styles.textoStatus}>Concluído</Text>
      </View>
    </View>
  );
}

export default function Processamento({ navigation, route }) {
  const nomeDocumento = route?.params?.nomeDocumento ?? "Documento.pdf";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#287F7D"
      />

      <Header
        navigation={navigation}
        titulo="Processamento Inteligente"
      />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.nomeArquivo}>
          <MaterialCommunityIcons
            name="file-pdf-box"
            size={30}
            color="#650000"
          />

          <Text style={styles.nomeDocumento} numberOfLines={1}>
            {nomeDocumento}
          </Text>
        </View>

        <View style={styles.previaDocumento}>
          <MaterialCommunityIcons
            name="file-document"
            size={76}
            color="#650000"
          />
        </View>

        <Text style={styles.tituloSecao}>
          Informações Extraídas
        </Text>

        <View style={styles.listaInformacoes}>
          {informacoes.map((item) => (
            <InformacaoExtraida
              key={item.titulo}
              titulo={item.titulo}
              valor={item.valor}
              icone={item.icone}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
