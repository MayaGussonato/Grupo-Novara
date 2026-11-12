
import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import MaterialCommunityIcons from "@react-native-vector-icons/material-design-icons";

import { criarDadosStyles } from "./DadosStyles";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useTema } from "../tema/TemaContext";
import {
  buscarDocumento,
  buscarExtracoes,
} from "../../Services/documentoService";

const formatos = [
  { nome: "JSON", icone: "code-json" },
  { nome: "XML", icone: "xml" },
  { nome: "CSV", icone: "file-delimited" },
  { nome: "Excel", icone: "file-excel" },
];

export default function Dados({ route }) {
  const [formatoSelecionado, setFormatoSelecionado] = useState("JSON");

  const idDocumento = route?.params?.idDocumento;

  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const { cores, modoEscuro } = useTema();

  const styles = useMemo(
    () => criarDadosStyles(cores, modoEscuro),
    [cores, modoEscuro]
  );

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (!idDocumento) {
        setCarregando(false);
        return;
      }

      try {
        setErro(null);

        const documento = await buscarDocumento(idDocumento);
        const extracoes = await buscarExtracoes(idDocumento);

        const ultima =
          Array.isArray(extracoes) && extracoes.length > 0
            ? extracoes[0]
            : null;

        let json = {};

        if (ultima?.dadosEstruturados) {
          json =
            typeof ultima.dadosEstruturados === "string"
              ? JSON.parse(ultima.dadosEstruturados)
              : ultima.dadosEstruturados;
        }

        const linhas = [];

        Object.entries(json).forEach(([chave, valor]) => {
          if (valor === null || valor === undefined) {
            return;
          }

          if (typeof valor === "object" && "valor" in valor) {
            if (valor.valor === null || valor.valor === undefined) {
              return;
            }

            linhas.push({
              campo: chave.replace(/_/g, " "),
              valor: valor.valor_normalizado || valor.valor,
            });

            return;
          }

          if (typeof valor === "string") {
            linhas.push({ campo: chave.replace(/_/g, " "), valor });
          }
        });

        if (ativo) {
          setDados(
            linhas.length > 0
              ? linhas
              : [{ campo: "Documento", valor: documento?.nomeArquivo || "—" }]
          );
        }
      } catch (falha) {
        if (ativo) {
          setErro(falha.message || "Não foi possível carregar os dados.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
  }, [idDocumento]);

  function exportar() {
    Alert.alert(
      "Exportação",
      `Formato selecionado: ${formatoSelecionado}. A exportação de arquivo será habilitada na próxima etapa.`
    );
  }

  return (
    <View style={styles.container}>
      <Header titulo="Dados do Documento" />

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardDados}>
          {carregando ? (
            <ActivityIndicator
              style={{ marginVertical: 20 }}
              color={cores.primario}
            />
          ) : dados.length > 0 ? (
            dados.map((item) => (
              <View key={item.campo} style={styles.linhaDado}>
                <Text style={styles.nomeCampo}>
                  {item.campo}
                </Text>

                <Text style={styles.valorCampo}>
                  {item.valor}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.valorCampo}>
              {erro || "Nenhum dado extraído para este documento."}
            </Text>
          )}
        </View>

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
                    color={cores.vinho}
                  />
                </View>

                <Text style={styles.nomeFormato}>
                  {formato.nome}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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
