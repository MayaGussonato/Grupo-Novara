
import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";

import { criarRecuperarSenhaStyles } from "./RecuperarSenhaStyle";
import { useTema } from "../tema/TemaContext";

export default function RecuperarSenhaScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { cores, modoEscuro } = useTema();

  const styles = useMemo(
    () => criarRecuperarSenhaStyles(cores, modoEscuro),
    [cores, modoEscuro]
  );

  const coresGradiente = modoEscuro
    ? ["#15423E", "#013535"]
    : ["#003232", "#053734"];

  function voltarLogin() {
    router.replace("/login");
  }

  async function recuperarSenha() {
    const emailLimpo = email.trim().toLowerCase();

    if (!emailLimpo) {
      Alert.alert("Atenção", "Informe seu endereço de e-mail.");
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailValido.test(emailLimpo)) {
      Alert.alert(
        "E-mail inválido",
        "Informe um endereço de e-mail válido."
      );
      return;
    }

    setCarregando(true);

    try {
      Alert.alert(
        "Recuperação de senha",
        "O formulário está funcionando. O envio do e-mail será conectado à API posteriormente."
      );
    } finally {
      setCarregando(false);
    }
  }

  return (
    <LinearGradient
      colors={coresGradiente}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar style="light" />

      <View style={styles.banner}>
        <Image
          source={require("../../assets/fundo.png")}
          style={styles.formaBanner}
          resizeMode="cover"
        />

        <Image
          source={require("../../assets/Logo-branco.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.slogan}>
          Automação inteligente{"\n"}
          de documentos.
        </Text>
      </View>

      <ScrollView
        style={styles.cartao}
        contentContainerStyle={styles.conteudoCartao}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formulario}>
          <TouchableOpacity
            style={styles.voltar}
            activeOpacity={0.7}
            onPress={voltarLogin}
          >
            <Ionicons
              name="arrow-back-outline"
              size={20}
              color={cores.primario}
            />

            <Text style={styles.textoVoltar}>
              Voltar para o login
            </Text>
          </TouchableOpacity>

          <View style={styles.iconeContainer}>
            <Ionicons
              name="lock-closed-outline"
              size={35}
              color={cores.primario}
            />
          </View>

          <Text style={styles.boasVindas}>
            Recuperação de acesso
          </Text>

          <Text style={styles.titulo}>
            Esqueceu sua senha?
          </Text>

          <Text style={styles.descricao}>
            Não se preocupe! Informe o e-mail cadastrado na sua
            conta para solicitar a recuperação da sua senha.
          </Text>

          <Text style={styles.label}>
            E-mail cadastrado
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Digite seu e-mail"
            placeholderTextColor={cores.textoSecundario}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            value={email}
            onChangeText={setEmail}
            editable={!carregando}
            returnKeyType="send"
            onSubmitEditing={recuperarSenha}
          />

          <TouchableOpacity
            style={[
              styles.botaoEnviar,
              carregando && styles.botaoDesabilitado,
            ]}
            activeOpacity={0.8}
            onPress={recuperarSenha}
            disabled={carregando}
          >
            <Text style={styles.textoBotao}>
              {carregando ? "Aguarde..." : "Recuperar senha"}
            </Text>
          </TouchableOpacity>

          <View style={styles.ajudaContainer}>
            <Ionicons
              name="information-circle-outline"
              size={18}
              color={cores.textoSecundario}
            />

            <Text style={styles.ajudaTexto}>
              Utilize o mesmo e-mail informado no cadastro da sua conta.
            </Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
