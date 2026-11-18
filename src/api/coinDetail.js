import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";

const fetchCoin = async (id) => {
  const { data } = await coingeckoApi.get("/coins/markets", {
    params: { vs_currency: "usd", ids: id },
  });

  if (!data || data.length === 0) {
    throw new Error(`No se encontró la criptomoneda "${id}".`);
  }

  return data[0];
};

export const useCoinDetail = (id) =>
  useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoin(id),
    enabled: !!id,
  });
