IF COL_LENGTH('dbo.Documento', 'TamanhoBytes') IS NULL
BEGIN
    ALTER TABLE dbo.Documento
    ADD TamanhoBytes BIGINT NULL;
END;
GO

IF COL_LENGTH('dbo.Documento', 'HashArquivo') IS NULL
BEGIN
    ALTER TABLE dbo.Documento
    ADD HashArquivo VARCHAR(64) NULL;
END;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'Documento_HashArquivo'
      AND object_id = OBJECT_ID('dbo.Documento')
)
BEGIN
    CREATE UNIQUE INDEX UX_Documento_HashArquivo
    ON dbo.Documento(HashArquivo)
    WHERE HashArquivo IS NOT NULL;
END;
GO

IF COL_LENGTH('dbo.Usuario', 'Provedor_Login') IS NULL
    ALTER TABLE Usuario ADD Provedor_Login VARCHAR(30) NOT NULL CONSTRAINT DF_Usuario_Provedor DEFAULT 'Local';
GO

IF COL_LENGTH('dbo.Usuario', 'Ativo') IS NULL
    ALTER TABLE Usuario ADD Ativo BIT NOT NULL CONSTRAINT DF_Usuario_Ativo DEFAULT 1;
GO

IF COL_LENGTH('dbo.Usuario', 'Data_Criacao') IS NULL
    ALTER TABLE Usuario ADD Data_Criacao DATETIME2 NOT NULL CONSTRAINT DF_Usuario_DataCriacao DEFAULT SYSDATETIME();
GO

IF COL_LENGTH('dbo.Validacao', 'Dados_Corrigidos') IS NULL
    ALTER TABLE Validacao ADD Dados_Corrigidos NVARCHAR(MAX);
GO

IF COL_LENGTH('dbo.Documento', 'TamanhoBytes') IS NULL
    ALTER TABLE Documento ADD TamanhoBytes BIGINT;
GO

IF COL_LENGTH('dbo.Documento', 'HashArquivo') IS NULL
    ALTER TABLE Documento ADD HashArquivo VARCHAR(64);
GO
-- Soft delete de documento: o registro e o histórico continuam no banco,
-- a API apenas deixa de exibir o documento.
IF COL_LENGTH('dbo.Documento', 'Excluido') IS NULL
    ALTER TABLE Documento ADD Excluido BIT NOT NULL CONSTRAINT DF_Documento_Excluido DEFAULT 0;
GO

IF NOT EXISTS (
    SELECT 1
    FROM sys.indexes
    WHERE name = 'IX_Documento_Excluido'
      AND object_id = OBJECT_ID('dbo.Documento')
)
BEGIN
    CREATE INDEX IX_Documento_Excluido
    ON Documento(Excluido) INCLUDE (IdUsuario, Status_Arquivo);
END;
Go



/* add nova tabela de atendimento */
DROP TABLE IF EXISTS Atendimento;
GO

CREATE TABLE Atendimento (
    IdAtendimento     INT IDENTITY(1,1) NOT NULL,
    IdUsuario         INT            NOT NULL,   -- quem abriu
    IdResponsavel     INT            NULL,       -- quem cuida do atendimento
    IdDocumento       INT            NULL,       -- documento relacionado (opcional)
    Titulo            NVARCHAR(150)  NOT NULL,
    Descricao         NVARCHAR(4000) NOT NULL,
    Categoria         VARCHAR(30)    NOT NULL,
    Email             VARCHAR(254)   NOT NULL,   -- e-mail do funcionário (já cadastrado em Usuario)
    Prioridade        VARCHAR(10)    NOT NULL CONSTRAINT DF_Atendimento_Prioridade DEFAULT 'Media',
    StatusAtendimento VARCHAR(20)    NOT NULL CONSTRAINT DF_Atendimento_Status DEFAULT 'Aberto',
    DataAbertura      DATETIME2      NOT NULL CONSTRAINT DF_Atendimento_DataAbertura DEFAULT SYSDATETIME(),
    DataAtualizacao   DATETIME2      NULL,
    DataFechamento    DATETIME2      NULL,

    CONSTRAINT PK_Atendimento PRIMARY KEY (IdAtendimento),
    CONSTRAINT FK_Atendimento_Usuario     FOREIGN KEY (IdUsuario)     REFERENCES Usuario(IdUsuario),
    CONSTRAINT FK_Atendimento_Responsavel FOREIGN KEY (IdResponsavel) REFERENCES Usuario(IdUsuario),
    CONSTRAINT FK_Atendimento_Documento   FOREIGN KEY (IdDocumento)   REFERENCES Documento(IdDocumento),

    CONSTRAINT CK_Atendimento_Categoria  CHECK (Categoria IN ('DuvidasDocumentos','FalhasValidacao','AcessoLogin','Plataforma')),
    CONSTRAINT CK_Atendimento_Prioridade CHECK (Prioridade IN ('Baixa','Media','Alta')),
    CONSTRAINT CK_Atendimento_Status     CHECK (StatusAtendimento IN ('Aberto','EmAndamento','Resolvido','Fechado'))
);
GO

ALTER TABLE Atendimento ADD Protocolo AS
    ('ATD-' + CAST(YEAR(DataAbertura) AS VARCHAR(4)) + '-' + RIGHT('00000' + CAST(IdAtendimento AS VARCHAR(10)), 5))
    PERSISTED;
GO

CREATE UNIQUE INDEX UX_Atendimento_Protocolo ON Atendimento(Protocolo);
CREATE INDEX IX_Atendimento_Usuario_Status ON Atendimento(IdUsuario, StatusAtendimento);
CREATE INDEX IX_Atendimento_Documento ON Atendimento(IdDocumento);