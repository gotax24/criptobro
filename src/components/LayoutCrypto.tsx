import Elemento from "./Element";
import useData from "../hooks/useData";
import Cargando from "./Loading";
import "../css/Cuadricula.css";

function LayoutCrypto() {
  const [criptos, cargandoCriptos, errorCripto] = useData("assets", true);

  if (cargandoCriptos) return <Cargando />;

  return (
    <>
      <h1 className="titulo-cuadricula">Lista de Criptomonedas</h1>
      <div className="container">
        {criptos &&
          criptos.map(
            ({ id, name, symbol, priceUsd, changePercent24Hr, rank }) => (
              <Elemento
                key={id}
                rank={rank}
                name={name}
                symbol={symbol}
                priceUsd={priceUsd}
                change={Number(changePercent24Hr).toFixed(3)}
                id={id}
              />
            )
          )}
        {errorCripto && (
          <p className="error-message">
            {errorCripto?.message || "Ocurrió un error al cargar los datos."}
          </p>
        )}
      </div>
    </>
  );
}

export default LayoutCrypto;
