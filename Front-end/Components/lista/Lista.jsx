
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Modal,
} from "react-native";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import Header from "../header/Header";
import { styles } from "./ListaStyles";

const documentosIniciais = Array.from({ length: 30 }, (_, i) => ({
  id: String(i + 1),
  nome: `NF-${18291 + i}.pdf`,
  tamanho: "2.4 MB",
  status: "Concluído",
  data: i,
}));

const ITENS_POR_PAGINA = 7;

export default function Lista({ navigation }) {
  const [pesquisa, setPesquisa] = useState("");
  const [ordem, setOrdem] = useState("recentes");
  const [pagina, setPagina] = useState(1);
  const [modalFiltros, setModalFiltros] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState("Todos");

  const documentosFiltrados = useMemo(() => {
    let resultado = documentosIniciais.filter((doc) => {
      const correspondePesquisa = doc.nome
        .toLowerCase()
        .includes(pesquisa.toLowerCase());

      const extensao = doc.nome.split(".").pop().toUpperCase();

      const correspondeTipo =
        filtroTipo === "Todos" || extensao === filtroTipo;

      return correspondePesquisa && correspondeTipo;
    });

    resultado.sort((a, b) =>
      ordem === "recentes"
        ? b.data - a.data
        : a.data - b.data
    );

    return resultado;
  }, [pesquisa, ordem, filtroTipo]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(documentosFiltrados.length / ITENS_POR_PAGINA)
  );

  const paginaAtual = Math.min(pagina, totalPaginas);

  const documentosPagina = documentosFiltrados.slice(
    (paginaAtual - 1) * ITENS_POR_PAGINA,
    paginaAtual * ITENS_POR_PAGINA
  );

  function alterarPesquisa(texto) {
    setPesquisa(texto);
    setPagina(1);
  }

  function alterarFiltroTipo(tipo) {
    setFiltroTipo(tipo);
    setPagina(1);
    setModalFiltros(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#287F7D"
      />

      <Header
        navigation={navigation}
        titulo="Lista de Documentos"
      />

      <View style={styles.conteudo}>
        {/* Pesquisa */}
        <View style={styles.pesquisaContainer}>
          <Ionicons
            name="search-outline"
            size={22}
            color="#398F8C"
          />

          <TextInput
            style={styles.inputPesquisa}
            placeholder="Pesquisar Documentos"
            placeholderTextColor="#B4B4B4"
            value={pesquisa}
            onChangeText={alterarPesquisa}
          />

          {pesquisa.length > 0 && (
            <TouchableOpacity
              onPress={() => alterarPesquisa("")}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color="#888888"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Ordenação e filtros avançados */}
        <View style={styles.ferramentas}>
          <TouchableOpacity
            style={styles.ordem}
            onPress={() =>
              setOrdem((atual) =>
                atual === "recentes" ? "antigos" : "recentes"
              )
            }
          >
            <Text style={styles.textoFerramenta}>
              {ordem === "recentes"
                ? "Mais Recentes"
                : "Mais Antigos"}
            </Text>

            <Ionicons
              name="chevron-down"
              size={13}
              color="#287F7D"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.filtros}
            onPress={() => setModalFiltros(true)}
          >
            <Ionicons
              name="funnel-outline"
              size={19}
              color="#65A9A5"
            />

            <Text style={styles.textoFerramenta}>
              Filtros Avançados
            </Text>
          </TouchableOpacity>
        </View>

        {/* Lista de documentos */}
        <ScrollView
          style={styles.lista}
          contentContainerStyle={styles.listaConteudo}
          showsVerticalScrollIndicator={false}
        >
          {documentosPagina.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={styles.documento}
              activeOpacity={0.75}
              onPress={() =>
                navigation?.navigate?.(
                  "ProcessamentoInteligente",
                  { nomeDocumento: doc.nome }
                )
              }
            >
              <MaterialCommunityIcons
                name="file-pdf-box"
                size={27}
                color="#650000"
              />

              <View style={styles.infoDocumento}>
                <Text
                  style={styles.nomeDocumento}
                  numberOfLines={1}
                >
                  {doc.nome}
                </Text>

                <Text style={styles.detalheDocumento}>
                  Pdf    {doc.tamanho}
                </Text>
              </View>

              <View style={styles.status}>
                <Ionicons
                  name="checkmark-circle"
                  size={11}
                  color="#216B31"
                />

                <Text style={styles.textoStatus}>
                  {doc.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}

          {documentosPagina.length === 0 && (
            <Text style={styles.semResultados}>
              Nenhum documento encontrado.
            </Text>
          )}
        </ScrollView>

        {/* Paginação */}
        <View style={styles.paginacao}>
          {Array.from(
            { length: totalPaginas },
            (_, i) => i + 1
          ).map((numero) => (
            <TouchableOpacity
              key={numero}
              style={[
                styles.numeroPagina,
                paginaAtual === numero && styles.paginaAtiva,
              ]}
              onPress={() => setPagina(numero)}
            >
              <Text style={styles.textoPagina}>
                {numero}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity
            style={styles.proximaPagina}
            disabled={paginaAtual >= totalPaginas}
            onPress={() => setPagina((atual) => atual + 1)}
          >
            <Ionicons
              name="play"
              size={11}
              color={
                paginaAtual >= totalPaginas
                  ? "#A9C7C5"
                  : "#287F7D"
              }
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal de filtros avançados: tipo de arquivo */}
      <Modal
        visible={modalFiltros}
        transparent
        animationType="fade"
        onRequestClose={() => setModalFiltros(false)}
      >
        <View style={styles.fundoModal}>
          <View style={styles.modal}>
            <Text style={styles.tituloModal}>
              Tipo de documento
            </Text>

            {["Todos", "PDF", "XML", "DOCX"].map((tipo) => (
              <TouchableOpacity
                key={tipo}
                style={styles.opcaoFiltro}
                onPress={() => alterarFiltroTipo(tipo)}
              >
                <Text style={styles.textoOpcao}>
                  {tipo}
                </Text>

                <Ionicons
                  name={
                    filtroTipo === tipo
                      ? "radio-button-on"
                      : "radio-button-off"
                  }
                  size={20}
                  color="#287F7D"
                />
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.fecharModal}
              onPress={() => setModalFiltros(false)}
            >
              <Text style={styles.textoFechar}>
                Fechar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
