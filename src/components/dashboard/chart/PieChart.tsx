"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  percentage: number; // % value (0-100)
  amount?: number;    // achieved amount
  total?: number;     // total possible amount
}

const PieChart: React.FC<PieChartProps> = ({ percentage, amount, total }) => {
  const safeAmount = typeof amount === 'number' ? amount : undefined;
  const safeTotal = typeof total === 'number' ? total : undefined;

  // Color settings for more unique/professional design
  const mainColor = "rgba(16, 185, 129, 1)"; // emerald-500
  const accentColor = "rgba(8, 145, 178, 1)"; // cyan-600
  const bgTrack = "rgba(229, 231, 235, 0.15)"; // light glassy gray

  const gradientId = "pieGradient";

  // Chart Data (same logic, enhanced colors)
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [
          `url(#${gradientId})`, // SVG gradient for pro look
          bgTrack
        ],
        borderColor: [
          "rgba(8, 145, 178, 0.85)", // border accent
          bgTrack
        ],
        borderWidth: 3,
        cutout: "74%",
        rotation: -135,
        circumference: 270,
        hoverOffset: 4,
        // Extra shadow for achieved slice
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        shadowBlur: 18,
        shadowColor: mainColor,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    cutout: "74%",
    layout: { padding: { top: 8, bottom: 8, left: 0, right: 0 } },
    animation: {
      animateRotate: true,
      duration: 1200,
      easing: "easeOutQuart"
    }
  };

  return (
    <div
      className="
        relative mx-auto flex items-center justify-center isolate
        w-full max-w-[365px] min-h-[160px] min-w-[180px]
        sm:min-h-[170px] md:min-h-[200px] md:max-w-[330px] md:h-[222px]
        xl:max-w-[370px] xl:h-[240px]
        rounded-[28px] overflow-visible shadow-[0_4px_24px_-6px_#14b8a680,0_1.5px_6px_0_#0891b241]
        bg-gradient-to-br from-white/85 via-cyan-50/85 to-emerald-50/90
        ring-2 ring-emerald-100/40 hover:ring-cyan-300/60 transition-all
      "
    >
      {/* Custom SVG gradient for donut */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id={gradientId} x1="0" x2="90%" y1="0" y2="100%">
            <stop offset="0%" stopColor="#14b8a68e" />
            <stop offset="75%" stopColor="#06b6d463" />
            <stop offset="100%" stopColor="#2563eb4a" />
          </linearGradient>
        </defs>
      </svg>

      <Doughnut
        data={data as any}
        options={options as any}
        style={{
          zIndex: 2,
          // "half-float" illusion
          filter: "drop-shadow(0 4px 16px #14b8a63f)"
        }}
      />

      {/* Main Info overlay */}
      <div className="
        absolute inset-0 flex flex-col items-center justify-center pointer-events-none
        z-10
      ">
        <span className="
          text-[8vw] sm:text-[34px] md:text-[40px] lg:text-[48px] font-black
          bg-gradient-to-br from-emerald-500 via-cyan-600 to-blue-500
          text-transparent bg-clip-text drop-shadow-[0_2px_16px_rgba(34,197,94,0.16)]
          tracking-tight
          transition-all duration-300
        ">
          {percentage}%
        </span>
        <span
          className="
            flex items-end gap-1 text-[3.8vw] sm:text-[12px] md:text-base
            font-semibold tracking-widest
            text-emerald-800/75 dark:text-white/75 uppercase mt-1 drop-shadow
          "
        >
          {safeAmount !== undefined && safeTotal !== undefined ? (
            <>
              <span className="
                font-bold text-emerald-600 dark:text-emerald-200
                bg-emerald-50/60 dark:bg-teal-900/30 px-1.5 py-[2px] rounded-lg mx-1 ring-1 ring-emerald-200/30
              ">
                ৳&nbsp;{safeAmount.toLocaleString()}
              </span>
              <span className="mx-0.5 text-xs font-semibold text-cyan-800/70 dark:text-cyan-100/70">of</span>
              <span className="
                font-bold text-cyan-600 dark:text-cyan-200
                bg-gradient-to-l from-cyan-50/60 dark:from-teal-900/35 to-teal-100/55 px-1.5 py-[2px] rounded-lg ring-1 ring-cyan-100/25
              ">
                ৳&nbsp;{safeTotal.toLocaleString()}
              </span>
            </>
          ) : (
            <span
              className="
                font-semibold text-cyan-700 dark:text-cyan-200
                px-2 py-[3px] rounded-lg bg-teal-50/40 dark:bg-cyan-900/20
                ring-1 ring-cyan-100/15
              "
            >
              Progress
            </span>
          )}
        </span>
      </div>

      {/* Decorative layered gloss and neon border */}
      <div
        className="
          absolute -top-4 -left-4 w-[105%] h-[62%] 
          bg-gradient-to-b from-white/60 via-transparent to-transparent 
          rounded-t-[36px] blur-[2.5px] pointer-events-none
          z-0
        "
      />
      {/* Subtle neon halo ring */}
      <div
        className="absolute inset-0 m-auto w-[97%] h-[98%] rounded-full pointer-events-none z-0"
        style={{
          boxShadow:
            "0 0 36px 4px #14b8a621, 0 1.5px 9px 0 #06b6d459"
        }}
      />
      {/* Decorative dotted accent ring */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full z-0"
        aria-hidden="true"
      >
        <circle
          cx="50%"
          cy="54%"
          r="48%"
          fill="none"
          stroke="url(#pieGradient)"
          strokeWidth="3.5"
          strokeDasharray="7, 8"
          opacity="0.23"
        />
      </svg>
    </div>
  );
};

export default PieChart;