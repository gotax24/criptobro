import { memo } from "react";
import { Link } from "react-router-dom";
import type { Coin } from "../types";
import RedAndGreen from "../helpers/RedAndGreen";
import CambioEmoji from "../helpers/ChangeEmoji";
import FormatNumber from "../helpers/FormatNumber";

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

  return (
    <Link to={`/criptomonedas/${id}`} className="link-elemento">
      <div className="containerMain">
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
      </div>
    </Link>
  );
});

Element.displayName = "Element";

export default Element;
