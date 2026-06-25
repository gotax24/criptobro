import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";
import type { Coin } from "../types";

const fetchCoins = async (): Promise<Coin[]> => {
  const { data } = await coingeckoApi.get<Coin[]>("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 100,
    },
  });

  return data;
};

export const useCoins = () =>
  useQuery({ queryKey: ["coins"], queryFn: fetchCoins });
