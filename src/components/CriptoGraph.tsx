import { useMemo } from "react";
import { Line } from "react-chartjs-2";
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
import dayjs from "dayjs";
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
      datasets: [
        {
          label: "Precio en USD",
          data: history.map(({ price }) => price),
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          tension: 0.3,
        },
      ],
    }),
    [history],
  );

  const options = useMemo(
    () => ({
      scales: {
        y: { beginAtZero: false },
      },
      responsive: true,
      maintainAspectRatio: false,
    }),
    [],
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
