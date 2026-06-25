export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  high_24h: number | null;
  low_24h: number | null;
  price_change_percentage_24h: number | null;
  circulating_supply: number;
  total_supply: number | null;
  max_supply: number | null;
  last_updated: string;
}

export interface CoinHistoryPoint {
  timestamp: number;
  price: number;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

export interface LoginCredential {
  email: string;
  password: string;
}
