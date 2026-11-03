
namespace LabFlowAPI.Services.IA
{
	public class LhamaIAService : ILanguageModelService
	{
		private readonly LlamaService _llamaService;
		private readonly GroqService _groqService;

		public LhamaIAService(
			LlamaService llamaService,
			GroqService groqService)
		{
			_llamaService = llamaService;
			_groqService = groqService;
		}

		public async Task<string> GerarRespostaAsync(
			string mensagem,
			CancellationToken cancellationToken = default)
		{
			return await GerarRespostaAsync(
				mensagem, "llama", cancellationToken);
		}

		public async Task<string> GerarRespostaAsync(
			string mensagem,
			string provedor,
			CancellationToken cancellationToken = default)
		{
			if (string.IsNullOrWhiteSpace(mensagem))
				throw new ArgumentException(
					"A mensagem não pode estar vazia.");

			return provedor.Trim().ToLowerInvariant() switch
			{
				"llama" => await _llamaService.GerarRespostaAsync(
					mensagem, cancellationToken),

				"groq" => await _groqService.GerarRespostaAsync(
					mensagem, cancellationToken),

				_ => throw new ArgumentException(
					"Provedor inválido. Utilize llama ou groq.")
			};
		}
	}
}
