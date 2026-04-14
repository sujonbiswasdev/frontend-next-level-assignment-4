"use client";
import { MonthlyRevenue } from "@/types/stats.type";
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";

// Register Chart.js components only once
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const MonthlyLineChart = ({ stats }: { stats: MonthlyRevenue[] }) => {
  const chartRef = useRef(null);
  const [gradient, setGradient] = useState<CanvasGradient | null>(null);

  // Unique frosted-glass neon gradient, using the canvas context
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current as unknown as {
        ctx: CanvasRenderingContext2D;
      } | null;
      if (ctx) {
        // Unique multi-stop gradient for a professional look
        const grad = ctx.ctx.createLinearGradient(0, 0, 0, 340);
        grad.addColorStop(0, "rgba(34,211,238,0.59)");         // cyan-400
        grad.addColorStop(0.33, "rgba(16,185,129,0.33)");      // emerald-500
        grad.addColorStop(0.67, "rgba(110,231,183,0.19)");     // teal-200
        grad.addColorStop(1, "rgba(236,254,255,0.01)");        // sky-50
        setGradient(grad);
      }
    }
  }, []);

  const data = {
    labels: stats.map((item: MonthlyRevenue) => item.month),
    datasets: [
      {
        data: stats.map((item: MonthlyRevenue) => item.revenue),
        borderColor: "rgba(16,185,129,0.97)", // emerald-500
        backgroundColor: gradient || "rgba(16,185,129,0.19)",
        fill: true,
        tension: 0.48,
        borderWidth: 4,
        pointRadius: 4.5,
        pointBorderWidth: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#06b6d4", // cyan-500
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "#14b8a6", // teal-500
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 3,
        cubicInterpolationMode: "monotone",
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowBlur: 5,
        shadowColor: "rgba(34,211,238,0.08)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 20, left: 8, right: 18, bottom: 14 },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#081f1fef",
        titleFont: { size: 17, weight: "bold", family: "Inter, sans-serif" },
        bodyFont: { size: 14, weight: 500, family: "Inter, sans-serif" },
        padding: 12,
        borderColor: "#22d3ee", // cyan-400
        borderWidth: 1.4,
        cornerRadius: 10,
        caretPadding: 6,
        caretSize: 7,
        boxPadding: 5,
        shadowColor: "#0891b2aa",
        boxShadow: "0 2px 15px 0 #22d3ee33"
      },
      // custom plugin for subtle glow under the curve
      // will be automatically applied via Tailwind or parent
    },
    scales: {
      x: {
        grid: {
          color: "rgba(45,212,191,0.10)", // teal-400
          lineWidth: 1.2,
          borderDash: [2, 2],
          drawTicks: false,
        },
        ticks: {
          color: "#083344", // dark-cyan
          font: { size: 13, weight: "600", family: "Inter, sans-serif" },
          padding: 8,
        },
        title: {
          display: false,
        },
      },
      y: {
        grid: {
          color: "rgba(110,231,183,0.13)",
          borderDash: [3, 3],
          tickColor: "#2dd4bf55",
          lineWidth: 1,
        },
        min: 0,
        max: Math.max(
          320,
          ...stats.map((item: MonthlyRevenue) =>
            typeof item.revenue === "number" ? item.revenue : 0
          )
        ),
        ticks: {
          color: "#065f46b9", // emerald-800
          font: { size: 12, weight: "bold", family: "Inter, sans-serif" },
          padding: 10,
          callback: (value: any) => value === 0 ? "0" : value,
        },
      },
    },
    elements: {
      line: {
        borderCapStyle: "round",
        borderJoinStyle: "round",
      },
      point: {
        hoverRadius: 8,
        radius: 4.5,
      },
    },
    animation: {
      duration: 1200,
      easing: "easeInOutBack"
    },
  };

  return (
    <div
      className="w-full h-[320px] rounded-3xl bg-gradient-to-br from-white/70 via-blue-50/90 to-cyan-100/75 shadow-2xl shadow-cyan-100/50 ring-1 ring-emerald-200/40 hover:ring-2 hover:ring-cyan-400/50 transition-all overflow-hidden px-4 py-3
      relative after:pointer-events-none after:absolute after:inset-0 after:rounded-3xl after:bg-gradient-to-br after:from-cyan-400/5 after:to-emerald-100/5 after:z-10"
    >
      {/* Decorative accent: glassy neon glow bar at top */}
      <div className="absolute left-9 right-9 top-5 h-2 bg-gradient-to-r from-cyan-300/30 via-emerald-200/40 to-teal-200/50 blur-md rounded-full z-20 pointer-events-none" />
      <div className="relative z-30" style={{ height: "100%" }}>
        <Line
          ref={chartRef}
          data={data as import('chart.js').ChartData<'line', number[], string>}
          options={options as import('chart.js').ChartOptions<'line'>}
          height={300}
        />
  
      </div>
    </div>
  );
};

export default MonthlyLineChart;