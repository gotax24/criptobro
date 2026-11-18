// api/favorites.js
// Hooks de TanStack Query para gestionar los favoritos del usuario en Supabase.
// Separamos lectura (useFavorites) de escritura (useAddFavorite, useRemoveFavorite)
// para seguir el patrón recomendado de TanStack Query.

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// useQuery: lectura. useMutation: escritura. useQueryClient: acceso al cliente
// para invalidar caché después de una mutación exitosa.

import { supabase } from "../lib/supabase";
import { useAuthStore } from "../stores/authStore";

// Hook de lectura: devuelve los favoritos del usuario autenticado.
export const useFavorites = () => {
  const session = useAuthStore((s) => s.session);
  // Solo consultamos Supabase si hay sesión activa.

  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*")
        .order("created_at", { ascending: false });
      // Ordenamos del más reciente al más antiguo.

      if (error) throw error;
      // Lanzar el error permite que useQuery lo capture en su propiedad error.

      return data;
    },
    enabled: !!session,
    // Si no hay sesión, la query no se ejecuta y data queda undefined.
  });
};

// Hook de escritura: agrega una criptomoneda a favoritos.
export const useAddFavorite = () => {
  const queryClient = useQueryClient();
  // Necesitamos el QueryClient para invalidar la lista de favoritos
  // y forzar una recarga tras insertar.

  return useMutation({
    mutationFn: async (coin) => {
      // coin trae { coin_id, coin_name, coin_symbol }.
      const user = useAuthStore.getState().user;
      // Leemos el usuario directamente del store; no es necesario suscribirse.

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
      // Invalidamos la query "favorites" para que se vuelva a cargar
      // y la UI refleje el nuevo favorito.
    },
  });
};

// Hook de escritura: elimina un favorito por su id de fila.
export const useRemoveFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("favorites").delete().eq("id", id);
      // eq("id", id) filtra la fila exacta a borrar. RLS garantiza que el
      // usuario solo pueda borrar sus propios favoritos.

      if (error) throw error;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
