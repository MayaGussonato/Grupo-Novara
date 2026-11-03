
using LabFlowAPI.Services.IA;
using Microsoft.AspNetCore.Mvc;

namespace LabFlowAPI.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class IAController : ControllerBase
	{
		private readonly ILanguageModelService _iaService;

		public IAController(ILanguageModelService iaService)
		{
			_iaService = iaService;
		}

		[HttpPost("gerar-resposta")]
		public async Task<IActionResult> GerarResposta(
			[FromBody] SolicitacaoIA request,
			CancellationToken cancellationToken)
		{
			if (request == null ||
				string.IsNullOrWhiteSpace(request.Mensagem))
			{
				return BadRequest("Informe uma mensagem.");
			}

			try
			{
				var resposta = await _iaService.GerarRespostaAsync(
					request.Mensagem,
					request.Provedor,
					cancellationToken);

				return Ok(new
				{
					provedor = request.Provedor,
					resposta
				});
			}
			catch (ArgumentException ex)
			{
				return BadRequest(new { erro = ex.Message });
			}
			catch (HttpRequestException ex)
			{
				return StatusCode(502, new { erro = ex.Message });
			}
			catch (InvalidOperationException ex)
			{
				return StatusCode(503, new { erro = ex.Message });
			}
		}
	}

	public class SolicitacaoIA
	{
		public string Mensagem { get; set; } = string.Empty;
		public string Provedor { get; set; } = "llama";
	}
}
