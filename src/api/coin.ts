// api/coin.ts
// Hook de TanStack Query para obtener el listado de criptomonedas desde CoinGecko.
// La lógica de fetching (fetchCoins) y el hook (useCoins) viven juntas porque
// son la única forma de leer este recurso en la app.

import { useQuery } from "@tanstack/react-query";
// useQuery gestiona el ciclo de vida de una petición de solo lectura:
// caché, reintentos, estados de loading/error y revalidación.

import { coingeckoApi } from "../lib/axios";
// Instancia de Axios ya configurada con baseURL y API key de CoinGecko.

import type { Coin } from "../types";
// Tipo de nuestro dominio para la respuesta de /coins/markets.

// Función asíncrona que hace la petición a CoinGecko.
// Devuelve Promise<Coin[]> para que useQuery infiera el tipo de data.
const fetchCoins = async (): Promise<Coin[]> => {
  const { data } = await coingeckoApi.get<Coin[]>("/coins/markets", {
    // params se serializa como query string automáticamente.
    params: {
      vs_currency: "usd",
      // Precios en dólares.
      order: "market_cap_desc",
      // Ordenadas por capitalización descendente.
      per_page: 100,
      // Traemos las 100 principales.
    },
  });

  return data;
};

// Hook exportado para usar en componentes.
export const useCoins = () =>
  useQuery({ queryKey: ["coins"], queryFn: fetchCoins });
// queryKey es el identificador único de esta query en la caché.
// Cualquier otro useQuery con la misma key comparte los datos.
// queryFn es la función que TanStack Query llamará para obtener los datos.
