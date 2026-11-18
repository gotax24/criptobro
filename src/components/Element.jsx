// components/Element.jsx
// Tarjeta individual de criptomoneda usada en la cuadrícula.
// Muestra precio, cambio 24h, ranking y un botón de favoritos.
// Está envuelta en memo para evitar re-renders innecesarios cuando
// otras tarjetas cambian.

import { memo } from "react";
// memo compara props superficialmente y evita renderizar si no cambian.

import { Link } from "react-router-dom";
import RedAndGreen from "../helpers/RedAndGreen";
import CambioEmoji from "../helpers/ChangeEmoji";
import FormatNumber from "../helpers/FormatNumber";
import { useFavoriteToggle } from "../hooks/useFavoriteToggle";

const Element = memo(({ coin }) => {
  // Extraemos solo las propiedades que necesitamos del objeto de la criptomoneda.
  const {
    id,
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
    market_cap_rank,
  } = coin;

  // La lógica de favoritos vive en el hook: si no hay sesión, toggle() lleva a /login.
  const { isAuthenticated, isFavorite, disabled, error, toggle } =
    useFavoriteToggle(coin);

  const toggleFavorite = (e) => {
    // stopPropagation evita que el click navegue al Link padre.
    // Sin esto, hacer click en la estrella navegaría a /criptomonedas/:id.
    e.preventDefault();
    e.stopPropagation();

    toggle();
  };

  return (
    <div className="containerMain">
      {/* La estrella se muestra siempre; sin sesión, el click solo lleva a /login. */}
      <button
        type="button"
        className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
        onClick={toggleFavorite}
        disabled={disabled}
        // aria-pressed solo tiene sentido cuando el botón alterna el favorito;
        // para un invitado es un enlace a /login, así que no lo marcamos.
        aria-pressed={isAuthenticated ? isFavorite : undefined}
        aria-label={
          !isAuthenticated
            ? `Inicia sesión para guardar ${name} en favoritos`
            : isFavorite
              ? `Quitar ${name} de favoritos`
              : `Agregar ${name} a favoritos`
        }
      >
        {isFavorite ? "★" : "☆"}
      </button>
      {error && (
        <span className="favorite-error" role="alert">
          {error}
        </span>
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
