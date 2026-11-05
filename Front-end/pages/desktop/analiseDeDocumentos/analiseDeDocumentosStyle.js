import { Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '../login/LoginStyle';
import { docColors } from '../centralDeDocumentos/centralDeDocumentosStyle';

const web = (style) => Platform.select({ web: style, default: {} });

export { docColors };

export const titleColor = '#174847';

// Tom vinho usado nos ícones, botões e na área de progresso da análise
export const accent = '#460303';
export const progressColor = '#460303';
export const processingColor = '#FF9500';

const fontMedium = 'Poppins_500Medium';

const panel = {
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: docColors.rowLine,
  borderRadius: 6,
  padding: 18,
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: docColors.pageBackground,
  },
  main: {
    flex: 1,
    backgroundColor: docColors.pageBackground,
    ...web({ scrollbarWidth: 'none' }),
  },
  mainContent: {
    paddingHorizontal: 26,
    paddingTop: 18,
    paddingBottom: 32,
  },

  /* Topo */
  backButton: {
    alignSelf: 'flex-start',
    width: 32,
    height: 24,
    borderRadius: 3,
    backgroundColor: docColors.sidebar,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    ...web({ cursor: 'pointer' }),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 8,
  },
  title: {
    color: titleColor,
    fontFamily: fonts.regular,
    fontSize: 26,
    lineHeight: 36,
  },
  subtitle: {
    color: titleColor,
    fontFamily: fonts.light,
    fontSize: 15,
    lineHeight: 22,
    marginLeft: 6,
  },

  /* Aviso (download, erros de validação) */
  notice: {
    marginTop: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
  },
  noticeSuccess: {
    backgroundColor: docColors.conclusaoBg,
    borderColor: docColors.conclusaoText,
  },
  noticeError: {
    backgroundColor: docColors.erroBg,
    borderColor: docColors.erroText,
  },
  noticeText: {
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  noticeSuccessText: { color: docColors.conclusaoText },
  noticeErrorText: { color: docColors.erroText },

  /* Colunas */
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: 20,
    marginTop: 18,
  },
  leftCol: {
    flexGrow: 1.15,
    flexBasis: 420,
  },
  rightCol: {
    flexGrow: 1,
    flexBasis: 380,
    gap: 14,
  },

  /* Arquivo + pré-visualização */
  fileCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 54,
    paddingHorizontal: 18,
    backgroundColor: docColors.sidebar,
  },
  fileHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  fileName: {
    marginLeft: 10,
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 16,
    flexShrink: 1,
  },
  statusBadge: {
    paddingHorizontal: 22,
    paddingVertical: 5,
    borderRadius: 4,
    marginLeft: 12,
  },
  statusBadgeText: {
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  previewFrame: {
    height: 420,
    margin: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: docColors.sidebar,
    borderRadius: 4,
    backgroundColor: '#F1F4F3',
    overflow: 'hidden',
  },
  viewerWeb: {
    flex: 1,
    ...web({ overflow: 'auto' }),
  },
  viewerScroll: {
    flex: 1,
  },
  viewerScrollX: {
    flexGrow: 0,
  },
  pageShadow: {
    backgroundColor: colors.white,
    ...web({ boxShadow: '0 2px 10px rgba(0,0,0,0.18)' }),
    elevation: 3,
  },
  zoomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    borderRadius: 4,
    backgroundColor: docColors.sidebar,
  },
  zoomControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoomText: {
    minWidth: 64,
    textAlign: 'center',
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  zoomButton: {
    paddingHorizontal: 6,
    ...web({ cursor: 'pointer' }),
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 14,
    paddingVertical: 16,
  },
  squareButton: {
    width: 62,
    height: 36,
    borderRadius: 4,
    backgroundColor: docColors.sidebar,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },

  /* Cards da direita */
  panel,
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 22,
  },
  progressCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    color: progressColor,
    fontFamily: fonts.regular,
    fontSize: 20,
  },
  progressInfo: {
    flex: 1,
  },
  progressTitle: {
    color: progressColor,
    fontFamily: fontMedium,
    fontSize: 20,
    marginBottom: 10,
  },
  barTrack: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E3E8E7',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: progressColor,
  },
  progressHint: {
    marginTop: 6,
    color: progressColor,
    fontFamily: fonts.regular,
    fontSize: 11,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    color: docColors.sidebar,
    fontFamily: fontMedium,
    fontSize: 18,
  },

  table: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    minHeight: 38,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: docColors.rowLine,
  },
  tableRowLast: {
    borderBottomWidth: 0,
  },
  tableLabel: {
    flex: 1,
    paddingHorizontal: 16,
    color: docColors.sidebar,
    fontFamily: fonts.light,
    fontSize: 13,
  },
  tableValue: {
    flex: 1,
    minHeight: 38,
    justifyContent: 'center',
    paddingHorizontal: 16,
    borderLeftWidth: 1,
    borderLeftColor: docColors.rowLine,
  },
  tableValueText: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  tableInput: {
    height: 28,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 3,
    backgroundColor: docColors.hover,
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 13,
    ...web({ outlineStyle: 'none' }),
  },

  checkList: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: docColors.rowLine,
  },
  checkIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkTexts: {
    flex: 1,
  },
  checkLabel: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  checkDescription: {
    color: docColors.sidebar,
    fontFamily: fonts.light,
    fontSize: 10,
  },
  checkValue: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginLeft: 8,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 14,
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 34,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: accent,
    borderRadius: 4,
    backgroundColor: colors.white,
    ...web({ cursor: 'pointer' }),
  },
  outlineButtonHover: {
    backgroundColor: docColors.hover,
  },
  outlineButtonText: {
    marginLeft: 8,
    color: accent,
    fontFamily: fonts.regular,
    fontSize: 13,
  },

  /* Pré-visualização em tela cheia */
  fullOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  fullPanel: {
    width: '92%',
    maxWidth: 900,
    height: '90%',
    backgroundColor: colors.white,
    borderRadius: 6,
    overflow: 'hidden',
  },
  fullHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: docColors.sidebar,
  },
  fullBody: {
    flex: 1,
    padding: 12,
  },
  fullFrame: {
    flex: 1,
    borderWidth: 1,
    borderColor: docColors.sidebar,
    borderRadius: 4,
    backgroundColor: '#F1F4F3',
    overflow: 'hidden',
  },
});