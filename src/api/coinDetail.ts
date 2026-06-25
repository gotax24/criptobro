import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";
import type { Coin } from "../types";

const fetchCoin = async (id: string): Promise<Coin> => {
  const { data } = await coingeckoApi.get<Coin[]>("/coins/makets", {
    params: { vs_currency: "usd", ids: id },
  });

  return data[0];
};

export const useCoinDetail = (id: string | undefined) =>
  useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoin(id!),
    enabled: !!id,
  });
