import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons'
import { atendimentoStyles as styles } from "./AtendimentoStyles";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { useTema } from "../tema/TemaContext";

const atendimentosIniciais = [
  {
    id: "1",
    numero: "ATD-2026-0048",
    descricao: "Erro no processamento do laudo",
    prioridade: "Alta",
    status: "Aberto",
    data: "20/10/2026 11:13",
  },
  {
    id: "2",
    numero: "ATD-2026-0047",
    descricao: "Erro no processamento do laudo",
    prioridade: "Alta",
    status: "Aberto",
    data: "20/10/2026 11:13",
  },
  {
    id: "3",
    numero: "ATD-2026-0046",
    descricao: "Erro no processamento do laudo",
    prioridade: "Alta",
    status: "Em andamento",
    data: "20/10/2026 11:13",
  },
  {
    id: "4",
    numero: "ATD-2026-0045",
    descricao: "Erro no processamento do laudo",
    prioridade: "Alta",
    status: "Aberto",
    data: "20/10/2026 11:13",
  },
  {
    id: "5",
    numero: "ATD-2026-0044",
    descricao: "Falha na leitura do documento",
    prioridade: "Média",
    status: "Em andamento",
    data: "20/10/2026 10:45",
  },
];

export default function Atendimento({ navigation }) {
  const [filtro, setFiltro] = useState("Todos");
  const { cores, modoEscuro } = useTema();

  const atendimentosFiltrados = atendimentosIniciais.filter(
    (atendimento) => {
      if (filtro === "Todos") return true;
      if (filtro === "Abertos") return atendimento.status === "Aberto";
      if (filtro === "Em andamento") return atendimento.status === "Em andamento";
      return true;
    }
  );

  const filtros = ["Todos", "Abertos", "Em andamento"];

  return (
    <View style={[styles.container, { backgroundColor: cores.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Header titulo="Central de Atendimentos" />
        
        {/* Título descritivo */}
        <Text style={[styles.titulo, { color: cores.textoSecundario }]}>
          Acompanhe os atendimentos{"\n"}relacionados aos documentos
        </Text>

        {/* Filtros */}
        <View style={styles.filtros}>
          {filtros.map((item) => {
            const isAtivo = filtro === item;
            return (
              <TouchableOpacity
                key={item}
                style={styles.filtro}
                onPress={() => setFiltro(item)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.textoFiltro,
                    { color: cores.texto },
                    isAtivo && [styles.filtroAtivo, { color: cores.vinho || "#650000" }],
                  ]}
                >
                  {item}
                </Text>

                {isAtivo && (
                  <View style={[styles.linhaAtiva, { backgroundColor: cores.vinho || "#650000" }]} />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Lista de atendimentos */}
        <View style={styles.lista}>
          {atendimentosFiltrados.length > 0 ? (
            atendimentosFiltrados.map((atendimento) => {
              const isAberto = atendimento.status === "Aberto";
              
              // Ajuste de cores das etiquetas com base no modo escuro
              const backgroundStatus = isAberto
                ? (modoEscuro ? "#1A2C38" : "#E3F1F8")
                : (modoEscuro ? "#3D1E1E" : "#F8C5C5");
                
              const corTextoStatus = isAberto
                ? (modoEscuro ? "#6BA8D6" : "#42627B")
                : (modoEscuro ? "#E67373" : "#A13E3E");

              return (
                <TouchableOpacity
                  key={atendimento.id}
                  style={[styles.card, { backgroundColor: cores.card, borderColor: cores.borda }]}
                  activeOpacity={0.8}
                  onPress={() =>
                    navigation?.navigate?.("DetalhesAtendimento", { atendimento })
                  }
                >
                  <View style={styles.informacoes}>
                    <Text style={[styles.numero, { color: cores.texto }]}>
                      {atendimento.numero}
                    </Text>

                    <Text style={[styles.descricao, { color: cores.textoSecundario }]}>
                      {atendimento.descricao}
                    </Text>
                  </View>

                  {/* Etiquetas */}
                  <View style={styles.etiquetas}>
                    <View style={styles.prioridade}>
                      <Text style={styles.textoPrioridade}>
                        {atendimento.prioridade}
                      </Text>
                    </View>

                    <View style={[styles.status, { backgroundColor: backgroundStatus }]}>
                      <Text style={[styles.textoStatus, { color: corTextoStatus }]}>
                        {atendimento.status}
                      </Text>
                    </View>
                  </View>

                  {/* Data e seta */}
                  <View style={styles.rodapeCard}>
                    <Text style={[styles.data, { color: cores.textoSecundario }]}>
                      {atendimento.data}
                    </Text>

                    <Ionicons
                      name="chevron-forward"
                      size={21}
                      color={cores.textoSecundario}
                    />
                  </View>
                </TouchableOpacity>
              );
            })
          ) : (
            <Text style={[styles.semResultados, { color: cores.textoSecundario }]}>
              Nenhum atendimento encontrado.
            </Text>
          )}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
