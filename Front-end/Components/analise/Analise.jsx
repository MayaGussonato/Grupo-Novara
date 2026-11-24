
import React, { useEffect, useMemo, useState } from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Platform,
  TextInput,
  Modal,
  Linking,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";
import Svg, { Circle } from "react-native-svg";

import { criarAnaliseStyles } from "./AnaliseStyles";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useTema } from "../tema/TemaContext";

import {
  buscarDocumento,
  buscarExtracoes,
  buscarHistorico,
  obterArquivoPreVisualizacao,
  excluirDocumento,
  salvarExtracao,
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

  // Estados do documento
  const [documento, setDocumento] = useState(null);
  const [extracao, setExtracao] = useState(null);
  const [historico, setHistorico] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados da pré-visualização
  const [previsualizacao, setPrevisualizacao] = useState(null);
  const [carregandoPrevisualizacao, setCarregandoPrevisualizacao] =
    useState(false);
  const [erroPrevisualizacao, setErroPrevisualizacao] = useState(null);
  const [versaoPrevisualizacao, setVersaoPrevisualizacao] = useState(0);

  // Estados das ações
  const [editandoDados, setEditandoDados] = useState(false);
  const [dadosEmEdicao, setDadosEmEdicao] = useState({});
  const [salvandoDados, setSalvandoDados] = useState(false);
  const [excluindoDocumento, setExcluindoDocumento] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);
  const [erroAcao, setErroAcao] = useState(null);
  const [sucessoAcao, setSucessoAcao] = useState(null);

  const nomeDocumento =
    documento?.nomeArquivo ||
    route?.params?.nomeDocumento ||
    "Documento";

  const formatoDocumento =
    documento?.formato ||
    (nomeDocumento.includes(".")
      ? nomeDocumento.split(".").pop()
      : "");

  // Cálculo do gráfico
  const valorConfianca = Number(extracao?.nivelConfianca);

  const temConfianca =
    extracao?.nivelConfianca !== null &&
    extracao?.nivelConfianca !== undefined &&
    extracao?.nivelConfianca !== "" &&
    Number.isFinite(valorConfianca) &&
    valorConfianca >= 0 &&
    valorConfianca <= 100;

  const progressoConfianca = temConfianca
    ? valorConfianca
    : 0;

  const raioGrafico = 52;
  const circunferencia = 2 * Math.PI * raioGrafico;

  // Carregar informações do documento
  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (!idDocumento) {
        setErro("Nenhum documento foi selecionado.");
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(null);

        const doc = await buscarDocumento(idDocumento);

        const extracoes = await buscarExtracoes(idDocumento);

        const listaExtracoes = Array.isArray(extracoes)
          ? extracoes
          : extracoes?.dados ||
            extracoes?.items ||
            extracoes?.extracoes ||
            [];

        const ultima =
          listaExtracoes.length > 0
            ? listaExtracoes[0]
            : null;

        let hist = [];

        try {
          const respostaHistorico =
            await buscarHistorico(idDocumento);

          hist = Array.isArray(respostaHistorico)
            ? respostaHistorico
            : respostaHistorico?.dados || [];
        } catch {
          hist = [];
        }

        if (ativo) {
          setDocumento(doc);
          setExtracao(ultima);
          setHistorico(hist);
        }
      } catch (falha) {
        if (ativo) {
          setErro(
            falha.message ||
              "Não foi possível carregar o documento."
          );
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

  // Carregar arquivo para pré-visualização
  useEffect(() => {
    let ativo = true;
    let urlTemporaria = null;

    async function carregarPrevisualizacao() {
      const idLimpo = String(idDocumento ?? "").trim();

      if (!/^\d+$/.test(idLimpo)) {
        setPrevisualizacao(null);
        setErroPrevisualizacao(
          "O identificador do documento é inválido."
        );
        setCarregandoPrevisualizacao(false);
        return;
      }

      try {
        setCarregandoPrevisualizacao(true);
        setErroPrevisualizacao(null);
        setPrevisualizacao(null);

        const arquivo = await obterArquivoPreVisualizacao(
          idLimpo,
          formatoDocumento,
          nomeDocumento
        );

        if (!ativo) return;

        if (Platform.OS === "web" && arquivo.blob) {
          urlTemporaria = URL.createObjectURL(arquivo.blob);

          setPrevisualizacao({
            tipo: arquivo.tipo,
            uri: urlTemporaria,
          });
        } else {
          setPrevisualizacao(arquivo);
        }
      } catch (falha) {
        if (ativo) {
          setErroPrevisualizacao(
            falha.message ||
              "Não foi possível carregar a pré-visualização."
          );
        }
      } finally {
        if (ativo) {
          setCarregandoPrevisualizacao(false);
        }
      }
    }

    carregarPrevisualizacao();

    return () => {
      ativo = false;

      if (urlTemporaria && Platform.OS === "web") {
        URL.revokeObjectURL(urlTemporaria);
      }
    };
  }, [
    idDocumento,
    formatoDocumento,
    nomeDocumento,
    versaoPrevisualizacao,
  ]);

  // Interpretar dados estruturados
  const dadosJson = useMemo(() => {
    if (!extracao?.dadosEstruturados) {
      return {};
    }

    try {
      const bruto = extracao.dadosEstruturados;

      return typeof bruto === "string"
        ? JSON.parse(bruto)
        : bruto;
    } catch {
      return {};
    }
  }, [extracao]);

  const dadosFonte = editandoDados
    ? dadosEmEdicao
    : dadosJson;

  // Transformar dados em campos
  const dadosExtraidos = useMemo(() => {
    const linhas = [];

    Object.entries(dadosFonte || {}).forEach(([chave, valor]) => {
      if (
        valor === null ||
        valor === undefined ||
        chave === "observacoes"
      ) {
        return;
      }

      if (
        typeof valor === "object" &&
        !Array.isArray(valor) &&
        "valor" in valor
      ) {
        if (valor.valor === null || valor.valor === undefined) {
          return;
        }

        linhas.push([
          chave.replace(/_/g, " "),
          valor.valor_normalizado || valor.valor,
        ]);

        return;
      }

      if (
        typeof valor === "string" ||
        typeof valor === "number"
      ) {
        linhas.push([
          chave.replace(/_/g, " "),
          valor,
        ]);
      }
    });

    return linhas;
  }, [dadosFonte]);

  const camposComValor = dadosExtraidos.length;

  const camposConferidos = Object.values(dadosJson).filter(
    (valor) =>
      valor &&
      typeof valor === "object" &&
      valor.conferido === true
  ).length;

  const statusInfo = statusParaInterface(
    documento?.statusDocumento
  );

  // Indicadores
  const indicadores = [
    {
      texto: "Campos Extraídos",
      valor: String(camposComValor),
      icone: "checkmark-circle-outline",
      cor: corSucesso,
    },
    {
      texto: "Campos Confirmados",
      valor: String(camposConferidos),
      icone: "checkmark-circle-outline",
      cor: corSucesso,
    },
    {
      texto: "Nível de Confiança",
      valor: temConfianca
        ? formatarConfianca(valorConfianca)
        : "—",
      icone: "analytics-outline",
      cor: temConfianca
        ? valorConfianca >= 90
          ? corSucesso
          : corAlerta
        : cores.textoSecundario,
    },
    {
      texto: "Tecnologia",
      valor: extracao?.tecnologia || "—",
      icone: "hardware-chip-outline",
      cor: cores.primario,
    },
  ];

  // Baixar pré-visualização
  async function baixarPrevisualizacao() {
    if (!previsualizacao?.uri) {
      setErroAcao(
        "A pré-visualização ainda não está disponível para baixar."
      );
      return;
    }

    try {
      if (Platform.OS === "web") {
        const link = document.createElement("a");
        link.href = previsualizacao.uri;
        link.download = nomeDocumento || "documento";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        await Linking.openURL(previsualizacao.uri);
      }
    } catch (falha) {
      setErroAcao(
        falha.message ||
          "Não foi possível baixar o documento."
      );
    }
  }

  // Iniciar edição
  function iniciarEdicao() {
    if (!extracao) {
      setErroAcao(
        "Não existe uma extração disponível para editar."
      );
      return;
    }

    try {
      const copia = JSON.parse(JSON.stringify(dadosJson));

      setDadosEmEdicao(copia);
      setEditandoDados(true);
      setErroAcao(null);
      setSucessoAcao(null);
    } catch {
      setErroAcao(
        "Não foi possível preparar os dados para edição."
      );
    }
  }

  // Cancelar edição
  function cancelarEdicao() {
    setDadosEmEdicao({});
    setEditandoDados(false);
    setErroAcao(null);
    setSucessoAcao(null);
  }

  // Atualizar campo
  function atualizarCampo(chave, texto) {
    setDadosEmEdicao((anterior) => {
      const valorAtual = anterior[chave];

      if (
        valorAtual &&
        typeof valorAtual === "object" &&
        !Array.isArray(valorAtual) &&
        "valor" in valorAtual
      ) {
        return {
          ...anterior,
          [chave]: {
            ...valorAtual,
            valor: texto,
            valor_normalizado: texto,
          },
        };
      }

      if (typeof valorAtual === "number") {
        const numero = Number(texto);

        return {
          ...anterior,
          [chave]:
            texto.trim() !== "" && Number.isFinite(numero)
              ? numero
              : texto,
        };
      }

      return {
        ...anterior,
        [chave]: texto,
      };
    });
  }

  // Salvar extração
  async function salvarDados() {
    if (!extracao) {
      setErroAcao(
        "Não existe uma extração disponível para salvar."
      );
      return;
    }

    const dadosParaSalvar = editandoDados
      ? dadosEmEdicao
      : dadosJson;

    if (
      !idDocumento ||
      !dadosParaSalvar ||
      typeof dadosParaSalvar !== "object"
    ) {
      setErroAcao(
        "Não foi possível identificar os dados do documento."
      );
      return;
    }

    try {
      setSalvandoDados(true);
      setErroAcao(null);
      setSucessoAcao(null);

      const resposta = await salvarExtracao({
        idDocumento: Number(idDocumento),
        tecnologia: extracao.tecnologia || "Edição manual",
        textoExtraido: extracao.textoExtraido || null,
        dadosEstruturados: dadosParaSalvar,
        nivelConfianca:
          extracao.nivelConfianca === null ||
          extracao.nivelConfianca === undefined
            ? null
            : Number(extracao.nivelConfianca),
      });

      if (resposta) {
        setExtracao(resposta);
        setDadosEmEdicao(
          resposta.dadosEstruturados || dadosParaSalvar
        );
      }

      const documentoAtualizado =
        await buscarDocumento(idDocumento);

      setDocumento(documentoAtualizado);

      try {
        const respostaHistorico =
          await buscarHistorico(idDocumento);

        setHistorico(
          Array.isArray(respostaHistorico)
            ? respostaHistorico
            : respostaHistorico?.dados || []
        );
      } catch {
        // Não impede o salvamento.
      }

      setEditandoDados(false);

      setSucessoAcao(
        "Alterações salvas como uma nova versão da extração."
      );
    } catch (falha) {
      setErroAcao(
        falha.message ||
          "Não foi possível salvar as alterações."
      );
    } finally {
      setSalvandoDados(false);
    }
  }

  // ABRIR CONFIRMAÇÃO DE EXCLUSÃO
  function abrirConfirmacaoExclusao() {
    setErroAcao(null);
    setConfirmarExclusao(true);
  }

  // EXCLUIR DOCUMENTO
  async function confirmarDelecao() {
    if (!idDocumento || excluindoDocumento) {
      return;
    }

    try {
      setExcluindoDocumento(true);
      setErroAcao(null);

      await excluirDocumento(idDocumento);

      setConfirmarExclusao(false);

      if (navigation?.goBack) {
        navigation.goBack();
      } else {
        navigation?.navigate?.("Dashboard");
      }
    } catch (falha) {
      setErroAcao(
        falha.message ||
          "Não foi possível excluir o documento."
      );

      setConfirmarExclusao(false);
    } finally {
      setExcluindoDocumento(false);
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Header titulo="Analise de Documentos" />

        <Text style={styles.subtitulo}>
          Resultado do processamento gerado pela IA
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        {/* INFORMAÇÕES DO DOCUMENTO */}
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

        {/* ABAS */}
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

        {/* RESUMO */}
        {abaAtiva === "Resumo" && (
          <>
            {/* PRÉ-VISUALIZAÇÃO */}
            <Text style={styles.tituloPrevia}>
              Pré Visualização
            </Text>

            <View style={styles.cardPrevia}>
              <View style={styles.areaPrevisualizacao}>
                {carregandoPrevisualizacao ? (
                  <View style={styles.estadoPrevisualizacao}>
                    <ActivityIndicator
                      color={cores.primario}
                      size="large"
                    />

                    <Text style={styles.textoPrevisualizacao}>
                      Carregando documento...
                    </Text>
                  </View>
                ) : erroPrevisualizacao ? (
                  <View style={styles.estadoPrevisualizacao}>
                    <Ionicons
                      name="alert-circle-outline"
                      size={34}
                      color={cores.erro || "#C62828"}
                    />

                    <Text style={styles.erroPrevisualizacao}>
                      {erroPrevisualizacao}
                    </Text>
                  </View>
                ) : previsualizacao?.tipo === "imagem" ? (
                  <Image
                    source={{
                      uri: previsualizacao.uri,
                      headers: previsualizacao.headers || {},
                    }}
                    resizeMode="contain"
                    style={styles.imagemPrevisualizacao}
                    onError={() =>
                      setErroPrevisualizacao(
                        "Não foi possível exibir a imagem do documento."
                      )
                    }
                  />
                ) : previsualizacao?.tipo === "pdf" ||
                  previsualizacao?.tipo === "texto" ? (
                  Platform.OS === "web" ? (
                    React.createElement("iframe", {
                      src: previsualizacao.uri,
                      title: `Pré-visualização de ${nomeDocumento}`,
                      style: {
                        width: "100%",
                        height: "100%",
                        border: "none",
                        backgroundColor: "#FFFFFF",
                      },
                    })
                  ) : (
                    <View style={styles.estadoPrevisualizacao}>
                      <Ionicons
                        name="document-text-outline"
                        size={34}
                        color={cores.primario}
                      />

                      <Text style={styles.textoPrevisualizacao}>
                        A visualização de PDF nesta versão do aplicativo ainda não está habilitada.
                      </Text>
                    </View>
                  )
                ) : previsualizacao?.tipo === "nao-suportado" ? (
                  <View style={styles.estadoPrevisualizacao}>
                    <Ionicons
                      name="document-outline"
                      size={34}
                      color={cores.textoSecundario}
                    />

                    <Text style={styles.textoPrevisualizacao}>
                      {previsualizacao.mensagem}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.estadoPrevisualizacao}>
                    <Text style={styles.textoPrevisualizacao}>
                      Não foi possível preparar a pré-visualização.
                    </Text>
                  </View>
                )}
              </View>
            </View>

            {/* BOTÕES DA PRÉ-VISUALIZAÇÃO */}
            <View style={styles.acoesPrevisualizacao}>
              <TouchableOpacity
                style={styles.botaoPrevisualizacao}
                activeOpacity={0.8}
                disabled={
                  !previsualizacao?.uri ||
                  carregandoPrevisualizacao
                }
                onPress={baixarPrevisualizacao}
              >
                <Ionicons
                  name="download-outline"
                  size={19}
                  color={cores.vinho}
                />

                <Text style={styles.textoBotaoPrevisualizacao}>
                  Baixar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.botaoPrevisualizacao}
                activeOpacity={0.8}
                disabled={carregandoPrevisualizacao}
                onPress={() => {
                  setErroPrevisualizacao(null);
                  setErroAcao(null);
                  setVersaoPrevisualizacao(
                    (valor) => valor + 1
                  );
                }}
              >
                {carregandoPrevisualizacao ? (
                  <ActivityIndicator
                    size="small"
                    color={cores.vinho}
                  />
                ) : (
                  <Ionicons
                    name="refresh-outline"
                    size={19}
                    color={cores.vinho}
                  />
                )}

                <Text style={styles.textoBotaoPrevisualizacao}>
                  Atualizar
                </Text>
              </TouchableOpacity>
            </View>

            {/* PROGRESSO DA ANÁLISE */}
            <View style={styles.cardResumo}>
              <View style={styles.areaGrafico}>
                <View style={styles.grafico}>
                  <Svg
                    width={130}
                    height={130}
                    viewBox="0 0 130 130"
                  >
                    <Circle
                      cx="65"
                      cy="65"
                      r={raioGrafico}
                      stroke={cores.borda}
                      strokeWidth="13"
                      fill="none"
                    />

                    {temConfianca && (
                      <Circle
                        cx="65"
                        cy="65"
                        r={raioGrafico}
                        stroke={cores.primario}
                        strokeWidth="13"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={[
                          circunferencia,
                          circunferencia,
                        ]}
                        strokeDashoffset={
                          circunferencia *
                          (1 - progressoConfianca / 100)
                        }
                        transform="rotate(-90 65 65)"
                      />
                    )}
                  </Svg>

                  <View style={styles.graficoInterno}>
                    {carregando ? (
                      <ActivityIndicator
                        color={cores.primario}
                      />
                    ) : (
                      <Text
                        style={[
                          styles.valorGrafico,
                          !temConfianca &&
                            styles.graficoSemDados,
                        ]}
                      >
                        {temConfianca
                          ? `${progressoConfianca
                              .toFixed(1)
                              .replace(".", ",")}%`
                          : "Sem informações"}
                      </Text>
                    )}
                  </View>
                </View>

                <Text
                  style={{
                    color: cores.textoSecundario,
                    fontSize: 11,
                    marginTop: 12,
                  }}
                >
                  Nível de confiança da análise
                </Text>
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

            {/* RESUMO DA EXTRAÇÃO */}
            <View style={styles.cardInformacoes}>
              <Text style={styles.tituloSecao}>
                <Ionicons
                  name="server-outline"
                  size={16}
                  color={cores.primario}
                />
                {"  "}Resumo da extração
              </Text>

              {dadosExtraidos.length > 0 ? (
                dadosExtraidos
                  .slice(0, 8)
                  .map(([campo, valor], indice) => (
                    <View
                      key={`${campo}-${indice}`}
                      style={styles.linhaResumoExtracao}
                    >
                      <Text style={styles.nomeResumoExtracao}>
                        {campo}
                      </Text>

                      <Text
                        style={styles.valorResumoExtracao}
                        numberOfLines={2}
                      >
                        {String(valor)}
                      </Text>
                    </View>
                  ))
              ) : (
                <Text style={styles.valorCampo}>
                  Nenhum dado foi extraído até o momento.
                </Text>
              )}
            </View>

            {/* VERIFICAÇÕES DA IA */}
            <View style={styles.cardInformacoes}>
              <Text style={styles.tituloSecao}>
                <Ionicons
                  name="hardware-chip-outline"
                  size={16}
                  color={cores.primario}
                />
                {"  "}Verificações da IA
              </Text>

              <View style={styles.linhaVerificacao}>
                <Ionicons
                  name="checkmark-circle"
                  size={17}
                  color={corSucesso}
                />

                <View style={styles.conteudoVerificacao}>
                  <Text style={styles.nomeVerificacao}>
                    Itens conferidos
                  </Text>

                  <Text style={styles.descricaoVerificacao}>
                    {camposConferidos} de {camposComValor} campos confirmados
                  </Text>
                </View>

                <Text style={styles.percentualVerificacao}>
                  {camposComValor > 0
                    ? `${Math.round(
                        (camposConferidos / camposComValor) * 100
                      )}%`
                    : "—"}
                </Text>
              </View>

              <View style={styles.linhaVerificacao}>
                <Ionicons
                  name="alert-circle"
                  size={17}
                  color={corAlerta}
                />

                <View style={styles.conteudoVerificacao}>
                  <Text style={styles.nomeVerificacao}>
                    Campos que requerem atenção
                  </Text>

                  <Text style={styles.descricaoVerificacao}>
                    Campos ainda não confirmados
                  </Text>
                </View>

                <Text style={styles.percentualVerificacao}>
                  {Math.max(
                    camposComValor - camposConferidos,
                    0
                  )}
                </Text>
              </View>

              <View style={styles.linhaVerificacao}>
                <Ionicons
                  name="shield-checkmark"
                  size={17}
                  color={
                    temConfianca && valorConfianca >= 80
                      ? corSucesso
                      : corAlerta
                  }
                />

                <View style={styles.conteudoVerificacao}>
                  <Text style={styles.nomeVerificacao}>
                    Consistência dos dados
                  </Text>

                  <Text style={styles.descricaoVerificacao}>
                    Baseada no nível de confiança da extração
                  </Text>
                </View>

                <Text style={styles.percentualVerificacao}>
                  {temConfianca
                    ? `${Math.round(valorConfianca)}%`
                    : "—"}
                </Text>
              </View>
            </View>

            {/* AÇÕES DA ANÁLISE */}
            <View style={styles.acoesAnalise}>
              {/* REVISAR CAMPOS */}
              <TouchableOpacity
                style={[
                  styles.botaoAcaoAnalise,
                  editandoDados &&
                    styles.botaoAcaoAnaliseAtivo,
                ]}
                activeOpacity={0.8}
                disabled={salvandoDados || excluindoDocumento}
                onPress={() =>
                  editandoDados
                    ? cancelarEdicao()
                    : iniciarEdicao()
                }
              >
                <Ionicons
                  name={
                    editandoDados
                      ? "close-outline"
                      : "create-outline"
                  }
                  size={18}
                  color={cores.vinho}
                />

                <Text style={styles.textoAcaoAnalise}>
                  {editandoDados
                    ? "Cancelar revisão"
                    : "Revisar Campos"}
                </Text>
              </TouchableOpacity>

              {/* SALVAR ANÁLISE */}
              <TouchableOpacity
                style={[
                  styles.botaoAcaoAnalise,
                  styles.botaoSalvarAnalise,
                  (!extracao || salvandoDados) &&
                    styles.botaoDesativado,
                ]}
                activeOpacity={0.8}
                disabled={
                  !extracao ||
                  salvandoDados ||
                  excluindoDocumento
                }
                onPress={salvarDados}
              >
                {salvandoDados ? (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />
                ) : (
                  <Ionicons
                    name="save-outline"
                    size={18}
                    color="#FFFFFF"
                  />
                )}

                <Text style={styles.textoSalvarAnalise}>
                  {salvandoDados
                    ? "Salvando..."
                    : "Salvar Análise"}
                </Text>
              </TouchableOpacity>

              {/* DELETAR DOCUMENTO */}
              <TouchableOpacity
                style={styles.botaoExcluirAnalise}
                activeOpacity={0.8}
                disabled={
                  salvandoDados ||
                  excluindoDocumento
                }
                onPress={abrirConfirmacaoExclusao}
              >
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color={cores.vinho}
                />

                <Text style={styles.textoExcluirAnalise}>
                  Deletar Documento
                </Text>
              </TouchableOpacity>
            </View>

            {/* MENSAGENS */}
            {erroAcao && (
              <View style={styles.mensagemErroAcao}>
                <Ionicons
                  name="alert-circle-outline"
                  size={17}
                  color="#B42318"
                />

                <Text style={styles.textoMensagemErro}>
                  {erroAcao}
                </Text>
              </View>
            )}

            {sucessoAcao && (
              <View style={styles.mensagemSucessoAcao}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={17}
                  color="#17652D"
                />

                <Text style={styles.textoMensagemSucesso}>
                  {sucessoAcao}
                </Text>
              </View>
            )}

            {/* CAMPOS PARA EDIÇÃO */}
            {editandoDados && (
              <View style={styles.cardEdicao}>
                <Text style={styles.tituloEdicao}>
                  Editar dados extraídos
                </Text>

                <Text style={styles.descricaoEdicao}>
                  Altere os campos abaixo e pressione Salvar.
                </Text>

                {dadosExtraidos.length > 0 ? (
                  dadosExtraidos.map(([campo], indice) => {
                    const chave = Object.keys(
                      dadosEmEdicao
                    ).find(
                      (item) =>
                        item.replace(/_/g, " ") === campo
                    );

                    const valorOriginal =
                      dadosEmEdicao[chave];

                    const valorInput =
                      valorOriginal &&
                      typeof valorOriginal === "object"
                        ? valorOriginal.valor_normalizado ??
                          valorOriginal.valor ??
                          ""
                        : valorOriginal ?? "";

                    return (
                      <View
                        key={`${campo}-${indice}`}
                        style={styles.campoEdicao}
                      >
                        <Text style={styles.nomeCampo}>
                          {campo}
                        </Text>

                        <TextInput
                          style={styles.inputEdicao}
                          value={String(valorInput)}
                          onChangeText={(texto) =>
                            atualizarCampo(chave, texto)
                          }
                          placeholder={`Informe ${campo}`}
                          placeholderTextColor={
                            cores.textoSecundario
                          }
                        />
                      </View>
                    );
                  })
                ) : (
                  <Text style={styles.valorCampo}>
                    Não existem dados extraídos para editar.
                  </Text>
                )}

                <Text style={styles.avisoEdicao}>
                  Ao salvar, uma nova versão da extração será criada
                  e enviada para revisão.
                </Text>
              </View>
            )}
          </>
        )}

        {/* DADOS EXTRAÍDOS */}
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
              dadosExtraidos.map(([campo, valor], indice) => {
                const chave = Object.keys(dadosFonte).find(
                  (item) =>
                    item.replace(/_/g, " ") === campo
                );

                const valorOriginal = dadosFonte[chave];

                const valorInput =
                  valorOriginal &&
                  typeof valorOriginal === "object"
                    ? valorOriginal.valor_normalizado ??
                      valorOriginal.valor ??
                      ""
                    : valorOriginal ?? "";

                return (
                  <View
                    key={`${campo}-${indice}`}
                    style={styles.campoExtraido}
                  >
                    <Text style={styles.nomeCampo}>
                      {campo}
                    </Text>

                    {editandoDados ? (
                      <TextInput
                        style={styles.inputEdicao}
                        value={String(valorInput)}
                        onChangeText={(texto) =>
                          atualizarCampo(chave, texto)
                        }
                      />
                    ) : (
                      <Text style={styles.valorCampo}>
                        {String(valor)}
                      </Text>
                    )}
                  </View>
                );
              })
            ) : (
              <Text style={styles.valorCampo}>
                {erro ||
                  "Nenhuma extração encontrada. Processe o documento na tela de Validação."}
              </Text>
            )}
          </View>
        )}

        {/* HISTÓRICO */}
        {abaAtiva === "Histórico" && (
          <View style={styles.cardDados}>
            <Text style={styles.tituloSecao}>
              Histórico
            </Text>

            {carregando ? (
              <ActivityIndicator
                style={{ marginVertical: 18 }}
                color={cores.primario}
              />
            ) : historico.length > 0 ? (
              historico.map((evento, indice) => (
                <View
                  key={evento.idHistorico || indice}
                  style={styles.evento}
                >
                  <Ionicons
                    name="checkmark-circle"
                    size={17}
                    color={cores.primario}
                  />

                  <View style={styles.infoEvento}>
                    <Text style={styles.nomeCampo}>
                      {evento.acao}
                    </Text>

                    <Text style={styles.valorCampo}>
                      {evento.detalhes
                        ? `${evento.detalhes} • `
                        : ""}

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

        <View style={{ marginTop: 20 }} />
      </ScrollView>

      <Footer />

      {/* MODAL DE CONFIRMAÇÃO DE EXCLUSÃO */}
      <Modal
        visible={confirmarExclusao}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!excluindoDocumento) {
            setConfirmarExclusao(false);
          }
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalExclusao}>
            <Ionicons
              name="trash-outline"
              size={34}
              color={cores.vinho}
            />

            <Text style={styles.tituloModal}>
              Deletar documento?
            </Text>

            <Text style={styles.textoModal}>
              Tem certeza de que deseja excluir este documento?
              Essa ação removerá o documento da listagem.
            </Text>

            <View style={styles.acoesModal}>
              <TouchableOpacity
                style={styles.botaoCancelarModal}
                disabled={excluindoDocumento}
                onPress={() => setConfirmarExclusao(false)}
              >
                <Text style={styles.textoCancelarModal}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.botaoConfirmarModal,
                  excluindoDocumento && styles.botaoDesativado,
                ]}
                disabled={excluindoDocumento}
                onPress={confirmarDelecao}
              >
                {excluindoDocumento ? (
                  <ActivityIndicator
                    size="small"
                    color="#FFFFFF"
                  />
                ) : (
                  <Text style={styles.textoConfirmarModal}>
                    Deletar
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
