// api/coinHistory.js
// Hook de TanStack Query para obtener el historial de precios de una criptomoneda.
// CoinGecko devuelve un array de tuplas [timestamp, price]; lo transformamos
// a un array de objetos { timestamp, price } para que sea más fácil de consumir.

import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";

// Recibe el id de la moneda y el rango de días ("1", "7", "30", "365").
// La respuesta cruda de CoinGecko para /market_chart tiene la forma
// { prices: [[timestamp_ms, price_usd], ...] }.
const fetchHistory = async (id, days) => {
  const { data } = await coingeckoApi.get(
    `/coins/${id}/market_chart`,
    {
      params: { vs_currency: "usd", days },
    },
  );

  return data.prices.map(([ts, price]) => ({ timestamp: ts, price }));
  // Destructuramos cada tupla en ts y price y devolvemos un objeto { timestamp, price }.
};

// El hook se invalida automáticamente cuando cambia id o days gracias a queryKey.
export const useCoinHistory = (id, days) =>
  useQuery({
    queryKey: ["coin-history", id, days],
    queryFn: () => fetchHistory(id, days),
    enabled: !!id,
  });
