
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text.Json;

namespace LabFlowAPI.Services.IA
{
	public class GroqService
	{
		private readonly HttpClient _httpClient;
		private readonly IConfiguration _configuration;

		public GroqService(
			HttpClient httpClient,
			IConfiguration configuration)
		{
			_httpClient = httpClient;
			_configuration = configuration;
		}

		public async Task<string> GerarRespostaAsync(
			string mensagem,
			CancellationToken cancellationToken = default)
		{
			if (string.IsNullOrWhiteSpace(mensagem))
				throw new ArgumentException(
					"A mensagem não pode estar vazia.");

			var apiKey = _configuration["IA:Groq:ApiKey"];

			if (string.IsNullOrWhiteSpace(apiKey))
				throw new InvalidOperationException(
					"A chave da API Groq não foi configurada.");

			var model = _configuration["IA:Groq:Model"]
				?? "openai/gpt-oss-120b";

			var requisicao = new
			{
				model,
				messages = new[]
				{
					new
					{
						role = "system",
						content = """
                        Você é o motor de inteligência artificial da LHAMA IA.
                        Sua especialidade é processamento e interpretação
                        de documentos.

                        REGRAS:
                        1. Não invente informações.
                        2. Não presuma dados ausentes.
                        3. Preserve os valores originais.
                        4. Identifique informações ilegíveis.
                        5. Informe inconsistências encontradas.
                        6. Responda em português.
                        7. Diferencie dados extraídos de inferências.
                        """
					},
					new
					{
						role = "user",
						content = mensagem
					}
				},
				temperature = 0.1
			};

			using var request = new HttpRequestMessage(
				HttpMethod.Post,
				"chat/completions");

			request.Headers.Authorization =
				new AuthenticationHeaderValue("Bearer", apiKey);

			request.Content = JsonContent.Create(requisicao);

			using var response = await _httpClient.SendAsync(
				request,
				cancellationToken);

			var conteudo = await response.Content.ReadAsStringAsync(
				cancellationToken);

			if (!response.IsSuccessStatusCode)
			{
				throw new HttpRequestException(
					$"Erro na API Groq: {(int)response.StatusCode}. {conteudo}");
			}

			using var json = JsonDocument.Parse(conteudo);

			var resultado = json.RootElement
				.GetProperty("choices")[0]
				.GetProperty("message")
				.GetProperty("content")
				.GetString();

			if (string.IsNullOrWhiteSpace(resultado))
				throw new InvalidOperationException(
					"A Groq retornou uma resposta vazia.");

			return resultado;
		}
	}
}
