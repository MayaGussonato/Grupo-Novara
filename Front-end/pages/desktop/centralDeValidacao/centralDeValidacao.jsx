import React, { useState, useMemo } from 'react';
import { View, Text, Pressable, ScrollView, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MenuGlobal from '../../../components/MenuGlobal/MenuGlobal';
import { styles as docStyles, docColors } from '../centralDeDocumentos/centralDeDocumentosStyle';
import { DocumentViewer } from '../analiseDeDocumentos/analiseDeDocumentos';
import styles from './centralDeValidacaoStyle';

const COR = '#174847';
const ZOOM_MIN = 50;
const ZOOM_MAX = 300;
const ZOOM_STEP = 25;

const SAMPLE_DOC = {
  id: 0,
  nome: 'NF-18291.pdf',
  tipo: 'Nota Fiscal',
  status: 'Revisão',
  confianca: 85,
  data: '15/10/2026',
};

const CAMPOS = [
  { key: 'empresa', label: 'Empresa', icon: 'business-outline', confianca: 100 },
  { key: 'cnpj', label: 'CNPJ', icon: 'scan-outline', confianca: 72 },
  { key: 'data', label: 'Data de entrada', icon: 'calendar-outline', confianca: 100 },
  { key: 'modelo', label: 'Modelo de Documento', icon: 'document-text-outline', confianca: 99 },
  { key: 'numero', label: 'Número do Contrato', icon: 'keypad-outline', confianca: 100 },
  { key: 'vigencia', label: 'Vigência', icon: 'time-outline', confianca: 100 },
  { key: 'valor', label: 'Valor', icon: 'pricetag-outline', confianca: 100 },
];

function CampoLinha({ campo, valor, editando, onChange, ultimo }) {
  const nivel = campo.confianca >= 100 ? 'alta' : campo.confianca >= 80 ? 'media' : 'baixa';
  const badgeStyle = [styles.badgeConf, styles[`badgeConf_${nivel}`]];
  const textStyle = [styles.badgeConfTexto, styles[`badgeConfTexto_${nivel}`]];

  return (
    <View style={[styles.campo, !ultimo && styles.campoLinha]}>
      <View style={styles.campoIcone}>
        <Ionicons name={campo.icon} size={22} color="#E8F4F3" />
      </View>
      <View style={styles.campoTextos}>
        <Text style={styles.campoLabel}>{campo.label}</Text>
        {editando ? (
          <TextInput style={styles.campoInput} value={valor} onChangeText={onChange} />
        ) : (
          <Text style={styles.campoValor} numberOfLines={1}>{valor}</Text>
        )}
      </View>
      <View style={badgeStyle}>
        <Text style={textStyle}>{campo.confianca}%</Text>
      </View>
    </View>
  );
}

export default function CentralDeValidacao({
  activeMenu = 'documentos',
  onNavigate,
  doc,
  previewSource,
  onBack,
  onSave,
  onDelete,
}) {
  const base = doc || SAMPLE_DOC;

  const [valores, setValores] = useState({
    empresa: 'Microsoft Ltda.',
    cnpj: '12.345.678/0001-90',
    data: base.data || '10/10/2026',
    modelo: base.tipo || 'Nota Fiscal Eletrônica',
    numero: '18291',
    vigencia: '12 meses',
    valor: 'R$ 48.000,00',
  });
  const [editando, setEditando] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [tela, setTela] = useState(false);
  const [confirmarExclusao, setConfirmarExclusao] = useState(false);

  const nome = base.nome;
  const tipo = base.tipo || 'Nota fiscal';
  const data = base.data || '15/10/2026';
  const status = base.status || 'Revisão';

  const source =
    previewSource ||
    base.imagem ||
    (base.previewUri ? { uri: base.previewUri } : null);

  const previewDoc = useMemo(
    () => ({ ...base, tipo: valores.modelo, data: valores.data, numero: valores.numero }),
    [base, valores.modelo, valores.data, valores.numero]
  );

  const baixas = CAMPOS.filter((c) => c.confianca < 80);

  const atualizar = (key, texto) => {
    setValores((prev) => ({ ...prev, [key]: texto }));
  };

  const salvar = () => {
    setEditando(false);
    if (onSave) onSave(doc, { status: 'Conclusão', data: valores.data });
  };

  const excluir = () => {
    setConfirmarExclusao(false);
    if (onDelete) onDelete(doc);
  };

  const statusEstilo =
    status === 'Conclusão' ? styles.statusConclusao : status === 'Erro' ? styles.statusErro : styles.statusRevisao;

  return (
    <View style={styles.container}>
      <MenuGlobal activeMenu={activeMenu} onNavigate={onNavigate} />
      <ScrollView style={docStyles.main} contentContainerStyle={docStyles.mainContent} showsVerticalScrollIndicator={false}>
        <Pressable
          style={({ hovered }) => [styles.botaoVoltar, hovered && styles.botaoVoltarHover]}
          onPress={onBack}
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back-outline" size={18} color="#FFFFFF" />
        </Pressable>

        <View style={docStyles.titleRow}>
          <Ionicons name="shield-checkmark-outline" size={32} color={docColors.sidebar} style={docStyles.titleIcon} />
          <Text style={docStyles.title}>Central de Validação</Text>
        </View>
        <Text style={docStyles.subtitle}>Revise e aprove as informações extraídas pela IA.</Text>

        <View style={styles.card}>
          <View style={styles.cardCabecalho}>
            <Ionicons name="document-text-outline" size={34} color={COR} />
            <View style={styles.cardCabecalhoTextos}>
              <Text style={styles.docNome}>{nome}</Text>
              <Text style={styles.docSub}>{`${tipo} • ${data} • ${valores.empresa}`}</Text>
            </View>
            <View style={[styles.status, statusEstilo]}>
              <Text style={styles.statusTexto}>{status}</Text>
            </View>
          </View>

          <View style={styles.corpo}>
            <View style={styles.colunaEsquerda}>
              <DocumentViewer
                doc={previewDoc}
                source={source}
                zoom={zoom}
                baseWidth={360}
                frameStyle={styles.previa}
              />

              <View style={styles.barraZoom}>
                <Ionicons name="search-outline" size={22} color="#FFFFFF" />
                <View style={styles.zoomControles}>
                  <Pressable
                    onPress={() => setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP))}
                    style={styles.zoomBotao}
                    accessibilityLabel="Diminuir zoom"
                  >
                    <Ionicons name="remove-outline" size={16} color="#FFFFFF" />
                  </Pressable>
                  <Pressable onPress={() => setZoom(100)} accessibilityLabel="Voltar o zoom para 100%">
                    <Text style={styles.zoomTexto}>{zoom}%</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP))}
                    style={styles.zoomBotao}
                    accessibilityLabel="Aumentar zoom"
                  >
                    <Ionicons name="add-outline" size={16} color="#FFFFFF" />
                  </Pressable>
                </View>
                <Pressable onPress={() => setTela(true)} accessibilityLabel="Tela cheia">
                  <Ionicons name="expand-outline" size={22} color="#FFFFFF" />
                </Pressable>
              </View>

              <View style={styles.acoes}>
                <Pressable
                  onPress={() => setEditando(!editando)}
                  style={({ hovered }) => [styles.acao, (hovered || editando) && styles.acaoAtiva]}
                >
                  <Ionicons name="create-outline" size={16} color="#6B1010" />
                  <Text style={styles.acaoTexto}>Editar</Text>
                </Pressable>
                <Pressable
                  onPress={() => setConfirmarExclusao(true)}
                  style={({ hovered }) => [styles.acao, hovered && styles.acaoAtiva]}
                >
                  <Ionicons name="trash-outline" size={16} color="#6B1010" />
                  <Text style={styles.acaoTexto}>Deletar</Text>
                </Pressable>
                <Pressable onPress={salvar} style={({ hovered }) => [styles.acao, hovered && styles.acaoAtiva]}>
                  <Ionicons name="save-outline" size={16} color="#6B1010" />
                  <Text style={styles.acaoTexto}>Salvar</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.painel}>
              <View style={styles.painelTitulo}>
                <Ionicons name="information-circle-outline" size={28} color="#FFFFFF" />
                <Text style={styles.painelTituloTexto}>Informações Extraídas</Text>
              </View>

              <View style={styles.painelLista}>
                {CAMPOS.map((campo, i) => (
                  <CampoLinha
                    key={campo.key}
                    campo={campo}
                    valor={valores[campo.key]}
                    editando={editando}
                    onChange={(t) => atualizar(campo.key, t)}
                    ultimo={i === CAMPOS.length - 1}
                  />
                ))}
              </View>

              {baixas.length > 0 && (
                <View style={styles.atencao}>
                  <View style={styles.atencaoTitulo}>
                    <Ionicons name="alert-circle-outline" size={24} color={COR} />
                    <Text style={styles.atencaoTituloTexto}>Atenção</Text>
                  </View>
                  {baixas.map((c) => (
                    <Text key={c.key} style={styles.atencaoTexto}>
                      {`O campo ${c.label} apresentou baixa confiança (${c.confianca}%).`}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={tela} transparent animationType="fade" onRequestClose={() => setTela(false)}>
        <Pressable style={styles.overlay} onPress={() => setTela(false)}>
          <Pressable style={styles.telaCheia} onPress={() => {}}>
            <View style={styles.telaCheiaCabecalho}>
              <Text style={styles.telaCheiaNome} numberOfLines={1}>{nome}</Text>
              <Pressable onPress={() => setTela(false)} accessibilityLabel="Fechar">
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </Pressable>
            </View>
            <View style={styles.telaCheiaCorpo}>
              <DocumentViewer
                doc={previewDoc}
                source={source}
                zoom={zoom}
                baseWidth={520}
                frameStyle={styles.telaCheiaFrame}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal visible={confirmarExclusao} transparent animationType="fade" onRequestClose={() => setConfirmarExclusao(false)}>
        <Pressable style={styles.overlay} onPress={() => setConfirmarExclusao(false)}>
          <Pressable style={styles.confirmacao} onPress={() => {}}>
            <Ionicons name="trash-outline" size={32} color="#6B1010" />
            <Text style={styles.confirmacaoTitulo}>Deletar documento?</Text>
            <Text style={styles.confirmacaoTexto}>{`${nome} será removido. Essa ação não pode ser desfeita.`}</Text>
            <View style={styles.confirmacaoAcoes}>
              <Pressable style={styles.confirmacaoCancelar} onPress={() => setConfirmarExclusao(false)}>
                <Text style={styles.confirmacaoCancelarTexto}>Cancelar</Text>
              </Pressable>
              <Pressable style={styles.confirmacaoConfirmar} onPress={excluir}>
                <Text style={styles.confirmacaoConfirmarTexto}>Deletar</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}