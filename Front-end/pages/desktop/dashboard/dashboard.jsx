import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Modal,
  Dimensions,
} from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

import MenuGlobal from '../../../components/MenuGlobal/MenuGlobal';
import { styles, docColors } from './dashboardStyle';

const PERIODS = [
  { value: '7d', label: 'Últimos 7 dias' },
  { value: '30d', label: 'Últimos 30 dias' },
  { value: '90d', label: 'Últimos 90 dias' },
];

const KPIS_BY_PERIOD = {
  '7d': { processed: 312, accuracy: 98.9, saved: 11, inProgress: 24, queue: 8 },
  '30d': { processed: 1248, accuracy: 98.7, saved: 42, inProgress: 24, queue: 8 },
  '90d': { processed: 3610, accuracy: 98.4, saved: 121, inProgress: 24, queue: 8 },
};

const MONTHLY = [
  { rotulo: 'Nov', valor: 90 },
  { rotulo: 'Dez', valor: 95 },
  { rotulo: 'Jan', valor: 80 },
  { rotulo: 'Fev', valor: 100 },
  { rotulo: 'Mar', valor: 105 },
  { rotulo: 'Abr', valor: 110 },
  { rotulo: 'Mai', valor: 135 },
  { rotulo: 'Jun', valor: 170 },
  { rotulo: 'Jul', valor: 230 },
  { rotulo: 'Ago', valor: 220 },
  { rotulo: 'Set', valor: 275 },
  { rotulo: 'Out', valor: 340 },
];

const CHART_RANGES = [
  { value: 3, label: 'Últimos 3 meses' },
  { value: 6, label: 'Últimos 6 meses' },
  { value: 12, label: 'Últimos 12 meses' },
];

const RECENT_ACTIVITY = [
  { id: '1', document: 'Laudo_Medico_1007.pdf', type: 'Laudo', status: 'Concluído', date: '15/10/2026 13:30h', user: 'Mayara' },
  { id: '2', document: 'Exame_Sangue_1014.pdf', type: 'Exames', status: 'Em processo', date: '15/10/2026 14:25h', user: 'Luis' },
  { id: '3', document: 'Pedido_Compra_1021.pdf', type: 'Pedido', status: 'Concluído', date: '15/10/2026 12:30h', user: 'Felipe' },
  { id: '4', document: 'Relatorio_Vendas_1028.pdf', type: 'Relatório', status: 'Concluído', date: '15/10/2026 09:15h', user: 'Henrique' },
];

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];
const porDia = (valores) => DIAS.map((rotulo, i) => ({ rotulo, valor: valores[i] }));

const PALETA = ['#0B5D57', '#1B8A80', '#5FBBAE', '#A9DFD6', '#D3EEE9'];

const TONS = {
  verde: { cor: docColors.conclusaoText, fundo: '#E3F5E8' },
  teal: { cor: '#1B7A72', fundo: '#DFF2EF' },
  laranja: { cor: '#E8892B', fundo: '#FDEBD6' },
  azul: { cor: docColors.revisaoText, fundo: '#DDF3FA' },
  vermelho: { cor: docColors.erroText, fundo: docColors.erroBg },
};

const ABAS = [
  { id: 'visao-geral', rotulo: 'Visão Geral', icone: 'grid-outline' },
  { id: 'documentos', rotulo: 'Documentos', icone: 'document-text-outline' },
  { id: 'atendimentos', rotulo: 'Atendimentos', icone: 'headset-outline' },
  { id: 'integracoes', rotulo: 'Integrações', icone: 'link-outline' },
];

const DADOS = {
  'visao-geral': {
    barras1: { titulo: 'Documentos processados', filtroMeses: true },
    donut: {
      titulo: 'Documentos por status',
      centroRotulo: 'documentos',
      itens: [
        { rotulo: 'Validados', valor: 842 },
        { rotulo: 'Em análise', valor: 213 },
        { rotulo: 'Pendentes', valor: 134 },
        { rotulo: 'Rejeitados', valor: 59 },
      ],
    },
    barras2: { titulo: 'Documentos vistos por dia', dados: porDia([320, 410, 385, 452, 430, 190, 150]) },
    ranking: {
      titulo: 'Taxa de precisão por tipo',
      sufixo: '%',
      maximo: 100,
      cor: '#1E9E5A',
      itens: [
        { rotulo: 'Laudos', valor: 98.6 },
        { rotulo: 'Notas fiscais', valor: 97.9 },
        { rotulo: 'Cadastros', valor: 96.8 },
        { rotulo: 'Contratos', valor: 95.2 },
      ],
    },
  },

  documentos: {
    kpis: [
      { icone: 'document-text-outline', tom: 'teal', rotulo: 'Total no período', valor: '1.248', dica: '+12% em relação ao período anterior', positiva: true },
      { icone: 'checkmark-circle-outline', tom: 'verde', rotulo: 'Validados', valor: '842', dica: '+9% em relação ao período anterior', positiva: true },
      { icone: 'hourglass-outline', tom: 'laranja', rotulo: 'Pendentes', valor: '134', dica: '+5% em relação ao período anterior', positiva: false },
      { icone: 'close-circle-outline', tom: 'vermelho', rotulo: 'Rejeitados', valor: '59', dica: '-14% em relação ao período anterior', positiva: true },
    ],
    barras1: { titulo: 'Documentos importados por dia', dados: porDia([158, 192, 177, 214, 203, 94, 70]) },
    donut: {
      titulo: 'Documentos por tipo',
      centroRotulo: 'documentos',
      itens: [
        { rotulo: 'Laudos', valor: 412 },
        { rotulo: 'Notas fiscais', valor: 318 },
        { rotulo: 'Cadastros', valor: 256 },
        { rotulo: 'Contratos', valor: 164 },
        { rotulo: 'Outros', valor: 98 },
      ],
    },
    barras2: { titulo: 'Tempo médio de análise por dia', sufixo: ' min', dados: porDia([4.8, 4.5, 4.2, 3.9, 4.0, 3.6, 3.4]) },
    ranking: {
      titulo: 'Motivos de rejeição',
      cor: docColors.erroText,
      itens: [
        { rotulo: 'Assinatura ausente', valor: 21 },
        { rotulo: 'Documento ilegível', valor: 17 },
        { rotulo: 'Dados divergentes', valor: 13 },
        { rotulo: 'Fora do padrão', valor: 8 },
      ],
    },
  },

  atendimentos: {
    kpis: [
      { icone: 'chatbubbles-outline', tom: 'azul', rotulo: 'Atendimentos abertos', valor: '37', dica: '-6 em relação ao período anterior', positiva: true },
      { icone: 'checkmark-circle-outline', tom: 'verde', rotulo: 'Resolvidos', valor: '214', dica: '+11% em relação ao período anterior', positiva: true },
      { icone: 'timer-outline', tom: 'laranja', rotulo: 'Tempo médio de resposta', valor: '12 min', dica: '-2 min em relação ao período anterior', positiva: true },
      { icone: 'star-outline', tom: 'teal', rotulo: 'Satisfação', valor: '4,7/5', dica: '+0,2 em relação ao período anterior', positiva: true },
    ],
    barras1: { titulo: 'Atendimentos por dia', dados: porDia([37, 44, 41, 52, 46, 18, 13]) },
    donut: {
      titulo: 'Atendimentos por categoria',
      centroRotulo: 'atendimentos',
      itens: [
        { rotulo: 'Dúvidas sobre documentos', valor: 94 },
        { rotulo: 'Falhas de validação', valor: 70 },
        { rotulo: 'Acesso e login', valor: 42 },
        { rotulo: 'Integrações', valor: 28 },
        { rotulo: 'Outros', valor: 17 },
      ],
    },
    barras2: { titulo: 'Tempo médio de resposta por dia', sufixo: ' min', dados: porDia([14, 13, 12, 11, 12, 10, 9]) },
    ranking: {
      titulo: 'Atendimentos por canal',
      cor: '#1B8A80',
      itens: [
        { rotulo: 'Plataforma', valor: 118 },
        { rotulo: 'E-mail', valor: 74 },
        { rotulo: 'WhatsApp', valor: 46 },
        { rotulo: 'Telefone', valor: 13 },
      ],
    },
  },

  integracoes: {
    kpis: [
      { icone: 'cloud-done-outline', tom: 'verde', rotulo: 'Integrações conectadas', valor: '14 de 18', dica: '+1 em relação ao período anterior', positiva: true },
      { icone: 'sync-outline', tom: 'teal', rotulo: 'Sincronizações hoje', valor: '126', dica: '+7% em relação a ontem', positiva: true },
      { icone: 'alert-circle-outline', tom: 'vermelho', rotulo: 'Falhas de sincronização', valor: '3', dica: '-2 em relação ao período anterior', positiva: true },
      { icone: 'pulse-outline', tom: 'azul', rotulo: 'Disponibilidade', valor: '99,2%', dica: '+0,3% em relação ao período anterior', positiva: true },
    ],
    barras1: { titulo: 'Sincronizações por dia', dados: porDia([112, 120, 118, 131, 126, 64, 58]) },
    donut: {
      titulo: 'Sincronizações por integração',
      centroRotulo: 'sincronizações',
      itens: [
        { rotulo: 'SAP', valor: 38 },
        { rotulo: 'TOTVS', valor: 31 },
        { rotulo: 'Microsoft Dynamics 365', valor: 22 },
        { rotulo: 'Google Drive', valor: 19 },
        { rotulo: 'Oracle', valor: 16 },
      ],
    },
    barras2: { titulo: 'Falhas por dia', dados: porDia([1, 0, 2, 0, 1, 0, 0]) },
    ranking: {
      titulo: 'Falhas por integração',
      cor: docColors.erroText,
      itens: [
        { rotulo: 'Azure DevOps', valor: 2 },
        { rotulo: 'Oracle', valor: 1 },
        { rotulo: 'Gmail', valor: 0 },
        { rotulo: 'Salesforce', valor: 0 },
      ],
    },
  },
};

function kpisVisaoGeral(k) {
  return [
    { icone: 'document-text-outline', tom: 'verde', rotulo: 'Documentos processados', valor: k.processed.toLocaleString('pt-BR'), dica: '+12% em relação ao período anterior', positiva: true },
    { icone: 'locate-outline', tom: 'teal', rotulo: 'Taxa de precisão', valor: `${k.accuracy.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}%`, dica: '+0,8% em relação ao período anterior', positiva: true },
    { icone: 'time-outline', tom: 'laranja', rotulo: 'Tempo economizado', valor: `${k.saved}h`, dica: '+5,2x mais produtividade', positiva: true },
    { icone: 'eye-outline', tom: 'azul', rotulo: 'Em processamento', valor: String(k.inProgress), dica: `${k.queue} na fila de análise`, positiva: null },
  ];
}

const formatar = (valor) => String(valor).replace('.', ',');

function Dropdown({ options, value, onChange, icon, small = false, align = 'left', label }) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 190 });
  const selected = options.find((o) => o.value === value);

  function openMenu() {
    const screenWidth = Dimensions.get('window').width;
    const place = (x, y, w, h) => {
      const width = Math.max(w, 190);
      const left = align === 'right' ? x + w - width : x;
      setPos({
        top: y + h + 4,
        left: Math.max(8, Math.min(left, screenWidth - width - 8)),
        width,
      });
      setOpen(true);
    };
    if (anchorRef.current && anchorRef.current.measureInWindow) {
      anchorRef.current.measureInWindow(place);
    } else {
      place(8, 100, 190, 0);
    }
  }

  function select(v) {
    setOpen(false);
    if (v !== value) onChange(v);
  }

  return (
    <>
      <Pressable
        ref={anchorRef}
        collapsable={false}
        onPress={openMenu}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={[styles.dropdownButton, small && styles.dropdownButtonSmall]}
      >
        {icon ? (
          <Ionicons name={icon} size={16} color={docColors.sidebar} style={styles.dropdownIcon} />
        ) : null}
        <Text style={styles.dropdownText}>{selected ? selected.label : ''}</Text>
        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={14} color={docColors.sidebar} />
      </Pressable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.menuOverlay} onPress={() => setOpen(false)}>
          <View style={[styles.dropdownMenu, { top: pos.top, left: pos.left, width: pos.width }]}>
            {options.map((o) => (
              <Pressable
                key={String(o.value)}
                onPress={() => select(o.value)}
                style={({ hovered }) => [
                  styles.dropdownItem,
                  (hovered || o.value === value) && styles.dropdownItemActive,
                ]}
              >
                <Text style={styles.dropdownItemText}>{o.label}</Text>
                {o.value === value ? (
                  <Ionicons name="checkmark" size={16} color={docColors.sidebar} />
                ) : null}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

function KpiCard({ icone, tom, rotulo, valor, dica, positiva }) {
  const t = TONS[tom];
  const corDica =
    positiva === null ? docColors.sidebar : positiva ? docColors.conclusaoText : docColors.erroText;
  return (
    <View style={styles.kpiCard}>
      <View style={[styles.kpiIconWrap, { backgroundColor: t.fundo }]}>
        <Ionicons name={icone} size={26} color={t.cor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.kpiLabel}>{rotulo}</Text>
        <Text style={styles.kpiValue}>{valor}</Text>
        <Text style={[styles.kpiHint, { color: corDica }]}>{dica}</Text>
      </View>
    </View>
  );
}

const SHADE_LIGHT = '#B5E3DB';
const SHADE_DARK = '#0B5D57';

function hexToRgb(hex) {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function shade(index, total) {
  const t = total === 1 ? 1 : index / (total - 1);
  const a = hexToRgb(SHADE_LIGHT);
  const b = hexToRgb(SHADE_DARK);
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * t)).join(',')})`;
}

function BarChart({ data, sufixo = '' }) {
  const max = Math.max(...data.map((d) => d.valor), 1);

  const bruto = (max * 1.05) / 4;
  const exp = Math.pow(10, Math.floor(Math.log10(bruto)));
  const f = bruto / exp;
  const passo = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * exp;
  const n = Math.ceil((max * 1.05) / passo);
  const top = n * passo;
  const ticks = Array.from({ length: n + 1 }, (_, i) => Number(((n - i) * passo).toFixed(2)));
  const pct = (i) => `${(i / n) * 100}%`;

  return (
    <View>
      <View style={styles.barsArea}>
        <View style={styles.yAxis}>
          {ticks.map((t, i) => (
            <Text key={i} style={[styles.yLabel, { top: pct(i) }]}>{formatar(t)}</Text>
          ))}
        </View>
        <View style={styles.barsPlot}>
          {ticks.map((t, i) => (
            <View key={i} style={[styles.gridLine, { top: pct(i) }]} />
          ))}
          <View style={styles.barsRow}>
            {data.map((d, i) => (
              <View key={d.rotulo} style={styles.barColumn}>
                <Text style={styles.barValue}>{`${formatar(d.valor)}${sufixo}`}</Text>
                <View
                  style={[
                    styles.bar,
                    { height: `${(d.valor / top) * 100}%`, backgroundColor: shade(i, data.length) },
                  ]}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={styles.xAxis}>
        {data.map((d) => (
          <Text key={d.rotulo} style={styles.xLabel}>{d.rotulo}</Text>
        ))}
      </View>
    </View>
  );
}

function DonutChart({ data, size = 190, stroke = 38, centerValue, centerLabel }) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let offset = 0;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <G rotation={-90} origin={`${size / 2}, ${size / 2}`}>
          {data.map((d) => {
            const length = (d.value / total) * circumference;
            const circle = (
              <Circle
                key={d.label}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke={d.color}
                strokeWidth={stroke}
                strokeDasharray={`${length} ${circumference - length}`}
                strokeDashoffset={-offset}
                fill="none"
              />
            );
            offset += length;
            return circle;
          })}
        </G>
      </Svg>
      <View style={styles.donutCenter} pointerEvents="none">
        <Text style={styles.donutCenterValue}>{centerValue}</Text>
        <Text style={styles.donutCenterLabel}>{centerLabel}</Text>
      </View>
    </View>
  );
}

function ListaProgresso({ itens, sufixo = '', maximo, cor }) {
  const teto = maximo || Math.max(...itens.map((i) => i.valor), 1);
  return (
    <View style={styles.rankList}>
      {itens.map((item) => (
        <View key={item.rotulo}>
          <View style={styles.rankTop}>
            <Text style={styles.rankLabel} numberOfLines={1}>{item.rotulo}</Text>
            <Text style={styles.rankValue}>{`${formatar(item.valor)}${sufixo}`}</Text>
          </View>
          <View style={styles.rankTrack}>
            <View
              style={[
                styles.rankFill,
                { width: `${Math.min((item.valor / teto) * 100, 100)}%`, backgroundColor: cor },
              ]}
            />
          </View>
        </View>
      ))}
    </View>
  );
}

function StatusBadge({ status }) {
  const variants = {
    'Concluído': [styles.badgeConclusao, styles.badgeConclusaoText],
    'Em processo': [styles.badgeRevisao, styles.badgeRevisaoText],
    'Erro': [styles.badgeErro, styles.badgeErroText],
  };
  const [badgeStyle, textStyle] = variants[status] || variants['Em processo'];
  return (
    <View style={[styles.badge, badgeStyle]}>
      <Text style={[styles.badgeText, textStyle]}>{status}</Text>
    </View>
  );
}

function ActivityRow({ activity, onOpen }) {
  return (
    <Pressable
      style={({ hovered }) => [styles.row, hovered && styles.rowHover]}
      onPress={() => onOpen && onOpen(activity)}
    >
      <View style={[styles.cell, styles.cellDoc]}>
        <View style={styles.cellDocInner}>
          <Ionicons name="document-text-outline" size={12} color={docColors.sidebar} style={styles.fileIcon} />
          <Text style={[styles.cellText, styles.cellDocText]} numberOfLines={1}>{activity.document}</Text>
        </View>
      </View>
      <View style={[styles.cell, styles.cellTipo]}>
        <Text style={styles.cellText}>{activity.type}</Text>
      </View>
      <View style={[styles.cell, styles.cellStatus]}>
        <StatusBadge status={activity.status} />
      </View>
      <View style={[styles.cell, styles.cellData]}>
        <Text style={styles.cellText}>{activity.date}</Text>
      </View>
      <View style={[styles.cell, styles.cellUser, styles.cellLast]}>
        <Text style={styles.cellText}>{activity.user}</Text>
      </View>
    </Pressable>
  );
}

export default function Dashboard({
  activeMenu = 'dashboard',
  onNavigate,
  userName = 'Mayara',
  activities = RECENT_ACTIVITY,
  onSearch,
  onOpenNotifications,
  onOpenProfile,
  onSeeAllActivities,
  onOpenActivity,
}) {
  const [search, setSearch] = useState('');
  const [period, setPeriod] = useState('30d');
  const [chartRange, setChartRange] = useState(6);
  const [abaAtiva, setAbaAtiva] = useState('visao-geral');

  const visaoGeral = abaAtiva === 'visao-geral';
  const dados = DADOS[abaAtiva];
  const kpiValores = KPIS_BY_PERIOD[period];

  const kpis = visaoGeral ? kpisVisaoGeral(kpiValores) : dados.kpis;
  const barras1Dados = dados.barras1.filtroMeses ? MONTHLY.slice(-chartRange) : dados.barras1.dados;

  const donutDados = dados.donut.itens.map((item, i) => ({
    label: item.rotulo,
    value: item.valor,
    color: PALETA[i % PALETA.length],
  }));
  const donutTotal = donutDados.reduce((soma, d) => soma + d.value, 0);
  const donutCentro = visaoGeral ? kpiValores.processed : donutTotal;

  function handleNavigate(key) {
    if (onNavigate) onNavigate(key);
  }

  return (
    <View style={styles.container}>
      <MenuGlobal activeMenu={activeMenu} onNavigate={handleNavigate} />

      <ScrollView
        style={styles.main}
        contentContainerStyle={styles.mainContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color={docColors.sidebar} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por documentos, integrações..."
              placeholderTextColor={docColors.sidebar}
              value={search}
              onChangeText={setSearch}
              onSubmitEditing={() => onSearch && onSearch(search)}
              returnKeyType="search"
            />
          </View>
          <View style={styles.topActions}>
            <Pressable style={styles.iconButton} onPress={onOpenNotifications} accessibilityLabel="Notificações">
              <Ionicons name="notifications-outline" size={24} color={docColors.sidebar} />
              <View style={styles.notificationDot} />
            </Pressable>
            <Pressable style={styles.iconButton} onPress={onOpenProfile} accessibilityLabel="Perfil">
              <Ionicons name="person-circle-outline" size={32} color={docColors.sidebar} />
            </Pressable>
          </View>
        </View>

        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>Olá, {userName}</Text>
            <Text style={styles.subtitle}>Aqui está o resumo da LabFlow</Text>
          </View>
          {visaoGeral ? (
            <Dropdown
              label="Filtrar por período"
              icon="calendar-outline"
              options={PERIODS}
              value={period}
              onChange={setPeriod}
              align="right"
            />
          ) : null}
        </View>

        <View style={styles.tabs}>
          {ABAS.map((aba) => {
            const ativa = aba.id === abaAtiva;
            return (
              <Pressable
                key={aba.id}
                onPress={() => setAbaAtiva(aba.id)}
                accessibilityRole="button"
                style={({ hovered }) => [
                  styles.tab,
                  hovered && !ativa && styles.tabHover,
                  ativa && styles.tabActive,
                ]}
              >
                <Ionicons
                  name={aba.icone}
                  size={16}
                  color={ativa ? '#FFFFFF' : docColors.sidebar}
                  style={styles.tabIcon}
                />
                <Text style={[styles.tabText, ativa && styles.tabTextActive]}>{aba.rotulo}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.kpiRow}>
          {kpis.map((kpi) => (
            <KpiCard key={kpi.rotulo} {...kpi} />
          ))}
        </View>

        <View style={styles.chartsRow}>
          <View style={styles.chartCard}>
            <View style={styles.chartCardHeader}>
              <Text style={styles.cardTitle}>{dados.barras1.titulo}</Text>
              {dados.barras1.filtroMeses ? (
                <Dropdown
                  small
                  label="Filtrar gráfico por meses"
                  options={CHART_RANGES}
                  value={chartRange}
                  onChange={setChartRange}
                  align="right"
                />
              ) : null}
            </View>
            <BarChart data={barras1Dados} sufixo={dados.barras1.sufixo} />
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartCardHeader}>
              <Text style={styles.cardTitle}>{dados.donut.titulo}</Text>
            </View>
            <View style={styles.donutBody}>
              <DonutChart
                data={donutDados}
                centerValue={donutCentro.toLocaleString('pt-BR')}
                centerLabel={dados.donut.centroRotulo}
              />
              <View style={styles.legend}>
                {donutDados.map((d) => (
                  <View key={d.label} style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: d.color }]} />
                    <Text style={styles.legendLabel}>{d.label}</Text>
                    <Text style={styles.legendValue}>{Math.round((d.value / donutTotal) * 100)}%</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.chartsRow}>
          <View style={styles.chartCard}>
            <View style={styles.chartCardHeader}>
              <Text style={styles.cardTitle}>{dados.barras2.titulo}</Text>
            </View>
            <BarChart data={dados.barras2.dados} sufixo={dados.barras2.sufixo} />
          </View>

          <View style={styles.chartCard}>
            <View style={styles.chartCardHeader}>
              <Text style={styles.cardTitle}>{dados.ranking.titulo}</Text>
            </View>
            <ListaProgresso
              itens={dados.ranking.itens}
              sufixo={dados.ranking.sufixo}
              maximo={dados.ranking.maximo}
              cor={dados.ranking.cor}
            />
          </View>
        </View>

        {visaoGeral ? (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.cardTitle}>Atividade recente</Text>
              <Pressable onPress={onSeeAllActivities}>
                <Text style={styles.seeAll}>Ver todos →</Text>
              </Pressable>
            </View>

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
              <View style={styles.cellData}>
                <Text style={styles.headerText}>Data</Text>
              </View>
              <View style={styles.cellUser}>
                <Text style={styles.headerText}>Usuário</Text>
              </View>
            </View>

            {activities.length === 0 ? (
              <Text style={styles.emptyText}>Nenhuma atividade recente.</Text>
            ) : (
              activities.map((a) => (
                <ActivityRow key={a.id} activity={a} onOpen={onOpenActivity} />
              ))
            )}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}