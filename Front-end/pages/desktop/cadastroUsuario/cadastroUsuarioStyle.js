import { Platform, StyleSheet } from 'react-native';
import { colors, fonts } from '../login/LoginStyle';

const web = (style) => Platform.select({ web: style, default: {} });

export const cadastroColors = {
  leftBackground: '#E8F4F3',
  stepActive: '#7A1414',
  stepInactive: '#9DBDB8',
  stepInactiveText: '#A9C4C0',
  stepLine: '#B5CFCB',
  optionHover: '#F1FAF9',
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },

  leftPanel: {
    flex: 1,
    flexBasis: 0,
    backgroundColor: cadastroColors.leftBackground,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 32,
  },
  leftContent: {
    width: '100%',
    maxWidth: 420,
  },
  logo: {
    width: 420,
    maxWidth: '100%',
    height: 108,
    alignSelf: 'center',
    marginBottom: 44,
  },
  leftTitle: {
    color: colors.dark,
    fontFamily: fonts.regular,
    fontSize: 23,
    lineHeight: 32,
  },
  leftSubtitle: {
    color: colors.dark,
    fontFamily: fonts.regular,
    fontSize: 17,
    lineHeight: 25,
    marginTop: 6,
    maxWidth: 340,
    marginBottom: 34,
  },

  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: cadastroColors.stepInactive,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: cadastroColors.stepActive,
  },
  stepNumber: {
    color: colors.white,
    fontFamily: fonts.regular,
    fontSize: 20,
  },
  stepLabel: {
    marginLeft: 10,
    color: cadastroColors.stepInactiveText,
    fontFamily: fonts.regular,
    fontSize: 20,
  },
  stepLabelActive: {
    color: cadastroColors.stepActive,
  },
  stepLine: {
    width: 2,
    height: 32,
    marginLeft: 19,
    backgroundColor: cadastroColors.stepLine,
  },

  rightPanel: {
    flex: 1,
    flexBasis: 0,
    backgroundColor: colors.white,
  },
  rightContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 32,
  },
  form: {
    width: '100%',
    maxWidth: 396,
  },
  title: {
    color: colors.primary,
    fontFamily: fonts.regular,
    fontSize: 26,
    lineHeight: 34,
  },
  subtitle: {
    color: colors.dark,
    fontFamily: fonts.semiBold,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
    marginBottom: 36,
  },

  fieldWrapper: {
    marginBottom: 36,
    position: 'relative',
    zIndex: 1,
  },
  fieldWrapperOpen: {
    zIndex: 20,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 3,
    paddingHorizontal: 12,
    fontFamily: fonts.light,
    fontSize: 15,
    color: colors.primary,
    backgroundColor: colors.white,
    ...web({ outlineStyle: 'none' }),
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
    paddingHorizontal: 11,
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  inputFocusedWithIcon: {
    paddingRight: 43,
  },
  inputError: {
    borderColor: colors.error,
  },
  eyeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  errorText: {
    position: 'absolute',
    top: 46,
    left: 0,
    color: colors.error,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 14,
  },

  select: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 3,
    paddingLeft: 12,
    paddingRight: 44,
    justifyContent: 'center',
    backgroundColor: colors.white,
    ...web({ cursor: 'pointer' }),
  },
  selectOpen: {
    borderColor: colors.primary,
    borderWidth: 2,
    paddingLeft: 11,
  },
  selectText: {
    fontFamily: fonts.light,
    fontSize: 15,
    color: colors.primary,
  },
  selectPlaceholder: {
    color: colors.placeholder,
  },
  selectIcon: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  selectIconBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  selectIconArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: colors.dark,
  },
  dropdown: {
    position: 'absolute',
    top: 46,
    left: 0,
    right: 0,
    maxHeight: 168,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 3,
    zIndex: 30,
    elevation: 6,
    overflow: 'hidden',
  },
  dropdownScroll: {
    maxHeight: 166,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 11,
    ...web({ cursor: 'pointer' }),
  },
  optionHover: {
    backgroundColor: cadastroColors.optionHover,
  },
  optionText: {
    fontFamily: fonts.light,
    fontSize: 15,
    color: colors.primary,
  },

  actions: {
    marginHorizontal: 20,
    marginTop: 4,
  },
  primaryButton: {
    height: 44,
    backgroundColor: colors.button,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  primaryButtonHover: {
    backgroundColor: colors.buttonHover,
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: 22,
  },
  secondaryButton: {
    height: 44,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  secondaryButtonHover: {
    backgroundColor: cadastroColors.optionHover,
  },
  secondaryButtonText: {
    color: colors.primary,
    fontFamily: fonts.light,
    fontSize: 22,
  },
});