import { useParams } from "react-router-dom";
import { useState } from "react";
import useData from "../hooks/useData";
import CriptoInfo from "./CriptoInfo";
import Cargando from "./Cargando";
import "../css/CriptoPage.css";
import CriptoGrafica from "./CriptoGrafica";

const CriptoPage = () => {
  const params = useParams();
  const [time, setTime] = useState("");
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();

  const [criptos, cargandoCripto, errorCripto] = useData(
    `assets/${params.id}`,
    true
  );

  let url = `assets/${params.id}/history?interval=${time || "d1"}`;

  if (dateStart) {
    const startDate = new Date(dateStart).getTime();
    url += `&start=${startDate}`;
  }

  if (dateEnd) {
    const endDate = new Date(dateEnd).getTime();
    url += `&end=${endDate}`;
  }

  const [history, cargandoHistory, errorHistory] = useData(`${url}`, false);

  if (cargandoCripto || cargandoHistory) return <Cargando />;

  const handleDateStartChange = (e) => {
    setDateStart(e.target.value);
  };

  const handleDateEndChange = (e) => {
    setDateEnd(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  return (
    <div className="container-main">
      <div className="filtros-superiores">
        <div className="filtro-tiempo">
          <label className="label-time">
            Elige el tiempo de la gráfica:
            <select
              className="select-time"
              value={time}
              onChange={handleTimeChange}
            >
              {[
                { value: "", label: "Selecciona" },
                { value: "m1", label: "1 Minuto" },
                { value: "m5", label: "5 Minutos" },
                { value: "m15", label: "15 Minutos" },
                { value: "m30", label: "30 Minutos" },
                { value: "h1", label: "1 Hora" },
                { value: "h2", label: "2 Horas" },
                { value: "h6", label: "6 Horas" },
                { value: "h12", label: "12 Horas" },
                { value: "d1", label: "1 Dia" },
              ].map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="option-time"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="filtro-fechas">
          <label className="label-time">
            Elige el rango de fechas:
            <div className="fechas-container">
              <div className="fecha-input">
                <span>Desde:</span>
                <input
                  type="date"
                  value={dateStart || ""}
                  onChange={handleDateStartChange}
                />
              </div>
              <span className="fecha-separator">→</span>
              <div className="fecha-input">
                <span>Hasta:</span>
                <input
                  type="date"
                  value={dateEnd || ""}
                  onChange={handleDateEndChange}
                />
              </div>
            </div>
          </label>
        </div>
      </div>

      <div className="info-y-grafica">
        <div className="info-cripto">
          {criptos && <CriptoInfo criptos={criptos} />}
        </div>

        <div className="grafica-cripto">
          {history && <CriptoGrafica history={history} />}
        </div>
      </div>

      {(errorCripto || errorHistory) && (
        <div className="error-container">
          {errorCripto?.message ||
            errorHistory?.message ||
            "Ocurrió un error al cargar los datos."}
        </div>
      )}
    </div>
  );
};

export default CriptoPage;
