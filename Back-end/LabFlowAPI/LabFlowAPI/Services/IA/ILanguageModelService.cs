
namespace LabFlowAPI.Services.IA
{
	public interface ILanguageModelService
	{
		Task<string> GerarRespostaAsync(
			string mensagem,
			CancellationToken cancellationToken = default
		);
		Task<string> GerarRespostaAsync(
	string mensagem,
	string provedor,
	CancellationToken cancellationToken = default
);
	}
}
