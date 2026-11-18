// components/CriptoGraph.jsx
// Gráfica de línea con Chart.js que muestra la evolución histórica del precio.
// Usa useMemo para evitar recalcular los datos en cada render y adapta el
// formato de fecha del eje X según el rango temporal seleccionado.

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
// Line es el componente React de react-chartjs-2 que envuelve Chart.js.

import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
// Registramos manualmente los módulos de Chart.js que vamos a utilizar.
// Chart.js funciona por tree-shaking; sin esto, la gráfica no renderiza.

import dayjs from "dayjs";
// dayjs formatea timestamps de forma ligera.

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const CriptoGraph = ({ history, days = "1" }) => {
  // Cuando el rango es de 1 día, CoinGecko devuelve puntos cada pocos minutos
  // del mismo día, por lo que mostramos la hora ("HH:mm"). En rangos mayores
  // mostramos mes y día ("MMM DD").
  const dateFormat = days === "1" ? "HH:mm" : "MMM DD";

  const data = useMemo(
    () => ({
      labels: history.map(({ timestamp }) =>
        dayjs(timestamp).format(dateFormat),
      ),
      datasets: [
        {
          label: "Precio en USD",
          data: history.map(({ price }) => price),
          // Datos del eje Y: precios.
          fill: true,
          backgroundColor: "rgba(255, 77, 106, 0.14)",
          borderColor: "#ff4d6a",
          pointBackgroundColor: "#ff4d6a",
          pointBorderColor: "#ffffff",
          pointRadius: 2,
          pointHoverRadius: 5,
          tension: 0.3,
          // tension suaviza la línea entre puntos.
        },
      ],
    }),
    [history, dateFormat],
    // Solo recalculamos data cuando cambia history o el formato de fecha.
  );

  const options = useMemo(
    () => ({
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 8,
            // Evita que se amontonen cientos de etiquetas en el eje X.
          },
        },
        y: { beginAtZero: false },
        // beginAtZero: false permite que el eje Y se ajuste al rango de precios.
      },
      responsive: true,
      maintainAspectRatio: false,
      // maintainAspectRatio: false deja que el contenedor defina la altura.
    }),
    [],
    // Las opciones no dependen de props; se crean una sola vez.
  );

  return (
    <div
      role="img"
      aria-label="Grafica de precios de la criptomoneda en el tiempo"
      style={{ height: "650px", width: "100%", minWidth: "350px" }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default CriptoGraph;
