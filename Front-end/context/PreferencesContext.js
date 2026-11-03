import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

// ---------- TEMAS ----------
export const themes = {
  claro: {
    bg: '#E8F4F3',
    card: '#FFFFFF',
    text: '#174847',
    textMuted: '#5E7F7D',
    primary: '#174847',
    accent: '#1B7A72',
    onPrimary: '#FFFFFF',
    inputBg: '#FFFFFF',
    inputBorder: '#B7D3D1',
    inputDisabledBg: '#F3F8F8',
    divider: '#CFE3E1',
    avatarBg: '#8FD3CC',
    danger: '#D64545',
    dangerBg: '#FDECEC',
    switchOff: '#C5D9D7',
    menuBg: '#174847',
    statusBar: 'dark',
  },
  escuro: {
    bg: '#0E1B1A',
    card: '#162928',
    text: '#E6F2F1',
    textMuted: '#8FB0AE',
    primary: '#1B7A72',
    accent: '#2FB5A9',
    onPrimary: '#FFFFFF',
    inputBg: '#0E1B1A',
    inputBorder: '#2C4A48',
    inputDisabledBg: '#122322',
    divider: '#264240',
    avatarBg: '#1B7A72',
    danger: '#FF7B7B',
    dangerBg: '#3A1F1F',
    switchOff: '#3A5553',
    menuBg: '#0A1413',
    statusBar: 'light',
  },
};

// ---------- IDIOMAS ----------
export const languages = [
  { value: 'pt', label: 'Português (BR)' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
];

// ---------- TRADUÇÕES ----------
// Ao migrar outras telas, adicione as chaves delas aqui.
const translations = {
  pt: {
    'menu.dashboard': 'Dashboard',
    'menu.documentos': 'Documentos',
    'menu.atendimentos': 'Atendimentos',
    'menu.integracoes': 'Integrações',
    'menu.relatorios': 'Relatórios',
    'menu.administracao': 'Administração',
    'menu.perfil': 'Meu perfil',

    'emBreve.subtitulo': 'Esta tela ainda está em construção',

    'perfil.titulo': 'Meu Perfil',
    'perfil.subtitulo': 'Gerencie suas informações e preferências',
    'perfil.sair': 'Sair da conta',
    'perfil.infoPessoais': 'Informações pessoais',
    'perfil.nome': 'Nome completo',
    'perfil.email': 'E-mail',
    'perfil.cargo': 'Cargo',
    'perfil.instituicao': 'Instituição',
    'perfil.telefone': 'Telefone',
    'perfil.editar': 'Editar informações',
    'perfil.salvar': 'Salvar alterações',
    'perfil.cancelar': 'Cancelar',
    'perfil.preferencias': 'Preferências',
    'perfil.tema': 'Tema',
    'perfil.temaClaro': 'Claro',
    'perfil.temaEscuro': 'Escuro',
    'perfil.idioma': 'Idioma',
    'perfil.notifEmail': 'Notificações por e-mail',
    'perfil.notifEmailDesc': 'Receber atualizações',
    'perfil.notifSistema': 'Notificações no sistema',
    'perfil.notifSistemaDesc': 'Avisos e alertas',
    'perfil.alterarSenha': 'Alterar senha',
    'perfil.senhaAtual': 'Senha atual',
    'perfil.senhaAtualPh': 'Digite sua senha atual',
    'perfil.novaSenha': 'Nova senha',
    'perfil.novaSenhaPh': 'Mínimo de 8 caracteres',
    'perfil.confirmarSenha': 'Confirmar nova senha',
    'perfil.confirmarSenhaPh': 'Repita a nova senha',
    'perfil.erroNome': 'O nome não pode ficar vazio.',
    'perfil.erroEmail': 'Informe um e-mail válido.',
    'perfil.okPerfil': 'Alterações salvas com sucesso.',
    'perfil.erroCampos': 'Preencha todos os campos.',
    'perfil.erroTamanho': 'A nova senha deve ter pelo menos 8 caracteres.',
    'perfil.erroConfirmacao': 'A confirmação não é igual à nova senha.',
    'perfil.erroIgual': 'A nova senha deve ser diferente da atual.',
    'perfil.okSenha': 'Senha alterada com sucesso.',
  },
  en: {
    'menu.dashboard': 'Dashboard',
    'menu.documentos': 'Documents',
    'menu.atendimentos': 'Service desk',
    'menu.integracoes': 'Integrations',
    'menu.relatorios': 'Reports',
    'menu.administracao': 'Administration',
    'menu.perfil': 'My profile',

    'emBreve.subtitulo': 'This screen is still under construction',

    'perfil.titulo': 'My Profile',
    'perfil.subtitulo': 'Manage your information and preferences',
    'perfil.sair': 'Sign out',
    'perfil.infoPessoais': 'Personal information',
    'perfil.nome': 'Full name',
    'perfil.email': 'E-mail',
    'perfil.cargo': 'Role',
    'perfil.instituicao': 'Institution',
    'perfil.telefone': 'Phone',
    'perfil.editar': 'Edit information',
    'perfil.salvar': 'Save changes',
    'perfil.cancelar': 'Cancel',
    'perfil.preferencias': 'Preferences',
    'perfil.tema': 'Theme',
    'perfil.temaClaro': 'Light',
    'perfil.temaEscuro': 'Dark',
    'perfil.idioma': 'Language',
    'perfil.notifEmail': 'E-mail notifications',
    'perfil.notifEmailDesc': 'Receive updates',
    'perfil.notifSistema': 'System notifications',
    'perfil.notifSistemaDesc': 'Notices and alerts',
    'perfil.alterarSenha': 'Change password',
    'perfil.senhaAtual': 'Current password',
    'perfil.senhaAtualPh': 'Enter your current password',
    'perfil.novaSenha': 'New password',
    'perfil.novaSenhaPh': 'At least 8 characters',
    'perfil.confirmarSenha': 'Confirm new password',
    'perfil.confirmarSenhaPh': 'Repeat the new password',
    'perfil.erroNome': 'The name cannot be empty.',
    'perfil.erroEmail': 'Enter a valid e-mail.',
    'perfil.okPerfil': 'Changes saved successfully.',
    'perfil.erroCampos': 'Fill in all fields.',
    'perfil.erroTamanho': 'The new password must be at least 8 characters long.',
    'perfil.erroConfirmacao': 'The confirmation does not match the new password.',
    'perfil.erroIgual': 'The new password must be different from the current one.',
    'perfil.okSenha': 'Password changed successfully.',
  },
  es: {
    'menu.dashboard': 'Dashboard',
    'menu.documentos': 'Documentos',
    'menu.atendimentos': 'Atenciones',
    'menu.integracoes': 'Integraciones',
    'menu.relatorios': 'Informes',
    'menu.administracao': 'Administración',
    'menu.perfil': 'Mi perfil',

    'emBreve.subtitulo': 'Esta pantalla aún está en construcción',

    'perfil.titulo': 'Mi Perfil',
    'perfil.subtitulo': 'Administra tu información y preferencias',
    'perfil.sair': 'Cerrar sesión',
    'perfil.infoPessoais': 'Información personal',
    'perfil.nome': 'Nombre completo',
    'perfil.email': 'Correo electrónico',
    'perfil.cargo': 'Cargo',
    'perfil.instituicao': 'Institución',
    'perfil.telefone': 'Teléfono',
    'perfil.editar': 'Editar información',
    'perfil.salvar': 'Guardar cambios',
    'perfil.cancelar': 'Cancelar',
    'perfil.preferencias': 'Preferencias',
    'perfil.tema': 'Tema',
    'perfil.temaClaro': 'Claro',
    'perfil.temaEscuro': 'Oscuro',
    'perfil.idioma': 'Idioma',
    'perfil.notifEmail': 'Notificaciones por correo',
    'perfil.notifEmailDesc': 'Recibir actualizaciones',
    'perfil.notifSistema': 'Notificaciones del sistema',
    'perfil.notifSistemaDesc': 'Avisos y alertas',
    'perfil.alterarSenha': 'Cambiar contraseña',
    'perfil.senhaAtual': 'Contraseña actual',
    'perfil.senhaAtualPh': 'Escribe tu contraseña actual',
    'perfil.novaSenha': 'Nueva contraseña',
    'perfil.novaSenhaPh': 'Mínimo 8 caracteres',
    'perfil.confirmarSenha': 'Confirmar nueva contraseña',
    'perfil.confirmarSenhaPh': 'Repite la nueva contraseña',
    'perfil.erroNome': 'El nombre no puede estar vacío.',
    'perfil.erroEmail': 'Ingresa un correo válido.',
    'perfil.okPerfil': 'Cambios guardados con éxito.',
    'perfil.erroCampos': 'Completa todos los campos.',
    'perfil.erroTamanho': 'La nueva contraseña debe tener al menos 8 caracteres.',
    'perfil.erroConfirmacao': 'La confirmación no coincide con la nueva contraseña.',
    'perfil.erroIgual': 'La nueva contraseña debe ser diferente de la actual.',
    'perfil.okSenha': 'Contraseña cambiada con éxito.',
  },
};

// ---------- CONTEXTO ----------
const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [theme, setTheme] = useState('claro');
  const [language, setLanguage] = useState('pt');

  const t = useCallback(
    (key) => translations[language]?.[key] ?? translations.pt[key] ?? key,
    [language]
  );

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      language,
      setLanguage,
      colors: themes[theme],
      t,
    }),
    [theme, language, t]
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences deve ser usado dentro de <PreferencesProvider>');
  }
  return ctx;
}