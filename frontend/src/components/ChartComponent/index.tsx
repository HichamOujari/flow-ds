import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ContentLoading from "../ContentLoading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

const labels = [
  "Jan",
  "Fév",
  "Mars",
  "Avr",
  "Mai",
  "Juin",
  "Jui",
  "Août",
  "Sep",
  "Oct",
  "Nov",
  "Déc",
];

const ChartComponent = ({ datasets }: any) => {
  return datasets ? (
    <Line
      options={options}
      data={{
        labels,
        datasets: Object.entries(datasets).map((dataset: any) => ({
          label: dataset[0],
          data: dataset[1],
          borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
          tension: 0.1,
        })),
      }}
    />
  ) : (
    <ContentLoading />
  );
};

export default ChartComponent;
