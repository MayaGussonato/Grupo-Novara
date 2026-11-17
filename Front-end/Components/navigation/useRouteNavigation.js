import { useMemo } from "react";
import { useRouter, usePathname } from "expo-router";

const rotas = {
  Login: "/login",
  Cadastro: "/cadastro",
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
        const pathnameDestino = obterDestino(destino);

        if (params) {
          router.push({
            pathname: pathnameDestino,
            params,
          });
        } else {
          router.push(pathnameDestino);
        }
      },

      replace(destino, params) {
        const pathnameDestino = obterDestino(destino);

        if (params) {
          router.replace({
            pathname: pathnameDestino,
            params,
          });
        } else {
          router.replace(pathnameDestino);
        }
      },

      goBack() {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/Dashboard");
        }
      },

      isActive(destino) {
        return pathname.toLowerCase() ===
          obterDestino(destino).toLowerCase();
      },
    };
  }, [router, pathname]);
}