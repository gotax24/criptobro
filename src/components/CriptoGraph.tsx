// components/CriptoGraph.tsx
// Gráfica de línea con Chart.js que muestra la evolución histórica del precio.
// Usa useMemo para evitar recalcular los datos en cada render.

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

import type { CoinHistoryPoint } from "../types";

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

interface CriptoGraphProps {
  history: CoinHistoryPoint[];
}

const CriptoGraph = ({ history }: CriptoGraphProps) => {
  const data = useMemo(
    () => ({
      labels: history.map(({ timestamp }) => dayjs(timestamp).format("MMM DD")),
      // Etiquetas del eje X: fecha abreviada (ej. "Jul 06").
      datasets: [
        {
          label: "Precio en USD",
          data: history.map(({ price }) => price),
          // Datos del eje Y: precios.
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          tension: 0.3,
          // tension suaviza la línea entre puntos.
        },
      ],
    }),
    [history],
    // Solo recalculamos data cuando cambia history.
  );

  const options = useMemo(
    () => ({
      scales: {
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
