import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabase";
import type { Profile } from "../types";

interface AuthState {
  
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("tokenCriptoBro"),
  setSession: (user, token) => {
    localStorage.setItem("tokenCriptoBro", token);
    set({ user, token });
  },
  logout: () => {
    localStorage.removeItem("tokenCriptoBro");
    set({ user: null, token: null });
  },
}));
