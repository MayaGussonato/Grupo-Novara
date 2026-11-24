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
public class AtendimentoController : ControllerBase
{
    private static readonly string[] Categorias = { "DuvidasDocumentos", "FalhasValidacao", "AcessoLogin", "Plataforma" };
    private static readonly string[] Prioridades = { "Baixa", "Media", "Alta" };
    private static readonly string[] StatusValidos = { "Aberto", "EmAndamento", "Resolvido", "Fechado" };

    private readonly IAtendimentoRepository _atendimentoRepository;
    private readonly IDocumentoRepository _documentoRepository;
    private readonly IUsuarioRepository _usuarioRepository;

    public AtendimentoController(
        IAtendimentoRepository atendimentoRepository,
        IDocumentoRepository documentoRepository,
        IUsuarioRepository usuarioRepository)
    {
        _atendimentoRepository = atendimentoRepository;
        _documentoRepository = documentoRepository;
        _usuarioRepository = usuarioRepository;
    }

    // POST: api/Atendimento
    [HttpPost]
    public IActionResult Post([FromBody] AtendimentoCriarDTO dto)
    {
        var idUsuario = User.GetIdUsuario();

        if (idUsuario == null)
        {
            return Unauthorized();
        }

        var categoria = NormalizadorAtendimento.Categoria(dto.Categoria);

        if (categoria == null)
            return BadRequest($"Categoria inválida. Use: {string.Join(", ", Categorias)}.");

        var prioridade = NormalizadorAtendimento.Prioridade(
            string.IsNullOrWhiteSpace(dto.Prioridade) ? "Media" : dto.Prioridade);

        if (prioridade == null)
            return BadRequest($"Prioridade inválida. Use: {string.Join(", ", Prioridades)}.");

        // E-mail digitado pelo funcionário: precisa ser válido e já estar cadastrado
        var email = dto.Email.Trim().ToLowerInvariant();

        if (!EmailValido(email))
            return BadRequest("E-mail inválido.");

        if (!_usuarioRepository.EmailExiste(email))
            return BadRequest("Este e-mail não está cadastrado.");

        // O Swagger preenche 0 por padrão: 0 (ou negativo) significa "sem documento"
        int? idDocumento = dto.IdDocumento is > 0 ? dto.IdDocumento : null;

        if (idDocumento != null)
        {
            var documento = _documentoRepository.BuscarPorId(idDocumento.Value);

            if (documento == null)
                return BadRequest("Documento relacionado não encontrado.");

            if (!(User.PodeVerTodosDocumentos() || documento.IdUsuario == idUsuario))
                return BadRequest("Você não tem acesso a este documento.");
        }

        var atendimento = new Atendimento
        {
            IdUsuario = idUsuario.Value,
            IdResponsavel = idUsuario.Value,
            IdDocumento = idDocumento,
            Titulo = dto.Titulo.Trim(),
            Descricao = dto.Descricao.Trim(),
            Categoria = categoria,
            Email = email,
            Prioridade = prioridade,
            StatusAtendimento = "Aberto",
            DataAbertura = DateTime.Now
        };

        try
        {
            _atendimentoRepository.Cadastrar(atendimento);
        }
        catch (Exception erro)
        {
            // A InnerException traz o motivo real do banco (FK, coluna calculada, CHECK...)
            return BadRequest(erro.InnerException?.Message ?? erro.Message);
        }

        return CreatedAtAction(
            nameof(GetPorId),
            new { id = atendimento.IdAtendimento },
            _atendimentoRepository.BuscarDetalhe(atendimento.IdAtendimento));
    }

    // GET: api/Atendimento?status=Aberto&pagina=1&tamanho=20
    [HttpGet]
    public IActionResult Get(
        [FromQuery] string? status,
        [FromQuery] int pagina = 1,
        [FromQuery] int tamanho = 20)
    {
        var idUsuario = User.GetIdUsuario();

        if (idUsuario == null)
        {
            return Unauthorized();
        }

        string? statusFiltro = null;

        if (!string.IsNullOrWhiteSpace(status))
        {
            statusFiltro = NormalizadorAtendimento.Status(status);

            if (statusFiltro == null)
            {
                return BadRequest($"Status inválido. Use: {string.Join(", ", StatusValidos)}.");
            }
        }

        pagina = Math.Max(pagina, 1);
        tamanho = Math.Clamp(tamanho, 1, 100);

        int? filtroUsuario = User.PodeVerTodosDocumentos() ? null : idUsuario;
        var (itens, total) = _atendimentoRepository.Listar(filtroUsuario, statusFiltro, pagina, tamanho);

        return Ok(new { total, pagina, tamanho, itens });
    }

    // GET: api/Atendimento/{id}
    [HttpGet("{id:int}")]
    public IActionResult GetPorId(int id)
    {
        var atendimento = _atendimentoRepository.BuscarDetalhe(id);

        if (atendimento == null)
        {
            return NotFound("Atendimento não encontrado.");
        }

        return PodeAcessar(atendimento.IdUsuario, atendimento.IdResponsavel)
            ? Ok(atendimento)
            : Forbid();
    }

    // PUT: api/Atendimento/{id}/status
    [HttpPut("{id:int}/status")]
    public IActionResult AtualizarStatus(int id, [FromBody] AtendimentoStatusDTO dto)
    {
        var status = NormalizadorAtendimento.Status(dto.Status);

        if (status == null)
        {
            return BadRequest($"Status inválido. Use: {string.Join(", ", StatusValidos)}.");
        }

        var atendimento = _atendimentoRepository.BuscarPorId(id);

        if (atendimento == null)
        {
            return NotFound("Atendimento não encontrado.");
        }

        if (!PodeAcessar(atendimento.IdUsuario, atendimento.IdResponsavel))
        {
            return Forbid();
        }

        _atendimentoRepository.AtualizarStatus(id, status);

        return Ok(_atendimentoRepository.BuscarDetalhe(id));
    }

    private bool PodeAcessar(int idDono, int? idResponsavel)
    {
        var idLogado = User.GetIdUsuario();

        return User.PodeVerTodosDocumentos() || idLogado == idDono || idLogado == idResponsavel;
    }

    private static bool EmailValido(string email)
    {
        try
        {
            return new System.Net.Mail.MailAddress(email).Address == email;
        }
        catch
        {
            return false;
        }
    }
}