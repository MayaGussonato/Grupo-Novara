using System.Text.Json;
using LabFlowAPI.DTO;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;
using LabFlowAPI.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LabFlowAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ExtracaoController : ControllerBase
{
    private readonly IExtracaoRepository _extracaoRepository;
    private readonly IDocumentoRepository _documentoRepository;

    public ExtracaoController(
        IExtracaoRepository extracaoRepository,
        IDocumentoRepository documentoRepository)
    {
        _extracaoRepository = extracaoRepository;
        _documentoRepository = documentoRepository;
    }

    // POST: api/Extracao
    // Chamado pelo processo de OCR/IA depois de ler o documento.
    [HttpPost]
    public IActionResult Post(ExtracaoCreateDTO dto)
    {
        var idUsuario = User.GetIdUsuario();

        if (idUsuario == null)
        {
            return Unauthorized();
        }

        var documento = _documentoRepository.BuscarPorId(dto.IdDocumento!.Value);

        if (documento == null)
        {
            return NotFound("Documento não encontrado.");
        }

        if (!PodeAcessar(documento.IdUsuario))
        {
            return Forbid();
        }

        string? json = null;

        if (dto.DadosEstruturados is { ValueKind: not (JsonValueKind.Undefined or JsonValueKind.Null) } dados)
        {
            json = dados.GetRawText();
        }

        var novaExtracao = new Extracao
        {
            IdDocumento = documento.IdDocumento,
            Tecnologia = dto.Tecnologia!.Trim(),
            TextoExtraido = dto.TextoExtraido,
            DadosEstruturados = json,
            NivelConfianca = dto.NivelConfianca,
            DataExtracao = DateTime.Now
        };

        try
        {
            _extracaoRepository.Cadastrar(novaExtracao, idUsuario.Value);

            return CreatedAtAction(
                nameof(GetPorId),
                new { id = novaExtracao.IdExtracao },
                Mapear(novaExtracao));
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    // GET: api/Extracao/{id}
    [HttpGet("{id:int}")]
    public IActionResult GetPorId(int id)
    {
        var extracao = _extracaoRepository.BuscarPorId(id);

        if (extracao == null)
        {
            return NotFound("Extração não encontrada.");
        }

        var documento = _documentoRepository.BuscarPorId(extracao.IdDocumento);

        if (documento == null || !PodeAcessar(documento.IdUsuario))
        {
            return Forbid();
        }

        return Ok(Mapear(extracao));
    }

    // GET: api/Extracao/documento/{idDocumento}
    [HttpGet("documento/{idDocumento:int}")]
    public IActionResult GetPorDocumento(int idDocumento)
    {
        var documento = _documentoRepository.BuscarPorId(idDocumento);

        if (documento == null)
        {
            return NotFound("Documento não encontrado.");
        }

        if (!PodeAcessar(documento.IdUsuario))
        {
            return Forbid();
        }

        return Ok(_extracaoRepository.ListarPorDocumento(idDocumento).Select(Mapear));
    }

    private bool PodeAcessar(int idDonoDocumento)
    {
        return User.PodeVerTodosDocumentos() || User.GetIdUsuario() == idDonoDocumento;
    }

    private static ExtracaoResponseDTO Mapear(Extracao e)
    {
        JsonElement? dados = null;

        if (!string.IsNullOrWhiteSpace(e.DadosEstruturados))
        {
            using var json = JsonDocument.Parse(e.DadosEstruturados);
            dados = json.RootElement.Clone();
        }

        return new ExtracaoResponseDTO
        {
            IdExtracao = e.IdExtracao,
            IdDocumento = e.IdDocumento,
            Tecnologia = e.Tecnologia,
            TextoExtraido = e.TextoExtraido,
            DadosEstruturados = dados,
            NivelConfianca = e.NivelConfianca,
            DataExtracao = e.DataExtracao
        };
    }
}
