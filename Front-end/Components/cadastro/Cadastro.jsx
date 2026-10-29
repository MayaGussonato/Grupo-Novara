import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { cadastroStyles } from './CadastroStyles'

export default function Cadastro() {
    const [cargo, setCargo] = useState("");
    return (
        <View style={cadastroStyles.container}>
            <StatusBar style="dark" />
            <View style={{ alignItems: "center"}}>
                <Image
                    source={require("../../assets/Logo.png")}
                    style={cadastroStyles.logo}
                    resizeMode="contain"
                />

                <Text style={cadastroStyles.title}>Cadastrar Usuario</Text>
            </View>
            <View style={cadastroStyles.formulario}>
                <View>
                    <Text style={cadastroStyles.text}><strong>Nome</strong></Text>
                    <TextInput
                        style={cadastroStyles.input}
                        placeholder="Nome"
                        placeholderTextColor="#83B8B8"
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <Text style={cadastroStyles.text}><strong>Email</strong></Text>
                    <TextInput
                        style={cadastroStyles.input}
                        placeholder="exemple@gmail.com"
                        placeholderTextColor="#83B8B8"
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <Text style={cadastroStyles.text}><strong>Senha</strong></Text>
                    <TextInput
                        style={cadastroStyles.input}
                        placeholder="Ex: 123"
                        placeholderTextColor="#83B8B8"
                        secureTextEntry
                    />
                </View>
                <View>
                    <Text style={cadastroStyles.text}><strong>Cargo</strong></Text>
                    <View style={cadastroStyles.cargoContainer}>
                        <Picker
                            selectedValue={cargo}
                            onValueChange={(itemValue) => setCargo(itemValue)}
                            style={cadastroStyles.cargoPicker}
                        >
                            <Picker.Item label="Selecione um Cargo" value="" />
                            <Picker.Item label="Administrador" value="administrador" />
                            <Picker.Item label="Desenvolvedor" value="desenvolvedor" />
                            <Picker.Item label="Analista" value="analista" />
                            <Picker.Item label="Estagiário" value="estagiario" />
                        </Picker>
                    </View>
                </View>
                <View>
                    <Text style={cadastroStyles.text}><strong>Perfil de Acesso</strong></Text>
                    <View style={cadastroStyles.cargoContainer}>
                        <Picker
                            selectedValue={cargo}
                            onValueChange={(itemValue) => setCargo(itemValue)}
                            style={cadastroStyles.cargoPicker}
                        >
                            <Picker.Item label="Perfil de acesso" value="" />
                            <Picker.Item label="Administrador" value="administrador" />
                            <Picker.Item label="Desenvolvedor" value="desenvolvedor" />
                            <Picker.Item label="Analista" value="analista" />
                            <Picker.Item label="Estagiário" value="estagiario" />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={cadastroStyles.cadastrar} activeOpacity={0.8}>
                    <Text style={cadastroStyles.textoEntrar}>Cadastrar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={cadastroStyles.criarConta}>
                    <Text style={cadastroStyles.textoCriarConta}>
                        Entrar na conta
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}