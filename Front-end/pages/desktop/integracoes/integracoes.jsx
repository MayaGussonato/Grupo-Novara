import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MenuGlobal from '../../../components/MenuGlobal/MenuGlobal';
import styles, { cores } from './integracoesStyle';

// Dados de exemplo — trocar pela chamada da API depois
const INTEGRACOES = [
  { id: 1, nome: 'SAP', icone: 'alpha-s-circle', cor: '#0A6ED1', conectado: true, descricao: 'Integração de notas fiscais e dados cadastrais', sync: '15/10/2026 às 14:32' },
  { id: 2, nome: 'TOTVS', icone: 'hexagon-multiple', cor: '#1B3A6B', conectado: true, descricao: 'Integração de documentos e dados cadastrais', sync: '15/10/2026 às 14:32' },
  { id: 3, nome: 'Microsoft Dynamics 365', icone: 'microsoft', cor: '#0B53CE', conectado: true, descricao: 'Integração com dados de pacientes e registros clínicos', sync: '15/10/2026 às 14:32' },
  { id: 4, nome: 'Google Drive', icone: 'google-drive', cor: '#1FA463', conectado: true, descricao: 'Sincronização de documentos e laudos em pastas', sync: '15/10/2026 às 14:32' },
  { id: 5, nome: 'OneDrive', icone: 'microsoft-onedrive', cor: '#0A78D4', conectado: false, descricao: 'Sincronizar seus documentos da nuvem Microsoft.', sync: null },
  { id: 6, nome: 'API Personalizada', icone: 'api', cor: '#2E86C1', conectado: true, descricao: 'Conexão via API própria da instituição', sync: '15/10/2026 às 14:32' },
  { id: 7, nome: 'Oracle', icone: 'database', cor: '#C74634', conectado: true, descricao: 'Integração com banco de dados corporativo', sync: '14/10/2026 às 22:10' },
  { id: 8, nome: 'Salesforce', icone: 'salesforce', cor: '#00A1E0', conectado: true, descricao: 'Integração de clientes e atendimentos', sync: '14/10/2026 às 18:45' },
  { id: 9, nome: 'Dropbox', icone: 'dropbox', cor: '#0061FF', conectado: false, descricao: 'Sincronizar documentos armazenados no Dropbox.', sync: null },
  { id: 10, nome: 'Amazon S3', icone: 'aws', cor: '#FF9900', conectado: true, descricao: 'Armazenamento de arquivos e backups de documentos', sync: '15/10/2026 às 09:05' },
  { id: 11, nome: 'Slack', icone: 'slack', cor: '#4A154B', conectado: true, descricao: 'Alertas de validação e documentos pendentes', sync: '15/10/2026 às 13:20' },
  { id: 12, nome: 'Microsoft Teams', icone: 'microsoft-teams', cor: '#5059C9', conectado: false, descricao: 'Notificações de atendimentos para equipes.', sync: null },
  { id: 13, nome: 'Power BI', icone: 'chart-box', cor: '#F2C811', conectado: true, descricao: 'Envio de indicadores para painéis e relatórios', sync: '13/10/2026 às 20:00' },
  { id: 14, nome: 'Jira', icone: 'jira', cor: '#0052CC', conectado: false, descricao: 'Abertura de chamados a partir de atendimentos.', sync: null },
  { id: 15, nome: 'Azure DevOps', icone: 'microsoft-azure-devops', cor: '#0078D7', conectado: true, descricao: 'Integração de fluxos e automações internas', sync: '12/10/2026 às 16:48' },
  { id: 16, nome: 'Gmail', icone: 'gmail', cor: '#D93025', conectado: true, descricao: 'Recebimento de documentos enviados por e-mail', sync: '15/10/2026 às 14:01' },
  { id: 17, nome: 'WhatsApp Business', icone: 'whatsapp', cor: '#25D366', conectado: false, descricao: 'Receber documentos e notificar clientes.', sync: null },
  { id: 18, nome: 'Zapier', icone: 'lightning-bolt', cor: '#FF4A00', conectado: true, descricao: 'Automação de fluxos entre aplicativos', sync: '11/10/2026 às 11:30' },
];

const OPCOES_FILTRO = [
  { valor: 'todas', rotulo: 'Todas' },
  { valor: 'conectadas', rotulo: 'Conectadas' },
  { valor: 'desconectadas', rotulo: 'Desconectadas' },
];

export default function Integracoes({ activeMenu, onNavigate }) {
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todas');
  const [filtroAberto, setFiltroAberto] = useState(false);

  const lista = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return INTEGRACOES.filter((item) => {
      if (filtro === 'conectadas' && !item.conectado) return false;
      if (filtro === 'desconectadas' && item.conectado) return false;
      if (!termo) return true;
      return (
        item.nome.toLowerCase().includes(termo) ||
        item.descricao.toLowerCase().includes(termo)
      );
    });
  }, [busca, filtro]);

  // Agrupa em linhas de 3 e completa com espaços vazios para o último card não esticar
  const linhas = useMemo(() => {
    const resultado = [];
    for (let i = 0; i < lista.length; i += 3) {
      const grupo = lista.slice(i, i + 3);
      while (grupo.length < 3) grupo.push(null);
      resultado.push(grupo);
    }
    return resultado;
  }, [lista]);

  return (
    <View style={styles.container}>
      <MenuGlobal activeMenu={activeMenu} onNavigate={onNavigate} />

      <ScrollView
        style={styles.conteudo}
        contentContainerStyle={styles.conteudoInterno}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cabecalho}>
          <View style={styles.tituloLinha}>
            <MaterialCommunityIcons name="power-plug-outline" size={28} color={cores.titulo} />
            <Text style={styles.titulo}>Integrações Corporativas</Text>
          </View>
          <Text style={styles.subtitulo}>Conecte o LabFlow aos sistemas da sua instituição</Text>
        </View>

        <View style={styles.barraAcoes}>
          <View style={styles.barraEsquerda}>
            <View style={styles.campoBusca}>
              <MaterialCommunityIcons name="magnify" size={18} color={cores.principal} />
              <TextInput
                style={styles.inputBusca}
                placeholder="Pesquisar integração..."
                placeholderTextColor="#7A8A8A"
                value={busca}
                onChangeText={setBusca}
              />
            </View>

            <TouchableOpacity
              style={[styles.botaoFiltro, filtro !== 'todas' && styles.botaoFiltroAtivo]}
              onPress={() => setFiltroAberto((aberto) => !aberto)}
            >
              <MaterialCommunityIcons
                name="filter-outline"
                size={20}
                color={filtro !== 'todas' ? cores.branco : cores.principal}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.botaoMais}>
            <MaterialCommunityIcons name="plus" size={24} color={cores.branco} />
          </TouchableOpacity>

          {filtroAberto && (
            <View style={styles.menuFiltro}>
              <Text style={styles.tituloMenuFiltro}>Status</Text>
              {OPCOES_FILTRO.map((opcao) => {
                const ativo = filtro === opcao.valor;
                return (
                  <TouchableOpacity
                    key={opcao.valor}
                    style={[styles.itemFiltro, ativo && styles.itemFiltroAtivo]}
                    onPress={() => {
                      setFiltro(opcao.valor);
                      setFiltroAberto(false);
                    }}
                  >
                    <Text style={styles.textoItemFiltro}>{opcao.rotulo}</Text>
                    {ativo && <MaterialCommunityIcons name="check" size={18} color={cores.principal} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.grade}>
          {linhas.map((linha, indice) => (
            <View key={indice} style={styles.linhaCards}>
              {linha.map((item, pos) =>
                item === null ? (
                  <View key={`vazio-${pos}`} style={styles.cardVazio} />
                ) : (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardTopo}>
                  <View style={styles.logoLinha}>
                    <MaterialCommunityIcons name={item.icone} size={38} color={item.cor} />
                    <Text style={styles.nomeIntegracao}>{item.nome}</Text>
                  </View>
                  <View
                    style={[
                      styles.selo,
                      item.conectado ? styles.seloConectado : styles.seloDesconectado,
                    ]}
                  >
                    <View
                      style={[
                        styles.seloPonto,
                        { backgroundColor: item.conectado ? cores.verde : '#8A9494' },
                      ]}
                    />
                    <Text
                      style={[
                        styles.seloTexto,
                        { color: item.conectado ? cores.verde : '#5F6B6B' },
                      ]}
                    >
                      {item.conectado ? 'Conectado' : 'Desconectado'}
                    </Text>
                  </View>
                </View>

                <View style={styles.linhaInfo}>
                  <MaterialCommunityIcons name="plus" size={16} color={cores.texto} />
                  <Text style={styles.textoInfo}>{item.descricao}</Text>
                </View>

                {item.sync && (
                  <View style={styles.linhaInfo}>
                    <MaterialCommunityIcons name="sync" size={16} color={cores.texto} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.rotuloSync}>Última sincronização</Text>
                      <Text style={styles.dataSync}>{item.sync}</Text>
                    </View>
                  </View>
                )}
              </View>
                )
              )}
            </View>
          ))}
        </View>

        {lista.length === 0 && (
            <View style={styles.vazio}>
              <MaterialCommunityIcons name="power-plug-off-outline" size={40} color={cores.textoSuave} />
              <Text style={styles.textoVazio}>Nenhuma integração encontrada</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}