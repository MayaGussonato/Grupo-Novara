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
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { criarLoginStyles } from "./LoginStyles";
import { useTema } from "../tema/TemaContext"; // mesmo caminho usado no Perfil
import { LinearGradient } from "expo-linear-gradient";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { cores, modoEscuro } = useTema();

  // Recria os estilos sempre que o tema mudar
  const styles = useMemo(
    () => criarLoginStyles(cores, modoEscuro),
    [cores, modoEscuro]
  );

  function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert("Atenção", "Preencha seu e-mail e sua senha.");
      return;
    }

    // Aqui você pode conectar a autenticação da sua API.
    console.log("E-mail:", email);
    console.log("Senha preenchida.");
  }

  return (
    <LinearGradient
      colors={["#004240", "#013333"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <StatusBar style="light" />

      {/* Banner superior */}
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
          Automação inteligente de documentos.
        </Text>
      </View>

      {/* Cartão de login */}
      <ScrollView
        style={styles.cartao}
        contentContainerStyle={styles.conteudoCartao}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.boasVindas}>Bem-Vindo (A)</Text>

        <Text style={styles.titulo}>Login</Text>

        {/* E-mail */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={cores.textoSecundario}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        {/* Senha */}
        <View style={styles.senhaContainer}>
          <TextInput
            style={styles.inputSenha}
            placeholder="Senha"
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

        {/* Recuperar senha */}
        <TouchableOpacity
          style={styles.esqueciSenha}
          onPress={() => navigation?.navigate?.("RecuperarSenha")}
        >
          <Text style={styles.textoLink}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        {/* Entrar */}
        <TouchableOpacity
          style={styles.botaoEntrar}
          activeOpacity={0.8}
          onPress={entrar}
        >
          <Text style={styles.textoBotaoEntrar}>Entrar</Text>
        </TouchableOpacity>

        {/* Divisor */}
        <View style={styles.divisor}>
          <View style={styles.linha} />
          <Text style={styles.textoOu}>ou</Text>
          <View style={styles.linha} />
        </View>

        {/* Google */}
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
            style={styles.iconeGoogle}
          />
          <Text style={styles.textoGoogle}>Entrar com Google</Text>
        </TouchableOpacity>

        {/* Criar conta */}
        <TouchableOpacity
          style={styles.criarConta}
          onPress={() => navigation?.navigate?.("Cadastro")}
        >
          <Text style={styles.textoCriarConta}>Crie uma conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}