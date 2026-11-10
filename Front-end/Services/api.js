
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// No navegador, se o backend estiver no mesmo computador:
const API_URL =
  Platform.OS === "web"
    ? "http://localhost:5239"
    : "http://192.168.0.100:5239"; // Troque pelo IP do computador.

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

  const response = await fetch(`${API_URL}${path}`, {
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
