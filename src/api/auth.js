// api/auth.js
// Hooks y funciones para autenticación con Supabase.
// Las operaciones de email usan useMutation porque modifican el estado de sesión.
// OAuth es una función simple porque redirige al navegador fuera de la app.

import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

// Hook para iniciar sesión con email y contraseña.
// credentials llega como { email, password } desde el formulario de Login.
export const useSignInWithEmail = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;
      // Lanzar el error hace que React Query lo exponga en error de la mutación.

      return data;
      // data contiene la sesión y el usuario. La suscripción onAuthStateChange
      // del authStore se encargará de propagarla al store global.
    },
  });
};

// Hook para registrarse con email y contraseña.
export const useSignUpWithEmail = () => {
  return useMutation({
    mutationFn: async (credentials) => {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      return data;
    },
  });
};

// Valida que la ruta de retorno sea una ruta interna segura de la app.
// Previene Open Redirects (ej. "//sitio-externo.com") y bucles hacia "/login".
const getSafeRedirectPath = (rawPath) => {
  if (
    typeof rawPath === "string" &&
    rawPath.startsWith("/") &&
    !rawPath.startsWith("//") &&
    !rawPath.startsWith("/login")
  ) {
    return rawPath;
  }
  return "/";
};

// Función asíncrona para iniciar sesión con proveedores OAuth.
// No usa useMutation porque supabase.auth.signInWithOAuth redirige a la URL
// del proveedor, interrumpiendo el flujo de la app.
// redirectPath es la página a la que volver después del login (ej. "/criptomonedas").
export const signInWithOAuth = async (provider, redirectPath = "/") => {
  const safePath = getSafeRedirectPath(redirectPath);
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin + safePath,
      // Supabase solo redirige a URLs de su lista "Redirect URLs" (con el comodín /**).
    },
  });

  if (error) throw error;
};

export { getSafeRedirectPath };
