import { StyleSheet } from "react-native";

export const criarAnaliseStyles = (cores, modoEscuro) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: cores.background,
    },

    conteudo: {
      paddingHorizontal: 16,
      paddingTop: 10,
      paddingBottom: 70,
    },

    subtitulo: {
      width: "100%",
      textAlign: "center",
      alignSelf: "center",
      fontSize: 13,
      color: cores.textoSecundario,
      marginTop: 8,
      marginBottom: 18,
      paddingHorizontal: 15,
    },

    documento: {
      minHeight: 50,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 5,
      paddingHorizontal: 9,
      paddingVertical: 7,
      gap: 8,
    },

    infoDocumento: {
      flex: 1,
    },

    nomeDocumento: {
      fontSize: 11,
      fontWeight: "600",
      color: cores.texto,
    },

    detalheDocumento: {
      fontSize: 11,
      color: cores.textoSecundario,
      marginTop: 4,
    },

    status: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2,
      backgroundColor: cores.statusAtivo,
      borderRadius: 5,
      paddingHorizontal: 5,
      paddingVertical: 4,
    },

    textoStatus: {
      fontSize: 9,
      color: modoEscuro ? "#BDFFB8" : "#17652D",
    },

    abas: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 18,
      marginBottom: 7,
    },

    aba: {
      paddingHorizontal: 7,
      paddingVertical: 9,
      borderBottomWidth: 2,
      borderBottomColor: "transparent",
    },

    abaAtiva: {
      borderBottomColor: "transparent",
    },

    textoAba: {
      fontSize: 13,
      color: cores.texto,
    },

    textoAbaAtiva: {
      color: cores.vinho,
      fontWeight: "600",
    },

    cardResumo: {
      backgroundColor: cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 5,
      minHeight: 346,
      paddingHorizontal: 17,
      paddingTop: 30,
      paddingBottom: 20,
      elevation: 3,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.12,
      shadowRadius: 5,
    },

    areaGrafico: {
      alignItems: "center",
      marginBottom: 35,
    },

    grafico: {
      width: 130,
      height: 130,
      alignItems: "center",
      justifyContent: "center",
    },

    graficoInterno: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 15,
    },

    graficoSemDados: {
      fontSize: 12,
      textAlign: "center",
      color: cores.textoSecundario,
      fontWeight: "400",
    },

    valorGrafico: {
      fontSize: 15,
      fontWeight: "600",
      color: cores.texto,
    },

    listaIndicadores: {
      gap: 12,
    },

    linhaIndicador: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },

    textoIndicador: {
      flex: 1,
      fontSize: 11,
      color: cores.texto,
    },

    valorIndicador: {
      fontSize: 11,
      color: cores.texto,
    },

    tituloPrevia: {
      fontSize: 14,
      fontWeight: "600",
      color: cores.texto,
      marginTop: 24,
      marginBottom: 10,
    },

    cardPrevia: {
      minHeight: 250,
      backgroundColor: cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 5,
      padding: 10,
      alignItems: "stretch",
      elevation: 2,
    },

    areaPrevisualizacao: {
      width: "100%",
      height: 330,
      minHeight: 260,
      backgroundColor: "#F1F3F5",
      borderRadius: 4,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },

    imagemPrevisualizacao: {
      width: "100%",
      height: "100%",
    },

    estadoPrevisualizacao: {
      flex: 1,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      gap: 12,
    },

    textoPrevisualizacao: {
      color: cores.textoSecundario,
      fontSize: 13,
      textAlign: "center",
      lineHeight: 20,
    },

    erroPrevisualizacao: {
      color: cores.erro || "#C62828",
      fontSize: 13,
      textAlign: "center",
      lineHeight: 20,
    },

    // Botões de baixar e atualizar, imediatamente abaixo da prévia.
    acoesPrevisualizacao: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 12,
      marginTop: 10,
      marginBottom: 18,
    },

    botaoPrevisualizacao: {
      flex: 1,
      minHeight: 42,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 7,
      borderWidth: 1,
      borderColor: cores.vinho,
      borderRadius: 5,
      backgroundColor: cores.card,
      paddingHorizontal: 8,
    },

    textoBotaoPrevisualizacao: {
      color: cores.vinho,
      fontSize: 12,
      fontWeight: "600",
    },

    cardInformacoes: {
      backgroundColor: cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 6,
      padding: 14,
      marginTop: 12,
      elevation: 2,
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
    },

    linhaResumoExtracao: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: 10,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    nomeResumoExtracao: {
      flex: 1,
      fontSize: 12,
      color: cores.textoSecundario,
      textTransform: "capitalize",
    },

    valorResumoExtracao: {
      flex: 1,
      fontSize: 12,
      color: cores.texto,
      textAlign: "right",
    },

    linhaVerificacao: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    conteudoVerificacao: {
      flex: 1,
    },

    nomeVerificacao: {
      fontSize: 12,
      fontWeight: "600",
      color: cores.texto,
    },

    descricaoVerificacao: {
      fontSize: 10,
      color: cores.textoSecundario,
      marginTop: 2,
    },

    percentualVerificacao: {
      fontSize: 11,
      color: cores.texto,
      fontWeight: "600",
    },

    // Ações finais da análise.
    acoesAnalise: {
      gap: 10,
      marginTop: 16,
      marginBottom: 12,
    },

    botaoAcaoAnalise: {
      minHeight: 46,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      borderWidth: 1,
      borderColor: cores.vinho,
      borderRadius: 5,
      backgroundColor: cores.card,
      paddingHorizontal: 12,
    },

    botaoAcaoAnaliseAtivo: {
      backgroundColor: modoEscuro ? "#3A252B" : "#F8EDEF",
    },

    botaoSalvarAnalise: {
      backgroundColor: cores.vinho,
    },

    textoAcaoAnalise: {
      color: cores.vinho,
      fontSize: 13,
      fontWeight: "600",
    },

    textoSalvarAnalise: {
      color: "#FFFFFF",
      fontSize: 13,
      fontWeight: "600",
    },

    botaoDesativado: {
      opacity: 0.45,
    },

    // Mensagens de retorno das ações.
    mensagemErroAcao: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 12,
      marginTop: 5,
      marginBottom: 10,
      backgroundColor: modoEscuro ? "#3B2020" : "#FFF0F0",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#E7B9B9",
    },

    textoMensagemErro: {
      flex: 1,
      fontSize: 12,
      color: modoEscuro ? "#FFAAAA" : "#A32222",
    },

    mensagemSucessoAcao: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 12,
      marginTop: 5,
      marginBottom: 10,
      backgroundColor: modoEscuro ? "#183A2A" : "#EAF7ED",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#B7D9BE",
    },

    textoMensagemSucesso: {
      flex: 1,
      fontSize: 12,
      color: modoEscuro ? "#9DE4AD" : "#17652D",
    },

    // Área de edição.
    cardEdicao: {
      backgroundColor: cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 5,
      padding: 16,
      marginTop: 10,
      marginBottom: 15,
    },

    tituloEdicao: {
      fontSize: 15,
      fontWeight: "700",
      color: cores.primario,
      marginBottom: 5,
    },

    descricaoEdicao: {
      fontSize: 11,
      color: cores.textoSecundario,
      marginBottom: 12,
    },

    campoEdicao: {
      paddingVertical: 9,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    inputEdicao: {
      minHeight: 40,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 5,
      backgroundColor: cores.input,
      color: cores.texto,
      fontSize: 13,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginTop: 6,
    },

    avisoEdicao: {
      fontSize: 11,
      lineHeight: 17,
      color: cores.textoSecundario,
      marginTop: 14,
    },

    // Modal de confirmação.
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.55)",
      justifyContent: "center",
      alignItems: "center",
      padding: 24,
    },

    modalExclusao: {
      width: "100%",
      maxWidth: 380,
      backgroundColor: cores.card,
      borderRadius: 9,
      padding: 24,
      alignItems: "center",
      elevation: 8,
    },

    tituloModal: {
      fontSize: 17,
      fontWeight: "700",
      color: cores.texto,
      marginTop: 14,
      marginBottom: 8,
    },

    textoModal: {
      fontSize: 13,
      color: cores.textoSecundario,
      textAlign: "center",
      lineHeight: 20,
      marginBottom: 22,
    },

    acoesModal: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "center",
      gap: 10,
    },

    botaoCancelarModal: {
      flex: 1,
      minHeight: 42,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
    },

    textoCancelarModal: {
      fontSize: 12,
      fontWeight: "600",
      color: cores.texto,
    },

    botaoConfirmarModal: {
      flex: 1,
      minHeight: 42,
      backgroundColor: "#A32222",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 10,
    },

    textoConfirmarModal: {
      fontSize: 12,
      fontWeight: "600",
      color: "#FFFFFF",
    },

    cardDados: {
      backgroundColor: cores.card,
      borderWidth: 1,
      borderColor: cores.borda,
      borderRadius: 5,
      padding: 16,
      elevation: 2,
    },

    tituloSecao: {
      fontSize: 15,
      fontWeight: "600",
      color: cores.primario,
      marginBottom: 12,
    },

    campoExtraido: {
      paddingVertical: 13,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    nomeCampo: {
      fontSize: 12,
      fontWeight: "600",
      color: cores.texto,
    },

    valorCampo: {
      fontSize: 12,
      color: cores.textoSecundario,
      marginTop: 4,
    },

    evento: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      paddingVertical: 14,
      borderBottomWidth: 1,
      borderBottomColor: cores.borda,
    },

    infoEvento: {
      flex: 1,
    },

   botaoExcluirAnalise: {
  minHeight: 46,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  borderWidth: 1,
  borderColor: cores.vinho,
  borderRadius: 5,
  backgroundColor: cores.card,
  paddingHorizontal: 12,
},

textoExcluirAnalise: {
  color: cores.vinho,
  fontSize: 13,
  fontWeight: "600",
},

botaoCancelarModal: {
  flex: 1,
  minHeight: 42,
  borderWidth: 1,
  borderColor: cores.vinho,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: "center",
},

textoCancelarModal: {
  fontSize: 12,
  fontWeight: "600",
  color: cores.vinho,
},

botaoConfirmarModal: {
  flex: 1,
  minHeight: 42,
  backgroundColor: cores.vinho,
  borderRadius: 5,
  alignItems: "center",
  justifyContent: "center",
},

textoConfirmarModal: {
  fontSize: 12,
  fontWeight: "600",
  color: "#FFFFFF",
},
  });