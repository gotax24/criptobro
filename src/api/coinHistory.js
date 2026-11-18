import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";

const fetchHistory = async (id, days) => {
  const { data } = await coingeckoApi.get(
    `/coins/${id}/market_chart`,
    {
      params: { vs_currency: "usd", days },
    },
  );

  return data.prices.map(([ts, price]) => ({ timestamp: ts, price }));
};

export const useCoinHistory = (id, days) =>
  useQuery({
    queryKey: ["coin-history", id, days],
    queryFn: () => fetchHistory(id, days),
    enabled: !!id,
  });
