import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import RedAndGreen from "../helpers/RedAndGreen";
import CambioEmoji from "../helpers/CambioEmoji";
import FormatNumber from "../helpers/FormatNumber";

const Elemento = ({ id, symbol, name, priceUsd, change, rank }) => {

  return (
    <Link to={`/criptomonedas/${id}`} className="link-elemento">
      <div className="containerMain">
        <h1 className="tituloContainer">
          {name} #{Number(rank)}
        </h1>
        <h2 className="simbolo">{symbol}</h2>
        <p className="precio">{FormatNumber(Number(priceUsd).toFixed(2))}$</p>
        <p className={RedAndGreen(change)}>{change + "%" + CambioEmoji(change)}</p>
      </div>
    </Link>
  );
};

Elemento.propTypes = {
  id: PropTypes.string,
  rank: PropTypes.string,
  symbol: PropTypes.string,
  name: PropTypes.string,
  priceUsd: PropTypes.string,
  change: PropTypes.string,
};

export default Elemento;
