
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

  // CABEÇALHO
  header: {
    height: 68,
    backgroundColor: '#237E7E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  menu: {
    width: 42,
    height: 48,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  iconeMenu: {
    width: 28,
    height: 28,
  },

  titulo: {
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

  iconePerfil: {
    width: 42,
    height: 42,
  },

  // CONTEÚDO
  scroll: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: width * 0.055,
    paddingTop: 22,
    paddingBottom: 35,
  },

  // CARTÃO DE DADOS
  cardDados: {
    width: '100%',
    alignSelf: 'stretch',
    minHeight: 380,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 24,
    justifyContent: 'space-evenly',
    gap: 18,
  },

  campo: {
    width: '100%',
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  labelCampo: {
    color: '#222222',
    fontSize: 12,
    fontFamily: 'Poppins_500Medium',
    flexShrink: 0,
  },

  valorCampo: {
    color: '#222222',
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'right',
    flexShrink: 1,
    marginLeft: 10,
  },

  // ÁREA DE EXPORTAÇÃO
  areaExportacao: {
    width: '100%',
    alignSelf: 'stretch',
    marginTop: 32,
    paddingHorizontal: 8,
  },

  tituloExportacao: {
    color: '#111111',
    fontSize: 17,
    fontFamily: 'Poppins_500Medium',
    marginBottom: 16,
  },

  formatos: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },

  opcaoFormato: {
    width: '22%',
    alignItems: 'center',
  },

  iconeFormato: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D0D0D0',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  formatoSelecionado: {
    borderColor: '#237E7E',
    borderWidth: 2,
  },

  iconeImagemFormato: {
    width: 32,
    height: 32,
  },

  nomeFormato: {
    color: '#222222',
    fontSize: 11,
    fontFamily: 'Poppins_400Regular',
    marginTop: 7,
  },

  nomeFormatoSelecionado: {
    fontFamily: 'Poppins_600SemiBold',
  },

  // BOTÃO EXPORTAR
  botaoExportar: {
    width: '100%',
    minHeight: 48,
    backgroundColor: '#237E7E',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
    alignSelf: 'stretch',
  },

  textoBotaoExportar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default styles;
