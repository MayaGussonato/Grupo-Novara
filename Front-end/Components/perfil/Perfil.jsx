
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { perfilStyles as styles } from "./PerfilStyles";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Perfil({ navigation }) {
    const [aba, setAba] = useState("Perfil");

    const [nome, setNome] = useState("Mayara Gussonato");
    const [email, setEmail] = useState("mayara@labflow.com.br");
    const [cargo, setCargo] = useState("Administradora");
    const [instituicao, setInstituicao] = useState("LabFlow");
    const [telefone, setTelefone] = useState("(11) 91234-5678");

    function salvarAlteracoes() {
        alert("Alterações salvas com sucesso!");
    }

    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.conteudo}
            >
                <Header
                    titulo="Meu Perfil"
                />
                <View style={styles.sim}>
                    <Text style={styles.subtitulo}>
                        Gerencie suas informações e preferência
                    </Text>
                </View>

                {/* Abas */}
                <View style={styles.abas}>
                    <TouchableOpacity
                        style={styles.aba}
                        onPress={() => setAba("Perfil")}
                    >
                        <Text style={[
                            styles.textoAba,
                            aba === "Perfil" && styles.abaAtiva
                        ]}>
                            Perfil
                        </Text>
                        {aba === "Perfil" && <View style={styles.linhaAtiva} />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.aba}
                        onPress={() => setAba("Segurança")}
                    >
                        <Text style={[
                            styles.textoAba,
                            aba === "Segurança" && styles.abaAtiva
                        ]}>
                            Segurança
                        </Text>
                        {aba === "Segurança" && <View style={styles.linhaAtiva} />}
                    </TouchableOpacity>
                </View>

                <View style={styles.card}>
                    {aba === "Perfil" ? (
                        <>
                            {/* Foto e informações */}
                            <View style={styles.usuario}>
                                <View style={styles.fotoContainer}>
                                    <Text style={styles.iniciais}>MG</Text>

                                    <TouchableOpacity style={styles.botaoFoto}>
                                        <Ionicons
                                            name="camera"
                                            size={13}
                                            color="#FFFFFF"
                                        />
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.nomeUsuario}>{nome}</Text>
                                <Text style={styles.cargoUsuario}>{cargo}</Text>
                            </View>

                            {/* Campos */}
                            <View style={styles.formulario}>
                                <View style={styles.campo}>
                                    <Text style={styles.label}>Nome completo</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={nome}
                                        onChangeText={setNome}
                                    />
                                </View>

                                <View style={styles.campo}>
                                    <Text style={styles.label}>E-mail</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={email}
                                        onChangeText={setEmail}
                                        keyboardType="email-address"
                                    />
                                </View>

                                <View style={styles.campo}>
                                    <Text style={styles.label}>Cargo</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={cargo}
                                        onChangeText={setCargo}
                                    />
                                </View>

                                <View style={styles.campo}>
                                    <Text style={styles.label}>Instituição</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={instituicao}
                                        onChangeText={setInstituicao}
                                    />
                                </View>

                                <View style={styles.campo}>
                                    <Text style={styles.label}>Telefone</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={telefone}
                                        onChangeText={setTelefone}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.botaoSalvar}
                                onPress={salvarAlteracoes}
                            >
                                <Text style={styles.textoBotao}>
                                    Salvar alterações
                                </Text>
                            </TouchableOpacity>
                        </>
                    ) : (
                        <View style={styles.seguranca}>
                            <Text style={styles.tituloSeguranca}>
                                Segurança da conta
                            </Text>

                            <Text style={styles.labelSeguranca}>
                                Senha atual
                            </Text>
                            <TextInput
                                style={styles.inputSeguranca}
                                placeholder="Digite sua senha atual"
                                secureTextEntry
                            />

                            <Text style={styles.labelSeguranca}>
                                Nova senha
                            </Text>
                            <TextInput
                                style={styles.inputSeguranca}
                                placeholder="Digite sua nova senha"
                                secureTextEntry
                            />

                            <Text style={styles.labelSeguranca}>
                                Confirmar senha
                            </Text>
                            <TextInput
                                style={styles.inputSeguranca}
                                placeholder="Confirme sua nova senha"
                                secureTextEntry
                            />

                            <TouchableOpacity style={styles.botaoSalvar}>
                                <Text style={styles.textoBotao}>
                                    Alterar senha
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
            <Footer />
        </View>
    );
}
