import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  Modal,
  Platform,
} from 'react-native';
import Svg, { Circle, SvgXml } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

import MenuGlobal from '../../../components/MenuGlobal/MenuGlobal';
import {
  styles,
  docColors,
  accent,
  progressColor,
  processingColor,
} from './analiseDeDocumentosStyle';
import {
  PAGE_RATIO,
  buildChecks,
  buildDocumentSvg,
  downloadDocumentImage,
  getNumero,
  getStatusView,
} from './analiseUtils';

const SAMPLE_DOC = {
  id: 0,
  nome: 'NF-18291.pdf',
  tipo: 'Nota Fiscal',
  status: 'Processando',
  confianca: 85,
  data: '14/10/2026',
};

const SAMPLE_CHECKS = [
  { key: 'itens', label: 'Itens conferidos', description: 'Todos os itens foram identificados corretamente', value: 100, ok: true },
  { key: 'campos', label: 'Campo que requer atenção', description: '4 campos com possíveis divergências', value: 33, ok: false },
  { key: 'consistencia', label: 'Consistência dos dados', description: 'Dados coerentes com o padrão da empresa', value: 80, ok: true },
];

const TONES = {
  done: { bg: docColors.conclusaoBg, color: docColors.conclusaoText },
  review: { bg: docColors.revisaoBg, color: docColors.revisaoText },
  error: { bg: docColors.erroBg, color: docColors.erroText },
  processing: { bg: processingColor, color: '#FFFFFF' },
};

const FIELDS = [
  { key: 'nome', label: 'Documento' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'numero', label: 'Número' },
  { key: 'data', label: 'Data de emissão' },
];

const ZOOM_MIN = 50;
const ZOOM_MAX = 300;
const ZOOM_STEP = 25;

function initialValues(d) {
  return {
    nome: d.nome || '',
    tipo: d.tipo || '',
    numero: getNumero(d),
    data: d.data || '',
  };
}

function formatDate(text) {
  const digits = text.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean).join('/');
}

function isValidDate(text) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text);
  if (!m) return false;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function ProgressRing({ value, size = 130, stroke = 14 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, value));
  const center = size / 2;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle cx={center} cy={center} r={radius} stroke="#8E8E8E" strokeWidth={stroke} fill="none" />
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={progressColor}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference * (1 - pct / 100)}
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      </Svg>
      <View style={styles.progressCenter} pointerEvents="none">
        <Text style={styles.progressValue}>{pct}%</Text>
      </View>
    </View>
  );
}

export function DocumentViewer({ doc, source, zoom, baseWidth, frameStyle }) {
  const [frame, setFrame] = useState({ width: 0, height: 0 });
  const webRef = useRef(null);

  const pageW = Math.round((baseWidth * zoom) / 100);
  const pageH = Math.round(pageW * PAGE_RATIO);
  const xml = useMemo(() => (source ? null : buildDocumentSvg(doc)), [doc, source]);
  const innerW = Math.max(pageW + 24, frame.width - 2);
  const innerH = Math.max(pageH + 24, frame.height - 2);

  useEffect(() => {
    if (Platform.OS !== 'web') return undefined;
    const el = webRef.current;
    if (!el || !el.addEventListener) return undefined;

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let startLeft = 0;
    let startTop = 0;

    function onDown(e) {
      if (e.button !== 0) return;
      if (e.offsetX > el.clientWidth || e.offsetY > el.clientHeight) return;
      dragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = el.scrollLeft;
      startTop = el.scrollTop;
      el.style.cursor = 'grabbing';
    }
    function onMove(e) {
      if (!dragging) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
      el.scrollTop = startTop - (e.clientY - startY);
    }
    function onUp() {
      if (!dragging) return;
      dragging = false;
      el.style.cursor = 'grab';
    }

    el.style.cursor = 'grab';
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const page = (
    <View style={styles.pageShadow}>
      {source ? (
        <Image source={source} resizeMode="contain" style={{ width: pageW, height: pageH }} />
      ) : (
        <SvgXml xml={xml} width={pageW} height={pageH} />
      )}
    </View>
  );

  return (
    <View style={frameStyle} onLayout={(e) => setFrame(e.nativeEvent.layout)}>
      {Platform.OS === 'web' ? (
        <View ref={webRef} style={styles.viewerWeb}>
          <View style={{ width: innerW, height: innerH, alignItems: 'center', justifyContent: 'center' }}>
            {page}
          </View>
        </View>
      ) : (
        <ScrollView
          style={styles.viewerScroll}
          contentContainerStyle={{ minHeight: Math.max(0, frame.height - 2), justifyContent: 'center' }}
          nestedScrollEnabled
        >
          <ScrollView
            horizontal
            style={styles.viewerScrollX}
            contentContainerStyle={{
              minWidth: Math.max(0, frame.width - 2),
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
            }}
            nestedScrollEnabled
          >
            {page}
          </ScrollView>
        </ScrollView>
      )}
    </View>
  );
}

function SquareButton({ icon, onPress, label }) {
  return (
    <Pressable onPress={onPress} style={styles.squareButton} accessibilityRole="button" accessibilityLabel={label}>
      <Ionicons name={icon} size={24} color="#FFFFFF" />
    </Pressable>
  );
}

function OutlineButton({ icon, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ hovered }) => [styles.outlineButton, hovered && styles.outlineButtonHover]}
    >
      <Ionicons name={icon} size={18} color={accent} />
      <Text style={styles.outlineButtonText}>{label}</Text>
    </Pressable>
  );
}

function SectionHeader({ icon, title }) {
  return (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={22} color={docColors.sidebar} style={styles.sectionIcon} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

export default function AnaliseDeDocumentos({
  activeMenu = 'documentos',
  onNavigate,
  onBack,
  doc,
  previewSource,
  onReprocess,
  onSaveAnalysis,
}) {
  const base = doc || SAMPLE_DOC;

  const [zoom, setZoom] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState(() => initialValues(base));
  const [notice, setNotice] = useState(null);
  const noticeTimer = useRef(null);

  useEffect(() => () => clearTimeout(noticeTimer.current), []);

  const previewDoc = useMemo(() => ({ ...base, ...values }), [base, values]);
  const source = previewSource || base.imagem || null;

  const view = getStatusView(base.status);
  const tone = TONES[view.tone];
  const checks = doc ? buildChecks(doc) : SAMPLE_CHECKS;

  function handleNavigate(key) {
    if (onNavigate) onNavigate(key);
  }
  function showNotice(type, text) {
    setNotice({ type, text });
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(null), 3500);
  }
  function zoomIn() {
    setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP));
  }
  function zoomOut() {
    setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP));
  }
  function changeValue(key, text) {
    setValues((prev) => ({ ...prev, [key]: key === 'data' ? formatDate(text) : text }));
  }
  function toggleEditing() {
    if (editing) {
      setValues(initialValues(base));
      setEditing(false);
    } else {
      setEditing(true);
    }
  }

  async function handleDownload() {
    const result = await downloadDocumentImage(previewDoc, source);
    if (result.ok) {
      showNotice('success', 'Imagem do documento baixada.');
    } else if (result.reason === 'native') {
      showNotice('error', 'O download da imagem está disponível apenas na versão web.');
    } else {
      showNotice('error', 'Não foi possível baixar a imagem do documento.');
    }
  }

  function handleSave() {
    const nome = values.nome.trim();
    if (!nome) {
      showNotice('error', 'Informe o nome do documento.');
      return;
    }
    if (!isValidDate(values.data)) {
      showNotice('error', 'Informe uma data de emissão válida (dd/mm/aaaa).');
      return;
    }

    const changes = {
      nome,
      tipo: values.tipo.trim() || base.tipo,
      numero: values.numero.trim(),
      data: values.data,
      status: 'Conclusão',
      confianca: 100,
    };

    if (onSaveAnalysis) {
      onSaveAnalysis(base, changes);
    } else {
      showNotice('success', 'Análise salva.');
    }
  }

  return (
    <View style={styles.container}>
      <MenuGlobal activeMenu={activeMenu} onNavigate={handleNavigate} />

      <ScrollView style={styles.main} contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
        <Pressable onPress={onBack} style={styles.backButton} accessibilityRole="button" accessibilityLabel="Voltar">
          <Ionicons name="arrow-back" size={18} color="#FFFFFF" />
        </Pressable>

        <View style={styles.titleRow}>
          <Ionicons name="documents-outline" size={32} color={docColors.sidebar} style={styles.titleIcon} />
          <Text style={styles.title}>Análise de Documentos</Text>
        </View>
        <Text style={styles.subtitle}>Visualize detalhes do documento e a extração de dados.</Text>

        {notice ? (
          <View style={[styles.notice, notice.type === 'error' ? styles.noticeError : styles.noticeSuccess]}>
            <Text style={[styles.noticeText, notice.type === 'error' ? styles.noticeErrorText : styles.noticeSuccessText]}>
              {notice.text}
            </Text>
          </View>
        ) : null}

        <View style={styles.columns}>
          <View style={styles.leftCol}>
            <View style={styles.fileCard}>
              <View style={styles.fileHeader}>
                <View style={styles.fileHeaderLeft}>
                  <Ionicons name="document-text-outline" size={26} color="#FFFFFF" />
                  <Text style={styles.fileName} numberOfLines={1}>{values.nome || base.nome}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: tone.bg }]}>
                  <Text style={[styles.statusBadgeText, { color: tone.color }]}>{view.label}</Text>
                </View>
              </View>

              <DocumentViewer
                doc={previewDoc}
                source={source}
                zoom={zoom}
                baseWidth={260}
                frameStyle={styles.previewFrame}
              />

              <View style={styles.zoomBar}>
                <Ionicons name="search-outline" size={22} color="#FFFFFF" />
                <View style={styles.zoomControls}>
                  <Pressable onPress={zoomOut} style={styles.zoomButton} accessibilityLabel="Diminuir zoom">
                    <Ionicons name="remove" size={18} color="#FFFFFF" />
                  </Pressable>
                  <Pressable onPress={() => setZoom(100)} accessibilityLabel="Voltar o zoom para 100%">
                    <Text style={styles.zoomText}>{zoom}%</Text>
                  </Pressable>
                  <Pressable onPress={zoomIn} style={styles.zoomButton} accessibilityLabel="Aumentar zoom">
                    <Ionicons name="add" size={18} color="#FFFFFF" />
                  </Pressable>
                </View>
                <Pressable onPress={() => setFullscreen(true)} accessibilityLabel="Tela cheia">
                  <Ionicons name="expand-outline" size={22} color="#FFFFFF" />
                </Pressable>
              </View>

              <View style={styles.actionsRow}>
                <SquareButton icon="download-outline" label="Baixar imagem do documento" onPress={handleDownload} />
                <SquareButton icon="refresh-outline" label="Reprocessar documento" onPress={() => onReprocess && onReprocess(base)} />
              </View>
            </View>
          </View>

          <View style={styles.rightCol}>
            <View style={styles.panel}>
              <View style={styles.progressRow}>
                <ProgressRing value={view.progress} />
                <View style={styles.progressInfo}>
                  <Text style={styles.progressTitle}>Progresso da Análise</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: `${view.progress}%` }]} />
                  </View>
                  <Text style={styles.progressHint}>{view.stage}</Text>
                </View>
              </View>
            </View>

            <View style={styles.panel}>
              <SectionHeader icon="server-outline" title="Resumo da extração" />
              <View style={styles.table}>
                {FIELDS.map((f) => (
                  <View key={f.key} style={styles.tableRow}>
                    <Text style={styles.tableLabel}>{f.label}</Text>
                    <View style={styles.tableValue}>
                      {editing ? (
                        <TextInput
                          style={styles.tableInput}
                          value={values[f.key]}
                          onChangeText={(t) => changeValue(f.key, t)}
                          keyboardType={f.key === 'data' || f.key === 'numero' ? 'numeric' : 'default'}
                          maxLength={f.key === 'data' ? 10 : undefined}
                          placeholder={f.key === 'data' ? 'dd/mm/aaaa' : undefined}
                          placeholderTextColor={docColors.sidebarLine}
                        />
                      ) : (
                        <Text style={styles.tableValueText}>{values[f.key]}</Text>
                      )}
                    </View>
                  </View>
                ))}
                <View style={[styles.tableRow, styles.tableRowLast]}>
                  <Text style={styles.tableLabel}>Confiança da leitura</Text>
                  <View style={styles.tableValue}>
                    <Text style={styles.tableValueText}>{base.confianca}%</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.panel}>
              <SectionHeader icon="hardware-chip-outline" title="Verificações da IA" />
              <View style={styles.checkList}>
                {checks.map((c, i) => (
                  <View
                    key={c.key}
                    style={[styles.checkRow, i === checks.length - 1 && styles.tableRowLast]}
                  >
                    <View style={styles.checkIcon}>
                      <Ionicons name={c.ok ? 'checkmark' : 'alert'} size={14} color="#FFFFFF" />
                    </View>
                    <View style={styles.checkTexts}>
                      <Text style={styles.checkLabel}>{c.label}</Text>
                      <Text style={styles.checkDescription}>{c.description}</Text>
                    </View>
                    <Text style={styles.checkValue}>{c.value}%</Text>
                  </View>
                ))}
              </View>

              <View style={styles.buttonsRow}>
                <OutlineButton
                  icon={editing ? 'close-outline' : 'create-outline'}
                  label={editing ? 'Cancelar revisão' : 'Revisar campos'}
                  onPress={toggleEditing}
                />
                <OutlineButton icon="save-outline" label="Salvar análise" onPress={handleSave} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <Modal visible={fullscreen} transparent animationType="fade" onRequestClose={() => setFullscreen(false)}>
        <Pressable style={styles.fullOverlay} onPress={() => setFullscreen(false)}>
          <Pressable style={styles.fullPanel} onPress={() => {}}>
            <View style={styles.fullHeader}>
              <Text style={styles.fileName} numberOfLines={1}>{values.nome || base.nome}</Text>
              <Pressable onPress={() => setFullscreen(false)} accessibilityLabel="Fechar">
                <Ionicons name="close" size={22} color="#FFFFFF" />
              </Pressable>
            </View>
            <View style={styles.fullBody}>
              <DocumentViewer
                doc={previewDoc}
                source={source}
                zoom={zoom}
                baseWidth={520}
                frameStyle={styles.fullFrame}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}