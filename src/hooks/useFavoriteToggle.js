// hooks/useFavoriteToggle.js
// Lógica del botón de favoritos que comparten la tarjeta (Element) y el detalle (CriptoInfo).
// Guardar favoritos requiere sesión: si el visitante es invitado no intentamos nada en Supabase;
// lo enviamos a /login y recordamos la página actual para devolverlo después.

import { useState } from "react";
// useState guarda el mensaje de error de la última acción.

import { useLocation, useNavigate } from "react-router-dom";
// useNavigate cambia de ruta desde código; useLocation indica en qué página está el usuario.

import { useAuthStore } from "../stores/authStore";
import {
  useAddFavorite,
  useFavorites,
  useRemoveFavorite,
} from "../api/favorites";

// coin es el objeto de la criptomoneda (usa id, name y symbol).
export const useFavoriteToggle = (coin) => {
  const navigate = useNavigate();
  const location = useLocation();
  const session = useAuthStore((s) => s.session);
  const loading = useAuthStore((s) => s.loading);
  // loading es true mientras Supabase restaura la sesión: aún no sabemos si hay usuario.

  const { data: favorites, isPending: loadingFavorites } = useFavorites();
  const { mutate: addFavorite, isPending: adding } = useAddFavorite();
  const { mutate: removeFavorite, isPending: removing } = useRemoveFavorite();
  const [error, setError] = useState(null);

  const isAuthenticated = Boolean(session);
  const favorite = favorites?.find((f) => f.coin_id === coin.id);
  const isFavorite = Boolean(favorite);
  // Bloqueamos el botón mientras se cargan los favoritos o hay una mutación en curso,
  // así no insertamos duplicados ni alternamos dos veces seguidas.
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
