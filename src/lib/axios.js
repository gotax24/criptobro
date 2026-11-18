import axios from "axios";

export const coingeckoApi = axios.create({
  baseURL: import.meta.env.VITE_COINGECKO_API_URL,
  headers: {
    "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
  },
});
