import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { cadastroStyles as styles } from './CadastroStyles'
import { useTema } from "../tema/TemaContext";
 
const opcoes = [
    { label: "Administrador", value: "administrador" },
    { label: "Desenvolvedor", value: "desenvolvedor" },
    { label: "Analista", value: "analista" },
    { label: "Estagiário", value: "estagiario" },
];
 
// Picker reutilizável que acompanha o tema (claro/escuro)
function Seletor({ valor, aoMudar, placeholder, cores, modoEscuro }) {
    return (
        <View style={[styles.cargoContainer, { backgroundColor: cores.input, borderColor: cores.borda }]}>
            <Picker
                selectedValue={valor}
                onValueChange={aoMudar}
                // Android: "dropdown" abre a lista ancorada no campo, e ela usa o fundo do Picker.
                // O modo padrão ("dialog") abre uma janela do sistema que ignora a cor do app.
                mode="dropdown"
                // iOS: deixa a roda do picker no tema certo
                themeVariant={modoEscuro ? "dark" : "light"}
                itemStyle={{ color: cores.texto }}
                dropdownIconColor={cores.textoSecundario}
                // backgroundColor aqui sobrescreve o "transparent" do CadastroStyles
                style={[
                    styles.cargoPicker,
                    { color: cores.texto, backgroundColor: cores.input },
                ]}
            >
                <Picker.Item
                    label={placeholder}
                    value=""
                    style={{ backgroundColor: cores.input, color: cores.textoSecundario }}
                />
                {opcoes.map((opcao) => (
                    <Picker.Item
                        key={opcao.value}
                        label={opcao.label}
                        value={opcao.value}
                        style={{ backgroundColor: cores.input, color: cores.texto }}
                    />
                ))}
            </Picker>
        </View>
    );
}
 
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
                    <Seletor
                        valor={cargo}
                        aoMudar={setCargo}
                        placeholder="Selecione um Cargo"
                        cores={cores}
                        modoEscuro={modoEscuro}
                    />
                </View>
 
                <View>
                    <Text style={[styles.text, { color: cores.texto }, styles.textoNegrito]}>Perfil de Acesso</Text>
                    <Seletor
                        valor={perfil}
                        aoMudar={setPerfil}
                        placeholder="Perfil de acesso"
                        cores={cores}
                        modoEscuro={modoEscuro}
                    />
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