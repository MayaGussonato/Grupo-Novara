import { Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '../login/LoginStyle';
import { docColors } from '../centralDeDocumentos/centralDeDocumentosStyle';

// Aplica o estilo apenas na web; no mobile vira objeto vazio.
const web = (style) => Platform.select({ web: style, default: {} });

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

  // Cabeçalho da página
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleIcon: {
    marginRight: 8,
  },
  title: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 26,
    lineHeight: 36,
  },
  subtitle: {
    color: docColors.sidebar,
    fontFamily: fonts.light,
    fontSize: 15,
    lineHeight: 22,
    marginLeft: 6,
  },

  // Barra de ferramentas
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 32,
  },
  searchBox: {
    flex: 1,
    maxWidth: 315,
    height: 35,
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
  filterButton: {
    width: 42,
    height: 35,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  filterBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: docColors.sidebar,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  filterBadgeText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 9,
  },
  addButton: {
    width: 43,
    height: 35,
    marginLeft: 'auto',
    borderRadius: 3,
    backgroundColor: colors.button,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  addButtonHover: {
    backgroundColor: colors.buttonHover,
  },

  // Tabela (mesma aparência da central de documentos)
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
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
  cellText: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 11,
  },

  // Larguras das colunas (compartilhadas entre cabeçalho e linhas)
  cellProtocolo: {
    flex: 1.2,
  },
  cellTipo: {
    flex: 1,
  },
  cellPrioridade: {
    flex: 1.1,
  },
  cellCliente: {
    flex: 1.3,
  },
  cellData: {
    flex: 1,
  },
  cellAcoes: {
    flex: 0.9,
  },

  // Badges de prioridade (mesmas cores dos status de documentos)
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
  badgeAlta: { backgroundColor: docColors.erroBg },
  badgeAltaText: { color: docColors.erroText },
  badgeMedia: { backgroundColor: docColors.revisaoBg },
  badgeMediaText: { color: docColors.revisaoText },
  badgeBaixa: { backgroundColor: docColors.conclusaoBg },
  badgeBaixaText: { color: docColors.conclusaoText },

  emptyText: {
    textAlign: 'center',
    paddingVertical: 24,
    color: docColors.sidebar,
    fontFamily: fonts.light,
    fontSize: 13,
  },

  // Rodapé e paginação
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 26,
    paddingVertical: 20,
  },
  footerText: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageButton: {
    minWidth: 19,
    height: 19,
    marginLeft: 2,
    paddingHorizontal: 2,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 2,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  pageButtonActive: {
    backgroundColor: docColors.sidebar,
    borderColor: docColors.sidebar,
  },
  pageButtonDisabled: {
    opacity: 0.4,
  },
  pageEllipsis: {
    minWidth: 19,
    height: 19,
    marginLeft: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageText: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 11,
  },
  pageTextActive: {
    color: colors.white,
  },

  // Modal de filtros
  filterOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterPanel: {
    width: 360,
    maxWidth: '92%',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    padding: 20,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  filterTitle: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 18,
  },
  filterLabel: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 13,
    marginTop: 14,
    marginBottom: 8,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: docColors.sidebar,
    borderRadius: 14,
    backgroundColor: colors.white,
    ...web({ cursor: 'pointer' }),
  },
  chipSelected: {
    backgroundColor: docColors.sidebar,
  },
  chipText: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  chipTextSelected: {
    color: colors.white,
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  filterClear: {
    paddingHorizontal: 16,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: docColors.sidebar,
    borderRadius: 4,
    marginRight: 8,
    ...web({ cursor: 'pointer' }),
  },
  filterClearText: {
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  filterApply: {
    paddingHorizontal: 20,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    backgroundColor: colors.button,
    ...web({ cursor: 'pointer' }),
  },
  filterApplyText: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 13,
  },

  // Menu flutuante de ações
  menuOverlay: {
    flex: 1,
  },
  actionMenu: {
    position: 'absolute',
    width: 200,
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
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 36,
    ...web({ cursor: 'pointer' }),
  },
  actionText: {
    marginLeft: 8,
    color: docColors.sidebar,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
});