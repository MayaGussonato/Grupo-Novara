import React, { useMemo, useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";

import Ionicons from "@react-native-vector-icons/ionicons";
import { criarIntegracaoStyles } from "./IntegracoesStyles";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useTema } from "../tema/TemaContext";

const integracoes = [
    {
        id: "1",
        nome: "SAP",
        logo: "SAP",
        tipo: "sap",
        status: "Conectado",
        data: "15/10/26 14:32",
    },
    {
        id: "2",
        nome: "TOTVS",
        logo: "T",
        tipo: "totvs",
        status: "Conectado",
        data: "15/10/26 11:20",
    },
    {
        id: "3",
        nome: "Microsoft Dynamics 365",
        logo: "D",
        tipo: "microsoft",
        status: "Atenção",
        data: "15/10/26 11:20",
    },
    {
        id: "4",
        nome: "Google Drive",
        logo: "G",
        tipo: "google",
        status: "Conectado",
        data: "15/10/26 11:20",
    },
    {
        id: "5",
        nome: "One Drive",
        logo: "☁",
        tipo: "onedrive",
        status: "Conectado",
        data: "15/10/26 11:20",
    },
];

export default function Integracoes() {
    const [menuAberto, setMenuAberto] = useState(null);

    const { cores, modoEscuro } = useTema();

    // Recria os estilos sempre que o tema mudar
    const styles = useMemo(
        () => criarIntegracaoStyles(cores, modoEscuro),
        [cores, modoEscuro]
    );

    function abrirMenu(integracao) {
        setMenuAberto(
            menuAberto === integracao.id ? null : integracao.id
        );
    }

    function selecionarOpcao(opcao, integracao) {
        setMenuAberto(null);

        if (opcao === "Conectar") {
            Alert.alert(
                "Conectar integração",
                `Você selecionou ${integracao.nome}.`
            );
        } else if (opcao === "Sincronizar") {
            Alert.alert(
                "Sincronização",
                `Sincronização de ${integracao.nome} solicitada.`
            );
        } else {
            Alert.alert(
                "Integração",
                `Configurações de ${integracao.nome}.`
            );
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.conteudo}
            >
                <Header />
                <View style={styles.sim}>
                    <Text style={styles.subtitulo}>
                        Conecte o LabFlow aos sistemas da sua
                        empresa
                    </Text>
                </View>

                <View style={styles.lista}>
                    {integracoes.map((item) => (
                        <View key={item.id} style={styles.card}>

                            {/* Logo */}
                            <View style={styles.logoContainer}>
                                <View
                                    style={[
                                        styles.logo,
                                        styles[item.tipo],
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.textoLogo,
                                            item.tipo === "sap" && styles.logoSap,
                                        ]}
                                    >
                                        {item.logo}
                                    </Text>
                                </View>
                            </View>

                            {/* Informações */}
                            <View style={styles.informacoes}>
                                <Text style={styles.nome}>
                                    {item.nome}
                                </Text>

                                <View
                                    style={[
                                        styles.status,
                                        item.status === "Conectado"
                                            ? styles.statusConectado
                                            : styles.statusAtencao,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.textoStatus,
                                            item.status === "Conectado"
                                                ? styles.textoConectado
                                                : styles.textoAtencao,
                                        ]}
                                    >
                                        {item.status === "Atenção"
                                            ? "+ Atenção"
                                            : item.status}
                                    </Text>
                                </View>

                                <Text style={styles.ultimaSincronizacao}>
                                    Última sincronização
                                </Text>

                                <Text style={styles.data}>
                                    {item.data}
                                </Text>
                            </View>

                            {/* Menu */}
                            <View style={styles.menuContainer}>
                                <TouchableOpacity
                                    onPress={() => abrirMenu(item)}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons
                                        name="ellipsis-vertical"
                                        size={20}
                                        color={cores.texto}
                                    />
                                </TouchableOpacity>

                                {menuAberto === item.id && (
                                    <View style={styles.menu}>
                                        {["Conectar", "Sincronizar", "Configurações"].map(
                                            (opcao) => (
                                                <TouchableOpacity
                                                    key={opcao}
                                                    style={styles.opcaoMenu}
                                                    onPress={() =>
                                                        selecionarOpcao(opcao, item)
                                                    }
                                                >
                                                    <Text style={styles.textoOpcao}>
                                                        {opcao}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        )}
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}