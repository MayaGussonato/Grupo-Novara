
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
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
  alterarPerfilUsuario,
} from "../../Services/usuarioService";

const perfisDisponiveis = ["Administrador", "Revisor", "Funcionario"];

export default function Usuarios({ navigation }) {
  const [pesquisa, setPesquisa] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("Resumo");

  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const { usuario: usuarioLogado } = useAuth();
  const ehAdministrador = usuarioLogado?.perfilAcesso === "Administrador";

  const { cores, modoEscuro } = useTema();

  const styles = useMemo(
    () => criarAdministracaoStyles(cores, modoEscuro),
    [cores, modoEscuro]
  );

  // Carrega os usuários reais da API (somente Administrador tem acesso)
  const carregarUsuarios = useCallback(async () => {
    try {
      setErro(null);

      const lista = await listarUsuarios();

      setUsuarios(lista || []);
    } catch (falha) {
      setErro(falha.message || "Não foi possível carregar os usuários.");
      setUsuarios([]);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarUsuarios();
  }, [carregarUsuarios]);

  const usuariosFiltrados = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();

    return usuarios.filter((usuario) => {
      if (abaAtiva === "Perfil de Acesso") {
        return (
          (usuario.perfilAcesso || "").toLowerCase().includes(termo) ||
          usuario.nome.toLowerCase().includes(termo)
        );
      }

      return usuario.nome.toLowerCase().includes(termo);
    });
  }, [usuarios, pesquisa, abaAtiva]);

  async function alterarPerfil(usuario) {
    const proximoPerfil =
      perfisDisponiveis[
        (perfisDisponiveis.indexOf(usuario.perfilAcesso) + 1) %
          perfisDisponiveis.length
      ];

    try {
      await alterarPerfilUsuario(usuario.idUsuario, proximoPerfil);
      await carregarUsuarios();
    } catch (falha) {
      Alert.alert("Perfil de acesso", falha.message);
    }
  }

  function confirmarExclusao(usuario) {
    Alert.alert(
      "Excluir usuário",
      `Deseja excluir "${usuario.nome}"? O acesso é removido, mas o histórico dele continua no banco.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await excluirUsuario(usuario.idUsuario);
              await carregarUsuarios();
            } catch (falha) {
              Alert.alert("Excluir usuário", falha.message);
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header titulo="Administração" />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.subtitulo}>
          Resultado do processamento gerado pela IA
        </Text>

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
            placeholder={
              abaAtiva === "Resumo"
                ? "Pesquisar Documentos"
                : "Pesquisar Perfil de Acesso"
            }
            placeholderTextColor={cores.textoSecundario}
            value={pesquisa}
            onChangeText={setPesquisa}
          />

          {pesquisa.length > 0 && (
            <TouchableOpacity onPress={() => setPesquisa("")}>
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
          ) : usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((usuario) => {
              const ativo = usuario.ativo === true;

              return (
                <TouchableOpacity
                  key={usuario.idUsuario}
                  style={styles.cardUsuario}
                  activeOpacity={0.7}
                  onPress={() => {
                    if (!ehAdministrador) {
                      return;
                    }

                    Alert.alert(
                      usuario.nome,
                      `${usuario.email}\nPerfil: ${usuario.perfilAcesso}\nStatus: ${
                        ativo ? "Ativo" : "Inativo"
                      }`,
                      [
                        {
                          text: "Alterar perfil",
                          onPress: () => alterarPerfil(usuario),
                        },
                        ...(ativo
                          ? [
                              {
                                text: "Excluir",
                                style: "destructive",
                                onPress: () => confirmarExclusao(usuario),
                              },
                            ]
                          : []),
                        { text: "Fechar", style: "cancel" },
                      ]
                    );
                  }}
                >
                  <Ionicons
                    name="person-outline"
                    size={19}
                    color={cores.vinho}
                  />

                  <View style={{ flex: 1 }}>
                    <Text
                      style={styles.nomeUsuario}
                      numberOfLines={1}
                    >
                      {usuario.nome}
                    </Text>

                    {abaAtiva === "Perfil de Acesso" && (
                      <Text
                        style={{
                          color: cores.textoSecundario,
                          fontSize: 11,
                        }}
                        numberOfLines={1}
                      >
                        {usuario.perfilAcesso} • {usuario.email}
                      </Text>
                    )}
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
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={styles.semResultados}>
              {erro || "Nenhum usuário encontrado."}
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.botaoNovo}
          activeOpacity={0.8}
          onPress={() => navigation?.navigate?.("Cadastro")}
        >
          <Text style={styles.textoBotaoNovo}>
            Novo Usuário
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
}
