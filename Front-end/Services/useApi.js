import { useCallback, useEffect, useState } from "react";

/**
 * Hook simples para carregar dados da API com estados de carregamento e erro.
 *
 * const { dados, carregando, erro, recarregar } = useApi(listarDocumentos, []);
 *
 * A função é chamada ao montar e sempre que "recarregar" for chamado.
 * Erros viram mensagem em texto, pronta para mostrar na tela.
 */
export function useApi(funcao, dependencias = []) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [contador, setContador] = useState(0);

  const recarregar = useCallback(() => {
    setContador((valor) => valor + 1);
  }, []);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      setCarregando(true);
      setErro(null);

      try {
        const resultado = await funcao();

        if (ativo) {
          setDados(resultado);
        }
      } catch (falha) {
        if (ativo) {
          setErro(falha.message || "Não foi possível carregar os dados.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregar();

    return () => {
      ativo = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contador, ...dependencias]);

  return { dados, carregando, erro, recarregar };
}
