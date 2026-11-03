import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../login/LoginStyle';
import { styles } from './cadastroUsuarioStyle';

const logo = require('../../../assets/Logo (verde).png');

const STEPS = [
  'Dados do usuário',
  'Informações institucionais',
  'Definições de acesso',
];

const CARGOS = [
  'Professor',
  'Técnico de laboratório',
  'Coordenador',
  'Administrador',
  'Analista',
  'Assistente',
  'Estagiário',
  'Pesquisador',
  'Diretor',
];

const PERFIS = [
  'Administrador',
  'Gestor',
  'Operador',
  'Visualizador',
  'Auditor',
  'Convidado',
  'Suporte',
];

function Stepper({ current }) {
  return (
    <View>
      {STEPS.map((label, index) => {
        const active = index === current;
        return (
          <View key={label}>
            <View style={styles.stepRow}>
              <View style={[styles.stepCircle, active && styles.stepCircleActive]}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
              </View>
              <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>
                {label}
              </Text>
            </View>
            {index < STEPS.length - 1 && <View style={styles.stepLine} />}
          </View>
        );
      })}
    </View>
  );
}

function Field({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  error,
  onFocus,
}) {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = !!secureTextEntry;

  return (
    <View style={styles.fieldWrapper}>
      <TextInput
        style={[
          styles.input,
          isPassword && styles.inputWithIcon,
          focused && styles.inputFocused,
          focused && isPassword && styles.inputFocusedWithIcon,
          !!error && styles.inputError,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#2F8A82"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword && !showPassword}
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        onFocus={() => {
          setFocused(true);
          if (onFocus) onFocus();
        }}
        onBlur={() => setFocused(false)}
      />
      {isPassword && (
        <Pressable
          style={styles.eyeButton}
          onPress={() => setShowPassword((current) => !current)}
          accessibilityRole="button"
          accessibilityLabel={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
        >
          <Ionicons
            name={showPassword ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color={colors.primaryLight}
          />
        </Pressable>
      )}
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

function Select({ placeholder, value, options, onSelect, open, onToggle, error }) {
  const [hovered, setHovered] = useState(null);

  return (
    <View style={[styles.fieldWrapper, open && styles.fieldWrapperOpen]}>
      <Pressable
        onPress={onToggle}
        style={[styles.select, open && styles.selectOpen, !!error && styles.inputError]}
      >
        <Text style={[styles.selectText, !value && styles.selectPlaceholder]}>
          {value || placeholder}
        </Text>
        <View style={styles.selectIcon} pointerEvents="none">
          <View style={styles.selectIconBox}>
            <View style={styles.selectIconArrow} />
          </View>
        </View>
      </Pressable>

      {open && (
        <View style={styles.dropdown}>
          <ScrollView
            style={styles.dropdownScroll}
            nestedScrollEnabled
            showsVerticalScrollIndicator
          >
            {options.map((option) => (
              <Pressable
                key={option}
                onPress={() => onSelect(option)}
                onHoverIn={() => setHovered(option)}
                onHoverOut={() => setHovered(null)}
                style={[styles.option, hovered === option && styles.optionHover]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

export default function CadastroUsuario({ usuario, onSubmit, onCancel }) {
  const isEdit = !!usuario;

  const [nome, setNome] = useState(usuario ? usuario.nome : '');
  const [email, setEmail] = useState(usuario ? usuario.email : '');
  const [senha, setSenha] = useState(usuario ? usuario.senha : '');
  const [cargo, setCargo] = useState(usuario ? usuario.cargo : '');
  const [perfil, setPerfil] = useState(usuario ? usuario.perfil : '');
  const [openSelect, setOpenSelect] = useState(null);
  const [buttonHover, setButtonHover] = useState(false);
  const [cancelHover, setCancelHover] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  function focusDados() {
    setCurrentStep(0);
    setOpenSelect(null);
  }

  function toggleSelect(name) {
    setOpenSelect(openSelect === name ? null : name);
    setCurrentStep(name === 'cargo' ? 1 : 2);
  }

  function validate() {
    const next = {};
    if (!nome.trim()) next.nome = 'Informe o nome';
    if (!email.trim()) next.email = 'Informe o email';
    else if (!/^\S+@\S+\.\S+$/.test(email)) next.email = 'Email inválido';
    if (!senha) next.senha = 'Informe a senha';
    else if (senha.length < 6) next.senha = 'A senha deve ter ao menos 6 caracteres';
    if (!cargo) next.cargo = 'Selecione o cargo';
    if (!perfil) next.perfil = 'Selecione o perfil de acesso';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit() {
    setOpenSelect(null);
    if (!validate()) return;
    if (onSubmit) {
      onSubmit({
        nome: nome.trim(),
        email: email.trim(),
        senha,
        cargo,
        perfil,
      });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <View style={styles.leftContent}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
          <Text style={styles.leftTitle}>
            {isEdit ? 'Edite a conta do usuário' : 'Crie a conta de um novo usuário'}
          </Text>
          <Text style={styles.leftSubtitle}>
            {isEdit
              ? 'Atualize as informações e salve as alterações.'
              : 'Complete seu time para fazer parte da plataforma!'}
          </Text>
          <Stepper current={currentStep} />
        </View>
      </View>

      <View style={styles.rightPanel}>
        <ScrollView
          contentContainerStyle={styles.rightContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <Text style={styles.title}>
              {isEdit ? 'Editar usuário!' : 'Cadastro de usuário!'}
            </Text>
            <Text style={styles.subtitle}>
              {isEdit ? 'Edite os dados do usuário.' : 'Cadastre um novo usuário.'}
            </Text>

            <Field
              placeholder="Nome"
              value={nome}
              onChangeText={setNome}
              onFocus={focusDados}
              error={errors.nome}
            />
            <Field
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              onFocus={focusDados}
              error={errors.email}
            />
            <Field
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              onFocus={focusDados}
              error={errors.senha}
            />

            <Select
              placeholder="Cargo"
              value={cargo}
              options={CARGOS}
              open={openSelect === 'cargo'}
              onToggle={() => toggleSelect('cargo')}
              onSelect={(v) => {
                setCargo(v);
                setOpenSelect(null);
              }}
              error={errors.cargo}
            />
            <Select
              placeholder="Perfil de acesso"
              value={perfil}
              options={PERFIS}
              open={openSelect === 'perfil'}
              onToggle={() => toggleSelect('perfil')}
              onSelect={(v) => {
                setPerfil(v);
                setOpenSelect(null);
              }}
              error={errors.perfil}
            />

            <View style={styles.actions}>
              <Pressable
                onPress={handleSubmit}
                onHoverIn={() => setButtonHover(true)}
                onHoverOut={() => setButtonHover(false)}
                style={[styles.primaryButton, buttonHover && styles.primaryButtonHover]}
              >
                <Text style={styles.primaryButtonText}>{isEdit ? 'Salvar' : 'Cadastrar'}</Text>
              </Pressable>

              {!!onCancel && (
                <Pressable
                  onPress={onCancel}
                  onHoverIn={() => setCancelHover(true)}
                  onHoverOut={() => setCancelHover(false)}
                  style={[styles.secondaryButton, cancelHover && styles.secondaryButtonHover]}
                >
                  <Text style={styles.secondaryButtonText}>Cancelar</Text>
                </Pressable>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}