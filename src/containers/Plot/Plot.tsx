import React, { useEffect, useState } from "react";
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
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PlotProps {
  name: string;
  lastValues: Array<{ timestamp: string; last: number }>;
}

const Plot: React.FC<PlotProps> = ({ name, lastValues }) => {
  const [data, setData] = useState({
    labels: lastValues.map((value) => value.timestamp),
    datasets: [
      {
        label: "Last Price",
        data: lastValues.map((value) => value.last),
        borderColor: "#007dc4",
        backgroundColor: "#007dc4",
        fill: true,
      },
    ],
  });

  useEffect(() => {
    // Update the graph when `lastValues` changes
    if (lastValues.length > 0) {
      setData({
        labels: lastValues.map((value) => value.timestamp),
        datasets: [
          {
            label: `Last Prices for ${name}`,
            data: lastValues.map((value) => value.last),
            borderColor: "#007dc4",
            backgroundColor: "#007dc4",
            fill: true,
          },
        ],
      });
    }
  }, [lastValues]);

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          beginAtZero: true, // Start from 0
          stepSize: 100, // Interval of 100
        },
      },
    },
  };

  return (
    <div style={{ width: "800px", height: "500px", margin: "0 auto" }}>
      <h3 style={{ marginTop: "100px" }}>
        {name} - Historical last simulated values
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default Plot;
