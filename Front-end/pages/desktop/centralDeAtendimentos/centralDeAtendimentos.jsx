import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Modal, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../login/LoginStyle';
import { docColors } from '../centralDeDocumentos/centralDeDocumentosStyle';
import { styles } from './centralDeAtendimentosStyle';
import MenuGlobal from '../../../components/MenuGlobal/MenuGlobal';

// Itens por página. Se o design pedir 16 (como em documentos) ou 15, basta trocar aqui.
const PAGE_SIZE = 10;
const TOTAL_ATENDIMENTOS = 48;

const TIPOS = ['Suporte', 'Validação', 'Integração', 'Relatório', 'Documento'];
const PRIORIDADES = ['Alta', 'Média', 'Baixa'];
const EMPTY_FILTERS = { tipos: [], prioridades: [] };

// Mock temporário. Quando a API existir, mover para um service/hook.
const CLIENTES = [
  'Microsoft Ltda.', 'Google Brasil', 'Amazon Serviços', 'Oracle do Brasil', 'SAP Consultoria',
  'Itaú Unibanco', 'Natura Cosméticos', 'Magazine Luiza', 'Petrobras S.A.', 'Embraer S.A.',
  'Ambev S.A.', 'Vale S.A.', 'Nubank Pagamentos', 'Localiza Hertz',
];

const pad = (n) => String(n).padStart(2, '0');

const ATENDIMENTOS = Array.from({ length: TOTAL_ATENDIMENTOS }, (_, index) => {
  const dia = ((index * 7) % 28) + 1;
  const mes = ((index * 5) % 10) + 1; // jan a out/2026
  return {
    id: index + 1,
    // protocolos únicos e crescentes, com saltos irregulares
    protocolo: `ATD-${String(4832 + index * 4 + (index % 3)).padStart(6, '0')}`,
    tipo: TIPOS[(index * 3 + Math.floor(index / 5)) % TIPOS.length],
    prioridade: PRIORIDADES[(index * 7 + Math.floor(index / 3)) % PRIORIDADES.length],
    cliente: CLIENTES[(index * 5 + 2) % CLIENTES.length],
    data: `${pad(dia)}/${pad(mes)}/2026`,
  };
});

// Gera 1 2 3 … 8 9 10 com janela ao redor da página atual.
function getPageItems(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push('ellipsis-start');
  for (let n = start; n <= end; n += 1) items.push(n);
  if (end < total - 1) items.push('ellipsis-end');
  items.push(total);
  return items;
}

// Mesmo padrão de badge da central de documentos (fundo claro + texto colorido)
function PriorityBadge({ prioridade }) {
  const variants = {
    Alta: [styles.badgeAlta, styles.badgeAltaText],
    'Média': [styles.badgeMedia, styles.badgeMediaText],
    Baixa: [styles.badgeBaixa, styles.badgeBaixaText],
  };
  const [badgeStyle, textStyle] = variants[prioridade] || variants['Média'];
  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.badgeText, textStyle]}>{prioridade}</Text>
    </View>
  );
}

function AtendimentoRow({ item, onActions }) {
  return (
    <Pressable style={({ hovered }) => [styles.row, hovered && styles.rowHover]}>
      <View style={[styles.cell, styles.cellProtocolo]}>
        <Text style={styles.cellText} numberOfLines={1}>{item.protocolo}</Text>
      </View>
      <View style={[styles.cell, styles.cellTipo]}>
        <Text style={styles.cellText} numberOfLines={1}>{item.tipo}</Text>
      </View>
      <View style={[styles.cell, styles.cellPrioridade]}>
        <PriorityBadge prioridade={item.prioridade} />
      </View>
      <View style={[styles.cell, styles.cellCliente]}>
        <Text style={styles.cellText} numberOfLines={1}>{item.cliente}</Text>
      </View>
      <View style={[styles.cell, styles.cellData]}>
        <Text style={styles.cellText}>{item.data}</Text>
      </View>
      <View style={[styles.cell, styles.cellAcoes, styles.cellLast]}>
        <Pressable
          onPress={(e) => onActions(item, e.nativeEvent)}
          accessibilityRole="button"
          accessibilityLabel={`Ações do atendimento ${item.protocolo}`}
        >
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

export default function CentralDeAtendimentos({
  activeMenu = 'atendimentos',
  onNavigate,
  onAddAtendimento,
  onOpenAtendimento,
}) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(EMPTY_FILTERS); // filtros aplicados
  const [draft, setDraft] = useState(EMPTY_FILTERS); // rascunho editado no modal
  const [filterOpen, setFilterOpen] = useState(false);
  const [actionMenu, setActionMenu] = useState(null);

  const activeFiltersCount = filters.tipos.length + filters.prioridades.length;

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return ATENDIMENTOS.filter((item) => {
      if (
        term &&
        ![item.protocolo, item.tipo, item.prioridade, item.cliente, item.data].some((value) =>
          value.toLowerCase().includes(term)
        )
      ) {
        return false;
      }
      if (filters.tipos.length && !filters.tipos.includes(item.tipo)) return false;
      if (filters.prioridades.length && !filters.prioridades.includes(item.prioridade)) return false;
      return true;
    });
  }, [search, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageItems = getPageItems(currentPage, totalPages);

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

  function openActions(item, nativeEvent) {
    const { width } = Dimensions.get('window');
    const menuWidth = 200;
    const pageX = nativeEvent?.pageX ?? width / 2;
    const pageY = nativeEvent?.pageY ?? 200;
    const left = Math.max(8, Math.min(pageX - menuWidth, width - menuWidth - 8));
    setActionMenu({ item, top: pageY + 12, left });
  }

  function closeActions() {
    setActionMenu(null);
  }

  function handleOpen() {
    const item = actionMenu?.item;
    closeActions();
    if (onOpenAtendimento) onOpenAtendimento(item);
  }

  return (
    <View style={styles.container}>
      {/* Menu global: compartilhado entre todas as telas */}
      <MenuGlobal activeMenu={activeMenu} onNavigate={handleNavigate} />

      <ScrollView style={styles.main} contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <Ionicons name="people-outline" size={32} color={docColors.sidebar} style={styles.titleIcon} />
          <Text style={styles.title}>Central de Atendimentos</Text>
        </View>
        <Text style={styles.subtitle}>Gerencie e acompanhe atendimentos</Text>

        <View style={styles.toolbar}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={docColors.sidebar} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar atendimento..."
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
            onPress={onAddAtendimento}
            accessibilityRole="button"
            accessibilityLabel="Adicionar atendimento"
            style={({ hovered }) => [styles.addButton, hovered && styles.addButtonHover]}
          >
            <Ionicons name="add" size={24} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.card}>
          <View style={styles.tableHeader}>
            <View style={styles.cellProtocolo}><Text style={styles.headerText}>Protocolo</Text></View>
            <View style={styles.cellTipo}><Text style={styles.headerText}>Tipo</Text></View>
            <View style={styles.cellPrioridade}><Text style={styles.headerText}>Prioridade</Text></View>
            <View style={styles.cellCliente}><Text style={styles.headerText}>Cliente</Text></View>
            <View style={styles.cellData}><Text style={styles.headerText}>Data</Text></View>
            <View style={styles.cellAcoes}><Text style={styles.headerText}>Ações</Text></View>
          </View>

          {visible.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum atendimento encontrado.</Text>
          ) : (
            visible.map((item) => <AtendimentoRow key={item.id} item={item} onActions={openActions} />)
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>Mostrando {visible.length} de {filtered.length} atendimentos</Text>

            <View style={styles.pagination}>
              <Pressable
                onPress={() => setPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                style={[styles.pageButton, currentPage === 1 && styles.pageButtonDisabled]}
                accessibilityLabel="Página anterior"
              >
                <Ionicons name="caret-back" size={11} color={docColors.sidebar} />
              </Pressable>

              {pageItems.map((n) =>
                typeof n === 'string' ? (
                  <View key={n} style={styles.pageEllipsis}>
                    <Text style={styles.pageText}>…</Text>
                  </View>
                ) : (
                  <Pressable
                    key={n}
                    onPress={() => setPage(n)}
                    style={[styles.pageButton, n === currentPage && styles.pageButtonActive]}
                    accessibilityLabel={`Ir para a página ${n}`}
                  >
                    <Text style={[styles.pageText, n === currentPage && styles.pageTextActive]}>{n}</Text>
                  </Pressable>
                )
              )}

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

      {/* Modal de filtros */}
      <Modal visible={filterOpen} transparent animationType="fade" onRequestClose={() => setFilterOpen(false)}>
        <Pressable style={styles.filterOverlay} onPress={() => setFilterOpen(false)}>
          <Pressable style={styles.filterPanel} onPress={() => {}}>
            <View style={styles.filterHeader}>
              <Text style={styles.filterTitle}>Filtrar atendimentos</Text>
              <Pressable onPress={() => setFilterOpen(false)} accessibilityLabel="Fechar">
                <Ionicons name="close" size={20} color={docColors.sidebar} />
              </Pressable>
            </View>

            <Text style={styles.filterLabel}>Prioridade</Text>
            <View style={styles.chipsRow}>
              {PRIORIDADES.map((p) => (
                <FilterChip key={p} label={p} selected={draft.prioridades.includes(p)} onPress={() => toggleDraft('prioridades', p)} />
              ))}
            </View>

            <Text style={styles.filterLabel}>Tipo de atendimento</Text>
            <View style={styles.chipsRow}>
              {TIPOS.map((t) => (
                <FilterChip key={t} label={t} selected={draft.tipos.includes(t)} onPress={() => toggleDraft('tipos', t)} />
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

      {/* Menu flutuante de ações da linha (mesmo padrão da central de documentos) */}
      <Modal visible={!!actionMenu} transparent animationType="fade" onRequestClose={closeActions}>
        <Pressable style={styles.menuOverlay} onPress={closeActions}>
          {actionMenu && (
            <View style={[styles.actionMenu, { top: actionMenu.top, left: actionMenu.left }]}>
              <Pressable onPress={handleOpen} style={({ hovered }) => [styles.actionItem, hovered && styles.rowHover]}>
                <Ionicons name="open-outline" size={16} color={docColors.sidebar} />
                <Text style={styles.actionText}>Abrir atendimento</Text>
              </Pressable>
            </View>
          )}
        </Pressable>
      </Modal>
    </View>
  );
}