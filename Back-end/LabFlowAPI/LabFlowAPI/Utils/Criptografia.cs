namespace LabFlowAPI.Utils;

public static class Criptografia
{
    public static string GerarHash(string senha)
    {
        return BCrypt.Net.BCrypt.HashPassword(senha);
    }

    public static bool CompararHash(string senhaForm, string senhaBanco)
    {
        try
        {
            return BCrypt.Net.BCrypt.Verify(senhaForm, senhaBanco);
        }
        catch (Exception)
        {
            // Hash gravado no banco em formato inválido: trata como senha incorreta
            return false;
        }
    }
}
