using LabFlowAPI.DTO;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;
using LabFlowAPI.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LabFlowAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsuarioController : ControllerBase
{
    private readonly IUsuarioRepository _usuarioRepository;
    private readonly IHistoricoRepository _historicoRepository;

    public UsuarioController(
        IUsuarioRepository usuarioRepository,
        IHistoricoRepository historicoRepository)
    {
        _usuarioRepository = usuarioRepository;
        _historicoRepository = historicoRepository;
    }

    // POST: api/Usuario/registro
    [AllowAnonymous]
    [HttpPost("registro")]
    public IActionResult Registro(RegistroDTO dto)
    {
        try
        {
            var email = dto.Email!.Trim().ToLowerInvariant();

            if (_usuarioRepository.EmailExiste(email))
            {
                return Conflict("Este email já está cadastrado.");
            }

            // Todo cadastro novo entra como Funcionario.
            // Quem promove para Revisor/Administrador é um administrador.
            var novoUsuario = new Usuario
            {
                Nome = dto.Nome!.Trim(),
                Email = email,
                Cargo = dto.Cargo?.Trim(),
                ProvedorLogin = "Local",
                PerfilAcesso = Perfis.Funcionario,
                Ativo = true,
                DataCriacao = DateTime.Now
            };

            _usuarioRepository.Cadastrar(novoUsuario, dto.Senha!);
            _historicoRepository.Registrar(null, novoUsuario.IdUsuario, "Cadastro de usuário");

            return CreatedAtAction(nameof(GetPorId), new { id = novoUsuario.IdUsuario }, Mapear(novoUsuario));
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    // POST: api/Usuario/login
    [AllowAnonymous]
    [HttpPost("login")]
    public IActionResult Login(LoginDTO dto, [FromServices] IConfiguration configuration)
    {
        try
        {
            var email = dto.Email!.Trim().ToLowerInvariant();

            var usuario = _usuarioRepository.BuscarPorEmailESenha(email, dto.Senha!);

            // Mesma mensagem para qualquer falha, para não revelar se o email existe
            if (usuario == null)
            {
                return Unauthorized("Email ou senha inválidos.");
            }

            _historicoRepository.Registrar(null, usuario.IdUsuario, "Login");

            var (token, expiraEm) = GeradorToken.Gerar(usuario, configuration);

            return Ok(new LoginResponseDTO
            {
                Token = token,
                ExpiraEm = expiraEm,
                IdUsuario = usuario.IdUsuario,
                Nome = usuario.Nome,
                Email = usuario.Email,
                PerfilAcesso = usuario.PerfilAcesso
            });
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    // GET: api/Usuario/me
    [Authorize]
    [HttpGet("me")]
    public IActionResult GetMeuPerfil()
    {
        var idUsuario = User.GetIdUsuario();

        if (idUsuario == null)
        {
            return Unauthorized();
        }

        var usuario = _usuarioRepository.BuscarPorId(idUsuario.Value);

        return usuario == null ? NotFound("Usuário não encontrado.") : Ok(Mapear(usuario));
    }

    // GET: api/Usuario
    [Authorize(Roles = Perfis.Administrador)]
    [HttpGet]
    public IActionResult Get()
    {
        try
        {
            return Ok(_usuarioRepository.Listar().Select(Mapear));
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    // GET: api/Usuario/{id}
    [Authorize]
    [HttpGet("{id:int}")]
    public IActionResult GetPorId(int id)
    {
        // Cada um vê o próprio perfil; administradores veem qualquer um
        if (User.GetIdUsuario() != id && !User.IsInRole(Perfis.Administrador))
        {
            return Forbid();
        }

        var usuario = _usuarioRepository.BuscarPorId(id);

        return usuario == null ? NotFound("Usuário não encontrado.") : Ok(Mapear(usuario));
    }

    // PUT: api/Usuario/{id}/perfil
    [Authorize(Roles = Perfis.Administrador)]
    [HttpPut("{id:int}/perfil")]
    public IActionResult AlterarPerfil(int id, AlterarPerfilDTO dto)
    {
        if (!Perfis.Todos.Contains(dto.PerfilAcesso))
        {
            return BadRequest($"Perfil inválido. Use: {string.Join(", ", Perfis.Todos)}.");
        }

        var idLogado = User.GetIdUsuario();

        // Evita que o administrador tire o próprio acesso sem querer
        if (idLogado == id && dto.PerfilAcesso != Perfis.Administrador)
        {
            return BadRequest("Você não pode remover seu próprio perfil de administrador.");
        }

        try
        {
            return _usuarioRepository.AlterarPerfil(id, dto.PerfilAcesso!, idLogado)
                ? NoContent()
                : NotFound("Usuário não encontrado.");
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    // A senha nunca sai da API: a resposta usa o DTO, não a entidade
    private static UsuarioResponseDTO Mapear(Usuario u) => new()
    {
        IdUsuario = u.IdUsuario,
        Nome = u.Nome,
        Email = u.Email,
        Cargo = u.Cargo,
        PerfilAcesso = u.PerfilAcesso,
        Ativo = u.Ativo == true
    };
}
