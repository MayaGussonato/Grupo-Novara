using System.Text.Json;
using LabFlowAPI.DTO;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;
using LabFlowAPI.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LabFlowAPI.Controllers;

[Authorize(Roles = Perfis.RevisorOuAdmin)]
[Route("api/[controller]")]
[ApiController]
public class ValidacaoController : ControllerBase
{
    private static readonly string[] ResultadosDecisao =
        { "Aprovado", "Correcao necessaria", "Reprovado" };

    private readonly IValidacaoRepository _validacaoRepository;

    public ValidacaoController(IValidacaoRepository validacaoRepository)
    {
        _validacaoRepository = validacaoRepository;
    }

    // GET: api/Validacao/pendentes  (fila de revisão)
    [HttpGet("pendentes")]
    public IActionResult GetPendentes()
    {
        try
        {
            return Ok(_validacaoRepository.ListarPendentes());
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    // GET: api/Validacao/{id}
    [HttpGet("{id:int}")]
    public IActionResult GetPorId(int id)
    {
        var validacao = _validacaoRepository.BuscarPorId(id);

        return validacao == null
            ? NotFound("Validação não encontrada.")
            : Ok(Mapear(validacao));
    }

    // PUT: api/Validacao/{id}  (decisão do revisor)
    [HttpPut("{id:int}")]
    public IActionResult Put(int id, ValidacaoDecisaoDTO dto)
    {
        var idRevisor = User.GetIdUsuario();

        if (idRevisor == null)
        {
            return Unauthorized();
        }

        if (!ResultadosDecisao.Contains(dto.Resultado))
        {
            return BadRequest($"Resultado inválido. Use: {string.Join(", ", ResultadosDecisao)}.");
        }

        if (dto.Resultado != "Aprovado" && string.IsNullOrWhiteSpace(dto.Observacoes))
        {
            return BadRequest("Informe as observações para correção ou reprovação.");
        }

        var existente = _validacaoRepository.BuscarPorId(id);

        if (existente == null)
        {
            return NotFound("Validação não encontrada.");
        }

        if (existente.Resultado != "Pendente")
        {
            return Conflict("Esta validação já foi concluída.");
        }

        string? jsonCorrigido = null;

        if (dto.DadosCorrigidos is { ValueKind: not (JsonValueKind.Undefined or JsonValueKind.Null) } dados)
        {
            jsonCorrigido = dados.GetRawText();
        }

        try
        {
            var validacao = _validacaoRepository.Decidir(
                id,
                idRevisor.Value,
                dto.Resultado!,
                dto.Observacoes?.Trim(),
                jsonCorrigido);

            return Ok(Mapear(validacao));
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    private static ValidacaoResponseDTO Mapear(Validacao v)
    {
        JsonElement? corrigidos = null;

        if (!string.IsNullOrWhiteSpace(v.DadosCorrigidos))
        {
            using var json = JsonDocument.Parse(v.DadosCorrigidos);
            corrigidos = json.RootElement.Clone();
        }

        return new ValidacaoResponseDTO
        {
            IdValidacao = v.IdValidacao,
            IdExtracao = v.IdExtracao,
            IdRevisor = v.IdRevisor,
            Resultado = v.Resultado,
            Observacoes = v.Observacoes,
            DadosCorrigidos = corrigidos,
            DataValidacao = v.DataValidacao
        };
    }
}
