import { memo } from "react";
import { Link } from "react-router-dom";
import type { Coin } from "../types";
import RedAndGreen from "../helpers/RedAndGreen";
import CambioEmoji from "../helpers/ChangeEmoji";
import FormatNumber from "../helpers/FormatNumber";
import { useAuthStore } from "../stores/authStore";
import {
  useAddFavorite,
  useFavorites,
  useRemoveFavorite,
} from "../api/favorites";

interface ElementProps {
  coin: Coin;
}

const Element = memo(({ coin }: ElementProps) => {
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
  const { mutate: addFavorite, isPending: adding } = useAddFavorite();
  const { mutate: removeFavorite, isPending: removing } = useRemoveFavorite();

  const favorite = favorites?.find((f) => f.coin_id === id);
  const isFavorite = Boolean(favorite);
  const isAuthenticated = Boolean(session);
  const isBusy = adding || removing;

  const handleToggleFavorite = () => {
    if (isBusy || !isAuthenticated) return;

    if (isFavorite && favorite) {
      removeFavorite(favorite.id);
    } else {
      addFavorite({
        coin_id: id,
        coin_name: name,
        coin_symbol: symbol,
      });
    }
  };

  return (
    <div className="containerMain">
      {isAuthenticated && (
        <button
          type="button"
          className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
          onClick={handleToggleFavorite}
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
