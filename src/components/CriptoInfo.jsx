// components/CriptoInfo.jsx
// Componente de presentación que muestra los datos detallados de una criptomoneda.
// No tiene estado ni efectos; solo recibe un objeto con los datos de la cripto y lo renderiza.

import FormatNumber from "../helpers/FormatNumber";
import CambioEmoji from "../helpers/ChangeEmoji";
import RedAndGreen from "../helpers/RedAndGreen";

const CriptoInfo = ({ coin }) => {
  // Desestructuración de las propiedades que vamos a mostrar.
  const {
    name,
    symbol,
    current_price,
    price_change_percentage_24h,
    market_cap_rank,
    market_cap,
    total_volume,
    high_24h,
    low_24h,
    circulating_supply,
    total_supply,
    max_supply,
  } = coin;

  return (
    <div className="info">
      <h1 className="name-info">
        {name} #{market_cap_rank}
      </h1>
      <h2 className="codigo-info">Código: {symbol}</h2>

      <p className="p-info">
        Precio en tiempo real:{" "}
        <span className="number">{FormatNumber(current_price)}</span>
      </p>

      <p className="p-info">
        Cambio de las últimas 24H:{" "}
        <span className={RedAndGreen(price_change_percentage_24h ?? 0)}>
          {price_change_percentage_24h?.toFixed(3) ?? "—"}%
        </span>
        {CambioEmoji(price_change_percentage_24h ?? 0)}
      </p>

      <p className="p-info">
        Máximo 24H:{" "}
        <span className="number">
          {high_24h != null ? FormatNumber(high_24h) : "—"}
        </span>
      </p>

      <p className="p-info">
        Mínimo 24H:{" "}
        <span className="number">
          {low_24h != null ? FormatNumber(low_24h) : "—"}
        </span>
      </p>

      <p className="p-info">
        Market Cap: <span className="number">{FormatNumber(market_cap)}</span>
      </p>

      <p className="p-info">
        Volumen 24H:{" "}
        <span className="number">{FormatNumber(total_volume)}</span>
      </p>

      <p className="p-info">
        Suministro circulante:{" "}
        <span className="number">{FormatNumber(circulating_supply)}</span>
      </p>

      <p className="p-info">
        Suministro total:{" "}
        <span className="number">
          {total_supply != null ? FormatNumber(total_supply) : "—"}
        </span>
      </p>

      <p className="p-info">
        Suministro máximo:{" "}
        <span className="number">
          {max_supply != null ? FormatNumber(max_supply) : "—"}
        </span>
      </p>
    </div>
  );
};

export default CriptoInfo;
