
using System.Net.Http.Json;
using System.Text.Json;

namespace LabFlowAPI.Services.IA
{
	public class LlamaService
	{
		private readonly HttpClient _httpClient;

		public LlamaService(HttpClient httpClient)
		{
			_httpClient = httpClient;
		}

		public async Task<string> GerarRespostaAsync(
			string mensagem,
			CancellationToken cancellationToken = default)
		{
			if (string.IsNullOrWhiteSpace(mensagem))
				throw new ArgumentException(
					"A mensagem não pode estar vazia."
				);

			var requisicao = new
			{
				model = "llama3.2",
				stream = false,
				messages = new[]
				{
					new
					{
						role = "system",
						content = """
                        Você é o motor de inteligência artificial da LHAMA IA.

                        Sua especialidade é processamento,
                        leitura, interpretação e extração de documentos.

                        REGRAS:
                        1. Não invente informações.
                        2. Não presuma dados ausentes.
                        3. Preserve os valores originais.
                        4. Identifique informações ilegíveis.
                        5. Informe inconsistências encontradas.
                        6. Responda sempre em português.
                        7. Diferencie informações extraídas de inferências.
                        """
					},
					new
					{
						role = "user",
						content = mensagem
					}
				}
			};

			using var resposta = await _httpClient.PostAsJsonAsync(
				"api/chat",
				requisicao,
				cancellationToken
			);

			if (!resposta.IsSuccessStatusCode)
			{
				var erro = await resposta.Content.ReadAsStringAsync(
					cancellationToken
				);

				throw new HttpRequestException(
					$"Erro ao comunicar com Ollama: {(int)resposta.StatusCode}. {erro}"
				);
			}

			var resultado = await resposta.Content
				.ReadFromJsonAsync<OllamaResponse>(
					cancellationToken: cancellationToken
				);

			var conteudo = resultado?.Message?.Content;

			if (string.IsNullOrWhiteSpace(conteudo))
			{
				throw new InvalidOperationException(
					"O Ollama retornou uma resposta vazia."
				);
			}

			return conteudo;
		}

		private sealed class OllamaResponse
		{
			public OllamaMessage? Message { get; set; }
		}

		private sealed class OllamaMessage
		{
			public string? Content { get; set; }
		}
	}
}
