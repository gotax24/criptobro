import { useQuery } from "@tanstack/react-query";
import { coingeckoApi } from "../lib/axios";

const fetchCoins = async () => {
  const { data } = await coingeckoApi.get("/coins/markets", {
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
