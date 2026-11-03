using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Text.Json.Serialization;

namespace LabFlowAPI.Services.IA;

/// <summary>
/// LHAMA IA — extração estruturada com dois provedores.
///
/// Groq e Ollama falam o mesmo dialeto (OpenAI-compatible), então a chamada é uma só:
/// muda apenas a URL base, a chave e o nome do modelo.
///
/// Ordem de tentativa definida em IA:Provedores (appsettings). Se o primeiro falhar
/// por rede, timeout, cota ou JSON inválido, tenta o próximo.
/// </summary>
public class LhamaIaService : ILhamaIa
{
    private const string NomeSchema = "extracao_documento";

    private readonly HttpClient _http;
    private readonly IConfiguration _configuration;
    private readonly ILogger<LhamaIaService> _log;

    public LhamaIaService(
        HttpClient http,
        IConfiguration configuration,
        ILogger<LhamaIaService> log)
    {
        _http = http;
        _configuration = configuration;
        _log = log;
    }

    public async Task<(ExtracaoIa Extracao, string Provedor)> ExtrairAsync(
        string textoDocumento,
        string? tipoDocumento,
        IEnumerable<ExemploFewShot> exemplos,
        CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(textoDocumento))
        {
            throw new ArgumentException("O texto do documento está vazio.", nameof(textoDocumento));
        }

        var provedores = _configuration
            .GetSection("IA:Provedores")
            .Get<string[]>() ?? ["groq", "ollama"];

        var falhas = new List<string>();

        foreach (var provedor in provedores)
        {
            try
            {
                var extracao = await ChamarProvedorAsync(
                    provedor, textoDocumento, tipoDocumento, exemplos, cancellationToken);

                return (extracao, provedor);
            }
            catch (Exception erro) when (erro is not OperationCanceledException)
            {
                _log.LogWarning(erro, "Provedor de IA '{Provedor}' falhou; tentando o próximo.", provedor);
                falhas.Add($"{provedor}: {erro.Message}");
            }
        }

        throw new InvalidOperationException(
            "Nenhum provedor de IA conseguiu extrair o documento. " + string.Join(" | ", falhas));
    }

    private async Task<ExtracaoIa> ChamarProvedorAsync(
        string provedor,
        string textoDocumento,
        string? tipoDocumento,
        IEnumerable<ExemploFewShot> exemplos,
        CancellationToken cancellationToken)
    {
        var chave = provedor.ToLowerInvariant() switch
        {
            "groq" => "IA:Groq",
            "ollama" => "IA:Ollama",
            _ => throw new InvalidOperationException($"Provedor de IA desconhecido: '{provedor}'.")
        };

        var baseUrl = _configuration[$"{chave}:BaseUrl"]
            ?? throw new InvalidOperationException($"'{chave}:BaseUrl' não configurado.");

        var modelo = _configuration[$"{chave}:Model"]
            ?? throw new InvalidOperationException($"'{chave}:Model' não configurado.");

        // Falha cedo e com mensagem clara quando falta configuração ou serviço
        var apiKey = _configuration[$"{chave}:ApiKey"];

        if (provedor.Equals("groq", StringComparison.OrdinalIgnoreCase) &&
            string.IsNullOrWhiteSpace(apiKey))
        {
            throw new InvalidOperationException(
                "IA:Groq:ApiKey não configurada. Rode: dotnet user-secrets set \"IA:Groq:ApiKey\" \"sua_chave\"");
        }

        if (provedor.Equals("ollama", StringComparison.OrdinalIgnoreCase))
        {
            await GarantirOllamaNoArAsync(baseUrl, cancellationToken);
        }

        var mensagens = MontarMensagens(textoDocumento, tipoDocumento, exemplos);

        var requisicao = new
        {
            model = modelo,
            messages = mensagens,
            temperature = 0,                    // determinístico: menos invenção
            response_format = new
            {
                type = "json_schema",
                json_schema = new
                {
                    name = NomeSchema,
                    strict = true,
                    schema = SchemaExtracao()
                }
            }
        };

        using var request = new HttpRequestMessage(
            HttpMethod.Post,
            $"{baseUrl.TrimEnd('/')}/chat/completions")
        {
            Content = JsonContent.Create(requisicao)
        };

        if (!string.IsNullOrWhiteSpace(apiKey))
        {
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
        }

        using var response = await _http.SendAsync(request, cancellationToken);

        var corpo = await response.Content.ReadAsStringAsync(cancellationToken);

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException(
                $"HTTP {(int)response.StatusCode} — {Truncar(corpo, 300)}");
        }

        var conteudo = ExtrairConteudo(corpo);

        return Desserializar(conteudo);
    }

    private static object[] MontarMensagens(
        string textoDocumento,
        string? tipoDocumento,
        IEnumerable<ExemploFewShot> exemplos)
    {
        var mensagens = new List<object>
        {
            new { role = "system", content = PromptSistema(tipoDocumento) }
        };

        // Few-shot: pares (documento, extração aprovada) vindos de revisões humanas
        foreach (var exemplo in exemplos)
        {
            if (string.IsNullOrWhiteSpace(exemplo.TextoDocumento) ||
                string.IsNullOrWhiteSpace(exemplo.JsonAprovado))
            {
                continue;
            }

            mensagens.Add(new { role = "user", content = exemplo.TextoDocumento });
            mensagens.Add(new { role = "assistant", content = exemplo.JsonAprovado });
        }

        mensagens.Add(new { role = "user", content = textoDocumento });

        return mensagens.ToArray();
    }

    private static string PromptSistema(string? tipoDocumento)
    {
        var dica = string.IsNullOrWhiteSpace(tipoDocumento)
            ? string.Empty
            : $"\nO usuário classificou este documento como: {tipoDocumento}.";

        return """
            Você é a LHAMA IA, especialista em leitura e extração de dados de documentos.

            Sua tarefa: preencher o JSON do schema com as informações do documento.

            REGRAS OBRIGATÓRIAS:
            1. NUNCA invente informação. Se o dado não está escrito no documento, use null.
            2. NUNCA calcule, deduza ou complete um valor que não esteja literal.
            3. Para cada campo preenchido, copie em "trecho_origem" o pedaço EXATO do texto
               de onde você leu o valor. Se não houver trecho literal, o campo deve ser null.
            4. Preserve o valor original em "valor"; não formate, não corrija.
            5. "confianca" vai de 0 a 1 e deve refletir quão claro o dado estava no documento.
            6. Se o documento estiver ilegível, corrompido ou vazio, retorne todos os campos
               null e explique o motivo em "observacoes".
            7. Responda apenas com o JSON, sem texto antes ou depois.
            """ + dica;
    }

    private static string ExtrairConteudo(string corpoResposta)
    {
        using var json = JsonDocument.Parse(corpoResposta);

        var conteudo = json.RootElement
            .GetProperty("choices")[0]
            .GetProperty("message")
            .GetProperty("content")
            .GetString();

        if (string.IsNullOrWhiteSpace(conteudo))
        {
            throw new InvalidOperationException("O provedor retornou uma resposta vazia.");
        }

        return conteudo;
    }

    private static ExtracaoIa Desserializar(string conteudo)
    {
        // Alguns modelos locais embrulham o JSON em ```json ... ```
        var limpo = conteudo.Trim();

        if (limpo.StartsWith("```"))
        {
            var inicio = limpo.IndexOf('\n');
            var fim = limpo.LastIndexOf("```", StringComparison.Ordinal);

            if (inicio > 0 && fim > inicio)
            {
                limpo = limpo[(inicio + 1)..fim].Trim();
            }
        }

        try
        {
            return JsonSerializer.Deserialize<ExtracaoIa>(limpo, OpcoesJson)
                ?? throw new InvalidOperationException("JSON de extração vazio.");
        }
        catch (JsonException erro)
        {
            throw new InvalidOperationException(
                $"O provedor devolveu um JSON inválido: {Truncar(limpo, 200)}", erro);
        }
    }

    private static readonly JsonSerializerOptions OpcoesJson = new()
    {
        PropertyNameCaseInsensitive = true,
        NumberHandling = JsonNumberHandling.AllowReadingFromString
    };

    private static string Truncar(string texto, int tamanho)
        => texto.Length <= tamanho ? texto : texto[..tamanho] + "...";

    /// <summary>
    /// Confere se o Ollama está respondendo antes de tentar a extração.
    /// Sem isso o erro aparecia como "conexão recusada", sem dizer o que fazer.
    /// </summary>
    private static async Task GarantirOllamaNoArAsync(string baseUrl, CancellationToken cancellationToken)
    {
        // BaseUrl termina em /v1; a checagem de saúde fica na raiz do Ollama
        var raiz = baseUrl.TrimEnd('/');

        if (raiz.EndsWith("/v1", StringComparison.OrdinalIgnoreCase))
        {
            raiz = raiz[..^3];
        }

        using var sonda = new HttpClient { Timeout = TimeSpan.FromSeconds(3) };

        try
        {
            using var resposta = await sonda.GetAsync($"{raiz}/api/tags", cancellationToken);

            if (!resposta.IsSuccessStatusCode)
            {
                throw new InvalidOperationException(
                    $"Ollama respondeu HTTP {(int)resposta.StatusCode} em {raiz}.");
            }
        }
        catch (Exception erro) when (erro is HttpRequestException or TaskCanceledException)
        {
            throw new InvalidOperationException(
                $"Ollama não está rodando em {raiz}. Inicie com 'ollama serve' e baixe o modelo com 'ollama pull {_modeloOllama}'.", erro);
        }
    }

    private const string _modeloOllama = "llama3.2";

    /// <summary>JSON Schema que o modelo é obrigado a seguir.</summary>
    private static JsonNode SchemaExtracao() => JsonNode.Parse("""
        {
          "type": "object",
          "additionalProperties": false,
          "required": ["tipo_documento","numero_documento","data_emissao","nome","cpf","cnpj","valor_total","observacoes"],
          "properties": {
            "tipo_documento": { "type": ["string","null"] },
            "numero_documento": { "$ref": "#/$defs/campo" },
            "data_emissao":     { "$ref": "#/$defs/campo" },
            "nome":             { "$ref": "#/$defs/campo" },
            "cpf":              { "$ref": "#/$defs/campo" },
            "cnpj":             { "$ref": "#/$defs/campo" },
            "valor_total":      { "$ref": "#/$defs/campo" },
            "observacoes":      { "type": ["string","null"] }
          },
          "$defs": {
            "campo": {
              "type": ["object","null"],
              "additionalProperties": false,
              "required": ["valor","trecho_origem","confianca"],
              "properties": {
                "valor":         { "type": ["string","null"] },
                "trecho_origem": { "type": ["string","null"] },
                "confianca":     { "type": ["number","null"] }
              }
            }
          }
        }
        """)!;
}
