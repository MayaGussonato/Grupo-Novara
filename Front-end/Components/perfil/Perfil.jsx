
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

import { perfilStyles as styles } from "./PerfilStyles";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useTema } from "../tema/TemaContext";
import { useAuth } from "../../Services/AuthContext";

import {
  buscarMeuPerfil,
  atualizarMeuTelefone,
} from "../../Services/usuarioService";

// Formata o telefone automaticamente.
function formatarTelefone(valor) {
  const numeros = String(valor || "")
    .replace(/\D/g, "")
    .slice(0, 11);

  if (numeros.length <= 2) {
    return numeros;
  }

  if (numeros.length <= 6) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
  }

  if (numeros.length <= 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }

  return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
}

export default function Perfil({ navigation }) {
  const [aba, setAba] = useState("Perfil");
  const [deslogando, setDeslogando] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  const {
    cores,
    modoEscuro,
    alternarTema,
  } = useTema();

  // Obtém a função de sair diretamente do contexto de autenticação.
  const { sair } = useAuth();

  // Busca os dados reais do usuário na API.
  async function carregarPerfil() {
    try {
      setCarregando(true);

      const resposta = await buscarMeuPerfil();

      setNome(
        resposta?.nome ||
        resposta?.Nome ||
        ""
      );

      setEmail(
        resposta?.email ||
        resposta?.Email ||
        ""
      );

      setCargo(
        resposta?.cargo ||
        resposta?.Cargo ||
        ""
      );

      const telefoneApi =
        resposta?.telefone ||
        resposta?.Telefone ||
        "";

      setTelefone(formatarTelefone(telefoneApi));

    } catch (erro) {
      Alert.alert(
        "Erro",
        erro.message ||
        "Não foi possível carregar seu perfil."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  // Salva o telefone na API.
  async function salvarAlteracoes() {
    const telefoneNumerico = telefone.replace(/\D/g, "");

    if (
      telefoneNumerico.length !== 10 &&
      telefoneNumerico.length !== 11
    ) {
      Alert.alert(
        "Telefone inválido",
        "Informe um telefone com DDD e número."
      );

      return;
    }

    if (salvando) return;

    try {
      setSalvando(true);

      const resposta = await atualizarMeuTelefone(
        telefoneNumerico
      );

      const telefoneSalvo =
        resposta?.telefone ??
        resposta?.Telefone ??
        telefoneNumerico;

      setTelefone(formatarTelefone(telefoneSalvo));

      Alert.alert(
        "Sucesso",
        "Seu telefone foi atualizado no cadastro!"
      );

    } catch (erro) {
      Alert.alert(
        "Erro ao salvar",
        erro.message ||
        "Não foi possível atualizar seu telefone."
      );
    } finally {
      setSalvando(false);
    }
  }

  // Encerra a sessão. No navegador, usa a confirmação nativa do browser;
  // no celular, mantém o Alert do React Native.
  async function executarLogout() {
    if (deslogando) return;

    if (typeof sair !== "function") {
      const mensagem =
        "A função sair não está disponível no AuthContext. Confira o Provider de autenticação.";
      console.error(mensagem);

      if (Platform.OS === "web") {
        window.alert(mensagem);
      } else {
        Alert.alert("Erro ao deslogar", mensagem);
      }
      return;
    }

    try {
      setDeslogando(true);
      await sair();
      // O AuthContext limpa o token e define usuario como null.
      // O App.jsx então apresenta a tela de Login.
    } catch (erro) {
      console.error("Erro ao deslogar:", erro);

      const mensagem =
        erro?.message || "Não foi possível encerrar sua sessão.";

      if (Platform.OS === "web") {
        window.alert(mensagem);
      } else {
        Alert.alert("Erro ao deslogar", mensagem);
      }
      setDeslogando(false);
    }
  }

  function confirmarDeslogar() {
    if (deslogando) return;

    if (Platform.OS === "web") {
      const confirmou = window.confirm(
        "Tem certeza de que deseja sair da sua conta?"
      );

      if (confirmou) {
        executarLogout();
      }
      return;
    }

    Alert.alert(
      "Deslogar",
      "Tem certeza de que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deslogar",
          style: "destructive",
          onPress: executarLogout,
        },
      ]
    );
  }

  const corTexto = cores.texto;
  const corSecundaria = cores.textoSecundario;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cores.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Header
          navigation={navigation}
          titulo="Meu Perfil"
        />

        <View style={styles.sim}>
          <Text
            style={[
              styles.subtitulo,
              { color: corSecundaria },
            ]}
          >
            Gerencie suas informações e preferências
          </Text>
        </View>

        {/* Modo escuro */}
        <TouchableOpacity
          style={[
            styles.botaoTema,
            {
              backgroundColor: cores.card,
              borderColor: cores.borda,
            },
          ]}
          onPress={alternarTema}
        >
          <View style={styles.infoTema}>
            <Ionicons
              name={modoEscuro ? "moon" : "sunny"}
              size={20}
              color={cores.primario}
            />

            <Text
              style={[
                styles.textoTema,
                { color: corTexto },
              ]}
            >
              Modo escuro
            </Text>
          </View>

          <Ionicons
            name={
              modoEscuro
                ? "toggle"
                : "toggle-outline"
            }
            size={30}
            color={cores.primario}
          />
        </TouchableOpacity>

        {/* Abas */}
        <View style={styles.abas}>
          <TouchableOpacity
            style={styles.aba}
            onPress={() => setAba("Perfil")}
          >
            <Text
              style={[
                styles.textoAba,
                { color: corTexto },
                aba === "Perfil" && styles.abaAtiva,
              ]}
            >
              Perfil
            </Text>

            {aba === "Perfil" && (
              <View
                style={[
                  styles.linhaAtiva,
                  { backgroundColor: cores.vinho },
                ]}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.aba}
            onPress={() => setAba("Segurança")}
          >
            <Text
              style={[
                styles.textoAba,
                { color: corTexto },
                aba === "Segurança" && styles.abaAtiva,
              ]}
            >
              Segurança
            </Text>

            {aba === "Segurança" && (
              <View
                style={[
                  styles.linhaAtiva,
                  { backgroundColor: cores.vinho },
                ]}
              />
            )}
          </TouchableOpacity>
        </View>

        {/* Conteúdo */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: cores.card,
              borderColor: cores.borda,
            },
          ]}
        >
          {carregando ? (
            <ActivityIndicator
              size="large"
              color={cores.primario}
              style={{ marginVertical: 40 }}
            />
          ) : aba === "Perfil" ? (
            <>
              {/* Informações do usuário */}
              <View style={styles.usuario}>
                <View
                  style={[
                    styles.fotoContainer,
                    {
                      backgroundColor: cores.secundario,
                    },
                  ]}
                >
                  <Text style={styles.iniciais}>
                    {nome
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((parte) => parte[0])
                      .join("")
                      .toUpperCase() || "U"}
                  </Text>

                  <TouchableOpacity
                    style={styles.botaoFoto}
                  >
                    <Ionicons
                      name="camera"
                      size={13}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[
                    styles.nomeUsuario,
                    { color: corTexto },
                  ]}
                >
                  {nome}
                </Text>

                <Text
                  style={[
                    styles.cargoUsuario,
                    { color: corSecundaria },
                  ]}
                >
                  {cargo || "Sem cargo informado"}
                </Text>
              </View>

              {/* Formulário */}
              <View style={styles.formulario}>
                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    Nome completo
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: cores.input,
                        borderColor: cores.borda,
                        color: corSecundaria,
                      },
                    ]}
                    value={nome}
                    editable={false}
                  />
                </View>

                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    E-mail
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: cores.input,
                        borderColor: cores.borda,
                        color: corSecundaria,
                      },
                    ]}
                    value={email}
                    editable={false}
                    keyboardType="email-address"
                  />
                </View>

                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    Cargo
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: cores.input,
                        borderColor: cores.borda,
                        color: corSecundaria,
                      },
                    ]}
                    value={cargo}
                    editable={false}
                  />
                </View>

                {/* Telefone editável */}
                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    Telefone
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: cores.input,
                        borderColor: cores.borda,
                        color: corTexto,
                      },
                    ]}
                    value={telefone}
                    onChangeText={(valor) =>
                      setTelefone(formatarTelefone(valor))
                    }
                    keyboardType="phone-pad"
                    placeholder="(00) 00000-0000"
                    placeholderTextColor={corSecundaria}
                    maxLength={15}
                    editable={!salvando}
                  />
                </View>
              </View>

              {/* Salvar */}
              <TouchableOpacity
                style={[
                  styles.botaoSalvar,
                  {
                    backgroundColor: cores.vinho,
                    opacity: salvando ? 0.7 : 1,
                  },
                ]}
                onPress={salvarAlteracoes}
                disabled={salvando}
              >
                {salvando ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.textoBotao}>
                    Salvar alterações
                  </Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            /* Aba Segurança */
            <View style={styles.seguranca}>
              <Text
                style={[
                  styles.tituloSeguranca,
                  { color: corTexto },
                ]}
              >
                Segurança da conta
              </Text>

              <Text
                style={[
                  styles.labelSeguranca,
                  { color: corTexto },
                ]}
              >
                Senha atual
              </Text>

              <TextInput
                style={[
                  styles.inputSeguranca,
                  {
                    backgroundColor: cores.input,
                    borderColor: cores.borda,
                    color: corTexto,
                  },
                ]}
                placeholder="Digite sua senha atual"
                placeholderTextColor={corSecundaria}
                secureTextEntry
              />

              <Text
                style={[
                  styles.labelSeguranca,
                  { color: corTexto },
                ]}
              >
                Nova senha
              </Text>

              <TextInput
                style={[
                  styles.inputSeguranca,
                  {
                    backgroundColor: cores.input,
                    borderColor: cores.borda,
                    color: corTexto,
                  },
                ]}
                placeholder="Digite sua nova senha"
                placeholderTextColor={corSecundaria}
                secureTextEntry
              />

              <Text
                style={[
                  styles.labelSeguranca,
                  { color: corTexto },
                ]}
              >
                Confirmar senha
              </Text>

              <TextInput
                style={[
                  styles.inputSeguranca,
                  {
                    backgroundColor: cores.input,
                    borderColor: cores.borda,
                    color: corTexto,
                  },
                ]}
                placeholder="Confirme sua nova senha"
                placeholderTextColor={corSecundaria}
                secureTextEntry
              />

              <TouchableOpacity
                style={[
                  styles.botaoSalvar,
                  { backgroundColor: cores.vinho },
                ]}
              >
                <Text style={styles.textoBotao}>
                  Alterar senha
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Botão de deslogar - preserva as demais funções do perfil */}
        <TouchableOpacity
          onPress={confirmarDeslogar}
          disabled={deslogando}
          activeOpacity={0.8}
          style={{
            backgroundColor: cores.vinho,
            borderRadius: 8,
            paddingVertical: 14,
            paddingHorizontal: 18,
            marginTop: 18,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "center",
            opacity: deslogando ? 0.65 : 1,
          }}
        >
          {deslogando ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              Deslogar
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
}
