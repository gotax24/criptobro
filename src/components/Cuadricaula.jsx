import Elemento from "./Elemento";
import useData from "../hooks/useData";
import Cargando from "./Cargando";
import "./Cuadricula.css"


function Cuadricula() {
  const [criptos, cargandoCriptos] = useData("assets");

  if (cargandoCriptos) return <Cargando/>

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
      </div>
    </>
  );
}

export default Cuadricula;