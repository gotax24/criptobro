import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";

export const useSignInWithEmail = () => {
  return useMutation({
    mutationFn: async (credentials) => {
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

export const signInWithOAuth = async (provider, redirectPath = "/") => {
  const safePath = getSafeRedirectPath(redirectPath);
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin + safePath,
    },
  });

  if (error) throw error;
};

export { getSafeRedirectPath };
