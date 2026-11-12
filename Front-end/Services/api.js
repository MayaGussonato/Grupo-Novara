
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Endereço da API.
//
// - No navegador, "localhost" funciona (a API está na mesma máquina).
// - No celular, "localhost" aponta para o PRÓPRIO celular: precisa do IP
//   do computador na rede Wi-Fi.
//
// O IP é descoberto automaticamente a partir do endereço do Metro (o mesmo
// que o celular acabou de acessar), então na maioria dos casos não é preciso
// configurar nada. Para fixar manualmente, defina EXPO_PUBLIC_API_URL.
const PORTA_API = 5239;

function descobrirHostDoMetro() {
  try {
    const Constants = require("expo-constants").default;

    const hostUri =
      Constants?.expoConfig?.hostUri ||
      Constants?.expoGoConfig?.debuggerHost ||
      Constants?.manifest2?.extra?.expoGo?.debuggerHost ||
      Constants?.manifest?.debuggerHost;

    if (!hostUri) {
      return null;
    }

    const host = String(hostUri).split(":")[0];

    if (!host || host === "localhost" || host === "127.0.0.1") {
      return null;
    }

    return host;
  } catch {
    return null;
  }
}

function resolverApiUrl() {
  const configurada = process.env.EXPO_PUBLIC_API_URL;

  if (configurada) {
    return configurada.replace(/\/$/, "");
  }

  // Web: a API está na mesma máquina que serve a página
  if (Platform.OS === "web") {
    return `http://localhost:${PORTA_API}`;
  }

  // Celular/emulador: usa o mesmo host do Metro
  const hostMetro = descobrirHostDoMetro();

  if (hostMetro) {
    return `http://${hostMetro}:${PORTA_API}`;
  }

  // Último recurso: emulador Android acessa o host por 10.0.2.2
  if (Platform.OS === "android") {
    return `http://10.0.2.2:${PORTA_API}`;
  }

  return `http://localhost:${PORTA_API}`;
}

export { resolverApiUrl };

export async function apiRequest(path, config = {}) {
  const {
    public: rotaPublica = false,
    headers = {},
    ...options
  } = config;

  const token = await AsyncStorage.getItem("@labflow/token");

  const headersRequest = { ...headers };

  const ehFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  // Não definir Content-Type manualmente para FormData.
  // O fetch precisa gerar o boundary do multipart.
  if (options.body && !ehFormData) {
    headersRequest["Content-Type"] = "application/json";
  }

  if (token && !rotaPublica) {
    headersRequest.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${resolverApiUrl()}${path}`, {
    ...options,
    headers: headersRequest,
  });

  if (response.status === 204) {
    return null;
  }

  const texto = await response.text();

  let dados = null;

  try {
    dados = texto ? JSON.parse(texto) : null;
  } catch {
    dados = texto;
  }

  if (!response.ok) {
    const mensagem =
      typeof dados === "string"
        ? dados
        : dados?.erro ||
          dados?.detail ||
          dados?.title ||
          "Ocorreu um erro na comunicação com o servidor.";

    throw new Error(mensagem);
  }

  return dados;
}
