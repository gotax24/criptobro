import FormatNumber from "../helpers/FormatNumber";
import CambioEmoji from "../helpers/CambioEmoji";
import RedAndGreen from "../helpers/RedAndGreen";
import PropTypes from "prop-types";

const CriptoInfo = ({ criptos }) => {
  return (
    <div className="info">
      <h1 className="name-info">{`${criptos.name} #${criptos.rank}`}</h1>
      <h2 className="codigo-info">Código: {criptos.symbol}</h2>

      <p className="p-info">
        Precio en tiempo real:{" "}
        <span className="number">{FormatNumber(Number(criptos.priceUsd))}</span>
      </p>
      <p className="p-info">
        Cambio de las últimas 24H:{" "}
        <span className={RedAndGreen(criptos.changePercent24Hr)}>
          {Number(criptos.changePercent24Hr).toFixed(3)}%
        </span>
        {CambioEmoji(criptos.changePercent24Hr)}
      </p>
      <p className="p-info">
        Precio promedio ponderado por volumen en las últimas 24H:{" "}
        <span className="number">{Number(criptos.vwap24Hr).toFixed(3)}$</span>
      </p>
      <p className="p-info">
        Volumen de operaciones en las últimas 24H:{" "}
        <span className="number">
          {FormatNumber(Number(criptos.volumeUsd24Hr))}
        </span>
      </p>
      <p className="p-info">
        Oferta por precio:
        <span className="number">
          {FormatNumber(Number(criptos.marketCapUsd))}
        </span>
      </p>
      <p className="p-info">
        Suministro disponible para el comercio:{" "}
        <span className="number">{FormatNumber(Number(criptos.supply))}</span>
      </p>
      <p className="info-p">
        Cantidad total de activos emitidos:{" "}
        <span className="number">
          {FormatNumber(Number(criptos.maxSupply))}
        </span>
      </p>
    </div>
  );
};

CriptoInfo.propTypes = {
  criptos: PropTypes.object,
};

export default CriptoInfo;
