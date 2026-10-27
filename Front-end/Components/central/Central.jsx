
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
import { styles } from "./CentralStyles";

const documentosIniciais = [
    {
        id: "1",
        nome: "NF-18291.pdf",
        tamanho: "2.4 MB",
        status: "Concluído",
        progresso: 100,
        data: 6,
    },
    {
        id: "2",
        nome: "NF-18292.pdf",
        tamanho: "2.4 MB",
        status: "Erros",
        progresso: 0,
        data: 5,
    },
    {
        id: "3",
        nome: "NF-18293.pdf",
        tamanho: "2.4 MB",
        status: "Revisando",
        progresso: 30,
        data: 4,
    },
    {
        id: "4",
        nome: "NF-18294.pdf",
        tamanho: "1.8 MB",
        status: "Concluído",
        progresso: 100,
        data: 3,
    },
    {
        id: "5",
        nome: "NF-18295.pdf",
        tamanho: "3.1 MB",
        status: "Revisando",
        progresso: 65,
        data: 2,
    },
    {
        id: "6",
        nome: "NF-18296.pdf",
        tamanho: "2.0 MB",
        status: "Erros",
        progresso: 0,
        data: 1,
    },
    {
        id: "7",
        nome: "NF-18297.pdf",
        tamanho: "2.4 MB",
        status: "Concluído",
        progresso: 100,
        data: 0,
    },
];

const ITENS_POR_PAGINA = 7;

export default function Central({ navigation }) {
    const [pesquisa, setPesquisa] = useState("");
    const [ordem, setOrdem] = useState("recentes");
    const [pagina, setPagina] = useState(1);
    const [modalFiltros, setModalFiltros] = useState(false);
    const [filtroStatus, setFiltroStatus] = useState("Todos");
    const [filtroTipo, setFiltroTipo] = useState("Todos");


    const documentosFiltrados = useMemo(() => {
        let resultado = documentosIniciais.filter((doc) => {
            const correspondePesquisa = doc.nome
                .toLowerCase()
                .includes(pesquisa.toLowerCase());

            // Filtro de estado: barra colorida
            const correspondeEstado =
                filtroStatus === "Todos" ||
                doc.status === filtroStatus;

            // Filtro de tipo: modal do funil
            const extensao = doc.nome
                .split(".")
                .pop()
                .toUpperCase();

            const correspondeTipo =
                filtroTipo === "Todos" ||
                extensao === filtroTipo;

            return (
                correspondePesquisa &&
                correspondeEstado &&
                correspondeTipo
            );
        });

        resultado.sort((a, b) =>
            ordem === "recentes"
                ? b.data - a.data
                : a.data - b.data
        );

        return resultado;
    }, [pesquisa, ordem, filtroStatus, filtroTipo]);

    function alterarFiltroTipo(tipo) {
        setFiltroTipo(tipo);
        setPagina(1);
        setModalFiltros(false);
    }
    
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

    function alterarFiltro(status) {
        setFiltroStatus(status);
        setPagina(1);
        setModalFiltros(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#287F7D" />

            <Header navigation={navigation} titulo="Central de Documentos" />

            <View style={styles.conteudo}>
                <View style={styles.pesquisaContainer}>
                    <Ionicons name="search-outline" size={22} color="#398F8C" />

                    <TextInput
                        style={styles.inputPesquisa}
                        placeholder="Pesquisar Documentos"
                        placeholderTextColor="#B4B4B4"
                        value={pesquisa}
                        onChangeText={alterarPesquisa}
                    />

                    {pesquisa.length > 0 && (
                        <TouchableOpacity onPress={() => alterarPesquisa("")}>
                            <Ionicons name="close-circle" size={20} color="#888888" />
                        </TouchableOpacity>
                    )}
                </View>

                <View style={styles.filtrosEstado}>
                    {["Todos", "Revisando", "Concluído", "Erros"].map((estado) => (
                        <TouchableOpacity
                            key={estado}
                            style={[
                                styles.botaoEstado,
                                styles[`estado${estado}`],
                                filtroStatus === estado && styles.estadoSelecionado,
                            ]}
                            onPress={() => {
                                setFiltroStatus(estado);
                                setPagina(1);
                            }}
                        >
                            <Text
                                style={[
                                    styles.textoEstado,
                                    filtroStatus === estado && styles.textoEstadoSelecionado,
                                ]}
                            >
                                {estado}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

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
                            {ordem === "recentes" ? "Mais Recentes" : "Mais Antigos"}
                        </Text>
                        <Ionicons name="chevron-down" size={14} color="#287F7D" />
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
                                navigation?.navigate?.("ProcessamentoInteligente", {
                                    nomeDocumento: doc.nome,
                                })
                            }
                        >
                            <MaterialCommunityIcons
                                name="file-pdf-box"
                                size={27}
                                color="#650000"
                            />


                            <View style={styles.infoDocumento}>
                                <Text style={styles.nomeDocumento}>{doc.nome}</Text>

                                <Text style={styles.detalheDocumento}>
                                    Pdf    {doc.tamanho}
                                </Text>
                            </View>

                            {doc.status === "Revisando" && (
                                <View style={styles.progressoContainer}>
                                    <View style={styles.progressoCirculo}>
                                        <View style={styles.progressoCentro} />
                                    </View>

                                    <Text style={styles.textoProgresso}>
                                        {doc.progresso}%
                                    </Text>
                                </View>
                            )}

                            <View
                                style={[
                                    styles.status,
                                    doc.status === "Erros" && styles.statusErro,
                                    doc.status === "Revisando" && styles.statusRevisando,
                                ]}
                            >
                                <Ionicons
                                    name={
                                        doc.status === "Concluído"
                                            ? "checkmark-circle"
                                            : doc.status === "Erros"
                                                ? "alert-circle-outline"
                                                : "ellipsis-horizontal-circle"
                                    }
                                    size={15}
                                    color={
                                        doc.status === "Concluído"
                                            ? "#216B31"
                                            : doc.status === "Erros"
                                                ? "#A32626"
                                                : "#34577D"
                                    }
                                />

                                <Text
                                    style={[
                                        styles.textoStatus,
                                        doc.status === "Erros" && styles.textoStatusErro,
                                        doc.status === "Revisando" && styles.textoStatusRevisando,
                                    ]}
                                >
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

                <View style={styles.paginacao}>
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(
                        (numero) => (
                            <TouchableOpacity
                                key={numero}
                                style={[
                                    styles.numeroPagina,
                                    paginaAtual === numero && styles.paginaAtiva,
                                ]}
                                onPress={() => setPagina(numero)}
                            >
                                <Text style={styles.textoPagina}>{numero}</Text>
                            </TouchableOpacity>
                        )
                    )}

                    <TouchableOpacity
                        style={styles.proximaPagina}
                        disabled={paginaAtual >= totalPaginas}
                        onPress={() => setPagina((atual) => atual + 1)}
                    >
                        <Ionicons
                            name="play"
                            size={12}
                            color={paginaAtual >= totalPaginas ? "#A9C7C5" : "#287F7D"}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                visible={modalFiltros}
                transparent
                animationType="fade"
                onRequestClose={() => setModalFiltros(false)}
            >
                <View style={styles.fundoModal}>
                    <View style={styles.modal}>
                        <Text style={styles.tituloModal}>Filtrar documentos</Text>


                        {["Todos", "PDF", "XML", "DOCX"].map((tipo) => (
                            <TouchableOpacity
                                key={tipo}
                                style={styles.opcaoFiltro}
                                onPress={() => alterarFiltroTipo(tipo)}
                            >
                                <Text style={styles.textoOpcao}>{tipo}</Text>

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
                            <Text style={styles.textoFechar}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
