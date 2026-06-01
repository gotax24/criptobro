import { Link } from "react-router-dom";
import RedAndGreen from "../helpers/RedAndGreen";
import CambioEmoji from "../helpers/ChangeEmoji";
import FormatNumber from "../helpers/FormatNumber";

const Element = ({ id, symbol, name, priceUsd, change, rank }) => {
  return (
    <Link to={`/criptomonedas/${id}`} className="link-elemento">
      <div className="containerMain">
        <h1 className="tituloContainer">
          {name} #{Number(rank)}
        </h1>
        <h2 className="simbolo">{symbol}</h2>
        <p className="precio">{FormatNumber(Number(priceUsd).toFixed(2))}$</p>
        <p className={RedAndGreen(change)}>
          {change + "%" + CambioEmoji(change)}
        </p>
      </div>
    </Link>
  );
};

export default Element;
