// api/coinHistory.ts
// Hook de TanStack Query para obtener el historial de precios de una criptomoneda.
// CoinGecko devuelve un array de tuplas [timestamp, price]; lo transformamos
// a un array de objetos { timestamp, price } para que sea más fácil de consumir.

import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";
import type { CoinHistoryPoint } from "../types";

// Forma cruda de la respuesta de CoinGecko para /market_chart.
interface ChartResponse {
  prices: [number, number][];
  // Cada elemento es [timestamp_ms, price_usd].
}

// Recibe el id de la moneda y el rango de días ("1", "7", "30", "365").
const fetchHistory = async (
  id: string,
  days: string,
): Promise<CoinHistoryPoint[]> => {
  const { data } = await coingeckoApi.get<ChartResponse>(
    `/coins/${id}/market_chart`,
    {
      params: { vs_currency: "usd", days },
    },
  );

  return data.prices.map(([ts, price]) => ({ timestamp: ts, price }));
  // Destructuramos cada tupla en ts y price y devolvemos el objeto tipado.
};

// El hook se invalida automáticamente cuando cambia id o days gracias a queryKey.
export const useCoinHistory = (id: string | undefined, days: string) =>
  useQuery({
    queryKey: ["coin-history", id, days],
    queryFn: () => fetchHistory(id!, days),
    enabled: !!id,
  });
