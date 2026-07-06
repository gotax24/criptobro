// types/index.ts
// Archivo central de tipos compartidos de TypeScript.
// Al definir las interfaces aquí, cualquier componente o hook puede importarlas
// y el compilador detecta errores de forma temprana (tipado de props, API, etc.).

// Coin representa la respuesta que devuelve CoinGecko para cada criptomoneda
// en el endpoint /coins/markets.
export interface Coin {
  id: string;
  // Identificador único de la criptomoneda (ej. "bitcoin").
  symbol: string;
  // Símbolo en minúsculas (ej. "btc").
  name: string;
  // Nombre legible (ej. "Bitcoin").
  image: string;
  // URL del logo.
  current_price: number;
  // Precio actual en la moneda de comparación (USD).
  market_cap: number;
  // Capitalización de mercado.
  market_cap_rank: number;
  // Posición según capitalización.
  high_24h: number | null;
  // Precio máximo en las últimas 24h. Puede ser null si no hay datos.
  low_24h: number | null;
  // Precio mínimo en las últimas 24h.
  total_volume: number;
  // Volumen total operado en 24h.
  price_change_percentage_24h: number | null;
  // Variación porcentual en 24h.
  circulating_supply: number;
  // Cantidad de monedas en circulación.
  total_supply: number | null;
  // Cantidad total emitida (puede ser null).
  max_supply: number | null;
  // Cantidad máxima posible (null si no tiene límite, como ETH).
  last_updated: string;
  // Fecha de última actualización en formato ISO.
}

// CoinHistoryPoint representa un punto individual de la gráfica de precios.
export interface CoinHistoryPoint {
  timestamp: number;
  // Unix timestamp en milisegundos, tal como lo entrega CoinGecko.
  price: number;
  // Precio en USD en ese momento.
}

// Profile refleja la tabla "profiles" de Supabase.
// Contiene datos adicionales del usuario más allá de lo que guarda Auth.
export interface Profile {
  id: string;
  // UUID que coincide con auth.users.id.
  full_name: string | null;
  // Nombre completo. Puede ser null hasta que el usuario lo complete.
  avatar_url: string | null;
  // URL del avatar en Storage o null.
  updated_at: string;
  // Fecha ISO de última modificación.
}

// Favorites refleja la tabla "favorites" de Supabase.
// Cada fila es una criptomoneda marcada como favorita por un usuario.
export interface Favorites {
  id: string;
  // UUID de la fila.
  user_id: string;
  // UUID del usuario propietario (clave para RLS).
  coin_id: string;
  // Identificador de CoinGecko.
  coin_name: string;
  // Nombre legible guardado en el momento de agregar.
  coin_symbol: string;
  // Símbolo guardado para mostrar sin volver a consultar la API.
  created_at: string;
  // Fecha de creación del favorito.
}
