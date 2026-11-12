import { useMemo } from "react";
import { useRouter } from "expo-router";

const rotas = {
  Login: "/login",
  Cadastro: "/cadastro",
  Dashboard: "/dashboard",
  Importacao: "/importacao",
  Analise: "/analise",
  Validacao: "/validacao",
  Dados: "/dados",
  Administracao: "/administracao",
  Perfil: "/perfil",

  ProcessamentoInteligente: "/analise",
};

export default function useRouteNavigation() {
  const router = useRouter();

  return useMemo(() => {
    function obterDestino(destino) {
      return rotas[destino] || destino;
    }

    return {
      navigate(destino, params) {
        const pathname = obterDestino(destino);

        if (params) {
          router.push({
            pathname,
            params,
          });
        } else {
          router.push(pathname);
        }
      },

      replace(destino, params) {
        const pathname = obterDestino(destino);

        if (params) {
          router.replace({
            pathname,
            params,
          });
        } else {
          router.replace(pathname);
        }
      },

      goBack() {
        if (router.canGoBack()) {
          router.back();
        } else {
          router.replace("/dashboard");
        }
      },
    };
  }, [router]);
}