import dayjs from "dayjs";
import FormatNumber from "../../helpers/FormatNumber";
import PropTypes from "prop-types";

const CriptoHistory = ({ history }) => {
  return (
    <div className="div-history">
      <table className="history-table">
        <thead className="history-table-cabezal">
          <tr className="history-table-cabezal-fila">
            <th>Fecha</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody className="history-table-cuerpo">
          {history.map(({ time, priceUsd }) => (
            <tr key={time} className="history-table-cuerpo-fila">
              <td>{dayjs(time).format("DD-MM-YYYY")}</td>
              <td>{FormatNumber(Number(priceUsd))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

CriptoHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number.isRequired,
      priceUsd: PropTypes.string.isRequired,
    })
  ),
};
export default CriptoHistory;
