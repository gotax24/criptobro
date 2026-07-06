// vite-env.d.ts
// Declaraciones de tipos para las variables de entorno de Vite.
// TypeScript no sabe por defecto qué propiedades tiene import.meta.env;
// este archivo le da forma para que el autocompletado y la verificación funcionen.

/// <reference types="vite/client" />
// Esta triple-barra directive carga los tipos base que Vite proporciona
// para import.meta.env, import.meta.glob, etc.

// Extendemos ImportMetaEnv con las variables que usamos en el proyecto.
// Solo las variables que comienzan con VITE_ llegan al bundle del frontend.
interface ImportMetaEnv {
  readonly VITE_NAME_PAGE: string;
  // Nombre visible de la aplicación (usado en Home, Menu, etc.).
  readonly VITE_COINGECKO_API_URL: string;
  // URL base de la API de CoinGecko (ej. https://api.coingecko.com/api/v3).
  readonly VITE_COINGECKO_API_KEY: string;
  // Clave demo de CoinGecko. Viaja en el header x-cg-demo-api-key.
  readonly VITE_SUPABASE_URL: string;
  // URL del proyecto de Supabase.
  readonly VITE_SUPABASE_PUBLISHABLE_KEY: string;
  // Clave pública (antes "anon") para inicializar supabase-js. Está sujeta a RLS.
}

// ImportMeta es la interfaz global que TypeScript espera para import.meta.
// La reabrimos para asociar nuestro ImportMetaEnv a import.meta.env.
declare module "vite/client" {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
