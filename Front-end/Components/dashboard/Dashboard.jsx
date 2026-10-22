
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import Header from "../header/Header";
import { styles } from "./DashboardStyles";

const documentos = [
  { id: "1", nome: "NF-18291.pdf", tamanho: "2.4 MB" },
  { id: "2", nome: "NF-18292.pdf", tamanho: "2.4 MB" },
  { id: "3", nome: "NF-18293.pdf", tamanho: "2.4 MB" },
];

function Indicador({ icone, valor, legenda }) {
  return (
    <View style={styles.indicador}>
      <View style={styles.indicadorTopo}>
        {icone}
        <Text style={styles.valor}>{valor}</Text>
      </View>
      <Text style={styles.legenda}>{legenda}</Text>
    </View>
  );
}

export default function Dashboard({ navigation }) {
  const [indice, setIndice] = useState(0);

  const porcentagens = ["96,8%", "94,2%", "98,1%"];

  function mudarGrafico(direcao) {
    setIndice(
      (atual) =>
        (atual + direcao + porcentagens.length) % porcentagens.length
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#287F7D"
      />

      <Header navigation={navigation} />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grade}>
          <Indicador
            icone={<MaterialCommunityIcons name="file-document" size={27} color="#650000" />}
            valor="1324"
            legenda="Documentos processados"
          />

          <Indicador
            icone={<MaterialCommunityIcons name="bullseye" size={29} color="#650000" />}
            valor="96,4%"
            legenda="Taxa de precisão"
          />

          <Indicador
            icone={<Ionicons name="time-outline" size={28} color="#650000" />}
            valor="42h"
            legenda="Tempo economizado"
          />

          <Indicador
            icone={<Ionicons name="warning-outline" size={27} color="#650000" />}
            valor="23"
            legenda="Documentos aguardando revisão"
          />
        </View>

        <View style={styles.areaGrafico}>
          <TouchableOpacity onPress={() => mudarGrafico(-1)}>
            <Ionicons name="chevron-back" size={38} color="#000000" />
          </TouchableOpacity>

          <View style={styles.grafico}>
            <View style={styles.centroGrafico}>
              <Text style={styles.porcentagem}>
                {porcentagens[indice]}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => mudarGrafico(1)}>
            <Ionicons name="chevron-forward" size={38} color="#000000" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botaoArquivos}>
          <Text style={styles.textoBotao}>Arquivos anteriores</Text>
        </TouchableOpacity>

        <View style={styles.lista}>
          {documentos.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={styles.documento}
              onPress={() => console.log("Documento:", doc.nome)}
            >
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={28}
                color="#650000"
              />

              <View style={styles.infoDocumento}>
                <Text style={styles.nomeDocumento}>{doc.nome}</Text>
                <Text style={styles.tamanhoDocumento}>
                  Pdf     {doc.tamanho}
                </Text>
              </View>

              <View style={styles.status}>
                <Ionicons
                  name="checkmark-circle"
                  size={11}
                  color="#216B31"
                />
                <Text style={styles.textoStatus}>Concluído</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
