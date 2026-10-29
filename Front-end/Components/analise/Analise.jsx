
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { AnaliseStyles as styles } from "./AnaliseStyles";
import Headers from "../header/Header";

const abas = ["Resumo", "Dados Extraídos", "Histórico"];

export default function Analise({ route, navigation }) {
  const [abaAtiva, setAbaAtiva] = useState("Resumo");

  const nomeDocumento =
    route?.params?.nomeDocumento || "NF-18291.pdf";

  const indicadores = [
    {
      texto: "Campos Extraídos",
      valor: "12",
      icone: "check-circle",
      cor: "#17652D",
    },
    {
      texto: "Campos Validados",
      valor: "10",
      icone: "check-circle",
      cor: "#17652D",
    },
    {
      texto: "Campos com Atenção",
      valor: "2",
      icone: "warning-outline",
      cor: "#F2A23A",
    },
    {
      texto: "Tempo de processamento",
      valor: "19s",
      icone: "warning-outline",
      cor: "#F2A23A",
    },
  ];

  const dadosExtraidos = [
    ["Empresa", "Microsoft"],
    ["CNPJ", "12.345.678/0001-90"],
    ["Data", "08/10/2026"],
    ["Valor", "R$ 4.580,00"],
    ["Número", "NF-18291"],
  ];

  return (
    <>
      <Headers />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Text style={styles.subtitulo}>
          Resultado do processamento gerado pela IA
        </Text>

        {/* Documento processado */}
        <View style={styles.documento}>
          <MaterialCommunityIcons
            name="file-pdf-box"
            size={30}
            color="#650000"
          />

          <View style={styles.infoDocumento}>
            <Text style={styles.nomeDocumento}>
              {nomeDocumento}
            </Text>
            <Text style={styles.detalheDocumento}>
              Pdf    2.4 MB
            </Text>
          </View>

          <View style={styles.status}>
            <Ionicons
              name="checkmark-circle"
              size={11}
              color="#17652D"
            />
            <Text style={styles.textoStatus}>Processado</Text>
          </View>
        </View>

        {/* Abas */}
        <View style={styles.abas}>
          {abas.map((aba) => (
            <TouchableOpacity
              key={aba}
              style={[
                styles.aba,
                abaAtiva === aba && styles.abaAtiva,
              ]}
              onPress={() => setAbaAtiva(aba)}
            >
              <Text
                style={[
                  styles.textoAba,
                  abaAtiva === aba && styles.textoAbaAtiva,
                ]}
              >
                {aba}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Conteúdo das abas */}
        {abaAtiva === "Resumo" && (
          <>
            <View style={styles.cardResumo}>
              {/* Gráfico circular */}
              <View style={styles.areaGrafico}>
                <View style={styles.grafico}>
                  <View style={styles.graficoInterno}>
                    <Text style={styles.valorGrafico}>96,8%</Text>
                  </View>
                </View>
              </View>

              {/* Indicadores */}
              <View style={styles.listaIndicadores}>
                {indicadores.map((item) => (
                  <View
                    key={item.texto}
                    style={styles.linhaIndicador}
                  >
                    <Ionicons
                      name={item.icone}
                      size={13}
                      color={item.cor}
                    />

                    <Text style={styles.textoIndicador}>
                      {item.texto}
                    </Text>

                    <Text style={styles.valorIndicador}>
                      {item.valor}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Pré-visualização */}
            <Text style={styles.tituloPrevia}>
              Pré Visualização
            </Text>

            <TouchableOpacity
              style={styles.cardPrevia}
              activeOpacity={0.8}
              onPress={() =>
                navigation?.navigate?.("VisualizarDocumento", {
                  nomeDocumento,
                })
              }
            >
              <View style={styles.paginaDocumento}>
                <View style={styles.cabecalhoNota}>
                  <View style={styles.logoMicrosoft}>
                    <View style={styles.quadradoLaranja} />
                    <View style={styles.quadradoVerde} />
                    <View style={styles.quadradoAzul} />
                    <View style={styles.quadradoAmarelo} />
                  </View>

                  <Text style={styles.textoMicrosoft}>
                    Microsoft
                  </Text>

                  <Text style={styles.textoNfe}>NF-e</Text>
                </View>

                <View style={styles.linhaNota} />
                <View style={styles.linhaNotaCurta} />
                <View style={styles.linhaNota} />
                <View style={styles.linhaNotaCurta} />
                <View style={styles.linhaNota} />
                <View style={styles.linhaNota} />
                <View style={styles.linhaNotaCurta} />
                <View style={styles.linhaNota} />
              </View>
            </TouchableOpacity>
          </>
        )}

        {abaAtiva === "Dados Extraídos" && (
          <View style={styles.cardDados}>
            <Text style={styles.tituloSecao}>
              Informações Extraídas
            </Text>

            {dadosExtraidos.map(([campo, valor]) => (
              <View key={campo} style={styles.campoExtraido}>
                <Text style={styles.nomeCampo}>{campo}</Text>
                <Text style={styles.valorCampo}>{valor}</Text>
              </View>
            ))}
          </View>
        )}

        {abaAtiva === "Histórico" && (
          <View style={styles.cardDados}>
            <Text style={styles.tituloSecao}>Histórico</Text>

            {[
              ["Documento recebido", "Arquivo enviado"],
              ["Processamento por IA", "Concluído em 19s"],
              ["Validação dos campos", "10 campos validados"],
            ].map(([titulo, descricao]) => (
              <View key={titulo} style={styles.evento}>
                <Ionicons
                  name="checkmark-circle"
                  size={17}
                  color="#287F7D"
                />
                <View style={styles.infoEvento}>
                  <Text style={styles.nomeCampo}>{titulo}</Text>
                  <Text style={styles.valorCampo}>{descricao}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </>
  );
}
