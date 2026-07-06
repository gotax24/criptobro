import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Profile } from "../types";

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;

  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  profile: null,
  loading: true,

  setSession: (session) => {
    set({ session, user: session?.user ?? null });
  },

  setProfile: (profile) => set({ profile }),

  signOut: async () => {
    await supabase.auth.signOut();
    set({ session: null, user: null, profile: null });
  },
}));

const loadProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error al cargar el perfil:", error.message);
    return;
  }

  useAuthStore.getState().setProfile(data as Profile);
};

const finishLoading = () => useAuthStore.setState({ loading: false });

supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.getState().setSession(session);

  const userId = session?.user?.id;

  if (!userId) {
    finishLoading();
    return;
  }

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
