import { memo } from "react";
import { Link } from "react-router-dom";
import RedAndGreen from "../helpers/RedAndGreen";
import CambioEmoji from "../helpers/ChangeEmoji";
import FormatNumber from "../helpers/FormatNumber";
import { useFavoriteToggle } from "../hooks/useFavoriteToggle";

const Element = memo(({ coin }) => {
  const {
    id,
    name,
    symbol,
    image,
    current_price,
    price_change_percentage_24h,
    market_cap_rank,
  } = coin;

  const { isAuthenticated, isFavorite, disabled, error, toggle } =
    useFavoriteToggle(coin);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    toggle();
  };

  return (
    <div className="containerMain">
      <button
        type="button"
        className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
        onClick={toggleFavorite}
        disabled={disabled}
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

export default Element;
