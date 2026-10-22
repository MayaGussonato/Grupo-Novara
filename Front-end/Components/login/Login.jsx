import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { loginStyles } from "./LoginStyles";

export default function Login() {
  return (
    <View style={loginStyles.container}>
      <StatusBar style="dark" />

      <Image
        source={require("../../assets/Logo.png")}
        style={loginStyles.logo}
        resizeMode="contain"
      />

      <Text style={loginStyles.title}><strong>Login</strong></Text>

      <View style={loginStyles.formulario}>
        <TextInput
          style={loginStyles.input}
          placeholder="Nome"
          placeholderTextColor="#83B8B8"
          autoCapitalize="none"
        />

        <TextInput
          style={loginStyles.input}
          placeholder="Senha"
          placeholderTextColor="#83B8B8"
          secureTextEntry
        />

        <TouchableOpacity style={loginStyles.entrar} activeOpacity={0.8}>
          <Text style={loginStyles.textoEntrar}>Entrar</Text>
        </TouchableOpacity>

        <View style={loginStyles.divisor}>
          <View style={loginStyles.traso} />
          <Text style={loginStyles.textoOu}>ou</Text>
          <View style={loginStyles.traso} />
        </View>

        <TouchableOpacity
          style={loginStyles.google}
          activeOpacity={0.8}
        >
          <Image
            source={require("../../assets/Google.png")}
            style={{ width: 20, height: 20, marginRight: 5 }}
            resizeMode="contain"
          />
          <Text style={loginStyles.textoGoogle}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={loginStyles.criarConta}>
          <Text style={loginStyles.textoCriarConta}>
            Crie uma conta
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}