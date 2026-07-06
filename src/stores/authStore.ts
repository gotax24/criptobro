import { create } from "zustand";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Profile } from "../types";

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  profileError: string | null;
  loading: boolean;

  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  setProfileError: (error: string | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
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

const loadProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    // Guardamos el error en el store en vez de solo console.error.
    // Así los componentes pueden decidir si mostrarlo en la UI.
    useAuthStore.getState().setProfileError(error.message);
    return;
  }

  useAuthStore.getState().setProfile(data as Profile | null);
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
