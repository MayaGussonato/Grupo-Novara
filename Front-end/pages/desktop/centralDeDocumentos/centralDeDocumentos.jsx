import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Modal, Dimensions } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../login/LoginStyle';
import { styles, docColors } from './centralDeDocumentosStyle';
import MenuGlobal from '../../../components/MenuGlobal/MenuGlobal';
const PAGE_SIZE = 16;
const TOTAL_DOCUMENTS = 48;
const BASE_DOCUMENTS = [
  { prefixo: 'Nota_Fiscal', tipo: 'Nota Fiscal', status: 'Revisão', confianca: 95, data: '22/10/2026' },
  { prefixo: 'Laudo_Medico', tipo: 'Laudo', status: 'Conclusão', confianca: 100, data: '15/10/2026' },
  { prefixo: 'Contrato_Servicos', tipo: 'Contrato', status: 'Erro', confianca: 88, data: '10/07/2026' },
  { prefixo: 'Pedido_Compra', tipo: 'Pedido', status: 'Revisão', confianca: 97, data: '07/03/2026' },
  { prefixo: 'Exame_Sangue', tipo: 'Exame', status: 'Revisão', confianca: 91, data: '13/10/2026' },
  { prefixo: 'Receita_Medica', tipo: 'Receita', status: 'Conclusão', confianca: 100, data: '22/09/2026' },
  { prefixo: 'Boleto_Energia', tipo: 'Boleto', status: 'Erro', confianca: 66, data: '01/10/2026' },
  { prefixo: 'Relatorio_Vendas', tipo: 'Relatório', status: 'Conclusão', confianca: 100, data: '21/08/2026' },
  { prefixo: 'Comprovante_Pagamento', tipo: 'Comprovante', status: 'Revisão', confianca: 99, data: '10/10/2026' },
  { prefixo: 'Apolice_Seguro', tipo: 'Apólice', status: 'Conclusão', confianca: 100, data: '22/10/2026' },
  { prefixo: 'Proposta_Comercial', tipo: 'Proposta', status: 'Revisão', confianca: 75, data: '04/04/2026' },
  { prefixo: 'Certidao_Negativa', tipo: 'Certidão', status: 'Erro', confianca: 42, data: '22/10/2026' },
  { prefixo: 'Recibo_Aluguel', tipo: 'Recibo', status: 'Revisão', confianca: 89, data: '05/03/2026' },
  { prefixo: 'Ficha_Cadastral', tipo: 'Ficha', status: 'Erro', confianca: 58, data: '22/10/2026' },
];
const DOCUMENTS = Array.from({ length: TOTAL_DOCUMENTS }, (_, i) => {
  const base = BASE_DOCUMENTS[i % BASE_DOCUMENTS.length];
  return {
    id: i + 1,
    nome: `${base.prefixo}_${1000 + (i + 1) * 7}.pdf`,
    tipo: base.tipo,
    status: base.status,
    confianca: base.confianca,
    data: base.data,
  };
});
const TIPOS = [...new Set(BASE_DOCUMENTS.map((d) => d.tipo))];
const STATUS = ['Revisão', 'Conclusão', 'Erro'];
const CONFIANCA_OPCOES = [
  { label: 'Todas', value: 0 },
  { label: '70%+', value: 70 },
  { label: '90%+', value: 90 },
  { label: '100%', value: 100 },
];
const EMPTY_FILTERS = { tipos: [], status: [], confiancaMin: 0 };
const NO_OVERRIDES = {};
function StatusBadge({ status }) {
  const variants = {
    'Revisão': [styles.badgeRevisao, styles.badgeRevisaoText],
    'Conclusão': [styles.badgeConclusao, styles.badgeConclusaoText],
    'Erro': [styles.badgeErro, styles.badgeErroText],
  };
  const [badgeStyle, textStyle] = variants[status] || variants['Revisão'];
  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.badgeText, textStyle]}>{status}</Text>
    </View>
  );
}
function ConfidenceRing({ value, size = 15, stroke = 2.5 }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - pct / 100);
  const center = size / 2;
  return (
    <Svg width={size} height={size} style={styles.ring}>
      <Circle cx={center} cy={center} r={radius} stroke={docColors.rowLine} strokeWidth={stroke} fill="none" />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke={docColors.sidebar}
        strokeWidth={stroke}
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        rotation={-90}
        origin={`${center}, ${center}`}
      />
    </Svg>
  );
}
function DocumentRow({ doc, onActions }) {
  return (
    <Pressable style={({ hovered }) => [styles.row, hovered && styles.rowHover]}>
      <View style={[styles.cell, styles.cellDoc]}>
        <View style={styles.cellDocInner}>
          <Ionicons name="document-text-outline" size={12} color={docColors.sidebar} style={styles.fileIcon} />
          <Text style={[styles.cellText, styles.cellDocText]} numberOfLines={1}>{doc.nome}</Text>
        </View>
      </View>
      <View style={[styles.cell, styles.cellTipo]}>
        <Text style={styles.cellText}>{doc.tipo}</Text>
      </View>
      <View style={[styles.cell, styles.cellStatus]}>
        <StatusBadge status={doc.status} />
      </View>
      <View style={[styles.cell, styles.cellConfianca]}>
        <View style={styles.confidenceRow}>
          <ConfidenceRing value={doc.confianca} />
          <Text style={styles.cellText}>{doc.confianca}%</Text>
        </View>
      </View>
      <View style={[styles.cell, styles.cellData]}>
        <Text style={styles.cellText}>{doc.data}</Text>
      </View>
      <View style={[styles.cell, styles.cellAcoes, styles.cellLast]}>
        <Pressable onPress={(e) => onActions(doc, e.nativeEvent)} accessibilityLabel="Ações">
          <Ionicons name="ellipsis-horizontal" size={20} color={docColors.sidebar} />
        </Pressable>
      </View>
    </Pressable>
  );
}
function FilterChip({ label, selected, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]} accessibilityRole="button">
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}
export default function CentralDeDocumentos({
  activeMenu = 'documentos',
  onNavigate,
  onAddDocument,
  onOpenValidation,
  onOpenAnalysis,
  overrides = NO_OVERRIDES, // alterações salvas por id de documento (ex.: vindas da tela de análise)
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [draft, setDraft] = useState(EMPTY_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [actionMenu, setActionMenu] = useState(null);
  const activeFiltersCount = filters.tipos.length + filters.status.length + (filters.confiancaMin > 0 ? 1 : 0);
  const documents = useMemo(
    () => DOCUMENTS.map((d) => (overrides[d.id] ? { ...d, ...overrides[d.id] } : d)),
    [overrides]
  );
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return documents.filter((d) => {
      if (term && !(d.nome.toLowerCase().includes(term) || d.tipo.toLowerCase().includes(term) || d.status.toLowerCase().includes(term))) return false;
      if (filters.tipos.length && !filters.tipos.includes(d.tipo)) return false;
      if (filters.status.length && !filters.status.includes(d.status)) return false;
      if (d.confianca < filters.confiancaMin) return false;
      return true;
    });
  }, [search, filters, documents]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  function handleNavigate(key) {
    if (onNavigate) onNavigate(key);
  }
  function handleSearch(text) {
    setSearch(text);
    setPage(1);
  }
  function openFilter() {
    setDraft(filters);
    setFilterOpen(true);
  }
  function toggleDraft(field, value) {
    setDraft((prev) => ({
      ...prev,
      [field]: prev[field].includes(value) ? prev[field].filter((v) => v !== value) : [...prev[field], value],
    }));
  }
  function applyFilters() {
    setFilters(draft);
    setPage(1);
    setFilterOpen(false);
  }
  function clearFilters() {
    setDraft(EMPTY_FILTERS);
    setFilters(EMPTY_FILTERS);
    setPage(1);
    setFilterOpen(false);
  }
  function openActions(doc, nativeEvent) {
    const { width } = Dimensions.get('window');
    const menuWidth = 200;
    const pageX = nativeEvent?.pageX ?? width / 2;
    const pageY = nativeEvent?.pageY ?? 200;
    const left = Math.max(8, Math.min(pageX - menuWidth, width - menuWidth - 8));
    setActionMenu({ doc, top: pageY + 12, left });
  }
  function closeActions() {
    setActionMenu(null);
  }
  function handleValidation() {
    const doc = actionMenu?.doc;
    closeActions();
    if (onOpenValidation) onOpenValidation(doc);
  }
  function handleAnalysis() {
    const doc = actionMenu?.doc;
    closeActions();
    if (onOpenAnalysis) onOpenAnalysis(doc);
  }
  return (
    <View style={styles.container}>
      <MenuGlobal activeMenu={activeMenu} onNavigate={handleNavigate} />
      <ScrollView style={styles.main} contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Ionicons name="folder-open-outline" size={32} color={docColors.sidebar} style={styles.titleIcon} />
          <Text style={styles.title}>Central de Documentos</Text>
        </View>
        <Text style={styles.subtitle}>Gerencie todos os documentos processados</Text>
        <View style={styles.toolbar}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={docColors.sidebar} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar documentos..."
              placeholderTextColor={docColors.sidebar}
              value={search}
              onChangeText={handleSearch}
            />
          </View>
          <Pressable style={styles.filterButton} onPress={openFilter} accessibilityRole="button" accessibilityLabel="Filtrar">
            <Ionicons name="funnel-outline" size={20} color={docColors.sidebar} />
            {activeFiltersCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
              </View>
            )}
          </Pressable>
          <Pressable
            onPress={onAddDocument}
            accessibilityRole="button"
            accessibilityLabel="Adicionar documento"
            style={({ hovered }) => [styles.addButton, hovered && styles.addButtonHover]}
          >
            <Ionicons name="add" size={24} color={colors.white} />
          </Pressable>
        </View>
        <View style={styles.card}>
          <View style={styles.tableHeader}>
            <View style={styles.cellDoc}>
              <Text style={[styles.headerText, styles.headerTextSmall]}>Documento</Text>
            </View>
            <View style={styles.cellTipo}>
              <Text style={styles.headerText}>Tipo</Text>
            </View>
            <View style={styles.cellStatus}>
              <Text style={styles.headerText}>Status</Text>
            </View>
            <View style={styles.cellConfianca}>
              <Text style={styles.headerText}>Confiança</Text>
            </View>
            <View style={styles.cellData}>
              <Text style={styles.headerText}>Data</Text>
            </View>
            <View style={styles.cellAcoes}>
              <Text style={styles.headerText}>Ações</Text>
            </View>
          </View>
          {visible.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum documento encontrado.</Text>
          ) : (
            visible.map((doc) => <DocumentRow key={doc.id} doc={doc} onActions={openActions} />)
          )}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Mostrando {visible.length} de {filtered.length} documentos</Text>
            <View style={styles.pagination}>
              <Pressable
                onPress={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
                accessibilityLabel="Página anterior"
              >
                <Ionicons name="caret-back" size={11} color={docColors.sidebar} />
              </Pressable>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Pressable key={n} onPress={() => setPage(n)} style={[styles.pageButton, n === currentPage && styles.pageButtonActive]}>
                  <Text style={[styles.pageText, n === currentPage && styles.pageTextActive]}>{n}</Text>
                </Pressable>
              ))}
              <Pressable
                onPress={() => setPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                style={[styles.pageButton, currentPage === totalPages && styles.pageButtonDisabled]}
                accessibilityLabel="Próxima página"
              >
                <Ionicons name="caret-forward" size={11} color={docColors.sidebar} />
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
      <Modal visible={filterOpen} transparent animationType="fade" onRequestClose={() => setFilterOpen(false)}>
        <Pressable style={styles.filterOverlay} onPress={() => setFilterOpen(false)}>
          <Pressable style={styles.filterPanel} onPress={() => {}}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filtrar documentos</Text>
              <Pressable onPress={() => setFilterOpen(false)} accessibilityLabel="Fechar">
                <Ionicons name="close" size={20} color={docColors.sidebar} />
              </Pressable>
            </View>
            <Text style={styles.filterLabel}>Tipo</Text>
            <View style={styles.chipsRow}>
              {TIPOS.map((t) => (
                <FilterChip key={t} label={t} selected={draft.tipos.includes(t)} onPress={() => toggleDraft('tipos', t)} />
              ))}
            </View>
            <Text style={styles.filterLabel}>Status</Text>
            <View style={styles.chipsRow}>
              {STATUS.map((s) => (
                <FilterChip key={s} label={s} selected={draft.status.includes(s)} onPress={() => toggleDraft('status', s)} />
              ))}
            </View>
            <Text style={styles.filterLabel}>Confiança mínima</Text>
            <View style={styles.chipsRow}>
              {CONFIANCA_OPCOES.map((o) => (
                <FilterChip
                  key={o.value}
                  label={o.label}
                  selected={draft.confiancaMin === o.value}
                  onPress={() => setDraft((prev) => ({ ...prev, confiancaMin: o.value }))}
                />
              ))}
            </View>
            <View style={styles.filterActions}>
              <Pressable style={styles.filterClear} onPress={clearFilters}>
                <Text style={styles.filterClearText}>Limpar</Text>
              </Pressable>
              <Pressable style={styles.filterApply} onPress={applyFilters}>
                <Text style={styles.filterApplyText}>Aplicar</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
      <Modal visible={!!actionMenu} transparent animationType="fade" onRequestClose={closeActions}>
        <Pressable style={styles.menuOverlay} onPress={closeActions}>
          {actionMenu && (
            <View style={[styles.actionMenu, { top: actionMenu.top, left: actionMenu.left }]}>
              <Pressable onPress={handleValidation} style={({ hovered }) => [styles.actionItem, hovered && styles.rowHover]}>
                <Ionicons name="checkmark-circle-outline" size={16} color={docColors.sidebar} />
                <Text style={styles.actionText}>Central de validação</Text>
              </Pressable>
              <View style={styles.actionDivider} />
              <Pressable onPress={handleAnalysis} style={({ hovered }) => [styles.actionItem, hovered && styles.rowHover]}>
                <Ionicons name="analytics-outline" size={16} color={docColors.sidebar} />
                <Text style={styles.actionText}>Análise de documento</Text>
              </Pressable>
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}