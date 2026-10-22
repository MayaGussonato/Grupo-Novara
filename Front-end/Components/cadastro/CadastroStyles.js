import { StyleSheet } from "react-native";

export const cadastroStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7F3F1",
        paddingHorizontal: 26,
        paddingTop: 60,
    },

    logo: {
        width: 210,
        height: 100,
        alignSelf: "center",
    },

    title: {
        fontSize: 40,
        fontWeight: "400",
        color: "#287F7D",
        marginBottom: 25,
    },

    formulario: {
        width: "100%",
    },

    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#70AAA9",
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 12,
        fontSize: 17,
        color: "#287F7D",
        marginBottom: 18,
    },

    entrar: {
        height: 37,
        backgroundColor: "#287F7D",
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 22,
    },

    textoEntrar: {
        color: "#fff",
        fontSize: 18,
    },

    divisor: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 12,
        marginBottom: 12,
    },

    traso: {
        flex: 1,
        height: 1,
        backgroundColor: "#A8CECA",
    },

    textoOu: {
        color: "#287F7D",
        fontSize: 12,
        marginHorizontal: 15,
    },

    google: {
        height: 38,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#70AAA9",
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },

    textoGoogle: {
        fontSize: 17,
        color: "#83B8B8",
    },

    criarConta: {
        marginTop: 10,
        alignSelf: "flex-start",
    },

    textoCriarConta: {
        fontSize: 11,
        color: "#650000",
    },
    cargoContainer: {
        height: 42,
        borderWidth: 1,
        borderColor: "#70AAA9",
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        marginBottom: 24,
        justifyContent: "center",
        overflow: "hidden",
    },

    cargoPicker: {
        width: "100%",
        height: 42,
        color: "#83B8B8",
    },
})