// components/CriptoPage.tsx
// Página de detalle de una criptomoneda.
// Combina la información general (CriptoInfo) con la gráfica histórica (CriptoGraph)
// y permite cambiar el rango temporal de la gráfica.

import { useParams } from "react-router-dom";
// useParams lee los parámetros dinámicos de la URL, en este caso :id.

import { useState } from "react";
import { useCoinDetail } from "../api/coinDetail";
import { useCoinHistory } from "../api/coinHistory";
import CriptoInfo from "./CriptoInfo";
import CriptoGraph from "./CriptoGraph";
import Loading from "./Loading";
import "../css/CriptoPage.css";

// Opciones de rango temporal para la gráfica.
// as const convierte el array en una tupla inmutable y los valores en literales.
const DAYS_OPTIONS = [
  { value: "1", label: "1 Dia" },
  { value: "7", label: "7 Dias" },
  { value: "30", label: "30 Dias" },
  { value: "365", label: "1 Año" },
] as const;

const CriptoPage = () => {
  // Extraemos el id de la URL. Tipamos con { id: string } para que TypeScript
  // sepa qué parámetros esperar.
  const { id } = useParams<{ id: string }>();
  const [days, setDays] = useState<string>("1");

  const {
    data: coin,
    isLoading: loadingCoin,
    error: errorCoin,
  } = useCoinDetail(id);

  const { data: history, isLoading: loadingHistory } = useCoinHistory(id, days);

  // Mostramos spinner mientras carga cualquiera de las dos queries.
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
        <div className="info-cripto">{coin && <CriptoInfo coin={coin} />}</div>
        <div className="grafica-cripto">
          {history && <CriptoGraph history={history} />}
        </div>
      </div>
    </div>
  );
};

export default CriptoPage;
