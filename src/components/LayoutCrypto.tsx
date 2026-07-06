// components/LayoutCrypto.tsx
// Página que muestra la cuadrícula con las 100 principales criptomonedas.
// Cada moneda se renderiza mediante el componente Element.

import { useCoins } from "../api/coin";
// Hook de TanStack Query que obtiene el listado desde CoinGecko.

import Element from "./Element";
import Loading from "./Loading";
import "../css/Cuadricula.css";

function LayoutCrypto() {
  // Desestructuramos data renombrándola a coins para mayor claridad.
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
          // key es obligatorio en listas; usa el id único de cada moneda.
          <Element key={coin.id} coin={coin} />
        ))}
      </div>
    </>
  );
}

export default LayoutCrypto;
