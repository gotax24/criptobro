import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import type { LoginCredential } from "../types";

interface LoginResponse {
  token: string;
}

export const useLoginMutation = () => {
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: async (credentials: LoginCredential) => {
      const { data } = await axios.post<LoginResponse>(
        "https://reqres.in/api/login",
        credentials,
      );

      return data.token;
    },
    onSuccess: (token) => {
      setSession({ id: "", email: "", name: "", avatar_url: "" }, token);
    },
  });
};
