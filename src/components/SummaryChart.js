import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function SummaryChart({ transactions, maxHeight = 300 }) {
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount (₦)",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#4caf50", "#f44336"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `₦${context.parsed.y.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₦${value.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div
      style={{
        marginTop: "30px",
        height: maxHeight,
        position: "relative",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        Income vs Expense Summary
      </h3>
      <Bar data={data} options={options} />
    </div>
  );
}

export default SummaryChart;
