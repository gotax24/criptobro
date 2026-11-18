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
          <Element key={coin.id} coin={coin} />
        ))}
      </div>
    </>
  );
}

export default LayoutCrypto;
