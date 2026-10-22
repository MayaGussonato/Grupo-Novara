
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import Header from "../header/Header";
import { styles } from "./ImportacaoStyles";

export default function Importacao({ navigation }) {
  const [documentos, setDocumentos] = useState([]);

  async function selecionarArquivos() {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: ["application/pdf"],
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (resultado.canceled) return;

      const novosDocumentos = resultado.assets.map((arquivo) => ({
        id: `${arquivo.uri}-${arquivo.name}`,
        nome: arquivo.name,
        tamanho: arquivo.size
          ? `${(arquivo.size / (1024 * 1024)).toFixed(1)} MB`
          : "Tamanho indisponível",
        uri: arquivo.uri,
        status: "Selecionado",
      }));

      setDocumentos((atuais) => {
        const combinados = [...atuais, ...novosDocumentos];
        return combinados.filter(
          (doc, index, lista) =>
            lista.findIndex((item) => item.uri === doc.uri) === index
        );
      });
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível selecionar os documentos.");
    }
  }

  function processarDocumentos() {
    if (documentos.length === 0) {
      Alert.alert(
        "Nenhum documento",
        "Selecione pelo menos um arquivo antes de continuar."
      );
      return;
    }

    Alert.alert(
      "Documentos selecionados",
      `${documentos.length} arquivo(s) pronto(s) para processamento.`
    );

    // Aqui você poderá chamar a API que processa os documentos.
  }

  function limparSelecao() {
    setDocumentos([]);
  }

  function formatarNome(nome) {
    if (nome.length <= 25) return nome;
    return `${nome.slice(0, 22)}...`;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#287F7D"
      />

      <Header
        navigation={navigation}
        titulo="Importação de documentos"
      />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.tituloPagina}>Documentos</Text>

        <View style={styles.areaSelecao}>
          <MaterialCommunityIcons
            name="file-document"
            size={54}
            color="#650000"
          />

          <Text style={styles.textoArraste}>
            Arraste seus documentos pra cá
          </Text>

          <Text style={styles.textoSelecione}>
            ou selecione arquivos do dispositivo
          </Text>

          <TouchableOpacity
            style={styles.botaoSelecionar}
            onPress={selecionarArquivos}
            activeOpacity={0.8}
          >
            <Ionicons
              name="download-outline"
              size={21}
              color="#FFFFFF"
            />
            <Text style={styles.textoBotaoSelecionar}>
              selecionar arquivos
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listaDocumentos}>
          {documentos.map((documento) => (
            <View key={documento.id} style={styles.documento}>
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={27}
                color="#650000"
              />

              <View style={styles.infoDocumento}>
                <Text style={styles.nomeDocumento}>
                  {formatarNome(documento.nome)}
                </Text>

                <Text style={styles.tamanhoDocumento}>
                  PDF    {documento.tamanho}
                </Text>
              </View>

              <View style={styles.status}>
                <Ionicons
                  name="checkmark-circle"
                  size={11}
                  color="#216B31"
                />
                <Text style={styles.textoStatus}>Selecionado</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  setDocumentos((atuais) =>
                    atuais.filter((item) => item.id !== documento.id)
                  )
                }
                accessibilityLabel={`Remover ${documento.nome}`}
                style={styles.botaoRemover}
              >
                <Ionicons
                  name="close-circle-outline"
                  size={19}
                  color="#650000"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.acoes}>
        <TouchableOpacity
          style={styles.botaoProcessar}
          onPress={processarDocumentos}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoProcessar}>
            Processar Documento
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={limparSelecao}
          activeOpacity={0.8}
        >
          <Ionicons name="trash-outline" size={22} color="#650000" />
          <Text style={styles.textoLimpar}>Limpar Seleção</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
