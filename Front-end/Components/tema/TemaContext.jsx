
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

const TemaContext = createContext();

const temas = {
  claro: {
    background: "#F3FFFC",
    card: "#FFFFFF",
    texto: "#174847",
    textoSecundario: "#929B9A",
    primario: "#287F7D",
    secundario: "#70AAA9",
    borda: "#D5DBD9",
    vinho: "#460303",
    input: "#FFFFFF",
    statusAtivo: "#BDFFB8",
    statusInativo: "#FFC5C5",
  },

  escuro: {
    background: "#121C1B",
    card: "#1E2C2A",
    texto: "#FFFFFF",
    textoSecundario: "#AABBB8",
    primario: "#55B7B0",
    secundario: "#397F7B",
    borda: "#3B504D",
    vinho: "#8F4545",
    input: "#314441",
    statusAtivo: "#285C42",
    statusInativo: "#713D43",
  },
};

export function TemaProvider({ children }) {
  const [modoEscuro, setModoEscuro] = useState(false);
  const [carregandoTema, setCarregandoTema] = useState(true);

  useEffect(() => {
    async function carregarTema() {
      try {
        const temaSalvo = await AsyncStorage.getItem("modoEscuro");

        setModoEscuro(temaSalvo === "true");
      } catch (error) {
        console.log("Erro ao carregar tema:", error);
      } finally {
        setCarregandoTema(false);
      }
    }

    carregarTema();
  }, []);

  async function alternarTema() {
    const novoTema = !modoEscuro;

    setModoEscuro(novoTema);

    try {
      await AsyncStorage.setItem(
        "modoEscuro",
        String(novoTema)
      );
    } catch (error) {
      console.log("Erro ao salvar tema:", error);
    }
  }

  const cores = modoEscuro ? temas.escuro : temas.claro;

  return (
    <TemaContext.Provider
      value={{
        modoEscuro,
        alternarTema,
        cores,
        carregandoTema,
      }}
    >
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  return useContext(TemaContext);
}
