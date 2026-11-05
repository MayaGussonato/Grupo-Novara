import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons'
import { criarAdministracaoStyles } from "./AdministracaoStyles";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useTema } from "../tema/TemaContext";

const listaInicial = [
  { id: "1", nome: "Mayara Gussonato", status: "Ativo" },
  { id: "2", nome: "Felipe Silva", status: "Ativo" },
  { id: "3", nome: "Henrique Nascimento", status: "Ativo" },
  { id: "4", nome: "Tridigo Ribeiro", status: "Inativo" },
  { id: "5", nome: "Luis Oliva", status: "Ativo" },
];

export default function Usuarios({ navigation }) {
  const [pesquisa, setPesquisa] = useState("");
  const [abaAtiva, setAbaAtiva] = useState("Resumo");
  const [usuarios] = useState(listaInicial);

  const { cores, modoEscuro } = useTema();

  // Recria os estilos sempre que o tema mudar
  const styles = useMemo(
    () => criarAdministracaoStyles(cores, modoEscuro),
    [cores, modoEscuro]
  );

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((usuario) =>
      usuario.nome
        .toLowerCase()
        .includes(pesquisa.trim().toLowerCase())
    );
  }, [usuarios, pesquisa]);

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

        {/* Abas */}
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
                  abaAtiva === aba && styles.textoAbaSelecionado,
                ]}
              >
                {aba}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Pesquisa */}
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

        {/* Lista */}
        <View style={styles.cardLista}>
          {usuariosFiltrados.length > 0 ? (
            usuariosFiltrados.map((usuario) => (
              <TouchableOpacity
                key={usuario.id}
                style={styles.cardUsuario}
                activeOpacity={0.7}
                onPress={() =>
                  navigation?.navigate?.("EditarUsuario", {
                    usuario,
                  })
                }
              >
                <Ionicons
                  name="person-outline"
                  size={19}
                  color={cores.vinho}
                />

                <Text
                  style={styles.nomeUsuario}
                  numberOfLines={1}
                >
                  {usuario.nome}
                </Text>

                <View
                  style={[
                    styles.status,
                    usuario.status === "Ativo"
                      ? styles.statusAtivo
                      : styles.statusInativo,
                  ]}
                >
                  <Text
                    style={[
                      styles.textoStatus,
                      usuario.status === "Ativo"
                        ? styles.textoAtivo
                        : styles.textoInativo,
                    ]}
                  >
                    {usuario.status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.semResultados}>
              Nenhum usuário encontrado.
            </Text>
          )}
        </View>

        {/* Novo usuário */}
        <TouchableOpacity
          style={styles.botaoNovo}
          activeOpacity={0.8}
          onPress={() => navigation?.navigate?.("Cadastro")}
        >
          <Text style={styles.textoBotaoNovo}>Novo Usuário</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
}