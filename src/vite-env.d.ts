/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAME_PAGE: string;

  readonly VITE_COINGECKO_API_URL: string;

  readonly VITE_COINGECKO_API_KEY: string;

  readonly VITE_SUPABASE_URL: string;

  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
}

interface ImportMetaEnv {
  readonly env: ImportMetaEnv;
}
