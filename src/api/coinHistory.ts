import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";
import type { CoinHistoryPoint } from "../types";

interface ChartResponse {
  prices: [number, number][];
}

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
};

export const useCoinHistory = (id: string | undefined, days: string) =>
  useQuery({
    queryKey: ["coin-history", id, days],
    queryFn: () => fetchHistory(id!, days),
    enabled: !!id,
  });
