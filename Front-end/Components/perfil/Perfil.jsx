
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
  Modal,
  Image,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system/legacy";

import { perfilStyles as styles } from "./PerfilStyles";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useTema } from "../tema/TemaContext";
import { useAuth } from "../../Services/AuthContext";

import { useIdioma } from "../idioma/IdiomaContext";
import SeletorIdioma from "../idioma/SeletorIdioma";

import {
  buscarMeuPerfil,
  atualizarMeuTelefone,
} from "../../Services/usuarioService";

const CHAVE_FOTO_PERFIL = "@grupo_novara:foto_perfil";
const TAMANHO_EDITOR = 280;

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
  const [modalLogout, setModalLogout] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefone, setTelefone] = useState("");

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  // Foto de perfil.
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [modalFoto, setModalFoto] = useState(false);
  const [carregandoFoto, setCarregandoFoto] = useState(false);

  // Editor de foto.
  const [modalEditor, setModalEditor] = useState(false);
  const [imagemOriginal, setImagemOriginal] = useState(null);
  const [dimensoesImagem, setDimensoesImagem] = useState(null);

  const [zoom, setZoom] = useState(1);
  const [deslocamentoX, setDeslocamentoX] = useState(0);
  const [deslocamentoY, setDeslocamentoY] = useState(0);

  const {
    cores,
    modoEscuro,
    alternarTema,
  } = useTema();

  const { sair } = useAuth();
  const { t } = useIdioma();

  // --------------------------------------------------
  // CARREGAR PERFIL
  // --------------------------------------------------

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
        t("erro"),
        erro.message || "Não foi possível carregar seu perfil."
      );
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  // --------------------------------------------------
  // CARREGAR FOTO SALVA
  // --------------------------------------------------

  async function carregarFotoSalva() {
    try {
      const fotoSalva = await AsyncStorage.getItem(
        CHAVE_FOTO_PERFIL
      );

      if (fotoSalva) {
        setFotoPerfil(fotoSalva);
      }
    } catch (erro) {
      console.error("Erro ao carregar foto:", erro);
    }
  }

  useEffect(() => {
    carregarFotoSalva();
  }, []);

  // --------------------------------------------------
  // SALVAR TELEFONE NA API
  // --------------------------------------------------

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
        t("sucesso"),
        "Seu telefone foi atualizado no cadastro!"
      );

    } catch (erro) {
      Alert.alert(
        t("erro"),
        erro.message || "Não foi possível atualizar seu telefone."
      );
    } finally {
      setSalvando(false);
    }
  }

  // --------------------------------------------------
  // FOTO: ABRIR EDITOR
  // --------------------------------------------------

  function abrirEditor(uri) {
    Image.getSize(
      uri,
      (largura, altura) => {
        setImagemOriginal(uri);

        setDimensoesImagem({
          largura,
          altura,
        });

        setZoom(1);
        setDeslocamentoX(0);
        setDeslocamentoY(0);

        setModalEditor(true);
      },
      () => {
        Alert.alert(
          "Erro",
          "Não foi possível abrir essa imagem."
        );
      }
    );
  }

  // --------------------------------------------------
  // FOTO: GALERIA
  // --------------------------------------------------

  async function selecionarDaGaleria() {
    try {
      const permissao =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à galeria para escolher uma foto."
        );

        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: false,
          quality: 1,
        });

      if (resultado.canceled || !resultado.assets?.length) {
        return;
      }

      const imagem = resultado.assets[0];

      setModalFoto(false);
      abrirEditor(imagem.uri);

    } catch (erro) {
      console.error("Erro ao selecionar imagem:", erro);

      Alert.alert(
        "Erro",
        "Não foi possível selecionar a imagem."
      );
    }
  }

  // --------------------------------------------------
  // FOTO: CÂMERA
  // --------------------------------------------------

  async function tirarFoto() {
    try {
      const permissao =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permissao.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à câmera para tirar uma foto."
        );

        return;
      }

      const resultado =
        await ImagePicker.launchCameraAsync({
          mediaTypes: ["images"],
          allowsEditing: false,
          quality: 1,
        });

      if (resultado.canceled || !resultado.assets?.length) {
        return;
      }

      const imagem = resultado.assets[0];

      setModalFoto(false);
      abrirEditor(imagem.uri);

    } catch (erro) {
      console.error("Erro ao tirar foto:", erro);

      Alert.alert(
        "Erro",
        "Não foi possível abrir a câmera."
      );
    }
  }

  // --------------------------------------------------
  // EDITOR: DIMENSÕES E POSICIONAMENTO
  // --------------------------------------------------

  function obterEscalaBase() {
    if (!dimensoesImagem) return 1;

    return Math.max(
      TAMANHO_EDITOR / dimensoesImagem.largura,
      TAMANHO_EDITOR / dimensoesImagem.altura
    );
  }

  function moverImagem(direcao, valor) {
    if (!dimensoesImagem) return;

    const escala = obterEscalaBase() * zoom;

    const larguraRenderizada =
      dimensoesImagem.largura * escala;

    const alturaRenderizada =
      dimensoesImagem.altura * escala;

    const limiteX = Math.max(
      0,
      (larguraRenderizada - TAMANHO_EDITOR) / 2
    );

    const limiteY = Math.max(
      0,
      (alturaRenderizada - TAMANHO_EDITOR) / 2
    );

    if (direcao === "x") {
      setDeslocamentoX((atual) =>
        Math.max(
          -limiteX,
          Math.min(limiteX, atual + valor)
        )
      );
    }

    if (direcao === "y") {
      setDeslocamentoY((atual) =>
        Math.max(
          -limiteY,
          Math.min(limiteY, atual + valor)
        )
      );
    }
  }

  function alterarZoom(valor) {
    setZoom((atual) => {
      const novoZoom = Math.max(
        1,
        Math.min(3, Number((atual + valor).toFixed(1)))
      );

      return novoZoom;
    });

    setDeslocamentoX(0);
    setDeslocamentoY(0);
  }

  // --------------------------------------------------
  // EDITOR: SALVAR FOTO RECORTADA
  // --------------------------------------------------

  async function confirmarEdicaoFoto() {
    if (!imagemOriginal || !dimensoesImagem) return;

    try {
      setCarregandoFoto(true);

      const largura = dimensoesImagem.largura;
      const altura = dimensoesImagem.altura;

      const escalaFinal = obterEscalaBase() * zoom;

      const ladoRecorte = TAMANHO_EDITOR / escalaFinal;

      const origemX = Math.max(
        0,
        Math.min(
          largura - ladoRecorte,
          (largura - ladoRecorte) / 2 -
            deslocamentoX / escalaFinal
        )
      );

      const origemY = Math.max(
        0,
        Math.min(
          altura - ladoRecorte,
          (altura - ladoRecorte) / 2 -
            deslocamentoY / escalaFinal
        )
      );

      const resultado =
        await ImageManipulator.manipulateAsync(
          imagemOriginal,
          [
            {
              crop: {
                originX: Math.round(origemX),
                originY: Math.round(origemY),
                width: Math.max(1, Math.round(ladoRecorte)),
                height: Math.max(1, Math.round(ladoRecorte)),
              },
            },
            {
              resize: {
                width: 600,
                height: 600,
              },
            },
          ],
          {
            compress: 0.85,
            format: ImageManipulator.SaveFormat.JPEG,
            base64: Platform.OS === "web",
          }
        );

      let uriFinal = resultado.uri;

      // No navegador, salva como imagem Base64 para
      // que a foto continue disponível após atualizar a página.
      if (Platform.OS === "web") {
        if (resultado.base64) {
          uriFinal = `data:image/jpeg;base64,${resultado.base64}`;
        }
      } else {
        // No celular, copia a imagem para a pasta permanente.
        const destino =
          `${FileSystem.documentDirectory}foto_perfil_${Date.now()}.jpg`;

        await FileSystem.copyAsync({
          from: resultado.uri,
          to: destino,
        });

        uriFinal = destino;
      }

      await AsyncStorage.setItem(
        CHAVE_FOTO_PERFIL,
        uriFinal
      );

      setFotoPerfil(uriFinal);

      setModalEditor(false);
      setModalFoto(false);

      setImagemOriginal(null);
      setDimensoesImagem(null);

      Alert.alert(
        "Sucesso",
        "Sua foto de perfil foi atualizada!"
      );

    } catch (erro) {
      console.error("Erro ao editar foto:", erro);

      Alert.alert(
        "Erro",
        erro.message || "Não foi possível salvar a foto."
      );
    } finally {
      setCarregandoFoto(false);
    }
  }

  // --------------------------------------------------
  // REMOVER FOTO
  // --------------------------------------------------

  async function removerFoto() {
    try {
      await AsyncStorage.removeItem(CHAVE_FOTO_PERFIL);

      setFotoPerfil(null);
      setModalFoto(false);

      Alert.alert(
        "Foto removida",
        "Sua foto de perfil foi removida."
      );

    } catch (erro) {
      console.error("Erro ao remover foto:", erro);

      Alert.alert(
        "Erro",
        "Não foi possível remover a foto."
      );
    }
  }

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  async function executarLogout() {
    if (deslogando) return;

    if (typeof sair !== "function") {
      const mensagem =
        "A função sair não está disponível no AuthContext. Confira o Provider de autenticação.";

      console.error(mensagem);

      if (Platform.OS === "web") {
        window.alert(mensagem);
      } else {
        Alert.alert(t("erro"), mensagem);
      }

      return;
    }

    try {
      setDeslogando(true);

      await sair();

    } catch (erro) {
      console.error("Erro ao deslogar:", erro);

      const mensagem =
        erro?.message || "Não foi possível encerrar sua sessão.";

      if (Platform.OS === "web") {
        window.alert(mensagem);
      } else {
        Alert.alert(t("erro"), mensagem);
      }

      setDeslogando(false);
    }
  }

  function confirmarDeslogar() {
    if (deslogando) return;

    setModalLogout(true);
  }

  // --------------------------------------------------
  // CORES
  // --------------------------------------------------

  const corTexto = cores.texto;
  const corSecundaria = cores.textoSecundario;

  // --------------------------------------------------
  // PRÉ-VISUALIZAÇÃO DO EDITOR
  // --------------------------------------------------

  const escalaPreview = obterEscalaBase() * zoom;

  const larguraPreview = dimensoesImagem
    ? dimensoesImagem.largura * escalaPreview
    : TAMANHO_EDITOR;

  const alturaPreview = dimensoesImagem
    ? dimensoesImagem.altura * escalaPreview
    : TAMANHO_EDITOR;

  // --------------------------------------------------
  // TELA
  // --------------------------------------------------

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
          titulo={t("meuPerfil")}
        />

        <View style={styles.sim}>
          <Text
            style={[
              styles.subtitulo,
              { color: corSecundaria },
            ]}
          >
            {t("gerenciePerfil")}
          </Text>
        </View>

        {/* MODO ESCURO */}

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
              {t("modoEscuro")}
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

        {/* PREFERÊNCIAS DE IDIOMA */}

        <View
          style={{
            backgroundColor: cores.card,
            borderColor: cores.borda,
            borderWidth: 1,
            borderRadius: 8,
            padding: 13,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              color: corTexto,
              fontSize: 14,
              fontWeight: "600",
              marginBottom: 12,
            }}
          >
            {t("preferencias")}
          </Text>

          <SeletorIdioma />
        </View>

        {/* ABAS */}

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
              {t("perfil")}
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
              {t("seguranca")}
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

        {/* CONTEÚDO */}

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
              {/* INFORMAÇÕES DO USUÁRIO */}

              <View style={styles.usuario}>
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setModalFoto(true)}
                >
                  <View
                    style={[
                      styles.fotoContainer,
                      {
                        backgroundColor: cores.secundario,
                        overflow: "visible",
                      },
                    ]}
                  >
                    {fotoPerfil ? (
                      <Image
                        source={{ uri: fotoPerfil }}
                        style={{
                          width: 62,
                          height: 62,
                          borderRadius: 35,
                        }}
                        resizeMode="cover"
                      />
                    ) : (
                      <Text style={styles.iniciais}>
                        {nome
                          .split(" ")
                          .filter(Boolean)
                          .slice(0, 2)
                          .map((parte) => parte[0])
                          .join("")
                          .toUpperCase() || "U"}
                      </Text>
                    )}

                    <View
                      style={[
                        styles.botaoFoto,
                        {
                          backgroundColor: cores.primario,
                        },
                      ]}
                    >
                      <Ionicons
                        name="camera"
                        size={13}
                        color="#FFFFFF"
                      />
                    </View>
                  </View>
                </TouchableOpacity>

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

              {/* FORMULÁRIO */}

              <View style={styles.formulario}>
                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    {t("nomeCompleto")}
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
                    {t("email")}
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

                {/* TELEFONE */}

                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    {t("telefone")}
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

              {/* SALVAR ALTERAÇÕES */}

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
                    {t("salvarAlteracoes")}
                  </Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            /* ABA SEGURANÇA */

            <View style={styles.seguranca}>
              <Text
                style={[
                  styles.tituloSeguranca,
                  { color: corTexto },
                ]}
              >
                {t("seguranca")}
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

        {/* BOTÃO DE DESLOGAR */}

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
              {t("deslogar")}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* ==========================================
          MODAL DE FOTO
      ========================================== */}

      <Modal
        visible={modalFoto}
        transparent
        animationType="fade"
        onRequestClose={() => setModalFoto(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.65)",
            justifyContent: "center",
            alignItems: "center",
            padding: 25,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 340,
              backgroundColor: cores.card,
              borderRadius: 15,
              padding: 20,
              borderWidth: 1,
              borderColor: cores.borda,
            }}
          >
            <Text
              style={{
                color: cores.texto,
                fontSize: 19,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              Foto de perfil
            </Text>

            <TouchableOpacity
              onPress={selecionarDaGaleria}
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 13,
                gap: 12,
              }}
            >
              <Ionicons
                name="images-outline"
                size={23}
                color={cores.primario}
              />

              <Text style={{ color: cores.texto, fontSize: 14 }}>
                Escolher da galeria
              </Text>
            </TouchableOpacity>

            {Platform.OS !== "web" && (
              <TouchableOpacity
                onPress={tirarFoto}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 13,
                  gap: 12,
                }}
              >
                <Ionicons
                  name="camera-outline"
                  size={23}
                  color={cores.primario}
                />

                <Text style={{ color: cores.texto, fontSize: 14 }}>
                  Tirar uma foto
                </Text>
              </TouchableOpacity>
            )}

            {fotoPerfil && (
              <TouchableOpacity
                onPress={removerFoto}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  padding: 13,
                  gap: 12,
                }}
              >
                <Ionicons
                  name="trash-outline"
                  size={23}
                  color="#C0392B"
                />

                <Text style={{ color: "#C0392B", fontSize: 14 }}>
                  Remover foto atual
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setModalFoto(false)}
              style={{
                marginTop: 12,
                padding: 13,
                borderRadius: 8,
                backgroundColor: cores.vinho,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontWeight: "600",
                }}
              >
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ==========================================
          MODAL DO EDITOR DE FOTO
      ========================================== */}

      <Modal
        visible={modalEditor}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!carregandoFoto) {
            setModalEditor(false);
          }
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.94)",
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 25,
            }}
            showsVerticalScrollIndicator={false}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 21,
                fontWeight: "bold",
                marginBottom: 8,
              }}
            >
              Editar foto
            </Text>

            <Text
              style={{
                color: "#CCCCCC",
                fontSize: 12,
                marginBottom: 22,
                textAlign: "center",
              }}
            >
              Ajuste o enquadramento da sua imagem.
            </Text>

            {/* PRÉ-VISUALIZAÇÃO */}

            {imagemOriginal && dimensoesImagem && (
              <View
                style={{
                  width: TAMANHO_EDITOR,
                  height: TAMANHO_EDITOR,
                  borderRadius: TAMANHO_EDITOR / 2,
                  overflow: "hidden",
                  backgroundColor: "#222222",
                  borderWidth: 2,
                  borderColor: "#FFFFFF",
                }}
              >
                <Image
                  source={{ uri: imagemOriginal }}
                  style={{
                    position: "absolute",
                    width: larguraPreview,
                    height: alturaPreview,

                    left:
                      (TAMANHO_EDITOR - larguraPreview) / 2 +
                      deslocamentoX,

                    top:
                      (TAMANHO_EDITOR - alturaPreview) / 2 +
                      deslocamentoY,
                  }}
                  resizeMode="stretch"
                />
              </View>
            )}

            {/* CONTROLE DE ZOOM */}

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: "600",
                marginTop: 25,
                marginBottom: 12,
              }}
            >
              Zoom: {zoom.toFixed(1)}x
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: 35,
              }}
            >
              <TouchableOpacity
                onPress={() => alterarZoom(-0.1)}
                disabled={zoom <= 1}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={38}
                  color={zoom <= 1 ? "#777777" : "#FFFFFF"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => alterarZoom(0.1)}
                disabled={zoom >= 3}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={38}
                  color={zoom >= 3 ? "#777777" : "#FFFFFF"}
                />
              </TouchableOpacity>
            </View>

            {/* CONTROLE DE POSICIONAMENTO */}

            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 14,
                fontWeight: "600",
                marginTop: 25,
                marginBottom: 12,
              }}
            >
              Posicionar imagem
            </Text>

            <View style={{ alignItems: "center", gap: 8 }}>
              <TouchableOpacity
                onPress={() => moverImagem("y", -10)}
              >
                <Ionicons
                  name="chevron-up-circle"
                  size={38}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 35,
                }}
              >
                <TouchableOpacity
                  onPress={() => moverImagem("x", -10)}
                >
                  <Ionicons
                    name="chevron-back-circle"
                    size={38}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => moverImagem("x", 10)}
                >
                  <Ionicons
                    name="chevron-forward-circle"
                    size={38}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => moverImagem("y", 10)}
              >
                <Ionicons
                  name="chevron-down-circle"
                  size={38}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>

            {/* REINICIAR POSIÇÃO */}

            <TouchableOpacity
              onPress={() => {
                setZoom(1);
                setDeslocamentoX(0);
                setDeslocamentoY(0);
              }}
              style={{
                marginTop: 18,
                padding: 9,
              }}
            >
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 12,
                  textDecorationLine: "underline",
                }}
              >
                Restaurar enquadramento
              </Text>
            </TouchableOpacity>

            {/* BOTÕES */}

            <View
              style={{
                flexDirection: "row",
                gap: 12,
                marginTop: 25,
                width: "100%",
                maxWidth: 320,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalEditor(false);
                  setImagemOriginal(null);
                  setDimensoesImagem(null);
                }}
                disabled={carregandoFoto}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#FFFFFF",
                  alignItems: "center",
                  opacity: carregandoFoto ? 0.5 : 1,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "600",
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={confirmarEdicaoFoto}
                disabled={carregandoFoto}
                style={{
                  flex: 1,
                  padding: 14,
                  borderRadius: 8,
                  backgroundColor: "#650000",
                  alignItems: "center",
                  opacity: carregandoFoto ? 0.7 : 1,
                }}
              >
                {carregandoFoto ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "600",
                    }}
                  >
                    Salvar foto
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Modal>

      {/* ==========================================
          MODAL DE CONFIRMAÇÃO DE LOGOUT
      ========================================== */}

      <Modal
        visible={modalLogout}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!deslogando) {
            setModalLogout(false);
          }
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.55)",
            justifyContent: "center",
            alignItems: "center",
            padding: 25,
          }}
        >
          <View
            style={{
              width: "100%",
              maxWidth: 340,
              backgroundColor: cores.card,
              borderRadius: 16,
              padding: 22,
              borderWidth: 1,
              borderColor: cores.borda,
              alignItems: "center",
            }}
          >
            <Ionicons
              name="log-out-outline"
              size={42}
              color={cores.vinho || "#650000"}
            />

            <Text
              style={{
                color: cores.texto,
                fontSize: 20,
                fontWeight: "bold",
                marginTop: 12,
                marginBottom: 8,
              }}
            >
              Sair da conta?
            </Text>

            <Text
              style={{
                color: cores.textoSecundario,
                fontSize: 14,
                textAlign: "center",
                lineHeight: 21,
                marginBottom: 24,
              }}
            >
              Tem certeza de que deseja encerrar sua sessão?
            </Text>

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                gap: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalLogout(false)}
                disabled={deslogando}
                style={{
                  flex: 1,
                  paddingVertical: 13,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: cores.borda,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: cores.texto,
                    fontWeight: "600",
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setModalLogout(false);
                  executarLogout();
                }}
                disabled={deslogando}
                style={{
                  flex: 1,
                  paddingVertical: 13,
                  borderRadius: 8,
                  backgroundColor: cores.vinho || "#650000",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "600",
                  }}
                >
                  Sair
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
}
