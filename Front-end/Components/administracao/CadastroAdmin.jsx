
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

import { useTema } from "../tema/TemaContext";
import {
  cadastrarUsuario,
  alterarPerfilUsuario,
  listarUsuarios,
} from "../../Services/usuarioService";

export default function CadastroAdmin({ navigation, onCancelar, onSucesso }) {
  const { cores } = useTema();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("Analista");
  const [perfilAcesso, setPerfilAcesso] = useState("Funcionario");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const cargos = [
    "Administrador",
    "Analista",
    "Operador",
    "Revisor",
  ];

  const perfis = [
    "Administrador",
    "Revisor",
    "Funcionario",
  ];

  function voltarAdministracao() {
    if (onCancelar) {
      onCancelar();
      return;
    }

    if (navigation?.goBack) {
      navigation.goBack();
      return;
    }

    if (navigation?.navigate) {
      navigation.navigate("Administracao");
    }
  }

  function obterIdUsuario(resposta) {
    return (
      resposta?.idUsuario ??
      resposta?.IdUsuario ??
      resposta?.id ??
      resposta?.Id ??
      resposta?.usuario?.idUsuario ??
      resposta?.usuario?.IdUsuario ??
      resposta?.usuario?.id ??
      resposta?.data?.idUsuario ??
      resposta?.data?.IdUsuario ??
      resposta?.data?.id ??
      null
    );
  }

  async function handleCadastrar() {
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha o nome, o e-mail e a senha."
      );
      return;
    }

    if (senha.length < 8) {
      Alert.alert(
        "Senha inválida",
        "A senha precisa ter pelo menos 8 caracteres."
      );
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (!emailValido) {
      Alert.alert("E-mail inválido", "Digite um endereço de e-mail válido.");
      return;
    }

    setCarregando(true);

    try {
      const dados = {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha,
        cargo,
      };

      // Cria o usuário sem fazer login com a conta recém-criada.
      const resposta = await cadastrarUsuario(dados);

      let idUsuario = obterIdUsuario(resposta);

      // Algumas respostas da API podem não trazer o identificador.
      if (!idUsuario) {
        const respostaLista = await listarUsuarios();

        const usuarios = Array.isArray(respostaLista)
          ? respostaLista
          : respostaLista?.usuarios ??
            respostaLista?.data ??
            respostaLista?.items ??
            [];

        const usuarioEncontrado = usuarios.find(
          (usuario) =>
            String(usuario.email ?? usuario.Email ?? "").toLowerCase() ===
            email.trim().toLowerCase()
        );

        idUsuario = obterIdUsuario(usuarioEncontrado);
      }

      if (!idUsuario) {
        throw new Error(
          "O usuário foi cadastrado, mas não foi possível localizar seu identificador para definir o perfil."
        );
      }

      // O cadastro pela API cria inicialmente o perfil Funcionario.
      // Esta chamada altera o perfil usando a sessão atual do administrador.
      if (perfilAcesso !== "Funcionario") {
        await alterarPerfilUsuario(idUsuario, perfilAcesso);
      }

      Alert.alert(
        "Cadastro concluído",
        "O usuário foi cadastrado com sucesso.",
        [
          {
            text: "OK",
            onPress: () => {
              if (onSucesso) {
                onSucesso();
              } else {
                voltarAdministracao();
              }
            },
          },
        ]
      );
    } catch (erro) {
      console.log("Erro ao cadastrar administrador:", erro);

      Alert.alert(
        "Erro no cadastro",
        erro?.message ||
          "Não foi possível cadastrar o usuário. Verifique os dados e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  const estiloInput = [
    styles.input,
    {
      backgroundColor: cores.input,
      borderColor: cores.borda,
      color: cores.texto,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topo}>
          <TouchableOpacity
            onPress={voltarAdministracao}
            style={styles.botaoVoltar}
          >
            <Ionicons
              name="arrow-back-outline"
              size={25}
              color={cores.texto}
            />
          </TouchableOpacity>

          <Text style={[styles.titulo, { color: cores.texto }]}>
            Cadastrar usuário
          </Text>
        </View>

        <Text style={[styles.subtitulo, { color: cores.textoSecundario }]}>
          Preencha os dados para adicionar um novo usuário ao sistema.
        </Text>

        <Text style={[styles.label, { color: cores.texto }]}>
          Nome completo
        </Text>
        <TextInput
          style={estiloInput}
          placeholder="Digite o nome completo"
          placeholderTextColor={cores.textoSecundario}
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
          autoCorrect={false}
        />

        <Text style={[styles.label, { color: cores.texto }]}>
          E-mail
        </Text>
        <TextInput
          style={estiloInput}
          placeholder="Digite o e-mail"
          placeholderTextColor={cores.textoSecundario}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={[styles.label, { color: cores.texto }]}>
          Senha
        </Text>

        <View style={styles.campoSenha}>
          <TextInput
            style={[
              estiloInput,
              styles.inputSenha,
              { paddingRight: 50 },
            ]}
            placeholder="Mínimo de 8 caracteres"
            placeholderTextColor={cores.textoSecundario}
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!mostrarSenha}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={styles.botaoOlho}
            onPress={() => setMostrarSenha(!mostrarSenha)}
          >
            <Ionicons
              name={mostrarSenha ? "eye-off-outline" : "eye-outline"}
              size={23}
              color={cores.textoSecundario}
            />
          </TouchableOpacity>
        </View>

        <Text style={[styles.label, { color: cores.texto }]}>
          Cargo
        </Text>

        <View
          style={[
            styles.seletor,
            {
              backgroundColor: cores.input,
              borderColor: cores.borda,
            },
          ]}
        >
          <Picker
            selectedValue={cargo}
            onValueChange={setCargo}
            style={{ color: cores.texto }}
            dropdownIconColor={cores.texto}
          >
            {cargos.map((item) => (
              <Picker.Item
                key={item}
                label={item}
                value={item}
                color={cores.texto}
              />
            ))}
          </Picker>
        </View>

        <Text style={[styles.label, { color: cores.texto }]}>
          Perfil de acesso
        </Text>

        <View
          style={[
            styles.seletor,
            {
              backgroundColor: cores.input,
              borderColor: cores.borda,
            },
          ]}
        >
          <Picker
            selectedValue={perfilAcesso}
            onValueChange={setPerfilAcesso}
            style={{ color: cores.texto }}
            dropdownIconColor={cores.texto}
          >
            {perfis.map((item) => (
              <Picker.Item
                key={item}
                label={item === "Funcionario" ? "Funcionário" : item}
                value={item}
                color={cores.texto}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[
              styles.botaoCancelar,
              { borderColor: cores.borda },
            ]}
            onPress={voltarAdministracao}
            disabled={carregando}
          >
            <Text style={[styles.textoCancelar, { color: cores.texto }]}>
              Cancelar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.botaoCadastrar,
              { backgroundColor: cores.primario },
              carregando && styles.botaoDesabilitado,
            ]}
            onPress={handleCadastrar}
            disabled={carregando}
          >
            {carregando ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.textoCadastrar}>
                Cadastrar
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  conteudo: {
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 40,
  },

  topo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  botaoVoltar: {
    marginRight: 12,
    padding: 4,
  },

  titulo: {
    fontSize: 24,
    fontWeight: "600",
  },

  subtitulo: {
    fontSize: 14,
    marginBottom: 25,
    lineHeight: 21,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 13,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 13,
    fontSize: 15,
  },

  campoSenha: {
    justifyContent: "center",
  },

  inputSenha: {
    width: "100%",
  },

  botaoOlho: {
    position: "absolute",
    right: 13,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  seletor: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    overflow: "hidden",
  },

  botoesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 30,
  },

  botaoCancelar: {
    flex: 1,
    height: 49,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  textoCancelar: {
    fontSize: 15,
    fontWeight: "600",
  },

  botaoCadastrar: {
    flex: 1,
    height: 49,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  textoCadastrar: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  botaoDesabilitado: {
    opacity: 0.6,
  },
});
