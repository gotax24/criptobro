import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useAuthStore } from "../stores/authStore";

export const useFavorites = () => {
  const userId = useAuthStore((s) => s.user?.id);

  return useQuery({
    queryKey: ["favorites", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data;
    },
    enabled: !!userId,
  });
};

export const useAddFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (coin) => {
      const user = useAuthStore.getState().user;

      if (!user) {
        throw new Error("Debes iniciar sesión para agregar favoritos");
      }

      const { error } = await supabase.from("favorites").insert({
        user_id: user.id,
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
    mutationFn: async (id) => {
      const { error } = await supabase.from("favorites").delete().eq("id", id);

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
