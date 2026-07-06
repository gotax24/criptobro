// stores/authStore.ts
// Store global de autenticación basado en Zustand.
// No lee ni escribe localStorage manualmente: Supabase ya se encarga de persistir
// la sesión. Este store solo reacciona a los cambios que notifica Supabase.

import { create } from "zustand";
// create es la función principal de Zustand. Crea un store con un setter y
// permite que los componentes se suscriban a slices específicos.

import type { Session, User } from "@supabase/supabase-js";
// Tipos oficiales de Supabase para la sesión y el usuario autenticado.

import { supabase } from "../lib/supabase";
// Cliente único de Supabase, inicializado en lib/supabase.ts.

import type { Profile } from "../types";
// Nuestro tipo de perfil personalizado (tabla profiles).

// Definimos la forma del estado del store.
// Usar una interfaz permite que TypeScript verifique que el objeto inicial
// y las funciones cumplen con el contrato.
interface AuthState {
  session: Session | null;
  // Sesión actual de Supabase. null = no hay sesión.
  user: User | null;
  // Objeto usuario extraído de session.user. null si no hay sesión.
  profile: Profile | null;
  // Perfil extendido desde la tabla profiles.
  profileError: string | null;
  // Mensaje de error si la carga del perfil falla.
  loading: boolean;
  // true mientras Supabase decide si hay sesión activa. Evita redirecciones prematuras.

  setSession: (session: Session | null) => void;
  // Acción para actualizar sesión y usuario al mismo tiempo.
  setProfile: (profile: Profile | null) => void;
  // Acción para guardar el perfil y limpiar errores previos.
  setProfileError: (error: string | null) => void;
  // Acción para guardar un error de carga de perfil.
  signOut: () => Promise<void>;
  // Acción asíncrona para cerrar sesión en Supabase y limpiar el store.
}

// Creamos el store. El callback recibe set, que sirve para actualizar el estado.
export const useAuthStore = create<AuthState>((set) => ({
  // Estado inicial.
  session: null,
  user: null,
  profile: null,
  profileError: null,
  // loading inicia en true porque Supabase necesita tiempo para restaurar la sesión.
  loading: true,

  setSession: (session) => {
    // Actualizamos session y, de paso, user. Usamos optional chaining y nullish coalescing
    // para extraer el usuario de forma segura.
    set({ session, user: session?.user ?? null });
  },

  setProfile: (profile) =>
    // Al guardar un perfil válido, limpiamos cualquier error anterior.
    set({ profile, profileError: null }),

  setProfileError: (profileError) =>
    // Guardamos solo el mensaje de error, no el objeto completo, para mantener
    // el store serializable y fácil de mostrar en la UI.
    set({ profileError }),

  signOut: async () => {
    // Llamamos a Supabase para invalidar la sesión en el servidor y borrar el local storage.
    await supabase.auth.signOut();
    // Limpiamos todo el estado relacionado con la sesión.
    set({ session: null, user: null, profile: null, profileError: null });
  },
}));

// loadProfile consulta la tabla "profiles" de Supabase.
// Vive fuera del store porque es una función auxiliar, no una acción expuesta.
const loadProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
  // maybeSingle devuelve un objeto o null. A diferencia de single(), no lanza
  // error si no hay filas, lo cual es útil cuando el perfil aún no existe.

  if (error) {
    // Guardamos el error en el store en vez de solo console.error.
    // Así los componentes pueden decidir si mostrarlo en la UI.
    useAuthStore.getState().setProfileError(error.message);
    return;
  }

  useAuthStore.getState().setProfile(data as Profile | null);
  // Hacemos type assertion porque Supabase devuelve tipos genéricos; confiamos
  // en que la tabla coincide con nuestra interfaz Profile.
};

const finishLoading = () => useAuthStore.setState({ loading: false });
// Helper para marcar que ya terminó la restauración de la sesión.

// Suscripción central a cambios de estado de autenticación.
// Se ejecuta una sola vez al importar este módulo.
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setSession(session);

  const userId = session?.user?.id;
  // Si no hay usuario (cierre de sesión o sesión inválida), solo terminamos la carga.

  if (!userId) {
    finishLoading();
    return;
  }

  // Solo cargamos perfil en eventos donde realmente hay un usuario válido.
  if (
    event === "INITIAL_SESSION" ||
    event === "SIGNED_IN" ||
    event === "USER_UPDATED"
  ) {
    loadProfile(userId).finally(finishLoading);
    // .finally garantiza que loading pase a false tanto si la carga falla como si no.
  } else {
    finishLoading();
  }
});
