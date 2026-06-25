import { create } from "zustand";
import type { AuthUser } from "../types";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  setSession: (user: AuthUser, token: string) => void;
  logout: () => void;
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
