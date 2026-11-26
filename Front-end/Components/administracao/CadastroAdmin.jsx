
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { useTema } from "../tema/TemaContext";

import { cadastroAdminStyles as styles } from "./CadastroAdminStyles";

import {
  cadastrarUsuario,
  alterarPerfilUsuario,
  listarUsuarios,
} from "../../Services/usuarioService";

export default function CadastroAdmin({
  navigation,
  onCancelar,
  onSucesso,
}) {
  const { cores } = useTema();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cargo, setCargo] = useState("Analista");
  const [perfilAcesso, setPerfilAcesso] = useState("Funcionario");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [seletorAberto, setSeletorAberto] = useState(null);

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

    if (senha.length > 72) {
      Alert.alert(
        "Senha inválida",
        "A senha não pode ultrapassar 72 caracteres."
      );
      return;
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email.trim()
    );

    if (!emailValido) {
      Alert.alert(
        "E-mail inválido",
        "Digite um endereço de e-mail válido."
      );
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

      // Cadastra o usuário sem entrar na conta dele.
      const resposta = await cadastrarUsuario(dados);

      let idUsuario = obterIdUsuario(resposta);

      // Caso a API não retorne o identificador,
      // procura o usuário cadastrado pela lista.
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
            String(
              usuario.email ?? usuario.Email ?? ""
            ).toLowerCase() === email.trim().toLowerCase()
        );

        idUsuario = obterIdUsuario(usuarioEncontrado);
      }

      if (!idUsuario) {
        throw new Error(
          "O usuário foi cadastrado, mas não foi possível localizar seu identificador para definir o perfil."
        );
      }

      // A API cria inicialmente o perfil Funcionario.
      // Aqui aplicamos o perfil escolhido usando a sessão do administrador.
      if (perfilAcesso !== "Funcionario") {
        await alterarPerfilUsuario(
          idUsuario,
          perfilAcesso
        );
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
      console.log(
        "Erro ao cadastrar administrador:",
        erro
      );

      Alert.alert(
        "Erro no cadastro",
        erro?.message ||
          "Não foi possível cadastrar o usuário. Verifique os dados e tente novamente."
      );
    } finally {
      setCarregando(false);
    }
  }

  function renderSeletor(
    titulo,
    valor,
    opcoes,
    alterar,
    identificador
  ) {
    return (
      <>
        <TouchableOpacity
          style={[
            styles.seletor,
            {
              backgroundColor: cores.input,
              borderColor: cores.borda,
            },
          ]}
          onPress={() => setSeletorAberto(identificador)}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.textoSeletor,
              { color: cores.texto },
            ]}
          >
            {valor === "Funcionario"
              ? "Funcionário"
              : valor}
          </Text>

          <Ionicons
            name="chevron-down"
            size={21}
            color={cores.textoSecundario}
          />
        </TouchableOpacity>

        <Modal
          visible={seletorAberto === identificador}
          transparent
          animationType="fade"
          statusBarTranslucent
          onRequestClose={() => setSeletorAberto(null)}
        >
          <View style={styles.modalFundo}>
            <TouchableOpacity
              style={styles.modalFundoToque}
              activeOpacity={1}
              onPress={() => setSeletorAberto(null)}
            />

            <View
              style={[
                styles.modalConteudo,
                {
                  backgroundColor: cores.card,
                  borderColor: cores.borda,
                },
              ]}
            >
              <Text
                style={[
                  styles.modalTitulo,
                  { color: cores.texto },
                ]}
              >
                {titulo}
              </Text>

              {opcoes.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={[
                    styles.opcaoSeletor,
                    {
                      backgroundColor:
                        valor === item
                          ? cores.input
                          : "transparent",
                    },
                  ]}
                  onPress={() => {
                    alterar(item);
                    setSeletorAberto(null);
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.textoOpcao,
                      { color: cores.texto },
                    ]}
                  >
                    {item === "Funcionario"
                      ? "Funcionário"
                      : item}
                  </Text>

                  {valor === item && (
                    <Ionicons
                      name="checkmark"
                      size={21}
                      color={cores.primario}
                    />
                  )}
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.botaoFechar}
                onPress={() => setSeletorAberto(null)}
              >
                <Text
                  style={[
                    styles.textoFechar,
                    { color: cores.primario },
                  ]}
                >
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </>
    );
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
    <View
      style={[
        styles.container,
        { backgroundColor: cores.background },
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.conteudo}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
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

          <Text
            style={[
              styles.titulo,
              { color: cores.texto },
            ]}
          >
            Cadastrar usuário
          </Text>
        </View>

        <Text
          style={[
            styles.subtitulo,
            { color: cores.textoSecundario },
          ]}
        >
          Preencha os dados para adicionar um novo usuário ao sistema.
        </Text>

        {/* Nome */}
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

        {/* E-mail */}
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

        {/* Senha */}
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

        {/* Cargo */}
        <Text style={[styles.label, { color: cores.texto }]}>
          Cargo
        </Text>

        {renderSeletor(
          "Cargo",
          cargo,
          cargos,
          setCargo,
          "cargo"
        )}

        {/* Perfil de acesso */}
        <Text style={[styles.label, { color: cores.texto }]}>
          Perfil de acesso
        </Text>

        {renderSeletor(
          "Perfil de acesso",
          perfilAcesso,
          perfis,
          setPerfilAcesso,
          "perfil"
        )}

        {/* Botões */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity
            style={[
              styles.botaoCancelar,
              { borderColor: cores.borda },
            ]}
            onPress={voltarAdministracao}
            disabled={carregando}
          >
            <Text
              style={[
                styles.textoCancelar,
                { color: cores.texto },
              ]}
            >
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
