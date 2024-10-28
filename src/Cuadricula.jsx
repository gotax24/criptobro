import PropTypes from "prop-types";

const Cuadricula = ({ symbol, name, priceUsd, change, rank }) => {
  const Cambio = (numero) => (numero < 0 ? "NumerosRojos" : "NumerosVerdes");
  const simbolo = (numero) => (numero < 0 ? "⛔" : "⬆️");

  return (
    <>
      <div className="containerMain">
        <h1 className="tituloContainer">
          {name} #{Number(rank)}
        </h1>
        <h2 className="simbolo">{symbol}</h2>
        <p className="precio">{Number(priceUsd).toFixed(2)}$</p>
        <p className={Cambio(change)}>{change + "%" + simbolo(change)}</p>
      </div>
    </>
  );
};

Cuadricula.propTypes = {
  rank: PropTypes.string,
  symbol: PropTypes.string,
  name: PropTypes.string,
  priceUsd: PropTypes.string,
  change: PropTypes.string,
};

export default Cuadricula;
