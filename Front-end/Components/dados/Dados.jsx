
import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
} from '@expo-google-fonts/poppins';

import styles from './DadosStyles';

import DocumentoIcon from '../../assets/Documento.png';
import JsonIcon from '../../assets/Json.png';
import OpcoesIcon from '../../assets/Opcoes.png';
import PerfilIcon from '../../assets/Perfil.png';

const DADOS = [
  { label: 'Documento', valor: 'NF-18291' },
  { label: 'CNPJ', valor: '12.345.678/0001-90' },
  { label: 'Data', valor: '12/12/2026' },
  { label: 'Valor', valor: '4.580,00' },
  { label: 'Fornecedor', valor: 'Empresa ABC' },
];

const FORMATOS = [
  { id: 'JSON', nome: 'JSON', imagem: JsonIcon },
  { id: 'XML', nome: 'XML', imagem: DocumentoIcon },
  { id: 'CSV', nome: 'CSV', imagem: DocumentoIcon },
  { id: 'Excel', nome: 'Excel', imagem: DocumentoIcon },
];

export default function Dados() {
  const [formatoSelecionado, setFormatoSelecionado] = useState('JSON');

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  function exportarDados() {
    Alert.alert(
      'Exportar dados',
      `Formato selecionado: ${formatoSelecionado}\n\nA geração e o download do arquivo ainda precisam ser implementados.`
    );
  }

  if (!fontsLoaded) {
    return (
      <View style={styles.carregando}>
        <ActivityIndicator size="large" color="#237E7E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* CABEÇALHO */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menu}
            onPress={() => {}}
            accessibilityLabel="Abrir menu"
          >
            <Image
              source={OpcoesIcon}
              style={styles.iconeMenu}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <Text style={styles.titulo}>Dados do Documento</Text>

          <TouchableOpacity
            style={styles.botaoPerfil}
            onPress={() => {}}
            accessibilityLabel="Perfil do usuário"
          >
            <Image
              source={PerfilIcon}
              style={styles.iconePerfil}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* CONTEÚDO */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >
          {/* DADOS DO DOCUMENTO */}
          <View style={styles.cardDados}>
            {DADOS.map((item) => (
              <View key={item.label} style={styles.campo}>
                <Text style={styles.labelCampo}>{item.label}</Text>

                <Text style={styles.valorCampo} numberOfLines={1}>
                  {item.valor}
                </Text>
              </View>
            ))}
          </View>

          {/* EXPORTAÇÃO */}
          <View style={styles.areaExportacao}>
            <Text style={styles.tituloExportacao}>
              Exportar dados como:
            </Text>

            <View style={styles.formatos}>
              {FORMATOS.map((formato) => {
                const selecionado =
                  formatoSelecionado === formato.id;

                return (
                  <TouchableOpacity
                    key={formato.id}
                    style={styles.opcaoFormato}
                    onPress={() => setFormatoSelecionado(formato.id)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.iconeFormato,
                        selecionado && styles.formatoSelecionado,
                      ]}
                    >
                      <Image
                        source={formato.imagem}
                        style={styles.iconeImagemFormato}
                        resizeMode="contain"
                      />
                    </View>

                    <Text
                      style={[
                        styles.nomeFormato,
                        selecionado && styles.nomeFormatoSelecionado,
                      ]}
                    >
                      {formato.nome}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* BOTÃO EXPORTAR */}
            <TouchableOpacity
              style={styles.botaoExportar}
              onPress={exportarDados}
              activeOpacity={0.8}
            >
              <Text style={styles.textoBotaoExportar}>
                Exportar
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
