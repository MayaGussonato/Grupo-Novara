// Funções de formatação usadas nas listagens.
// Mantidas separadas para não repetir lógica dentro dos componentes.

/** 1752739 -> "1,7 MB" */
export function formatarTamanho(bytes) {
  if (bytes === null || bytes === undefined) {
    return "—";
  }

  const numero = Number(bytes);

  if (Number.isNaN(numero) || numero <= 0) {
    return "—";
  }

  const unidades = ["B", "KB", "MB", "GB"];
  let valor = numero;
  let indice = 0;

  while (valor >= 1024 && indice < unidades.length - 1) {
    valor /= 1024;
    indice += 1;
  }

  const casas = valor >= 10 || indice === 0 ? 0 : 1;

  return `${valor.toFixed(casas).replace(".", ",")} ${unidades[indice]}`;
}

/** "2026-10-29T14:09:10" -> "29/10/2026" */
export function formatarData(dataIso) {
  if (!dataIso) {
    return "—";
  }

  const data = new Date(dataIso);

  if (Number.isNaN(data.getTime())) {
    return "—";
  }

  return data.toLocaleDateString("pt-BR");
}

/** "2026-10-29T14:09:10" -> "29/10/2026 14:09" */
export function formatarDataHora(dataIso) {
  if (!dataIso) {
    return "—";
  }

  const data = new Date(dataIso);

  if (Number.isNaN(data.getTime())) {
    return "—";
  }

  return `${data.toLocaleDateString("pt-BR")} ${data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

/** 72.5 -> "72,5%" */
export function formatarConfianca(valor) {
  if (valor === null || valor === undefined) {
    return "—";
  }

  return `${Number(valor).toFixed(1).replace(".", ",")}%`;
}

/**
 * Status do banco (Status_Arquivo) -> texto e cor usados na interface.
 * A tela de validação usa "Revisando"; a API devolve "Revisao".
 */
export function statusParaInterface(statusApi) {
  switch (statusApi) {
    case "Aprovado":
      return {
        rotulo: "Aprovados",
        descricao: "Documento validado",
        cor: "#21865B",
        progresso: 100,
      };

    case "Revisao":
      return {
        rotulo: "Revisando",
        descricao: "Aguardando validação",
        cor: "#D99A22",
        progresso: 65,
      };

    case "Erro":
      return {
        rotulo: "Erros",
        descricao: "Necessita de correção",
        cor: "#D94A4A",
        progresso: 30,
      };

    case "Processando":
    default:
      return {
        rotulo: "Processando",
        descricao: "Em processamento",
        cor: "#398BFF",
        progresso: 15,
      };
  }
}

/** Filtro da tela ("Revisando") -> status da API ("Revisao"). */
export function filtroParaStatus(filtro) {
  switch (filtro) {
    case "Revisando":
      return "Revisao";
    case "Aprovados":
      return "Aprovado";
    case "Erros":
      return "Erro";
    case "Processando":
      return "Processando";
    default:
      return null;
  }
}

/** "Nota Fiscal" -> "Nota Fiscal"; null -> "—" */
export function formatarTipo(tipo) {
  if (!tipo) {
    return "—";
  }

  return tipo;
}
