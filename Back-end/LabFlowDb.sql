CREATE DATABASE LabFlowDB;
GO

USE LabFlowDB
GO


CREATE TABLE Usuario(
IdUsuario INT IDENTITY(1,1) PRIMARY KEY,
Nome VARCHAR(250) NOT NULL,
Email VARCHAR(250) NOT NULL UNIQUE,
Senha VARCHAR(255) NOT NULL,                -- hash BCrypt
Cargo VARCHAR(80),
Perfil_Acesso VARCHAR(30) NOT NULL DEFAULT 'Funcionario',
Provedor_Login VARCHAR(30) NOT NULL DEFAULT 'Local',
Ativo BIT NOT NULL DEFAULT 1,
Data_Criacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
CONSTRAINT CK_Usuario_Perfil CHECK (Perfil_Acesso IN ('Administrador', 'Revisor', 'Funcionario'))
);
GO

CREATE TABLE Documento(
IdDocumento INT IDENTITY(1,1) PRIMARY KEY,
IdUsuario INT NOT NULL,
Nome_Arquivo VARCHAR(255) NOT NULL,
Tipo_Documento VARCHAR(80),
Formato VARCHAR(10) NOT NULL,
Caminho_Arquivo VARCHAR(500) NOT NULL,
Data_Envio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
Status_Arquivo VARCHAR(30) NOT NULL DEFAULT 'Processando',
Nivel_Confianca DECIMAL(5,2),
TamanhoBytes BIGINT,
HashArquivo VARCHAR(64),                    -- SHA-256 do conteúdo
CONSTRAINT Documento_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
CONSTRAINT CK_Documento_Status CHECK (Status_Arquivo IN ('Processando', 'Aprovado', 'Revisao', 'Erro')),
CONSTRAINT CK_Documento_Confianca CHECK (Nivel_Confianca IS NULL OR Nivel_Confianca BETWEEN 0 AND 100),
CONSTRAINT CK_Documento_Formato CHECK (Formato IN ('pdf', 'png', 'jpg', 'jpeg', 'tiff', 'docx', 'xlsx', 'txt'))
);

GO

CREATE TABLE Extracao(
IdExtracao INT IDENTITY(1,1) PRIMARY KEY,
IdDocumento INT NOT NULL,
Tecnologia VARCHAR(100) NOT NULL,
Texto_Extraido VARCHAR(MAX),
Dados_Estruturados NVARCHAR(MAX),
Nivel_Confianca DECIMAL(5,2),
Data_Extracao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
CONSTRAINT Extracao_Documento FOREIGN KEY (IdDocumento) REFERENCES Documento(IdDocumento),
CONSTRAINT CK_Extracao_Confianca CHECK (Nivel_Confianca IS NULL OR Nivel_Confianca BETWEEN 0 AND 100)
);
GO


CREATE TABLE Validacao(
IdValidacao INT IDENTITY(1,1) PRIMARY KEY,
IdExtracao INT NOT NULL,
IdRevisor INT NULL,
Resultado VARCHAR(40) NOT NULL,
Observacoes VARCHAR(MAX),
Dados_Corrigidos NVARCHAR(MAX),             -- JSON ajustado pelo revisor
Data_Validacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
CONSTRAINT _Validacao_Extracao FOREIGN KEY (IdExtracao) REFERENCES Extracao(IdExtracao),
CONSTRAINT FK_Validacao_Revisor FOREIGN KEY (IdRevisor) REFERENCES Usuario(IdUsuario),
CONSTRAINT CK_Validacao_Resultado CHECK (Resultado IN ('Pendente', 'Aprovado', 'Correcao necessaria', 'Reprovado'))
);
GO


CREATE TABLE Integracao(
IdIntegracao INT IDENTITY(1,1) PRIMARY KEY,
IdExtracao INT NOT NULL,
Sistema_Destino VARCHAR(100) NOT NULL,
Status_Arquivo VARCHAR(30) NOT NULL DEFAULT 'Pendente',
Mensagem_Retorno VARCHAR(MAX),
Data_Envio DATETIME2,
CONSTRAINT Integracao_Extracao FOREIGN KEY (IdExtracao) REFERENCES Extracao(IdExtracao),
CONSTRAINT CK_Integracao_Status CHECK (Status_Arquivo IN ('Pendente', 'Enviado', 'Erro'))
);
GO

CREATE TABLE Historico(
IdHistorico INT IDENTITY(1,1) PRIMARY KEY,
IdDocumento INT NOT NULL,
IdUsuario INT NULL,
Acao VARCHAR(100) NOT NULL,
Detalhes VARCHAR(MAX),
Data_hora DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
CONSTRAINT Historico_Documento FOREIGN KEY (IdDocumento) REFERENCES Documento(IdDocumento),
CONSTRAINT Historico_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario)
);
GO




-- Historico precisa de IdDocumento NOT NULL; a constraint duplicada do script antigo é corrigida
IF EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'Historico_Documento' AND object_id = OBJECT_ID('dbo.Historico'))
   AND NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'Historico_Usuario' AND object_id = OBJECT_ID('dbo.Historico'))
BEGIN
    ALTER TABLE Historico DROP CONSTRAINT Historico_Documento;
    ALTER TABLE Historico ADD CONSTRAINT Historico_Documento FOREIGN KEY (IdDocumento) REFERENCES Documento(IdDocumento);
    ALTER TABLE Historico ADD CONSTRAINT Historico_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario);
END
GO

-- ------------------------------------------------------------
-- Índices de apoio
-- ------------------------------------------------------------
IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Documento_Status' AND object_id = OBJECT_ID('dbo.Documento'))
    CREATE INDEX IX_Documento_Status ON Documento(Status_Arquivo, Data_Envio DESC);
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Documento_HashArquivo' AND object_id = OBJECT_ID('dbo.Documento'))
    CREATE INDEX IX_Documento_HashArquivo ON Documento(HashArquivo);
GO

IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE name = 'IX_Historico_IdDocumento' AND object_id = OBJECT_ID('dbo.Historico'))
    CREATE INDEX IX_Historico_IdDocumento ON Historico(IdDocumento, Data_hora);
GO

PRINT 'LabFlowDB pronto.';
GO

select * from Documento 


UPDATE Usuario
SET Perfil_Acesso = 'Administrador'
WHERE Email = 'felipeteste@example.com';