import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppSelector } from "../app/hook";



// Register components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const BarChart = () => {
    const {dashboard}=useAppSelector(state=>state.dashboard)
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
     const weeklyCompleted = days.map((day) => {
    const match = dashboard?.weeklyData?.find((item) => {
      const d = new Date(item.date);
      return d.toLocaleDateString("en-US", { weekday: "short" }) === day; // Help change date to day
    });

    return match?.completed ?? 0;
  });
  const data = {
    labels: ["Sun","Mon", "Tue", "Wed", "Thu", "Fri","Sat"],
    datasets: [
      {
        label: "Habits Completed",
        data: weeklyCompleted,
        backgroundColor: "black",
        borderRadius:6
      },
    ],
  };

  const options = {
    responsive: true,
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;