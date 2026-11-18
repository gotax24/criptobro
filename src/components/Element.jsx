// components/Element.jsx
// Tarjeta individual de criptomoneda usada en la cuadrícula.
// Muestra precio, cambio 24h, ranking y un botón de favoritos.
// Está envuelta en memo para evitar re-renders innecesarios cuando
// otras tarjetas cambian.

import { memo, useState } from "react";
// memo compara props superficialmente y evita renderizar si no cambian.

import { Link } from "react-router-dom";
import RedAndGreen from "../helpers/RedAndGreen";
import CambioEmoji from "../helpers/ChangeEmoji";
import FormatNumber from "../helpers/FormatNumber";
import { useAuthStore } from "../stores/authStore";
import {
  useAddFavorite,
  useFavorites,
  useRemoveFavorite,
} from "../api/favorites";

const Element = memo(({ coin }) => {
  // Extraemos solo las propiedades que necesitamos del objeto Coin.
  const {
    id,
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
    market_cap_rank,
  } = coin;

  const session = useAuthStore((s) => s.session);
  const { data: favorites } = useFavorites();
  const [mutationError, setMutationError] = useState(null);
  const { mutate: addFavorite, isPending: adding } = useAddFavorite();
  const { mutate: removeFavorite, isPending: removing } = useRemoveFavorite();

  // Buscamos si esta moneda ya está en favoritos del usuario.
  const favorite = favorites?.find((f) => f.coin_id === id);
  const isFavorite = !!favorite;
  const isAuthenticated = Boolean(session);
  const isBusy = adding || removing;

  const clearError = () => setMutationError(null);

  const toggleFavorite = (e) => {
    // stopPropagation evita que el click navegue al Link padre.
    // Sin esto, hacer click en la estrella navegaría a /criptomonedas/:id.
    e.preventDefault();
    e.stopPropagation();

    clearError();

    if (isFavorite && favorite) {
      removeFavorite(favorite.id, {
        onError: (err) => setMutationError(err.message),
      });
    } else {
      addFavorite(
        {
          coin_id: id,
          coin_name: name,
          coin_symbol: symbol,
        },
        {
          onError: (err) => setMutationError(err.message),
        }
      );
    }
  };

  return (
    <div className="containerMain">
      {isAuthenticated && (
        <>
          <button
            type="button"
            className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
            onClick={toggleFavorite}
            disabled={isBusy}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Quitar ${name} de favoritos`
                : `Agregar ${name} a favoritos`
            }
          >
            {isFavorite ? "★" : "☆"}
          </button>
          {mutationError && (
            <span className="favorite-error" role="alert">
              {mutationError}
            </span>
          )}
        </>
      )}

      <Link to={`/criptomonedas/${id}`} className="link-elemento">
        <img src={image} alt={name} />

        <h2 className="tituloContainer">
          {name} #{market_cap_rank}
        </h2>

        <span className="simbolo">{symbol}</span>

        <p className="precio">{FormatNumber(current_price)}</p>

        <p className={RedAndGreen(price_change_percentage_24h ?? 0)}>
          {price_change_percentage_24h?.toFixed(3)}%
          {CambioEmoji(price_change_percentage_24h ?? 0)}
        </p>
      </Link>
    </div>
  );
});

Element.displayName = "Element";
// displayName facilita la depuración en React DevTools y mensajes de error.

export default Element;
