import FormatNumber from "../../helpers/FormatNumber";
import CambioEmoji from "../../helpers/CambioEmoji";
import RedAndGreen from "../../helpers/RedAndGreen";
import PropTypes from "prop-types";

const CriptoInfo = ({criptos}) => {
  return (
    <div className="info">
      <h1>{`${criptos.name} #${criptos.rank}`}</h1>
      <h2>Código: {criptos.symbol}</h2>

      <p>
        Precio en tiempo real:{" "}
        <span className="number">
          {FormatNumber(Number(criptos.priceUsd))}
        </span>
      </p>
      <p>
        Cambio de las últimas 24H:{" "}
        <span className={RedAndGreen(criptos.changePercent24Hr)}>
          {Number(criptos.changePercent24Hr).toFixed(3)}%
        </span>
        {CambioEmoji(criptos.changePercent24Hr)}
      </p>
      <p>
        Precio promedio ponderado por volumen en las últimas 24H:{" "}
        <span className="number">{Number(criptos.vwap24Hr).toFixed(3)}$</span>
      </p>
      <p>
        Volumen de operaciones en las últimas 24H:{" "}
        <span className="number">
          {FormatNumber(Number(criptos.volumeUsd24Hr))}
        </span>
      </p>
      <p>
        Oferta por precio:
        <span className="number">
          {FormatNumber(Number(criptos.marketCapUsd))}
        </span>
      </p>
      <p>
        Suministro disponible para el comercio:{" "}
        <span className="number">{FormatNumber(Number(criptos.supply))}</span>
      </p>
      <p>
        Cantidad total de activos emitidos:{" "}
        <span className="number">
          {FormatNumber(Number(criptos.maxSupply))}
        </span>
      </p>
    </div>
  );
};

CriptoInfo.propTypes = {
    criptos: PropTypes.object
}

export default CriptoInfo;
