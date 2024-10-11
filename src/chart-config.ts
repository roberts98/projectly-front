import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";

export const colors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
];

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);
ChartJS.defaults.plugins.legend.position = "top";
ChartJS.defaults.datasets.pie.backgroundColor = colors;
ChartJS.defaults.datasets.line.borderColor = "#36A2EB";
