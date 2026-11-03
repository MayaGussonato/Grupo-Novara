import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import styles from "./ValidacaoStyle";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useTema } from "../context/TemaContext";

const documentosIniciais = [
  {
    id: "1",
    nome: "Documento 01.pdf",
    tamanho: "2,4 MB",
    status: "Aprovados",
    progresso: 100,
  },
  {
    id: "2",
    nome: "Documento 02.pdf",
    tamanho: "1,8 MB",
    status: "Revisando",
    progresso: 65,
  },
  {
    id: "3",
    nome: "Documento 03.pdf",
    tamanho: "3,1 MB",
    status: "Erros",
    progresso: 30,
  },
  {
    id: "4",
    nome: "Documento 04.pdf",
    tamanho: "1,2 MB",
    status: "Aprovados",
    progresso: 100,
  },
  {
    id: "5",
    nome: "Documento 05.pdf",
    tamanho: "4,6 MB",
    status: "Revisando",
    progresso: 80,
  },
  {
    id: "6",
    nome: "Documento 06.pdf",
    tamanho: "2,0 MB",
    status: "Erros",
    progresso: 20,
  },
];

const filtros = ["Todos", "Revisando", "Aprovados", "Erros"];

export default function Validacao() {
  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("recentes");
  const [pagina, setPagina] = useState(1);

  const { cores, modoEscuro } = useTema();

  // Cor de destaque com bom contraste para texto branco nos dois temas
  const corDestaque = modoEscuro ? cores.secundario : cores.primario;

  const [fontesCarregadas] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontesCarregadas) return null;

  const quantidadePorPagina = 4;

  const listaFiltrada = documentosIniciais
    .filter((doc) => {
      const nomeCorresponde = doc.nome
        .toLowerCase()
        .includes(pesquisa.toLowerCase());

      const statusCorresponde =
        filtro === "Todos" || doc.status === filtro;

      return nomeCorresponde && statusCorresponde;
    })
    .sort((a, b) =>
      ordenacao === "nome"
        ? a.nome.localeCompare(b.nome)
        : Number(b.id) - Number(a.id)
    );

  const totalPaginas = Math.max(
    1,
    Math.ceil(listaFiltrada.length / quantidadePorPagina)
  );

  const documentosPagina = listaFiltrada.slice(
    (pagina - 1) * quantidadePorPagina,
    pagina * quantidadePorPagina
  );

  function corStatus(status) {
    if (status === "Aprovados") return "#21865B";
    if (status === "Revisando") return "#D99A22";
    return "#D94A4A";
  }

  function descricaoStatus(status) {
    if (status === "Aprovados") return "Documento validado";
    if (status === "Revisando") return "Aguardando validação";
    return "Necessita de correção";
  }

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: cores.background },
      ]}
    >
      <Header titulo="Central de Validação" />

      <View style={styles.conteudo}>
        <Text
          style={[
            styles.subtitulo,
            { color: cores.textoSecundario },
          ]}
        >
          Gerencie e acompanhe seus documentos
        </Text>

        {/* Pesquisa */}
        <TextInput
          style={[
            styles.pesquisa,
            {
              backgroundColor: cores.input,
              borderColor: cores.borda,
              color: cores.texto,
            },
          ]}
          placeholder="Pesquisar documento..."
          placeholderTextColor={cores.textoSecundario}
          value={pesquisa}
          onChangeText={(texto) => {
            setPesquisa(texto);
            setPagina(1);
          }}
        />

        {/* Filtros */}
        <View style={styles.filtros}>
          {filtros.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filtro,
                {
                  backgroundColor:
                    filtro === item ? corDestaque : cores.input,
                  borderColor: cores.borda,
                },
              ]}
              onPress={() => {
                setFiltro(item);
                setPagina(1);
              }}
            >
              <Text
                style={[
                  styles.textoFiltro,
                  {
                    color:
                      filtro === item ? "#FFFFFF" : cores.texto,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Ordenação */}
        <View style={styles.linhaOrdenacao}>
          <Text
            style={[
              styles.total,
              { color: cores.textoSecundario },
            ]}
          >
            {listaFiltrada.length} documento(s)
          </Text>

          <TouchableOpacity
            onPress={() => {
              setOrdenacao((atual) =>
                atual === "recentes" ? "nome" : "recentes"
              );
              setPagina(1);
            }}
          >
            <Text
              style={[
                styles.ordenacao,
                { color: cores.primario },
              ]}
            >
              {ordenacao === "recentes"
                ? "Mais recentes ↓"
                : "Nome A-Z ↑"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de documentos */}
        <FlatList
          data={documentosPagina}
          keyExtractor={(item) => item.id}
          style={styles.lista}
          contentContainerStyle={[
            styles.listaConteudo,
            { paddingBottom: 75 },
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text
              style={[
                styles.vazio,
                { color: cores.textoSecundario },
              ]}
            >
              Nenhum documento encontrado.
            </Text>
          }
          renderItem={({ item }) => (
            <View
              style={[
                styles.cardDocumento,
                {
                  backgroundColor: cores.card,
                  borderColor: cores.borda,
                },
              ]}
            >
              <View style={styles.linhaDocumento}>
                <View
                  style={[
                    styles.documentoIcone,
                    { backgroundColor: cores.input },
                  ]}
                >
                  <Image
                    source={require("../../assets/Documento.png")}
                    style={[
                      styles.iconeDocumento,
                      { tintColor: cores.primario },
                    ]}
                  />
                </View>

                <View style={styles.informacoes}>
                  <Text
                    style={[
                      styles.nomeDocumento,
                      { color: cores.texto },
                    ]}
                  >
                    {item.nome}
                  </Text>

                  <Text
                    style={[
                      styles.tamanho,
                      { color: cores.textoSecundario },
                    ]}
                  >
                    PDF • {item.tamanho}
                  </Text>

                  <Text
                    style={[
                      styles.descricaoDocumento,
                      { color: cores.textoSecundario },
                    ]}
                  >
                    {descricaoStatus(item.status)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.status,
                    { backgroundColor: corStatus(item.status) },
                  ]}
                >
                  <Text style={styles.textoStatus}>
                    {item.status}
                  </Text>
                </View>
              </View>

              {/* Progresso */}
              <View
                style={[
                  styles.fundoProgresso,
                  { backgroundColor: cores.borda },
                ]}
              >
                <View
                  style={[
                    styles.progresso,
                    {
                      width: `${item.progresso}%`,
                      backgroundColor: corStatus(item.status),
                    },
                  ]}
                />
              </View>

              <Text
                style={[
                  styles.porcentagem,
                  { color: cores.textoSecundario },
                ]}
              >
                {item.progresso}% concluído
              </Text>
            </View>
          )}
        />

        {/* Paginação */}
        <View
          style={[
            styles.paginacao,
            { backgroundColor: cores.background },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.botaoPagina,
              { backgroundColor: corDestaque },
              pagina === 1 && styles.botaoDesativado,
            ]}
            disabled={pagina === 1}
            onPress={() => setPagina((atual) => atual - 1)}
          >
            <Text style={styles.textoPagina}>Anterior</Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.numeroPagina,
              { color: cores.texto },
            ]}
          >
            {pagina} / {totalPaginas}
          </Text>

          <TouchableOpacity
            style={[
              styles.botaoPagina,
              { backgroundColor: corDestaque },
              pagina >= totalPaginas && styles.botaoDesativado,
            ]}
            disabled={pagina >= totalPaginas}
            onPress={() => setPagina((atual) => atual + 1)}
          >
            <Text style={styles.textoPagina}>Próxima</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Footer />
    </SafeAreaView>
  );
}