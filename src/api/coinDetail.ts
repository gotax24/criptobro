// api/coinDetail.ts
// Hook de TanStack Query para obtener el detalle de UNA criptomoneda por su id.
// Reutiliza el endpoint /coins/markets filtrando por ids para mantener
// la misma forma de respuesta (Coin) que el listado.

import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";
import type { Coin } from "../types";

// Recibe el id de la criptomoneda (ej. "bitcoin").
// Devuelve Promise<Coin> porque extraemos el primer elemento del array.
const fetchCoin = async (id: string): Promise<Coin> => {
  const { data } = await coingeckoApi.get<Coin[]>("/coins/markets", {
    params: { vs_currency: "usd", ids: id },
    // ids filtra la respuesta a la moneda solicitada. CoinGecko siempre
    // devuelve un array, aunque sea de un solo elemento.
  });

  return data[0];
  // Tomamos el primer elemento porque la API devuelve Coin[].
  // Si el id no existe, data[0] será undefined y la app debería manejarlo.
};

// id puede ser undefined mientras useParams aún no resuelve la ruta.
// enabled: !!id evita que la query se dispare con un id vacío.
export const useCoinDetail = (id: string | undefined) =>
  useQuery({
    queryKey: ["coin", id],
    // La key incluye el id para que cada criptomoneda tenga su propia caché.
    queryFn: () => fetchCoin(id!),
    // El operador ! (non-null assertion) le dice a TypeScript que confiamos en
    // que id está definido porque enabled lo garantiza.
    enabled: !!id,
  });
