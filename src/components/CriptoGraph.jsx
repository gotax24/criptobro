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
          fill: true,
          backgroundColor: "rgba(255, 77, 106, 0.14)",
          borderColor: "#ff4d6a",
          pointBackgroundColor: "#ff4d6a",
          pointBorderColor: "#ffffff",
          pointRadius: 2,
          pointHoverRadius: 5,
          tension: 0.3,
        },
      ],
    }),
    [history, dateFormat],
  );

  const options = useMemo(
    () => ({
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 8,
          },
        },
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
