import { Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '../login/LoginStyle';
import { docColors } from '../centralDeDocumentos/centralDeDocumentosStyle';

const web = (style) => Platform.select({ web: style, default: {} });

export { docColors };

export const titleColor = '#174847';

const fontMedium = 'Poppins_500Medium';
const fontSemi = 'Poppins_600SemiBold';

const panel = {
  backgroundColor: colors.white,
  borderWidth: 1,
  borderColor: docColors.rowLine,
  borderRadius: 8,
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
    gap: 24,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  searchBox: {
    flex: 1,
    maxWidth: 480,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    backgroundColor: colors.white,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 6,
    fontFamily: fonts.regular,
    fontSize: 12,
    color: docColors.sidebar,
    ...web({ outlineStyle: 'none' }),
  },
  topActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconButton: {
    padding: 4,
    ...web({ cursor: 'pointer' }),
  },
  notificationDot: {
    position: 'absolute',
    top: 3,
    right: 4,
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: docColors.erroText,
    borderWidth: 1.5,
    borderColor: docColors.pageBackground,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
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
  },

  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    backgroundColor: colors.white,
    ...web({ cursor: 'pointer' }),
  },
  tabHover: {
    backgroundColor: docColors.hover,
  },
  tabActive: {
    backgroundColor: colors.primary,
  },
  tabIcon: {
    marginRight: 8,
  },
  tabText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: docColors.sidebar,
  },
  tabTextActive: {
    color: colors.white,
  },

  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    backgroundColor: colors.white,
    ...web({ cursor: 'pointer' }),
  },
  dropdownButtonSmall: {
    height: 28,
    paddingHorizontal: 8,
  },
  dropdownIcon: {
    marginRight: 8,
  },
  dropdownText: {
    marginRight: 10,
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  menuOverlay: {
    flex: 1,
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    paddingVertical: 4,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 34,
    ...web({ cursor: 'pointer' }),
  },
  dropdownItemActive: {
    backgroundColor: docColors.hover,
  },
  dropdownItemText: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 12,
  },

  kpiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  kpiCard: {
    ...panel,
    flexGrow: 1,
    flexBasis: 220,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  kpiIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kpiLabel: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: docColors.sidebar,
  },
  kpiValue: {
    fontFamily: fontSemi,
    fontSize: 26,
    color: docColors.sidebar,
    marginVertical: 2,
  },
  kpiHint: {
    fontFamily: fonts.regular,
    fontSize: 11,
  },

  chartsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  chartCard: {
    ...panel,
    flexGrow: 1,
    flexBasis: 420,
    minHeight: 300,
  },
  chartCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  cardTitle: {
    fontFamily: fontMedium,
    fontSize: 15,
    color: docColors.sidebar,
  },

  barsArea: {
    flexDirection: 'row',
    height: 200,
  },
  yAxis: {
    width: 34,
  },
  yLabel: {
    position: 'absolute',
    right: 8,
    lineHeight: 12,
    fontFamily: fonts.regular,
    fontSize: 11,
    color: docColors.sidebar,
    transform: [{ translateY: -6 }],
  },
  barsPlot: {
    flex: 1,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: docColors.rowLine,
  },
  barsRow: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 4,
  },
  barColumn: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '62%',
    maxWidth: 44,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  barValue: {
    marginBottom: 3,
    fontFamily: fonts.regular,
    fontSize: 10,
    color: docColors.sidebar,
  },
  xAxis: {
    flexDirection: 'row',
    marginLeft: 34,
    marginTop: 8,
    paddingHorizontal: 4,
  },
  xLabel: {
    flex: 1,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 11,
    color: docColors.sidebar,
  },

  donutBody: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    gap: 20,
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  donutCenterValue: {
    fontFamily: fontSemi,
    fontSize: 22,
    color: docColors.sidebar,
  },
  donutCenterLabel: {
    fontFamily: fonts.regular,
    fontSize: 11,
    color: docColors.sidebar,
  },
  legend: {
    gap: 14,
    minWidth: 170,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendLabel: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: docColors.sidebar,
  },
  legendValue: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: docColors.sidebar,
  },

  rankList: {
    gap: 18,
    paddingTop: 4,
  },
  rankTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  rankLabel: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: docColors.sidebar,
  },
  rankValue: {
    marginLeft: 8,
    fontFamily: fontMedium,
    fontSize: 13,
    color: docColors.sidebar,
  },
  rankTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: docColors.rowLine,
    overflow: 'hidden',
  },
  rankFill: {
    height: 8,
    borderRadius: 4,
  },

  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  seeAll: {
    color: colors.primary,
    fontFamily: fonts.regular,
    fontSize: 12,
    ...web({ cursor: 'pointer' }),
  },
  tableHeader: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: docColors.tableHeader,
    alignItems: 'center',
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 14,
    textAlign: 'center',
  },
  headerTextSmall: {
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    height: 29,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: docColors.rowLine,
  },
  rowHover: {
    backgroundColor: docColors.hover,
  },
  cell: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: docColors.rowLine,
  },
  cellLast: {
    borderRightWidth: 0,
  },
  cellDoc: { flex: 1.35 },
  cellTipo: { flex: 1.1 },
  cellStatus: { flex: 1.1 },
  cellData: { flex: 1.3 },
  cellUser: { flex: 1.1 },
  cellDocInner: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    maxWidth: '100%',
    paddingLeft: 30,
    paddingRight: 6,
  },
  cellDocText: {
    flexShrink: 1,
  },
  fileIcon: {
    marginRight: 4,
  },
  cellText: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 11,
  },
  badge: {
    minWidth: 54,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontFamily: fonts.regular,
    fontSize: 9,
    lineHeight: 12,
  },
  badgeRevisao: { backgroundColor: docColors.revisaoBg },
  badgeRevisaoText: { color: docColors.revisaoText },
  badgeConclusao: { backgroundColor: docColors.conclusaoBg },
  badgeConclusaoText: { color: docColors.conclusaoText },
  badgeErro: { backgroundColor: docColors.erroBg },
  badgeErroText: { color: docColors.erroText },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 24,
    color: docColors.sidebar,
    fontFamily: fonts.light,
    fontSize: 13,
  },
});