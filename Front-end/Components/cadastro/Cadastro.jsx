
import React, { useState } from "react";

import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";

import { cadastroStyles as styles } from "./CadastroStyles";
import { useTema } from "../tema/TemaContext";
import { useAuth } from "../../Services/AuthContext";
import { cadastrarUsuario } from "../../Services/usuarioService";

const opcoes = [
  { label: "Desenvolvedor", value: "desenvolvedor" },
  { label: "Analista", value: "analista" },
  { label: "Estagiário", value: "estagiario" },
];

// Seletor de cargo
function Seletor({
  valor,
  aoMudar,
  placeholder,
  cores,
  erro,
}) {
  return (
    <View
      style={[
        styles.cargoContainer,
        {
          backgroundColor: cores.input,
          borderColor: erro ? "#E53935" : cores.borda,
        },
      ]}
    >
      <Picker
        selectedValue={valor}
        onValueChange={aoMudar}
        mode="dropdown"
        itemStyle={{ color: cores.texto }}
        dropdownIconColor={cores.textoSecundario}
        style={[
          styles.cargoPicker,
          {
            color: cores.texto,
            backgroundColor: cores.input,
          },
        ]}
      >
        <Picker.Item
          label={placeholder}
          value=""
          style={{
            backgroundColor: cores.input,
            color: cores.textoSecundario,
          }}
        />

        {opcoes.map((opcao) => (
          <Picker.Item
            key={opcao.value}
            label={opcao.label}
            value={opcao.value}
          />
        ))}
      </Picker>
    </View>
  );
}

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");

  const [tentouCadastrar, setTentouCadastrar] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const { cores, modoEscuro } = useTema();
  const { entrar } = useAuth();

  // Validações dos campos
  const erros = {
    nome: !nome.trim()
      ? "O nome é obrigatório."
      : "",

    email: !email.trim()
      ? "O email é obrigatório."
      : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
      ? "Digite um email válido."
      : "",

    senha: !senha
      ? "A senha é obrigatória."
      : senha.length < 8
      ? "A senha precisa ter no mínimo 8 caracteres."
      : senha.length > 72
      ? "A senha não pode ultrapassar 72 caracteres."
      : "",

    cargo: !cargo
      ? "Selecione um cargo."
      : "",
  };

  // Estilo das mensagens de erro
  const estiloErro = {
    color: "#E53935",
    fontSize: 12,
    marginTop: -10,
    marginBottom: 12,
  };

  // Cadastro
  async function cadastrar() {
    setTentouCadastrar(true);

    const possuiErros = Object.values(erros).some(
      (erro) => erro !== ""
    );

    if (possuiErros) {
      return;
    }

    try {
      setCarregando(true);

      // 1. Cadastra o usuário na API
      await cadastrarUsuario({
        nome: nome.trim(),
        email: email.trim(),
        senha,
        cargo,
      });

      // 2. Faz login automaticamente
      await entrar(email.trim(), senha);

      // 3. Vai para o Dashboard
      navigation.replace("Dashboard");

    } catch (erro) {
      Alert.alert(
        "Erro no cadastro",
        erro.message || "Não foi possível criar sua conta."
      );

    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: cores.background,
      }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: cores.background,
          },
        ]}
      >
        <StatusBar
          style={modoEscuro ? "light" : "dark"}
        />

        {/* Logo e título */}
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/Logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text
            style={[
              styles.title,
              { color: cores.texto },
            ]}
          >
            Cadastrar Usuário
          </Text>
        </View>

        <View style={styles.formulario}>

          {/* Nome */}
          <View>
            <Text
              style={[
                styles.text,
                { color: cores.texto },
                styles.textoNegrito,
              ]}
            >
              Nome
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: cores.input,
                  borderColor:
                    tentouCadastrar && erros.nome
                      ? "#E53935"
                      : cores.borda,
                  color: cores.texto,
                },
              ]}
              placeholder="Nome"
              placeholderTextColor={cores.textoSecundario}
              value={nome}
              onChangeText={setNome}
              autoCapitalize="words"
            />

            {tentouCadastrar && erros.nome !== "" && (
              <Text style={estiloErro}>
                {erros.nome}
              </Text>
            )}
          </View>

          {/* Email */}
          <View>
            <Text
              style={[
                styles.text,
                { color: cores.texto },
                styles.textoNegrito,
              ]}
            >
              Email
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: cores.input,
                  borderColor:
                    tentouCadastrar && erros.email
                      ? "#E53935"
                      : cores.borda,
                  color: cores.texto,
                },
              ]}
              placeholder="exemplo@gmail.com"
              placeholderTextColor={cores.textoSecundario}
              value={email}
              onChangeText={setEmail}
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
            />

            {tentouCadastrar && erros.email !== "" && (
              <Text style={estiloErro}>
                {erros.email}
              </Text>
            )}
          </View>

          {/* Senha */}
          <View>
            <Text
              style={[
                styles.text,
                { color: cores.texto },
                styles.textoNegrito,
              ]}
            >
              Senha
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: cores.input,
                  borderColor:
                    tentouCadastrar && erros.senha
                      ? "#E53935"
                      : cores.borda,
                  color: cores.texto,
                },
              ]}
              placeholder="Mínimo de 8 caracteres"
              placeholderTextColor={cores.textoSecundario}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              autoComplete="new-password"
            />

            {tentouCadastrar && erros.senha !== "" && (
              <Text style={estiloErro}>
                {erros.senha}
              </Text>
            )}
          </View>

          {/* Cargo */}
          <View>
            <Text
              style={[
                styles.text,
                { color: cores.texto },
                styles.textoNegrito,
              ]}
            >
              Cargo
            </Text>

            <Seletor
              valor={cargo}
              aoMudar={setCargo}
              placeholder="Selecione um Cargo"
              cores={cores}
              erro={tentouCadastrar && erros.cargo !== ""}
            />

            {tentouCadastrar && erros.cargo !== "" && (
              <Text style={estiloErro}>
                {erros.cargo}
              </Text>
            )}
          </View>

          {/* Botão de cadastro */}
          <TouchableOpacity
            style={[
              styles.cadastrar,
              {
                backgroundColor: cores.vinho || "#460303",
                opacity: carregando ? 0.7 : 1,
              },
            ]}
            activeOpacity={0.8}
            onPress={cadastrar}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.textoEntrar}>
                Cadastrar
              </Text>
            )}
          </TouchableOpacity>

          {/* Voltar para Login */}
          <TouchableOpacity
            style={styles.criarConta}
            onPress={() => navigation.navigate("Login")}
            disabled={carregando}
          >
            <Text
              style={[
                styles.textoCriarConta,
                {
                  color: cores.vinho || "#650000",
                },
              ]}
            >
              Entrar na conta
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </ScrollView>
  );
}
