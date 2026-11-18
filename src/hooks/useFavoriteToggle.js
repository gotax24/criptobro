import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import {
  useAddFavorite,
  useFavorites,
  useRemoveFavorite,
} from "../api/favorites";

export const useFavoriteToggle = (coin) => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);

  const { data: favorites, isPending: loadingFavorites } = useFavorites();
  const { mutate: addFavorite, isPending: adding } = useAddFavorite();
  const { mutate: removeFavorite, isPending: removing } = useRemoveFavorite();
  const [error, setError] = useState(null);

  const isAuthenticated = Boolean(session);
  const favorite = favorites?.find((f) => f.coin_id === coin.id);
  const isFavorite = Boolean(favorite);

  const disabled =
    loading || adding || removing || (isAuthenticated && loadingFavorites);

  const toggle = () => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: location.pathname,
          message: `Inicia sesión para guardar ${coin.name} en tus favoritos.`,
        },
      });
      return;
    }

    setError(null);
    const onError = (err) => setError(err.message);

    if (favorite) {
      removeFavorite(favorite.id, { onError });
    } else {
      addFavorite(
        { coin_id: coin.id, coin_name: coin.name, coin_symbol: coin.symbol },
        { onError },
      );
    }
  };

  return { isAuthenticated, isFavorite, disabled, error, toggle };
};
