// lib/supabase.ts
// Cliente único de Supabase para toda la aplicación.
// Se exporta como singleton para evitar múltiples instancias y compartir
// correctamente la suscripción de autenticación.

import { createClient } from "@supabase/supabase-js";
// createClient inicializa el cliente con URL y clave, y opcionalmente configura auth.

const url = import.meta.env.VITE_SUPABASE_URL;
// URL del proyecto de Supabase, viene de variables de entorno de Vite.

const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
// Clave pública (publishable / anon). Es seguro exponerla en frontend porque
// el acceso a datos se controla con Row Level Security (RLS), no con esta clave.

if (!url || !key) {
  // Validación temprana: si faltan credenciales, la app falla rápidamente
  // en lugar de comportarse de forma extraña más tarde.
  throw new Error("Faltan VITE_SUPABASE_URL o VITE_SUPABASE_PUBLISHABLE_KEY");
}

export const supabase = createClient(url, key, {
  auth: {
    persistSession: true,
    // Guarda la sesión en localStorage para restaurarla al recargar la página.
    autoRefreshToken: true,
    // Refresca el JWT automáticamente antes de que expire.
    detectSessionInUrl: true,
    // Detecta tokens de OAuth en la URL (después de login con Google/GitHub/etc.)
    // y los intercambia por una sesión completa.
  },
});
