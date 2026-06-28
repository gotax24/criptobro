import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

interface AuthCredential {
  email: string;
  password: string;
}

export const useSignInWithEmail = () => {
  return useMutation({
    mutationFn: async (credentials: AuthCredential) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;

      return data;
    },
  });
};

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

export const signInWithOAuth = async (
  provider: "google" | "facebook" | "github",
) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) throw error;
};
