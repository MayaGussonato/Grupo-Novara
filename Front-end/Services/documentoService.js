
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiRequest, resolverApiUrl } from "./api";

export async function enviarDocumento(arquivo, tipoDocumento) {
  const formulario = new FormData();

  formulario.append("TipoDocumento", tipoDocumento || "");

  if (Platform.OS === "web" && arquivo.file) {
    // No navegador, utiliza o objeto File.
    formulario.append("Arquivo", arquivo.file, arquivo.name);
  } else {
    // Android e iOS: envia a URI do arquivo.
    formulario.append("Arquivo", {
      uri: arquivo.uri,
      name: arquivo.name,
      type: arquivo.mimeType || "application/octet-stream",
    });
  }

  return apiRequest("/api/Documento", {
    method: "POST",
    body: formulario,
  });
}

export function listarDocumentos(filtros = {}) {
  const pagina = filtros.pagina || 1;
  const tamanho = filtros.tamanho || 20;

  let rota = `/api/Documento?pagina=${pagina}&tamanho=${tamanho}`;

  if (filtros.status) {
    rota += `&status=${encodeURIComponent(filtros.status)}`;
  }

  return apiRequest(rota);
}

export function buscarDocumento(id) {
  return apiRequest(`/api/Documento/${id}`);
}

export function processarDocumento(id) {
  return apiRequest(`/api/Documento/${id}/processar`, {
    method: "POST",
  });
}

/** Soft delete: o documento some da API, o histórico fica no banco. */
export function excluirDocumento(id) {
  return apiRequest(`/api/Documento/${id}`, {
    method: "DELETE",
  });
}

export function buscarExtracoes(idDocumento) {
  return apiRequest(`/api/Extracao/documento/${idDocumento}`);
}

export function buscarExtracao(idExtracao) {
  return apiRequest(`/api/Extracao/${idExtracao}`);
}

export function buscarHistorico(idDocumento) {
  return apiRequest(`/api/Documento/${idDocumento}/historico`);
}

/** URL do arquivo para download/abertura (o token vai no header, então use apiRequest). */
export async function baixarDocumento(id) {
  return apiRequest(`/api/Documento/${id}/arquivo`);
}

/**
 * Recupera o arquivo para a pré-visualização.
 *
 * PDF, DOCX, XLSX e TIFF utilizam /pdf.
 * PNG, JPG e JPEG utilizam /arquivo.
 * TXT utiliza /arquivo.
 */
export async function obterArquivoPreVisualizacao(
  id,
  formato,
  nomeArquivo
) {
  const idDocumento = String(id ?? "").trim();

  if (!/^\d+$/.test(idDocumento)) {
    throw new Error("ID do documento inválido.");
  }

  let extensao = String(formato || "").trim().toLowerCase();

  extensao = extensao.replace(/^\./, "");

  if (!extensao && nomeArquivo) {
    extensao = String(nomeArquivo)
      .split(".")
      .pop()
      .toLowerCase();
  }

  const formatosPdf = [
    "pdf",
    "docx",
    "xlsx",
    "tif",
    "tiff",
  ];

  const formatosImagem = [
    "png",
    "jpg",
    "jpeg",
  ];

  const formatosTexto = ["txt"];

  let tipo;
  let endpoint;

  if (formatosPdf.includes(extensao)) {
    tipo = "pdf";
    endpoint = "pdf";
  } else if (formatosImagem.includes(extensao)) {
    tipo = "imagem";
    endpoint = "arquivo";
  } else if (formatosTexto.includes(extensao)) {
    tipo = "texto";
    endpoint = "arquivo";
  } else {
    throw new Error(
      `O formato "${extensao || "desconhecido"}" não possui pré-visualização disponível.`
    );
  }

  const token = await AsyncStorage.getItem("@labflow/token");

  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  const url =
    `${resolverApiUrl()}/api/Documento/${encodeURIComponent(idDocumento)}/${endpoint}`;

  // No aplicativo nativo, imagens podem ser carregadas diretamente
  // com o token no cabeçalho da requisição da imagem.
  if (Platform.OS !== "web") {
    if (tipo === "imagem") {
      return {
        tipo,
        uri: url,
        headers,
      };
    }

    return {
      tipo: "nao-suportado",
      mensagem:
        "A pré-visualização de PDF e TXT está disponível na versão web. O aplicativo nativo ainda precisa de um visualizador de documentos.",
    };
  }

  // Na versão web, buscamos o arquivo como binário.
  const resposta = await fetch(url, {
    headers,
  });

  if (!resposta.ok) {
    const corpo = await resposta.text();

    let mensagem = corpo;

    try {
      const json = corpo ? JSON.parse(corpo) : null;

      mensagem =
        json?.message ||
        json?.mensagem ||
        json?.erro ||
        json?.error ||
        json?.detail ||
        json?.title ||
        corpo;
    } catch {
      // A resposta também pode ser texto simples do controller.
    }

    throw new Error(
      `Erro ${resposta.status} ao carregar o documento: ${
        mensagem || resposta.statusText
      }`
    );
  }

  const blob = await resposta.blob();

  return {
    tipo,
    blob,
  };
}
