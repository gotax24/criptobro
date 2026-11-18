// api/coin.js
// Hook de TanStack Query para obtener el listado de criptomonedas desde CoinGecko.
// La lógica de fetching (fetchCoins) y el hook (useCoins) viven juntas porque
// son la única forma de leer este recurso en la app.

import { useQuery } from "@tanstack/react-query";
// useQuery gestiona el ciclo de vida de una petición de solo lectura:
// caché, reintentos, estados de loading/error y revalidación.

import { coingeckoApi } from "../lib/axios";
// Instancia de Axios ya configurada con baseURL y API key de CoinGecko.

// Función asíncrona que hace la petición a CoinGecko.
// Devuelve un array con las criptomonedas para que useQuery lo guarde en caché.
const fetchCoins = async () => {
  const { data } = await coingeckoApi.get("/coins/markets", {
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
