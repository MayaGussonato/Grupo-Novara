import { Platform, StyleSheet } from 'react-native';

export const colors = {
  primary: '#1B7A72',
  primaryLight: '#3E9C94',
  text: '#2F6F6A',
  dark: '#12312E',
  button: '#4A0000',
  buttonHover: '#650808',
  white: '#FFFFFF',
  error: '#C0392B',
  divider: '#6FA8A3',
  placeholder: '#2F8A82',
};

export const fonts = {
  light: 'Poppins_300Light',
  regular: 'Poppins_400Regular',
  medium: 'Poppins_500Medium',
  semiBold: 'Poppins_600SemiBold',
};

const web = (style) => Platform.select({ web: style, default: {} });

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.white,
  },

  leftPanel: {
    flex: 1,
    flexBasis: 0,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#032B28',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  brand: {
    position: 'absolute',
    top: '25%',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 400,
    maxWidth: '100%',
    height: 103,
  },
  tagline: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: 20,
    lineHeight: 29,
    textAlign: 'center',
    marginTop: 8,
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
    maxWidth: 374,
  },
  title: {
    color: colors.primary,
    fontFamily: fonts.regular,
    fontSize: 23,
    lineHeight: 32,
  },
  subtitle: {
    color: colors.dark,
    fontFamily: fonts.semiBold,
    fontSize: 11,
    lineHeight: 18,
    marginTop: 2,
    marginBottom: 39,
  },

  inputWrapper: {
    justifyContent: 'center',
  },
  input: {
    height: 42,
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
  inputWithIcon: {
    paddingRight: 44,
  },
  inputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
    paddingHorizontal: 11,
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
    bottom: 0,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    ...web({ cursor: 'pointer' }),
  },
  errorText: {
    color: colors.error,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 14,
    marginTop: 2,
    minHeight: 14,
  },
  errorTextEmail: {
    marginBottom: 17,
  },
  errorTextPassword: {
    marginTop: 0,
    marginBottom: 0,
  },

  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    ...web({ cursor: 'pointer' }),
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 3,
    marginRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    color: colors.primary,
    fontFamily: fonts.light,
    fontSize: 15,
  },
  forgotText: {
    color: colors.primary,
    fontFamily: fonts.semiBold,
    fontSize: 12,
    ...web({ cursor: 'pointer' }),
  },

  actions: {
    marginHorizontal: 18,
  },
  primaryButton: {
    height: 42,
    backgroundColor: colors.button,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    ...web({ cursor: 'pointer' }),
  },
  primaryButtonHover: {
    backgroundColor: colors.buttonHover,
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: 20,
  },

  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 20,
    marginTop: 12,
    marginBottom: 8,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.divider,
  },
  dividerText: {
    marginHorizontal: 4,
    color: colors.primary,
    fontFamily: fonts.light,
    fontSize: 14,
  },

  googleButton: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primaryLight,
    borderRadius: 3,
    backgroundColor: colors.white,
    ...web({ cursor: 'pointer' }),
  },
  googleButtonHover: {
    backgroundColor: '#F1FAF9',
  },
  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 6,
  },
  googleText: {
    color: colors.primary,
    fontFamily: fonts.light,
    fontSize: 15,
  },
});