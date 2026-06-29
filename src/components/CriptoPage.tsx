import { useParams } from "react-router-dom";
import { useState } from "react";
import { useCoinDetail } from "../api/coinDetail";
import { useCoinHistory } from "../api/coinHistory";
import CriptoInfo from "./CriptoInfo";
import CriptoChart from "./CriptoChart";
import Loading from "./Loading";
import "../css/CriptoPage.css";

const DAYS_OPTIONS = [
  { value: "1", label: "1 Dia" },
  { value: "7", label: "7 Dias" },
  { value: "30", label: "30 Dias" },
  { value: "1", label: "1 Ano" },
] as const;

const CriptoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [days, setDays] = useState<string>("1");

  const {
    data: coin,
    isLoading: loadingCoin,
    error: errorCoin,
  } = useCoinDetail(id);

  const { data: history, isLoading: loadingHistory } = useCoinHistory(id, days);

  if (loadingCoin || loadingHistory) return <Loading />;

  if (errorCoin) {
    return (
      <div className="container">
        <p className="error-message">Error: {errorCoin.message}</p>
      </div>
    );
  }

  return (
    <div className="container-main">
      <div className="filtros-superiores">
        <div className="filtro-tiempo">
          <label className="label-time">
            Rango de la gráfica:
            <select
              className="select-time"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            >
              {DAYS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="info-y-grafica">
        <div className="info-cripto">
          {coin && <CriptoInfo criptos={coin} />}
        </div>
        <div className="grafica-cripto">
          {history && <CriptoChart history={history} />}
        </div>
      </div>
    </div>
  );
};

export default CriptoPage;
