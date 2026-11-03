
import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { atendimentoStyles as styles } from "./AtendimentoStyles";
import Footer from "../footer/Footer";
import Header from "../header/Header";

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

  const atendimentosFiltrados = atendimentosIniciais.filter(
    (atendimento) => {
      if (filtro === "Todos") return true;

      if (filtro === "Abertos") {
        return atendimento.status === "Aberto";
      }

      if (filtro === "Em andamento") {
        return atendimento.status === "Em andamento";
      }

      return true;
    }
  );

  const filtros = ["Todos", "Abertos", "Em andamento"];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Header 
            titulo="Central de Atendimentos"
        />
        {/* Título */}
        <Text style={styles.titulo}>
          Acompanhe os atendimentos
          {"\n"}
          relacionados aos documentos
        </Text>

        {/* Filtros */}
        <View style={styles.filtros}>
          {filtros.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.filtro}
              onPress={() => setFiltro(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.textoFiltro,
                  filtro === item && styles.filtroAtivo,
                ]}
              >
                {item}
              </Text>

              {filtro === item && (
                <View style={styles.linhaAtiva} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Lista de atendimentos */}
        <View style={styles.lista}>
          {atendimentosFiltrados.length > 0 ? (
            atendimentosFiltrados.map((atendimento) => (
              <TouchableOpacity
                key={atendimento.id}
                style={styles.card}
                activeOpacity={0.8}
                onPress={() =>
                  navigation?.navigate?.(
                    "DetalhesAtendimento",
                    { atendimento }
                  )
                }
              >
                <View style={styles.informacoes}>
                  <Text style={styles.numero}>
                    {atendimento.numero}
                  </Text>

                  <Text style={styles.descricao}>
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

                  <View
                    style={[
                      styles.status,
                      atendimento.status === "Aberto"
                        ? styles.statusAberto
                        : styles.statusAndamento,
                    ]}
                  >
                    <Text
                      style={[
                        styles.textoStatus,
                        atendimento.status === "Aberto"
                          ? styles.textoAberto
                          : styles.textoAndamento,
                      ]}
                    >
                      {atendimento.status}
                    </Text>
                  </View>
                </View>

                {/* Data e seta */}
                <View style={styles.rodapeCard}>
                  <Text style={styles.data}>
                    {atendimento.data}
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={21}
                    color="#333333"
                  />
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.semResultados}>
              Nenhum atendimento encontrado.
            </Text>
          )}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
}
