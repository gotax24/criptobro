import { create } from "zustand";
import { supabase } from "../lib/supabase";

export const useAuthStore = create((set) => ({
  session: null,
  user: null,
  profile: null,
  profileError: null,
  loading: true,

  setSession: (session) => {
    set({ session, user: session?.user ?? null });
  },

  setProfile: (profile) => set({ profile, profileError: null }),
  setProfileError: (profileError) => set({ profileError }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, profile: null, profileError: null });
  },
}));

// loadProfile consulta la tabla "profiles" de Supabase.
const loadProfile = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (useAuthStore.getState().user?.id !== userId) {
    return;
  }

  if (error) {
    useAuthStore.getState().setProfileError(error.message);
    return;
  }

  useAuthStore.getState().setProfile(data);
};

const finishLoading = () => useAuthStore.setState({ loading: false });

supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setSession(session);

  const userId = session?.user?.id;
  // Si no hay usuario (cierre de sesión o sesión inválida), limpiamos el perfil y terminamos la carga.

  if (!userId) {
    useAuthStore.getState().setProfile(null);
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
  } else {
    finishLoading();
  }
});
