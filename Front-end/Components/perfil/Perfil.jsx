import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { Ionicons } from '@react-native-vector-icons/ionicons';
import { perfilStyles as styles } from "./PerfilStyles";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useTema } from "../tema/TemaContext";

export default function Perfil({ navigation }) {
  const [aba, setAba] = useState("Perfil");

  const [nome, setNome] = useState("Mayara Gussonato");
  const [email, setEmail] = useState("mayara@labflow.com.br");
  const [cargo, setCargo] = useState("Administradora");
  const [instituicao, setInstituicao] = useState("LabFlow");
  const [telefone, setTelefone] = useState("(11) 91234-5678");

  const { cores, modoEscuro, alternarTema } = useTema();

  function salvarAlteracoes() {
    alert("Alterações salvas com sucesso!");
  }

  const corTexto = cores.texto;
  const corSecundaria = cores.textoSecundario;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: cores.background },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.conteudo}
      >
        <Header titulo="Meu Perfil" />

        <View style={styles.sim}>
          <Text
            style={[
              styles.subtitulo,
              { color: corSecundaria },
            ]}
          >
            Gerencie suas informações e preferências
          </Text>
        </View>

        {/* Alternar tema */}
        <TouchableOpacity
          style={[
            styles.botaoTema,
            {
              backgroundColor: cores.card,
              borderColor: cores.borda,
            },
          ]}
          onPress={alternarTema}
        >
          <View style={styles.infoTema}>
            <Ionicons
              name={modoEscuro ? "moon" : "sunny"}
              size={20}
              color={cores.primario}
            />

            <Text
              style={[
                styles.textoTema,
                { color: corTexto },
              ]}
            >
              Modo escuro
            </Text>
          </View>

          <Ionicons
            name={modoEscuro ? "toggle" : "toggle-outline"}
            size={30}
            color={cores.primario}
          />
        </TouchableOpacity>

        {/* Abas */}
        <View style={styles.abas}>
          <TouchableOpacity
            style={styles.aba}
            onPress={() => setAba("Perfil")}
          >
            <Text
              style={[
                styles.textoAba,
                { color: corTexto },
                aba === "Perfil" && styles.abaAtiva,
              ]}
            >
              Perfil
            </Text>

            {aba === "Perfil" && (
              <View
                style={[
                  styles.linhaAtiva,
                  { backgroundColor: cores.vinho },
                ]}
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.aba}
            onPress={() => setAba("Segurança")}
          >
            <Text
              style={[
                styles.textoAba,
                { color: corTexto },
                aba === "Segurança" && styles.abaAtiva,
              ]}
            >
              Segurança
            </Text>

            {aba === "Segurança" && (
              <View
                style={[
                  styles.linhaAtiva,
                  { backgroundColor: cores.vinho },
                ]}
              />
            )}
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: cores.card,
              borderColor: cores.borda,
            },
          ]}
        >
          {aba === "Perfil" ? (
            <>
              {/* Foto e informações */}
              <View style={styles.usuario}>
                <View
                  style={[
                    styles.fotoContainer,
                    { backgroundColor: cores.secundario },
                  ]}
                >
                  <Text style={styles.iniciais}>MG</Text>

                  <TouchableOpacity style={styles.botaoFoto}>
                    <Ionicons
                      name="camera"
                      size={13}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>
                </View>

                <Text
                  style={[
                    styles.nomeUsuario,
                    { color: corTexto },
                  ]}
                >
                  {nome}
                </Text>

                <Text
                  style={[
                    styles.cargoUsuario,
                    { color: corSecundaria },
                  ]}
                >
                  {cargo}
                </Text>
              </View>

              {/* Campos */}
              <View style={styles.formulario}>
                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    Nome completo
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: cores.input,
                        borderColor: cores.borda,
                        color: corTexto,
                      },
                    ]}
                    value={nome}
                    onChangeText={setNome}
                    placeholderTextColor={corSecundaria}
                  />
                </View>

                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    E-mail
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: cores.input,
                        borderColor: cores.borda,
                        color: corTexto,
                      },
                    ]}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    placeholderTextColor={corSecundaria}
                  />
                </View>

                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    Cargo
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: cores.input,
                        borderColor: cores.borda,
                        color: corTexto,
                      },
                    ]}
                    value={cargo}
                    onChangeText={setCargo}
                    placeholderTextColor={corSecundaria}
                  />
                </View>

                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    Instituição
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: cores.input,
                        borderColor: cores.borda,
                        color: corTexto,
                      },
                    ]}
                    value={instituicao}
                    onChangeText={setInstituicao}
                    placeholderTextColor={corSecundaria}
                  />
                </View>

                <View style={styles.campo}>
                  <Text
                    style={[
                      styles.label,
                      { color: corTexto },
                    ]}
                  >
                    Telefone
                  </Text>

                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: cores.input,
                        borderColor: cores.borda,
                        color: corTexto,
                      },
                    ]}
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                    placeholderTextColor={corSecundaria}
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.botaoSalvar,
                  { backgroundColor: cores.vinho },
                ]}
                onPress={salvarAlteracoes}
              >
                <Text style={styles.textoBotao}>
                  Salvar alterações
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.seguranca}>
              <Text
                style={[
                  styles.tituloSeguranca,
                  { color: corTexto },
                ]}
              >
                Segurança da conta
              </Text>

              <Text
                style={[
                  styles.labelSeguranca,
                  { color: corTexto },
                ]}
              >
                Senha atual
              </Text>

              <TextInput
                style={[
                  styles.inputSeguranca,
                  {
                    backgroundColor: cores.input,
                    borderColor: cores.borda,
                    color: corTexto,
                  },
                ]}
                placeholder="Digite sua senha atual"
                placeholderTextColor={corSecundaria}
                secureTextEntry
              />

              <Text
                style={[
                  styles.labelSeguranca,
                  { color: corTexto },
                ]}
              >
                Nova senha
              </Text>

              <TextInput
                style={[
                  styles.inputSeguranca,
                  {
                    backgroundColor: cores.input,
                    borderColor: cores.borda,
                    color: corTexto,
                  },
                ]}
                placeholder="Digite sua nova senha"
                placeholderTextColor={corSecundaria}
                secureTextEntry
              />

              <Text
                style={[
                  styles.labelSeguranca,
                  { color: corTexto },
                ]}
              >
                Confirmar senha
              </Text>

              <TextInput
                style={[
                  styles.inputSeguranca,
                  {
                    backgroundColor: cores.input,
                    borderColor: cores.borda,
                    color: corTexto,
                  },
                ]}
                placeholder="Confirme sua nova senha"
                placeholderTextColor={corSecundaria}
                secureTextEntry
              />

              <TouchableOpacity
                style={[
                  styles.botaoSalvar,
                  { backgroundColor: cores.vinho },
                ]}
              >
                <Text style={styles.textoBotao}>
                  Alterar senha
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>

      <Footer />
    </View>
  );
}