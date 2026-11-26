
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";

import { criarAdministracaoStyles } from "./AdministracaoStyles";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useTema } from "../tema/TemaContext";
import { useAuth } from "../../Services/AuthContext";

import {
  listarUsuarios,
  excluirUsuario,
  reativarUsuario,
  alterarPerfilUsuario,
} from "../../Services/usuarioService";

const perfisDisponiveis = [
  "Administrador",
  "Revisor",
  "Funcionario",
];

function normalizar(valor) {
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

export default function Administracao({ navigation }) {
  const [pesquisa, setPesquisa] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("Resumo");

  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const [carregando, setCarregando] = useState(true);
  const [processando, setProcessando] = useState(false);
  const [erro, setErro] = useState("");

  const { usuario: usuarioLogado } = useAuth();
  const { cores, modoEscuro } = useTema();

  const ehAdministrador =
    normalizar(usuarioLogado?.perfilAcesso) === "administrador";;

  const styles = useMemo(
    () => criarAdministracaoStyles(cores, modoEscuro),
    [cores, modoEscuro]
  );

  // Busca todos os usuários cadastrados na API.
  const carregarUsuarios = useCallback(async () => {
    try {
      setErro(null);

      const resposta = await listarUsuarios();

      const lista = Array.isArray(resposta)
        ? resposta
        : resposta?.$values || [];

      setUsuarios(
        [...lista].sort(
          (a, b) => Number(b.ativo === true) - Number(a.ativo === true)
        )
      );
    } catch (falha) {
      console.log("ERRO AO LISTAR USUÁRIOS:", falha);

      setErro(
        falha.message || "Não foi possível carregar os usuários."
      );
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  // Identifica o usuário conectado.
  const idUsuarioLogado =
    usuarioLogado?.idUsuario ??
    usuarioLogado?.IdUsuario ??
    usuarioLogado?.id;

  const emailUsuarioLogado = normalizar(
    usuarioLogado?.email ?? usuarioLogado?.Email
  );

  // Pesquisa, filtros e remoção do próprio usuário da listagem.
  const usuariosFiltrados = useMemo(() => {
    const termo = normalizar(pesquisa);

    return [...usuarios]
      .filter((usuario) => {
        const idUsuario =
          usuario.idUsuario ??
          usuario.IdUsuario ??
          usuario.id;

        const mesmoId =
          idUsuarioLogado != null &&
          idUsuario != null &&
          String(idUsuario) === String(idUsuarioLogado);

        const emailUsuario = normalizar(usuario.email);

        const mesmoEmail =
          emailUsuarioLogado !== "" &&
          emailUsuario === emailUsuarioLogado;

        // Não exibe a própria conta do administrador.
        if (mesmoId || mesmoEmail) {
          return false;
        }

        const nome = normalizar(usuario.nome);
        const email = normalizar(usuario.email);
        const perfil = normalizar(usuario.perfilAcesso);

        if (abaAtiva === "Perfil de Acesso") {
          return (
            nome.includes(termo) ||
            email.includes(termo) ||
            perfil.includes(termo)
          );
        }

        return nome.includes(termo) || email.includes(termo);
      })
      .sort((a, b) => {
        const ativoA = a.ativo === true;
        const ativoB = b.ativo === true;

        return Number(ativoB) - Number(ativoA);
      });
  }, [
    usuarios,
    pesquisa,
    abaAtiva,
    idUsuarioLogado,
    emailUsuarioLogado,
  ]);

  function abrirDetalhes(usuario) {
    setUsuarioSelecionado(usuario);
  }

  function fecharDetalhes() {
    if (!processando) {
      setUsuarioSelecionado(null);
    }
  }

  async function alterarPerfil(usuario) {
    const indice = perfisDisponiveis.indexOf(
      usuario.perfilAcesso
    );

    const proximoPerfil =
      perfisDisponiveis[
      (indice + 1 + perfisDisponiveis.length) %
      perfisDisponiveis.length
      ];

    Alert.alert(
      "Alterar perfil",
      `Deseja alterar o perfil de ${usuario.nome} para ${proximoPerfil}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Alterar",
          onPress: async () => {
            try {
              setProcessando(true);

              await alterarPerfilUsuario(
                usuario.idUsuario,
                proximoPerfil
              );

              await carregarUsuarios();
              setUsuarioSelecionado(null);

              Alert.alert(
                "Sucesso",
                "Perfil de acesso atualizado."
              );
            } catch (falha) {
              Alert.alert(
                "Erro",
                falha?.message ||
                "Não foi possível alterar o perfil."
              );
            } finally {
              setProcessando(false);
            }
          },
        },
      ]
    );
  }

  // Ativa ou inativa a conta conforme o status atual.
  function confirmarAlteracaoStatus(usuario) {
    const estaAtivo = usuario.ativo === true;

    Alert.alert(
      estaAtivo ? "Inativar conta" : "Ativar conta",
      estaAtivo
        ? `Deseja realmente inativar a conta de ${usuario.nome}?`
        : `Deseja realmente ativar a conta de ${usuario.nome}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: estaAtivo ? "Inativar" : "Ativar",
          style: estaAtivo ? "destructive" : "default",
          onPress: async () => {
            try {
              setProcessando(true);

              if (estaAtivo) {
                await excluirUsuario(usuario.idUsuario);
              } else {
                await reativarUsuario(usuario.idUsuario);
              }

              await carregarUsuarios();
              setUsuarioSelecionado(null);

              Alert.alert(
                "Sucesso",
                estaAtivo
                  ? "A conta foi inativada e movida para o final da lista."
                  : "A conta foi ativada e voltou para o início da lista."
              );
            } catch (falha) {
              Alert.alert(
                "Erro",
                falha?.message ||
                "Não foi possível alterar o status da conta."
              );
            } finally {
              setProcessando(false);
            }
          },
        },
      ]
    );
  }

  if (!ehAdministrador) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
            padding: 25,
          },
        ]}
      >
        <Ionicons
          name="lock-closed-outline"
          size={55}
          color={cores.primario}
        />

        <Text
          style={{
            color: cores.texto,
            fontSize: 19,
            fontWeight: "bold",
            marginTop: 15,
          }}
        >
          Acesso restrito
        </Text>

        <Text
          style={{
            color: cores.textoSecundario,
            textAlign: "center",
            marginTop: 8,
          }}
        >
          Somente administradores podem acessar esta área.
        </Text>

        <TouchableOpacity
          onPress={() => navigation?.navigate?.("Dashboard")}
          style={{
            marginTop: 20,
            padding: 12,
            backgroundColor: cores.primario,
            borderRadius: 7,
          }}
        >
          <Text style={{ color: "#FFFFFF" }}>
            Voltar ao início
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const selecionadoAtivo =
    usuarioSelecionado?.ativo === true;

  return (
    <View style={styles.container}>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style>
          <Header titulo="Administração" />
          <Text style={styles.subtitulo}>
            Gerenciamento de usuários cadastrados
          </Text>
        </View>
        <View style={styles.abas}>
          {["Resumo", "Perfil de Acesso"].map((aba) => (
            <TouchableOpacity
              key={aba}
              style={[
                styles.aba,
                abaAtiva === aba && styles.abaSelecionada,
              ]}
              onPress={() => setAbaAtiva(aba)}
            >
              <Text
                style={[
                  styles.textoAba,
                  abaAtiva === aba &&
                  styles.textoAbaSelecionado,
                ]}
              >
                {aba}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.pesquisaContainer}>
          <Ionicons
            name="search-outline"
            size={19}
            color={cores.primario}
          />

          <TextInput
            style={styles.inputPesquisa}
            placeholder="Pesquisar usuário"
            placeholderTextColor={cores.textoSecundario}
            value={pesquisa}
            onChangeText={setPesquisa}
          />

          {pesquisa.length > 0 && (
            <TouchableOpacity
              onPress={() => setPesquisa("")}
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={cores.textoSecundario}
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.cardLista}>
          {carregando ? (
            <ActivityIndicator
              style={{ marginVertical: 20 }}
              color={cores.primario}
            />
          ) : erro ? (
            <View style={{ alignItems: "center", padding: 15 }}>
              <Text style={styles.semResultados}>
                {erro}
              </Text>

              <TouchableOpacity
                onPress={carregarUsuarios}
                style={{
                  backgroundColor: cores.primario,
                  paddingHorizontal: 18,
                  paddingVertical: 10,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: "#FFFFFF" }}>
                  Tentar novamente
                </Text>
              </TouchableOpacity>
            </View>
          ) : usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((usuario) => {
              const ativo = usuario.ativo === true;

              return (
                <TouchableOpacity
                  key={usuario.idUsuario}
                  style={styles.cardUsuario}
                  activeOpacity={0.7}
                  onPress={() => abrirDetalhes(usuario)}
                >
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={cores.vinho}
                  />

                  <View style={{ flex: 1 }}>
                    <Text
                      style={styles.nomeUsuario}
                      numberOfLines={1}
                    >
                      {usuario.nome}
                    </Text>

                    <Text
                      style={{
                        color: cores.textoSecundario,
                        fontSize: 10,
                      }}
                      numberOfLines={1}
                    >
                      {abaAtiva === "Perfil de Acesso"
                        ? usuario.perfilAcesso
                        : usuario.email}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.status,
                      ativo
                        ? styles.statusAtivo
                        : styles.statusInativo,
                    ]}
                  >
                    <Text
                      style={[
                        styles.textoStatus,
                        ativo
                          ? styles.textoAtivo
                          : styles.textoInativo,
                      ]}
                    >
                      {ativo ? "Ativo" : "Inativo"}
                    </Text>
                  </View>

                  <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={cores.textoSecundario}
                  />
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.semResultados}>
              Nenhum usuário encontrado.
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.botaoNovo}
          activeOpacity={0.8}
          onPress={() => navigation?.navigate?.("cadastroAdmin")}
        >
          <Text style={styles.textoBotaoNovo}>
            Novo Usuário
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* POPUP DE INFORMAÇÕES DO USUÁRIO */}
      <Modal
        visible={!!usuarioSelecionado}
        transparent
        animationType="fade"
        onRequestClose={fecharDetalhes}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.55)",
            justifyContent: "center",
            alignItems: "center",
            padding: 20,
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={fecharDetalhes}
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />

          {usuarioSelecionado && (
            <View
              style={{
                width: "100%",
                maxWidth: 430,
                maxHeight: "85%",
                backgroundColor: cores.card,
                borderRadius: 16,
                padding: 22,
                borderWidth: 1,
                borderColor: cores.secundario,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 18,
                }}
              >
                <Text
                  style={{
                    color: cores.texto,
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                >
                  Informações da conta
                </Text>

                <TouchableOpacity
                  onPress={fecharDetalhes}
                  disabled={processando}
                  style={{ padding: 5 }}
                >
                  <Ionicons
                    name="close"
                    size={26}
                    color={cores.texto}
                  />
                </TouchableOpacity>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
              >
                <View
                  style={{
                    alignItems: "center",
                    marginBottom: 22,
                  }}
                >
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      borderRadius: 35,
                      backgroundColor: cores.input,
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 10,
                    }}
                  >
                    <Ionicons
                      name="person"
                      size={35}
                      color={cores.primario}
                    />
                  </View>

                  <Text
                    style={{
                      color: cores.texto,
                      fontSize: 19,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {usuarioSelecionado.nome}
                  </Text>

                  <View
                    style={[
                      styles.status,
                      {
                        marginTop: 9,
                        paddingHorizontal: 14,
                        paddingVertical: 6,
                      },
                      selecionadoAtivo
                        ? styles.statusAtivo
                        : styles.statusInativo,
                    ]}
                  >
                    <Text
                      style={[
                        styles.textoStatus,
                        selecionadoAtivo
                          ? styles.textoAtivo
                          : styles.textoInativo,
                      ]}
                    >
                      {selecionadoAtivo ? "Ativo" : "Inativo"}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: cores.secundario,
                    paddingTop: 16,
                    gap: 15,
                  }}
                >
                  {[
                    {
                      label: "Nome",
                      value: usuarioSelecionado.nome,
                      icon: "person-outline",
                    },
                    {
                      label: "E-mail",
                      value: usuarioSelecionado.email,
                      icon: "mail-outline",
                    },
                    {
                      label: "Cargo",
                      value:
                        usuarioSelecionado.cargo ||
                        "Não informado",
                      icon: "briefcase-outline",
                    },
                    {
                      label: "Perfil de acesso",
                      value:
                        usuarioSelecionado.perfilAcesso ||
                        "Não informado",
                      icon: "shield-checkmark-outline",
                    },
                    ...(usuarioSelecionado.telefone
                      ? [
                        {
                          label: "Telefone",
                          value: usuarioSelecionado.telefone,
                          icon: "call-outline",
                        },
                      ]
                      : []),
                  ].map((campo) => (
                    <View
                      key={campo.label}
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        gap: 11,
                      }}
                    >
                      <Ionicons
                        name={campo.icon}
                        size={19}
                        color={cores.primario}
                        style={{ marginTop: 2 }}
                      />

                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: cores.textoSecundario,
                            fontSize: 11,
                            marginBottom: 3,
                          }}
                        >
                          {campo.label}
                        </Text>

                        <Text
                          selectable
                          style={{
                            color: cores.texto,
                            fontSize: 14,
                          }}
                        >
                          {campo.value}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>

                <View
                  style={{
                    borderTopWidth: 1,
                    borderTopColor: cores.secundario,
                    marginTop: 22,
                    paddingTop: 18,
                    gap: 10,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      alterarPerfil(usuarioSelecionado)
                    }
                    disabled={processando}
                    style={{
                      padding: 13,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: cores.secundario,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: cores.primario,
                        fontWeight: "600",
                      }}
                    >
                      Alterar perfil de acesso
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      confirmarAlteracaoStatus(
                        usuarioSelecionado
                      )
                    }
                    disabled={processando}
                    style={{
                      padding: 14,
                      borderRadius: 8,
                      backgroundColor: selecionadoAtivo
                        ? "#A83232"
                        : "#287F55",
                      alignItems: "center",
                    }}
                  >
                    {processando ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text
                        style={{
                          color: "#FFFFFF",
                          fontWeight: "bold",
                          fontSize: 14,
                        }}
                      >
                        {selecionadoAtivo
                          ? "Inativar usuário"
                          : "Ativar usuário"}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}
        </View>
      </Modal>

      <Footer />
    </View>
  );
}
