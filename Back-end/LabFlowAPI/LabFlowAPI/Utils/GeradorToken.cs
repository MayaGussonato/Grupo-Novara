using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using LabFlowAPI.Models;
using Microsoft.IdentityModel.Tokens;

namespace LabFlowAPI.Utils;

public static class GeradorToken
{
    public const string Emissor = "api_labflow";
    public const string Destinatario = "api_labflow";

    public static (string Token, DateTime ExpiraEm) Gerar(Usuario usuario, IConfiguration configuration)
    {
        // Nomes curtos de claim (sub, role...) para não depender de mapeamento automático
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.IdUsuario.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
            new Claim("name", usuario.Nome),
            new Claim("role", usuario.PerfilAcesso)
        };

        var chave = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]!));
        var credenciais = new SigningCredentials(chave, SecurityAlgorithms.HmacSha256);

        var horas = int.TryParse(configuration["Jwt:ExpiraHoras"], out var h) ? h : 2;
        var expiraEm = DateTime.UtcNow.AddHours(horas);

        var token = new JwtSecurityToken(
            issuer: Emissor,
            audience: Destinatario,
            claims: claims,
            expires: expiraEm,
            signingCredentials: credenciais
        );

        return (new JwtSecurityTokenHandler().WriteToken(token), expiraEm);
    }
}
