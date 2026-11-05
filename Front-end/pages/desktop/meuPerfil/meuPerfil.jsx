import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, ScrollView, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuGlobal from '../../../components/MenuGlobal/MenuGlobal';
import { usePreferences, languages } from '../../../context/PreferencesContext';
import { createStyles } from './meuPerfilStyle';

const DADOS_INICIAIS = {
  nome: 'Luis Oliva',
  email: 'luis.oliva@labflow.com',
  cargo: 'Administrador',
  instituicao: 'LabFlow',
  telefone: '(11) 91234-5678',
};

function getIniciais(nome) {
  const partes = nome.trim().split(' ').filter(Boolean);
  if (partes.length === 0) return '?';
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

function useStyles() {
  const { colors } = usePreferences();
  return useMemo(() => createStyles(colors), [colors]);
}

function Campo({ label, value, onChangeText, editable = true, ...rest }) {
  const { colors } = usePreferences();
  const styles = useStyles();
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !editable && styles.inputDisabled]}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        placeholderTextColor={colors.textMuted}
        {...rest}
      />
    </View>
  );
}

function Seletor({ opcoes, valor, onChange }) {
  const { colors } = usePreferences();
  const styles = useStyles();
  return (
    <View style={styles.optionRow}>
      {opcoes.map((op) => {
        const ativo = op.value === valor;
        return (
          <TouchableOpacity
            key={op.value}
            style={[styles.option, ativo && styles.optionActive]}
            onPress={() => onChange(op.value)}
            activeOpacity={0.8}
          >
            {op.icon ? (
              <Ionicons
                name={op.icon}
                size={16}
                color={ativo ? colors.onPrimary : colors.text}
              />
            ) : null}
            <Text style={[styles.optionText, ativo && styles.optionTextActive]}>
              {op.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function LinhaSwitch({ titulo, descricao, value, onValueChange }) {
  const { colors } = usePreferences();
  const styles = useStyles();
  return (
    <View style={styles.switchRow}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={styles.switchTitle}>{titulo}</Text>
        <Text style={styles.switchDescription}>{descricao}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.switchOff, true: colors.accent }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

function Mensagem({ msg }) {
  const { t } = usePreferences();
  const styles = useStyles();
  if (!msg) return null;
  return (
    <Text
      style={[styles.message, msg.tipo === 'erro' ? styles.messageError : styles.messageSuccess]}
    >
      {t(msg.chave)}
    </Text>
  );
}

function TituloCard({ icone, texto }) {
  const { colors } = usePreferences();
  const styles = useStyles();
  return (
    <View style={styles.cardTitleRow}>
      <Ionicons name={icone} size={20} color={colors.accent} />
      <Text style={styles.cardTitle}>{texto}</Text>
    </View>
  );
}

export default function MeuPerfil({ activeMenu = 'perfil', onNavigate, onLogout }) {
  const { colors, theme, setTheme, language, setLanguage, t } = usePreferences();
  const styles = useStyles();

  const [dados, setDados] = useState(DADOS_INICIAIS);
  const [backup, setBackup] = useState(DADOS_INICIAIS);
  const [editando, setEditando] = useState(false);
  const [msgPerfil, setMsgPerfil] = useState(null);

  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSistema, setNotifSistema] = useState(true);

  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [msgSenha, setMsgSenha] = useState(null);

  const temas = [
    { value: 'claro', label: t('perfil.temaClaro'), icon: 'sunny-outline' },
    { value: 'escuro', label: t('perfil.temaEscuro'), icon: 'moon-outline' },
  ];

  function atualizar(campo, valor) {
    setDados((prev) => ({ ...prev, [campo]: valor }));
  }

  function iniciarEdicao() {
    setBackup(dados);
    setMsgPerfil(null);
    setEditando(true);
  }

  function cancelarEdicao() {
    setDados(backup);
    setEditando(false);
    setMsgPerfil(null);
  }

  function salvarPerfil() {
    if (!dados.nome.trim()) {
      setMsgPerfil({ tipo: 'erro', chave: 'perfil.erroNome' });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(dados.email.trim())) {
      setMsgPerfil({ tipo: 'erro', chave: 'perfil.erroEmail' });
      return;
    }
    setEditando(false);
    setMsgPerfil({ tipo: 'ok', chave: 'perfil.okPerfil' });
  }

  function alterarSenha() {
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
      setMsgSenha({ tipo: 'erro', chave: 'perfil.erroCampos' });
      return;
    }
    if (novaSenha.length < 8) {
      setMsgSenha({ tipo: 'erro', chave: 'perfil.erroTamanho' });
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setMsgSenha({ tipo: 'erro', chave: 'perfil.erroConfirmacao' });
      return;
    }
    if (novaSenha === senhaAtual) {
      setMsgSenha({ tipo: 'erro', chave: 'perfil.erroIgual' });
      return;
    }
    setSenhaAtual('');
    setNovaSenha('');
    setConfirmarSenha('');
    setMsgSenha({ tipo: 'ok', chave: 'perfil.okSenha' });
  }

  function sair() {
    if (onLogout) onLogout();
  }

  return (
    <View style={styles.container}>
      <MenuGlobal activeMenu={activeMenu} onNavigate={onNavigate} />

      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View>
              <View style={styles.titleRow}>
                <Ionicons name="person-circle-outline" size={36} color={colors.text} />
                <Text style={styles.title}>{t('perfil.titulo')}</Text>
              </View>
              <Text style={styles.subtitle}>{t('perfil.subtitulo')}</Text>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={sair} activeOpacity={0.8}>
              <Ionicons name="log-out-outline" size={20} color={colors.danger} />
              <Text style={styles.logoutButtonText}>{t('perfil.sair')}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.columns}>
            <View style={styles.column}>
              <View style={styles.card}>
                <View style={styles.profileRow}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getIniciais(dados.nome)}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.profileName}>{dados.nome}</Text>
                    <Text style={styles.profileRole}>{dados.cargo}</Text>
                  </View>
                </View>

                <View style={styles.divider} />

                <TituloCard icone="id-card-outline" texto={t('perfil.infoPessoais')} />

                <Campo
                  label={t('perfil.nome')}
                  value={dados.nome}
                  onChangeText={(v) => atualizar('nome', v)}
                  editable={editando}
                />
                <Campo
                  label={t('perfil.email')}
                  value={dados.email}
                  onChangeText={(v) => atualizar('email', v)}
                  editable={editando}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Campo
                  label={t('perfil.cargo')}
                  value={dados.cargo}
                  onChangeText={(v) => atualizar('cargo', v)}
                  editable={editando}
                />
                <Campo
                  label={t('perfil.instituicao')}
                  value={dados.instituicao}
                  onChangeText={(v) => atualizar('instituicao', v)}
                  editable={editando}
                />
                <Campo
                  label={t('perfil.telefone')}
                  value={dados.telefone}
                  onChangeText={(v) => atualizar('telefone', v)}
                  editable={editando}
                  keyboardType="phone-pad"
                />

                <Mensagem msg={msgPerfil} />

                {editando ? (
                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={[styles.secondaryButton, styles.flex1]}
                      onPress={cancelarEdicao}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="close-outline" size={18} color={colors.text} />
                      <Text style={styles.secondaryButtonText}>{t('perfil.cancelar')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.primaryButton, styles.flex1]}
                      onPress={salvarPerfil}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="checkmark-outline" size={18} color={colors.onPrimary} />
                      <Text style={styles.primaryButtonText}>{t('perfil.salvar')}</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={iniciarEdicao}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="create-outline" size={18} color={colors.onPrimary} />
                    <Text style={styles.primaryButtonText}>{t('perfil.editar')}</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.column}>
              <View style={styles.card}>
                <TituloCard icone="options-outline" texto={t('perfil.preferencias')} />

                <View style={styles.field}>
                  <Text style={styles.label}>{t('perfil.tema')}</Text>
                  <Seletor opcoes={temas} valor={theme} onChange={setTheme} />
                </View>

                <View style={styles.field}>
                  <Text style={styles.label}>{t('perfil.idioma')}</Text>
                  <Seletor opcoes={languages} valor={language} onChange={setLanguage} />
                </View>

                <View style={styles.divider} />

                <LinhaSwitch
                  titulo={t('perfil.notifEmail')}
                  descricao={t('perfil.notifEmailDesc')}
                  value={notifEmail}
                  onValueChange={setNotifEmail}
                />
                <LinhaSwitch
                  titulo={t('perfil.notifSistema')}
                  descricao={t('perfil.notifSistemaDesc')}
                  value={notifSistema}
                  onValueChange={setNotifSistema}
                />
              </View>

              <View style={styles.card}>
                <TituloCard icone="lock-closed-outline" texto={t('perfil.alterarSenha')} />

                <Campo
                  label={t('perfil.senhaAtual')}
                  value={senhaAtual}
                  onChangeText={setSenhaAtual}
                  secureTextEntry
                  placeholder={t('perfil.senhaAtualPh')}
                />
                <Campo
                  label={t('perfil.novaSenha')}
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                  secureTextEntry
                  placeholder={t('perfil.novaSenhaPh')}
                />
                <Campo
                  label={t('perfil.confirmarSenha')}
                  value={confirmarSenha}
                  onChangeText={setConfirmarSenha}
                  secureTextEntry
                  placeholder={t('perfil.confirmarSenhaPh')}
                />

                <Mensagem msg={msgSenha} />

                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={alterarSenha}
                  activeOpacity={0.8}
                >
                  <Ionicons name="key-outline" size={18} color={colors.onPrimary} />
                  <Text style={styles.primaryButtonText}>{t('perfil.alterarSenha')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}