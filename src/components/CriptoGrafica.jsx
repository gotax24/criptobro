import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
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
import PropTypes from "prop-types";

// Registra los elementos, escalas y plugins necesarios
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler // Filler para el relleno bajo la línea
);

const CriptoChart = ({ history }) => {
  // Prepara los datos para el gráfico
  const data = {
    labels: history.map(({ time }) => dayjs(time).format("MMM DD")), // Etiquetas en formato 'Mes Día'
    datasets: [
      {
        label: "Precio en USD",
        data: history.map(({ priceUsd }) => parseFloat(priceUsd)), // Datos de precios en número
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        tension: 0.3, // Suaviza la línea
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: false, // Permite que el gráfico se adapte al rango de precios
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Hace que el gráfico ocupe el 100% del contenedor
  };

  return (
    <div style={{ height: "650px", width: "100%" }}>
      <Line data={data} options={options} />
    </div>
  );
};

CriptoChart.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      time: PropTypes.number.isRequired,
      priceUsd: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CriptoChart;
