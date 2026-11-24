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
GO
