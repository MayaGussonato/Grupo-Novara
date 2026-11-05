import { StyleSheet } from 'react-native';

export const cores = {
    principal: '#174847',
    titulo: '#174847',
    fundo: '#E9F4F3',
    branco: '#FFFFFF',
    botaoMais: '#6B0F1A',
    texto: '#1A1A1A',
    textoSuave: '#5F6B6B',
    verde: '#1E9E5A',
    verdeClaro: '#E3F5EA',
    cinzaClaro: '#ECEEEE',
};

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: cores.fundo,
    },
    conteudo: {
        flex: 1,
    },
    conteudoInterno: {
        paddingHorizontal: 26,
        paddingTop: 18,
        paddingBottom: 32,
    },
    cabecalho: {},
    tituloLinha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    titulo: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 26,
        lineHeight: 36,
        color: cores.titulo,
    },
    subtitulo: {
        fontFamily: 'Poppins_300Light',
        fontSize: 15,
        lineHeight: 22,
        color: cores.titulo,
        marginLeft: 6,
    },

    // Barra de busca + filtro + botão de "+"
    barraAcoes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 30,
        marginBottom: 32,
        zIndex: 10,
    },
    barraEsquerda: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    campoBusca: {
        width: 315,
        height: 35,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: cores.branco,
        borderWidth: 1,
        borderColor: cores.principal,
        borderRadius: 4,
        paddingHorizontal: 10,
        gap: 8,
    },
    inputBusca: {
        fontFamily: 'Poppins_400Regular',
        flex: 1,
        fontSize: 12,
        color: cores.texto,
        outlineStyle: 'none',
    },
    botaoFiltro: {
        width: 42,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cores.branco,
        borderWidth: 1,
        borderColor: cores.principal,
        borderRadius: 4,
    },
    botaoFiltroAtivo: {
        backgroundColor: cores.principal,
    },
    menuFiltro: {
        position: 'absolute',
        top: 40,
        left: 325,
        minWidth: 190,
        backgroundColor: cores.branco,
        borderWidth: 1,
        borderColor: cores.principal,
        borderRadius: 4,
        paddingVertical: 6,
        zIndex: 20,
    },
    tituloMenuFiltro: {
        fontFamily: 'Poppins_300Light',
        fontSize: 12,
        color: cores.textoSuave,
        paddingHorizontal: 14,
        paddingVertical: 4,
    },
    itemFiltro: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
        paddingVertical: 9,
    },
    itemFiltroAtivo: {
        backgroundColor: cores.fundo,
    },
    textoItemFiltro: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: cores.texto,
    },
    botaoMais: {
        width: 43,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cores.botaoMais,
        borderRadius: 4,
    },

    // Grade de cards
    scroll: {
        flex: 1,
    },
    grade: {
        width: '100%',
    },
    linhaCards: {
        flexDirection: 'row',
        gap: 20,
        marginBottom: 20,
    },
    cardVazio: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: 0,
        padding: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    card: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        minWidth: 0,
        minHeight: 200,
        backgroundColor: cores.branco,
        borderWidth: 1,
        borderColor: cores.principal,
        borderRadius: 6,
        padding: 16,
    },
    cardTopo: {
        alignItems: 'center',
        gap: 8,
        marginBottom: 14,
    },
    logoLinha: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    nomeIntegracao: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 20,
        color: cores.texto,
    },
    selo: {
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    seloConectado: {
        backgroundColor: cores.verdeClaro,
    },
    seloDesconectado: {
        backgroundColor: cores.cinzaClaro,
    },
    seloPonto: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    seloTexto: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 11,
    },
    linhaInfo: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 10,
        marginBottom: 12,
    },
    textoInfo: {
        minWidth: 0,
        fontFamily: 'Poppins_400Regular',
        flex: 1,
        fontSize: 13,
        color: cores.texto,
    },
    rotuloSync: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: cores.texto,
    },
    dataSync: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 12,
        color: cores.texto,
        marginTop: 2,
    },
    vazio: {
        alignItems: 'center',
        paddingTop: 60,
        gap: 8,
    },
    textoVazio: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: cores.textoSuave,
    },
});