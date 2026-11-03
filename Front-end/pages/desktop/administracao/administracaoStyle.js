import { Platform, StyleSheet } from 'react-native';
import { fonts } from '../login/LoginStyle';

const web = (style) => Platform.select({ web: style, default: {} });

export const adminColors = {
  background: '#E8F4F3',
  dark: '#174847',
  border: '#2F8A82',
  rowBorder: '#E3EFED',
  rowHover: '#F1FAF9',
  white: '#FFFFFF',
  add: '#5A0F0F',
  addHover: '#7A1414',
  danger: '#7A1414',
  cancel: '#1B7A72',
  dotActive: '#7ED68A',
  dotInactive: '#F28B8B',
  chipBackground: '#FFFFFF',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: adminColors.background,
  },
  main: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 40,
    paddingVertical: 32,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
  },

  header: {
    marginBottom: 28,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    color: adminColors.dark,
    fontFamily: fonts.regular,
    fontSize: 26,
    lineHeight: 34,
  },
  subtitle: {
    color: adminColors.dark,
    fontFamily: fonts.light,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 2,
  },

  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  searchBox: {
    flex: 1,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: adminColors.border,
    borderRadius: 3,
    backgroundColor: adminColors.white,
  },
  searchBoxFocused: {
    borderColor: adminColors.dark,
    borderWidth: 2,
    paddingHorizontal: 11,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    height: 40,
    fontFamily: fonts.light,
    fontSize: 15,
    color: adminColors.dark,
    ...web({ outlineStyle: 'none' }),
  },
  chips: {
    flexDirection: 'row',
    marginLeft: 16,
  },
  chip: {
    height: 36,
    paddingHorizontal: 16,
    marginLeft: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: adminColors.border,
    backgroundColor: adminColors.chipBackground,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  chipActive: {
    backgroundColor: adminColors.dark,
    borderColor: adminColors.dark,
  },
  chipText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: adminColors.dark,
  },
  chipTextActive: {
    color: adminColors.white,
  },
  addButton: {
    width: 44,
    height: 44,
    marginLeft: 16,
    borderRadius: 3,
    backgroundColor: adminColors.add,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  addButtonHover: {
    backgroundColor: adminColors.addHover,
  },

  table: {
    backgroundColor: adminColors.white,
    borderWidth: 1,
    borderColor: adminColors.border,
    borderRadius: 6,
  },
  tableHeader: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: adminColors.dark,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingHorizontal: 20,
  },
  headerText: {
    color: adminColors.white,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  row: {
    minHeight: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: adminColors.rowBorder,
    backgroundColor: adminColors.white,
    position: 'relative',
    zIndex: 1,
  },
  rowHover: {
    backgroundColor: adminColors.rowHover,
  },
  rowOpen: {
    zIndex: 20,
  },
  colNome: {
    flex: 2.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  colEmail: {
    flex: 2.6,
    paddingRight: 8,
  },
  colPerfil: {
    flex: 1.6,
    paddingRight: 8,
  },
  colCargo: {
    flex: 2,
    paddingRight: 8,
  },
  colAcoes: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cellText: {
    color: adminColors.dark,
    fontFamily: fonts.light,
    fontSize: 14,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  dotActive: {
    backgroundColor: adminColors.dotActive,
  },
  dotInactive: {
    backgroundColor: adminColors.dotInactive,
  },
  moreButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  moreButtonActive: {
    backgroundColor: adminColors.rowHover,
  },
  menu: {
    position: 'absolute',
    right: 8,
    width: 150,
    backgroundColor: adminColors.white,
    borderWidth: 1,
    borderColor: adminColors.border,
    borderRadius: 4,
    paddingVertical: 4,
    zIndex: 30,
    elevation: 6,
    ...web({ boxShadow: '0 4px 12px rgba(23, 72, 71, 0.18)' }),
  },
  menuDown: {
    top: 38,
  },
  menuUp: {
    bottom: 38,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    ...web({ cursor: 'pointer' }),
  },
  menuItemHover: {
    backgroundColor: adminColors.rowHover,
  },
  menuItemText: {
    marginLeft: 10,
    color: adminColors.dark,
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  menuItemDangerText: {
    color: adminColors.danger,
  },

  empty: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: adminColors.dark,
    fontFamily: fonts.light,
    fontSize: 15,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  footerText: {
    color: adminColors.dark,
    fontFamily: fonts.light,
    fontSize: 13,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pageButton: {
    minWidth: 28,
    height: 28,
    marginLeft: 4,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: adminColors.dark,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: adminColors.white,
    ...web({ cursor: 'pointer' }),
  },
  pageButtonActive: {
    backgroundColor: adminColors.dark,
  },
  pageButtonDisabled: {
    opacity: 0.4,
    ...web({ cursor: 'default' }),
  },
  pageText: {
    color: adminColors.dark,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  pageTextActive: {
    color: adminColors.white,
  },
});