
// Funções de formatação usadas nas listagens.

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

export function formatarData(dataIso) {
  if (!dataIso) return "—";

  const data = new Date(dataIso);

  if (Number.isNaN(data.getTime())) return "—";

  return data.toLocaleDateString("pt-BR");
}

export function formatarDataHora(dataIso) {
  if (!dataIso) return "—";

  const data = new Date(dataIso);

  if (Number.isNaN(data.getTime())) return "—";

  return `${data.toLocaleDateString("pt-BR")} ${data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}

export function formatarConfianca(valor) {
  if (valor === null || valor === undefined) {
    return "—";
  }

  return `${Number(valor).toFixed(1).replace(".", ",")}%`;
}

export function statusParaInterface(statusApi) {
  const status = String(statusApi ?? "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  switch (status) {
    case "aprovado":
    case "aprovados":
      return {
        rotulo: "Aprovados",
        descricao: "Documento validado",
        cor: "#21865B",
        fundo: "#E1F3E9",
        progresso: 100,
      };

    case "revisao":
    case "revisando":
    case "em revisao":
      return {
        rotulo: "Revisando",
        descricao: "Aguardando validação",
        cor: "#0B4F8A",
        fundo: "#E2EDF7",
        progresso: 65,
      };

    case "erro":
    case "erros":
      return {
        rotulo: "Erros",
        descricao: "Necessita de correção",
        cor: "#D94A4A",
        fundo: "#FCE8E8",
        progresso: 30,
      };

    case "processando":
    case "processando...":
      return {
        rotulo: "Processando",
        descricao: "Documento em processamento pela IA",
        cor: "#A85D00",
        fundo: "#FFF0D9",
        progresso: 15,
      };

    default:
      return {
        rotulo: "Status desconhecido",
        descricao: "Não foi possível identificar o status do documento",
        cor: "#64748B",
        fundo: "#E8EDF2",
        progresso: 0,
      };
  }
}

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

export function formatarTipo(tipo) {
  if (!tipo) return "—";

  return tipo;
}
