namespace LabFlowAPI.Utils;

/// <summary>
/// Validações determinísticas de campos brasileiros.
/// Não usam IA de propósito: dígito verificador é aritmética e precisa de resposta exata.
/// </summary>
public static class ValidadorDocumentos
{
    /// <summary>Remove tudo que não é dígito.</summary>
    public static string SomenteDigitos(string? valor)
        => new((valor ?? string.Empty).Where(char.IsDigit).ToArray());

    /// <summary>True se o CPF tem 11 dígitos e o dígito verificador confere.</summary>
    public static bool CpfValido(string? cpf)
    {
        var digitos = SomenteDigitos(cpf);

        if (digitos.Length != 11)
        {
            return false;
        }

        // Sequências repetidas (111.111.111-11) passam no cálculo, mas não são válidas
        if (digitos.Distinct().Count() == 1)
        {
            return false;
        }

        return DigitoVerificadorConfere(digitos, quantidadeDigitos: 9)
            && DigitoVerificadorConfere(digitos, quantidadeDigitos: 10);
    }

    /// <summary>Formata um CPF válido como 000.000.000-00; devolve null se for inválido.</summary>
    public static string? FormatarCpf(string? cpf)
    {
        if (!CpfValido(cpf))
        {
            return null;
        }

        var d = SomenteDigitos(cpf);

        return $"{d[..3]}.{d[3..6]}.{d[6..9]}-{d[9..]}";
    }

    /// <summary>True se o CNPJ tem 14 dígitos e o dígito verificador confere.</summary>
    public static bool CnpjValido(string? cnpj)
    {
        var digitos = SomenteDigitos(cnpj);

        if (digitos.Length != 14 || digitos.Distinct().Count() == 1)
        {
            return false;
        }

        return DigitoVerificadorConfere(digitos, quantidadeDigitos: 12)
            && DigitoVerificadorConfere(digitos, quantidadeDigitos: 13);
    }

    /// <summary>Formata um CNPJ válido como 00.000.000/0000-00; devolve null se for inválido.</summary>
    public static string? FormatarCnpj(string? cnpj)
    {
        if (!CnpjValido(cnpj))
        {
            return null;
        }

        var d = SomenteDigitos(cnpj);

        return $"{d[..2]}.{d[2..5]}.{d[5..8]}/{d[8..12]}-{d[12..]}";
    }

    /// <summary>
    /// Calcula o dígito verificador e compara com o dígito que está no documento.
    ///
    /// CPF: 9 dígitos → pesos 10..2; 10 dígitos → pesos 11..2.
    /// CNPJ: 12 dígitos → pesos 5,4,3,2,9,8,7,6,5,4,3,2;
    ///       13 dígitos → pesos 6,5,4,3,2,9,8,7,6,5,4,3,2.
    ///
    /// Ou seja: começa no dígito seguinte ao primeiro do bloco e, a cada posição,
    /// o peso diminui — voltando para 9 quando chega a 1.
    /// </summary>
    private static bool DigitoVerificadorConfere(string digitos, int quantidadeDigitos)
    {
        var soma = 0;

        // CPF: primeiro peso = quantidade + 1 (10 ou 11).
        // CNPJ: primeiro peso = quantidade - 7 (5 para 12 dígitos, 6 para 13).
        var peso = quantidadeDigitos <= 10
            ? quantidadeDigitos + 1
            : quantidadeDigitos - 7;

        for (var i = 0; i < quantidadeDigitos; i++)
        {
            soma += (digitos[i] - '0') * peso;

            peso--;

            if (peso < 2)
            {
                peso = 9;
            }
        }

        var resto = soma % 11;
        var digitoCalculado = resto < 2 ? 0 : 11 - resto;

        return digitoCalculado == (digitos[quantidadeDigitos] - '0');
    }
}
