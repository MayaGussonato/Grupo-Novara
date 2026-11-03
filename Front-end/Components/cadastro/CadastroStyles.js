import { StyleSheet } from "react-native";

export const cadastroStyles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 26,
        paddingTop: 10,
    },

    logo: {
        width: 210,
        height: 100,
        alignSelf: "center",
    },

    title: {
        fontSize: 25,
        fontWeight: "400",
        marginBottom: 15,
    },

    formulario: {
        width: "100%",
    },

    input: {
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 12,
        fontSize: 17,
        marginBottom: 15,
    },

    cadastrar: {
        height: 37,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 22,
    },

    textoEntrar: {
        color: "#fff",
        fontSize: 18,
    },

    criarConta: {
        marginTop: 10,
        alignSelf: "flex-start",
    },

    textoCriarConta: {
        fontSize: 11,
    },

    text: {
        fontSize: 16,
        marginBottom: 5,
    },

    textoNegrito: {
        fontWeight: "bold",
    },

    cargoContainer: {
        height: 42,
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: "center",
        marginBottom: 12,
        overflow: "hidden",
    },

    cargoPicker: {
        width: "100%",
        height: 42,
        backgroundColor: "transparent",
        borderRadius: 5,
    },
});