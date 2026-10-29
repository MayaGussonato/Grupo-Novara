import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import styles from "./FooterStyle";

const icones = [
  {
    nome: "Dashboard",
    imagem: require("../../assets/Dashboard.png"),
  },
  {
    nome: "Documento",
    imagem: require("../../assets/Documento.png"),
  },
  {
    nome: "Integrar",
    imagem: require("../../assets/Integrar.png"),
  },
  {
    nome: "Opcoes",
    imagem: require("../../assets/Opcoes.png"),
  },
];

export default function Footer() {
  return (
    <View style={styles.footer}>
      {icones.map((icone) => (
        <TouchableOpacity
          key={icone.nome}
          style={styles.botao}
          onPress={() => console.log(icone.nome)}
        >
         
<Image
  source={icone.imagem}
  style={[
    styles.icone,
    { tintColor: "#217E7A" },
  ]}
/>

        </TouchableOpacity>
      ))}
    </View>
  );
}

