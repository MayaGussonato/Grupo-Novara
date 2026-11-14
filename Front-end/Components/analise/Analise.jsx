
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";

import { criarAnaliseStyles } from "./AnaliseStyles";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useTema } from "../tema/TemaContext";
import {
  buscarDocumento,
  buscarExtracoes,
  buscarHistorico,
} from "../../Services/documentoService";
import {
  formatarData,
  formatarDataHora,
  formatarTamanho,
  formatarConfianca,
  statusParaInterface,
} from "../../Services/formatadores";

const abas = ["Resumo", "Dados Extraídos", "Histórico"];

export default function Analise({ route, navigation }) {
  const [abaAtiva, setAbaAtiva] = useState("Resumo");

  const { cores, modoEscuro } = useTema();

  const styles = useMemo(
    () => criarAnaliseStyles(cores, modoEscuro),
    [cores, modoEscuro]
  );

  const corSucesso = modoEscuro ? "#6FD98F" : "#17652D";
  const corAlerta = "#F2A23A";

  const idDocumento = route?.params?.idDocumento;

  const [documento, setDocumento] = useState(null);
  const [extracao, setExtracao] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (!idDocumento) {
        setCarregando(false);
        return;
      }

      try {
        setErro(null);

        const doc = await buscarDocumento(idDocumento);

        // A extração mais recente é a que aparece em "Dados Extraídos"
        const extracoes = await buscarExtracoes(idDocumento);
        const ultima = Array.isArray(extracoes) && extracoes.length > 0
          ? extracoes[0]
          : null;

        let hist = [];

        try {
          hist = await buscarHistorico(idDocumento);
        } catch {
          hist = [];
        }

        if (ativo) {
          setDocumento(doc);
          setExtracao(ultima);
          setHistorico(Array.isArray(hist) ? hist : []);
        }
      } catch (falha) {
        if (ativo) {
          setErro(falha.message || "Não foi possível carregar o documento.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [idDocumento]);

  const nomeDocumento =
    documento?.nomeArquivo || route?.params?.nomeDocumento || "Documento";

  const statusInfo = statusParaInterface(documento?.statusDocumento);

  // JSON gravado em Extracao.Dados_Estruturados (vem como texto)
  const dadosJson = useMemo(() => {
    if (!extracao?.dadosEstruturados) {
      return {};
    }

    try {
      const bruto = extracao.dadosEstruturados;

      return typeof bruto === "string" ? JSON.parse(bruto) : bruto;
    } catch {
      return {};
    }
  }, [extracao]);

  // Converte o JSON da extração em pares campo/valor para a aba de dados
  const dadosExtraidos = useMemo(() => {
    const linhas = [];

    Object.entries(dadosJson).forEach(([chave, valor]) => {
      if (valor === null || valor === undefined) {
        return;
      }

      if (typeof valor === "object" && "valor" in valor) {
        if (valor.valor === null || valor.valor === undefined) {
          return;
        }

        linhas.push([
          chave.replace(/_/g, " "),
          valor.valor_normalizado || valor.valor,
        ]);

        return;
      }

      if (typeof valor === "string" && chave !== "observacoes") {
        linhas.push([chave.replace(/_/g, " "), valor]);
      }
    });

    return linhas;
  }, [dadosJson]);

  const camposComValor = dadosExtraidos.length;
  const camposConferidos = Object.values(dadosJson).filter(
    (valor) =>
      valor &&
      typeof valor === "object" &&
      valor.conferido === true
  ).length;

  const indicadores = [
    {
      texto: "Campos Extraídos",
      valor: String(camposComValor),
      icone: "check-circle",
      cor: corSucesso,
    },
    {
      texto: "Campos Confirmados",
      valor: String(camposConferidos),
      icone: "check-circle",
      cor: corSucesso,
    },
    {
      texto: "Nível de Confiança",
      valor: formatarConfianca(extracao?.nivelConfianca),
      icone: "analytics-outline",
      cor:
        Number(extracao?.nivelConfianca) >= 90 ? corSucesso : corAlerta,
    },
    {
      texto: "Tecnologia",
      valor: extracao?.tecnologia || "—",
      icone: "hardware-chip-outline",
      cor: cores.primario,
    },
  ];

  return (
    <View style={styles.container}>
      <View>
      <Header
        titulo="Analise de Documentos"
      />
      <Text style={styles.subtitulo}>
        Resultado do processamento gerado pela IA
      </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >

        <View style={styles.documento}>
          <MaterialCommunityIcons
            name="file-pdf-box"
            size={30}
            color={cores.vinho}
          />

          <View style={styles.infoDocumento}>
            <Text style={styles.nomeDocumento}>
              {nomeDocumento}
            </Text>

            <Text style={styles.detalheDocumento}>
              {(documento?.formato || "").toUpperCase()}
              {documento?.tamanhoBytes
                ? `    ${formatarTamanho(documento.tamanhoBytes)}`
                : ""}
              {documento?.dataEnvio
                ? `    ${formatarData(documento.dataEnvio)}`
                : ""}
            </Text>
          </View>

          <View style={styles.status}>
            <Ionicons
              name="checkmark-circle"
              size={11}
              color={statusInfo.cor}
            />

            <Text style={styles.textoStatus}>
              {statusInfo.rotulo}
            </Text>
          </View>
        </View>

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

        {abaAtiva === "Resumo" && (
          <>
            <View style={styles.cardResumo}>
              <View style={styles.areaGrafico}>
                <View style={styles.grafico}>
                  <View style={styles.graficoInterno}>
                    <Text style={styles.valorGrafico}>
                      {formatarConfianca(extracao?.nivelConfianca)}
                    </Text>
                  </View>
                </View>
              </View>

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

            {carregando ? (
              <ActivityIndicator
                style={{ marginVertical: 18 }}
                color={cores.primario}
              />
            ) : dadosExtraidos.length > 0 ? (
              dadosExtraidos.map(([campo, valor]) => (
                <View key={campo} style={styles.campoExtraido}>
                  <Text style={styles.nomeCampo}>{campo}</Text>
                  <Text style={styles.valorCampo}>{valor}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.valorCampo}>
                {erro ||
                  "Nenhuma extração encontrada. Processe o documento na tela de Validação."}
              </Text>
            )}
          </View>
        )}

        {abaAtiva === "Histórico" && (
          <View style={styles.cardDados}>
            <Text style={styles.tituloSecao}>Histórico</Text>

            {historico.length > 0 ? (
              historico.map((evento) => (
                <View key={evento.idHistorico} style={styles.evento}>
                  <Ionicons
                    name="checkmark-circle"
                    size={17}
                    color={cores.primario}
                  />

                  <View style={styles.infoEvento}>
                    <Text style={styles.nomeCampo}>{evento.acao}</Text>
                    <Text style={styles.valorCampo}>
                      {evento.detalhes ? `${evento.detalhes} • ` : ""}
                      {formatarDataHora(evento.dataHora)}
                    </Text>
                  </View>
                </View>
              ))
            ) : (
              <Text style={styles.valorCampo}>
                Nenhum evento registrado.
              </Text>
            )}
          </View>
        )}

        <View style={{ marginTop: 100 }} />
      </ScrollView>

      <Footer />
    </View>
  );
}
