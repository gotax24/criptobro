import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../stores/authStore";
import type { Favorites } from "../types";

export const useFavorites = () => {
  const session = useAuthStore((s) => s.session);

  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data as Favorites[];
    },
    enabled: !!session,
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  return useMutation({
    mutationFn: async (coin: {
      coin_id: string;
      coin_name: string;
      coin_symbol: string;
    }) => {
      const { error } = await supabase.from("favorites").insert({
        user_id: user!.id,
        coin_id: coin.coin_id,
        coin_name: coin.coin_name,
        coin_symbol: coin.coin_symbol,
      });

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("favorites").delete().eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
