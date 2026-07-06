// lib/axios.ts
// Instancia configurada de Axios para comunicarse con la API de CoinGecko.
// Usar una instancia dedicada nos permite centralizar baseURL y headers
// sin repetirlos en cada petición.

import axios from "axios";
// axios es la librería HTTP. Aunque podríamos usar fetch nativo, Axios ofrece
// interceptores, transformación automática de JSON y cancelación de peticiones.

export const coingeckoApi = axios.create({
  // baseURL se concatena con las rutas relativas que pasamos a .get()/.post().
  baseURL: import.meta.env.VITE_COINGECKO_API_URL,
  headers: {
    // CoinGecko demo API espera la clave en el header x-cg-demo-api-key,
    // NO en la query string. Así la clave no queda expuesta en la URL.
    "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
  },
});
