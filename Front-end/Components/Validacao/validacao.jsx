import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import styles from "./validacaoStyle";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useTema } from "../tema/TemaContext";
import { listarDocumentos } from "../../Services/documentoService";
import {
  formatarTamanho,
  formatarData,
  statusParaInterface,
} from "../../Services/formatadores";

const filtros = ["Todos", "Revisando", "Aprovados", "Erros"];

export default function Validacao({ navigation }) {
  const [pesquisa, setPesquisa] = useState("");
  const [filtro, setFiltro] = useState("Todos");
  const [ordenacao, setOrdenacao] = useState("recentes");
  const [pagina, setPagina] = useState(1);

  // Documentos vindos da API
  const [documentos, setDocumentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [atualizando, setAtualizando] = useState(false);

  const { cores, modoEscuro } = useTema();

  // Cor de destaque com bom contraste para texto branco nos dois temas
  const corDestaque = modoEscuro ? cores.secundario : cores.primario;

  const [fontesCarregadas] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Busca os documentos do usuário logado (Revisor/Admin veem todos)
  async function carregarDocumentos() {
    try {
      setErro(null);

      const lista = await listarDocumentos({ tamanho: 100 });

      const normalizados = (lista || []).map((doc) => ({
        id: String(doc.idDocumento),
        nome: doc.nomeArquivo,
        tamanho: formatarTamanho(doc.tamanhoBytes),
        formato: (doc.formato || "").toUpperCase(),
        tipo: doc.tipoDocumento,
        data: formatarData(doc.dataEnvio),
        statusApi: doc.statusDocumento,
        confianca: doc.nivelConfianca,
        ...statusParaInterface(doc.statusDocumento),
      }));

      setDocumentos(normalizados);
    } catch (falha) {
      setErro(falha.message || "Não foi possível carregar os documentos.");
      setDocumentos([]);
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }

  useEffect(() => {
    carregarDocumentos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function atualizar() {
    setAtualizando(true);
    carregarDocumentos();
  }

  if (!fontesCarregadas) return null;

  const quantidadePorPagina = 4;

  const listaFiltrada = documentos
    .filter((doc) => {
      const nomeCorresponde = doc.nome
        .toLowerCase()
        .includes(pesquisa.toLowerCase());

      const statusCorresponde =
        filtro === "Todos" || doc.rotulo === filtro;

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

  function corStatus(item) {
    return item.cor || "#398BFF";
  }

  return (
    <View
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
          refreshControl={
            <RefreshControl
              refreshing={atualizando}
              onRefresh={atualizar}
              tintColor={cores.primario}
            />
          }
          ListEmptyComponent={
            carregando ? (
              <ActivityIndicator
                style={{ marginTop: 24 }}
                color={cores.primario}
              />
            ) : (
              <Text
                style={[
                  styles.vazio,
                  { color: cores.textoSecundario },
                ]}
              >
                {erro || "Nenhum documento encontrado."}
              </Text>
            )
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation?.navigate?.("Analise", {
                  idDocumento: item.id,
                  nomeDocumento: item.nome,
                })
              }
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
                    {item.formato || "ARQUIVO"} • {item.tamanho}
                  </Text>

                  <Text
                    style={[
                      styles.descricaoDocumento,
                      { color: cores.textoSecundario },
                    ]}
                  >
                    {item.descricao}
                  </Text>
                </View>

                <View
                  style={[
                    styles.status,
                    { backgroundColor: corStatus(item) },
                  ]}
                >
                  <Text style={styles.textoStatus}>
                    {item.rotulo}
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
                      backgroundColor: corStatus(item),
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
            </TouchableOpacity>
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
    </View>
  );
}