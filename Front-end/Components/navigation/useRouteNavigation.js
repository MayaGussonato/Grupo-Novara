
import { useMemo } from "react";
import { useRouter, usePathname } from "expo-router";

const rotas = {
  Login: "/login",
  Cadastro: "/cadastro",
  RecuperarSenha: "/recuperar-senha",
  Dashboard: "/Dashboard",
  Documento: "/atendimento",
  Integrar: "/integracoes",
  Importacao: "/Importacao",
  Analise: "/analise",
  Validacao: "/validacao",
  Dados: "/dados",
  Administracao: "/administracao",
  Perfil: "/Perfil",
  ProcessamentoInteligente: "/analise",
  CadastroAdmin: "/cadastroAdmin",
};

export default function useRouteNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  return useMemo(() => {
    function obterDestino(destino) {
      return rotas[destino] || destino;
    }

    return {
      navigate(destino, params) {
        const caminho = obterDestino(destino);

        if (params) {
          router.push({
            pathname: caminho,
            params,
          });
        } else {
          router.push(caminho);
        }
      },

      replace(destino, params) {
        const caminho = obterDestino(destino);

        if (params) {
          router.replace({
            pathname: caminho,
            params,
          });
        } else {
          router.replace(caminho);
        }
      },

      goBack() {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/login");
        }
      },

      isActive(destino) {
        return (
          pathname.toLowerCase() ===
          obterDestino(destino).toLowerCase()
        );
      },
    };
  }, [router, pathname]);
}
