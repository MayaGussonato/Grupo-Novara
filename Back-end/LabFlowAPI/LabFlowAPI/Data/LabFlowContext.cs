using System;
using System.Collections.Generic;
using LabFlowAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LabFlowAPI.Data;

public partial class LabFlowContext : DbContext
{
    public LabFlowContext()
    {
    }

    public LabFlowContext(DbContextOptions<LabFlowContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Documento> Documentos { get; set; }

    public virtual DbSet<Extracao> Extracaos { get; set; }

    /// <summary>Histórico de atividades (tabela Historico).</summary>
    public virtual DbSet<Historico> HistoricoAtividades { get; set; }

    public virtual DbSet<Integracao> Integracaos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<Validacao> Validacaos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // A connection string vem do appsettings.json (ConnectionStrings:LabFlow) ou da
        // variável de ambiente ConnectionStrings__LabFlow. Quando o Program.cs já registra
        // o contexto via AddDbContext, nada aqui é executado.
        if (!optionsBuilder.IsConfigured)
        {
            var connectionString =
                Environment.GetEnvironmentVariable("ConnectionStrings__LabFlow")
                ?? "Server=(localdb)\\MSSQLLocalDB;Database=LabFlowDB;Trusted_Connection=True;TrustServerCertificate=True";

            optionsBuilder.UseSqlServer(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Documento>(entity =>
        {
            entity.HasKey(e => e.IdDocumento).HasName("PK__Document__E520734716E9D2E1");

            entity.Property(e => e.DataEnvio).HasDefaultValueSql("(sysdatetime())");
            entity.Property(e => e.StatusDocumento).HasDefaultValue("Processando");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Documentos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Documento_Usuario");
        });

        modelBuilder.Entity<Extracao>(entity =>
        {
            entity.HasKey(e => e.IdExtracao).HasName("PK__Extracao__889E262CA6D6D6F8");

            entity.Property(e => e.DataExtracao).HasDefaultValueSql("(sysdatetime())");

            entity.HasOne(d => d.IdDocumentoNavigation).WithMany(p => p.Extracaos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Extracao_Documento");
        });

        modelBuilder.Entity<Historico>(entity =>
        {
            entity.HasKey(e => e.IdHistorico).HasName("PK__Historic__9CC7EBF3421C3F33");

            entity.Property(e => e.DataHora).HasDefaultValueSql("(sysdatetime())");

            entity.HasOne(d => d.IdDocumentoNavigation).WithMany(p => p.Historicos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Historico_Documento");

            entity.HasOne(d => d.IdUsuarioNavigation).WithMany(p => p.Historicos).HasConstraintName("Historico_Usuario");
        });

        modelBuilder.Entity<Integracao>(entity =>
        {
            entity.HasKey(e => e.IdIntegracao).HasName("PK__Integrac__E2B86378BAE6C253");

            entity.Property(e => e.StatusDocumento).HasDefaultValue("Pendente");

            entity.HasOne(d => d.IdExtracaoNavigation).WithMany(p => p.Integracaos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Integracao_Extracao");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.IdUsuario).HasName("PK__Usuario__5B65BF97E103B34F");

            entity.Property(e => e.PerfilAcesso).HasDefaultValue("Funcionario");
            entity.Property(e => e.ProvedorLogin).HasDefaultValue("Local");
            entity.Property(e => e.Ativo).HasDefaultValue(true);
            entity.Property(e => e.DataCriacao).HasDefaultValueSql("(sysdatetime())");
        });

        modelBuilder.Entity<Validacao>(entity =>
        {
            entity.HasKey(e => e.IdValidacao).HasName("PK__Validaca__9DFC1D2C22486ECF");

            entity.Property(e => e.DataValidacao).HasDefaultValueSql("(sysdatetime())");

            entity.HasOne(d => d.IdExtracaoNavigation).WithMany(p => p.Validacaos)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("_Validacao_Extracao");

            entity.HasOne(d => d.IdRevisorNavigation).WithMany(p => p.Validacaos).HasConstraintName("FK_Validacao_Revisor");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
