
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

import { criarLoginStyles } from "./LoginStyles";
import { useTema } from "../tema/TemaContext";
import { useAuth } from "../../Services/AuthContext";

import { useIdioma } from "../idioma/IdiomaContext";
import SeletorIdioma from "../idioma/SeletorIdioma";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const { cores, modoEscuro } = useTema();
  const { entrar: autenticar } = useAuth();
  const { t } = useIdioma();

  const styles = useMemo(
    () => criarLoginStyles(cores, modoEscuro),
    [cores, modoEscuro]
  );

  async function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert(t("erro"), t("preencherCampos"));
      return;
    }

    try {
      await autenticar(email.trim(), senha);
    } catch (erro) {
      Alert.alert(t("erro"), erro.message);
    }
  }

  const coresGradiente = modoEscuro
    ? ["#15423E", "#013535"]
    : ["#003232", "#053734"];

  return (
    <LinearGradient
      colors={coresGradiente}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 0 }}
      style={styles.container}
    >
      <StatusBar style="light" />

      <View style={styles.banner}>
        <Image
          source={require("../../assets/fundo.png")}
          style={styles.formaBanner}
        />

        <Image
          source={require("../../assets/Logo-branco.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        <Text style={styles.slogan}>
          {t("automacao")}{"\n"}
          {t("documentos")}
        </Text>
      </View>

      <ScrollView
        style={styles.cartao}
        contentContainerStyle={styles.conteudoCartao}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 22 }}>
          <SeletorIdioma />
        </View>

        <Text style={styles.boasVindas}>
          {t("boasVindas")}
        </Text>

        <Text style={styles.titulo}>
          {t("tituloLogin")}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t("email")}
          placeholderTextColor={cores.textoSecundario}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <View style={styles.senhaContainer}>
          <TextInput
            style={styles.inputSenha}
            placeholder={t("senha")}
            placeholderTextColor={cores.textoSecundario}
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity
            style={styles.iconeSenha}
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={cores.textoSecundario}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.esqueciSenha}
          onPress={() => router.push("/recuperar-senha")}
        >
          <Text style={styles.textoLink}>
            {t("esqueceuSenha")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoEntrar}
          activeOpacity={0.8}
          onPress={entrar}
        >
          <Text style={styles.textoBotaoEntrar}>
            {t("login")}
          </Text>
        </TouchableOpacity>

        <View style={styles.divisor}>
          <View style={styles.linha} />
          <Text style={styles.textoOu}>{t("ou")}</Text>
          <View style={styles.linha} />
        </View>

        <TouchableOpacity
          style={styles.botaoGoogle}
          activeOpacity={0.8}
          onPress={() =>
            Alert.alert(
              "Google",
              "A autenticação com Google ainda precisa ser configurada."
            )
          }
        >
          <Ionicons
            name="logo-google"
            size={20}
            color={cores.textoSecundario}
          />

          <Text style={styles.textoGoogle}>
            {t("entrarGoogle")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.criarConta}
          onPress={() => router.push("/cadastro")}
        >
          <Text style={styles.textoCriarConta}>
            {t("criarConta")}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
