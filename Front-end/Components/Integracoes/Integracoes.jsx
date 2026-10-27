
import React from 'react';
import { View,Text,Image, ScrollView,TouchableOpacity,SafeAreaView,ActivityIndicator,} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {useFonts,Poppins_400Regular,Poppins_500Medium,Poppins_600SemiBold,} from '@expo-google-fonts/poppins';

import styles from './IntegracoesStyles';

import DocumentoIcon from '../../assets/Documento.png';
import NuvemIcon from '../../assets/Nuvem.png';
import LinkIcon from '../../assets/Link.png';
import MoedasIcon from '../../assets/Moedas.png';

const integracoes = [
  { id: '1', modelo: 'PNG', arquivo: 'Carlos' },
  { id: '2', modelo: 'PNG', arquivo: 'Carlos' },
  { id: '3', modelo: 'PNG', arquivo: 'Carlos' },
];

const tipos = [
  { id: 'api', nome: 'API REST', imagem: NuvemIcon },
  { id: 'webhook', nome: 'Webhook', imagem: LinkIcon },
  { id: 'json', nome: 'JSON', imagem: DocumentoIcon },
  { id: 'banco', nome: 'Banco de dados', imagem: MoedasIcon },
];

export default function Integracoes() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  function selecionarTipo(nome) {
    console.log('Tipo selecionado:', nome);
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
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.botaoMenu}
            onPress={() => {}}
            accessibilityLabel="Abrir menu"
          >
            <Ionicons name="ellipsis-horizontal" size={25} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.tituloHeader}>Integrações</Text>

          <TouchableOpacity
            style={styles.botaoPerfil}
            onPress={() => {}}
            accessibilityLabel="Perfil"
          >
            <Ionicons
              name="person-circle-outline"
              size={38}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.conteudo}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.listaIntegracoes}>
            {integracoes.map((item) => (
              <View key={item.id} style={styles.cardIntegracao}>
                <Image
                  source={DocumentoIcon}
                  style={styles.iconeDocumento}
                  resizeMode="contain"
                />

                <View style={styles.infoIntegracao}>
                  <Text style={styles.nomeIntegracao}>
                    Modelo: {item.modelo}
                  </Text>
                  <Text style={styles.arquivoIntegracao}>
                    Arquivo de: {item.arquivo}
                  </Text>
                </View>

                <View style={styles.statusConcluido}>
                  <Ionicons
                    name="checkmark-circle"
                    size={12}
                    color="#155C37"
                  />
                  <Text style={styles.textoStatus}>Concluído</Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.botaoAdicionar}
            activeOpacity={0.8}
            onPress={() => selecionarTipo('Nova integração')}
          >
            <Text style={styles.textoBotaoAdicionar}>
              Adicionar integração
            </Text>
          </TouchableOpacity>

          <Text style={styles.tituloTipos}>Tipos de integração</Text>

          <View style={styles.gradeTipos}>
            {tipos.map((tipo) => (
              <TouchableOpacity
                key={tipo.id}
                style={styles.cardTipo}
                activeOpacity={0.75}
                onPress={() => selecionarTipo(tipo.nome)}
              >
                <Image
                  source={tipo.imagem}
                  style={styles.iconeTipo}
                  resizeMode="contain"
                />
                <Text style={styles.nomeTipo}>{tipo.nome}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.cardTipo}
              activeOpacity={0.75}
              onPress={() => selecionarTipo('ERP')}
            >
              <Ionicons name="code-slash" size={30} color="#5D0808" />
              <Text style={styles.nomeTipo}>ERP</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
