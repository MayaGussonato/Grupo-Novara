import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { cadastroStyles as styles } from './CadastroStyles'
import { useTema } from "../context/TemaContext";

export default function Cadastro() {
    const [cargo, setCargo] = useState("");
    const [perfil, setPerfil] = useState("");
    const { cores, modoEscuro } = useTema();

    return (
        <View style={[styles.container, { backgroundColor: cores.background }]}>
            <StatusBar style={modoEscuro ? "light" : "dark"} />
            
            <View style={{ alignItems: "center"}}>
                <Image
                    source={require("../../assets/Logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={[styles.title, { color: cores.texto }]}>Cadastrar Usuário</Text>
            </View>

            <View style={styles.formulario}>
                <View>
                    <Text style={[styles.text, { color: cores.texto }, styles.textoNegrito]}>Nome</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: cores.input, borderColor: cores.borda, color: cores.texto }]}
                        placeholder="Nome"
                        placeholderTextColor={modoEscuro ? cores.textoSecundario : "#83B8B8"}
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <Text style={[styles.text, { color: cores.texto }, styles.textoNegrito]}>Email</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: cores.input, borderColor: cores.borda, color: cores.texto }]}
                        placeholder="exemple@gmail.com"
                        placeholderTextColor={modoEscuro ? cores.textoSecundario : "#83B8B8"}
                        autoCapitalize="none"
                    />
                </View>

                <View>
                    <Text style={[styles.text, { color: cores.texto }, styles.textoNegrito]}>Senha</Text>
                    <TextInput
                        style={[styles.input, { backgroundColor: cores.input, borderColor: cores.borda, color: cores.texto }]}
                        placeholder="Ex: 123"
                        placeholderTextColor={modoEscuro ? cores.textoSecundario : "#83B8B8"}
                        secureTextEntry
                    />
                </View>

                <View>
                    <Text style={[styles.text, { color: cores.texto }, styles.textoNegrito]}>Cargo</Text>
                    <View style={[styles.cargoContainer, { backgroundColor: cores.input, borderColor: cores.borda }]}>
                        <Picker
                            selectedValue={cargo}
                            onValueChange={(itemValue) => setCargo(itemValue)}
                            style={[styles.cargoPicker, { color: cores.texto }]}
                            dropdownIconColor={cores.textoSecundario}
                        >
                            <Picker.Item label="Selecione um Cargo" value="" style={{ backgroundColor: cores.input, color: cores.textoSecundario }} />
                            <Picker.Item label="Administrador" value="administrador" style={{ backgroundColor: cores.input, color: cores.texto }} />
                            <Picker.Item label="Desenvolvedor" value="desenvolvedor" style={{ backgroundColor: cores.input, color: cores.texto }} />
                            <Picker.Item label="Analista" value="analista" style={{ backgroundColor: cores.input, color: cores.texto }} />
                            <Picker.Item label="Estagiário" value="estagiario" style={{ backgroundColor: cores.input, color: cores.texto }} />
                        </Picker>
                    </View>
                </View>

                <View>
                    <Text style={[styles.text, { color: cores.texto }, styles.textoNegrito]}>Perfil de Acesso</Text>
                    <View style={[styles.cargoContainer, { backgroundColor: cores.input, borderColor: cores.borda }]}>
                        <Picker
                            selectedValue={perfil}
                            onValueChange={(itemValue) => setPerfil(itemValue)}
                            style={[styles.cargoPicker, { color: cores.texto }]}
                            dropdownIconColor={cores.textoSecundario}
                        >
                            <Picker.Item label="Perfil de acesso" value="" style={{ backgroundColor: cores.input, color: cores.textoSecundario }} />
                            <Picker.Item label="Administrador" value="administrador" style={{ backgroundColor: cores.input, color: cores.texto }} />
                            <Picker.Item label="Desenvolvedor" value="desenvolvedor" style={{ backgroundColor: cores.input, color: cores.texto }} />
                            <Picker.Item label="Analista" value="analista" style={{ backgroundColor: cores.input, color: cores.texto }} />
                            <Picker.Item label="Estagiário" value="estagiario" style={{ backgroundColor: cores.input, color: cores.texto }} />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={[styles.cadastrar, { backgroundColor: cores.vinho || "#460303" }]} activeOpacity={0.8}>
                    <Text style={styles.textoEntrar}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.criarConta}>
                    <Text style={[styles.textoCriarConta, { color: cores.vinho || "#650000" }]}>
                        Entrar na conta
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}