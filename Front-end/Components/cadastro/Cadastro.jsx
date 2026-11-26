
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
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import { cadastroStyles as styles } from "./CadastroStyles";
import { useTema } from "../tema/TemaContext";
import { useAuth } from "../../Services/AuthContext";
import { cadastrarUsuario } from "../../Services/usuarioService";

const opcoes = [
  { label: "Desenvolvedor", value: "desenvolvedor" },
  { label: "Analista", value: "analista" },
  { label: "Estagiário", value: "estagiario" },
];

// Seletor personalizado de cargo
function Seletor({
  valor,
  aoMudar,
  placeholder,
  cores,
  erro,
}) {
  const [aberto, setAberto] = useState(false);

  const selecionado = opcoes.find(
    (opcao) => opcao.value === valor
  );

  return (
    <>
      <TouchableOpacity
        style={[
          styles.cargoContainer,
          {
            backgroundColor: cores.input,
            borderColor: erro ? "#E53935" : cores.borda,
          },
          estilosExtras.seletor,
        ]}
        onPress={() => setAberto(true)}
        activeOpacity={0.8}
      >
        <Text
          style={{
            color: selecionado
              ? cores.texto
              : cores.textoSecundario,
            fontSize: 15,
            flex: 1,
          }}
        >
          {selecionado
            ? selecionado.label
            : placeholder}
        </Text>

        <Ionicons
          name="chevron-down"
          size={21}
          color={cores.textoSecundario}
        />
      </TouchableOpacity>

      <Modal
        visible={aberto}
        transparent
        animationType="fade"
        statusBarTranslucent
        onRequestClose={() => setAberto(false)}
      >
        <TouchableOpacity
          style={estilosExtras.modalFundo}
          activeOpacity={1}
          onPress={() => setAberto(false)}
        >
          <View
            style={[
              estilosExtras.modalConteudo,
              {
                backgroundColor: cores.card,
                borderColor: cores.borda,
              },
            ]}
          >
            <Text
              style={[
                estilosExtras.modalTitulo,
                { color: cores.texto },
              ]}
            >
              Selecione um cargo
            </Text>

            {opcoes.map((opcao) => (
              <TouchableOpacity
                key={opcao.value}
                style={[
                  estilosExtras.opcao,
                  {
                    backgroundColor:
                      valor === opcao.value
                        ? cores.input
                        : "transparent",
                  },
                ]}
                onPress={() => {
                  aoMudar(opcao.value);
                  setAberto(false);
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    color: cores.texto,
                    fontSize: 15,
                  }}
                >
                  {opcao.label}
                </Text>

                {valor === opcao.value && (
                  <Ionicons
                    name="checkmark"
                    size={21}
                    color={cores.primario}
                  />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={estilosExtras.botaoFechar}
              onPress={() => setAberto(false)}
            >
              <Text
                style={{
                  color: cores.primario,
                  fontWeight: "600",
                }}
              >
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
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

            <View
              style={{
                position: "relative",
                justifyContent: "center",
              }}
            >
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
                    paddingRight: 48,
                  },
                ]}
                placeholder="Mínimo de 8 caracteres"
                placeholderTextColor={cores.textoSecundario}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
                autoComplete="new-password"
              />

              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: 0,
                  bottom: 15,
                  justifyContent: "center",
                }}
              >
                <Ionicons
                  name={
                    mostrarSenha
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={23}
                  color={cores.textoSecundario}
                />
              </TouchableOpacity>
            </View>

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

const estilosExtras = {
  seletor: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.60)",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },

  modalConteudo: {
    width: "100%",
    maxWidth: 400,
    borderRadius: 14,
    borderWidth: 1,
    padding: 18,
  },

  modalTitulo: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
  },

  opcao: {
    minHeight: 48,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  botaoFechar: {
    alignItems: "center",
    padding: 13,
    marginTop: 8,
  },
};
