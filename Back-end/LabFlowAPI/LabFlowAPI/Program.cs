using System.Text;
using LabFlowAPI.Data;
using LabFlowAPI.Interface;
using LabFlowAPI.Repositories;
using LabFlowAPI.Utils;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// ---------- Banco de dados ----------
// A connection string fica no appsettings.json (ConnectionStrings:LabFlow) e não no código.
var connectionString = builder.Configuration.GetConnectionString("LabFlow")
    ?? throw new InvalidOperationException("Connection string 'LabFlow' não configurada em appsettings.json.");

builder.Services.AddDbContext<LabFlowContext>(options => options.UseSqlServer(connectionString));

// ---------- Repositórios ----------
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IDocumentoRepository, DocumentoRepository>();
builder.Services.AddScoped<IExtracaoRepository, ExtracaoRepository>();
builder.Services.AddScoped<IValidacaoRepository, ValidacaoRepository>();
builder.Services.AddScoped<IHistoricoRepository, HistoricoRepository>();

// ---------- Autenticação JWT ----------
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("Jwt:Key não configurada em appsettings.json.");

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Sem isso, o handler mapeia "role" -> ClaimTypes.Role e "sub" -> NameIdentifier,
        // e o IsInRole/Roles quebra: o token traz "role", mas a validação procura a URI longa.
        options.MapInboundClaims = false;

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = GeradorToken.Emissor,
            ValidateAudience = true,
            ValidAudience = GeradorToken.Destinatario,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(2),
            // Mantém as claims com os nomes do token (sub, role, name) em vez de remapeá-las
            NameClaimType = "name",
            RoleClaimType = "role"
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();

// ---------- OpenAPI / Swagger ----------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "LabFlow API", Version = "v1" });

    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Cole apenas o token retornado por api/Usuario/login."
    });

    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("Bearer", document)] = new List<string>()
    });
});

// ---------- CORS (app mobile / Expo) ----------
const string PoliticaCors = "LabFlowCors";

builder.Services.AddCors(options =>
{
    options.AddPolicy(PoliticaCors, policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseHsts();
}

app.UseCors(PoliticaCors);
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
