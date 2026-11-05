CREATE DATABASE LabFlowDB;
GO

USE LabFlowDB
GO

CREATE TABLE Usuario(
IdUsuario INT IDENTITY(1,1) PRIMARY KEY,
Nome VARCHAR(250) NOT NULL,
Email VARCHAR(250) NOT NULL UNIQUE,
Senha VARCHAR(255) NOT NULL,
Cargo VARCHAR (80),
Perfil_Acesso VARCHAR(30) NOT NULL DEFAULT 'Funcionario'
);
GO

CREATE TABLE Documento(
IdDocumento INT IDENTITY(1,1) PRIMARY KEY,
IdUsuario INT NOT NULL,
Nome_Arquivo VARCHAR (255) NOT NULL,
Tipo_Documento VARCHAR (80),
Formato VARCHAR(10) NOT NULL,
Caminho_Arquivo VARCHAR(500) NOT NULL,
Data_Envio DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
Status_Arquivo VARCHAR(30) NOT NULL DEFAULT 'Processando',
Nivel_Confianca DECIMAL(5,2),
CONSTRAINT Documento_Usuario FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
CONSTRAINT CK_Documento_Status CHECK (status IN ('Processando','Aprovado','Revisao','Erro')),
CONSTRAINT CK_Documento_Confianca CHECK (Nivel_Confianca IS NULL OR Nivel_Confianca BETWEEN 0 AND 100)
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
CONSTRAINT CK_Documento_Confianca CHECK (Nivel_Confianca IS NULL OR Nivel_Confianca BETWEEN 0 AND 100)
);
GO

CREATE TABLE Validacao(
IdValidacao INT IDENTITY(1,1) PRIMARY KEY,
IdExtracao INT NOT NULL,
IdRevisor INT NULL,
Resultado VARCHAR(40) NOT NULL,
Observacoes VARCHAR(MAX),
Data_Validacao DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
CONSTRAINT _Validacao_Extracao FOREIGN KEY (IdExtracao) REFERENCES Extracao(IdExtracao),
CONSTRAINT FK_Validacao_Revisor FOREIGN KEY (IdRevisor) REFERENCES Usuario(IdUsuario),
CONSTRAINT CK_Validacao_Resultado CHECK (resultado IN ('Pendente', 'Aprovado', 'Correcao necessaria', 'Reprovado'))
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
CONSTRAINT CK_Integracao_Status CHECK (status IN ('Pendente', 'Enviado', 'Erro'))
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
CONSTRAINT Historico_Documento FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario),
);
GO