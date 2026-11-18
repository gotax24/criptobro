// api/coinDetail.js
// Hook de TanStack Query para obtener el detalle de UNA criptomoneda por su id.
// Reutiliza el endpoint /coins/markets filtrando por ids para mantener
// la misma forma de respuesta (la de una criptomoneda) que el listado.

import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";

// Recibe el id de la criptomoneda (ej. "bitcoin").
// Devuelve un único objeto porque tomamos el primer elemento del array.
const fetchCoin = async (id) => {
  const { data } = await coingeckoApi.get("/coins/markets", {
    params: { vs_currency: "usd", ids: id },
    // ids filtra la respuesta a la moneda solicitada. CoinGecko siempre
    // devuelve un array, aunque sea de un solo elemento.
  });

  if (!data || data.length === 0) {
    throw new Error(`No se encontró la criptomoneda "${id}".`);
  }

  return data[0];
};

// id puede ser undefined mientras useParams aún no resuelve la ruta.
// enabled: !!id evita que la query se dispare con un id vacío.
export const useCoinDetail = (id) =>
  useQuery({
    queryKey: ["coin", id],
    // La key incluye el id para que cada criptomoneda tenga su propia caché.
    queryFn: () => fetchCoin(id),
    // enabled garantiza que id existe antes de que se ejecute fetchCoin.
    enabled: !!id,
  });
