
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Ionicons from "@react-native-vector-icons/ionicons";
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import { dashboardStyles as styles } from "./DashboardStyles";
import Footer from "../footer/Footer";
import { useTema } from "../tema/TemaContext";
import { listarDocumentos } from "../../Services/documentoService";
import { listarValidacoesPendentes } from "../../Services/validacaoService";
import {
  formatarTamanho,
  formatarConfianca,
  statusParaInterface,
} from "../../Services/formatadores";

const meses = [
  { mes: "Abr", valor: 18 },
  { mes: "Mai", valor: 25 },
  { mes: "Jun", valor: 33 },
  { mes: "Jul", valor: 45 },
  { mes: "Ago", valor: 43 },
  { mes: "Set", valor: 52 },
  { mes: "Out", valor: 63 },
];

export default function Dashboard({ navigation }) {
  const { cores, modoEscuro } = useTema();

  const [documentos, setDocumentos] = useState([]);
  const [pendentes, setPendentes] = useState(0);
  const [carregando, setCarregando] = useState(true);

  const carregar = useCallback(async () => {
    try {
      const lista = await listarDocumentos({ tamanho: 100 });

      setDocumentos(Array.isArray(lista) ? lista : []);

      // A fila de revisão só existe para Revisor/Administrador
      try {
        const fila = await listarValidacoesPendentes();
        setPendentes(Array.isArray(fila) ? fila.length : 0);
      } catch {
        setPendentes(0);
      }
    } catch {
      setDocumentos([]);
      setPendentes(0);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // Indicadores calculados a partir dos documentos reais
  const indicadores = useMemo(() => {
    const total = documentos.length;

    const comConfianca = documentos.filter(
      (d) => d.nivelConfianca !== null && d.nivelConfianca !== undefined
    );

    const mediaConfianca =
      comConfianca.length > 0
        ? comConfianca.reduce(
            (soma, d) => soma + Number(d.nivelConfianca),
            0
          ) / comConfianca.length
        : null;

    const aprovados = documentos.filter(
      (d) => d.statusDocumento === "Aprovado"
    ).length;

    return [
      {
        titulo: String(total),
        descricao: "Documentos processados",
        icone: "document-text-outline",
        corDark: "#4AF272",
        corLight: "#169447",
        tipo: "documentos",
      },
      {
        titulo: formatarConfianca(mediaConfianca),
        descricao: "Confiança média da IA",
        icone: "analytics-outline",
        corDark: "#4AF272",
        corLight: "#169447",
        tipo: "precisao",
      },
      {
        titulo: String(aprovados),
        descricao: "Documentos aprovados",
        icone: "checkmark-done-outline",
        corDark: "#FFAE6B",
        corLight: "#FF963D",
        tipo: "tempo",
      },
      {
        titulo: String(pendentes),
        descricao: "Aguardando revisão",
        icone: "eye-outline",
        corDark: "#6BB0FF",
        corLight: "#398BFF",
        tipo: "revisao",
      },
    ];
  }, [documentos, pendentes]);

  // Barras do gráfico: documentos por mês de envio (últimos 6 meses)
  const meses = useMemo(() => {
    const nomes = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const agora = new Date();
    const baldes = [];

    for (let i = 5; i >= 0; i -= 1) {
      const data = new Date(agora.getFullYear(), agora.getMonth() - i, 1);
      baldes.push({ mes: nomes[data.getMonth()], chave: `${data.getFullYear()}-${data.getMonth()}`, quantidade: 0 });
    }

    documentos.forEach((doc) => {
      if (!doc.dataEnvio) return;
      const data = new Date(doc.dataEnvio);
      const chave = `${data.getFullYear()}-${data.getMonth()}`;
      const balde = baldes.find((b) => b.chave === chave);
      if (balde) balde.quantidade += 1;
    });

    const maior = Math.max(1, ...baldes.map((b) => b.quantidade));

    return baldes.map((b) => ({
      mes: b.mes,
      valor: Math.round((b.quantidade / maior) * 100),
    }));
  }, [documentos]);

  // Arquivos recentes: os 3 últimos enviados
  const arquivos = useMemo(
    () =>
      documentos.slice(0, 3).map((doc) => {
        const status = statusParaInterface(doc.statusDocumento);

        return {
          id: String(doc.idDocumento),
          nome: doc.nomeArquivo,
          formato: (doc.formato || "").toUpperCase(),
          tamanho: formatarTamanho(doc.tamanhoBytes),
          status,
        };
      }),
    [documentos]
  );

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <StatusBar style={modoEscuro ? "light" : "dark"} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Text style={[styles.titulo, { color: cores.texto }]}>
          DashBoard
        </Text>

        <View style={styles.gradeIndicadores}>
          {indicadores.map((item) => {
            const corIcone = modoEscuro ? item.corDark : item.corLight;

            return (
              <View
                key={item.tipo}
                style={[
                  styles.cardIndicador,
                  {
                    backgroundColor: cores.card,
                    borderColor: cores.borda,
                  },
                ]}
              >
                <View style={styles.linhaIndicador}>
                  {item.tipo === "precisao" ? (
                    <MaterialCommunityIcons
                      name="bullseye-arrow"
                      size={35}
                      color={corIcone}
                    />
                  ) : (
                    <Ionicons
                      name={item.icone}
                      size={35}
                      color={corIcone}
                    />
                  )}

                  <Text
                    style={[
                      styles.valorIndicador,
                      { color: cores.texto },
                    ]}
                  >
                    {item.titulo}
                  </Text>
                </View>

                <Text
                  style={[
                    styles.descricaoIndicador,
                    { color: cores.textoSecundario },
                  ]}
                >
                  {item.descricao}
                </Text>
              </View>
            );
          })}
        </View>

        <View
          style={[
            styles.cardGrafico,
            {
              backgroundColor: cores.card,
              borderColor: cores.borda,
            },
          ]}
        >
          <View style={styles.cabecalhoGrafico}>
            <Text
              style={[
                styles.tituloGrafico,
                { color: cores.texto },
              ]}
            >
              Documentos processados
            </Text>

            <View
              style={[
                styles.seletorPeriodo,
                { borderColor: cores.borda },
              ]}
            >
              <Text
                style={[
                  styles.textoPeriodo,
                  { color: cores.textoSecundario },
                ]}
              >
                Últimos 6 meses
              </Text>

              <Ionicons
                name="chevron-down"
                size={10}
                color={cores.textoSecundario}
              />
            </View>
          </View>

          <View style={styles.grafico}>
            <View style={styles.eixoY}>
              {["400", "300", "200", "100", "0"].map((valor) => (
                <Text
                  key={valor}
                  style={[
                    styles.textoEixo,
                    { color: cores.textoSecundario },
                  ]}
                >
                  {valor}
                </Text>
              ))}
            </View>

            <View style={styles.areaBarras}>
              {[0, 1, 2, 3, 4].map((linha) => (
                <View
                  key={linha}
                  style={[
                    styles.linhaGrade,
                    {
                      bottom: `${linha * 25}%`,
                      backgroundColor: modoEscuro
                        ? "#2E3A38"
                        : "#E9EFEE",
                    },
                  ]}
                />
              ))}

              <View style={styles.barras}>
                {meses.map((item, index) => {
                  let corBarra = "#8CCFC4";

                  if (index === meses.length - 1) {
                    corBarra = modoEscuro ? "#4AF272" : "#00645F";
                  } else if (index >= 3) {
                    corBarra = "#299D91";
                  } else {
                    corBarra = modoEscuro ? "#1B4741" : "#8CCFC4";
                  }

                  return (
                    <View
                      key={item.mes}
                      style={styles.colunaBarra}
                    >
                      <View
                        style={[
                          styles.barra,
                          {
                            height: `${item.valor}%`,
                            backgroundColor: corBarra,
                          },
                        ]}
                      />

                      <Text
                        style={[
                          styles.textoMes,
                          { color: cores.textoSecundario },
                        ]}
                      >
                        {item.mes}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <Text
          style={[
            styles.tituloRecentes,
            { color: cores.texto },
          ]}
        >
          Arquivos Recentes
        </Text>

        <View style={styles.listaArquivos}>
          {carregando && arquivos.length === 0 && (
            <Text
              style={[
                styles.tamanhoArquivo,
                { color: cores.textoSecundario, textAlign: "center" },
              ]}
            >
              Carregando documentos...
            </Text>
          )}

          {!carregando && arquivos.length === 0 && (
            <Text
              style={[
                styles.tamanhoArquivo,
                { color: cores.textoSecundario, textAlign: "center" },
              ]}
            >
              Nenhum documento enviado ainda.
            </Text>
          )}

          {arquivos.map((arquivo) => (
            <TouchableOpacity
              key={arquivo.id}
              style={[
                styles.cardArquivo,
                {
                  backgroundColor: cores.card,
                  borderColor: cores.borda,
                },
              ]}
              activeOpacity={0.75}
              onPress={() =>
                navigation?.navigate?.("Analise", {
                  idDocumento: arquivo.id,
                  nomeDocumento: arquivo.nome,
                })
              }
            >
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={30}
                color={cores.vinho || "#650000"}
              />

              <View style={styles.infoArquivo}>
                <Text
                  style={[
                    styles.nomeArquivo,
                    { color: cores.texto },
                  ]}
                >
                  {arquivo.nome}
                </Text>

                <Text
                  style={[
                    styles.tamanhoArquivo,
                    { color: cores.textoSecundario },
                  ]}
                >
                  {arquivo.formato}    {arquivo.tamanho}
                </Text>
              </View>

              <View
                style={[
                  styles.statusConcluido,
                  { backgroundColor: `${arquivo.status.cor}22` },
                ]}
              >
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color={arquivo.status.cor}
                />

                <Text
                  style={[
                    styles.textoConcluido,
                    { color: arquivo.status.cor },
                  ]}
                >
                  {arquivo.status.rotulo}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}
