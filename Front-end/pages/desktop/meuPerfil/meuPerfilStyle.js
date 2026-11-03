import { Platform, StyleSheet } from 'react-native';

export const createStyles = (c) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: c.bg,
    },
    content: {
      flex: 1,
    },
    scrollContent: {
      padding: 32,
      paddingBottom: 48,
    },

    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 24,
      gap: 16,
      flexWrap: 'wrap',
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    title: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 30,
      color: c.text,
    },
    subtitle: {
      fontFamily: 'Poppins_300Light',
      fontSize: 15,
      color: c.text,
    },
    logoutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 18,
      borderRadius: 8,
      backgroundColor: c.dangerBg,
    },
    logoutButtonText: {
      fontFamily: 'Poppins_500Medium',
      fontSize: 14,
      color: c.danger,
    },

    columns: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 24,
    },
    column: {
      flex: 1,
      minWidth: 340,
      gap: 24,
    },

    card: {
      backgroundColor: c.card,
      borderRadius: 12,
      padding: 24,
    },
    cardTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 16,
    },
    cardTitle: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 18,
      color: c.text,
    },
    divider: {
      height: 1,
      backgroundColor: c.divider,
      marginVertical: 16,
    },

    profileRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    avatar: {
      width: 76,
      height: 76,
      borderRadius: 38,
      backgroundColor: c.avatarBg,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarText: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 28,
      color: c.onPrimary,
    },
    profileName: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: 20,
      color: c.text,
    },
    profileRole: {
      fontFamily: 'Poppins_500Medium',
      fontSize: 15,
      color: c.accent,
    },

    field: {
      marginBottom: 14,
    },
    label: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 13,
      color: c.textMuted,
      marginBottom: 4,
    },
    input: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 14,
      color: c.text,
      backgroundColor: c.inputBg,
      borderWidth: 1,
      borderColor: c.inputBorder,
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      ...(Platform.OS === 'web' ? { outlineStyle: 'none' } : {}),
    },
    inputDisabled: {
      backgroundColor: c.inputDisabledBg,
      color: c.textMuted,
    },

    primaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      backgroundColor: c.primary,
      borderRadius: 8,
      paddingVertical: 12,
      marginTop: 8,
    },
    primaryButtonText: {
      fontFamily: 'Poppins_500Medium',
      fontSize: 14,
      color: c.onPrimary,
    },
    secondaryButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: c.inputBorder,
      paddingVertical: 12,
      marginTop: 8,
    },
    secondaryButtonText: {
      fontFamily: 'Poppins_500Medium',
      fontSize: 14,
      color: c.text,
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 12,
    },
    flex1: {
      flex: 1,
    },

    optionRow: {
      flexDirection: 'row',
      gap: 8,
      flexWrap: 'wrap',
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: c.inputBorder,
      backgroundColor: c.inputBg,
    },
    optionActive: {
      backgroundColor: c.primary,
      borderColor: c.primary,
    },
    optionText: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 13,
      color: c.text,
    },
    optionTextActive: {
      color: c.onPrimary,
    },

    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14,
    },
    switchTitle: {
      fontFamily: 'Poppins_500Medium',
      fontSize: 14,
      color: c.text,
    },
    switchDescription: {
      fontFamily: 'Poppins_300Light',
      fontSize: 12,
      color: c.textMuted,
    },

    message: {
      fontFamily: 'Poppins_400Regular',
      fontSize: 13,
      marginTop: 10,
    },
    messageError: {
      color: c.danger,
    },
    messageSuccess: {
      color: c.accent,
    },
  });