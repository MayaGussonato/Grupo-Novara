import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { dashboardStyles as styles } from "./DashboardStyles";
import Footer from "../footer/Footer";
import { useTema } from "../context/TemaContext";

const indicadores = [
  {
    titulo: "1324",
    descricao: "Documentos processados",
    icone: "document-text-outline",
    corDark: "#4AF272",
    corLight: "#169447",
    tipo: "documentos",
  },
  {
    titulo: "96,4%",
    descricao: "Taxa de precisão",
    icone: "analytics-outline",
    corDark: "#4AF272",
    corLight: "#169447",
    tipo: "precisao",
  },
  {
    titulo: "42h",
    descricao: "Tempo economizado",
    icone: "time-outline",
    corDark: "#FFAE6B",
    corLight: "#FF963D",
    tipo: "tempo",
  },
  {
    titulo: "23",
    descricao: "Documentos aguardando revisão",
    icone: "eye-outline",
    corDark: "#6BB0FF",
    corLight: "#398BFF",
    tipo: "revisao",
  },
];

const meses = [
  { mes: "Abr", valor: 18 },
  { mes: "Mai", valor: 25 },
  { mes: "Jun", valor: 33 },
  { mes: "Jul", valor: 45 },
  { mes: "Ago", valor: 43 },
  { mes: "Set", valor: 52 },
  { mes: "Out", valor: 63 },
];

const arquivos = [
  { id: "1", nome: "NF-18291.pdf", tamanho: "2.4 MB" },
  { id: "2", nome: "NF-18291.pdf", tamanho: "2.4 MB" },
  { id: "3", nome: "NF-18291.pdf", tamanho: "2.4 MB" },
];

export default function Dashboard({ navigation }) {
  const { cores, modoEscuro } = useTema();

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <StatusBar
        barStyle={modoEscuro ? "light-content" : "dark-content"}
        backgroundColor={cores.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Text style={[styles.titulo, { color: cores.texto }]}>DashBoard</Text>

        {/* Indicadores */}
        <View style={styles.gradeIndicadores}>
          {indicadores.map((item) => {
            const corIcone = modoEscuro ? item.corDark : item.corLight;
            return (
              <View
                key={item.tipo}
                style={[
                  styles.cardIndicador,
                  { backgroundColor: cores.card, borderColor: cores.borda },
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

                  <Text style={[styles.valorIndicador, { color: cores.texto }]}>
                    {item.titulo}
                  </Text>
                </View>

                <Text style={[styles.descricaoIndicador, { color: cores.textoSecundario }]}>
                  {item.descricao}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Gráfico */}
        <View style={[styles.cardGrafico, { backgroundColor: cores.card, borderColor: cores.borda }]}>
          <View style={styles.cabecalhoGrafico}>
            <Text style={[styles.tituloGrafico, { color: cores.texto }]}>
              Documentos processados
            </Text>

            <View style={[styles.seletorPeriodo, { borderColor: cores.borda }]}>
              <Text style={[styles.textoPeriodo, { color: cores.textoSecundario }]}>
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
              {["400", "300", "200", "100", "0"].map(
                (valor) => (
                  <Text key={valor} style={[styles.textoEixo, { color: cores.textoSecundario }]}>
                    {valor}
                  </Text>
                )
              )}
            </View>

            <View style={styles.areaBarras}>
              {[0, 1, 2, 3, 4].map((linha) => (
                <View
                  key={linha}
                  style={[
                    styles.linhaGrade,
                    { 
                      bottom: `${linha * 25}%`,
                      backgroundColor: modoEscuro ? "#2E3A38" : "#E9EFEE" 
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

                      <Text style={[styles.textoMes, { color: cores.textoSecundario }]}>
                        {item.mes}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        {/* Arquivos recentes */}
        <Text style={[styles.tituloRecentes, { color: cores.texto }]}>
          Arquivos Recentes
        </Text>

        <View style={styles.listaArquivos}>
          {arquivos.map((arquivo) => (
            <TouchableOpacity
              key={arquivo.id}
              style={[
                styles.cardArquivo,
                { backgroundColor: cores.card, borderColor: cores.borda }
              ]}
              activeOpacity={0.75}
              onPress={() =>
                navigation?.navigate?.(
                  "ProcessamentoInteligente",
                  { nomeDocumento: arquivo.nome }
                )
              }
            >
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={30}
                color={cores.vinho || "#650000"}
              />

              <View style={styles.infoArquivo}>
                <Text style={[styles.nomeArquivo, { color: cores.texto }]}>
                  {arquivo.nome}
                </Text>

                <Text style={[styles.tamanhoArquivo, { color: cores.textoSecundario }]}>
                  Pdf    {arquivo.tamanho}
                </Text>
              </View>

              <View style={[
                styles.statusConcluido, 
                { backgroundColor: modoEscuro ? "#1B3B22" : "#BDFFB8" }
              ]}>
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color={modoEscuro ? "#4AF272" : "#17652D"}
                />
                <Text style={[
                  styles.textoConcluido, 
                  { color: modoEscuro ? "#4AF272" : "#17652D" }
                ]}>
                  Concluído
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