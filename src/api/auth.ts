// api/auth.ts
// Hooks y funciones para autenticación con Supabase.
// Las operaciones de email usan useMutation porque modifican el estado de sesión.
// OAuth es una función simple porque redirige al navegador fuera de la app.

import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

// Interfaz compartida para credenciales de email/password.
interface AuthCredential {
  email: string;
  password: string;
}

// Hook para iniciar sesión con email y contraseña.
export const useSignInWithEmail = () => {
  return useMutation({
    mutationFn: async (credentials: AuthCredential) => {
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
    mutationFn: async (credentials: AuthCredential) => {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      return data;
    },
  });
};

// Función asíncrona para iniciar sesión con proveedores OAuth.
// No usa useMutation porque supabase.auth.signInWithOAuth redirige a la URL
// del proveedor, interrumpiendo el flujo de la app.
export const signInWithOAuth = async (
  provider: "google" | "github",
) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
      // Coincide con la URL permitida en el dashboard de Supabase.
    },
  });

  if (error) throw error;
};
