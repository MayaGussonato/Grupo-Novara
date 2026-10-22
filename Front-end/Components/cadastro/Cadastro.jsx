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

            <Image
                source={require("../../assets/Logo.png")}
                style={cadastroStyles.logo}
                resizeMode="contain"
            />

            <Text style={cadastroStyles.title}>Cadastrar Usuario</Text>

            <View style={cadastroStyles.formulario}>
                <TextInput
                    style={cadastroStyles.input}
                    placeholder="Nome"
                    placeholderTextColor="#83B8B8"
                    autoCapitalize="none"
                />
                <TextInput
                    style={cadastroStyles.input}
                    placeholder="e-mail"
                    placeholderTextColor="#83B8B8"
                    autoCapitalize="none"
                />

                <TextInput
                    style={cadastroStyles.input}
                    placeholder="Senha"
                    placeholderTextColor="#83B8B8"
                    secureTextEntry
                />
                <View style={cadastroStyles.cargoContainer}>
                    <Picker
                        selectedValue={cargo}
                        onValueChange={(itemValue) => setCargo(itemValue)}
                        style={cadastroStyles.cargoPicker}
                    >
                        <Picker.Item label="Cargo" value="" />
                        <Picker.Item label="Administrador" value="administrador" />
                        <Picker.Item label="Desenvolvedor" value="desenvolvedor" />
                        <Picker.Item label="Analista" value="analista" />
                        <Picker.Item label="Estagiário" value="estagiario" />
                    </Picker>
                </View>
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

                <TouchableOpacity style={cadastroStyles.entrar} activeOpacity={0.8}>
                    <Text style={cadastroStyles.textoEntrar}>Entrar</Text>
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