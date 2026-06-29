import { useCoins } from "../api/coin";
import Element from "./Element";
import Loading from "./Loading";
import "../css/Cuadricula.css";

function LayoutCrypto() {
  const { data: coins, isLoading, error } = useCoins();

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="container">
        <p className="error-message">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="titulo-cuadricula">Lista de Criptomonedas</h1>
      <div className="container">
        {coins?.map((coin) => (
          <Element
            key={coin.id}
            id={coin.id}
            name={coin.name}
            symbol={coin.symbol}
            rank={coin.market_cap_rank}
            priceUsd={coin.current_price}
            change={Number(coin.price_change_percentage_24h).toFixed(3)}
          />
        ))}
      </div>
    </>
  );
}

export default LayoutCrypto;
