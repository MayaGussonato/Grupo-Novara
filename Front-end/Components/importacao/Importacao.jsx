import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

import Header from "../header/Header";
import { styles } from "./ImportacaoStyles";
import Footer from "../footer/Footer";
import { useTema } from "../context/TemaContext";

export default function Importacao({ navigation }) {
  const [documentos, setDocumentos] = useState([]);
  const { cores, modoEscuro } = useTema();

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
  }

  function limparSelecao() {
    setDocumentos([]);
  }

  function formatarNome(nome) {
    if (nome.length <= 25) return nome;
    return `${nome.slice(0, 22)}...`;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: cores.background }]}>
      <Header navigation={navigation} titulo="Importação de documentos" />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.areaSelecao, { backgroundColor: cores.card, borderColor: cores.borda }]}>
          <Image
            source={require('../../assets/upload.png')}
            style={modoEscuro ? { tintColor: cores.textoSecundario } : null}
          />

          <Text style={[styles.textoArraste, { color: cores.texto }]}>
            Arraste seus documentos pra cá
          </Text>

          <Text style={[styles.textoSelecione, { color: cores.textoSecundario }]}>
            ou selecione arquivos do dispositivo
          </Text>

          <TouchableOpacity
            style={[styles.botaoSelecionar, { backgroundColor: cores.primario || "#287F7D" }]}
            onPress={selecionarArquivos}
            activeOpacity={0.8}
          >
            <Ionicons name="download-outline" size={21} color="#FFFFFF" />
            <Text style={styles.textoBotaoSelecionar}>selecionar arquivos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listaDocumentos}>
          {documentos.map((documento) => (
            <View
              key={documento.id}
              style={[styles.documento, { backgroundColor: cores.card, borderColor: cores.borda }]}
            >
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={27}
                color={cores.vinho || "#650000"}
              />

              <View style={styles.infoDocumento}>
                <Text style={[styles.nomeDocumento, { color: cores.texto }]}>
                  {formatarNome(documento.nome)}
                </Text>

                <Text style={[styles.tamanhoDocumento, { color: cores.textoSecundario }]}>
                  PDF    {documento.tamanho}
                </Text>
              </View>

              <View style={[styles.status, { backgroundColor: modoEscuro ? "#1B3B22" : "#C8F8C8" }]}>
                <Ionicons
                  name="checkmark-circle"
                  size={11}
                  color={modoEscuro ? "#4AF272" : "#216B31"}
                />
                <Text style={[styles.textoStatus, { color: modoEscuro ? "#4AF272" : "#216B31" }]}>
                  Selecionado
                </Text>
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
                  color={cores.vinho || "#650000"}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={[styles.acoes, { backgroundColor: cores.background }]}>
        <TouchableOpacity
          style={[styles.botaoProcessar, { backgroundColor: cores.primario || "#287F7D" }]}
          onPress={processarDocumentos}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoProcessar}>Processar Documento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={limparSelecao}
          activeOpacity={0.8}
        >
          <Ionicons name="trash-outline" size={22} color={cores.vinho || "#650000"} />
          <Text style={[styles.textoLimpar, { color: cores.vinho || "#650000" }]}>Limpar Seleção</Text>
        </TouchableOpacity>

        <Footer />
      </View>
    </SafeAreaView>
  );
}