
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

const indicadores = [
  {
    titulo: "1324",
    descricao: "Documentos processados",
    icone: "document-text-outline",
    cor: "#169447",
    tipo: "documentos",
  },
  {
    titulo: "96,4%",
    descricao: "Taxa de precisão",
    icone: "analytics-outline",
    cor: "#169447",
    tipo: "precisao",
  },
  {
    titulo: "42h",
    descricao: "Tempo economizado",
    icone: "time-outline",
    cor: "#FF963D",
    tipo: "tempo",
  },
  {
    titulo: "23",
    descricao: "Documentos aguardando revisão",
    icone: "eye-outline",
    cor: "#398BFF",
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
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F3FFFC"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Text style={styles.titulo}>DashBoard</Text>

        {/* Indicadores */}
        <View style={styles.gradeIndicadores}>
          {indicadores.map((item) => (
            <View
              key={item.tipo}
              style={styles.cardIndicador}
            >
              <View style={styles.linhaIndicador}>
                {item.tipo === "precisao" ? (
                  <MaterialCommunityIcons
                    name="bullseye-arrow"
                    size={35}
                    color={item.cor}
                  />
                ) : (
                  <Ionicons
                    name={item.icone}
                    size={35}
                    color={item.cor}
                  />
                )}

                <Text style={styles.valorIndicador}>
                  {item.titulo}
                </Text>
              </View>

              <Text style={styles.descricaoIndicador}>
                {item.descricao}
              </Text>
            </View>
          ))}
        </View>

        {/* Gráfico */}
        <View style={styles.cardGrafico}>
          <View style={styles.cabecalhoGrafico}>
            <Text style={styles.tituloGrafico}>
              Documentos processados
            </Text>

            <View style={styles.seletorPeriodo}>
              <Text style={styles.textoPeriodo}>
                Últimos 6 meses
              </Text>
              <Ionicons
                name="chevron-down"
                size={10}
                color="#708080"
              />
            </View>
          </View>

          <View style={styles.grafico}>
            <View style={styles.eixoY}>
              {["400", "300", "200", "100", "0"].map(
                (valor) => (
                  <Text key={valor} style={styles.textoEixo}>
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
                    { bottom: `${linha * 25}%` },
                  ]}
                />
              ))}

              <View style={styles.barras}>
                {meses.map((item, index) => (
                  <View
                    key={item.mes}
                    style={styles.colunaBarra}
                  >
                    <View
                      style={[
                        styles.barra,
                        {
                          height: `${item.valor}%`,
                          backgroundColor:
                            index === meses.length - 1
                              ? "#00645F"
                              : index >= 3
                              ? "#299D91"
                              : "#8CCFC4",
                        },
                      ]}
                    />

                    <Text style={styles.textoMes}>
                      {item.mes}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Arquivos recentes */}
        <Text style={styles.tituloRecentes}>
          Arquivos Recentes
        </Text>

        <View style={styles.listaArquivos}>
          {arquivos.map((arquivo) => (
            <TouchableOpacity
              key={arquivo.id}
              style={styles.cardArquivo}
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
                color="#650000"
              />

              <View style={styles.infoArquivo}>
                <Text style={styles.nomeArquivo}>
                  {arquivo.nome}
                </Text>

                <Text style={styles.tamanhoArquivo}>
                  Pdf    {arquivo.tamanho}
                </Text>
              </View>

              <View style={styles.statusConcluido}>
                <Ionicons
                  name="checkmark-circle"
                  size={12}
                  color="#17652D"
                />
                <Text style={styles.textoConcluido}>
                  Concluído
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
