import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from './LoginStyle';

const fundoImage = require('../../../assets/Login (icones).png');
const logoImage = require('../../../assets/Logo (branca).png');
const googleLogo = require('../../../assets/Logo (google).webp');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login({ onLogin, onForgotPassword, onGoogleLogin }) {
  const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [focused, setFocused] = useState(null);
  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      newErrors.email = 'Informe seu e-mail.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = 'E-mail inválido.';
    }

    if (!password) {
      newErrors.password = 'Informe sua senha.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleLogin() {
    if (!validate()) return;
    if (onLogin) {
      onLogin({ email: email.trim(), password, remember });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftPanel}>
        <Image
          source={fundoImage}
          resizeMode="cover"
          style={styles.background}
          pointerEvents="none"
        />

        <View style={styles.brand} pointerEvents="none">
          <Image source={logoImage} resizeMode="contain" style={styles.logo} />
          <Text style={styles.tagline}>
            {'Automação inteligente\nde documentos.'}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.rightPanel}
        contentContainerStyle={styles.rightContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          <Text style={styles.title}>Bem vindo(a) de volta!</Text>
          <Text style={styles.subtitle}>Acesse sua conta para continuar.</Text>

          <TextInput
            style={[
              styles.input,
              focused === 'email' && styles.inputFocused,
              errors.email && styles.inputError,
            ]}
            placeholder="Email"
            placeholderTextColor={colors.placeholder}
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            onSubmitEditing={() => passwordRef.current?.focus()}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            returnKeyType="next"
          />
          <Text style={[styles.errorText, styles.errorTextEmail]}>
            {errors.email || ' '}
          </Text>

          <View style={styles.inputWrapper}>
            <TextInput
              ref={passwordRef}
              style={[
                styles.input,
                styles.inputWithIcon,
                focused === 'password' && styles.inputFocused,
                focused === 'password' && styles.inputFocusedWithIcon,
                errors.password && styles.inputError,
              ]}
              placeholder="Senha"
              placeholderTextColor={colors.placeholder}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setFocused('password')}
              onBlur={() => setFocused(null)}
              onSubmitEditing={handleLogin}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              returnKeyType="done"
            />
            <Pressable
              style={styles.eyeButton}
              onPress={() => setShowPassword((value) => !value)}
              accessibilityRole="button"
              accessibilityLabel={
                showPassword ? 'Ocultar senha' : 'Mostrar senha'
              }
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={colors.primaryLight}
              />
            </Pressable>
          </View>
          <Text style={[styles.errorText, styles.errorTextPassword]}>
            {errors.password || ' '}
          </Text>

          <View style={styles.optionsRow}>
            <Pressable
              style={styles.checkboxRow}
              onPress={() => setRemember((value) => !value)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: remember }}
            >
              <View
                style={[styles.checkbox, remember && styles.checkboxChecked]}
              >
                {remember && (
                  <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                )}
              </View>
              <Text style={styles.optionText}>Lembrar de mim?</Text>
            </Pressable>

            <Pressable onPress={onForgotPassword} accessibilityRole="link">
              <Text style={styles.forgotText}>Esqueceu a senha?</Text>
            </Pressable>
          </View>

          <View style={styles.actions}>
            <Pressable
              onPress={handleLogin}
              accessibilityRole="button"
              style={({ hovered }) => [
                styles.primaryButton,
                hovered && styles.primaryButtonHover,
              ]}
            >
              <Text style={styles.primaryButtonText}>Entrar</Text>
            </Pressable>

            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.dividerLine} />
            </View>

            <Pressable
              onPress={onGoogleLogin}
              accessibilityRole="button"
              style={({ hovered }) => [
                styles.googleButton,
                hovered && styles.googleButtonHover,
              ]}
            >
              <Image
                source={googleLogo}
                resizeMode="contain"
                style={styles.googleIcon}
              />
              <Text style={styles.googleText}>Entrar com google</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}