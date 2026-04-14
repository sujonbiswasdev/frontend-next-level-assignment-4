"use client";

import { MonthlyRevenue } from "@/types/stats.type";
import React from "react";
import PieChart from "./PieChart";
import Curve from "./Curve";

/**
 * CurveChart displays the monthly earnings line chart in a visually pleasing card with a modern, translucent glassmorphism look.
 * Responsive, professional, and using color gradients, drop-shadows, and subtle glass accents for uniqueness.
 */
const CurveChart = ({ stats }: { stats: MonthlyRevenue[] }) => {
  return (
    <section
      className="
        h-full w-full p-4 rounded-2xl bg-gradient-to-br from-white/50 via-cyan-50/70 to-emerald-50/60
        shadow-[0_4px_24px_0_rgba(16,185,129,0.08)] relative overflow-hidden
        flex flex-col
        min-h-[280px] md:min-h-[340px]
      "
    >
      {/* Decorative glowing bar at the top */}
      <div className="absolute left-6 right-6 top-4 h-2 bg-gradient-to-r from-cyan-200/60 via-emerald-200/40 to-teal-200/60 blur-lg rounded-full z-10 pointer-events-none" />
      <div className="mb-3 flex items-center gap-2 z-20">
        <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 animate-pulse" />
        <h2 className="font-extrabold text-lg md:text-xl text-teal-900 tracking-wide drop-shadow-lg">
          Earnings Insights
        </h2>
      </div>
      {/* The chart */}
      <div className="flex-1 w-full relative z-20 flex items-center px-2 md:px-4">
        <Curve stats={stats as MonthlyRevenue[]} />
      </div>
      {/* Glow and glass overlays */}
      <span className="absolute -inset-1 rounded-2xl pointer-events-none bg-gradient-to-br from-cyan-200/10 to-emerald-100/15 blur-md" />
      <span className="absolute bottom-2 left-10 w-20 h-6 bg-emerald-300/10 blur-xl rounded-full" />
    </section>
  );
};
export { CurveChart };

/**
 * Displays the earning rate and its change over last month.
 * Unique design: glassy panel, vivid accent border, profit/loss badge, and adaptive for all breakpoints.
 */
interface EarningRateProps {
  earningRate: number;
  earningRateLastMonth: number;
}

const EarningRate: React.FC<EarningRateProps> = ({
  earningRate,
  earningRateLastMonth,
}) => {
  // Calculate percent change, guard against divide by zero
  const percentageChange =
    earningRateLastMonth === 0
      ? 0
      : ((earningRate - earningRateLastMonth) / Math.abs(earningRateLastMonth)) * 100;

  const isProfitUp = percentageChange >= 0;
  const formattedChange = Math.abs(percentageChange).toFixed(2);

  return (
    <section
      className={`
        h-full w-full px-6 py-5 flex flex-col justify-between gap-2
        rounded-2xl bg-gradient-to-tr from-emerald-50 via-cyan-50 to-white
        border-2 ${isProfitUp ? "border-emerald-400/50" : "border-rose-300/40"}
        shadow-xl shadow-cyan-100/30
        relative overflow-hidden
        transition-all
      `}
    >
      {/* Accent glow on top */}
      <div className="absolute right-7 top-2 w-20 h-6 bg-gradient-to-br from-emerald-200/30 to-cyan-100/30 blur-xl rounded-full pointer-events-none" />
      <div className="relative py-2">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-emerald-900 drop-shadow-sm flex items-end gap-1">
          {earningRate.toLocaleString()}
          <span className="text-base font-normal text-cyan-700/80 mb-1">taka</span>
        </h2>
        <span
          className={`
            inline-flex items-center gap-1 text-sm font-semibold my-2
            px-3 py-1 rounded-full
            ${isProfitUp
              ? "bg-emerald-100/60 text-emerald-700"
              : "bg-rose-50/80 text-rose-600"}
            shadow md:text-base
          `}
        >
          {/* Arrow icon, rotating down for loss */}
          <svg
            className={`w-5 h-5 ${isProfitUp ? "" : "rotate-180"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isProfitUp
                  ? "M5 10l7-7m0 0l7 7m-7-7v18"
                  : "M19 14l-7 7m0 0l-7-7m7 7V3"
              }
            />
          </svg>
          {isProfitUp ? "Higher" : "Lower"} by {formattedChange}% than last month
        </span>
        <p className="text-xs md:text-sm text-cyan-900/70">
          Compared to last month’s earnings:{" "}
          <strong>{earningRateLastMonth.toLocaleString()} taka</strong>
        </p>
      </div>
      <div className="mt-6 flex items-center justify-center w-full relative">
        {/* Pie Chart, capped 0-100 */}
        <PieChart
          percentage={Math.min(
            Math.max(
              Number(
                ((earningRate / (earningRateLastMonth || 1)) * 100).toFixed(0)
              ),
              0
            ),
            100
          )}
        />
        {/* Decorative floating bubble */}
        <span className="absolute left-2 top-0 w-3 h-3 bg-cyan-100/80 rounded-full blur-sm" />
      </div>
      {/* Gradient overlay bottom for effect */}
      <span className="absolute bottom-0 left-0 h-7 w-full bg-gradient-to-t from-emerald-100/35 to-transparent" />
    </section>
  );
};

/**
 * Responsive container combining EarningRate and CurveChart. 
 * Unique 3-column layout on large screens, stacked on mobile. 
 * Uses visually cohesive backgrounds and rounded glass cards.
 */
const Earnings = ({
  earningRate,
  stats,
}: {
  earningRate: number;
  stats: MonthlyRevenue[];
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-8 w-full">
      <div className="min-w-0 w-full">
        <EarningRate
          earningRate={earningRate}
          earningRateLastMonth={stats[11]?.revenue ?? 0}
        />
      </div>
      <div className="min-w-0 w-full lg:col-span-2 flex">
        <CurveChart stats={stats as MonthlyRevenue[]} />
      </div>
    </div>
  );
};
export default Earnings;