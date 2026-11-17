
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import * as DocumentPicker from "expo-document-picker";

import Header from "../header/Header";
import { styles } from "./ImportacaoStyles";
import Footer from "../footer/Footer";
import { useTema } from "../tema/TemaContext";

import {
  enviarDocumento,
  processarDocumento,
} from "../../Services/documentoService";

// Formata automaticamente o tamanho do arquivo.
function formatarTamanhoArquivo(bytes) {
  if (bytes == null || !Number.isFinite(Number(bytes))) {
    return "Tamanho indisponível";
  }

  const tamanho = Number(bytes);

  if (tamanho < 1024) {
    return `${tamanho} B`;
  }

  if (tamanho < 1024 * 1024) {
    return `${(tamanho / 1024).toFixed(2).replace(".", ",")} KB`;
  }

  if (tamanho < 1024 * 1024 * 1024) {
    return `${(tamanho / (1024 * 1024)).toFixed(2).replace(".", ",")} MB`;
  }

  return `${(tamanho / (1024 * 1024 * 1024)).toFixed(2).replace(".", ",")} GB`;
}

export default function Importacao({ navigation }) {
  const [documentos, setDocumentos] = useState([]);
  const [processando, setProcessando] = useState(false);

  const { cores, modoEscuro } = useTema();

  // Selecionar arquivos do dispositivo.
  async function selecionarArquivos() {
    try {
      const resultado = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (resultado.canceled) return;

      const formatosPermitidos = [
        "pdf",
        "png",
        "jpg",
        "jpeg",
        "tif",
        "tiff",
        "docx",
        "xlsx",
        "txt",
      ];

      const arquivosValidos = [];
      const arquivosInvalidos = [];

      resultado.assets.forEach((arquivo) => {
        const extensao = arquivo.name
          .split(".")
          .pop()
          .toLowerCase();

        if (formatosPermitidos.includes(extensao)) {
          arquivosValidos.push({
            id: `${arquivo.uri}-${arquivo.name}`,
            nome: arquivo.name,
            tipo: extensao.toUpperCase(),
            tamanho: formatarTamanhoArquivo(arquivo.size),
            uri: arquivo.uri,
            arquivo,
            status: "Selecionado",
            idDocumento: null,
          });
        } else {
          arquivosInvalidos.push(arquivo.name);
        }
      });

      if (arquivosValidos.length > 0) {
        setDocumentos((atuais) => {
          const combinados = [...atuais, ...arquivosValidos];

          return combinados.filter(
            (doc, index, lista) =>
              lista.findIndex(
                (item) => item.uri === doc.uri
              ) === index
          );
        });
      }

      if (arquivosInvalidos.length > 0) {
        Alert.alert(
          "Formato não permitido",
          "Alguns arquivos não foram adicionados.\n\n" +
            "Formatos aceitos: PDF, PNG, JPG, JPEG, TIFF, DOCX, XLSX e TXT."
        );
      }
    } catch (erro) {
      Alert.alert(
        "Erro",
        "Não foi possível selecionar os documentos."
      );
    }
  }

  // Enviar e processar os documentos.
  async function processarDocumentos() {
    if (documentos.length === 0) {
      Alert.alert(
        "Atenção",
        "Selecione algum documento."
      );
      return;
    }

    if (processando) return;

    setProcessando(true);

    let enviados = 0;
    let processados = 0;

    const falhas = [];

    try {
      for (const documento of documentos) {
        // Não processa novamente documentos já concluídos.
        if (documento.status === "Processado") {
          continue;
        }

        let idDocumento = documento.idDocumento;

        try {
          // 1. Enviar o arquivo para a API.
          // Se já possuir ID, não envia novamente.
          if (!idDocumento) {
            setDocumentos((atuais) =>
              atuais.map((item) =>
                item.id === documento.id
                  ? {
                      ...item,
                      status: "Enviando...",
                    }
                  : item
              )
            );

            const cadastro = await enviarDocumento(
              documento.arquivo,
              ""
            );

            idDocumento =
              cadastro?.idDocumento ??
              cadastro?.IdDocumento;

            if (!idDocumento) {
              throw new Error(
                "A API não retornou o identificador do documento."
              );
            }

            enviados++;

            // Guarda o ID retornado pela API.
            setDocumentos((atuais) =>
              atuais.map((item) =>
                item.id === documento.id
                  ? {
                      ...item,
                      idDocumento,
                      status: "Salvo",
                    }
                  : item
              )
            );
          }

          // 2. Solicitar o processamento.
          setDocumentos((atuais) =>
            atuais.map((item) =>
              item.id === documento.id
                ? {
                    ...item,
                    status: "Processando...",
                  }
                : item
            )
          );

          const resultado = await processarDocumento(
            idDocumento
          );

          console.log(
            "Resultado do processamento:",
            resultado
          );

          processados++;

          // 3. Atualizar o status na tela.
          setDocumentos((atuais) =>
            atuais.map((item) =>
              item.id === documento.id
                ? {
                    ...item,
                    idDocumento,
                    status: "Processado",
                  }
                : item
            )
          );
        } catch (erro) {
          console.error(
            `Erro no documento ${documento.nome}:`,
            erro
          );

          falhas.push(
            `${documento.nome}: ${erro.message || "Erro desconhecido"}`
          );

          // Se o upload já aconteceu, preserva o ID.
          setDocumentos((atuais) =>
            atuais.map((item) =>
              item.id === documento.id
                ? {
                    ...item,
                    idDocumento,
                    status: idDocumento
                      ? "Salvo na API"
                      : "Falha no envio",
                  }
                : item
            )
          );
        }
      }

      let mensagem =
        `${enviados} arquivo(s) novo(s) salvo(s) na API.\n` +
        `${processados} documento(s) processado(s).`;

      if (falhas.length > 0) {
        mensagem +=
          "\n\nProblemas encontrados:\n" +
          falhas.join("\n");
      }

      Alert.alert(
        falhas.length > 0
          ? "Processamento concluído com avisos"
          : "Sucesso",
        mensagem
      );
    } finally {
      setProcessando(false);
    }
  }

  // Remover um arquivo da seleção.
  function removerDocumento(id) {
    if (processando) return;

    setDocumentos((atuais) =>
      atuais.filter((item) => item.id !== id)
    );
  }

  // Limpar a seleção.
  function limparSelecao() {
    if (processando) return;

    setDocumentos([]);
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cores.background },
      ]}
    >
      <Header
        navigation={navigation}
        titulo="Importação De Documentos"
      />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Área de seleção */}
        <View
          style={[
            styles.areaSelecao,
            {
              backgroundColor: cores.card,
              borderColor: cores.borda,
            },
          ]}
        >
          <Image
            source={require("../../assets/upload.png")}
            style={
              modoEscuro
                ? { tintColor: cores.textoSecundario }
                : null
            }
          />

          <Text
            style={[
              styles.textoArraste,
              { color: cores.texto },
            ]}
          >
            Arraste Seus Documentos Para Cá
          </Text>

          <Text
            style={[
              styles.textoSelecione,
              { color: cores.textoSecundario },
            ]}
          >
            Ou Selecione Arquivos Do Dispositivo
          </Text>

          <TouchableOpacity
            style={[
              styles.botaoSelecionar,
              {
                backgroundColor:
                  cores.primario || "#287F7D",
              },
            ]}
            onPress={selecionarArquivos}
            activeOpacity={0.8}
            disabled={processando}
          >
            <Ionicons
              name="download-outline"
              size={21}
              color="#FFFFFF"
            />

            <Text style={styles.textoBotaoSelecionar}>
              Selecionar Arquivos
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de documentos */}
        <View style={styles.listaDocumentos}>
          {documentos.map((documento) => (
            <View
              key={documento.id}
              style={[
                styles.documento,
                {
                  backgroundColor: cores.card,
                  borderColor: cores.borda,
                },
              ]}
            >
              <MaterialCommunityIcons
                name="file-document-outline"
                size={27}
                color={cores.vinho || "#650000"}
              />

              <View style={styles.infoDocumento}>
                <Text
                  style={[
                    styles.nomeDocumento,
                    { color: cores.texto },
                  ]}
                >
                  {documento.nome}
                </Text>

                <Text
                  style={[
                    styles.tamanhoDocumento,
                    { color: cores.textoSecundario },
                  ]}
                >
                  {documento.tipo}    {documento.tamanho}
                </Text>
              </View>

              {/* Status */}
              <View
                style={[
                  styles.status,
                  {
                    backgroundColor: modoEscuro
                      ? "#1B3B22"
                      : "#C8F8C8",
                  },
                ]}
              >
                <Ionicons
                  name={
                    documento.status === "Processado"
                      ? "checkmark-circle"
                      : documento.status === "Processando..."
                      ? "sync-circle"
                      : documento.status === "Falha no envio"
                      ? "alert-circle"
                      : "checkmark-circle"
                  }
                  size={11}
                  color={
                    documento.status === "Falha no envio"
                      ? "#C0392B"
                      : modoEscuro
                      ? "#4AF272"
                      : "#216B31"
                  }
                />

                <Text
                  style={[
                    styles.textoStatus,
                    {
                      color:
                        documento.status === "Falha no envio"
                          ? "#C0392B"
                          : modoEscuro
                          ? "#4AF272"
                          : "#216B31",
                    },
                  ]}
                >
                  {documento.status}
                </Text>
              </View>

              {/* Remover documento */}
              <TouchableOpacity
                onPress={() => removerDocumento(documento.id)}
                accessibilityLabel={`Remover ${documento.nome}`}
                style={styles.botaoRemover}
                disabled={processando}
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

      {/* Ações inferiores */}
      <View
        style={[
          styles.acoes,
          { backgroundColor: cores.background },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.botaoProcessar,
            {
              backgroundColor:
                cores.primario || "#287F7D",
              opacity: processando ? 0.6 : 1,
            },
          ]}
          onPress={processarDocumentos}
          activeOpacity={0.8}
          disabled={processando}
        >
          <Text style={styles.textoBotaoProcessar}>
            {processando
              ? "Processando..."
              : "Processar Documento"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoLimpar}
          onPress={limparSelecao}
          activeOpacity={0.8}
          disabled={processando}
        >
          <Ionicons
            name="trash-outline"
            size={22}
            color={cores.vinho || "#650000"}
          />

          <Text
            style={[
              styles.textoLimpar,
              { color: cores.vinho || "#650000" },
            ]}
          >
            Limpar Seleção
          </Text>
        </TouchableOpacity>

        <Footer />
      </View>
    </View>
  );
}
