using System.Security.Cryptography;
using LabFlowAPI.DTO;
using LabFlowAPI.Interface;
using LabFlowAPI.Models;
using LabFlowAPI.Services.Processamento;
using LabFlowAPI.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;

namespace LabFlowAPI.Controllers;

[Authorize]
[Route("api/[controller]")]
[ApiController]
public class DocumentoController : ControllerBase
{
    private const long TamanhoMaximoBytes = 20 * 1024 * 1024;

    // Extensão do arquivo -> valor gravado em Documento.Formato (igual ao CHECK do banco)
    private static readonly Dictionary<string, string> FormatosPermitidos =
        new(StringComparer.OrdinalIgnoreCase)
        {
            [".pdf"] = "pdf",
            [".png"] = "png",
            [".jpg"] = "jpg",
            [".jpeg"] = "jpeg",
            [".tif"] = "tiff",
            [".tiff"] = "tiff",
            [".docx"] = "docx",
            [".xlsx"] = "xlsx",
            [".txt"] = "txt"
        };

    private static readonly string[] StatusValidos =
        { "Processando", "Aprovado", "Revisao", "Erro" };

    private readonly IDocumentoRepository _documentoRepository;
    private readonly IHistoricoRepository _historicoRepository;
    private readonly IProcessadorDocumento _processador;
    private readonly IWebHostEnvironment _environment;

    public DocumentoController(
        IDocumentoRepository documentoRepository,
        IHistoricoRepository historicoRepository,
        IProcessadorDocumento processador,
        IWebHostEnvironment environment)
    {
        _documentoRepository = documentoRepository;
        _historicoRepository = historicoRepository;
        _processador = processador;
        _environment = environment;
    }

    // POST: api/Documento  (upload)
    [HttpPost]
    [Consumes("multipart/form-data")]
    [RequestSizeLimit(25 * 1024 * 1024)]
    public async Task<IActionResult> Post([FromForm] DocumentoUploadDTO dto)
    {
        var idUsuario = User.GetIdUsuario();

        if (idUsuario == null)
        {
            return Unauthorized();
        }

        var arquivo = dto.Arquivo!;

        if (arquivo.Length == 0)
        {
            return BadRequest("O arquivo está vazio.");
        }

        if (arquivo.Length > TamanhoMaximoBytes)
        {
            return BadRequest("O arquivo deve ter no máximo 20 MB.");
        }

        var extensao = Path.GetExtension(arquivo.FileName);

        if (!FormatosPermitidos.TryGetValue(extensao, out var formato))
        {
            return BadRequest("Formato não permitido. Use: pdf, png, jpg, jpeg, tiff, docx, xlsx ou txt.");
        }

        // SHA-256 do conteúdo - impede enviar o mesmo arquivo duas vezes mesmo mudando nome
        string hash;

        await using (var leitura = arquivo.OpenReadStream())
        {
            hash = Convert.ToHexString(await SHA256.HashDataAsync(leitura)).ToLowerInvariant();
        }

        var idExistente = _documentoRepository.BuscarIdPorHash(hash);

        if (idExistente != null)
        {
            return Conflict($"Este arquivo já foi enviado (documento {idExistente}).");
        }

        // Os arquivos ficam em /Uploads (fora de wwwroot, portanto não ficam públicos).
        // O download passa por GET api/Documento/{id}/arquivo, que confere o acesso.
        var pasta = Path.Combine(_environment.ContentRootPath, "Uploads", "documentos");
        Directory.CreateDirectory(pasta);

        var nomeFisico = $"{Guid.NewGuid()}{extensao.ToLowerInvariant()}";
        var caminhoCompleto = Path.Combine(pasta, nomeFisico);

        await using (var destino = new FileStream(caminhoCompleto, FileMode.CreateNew))
        {
            await arquivo.CopyToAsync(destino);
        }

        var nomeOriginal = Path.GetFileName(arquivo.FileName);

        if (nomeOriginal.Length > 255)
        {
            nomeOriginal = nomeOriginal[..255];
        }

        var novoDocumento = new Documento
        {
            IdUsuario = idUsuario.Value,
            NomeArquivo = nomeOriginal,
            TipoDocumento = dto.TipoDocumento?.Trim(),
            Formato = formato,
            TamanhoBytes = arquivo.Length,
            HashArquivo = hash,
            CaminhoArquivo = $"documentos/{nomeFisico}",
            DataEnvio = DateTime.Now,
            StatusDocumento = "Processando"
        };

        try
        {
            _documentoRepository.Cadastrar(novoDocumento);
        }
        catch (Exception erro)
        {
            // Não deixa arquivo órfão no disco se o banco recusar o registro
            System.IO.File.Delete(caminhoCompleto);

            return BadRequest(erro.Message);
        }

        return CreatedAtAction(
            nameof(GetPorId),
            new { id = novoDocumento.IdDocumento },
            _documentoRepository.BuscarDetalhe(novoDocumento.IdDocumento));
    }

    // GET: api/Documento?status=Revisao&pagina=1&tamanho=20
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

        if (status != null && !StatusValidos.Contains(status))
        {
            return BadRequest($"Status inválido. Use: {string.Join(", ", StatusValidos)}.");
        }

        pagina = Math.Max(pagina, 1);
        tamanho = Math.Clamp(tamanho, 1, 100);

        try
        {
            // Funcionário vê só os próprios documentos
            int? filtroUsuario = User.PodeVerTodosDocumentos() ? null : idUsuario;

            return Ok(_documentoRepository.Listar(filtroUsuario, status, pagina, tamanho));
        }
        catch (Exception erro)
        {
            return BadRequest(erro.Message);
        }
    }

    // GET: api/Documento/{id}
    [HttpGet("{id:int}")]
    public IActionResult GetPorId(int id)
    {
        var documento = _documentoRepository.BuscarDetalhe(id);

        if (documento == null)
        {
            return NotFound("Documento não encontrado.");
        }

        return PodeAcessar(documento.IdUsuario) ? Ok(documento) : Forbid();
    }

    // GET: api/Documento/{id}/arquivo  (download protegido)
    [HttpGet("{id:int}/arquivo")]
    public IActionResult BaixarArquivo(int id)
    {
        var documento = _documentoRepository.BuscarPorId(id);

        if (documento == null)
        {
            return NotFound("Documento não encontrado.");
        }

        if (!PodeAcessar(documento.IdUsuario))
        {
            return Forbid();
        }

        var raiz = Path.GetFullPath(Path.Combine(_environment.ContentRootPath, "Uploads"))
                   + Path.DirectorySeparatorChar;

        var caminho = Path.GetFullPath(Path.Combine(
            _environment.ContentRootPath,
            "Uploads",
            documento.CaminhoArquivo.Replace('/', Path.DirectorySeparatorChar)));

        // Garante que o caminho gravado no banco não escapa da pasta Uploads
        if (!caminho.StartsWith(raiz, StringComparison.OrdinalIgnoreCase) ||
            !System.IO.File.Exists(caminho))
        {
            return NotFound("Arquivo físico não encontrado.");
        }

        new FileExtensionContentTypeProvider()
            .TryGetContentType(documento.NomeArquivo, out var tipoConteudo);

        return PhysicalFile(caminho, tipoConteudo ?? "application/octet-stream", documento.NomeArquivo);
    }

    // GET: api/Documento/{id}/historico
    [HttpGet("{id:int}/historico")]
    public IActionResult GetHistorico(int id)
    {
        var documento = _documentoRepository.BuscarPorId(id);

        if (documento == null)
        {
            return NotFound("Documento não encontrado.");
        }

        if (!PodeAcessar(documento.IdUsuario))
        {
            return Forbid();
        }

        return Ok(_historicoRepository.ListarPorDocumento(id));
    }

    // POST: api/Documento/{id}/processar  (fluxo da LHAMA IA)
    // Lê o arquivo, extrai os campos com IA, confere contra o original e grava a extração.
    [HttpPost("{id:int}/processar")]
    public async Task<IActionResult> Processar(int id, CancellationToken cancellationToken)
    {
        var idUsuario = User.GetIdUsuario();

        if (idUsuario == null)
        {
            return Unauthorized();
        }

        var documento = _documentoRepository.BuscarPorId(id);

        if (documento == null)
        {
            return NotFound("Documento não encontrado.");
        }

        if (!PodeAcessar(documento.IdUsuario))
        {
            return Forbid();
        }

        if (documento.StatusDocumento == "Aprovado")
        {
            return Conflict("Documento já aprovado: não é reprocessado.");
        }

        var caminho = CaminhoFisico(documento.CaminhoArquivo);

        if (caminho == null)
        {
            return NotFound("Arquivo físico não encontrado.");
        }

        try
        {
            var resultado = await _processador.ProcessarAsync(
                id, caminho, idUsuario.Value, cancellationToken);

            return Ok(resultado);
        }
        catch (ProcessamentoException erro)
        {
            return StatusCode(erro.CodigoHttp, new { erro = erro.Message });
        }
        catch (InvalidOperationException erro)
        {
            // Nenhum provedor de IA respondeu
            return StatusCode(503, new { erro = erro.Message });
        }
    }

    /// <summary>
    /// Resolve o caminho do arquivo garantindo que ele não escapa da pasta Uploads.
    /// Devolve null quando o arquivo não existe ou o caminho é suspeito.
    /// </summary>
    private string? CaminhoFisico(string caminhoRelativo)
    {
        var raiz = Path.GetFullPath(Path.Combine(_environment.ContentRootPath, "Uploads"))
                   + Path.DirectorySeparatorChar;

        var caminho = Path.GetFullPath(Path.Combine(
            _environment.ContentRootPath,
            "Uploads",
            caminhoRelativo.Replace('/', Path.DirectorySeparatorChar)));

        if (!caminho.StartsWith(raiz, StringComparison.OrdinalIgnoreCase) ||
            !System.IO.File.Exists(caminho))
        {
            return null;
        }

        return caminho;
    }

    // DELETE: api/Documento/{id}  (soft delete: some da API, histórico fica no banco)
    [HttpDelete("{id:int}")]
    public IActionResult Excluir(int id)
    {
        var documento = _documentoRepository.BuscarPorId(id);

        if (documento == null)
        {
            return NotFound("Documento não encontrado.");
        }

        if (!PodeAcessar(documento.IdUsuario))
        {
            return Forbid();
        }

        // Documento já aprovado pode ter sido enviado ao ERP: não se exclui
        if (documento.StatusDocumento == "Aprovado")
        {
            return Conflict("Documento aprovado não pode ser excluído.");
        }

        return _documentoRepository.Excluir(id, User.GetIdUsuario())
            ? NoContent()
            : NotFound("Documento não encontrado.");
    }

    private bool PodeAcessar(int idDonoDocumento)
    {
        return User.PodeVerTodosDocumentos() || User.GetIdUsuario() == idDonoDocumento;
    }
}
