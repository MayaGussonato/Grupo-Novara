
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

import { atendimentoStyles as styles } from "./AtendimentoStyles";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useTema } from "../tema/TemaContext";

import { listarDocumentos } from "../../Services/documentoService";
import {
  formatarDataHora,
  statusParaInterface,
} from "../../Services/formatadores";

export default function Atendimento({ navigation }) {
  const [filtro, setFiltro] = useState("Todos");
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const { cores, modoEscuro } = useTema();

  async function carregarDocumentos() {
    try {
      setCarregando(true);
      setErro(null);

      const resposta = await listarDocumentos({
        pagina: 1,
        tamanho: 100,
      });

      const lista = Array.isArray(resposta)
        ? resposta
        : resposta?.documentos ||
          resposta?.dados ||
          resposta?.items ||
          [];

      setDocumentos(lista);
    } catch (falha) {
      setErro(
        falha.message || "Não foi possível carregar os documentos."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarDocumentos();
  }, []);

  const filtros = [
    "Todos",
    "Processando",
    "Revisando",
    "Aprovados",
    "Erros",
  ];

  const documentosFiltrados = documentos.filter((documento) => {
    if (filtro === "Todos") return true;

    const status = statusParaInterface(
      documento.statusDocumento
    ).rotulo;

    return status === filtro;
  });

  function abrirAnalise(documento) {
    navigation?.navigate?.("Analise", {
      idDocumento: documento.idDocumento,
      nomeDocumento: documento.nomeArquivo,
    });
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cores.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Header titulo="Central de Atendimentos" />

        <Text
          style={[
            styles.titulo,
            { color: cores.textoSecundario },
          ]}
        >
          Consulte Seus Documentos E Acesse Suas Análises
        </Text>

        <View style={styles.filtros}>
          {filtros.map((item) => {
            const isAtivo = filtro === item;

            return (
              <TouchableOpacity
                key={item}
                style={styles.filtro}
                onPress={() => setFiltro(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.textoFiltro,
                    { color: cores.texto },
                    isAtivo && [
                      styles.filtroAtivo,
                      { color: cores.vinho || "#650000" },
                    ],
                  ]}
                >
                  {item}
                </Text>

                {isAtivo && (
                  <View
                    style={[
                      styles.linhaAtiva,
                      {
                        backgroundColor:
                          cores.vinho || "#650000",
                      },
                    ]}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.lista}>
          {carregando ? (
            <ActivityIndicator
              size="large"
              color={cores.primario}
              style={{ marginTop: 30 }}
            />
          ) : erro ? (
            <View style={{ alignItems: "center", marginTop: 25 }}>
              <Text
                style={[
                  styles.semResultados,
                  { color: cores.textoSecundario },
                ]}
              >
                {erro}
              </Text>

              <TouchableOpacity
                onPress={carregarDocumentos}
                style={{
                  marginTop: 15,
                  padding: 10,
                }}
              >
                <Text style={{ color: cores.primario }}>
                  Tentar Novamente
                </Text>
              </TouchableOpacity>
            </View>
          ) : documentosFiltrados.length > 0 ? (
            documentosFiltrados.map((documento) => {
              const statusInfo = statusParaInterface(
                documento.statusDocumento
              );

              const corStatus =
                statusInfo.cor;

              const backgroundStatus = modoEscuro
                ? "#263A38"
                : "#E3F1F0";

              return (
                <TouchableOpacity
                  key={documento.idDocumento}
                  style={[
                    styles.card,
                    {
                      backgroundColor: cores.card,
                      borderColor: cores.borda,
                    },
                  ]}
                  activeOpacity={0.8}
                  onPress={() => abrirAnalise(documento)}
                >
                  <View style={styles.informacoes}>
                    <Text
                      style={[
                        styles.numero,
                        { color: cores.texto },
                      ]}
                    >
                      {documento.nomeArquivo || "Documento Sem Nome"}
                    </Text>

                    <Text
                      style={[
                        styles.descricao,
                        { color: cores.textoSecundario },
                      ]}
                    >
                      {documento.formato
                        ? documento.formato.toUpperCase()
                        : "Arquivo"}{" "}
                      {documento.nivelConfianca != null
                        ? `• Confiança: ${documento.nivelConfianca}%`
                        : ""}
                    </Text>
                  </View>

                  <View style={styles.etiquetas}>
                    <View
                      style={[
                        styles.status,
                        {
                          backgroundColor: backgroundStatus,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.textoStatus,
                          { color: corStatus },
                        ]}
                      >
                        {statusInfo.rotulo}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.rodapeCard}>
                    <Text
                      style={[
                        styles.data,
                        { color: cores.textoSecundario },
                      ]}
                    >
                      {formatarDataHora(documento.dataEnvio)}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: cores.primario,
                          fontSize: 10,
                        }}
                      >
                        Ver Análise
                      </Text>

                      <Ionicons
                        name="chevron-forward"
                        size={20}
                        color={cores.primario}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text
              style={[
                styles.semResultados,
                { color: cores.textoSecundario },
              ]}
            >
              {documentos.length === 0
                ? "Nenhum documento enviado ainda."
                : "Nenhum documento encontrado nesse filtro."}
            </Text>
          )}
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
