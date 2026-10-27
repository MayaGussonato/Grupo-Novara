
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  carregando: {
    flex: 1,
    backgroundColor: '#E7F3F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  safeArea: {
    flex: 1,
    backgroundColor: '#E7F3F1',
  },

  container: {
    flex: 1,
    backgroundColor: '#E7F3F1',
  },

  header: {
    height: 68,
    backgroundColor: '#237E7E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  botaoMenu: {
    width: 42,
    height: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  tituloHeader: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    textAlign: 'center',
  },

  botaoPerfil: {
    width: 46,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  scroll: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: width * 0.055,
    paddingTop: 18,
    paddingBottom: 40,
  },

  listaIntegracoes: {
    width: '100%',
    gap: 9,
  },

  cardIntegracao: {
    width: '100%',
    minHeight: 62,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 7,
    paddingHorizontal: 14,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconeDocumento: {
    width: 38,
    height: 38,
  },

  infoIntegracao: {
    flex: 1,
    marginLeft: 12,
  },

  nomeIntegracao: {
    color: '#171717',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
  },

  arquivoIntegracao: {
    color: '#444444',
    fontSize: 10,
    fontFamily: 'Poppins_400Regular',
    marginTop: 4,
  },

  statusConcluido: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#B9F6B4',
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    gap: 4,
    marginLeft: 6,
  },

  textoStatus: {
    color: '#155C37',
    fontSize: 10,
    fontFamily: 'Poppins_500Medium',
  },

  botaoAdicionar: {
    width: '88%',
    minHeight: 43,
    backgroundColor: '#237E7E',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 16,
  },

  textoBotaoAdicionar: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Poppins_600SemiBold',
  },

  tituloTipos: {
    color: '#164F50',
    fontSize: 20,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 20,
  },

  gradeTipos: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 14,
  },

  cardTipo: {
    width: '48%',
    minHeight: 72,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  iconeTipo: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },

  nomeTipo: {
    flex: 1,
    color: '#222222',
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'left',
  },
});

export default styles;
