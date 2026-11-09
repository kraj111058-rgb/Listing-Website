"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";
import IndiaMap from "@svg-maps/india";

interface CityItem {
  name: string;
  x: number; // coordinate in 612 x 696 viewBox
  y: number;
  listings: number;
  topCategory: string;
}

const MAP_WIDTH = 612;
const MAP_HEIGHT = 696;

// Major cities precisely positioned on India's geographic grid (612x696)
const CITIES: CityItem[] = [
  { name: "Ahmedabad", x: 110, y: 350, listings: 690, topCategory: "Gyms" },
  { name: "Mumbai", x: 132, y: 435, listings: 1620, topCategory: "IT Services" },
  { name: "Delhi", x: 186, y: 210, listings: 1480, topCategory: "Restaurants" },
  { name: "Jaipur", x: 160, y: 255, listings: 520, topCategory: "Hotels" },
  { name: "Hyderabad", x: 237, y: 460, listings: 980, topCategory: "Real Estate" },
  { name: "Bengaluru", x: 200, y: 565, listings: 1210, topCategory: "Coaching" },
  { name: "Chennai", x: 250, y: 560, listings: 860, topCategory: "Doctors" },
  { name: "Kolkata", x: 385, y: 375, listings: 740, topCategory: "Hotels" },
];

const CONNECTIONS: [number, number][] = [
  [2, 0], // Delhi - Ahmedabad
  [2, 1], // Delhi - Mumbai
  [2, 7], // Delhi - Kolkata
  [2, 3], // Delhi - Jaipur
  [3, 0], // Jaipur - Ahmedabad
  [0, 1], // Ahmedabad - Mumbai
  [1, 4], // Mumbai - Hyderabad
  [4, 5], // Hyderabad - Bengaluru
  [5, 6], // Bengaluru - Chennai
  [4, 7], // Hyderabad - Kolkata
];

interface HeroIndiaMapProps {
  onSelectCity?: (cityName: string) => void;
}

export function HeroIndiaMap({ onSelectCity }: HeroIndiaMapProps) {
  const [activeCityIndex, setActiveCityIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through cities smoothly every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveCityIndex((prev) => (prev + 1) % CITIES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const activeCity = CITIES[activeCityIndex];
  const activeLeftPct = (activeCity.x / MAP_WIDTH) * 100;
  const activeTopPct = (activeCity.y / MAP_HEIGHT) * 100;

  // Locations array with id, name and real GIS path
  const locations: Array<{ id: string; name: string; path: string }> =
    IndiaMap?.locations || [];

  return (
    <div
      className="relative w-full max-w-[560px] mx-auto aspect-[612/696] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Keyframes for Continuous Flowing Dashed Lines */}
      <style>{`
        @keyframes networkFlow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -32;
          }
        }
        .network-flowing-line {
          stroke-dasharray: 6 6;
          animation: networkFlow 2.6s linear infinite;
        }
      `}</style>

      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-4 bg-gradient-to-tr from-indigo-300/30 via-purple-300/25 to-fuchsia-300/20 blur-[90px] rounded-full pointer-events-none -z-10" />

      {/* Official Vector SVG Map of India with GIS State Borders & Halftone Texture */}
      <svg
        className="w-full h-full overflow-visible drop-shadow-[0_12px_32px_rgba(79,45,224,0.12)]"
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      >
        <defs>
          {/* Subtle State Gradient Fill */}
          <linearGradient id="stateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ede9fe" stopOpacity="0.88" />
            <stop offset="50%" stopColor="#f3e8ff" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.9" />
          </linearGradient>

          {/* Halftone Dot Grid Pattern */}
          <pattern
            id="indiaDots"
            x="0"
            y="0"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.3" fill="#7c3aed" fillOpacity="0.32" />
          </pattern>

          {/* Primary Color Gradient for Connecting Network Lines */}
          <linearGradient id="primaryFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>

          {/* Active Pin Gradient */}
          <linearGradient id="activePinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>

          {/* Idle Pin Gradient */}
          <linearGradient id="idlePinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* 1. All Authentic Indian States with Crisp Primary-tinted GIS Borders */}
        <g>
          {locations.map((loc) => (
            <path
              key={loc.id}
              id={loc.id}
              d={loc.path}
              fill="url(#stateGrad)"
              stroke="rgba(99, 102, 241, 0.45)"
              strokeWidth="0.85"
              strokeLinejoin="round"
              strokeLinecap="round"
              className="transition-colors duration-200 hover:fill-indigo-100/90"
            >
              <title>{loc.name}</title>
            </path>
          ))}
        </g>

        {/* 2. Dotted Halftone Pattern Overlay across States */}
        <g pointerEvents="none">
          {locations.map((loc) => (
            <path
              key={`dot-${loc.id}`}
              d={loc.path}
              fill="url(#indiaDots)"
            />
          ))}
        </g>

        {/* 3. Primary Color Connecting Lines with Continuous Moving Animation */}
        <g pointerEvents="none">
          {CONNECTIONS.map(([a, b], idx) => {
            const from = CITIES[a];
            const to = CITIES[b];
            const mx = (from.x + to.x) / 2;
            const my = (from.y + to.y) / 2 - 18;

            return (
              <path
                key={idx}
                d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
                fill="none"
                stroke="url(#primaryFlowGrad)"
                strokeWidth="1.6"
                className="network-flowing-line opacity-85"
              />
            );
          })}
        </g>
      </svg>

      {/* Smooth Dual-Ring Radar Pulse on Active City */}
      <div
        className="absolute pointer-events-none z-10 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
        style={{
          left: `${activeLeftPct}%`,
          top: `${activeTopPct}%`,
        }}
      >
        <span className="absolute -inset-5 rounded-full border-2 border-indigo-500/50 animate-ping" />
        <span className="absolute -inset-2.5 rounded-full bg-indigo-500/25 animate-pulse" />
      </div>

      {/* Interactive City Pins with Upright SVG Teardrop Icon */}
      {CITIES.map((city, idx) => {
        const isActive = idx === activeCityIndex;
        const leftPct = (city.x / MAP_WIDTH) * 100;
        const topPct = (city.y / MAP_HEIGHT) * 100;

        return (
          <button
            key={city.name}
            type="button"
            onClick={() => {
              setActiveCityIndex(idx);
              onSelectCity?.(city.name);
            }}
            onMouseEnter={() => {
              setActiveCityIndex(idx);
              setIsPaused(true);
            }}
            onMouseLeave={() => setIsPaused(false)}
            className="absolute -translate-x-1/2 -translate-y-full cursor-pointer p-0 border-0 bg-transparent flex flex-col items-center transition-transform duration-300 group"
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              zIndex: isActive ? 35 : 25,
            }}
          >
            {/* Real Upright SVG Map Pin */}
            <div
              className={`transition-all duration-300 ${
                isActive
                  ? "scale-110 sm:scale-125 -translate-y-0.5 sm:-translate-y-1 drop-shadow-[0_8px_16px_rgba(79,45,224,0.45)]"
                  : "group-hover:scale-110 drop-shadow-[0_4px_10px_rgba(124,77,255,0.3)]"
              }`}
            >
              <svg className="w-5 h-6 sm:w-6 sm:h-7" viewBox="0 0 24 28" fill="none">
                <path
                  d="M12 0C5.373 0 0 5.373 0 12C0 19.5 12 28 12 28C12 28 24 19.5 24 12C24 5.373 18.627 0 12 0Z"
                  fill={isActive ? "url(#activePinGrad)" : "url(#idlePinGrad)"}
                />
                <circle cx="12" cy="11" r="4" fill="#ffffff" />
              </svg>
            </div>

            {/* City Label Pill */}
            <span
              className={`text-[8.5px] sm:text-[10px] font-extrabold px-1.5 sm:px-2.5 py-0.5 rounded-full border whitespace-nowrap transition-all duration-200 -mt-0.5 ${
                isActive
                  ? "bg-slate-900 text-white border-slate-900 shadow-md scale-105"
                  : "bg-white/95 backdrop-blur-xs text-slate-800 border-slate-200/90 shadow-2xs group-hover:bg-indigo-50 group-hover:text-indigo-600"
              }`}
            >
              {city.name}
            </span>
          </button>
        );
      })}

      {/* Floating Active City Card: Compact padding & rounded-xl */}
      <div
        className="absolute z-40 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-2 sm:p-2.5 px-2.5 sm:px-3 shadow-lg shadow-indigo-950/10 w-[148px] sm:w-[172px] transition-all duration-500 ease-out pointer-events-none"
        style={{
          left: activeLeftPct > 48 ? `${Math.max(2, activeLeftPct - 31)}%` : `${Math.min(58, activeLeftPct + 4)}%`,
          top: `${Math.max(2, activeTopPct - 23)}%`,
        }}
      >
        <div className="flex items-center justify-between gap-1 leading-none">
          <span className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">
            {activeCity.name}
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="text-[9.5px] sm:text-[10.5px] text-slate-600 mt-1 font-semibold truncate">
          {activeCity.listings.toLocaleString("en-IN")} listings · {activeCity.topCategory}
        </div>

        <div className="flex items-center gap-1 mt-1 sm:mt-1.5 text-amber-500 leading-none">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={9} className="fill-amber-400 text-amber-400 sm:w-2.5 sm:h-2.5" />
            ))}
          </div>
          <span className="font-bold text-[9px] sm:text-[10px] text-slate-700 ml-0.5">4.8</span>
        </div>

        <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-[8.5px] sm:text-[9.5px] font-bold">
          <CheckCircle2 size={10} className="text-emerald-600 shrink-0" />
          <span>Verified Business</span>
        </div>
      </div>

      {/* Top-Right Card: Compact rounded-xl, crisp text */}
      <div className="absolute top-1 sm:top-2 right-0 sm:right-1 z-30 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-1.5 sm:p-2 px-2.5 sm:px-3 shadow-md shadow-slate-200/60 flex items-center gap-2 sm:gap-2.5 animate-float hover:shadow-lg transition-all">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-xs shrink-0">
          <TrendingUp size={15} strokeWidth={2.5} />
        </div>
        <div>
          <div className="flex items-center gap-1 sm:gap-1.5 leading-none">
            <span className="text-xs sm:text-base font-black text-slate-900">5,000+</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-[9px] sm:text-[10px] font-bold text-slate-500 tracking-tight mt-0.5">
            Active Listings
          </div>
        </div>
      </div>

      {/* Bottom-Right Card: Compact rounded-xl, clear text, perfectly positioned */}
      <div className="absolute bottom-2 sm:bottom-4 right-0 sm:right-1 z-30 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-1.5 sm:p-2 px-2.5 sm:px-3 shadow-md shadow-slate-200/60 flex items-center gap-2 sm:gap-2.5 animate-float-delayed hover:shadow-lg transition-all">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs shrink-0">
          <ShieldCheck size={15} strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-[11px] sm:text-sm font-black text-slate-900 leading-none">
            500+ Cities
          </div>
          <div className="text-[9px] sm:text-[10px] font-bold text-emerald-600 mt-0.5 flex items-center gap-1">
            <CheckCircle2 size={10} className="shrink-0" />
            <span>100% Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
