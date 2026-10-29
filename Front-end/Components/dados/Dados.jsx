
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Styles as styles } from "./DadosStyles";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const dados = [
  { campo: "Documento", valor: "NF-18291" },
  { campo: "CNPJ", valor: "12.345.678/0001-90" },
  { campo: "Data", valor: "12/12/2026" },
  { campo: "Valor", valor: "4.580,00" },
  { campo: "Fornecedor", valor: "Empresa ABC" },
];

const formatos = [
  { nome: "JSON", icone: "code-json" },
  { nome: "XML", icone: "xml" },
  { nome: "CSV", icone: "file-delimited" },
  { nome: "Excel", icone: "file-excel" },
];

export default function Dados() {
  const [formatoSelecionado, setFormatoSelecionado] = useState("JSON");

  function exportar() {
    Alert.alert(
      "Exportação",
      `Formato selecionado: ${formatoSelecionado}. Para gerar o arquivo, conecte a função de exportação.`
    );
  }

  return (
    <View style={styles.container}>
      <Header
        titulo="Dados do Documento"
      />
      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Dados extraídos */}
        <View style={styles.cardDados}>
          {dados.map((item) => (
            <View key={item.campo} style={styles.linhaDado}>
              <Text style={styles.nomeCampo}>{item.campo}</Text>
              <Text style={styles.valorCampo}>{item.valor}</Text>
            </View>
          ))}
        </View>

        {/* Formatos de exportação */}
        <Text style={styles.tituloExportar}>
          Exportar dados como:
        </Text>

        <View style={styles.listaFormatos}>
          {formatos.map((formato) => {
            const selecionado =
              formatoSelecionado === formato.nome;

            return (
              <TouchableOpacity
                key={formato.nome}
                style={[
                  styles.formato,
                  selecionado && styles.formatoSelecionado,
                ]}
                onPress={() =>
                  setFormatoSelecionado(formato.nome)
                }
                activeOpacity={0.7}
              >
                <View style={styles.iconeArquivo}>
                  <MaterialCommunityIcons
                    name={formato.icone}
                    size={30}
                    color="#650000"
                  />
                </View>

                <Text style={styles.nomeFormato}>
                  {formato.nome}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Botão exportar */}
        <TouchableOpacity
          style={styles.botaoExportar}
          activeOpacity={0.8}
          onPress={exportar}
        >
          <Text style={styles.textoBotao}>
            Exportar
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
}
