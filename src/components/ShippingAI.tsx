import React, { useState } from 'react';
import { Cpu, Check, Zap, Sparkles, ArrowRight, ShieldCheck, Leaf, Clock, DollarSign, Sliders } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface ShippingAIProps {
  theme: ThemeMode;
  onOpenQuickStart: () => void;
}

interface CarrierQuote {
  name: string;
  cost: number;
  currency: string;
  days: number;
  sla: number;
  carbonKg: number;
  isBest: boolean;
  reason: string;
}

const ORIGINS = ['Amsterdam 🇳🇱', 'Paris 🇫🇷', 'London 🇬🇧', 'Hamburg 🇩🇪', 'Milan 🇮🇹'];
const DESTINATIONS = ['Berlin 🇩🇪', 'Madrid 🇪🇸', 'Warsaw 🇵🇱', 'Stockholm 🇸🇪', 'Vienna 🇦🇹'];

export const ShippingAI: React.FC<ShippingAIProps> = ({ theme, onOpenQuickStart }) => {
  const [selectedOrigin, setSelectedOrigin] = useState(ORIGINS[0]);
  const [selectedDest, setSelectedDest] = useState(DESTINATIONS[0]);
  const [optimizationPriority, setOptimizationPriority] = useState<'balanced' | 'cheapest' | 'fastest' | 'green'>('balanced');
  const [weightKg, setWeightKg] = useState(1.5);
  const [isCalculating, setIsCalculating] = useState(false);

  // Dynamic quotes calculation based on user selections
  const calculateQuotes = (): CarrierQuote[] => {
    const baseMultiplier = weightKg * 1.8;

    const dhl: CarrierQuote = {
      name: 'DHL Express',
      cost: +(baseMultiplier * 2.3 + 1.2).toFixed(2),
      currency: '€',
      days: 0.9,
      sla: 99.4,
      carbonKg: +(weightKg * 0.42).toFixed(2),
      isBest: optimizationPriority === 'fastest',
      reason: 'Guaranteed 24h air hub connection',
    };

    const dpd: CarrierQuote = {
      name: 'DPD Priority',
      cost: +(baseMultiplier * 1.7 + 0.8).toFixed(2),
      currency: '€',
      days: 1.1,
      sla: 98.7,
      carbonKg: +(weightKg * 0.28).toFixed(2),
      isBest: optimizationPriority === 'balanced' || optimizationPriority === 'cheapest',
      reason: 'Optimal rate-to-SLA balance across EU road linehaul',
    };

    const ups: CarrierQuote = {
      name: 'UPS Standard',
      cost: +(baseMultiplier * 2.1 + 1.1).toFixed(2),
      currency: '€',
      days: 1.2,
      sla: 99.1,
      carbonKg: +(weightKg * 0.35).toFixed(2),
      isBest: false,
      reason: 'Strong commercial B2B corridor reliability',
    };

    const fedex: CarrierQuote = {
      name: 'FedEx Regional',
      cost: +(baseMultiplier * 2.4 + 1.4).toFixed(2),
      currency: '€',
      days: 1.0,
      sla: 98.9,
      carbonKg: +(weightKg * 0.38).toFixed(2),
      isBest: false,
      reason: 'Integrated customs pre-clearance',
    };

    const greenFleet: CarrierQuote = {
      name: 'PostNL GreenEV',
      cost: +(baseMultiplier * 1.9 + 0.9).toFixed(2),
      currency: '€',
      days: 1.5,
      sla: 97.9,
      carbonKg: +(weightKg * 0.12).toFixed(2),
      isBest: optimizationPriority === 'green',
      reason: '100% electrified terminal & cargo bike delivery',
    };

    const list = [dpd, dhl, ups, fedex, greenFleet];

    // Mark single best based on priority
    if (optimizationPriority === 'cheapest') {
      list.forEach((q) => (q.isBest = q.name === 'DPD Priority'));
    } else if (optimizationPriority === 'fastest') {
      list.forEach((q) => (q.isBest = q.name === 'DHL Express'));
    } else if (optimizationPriority === 'green') {
      list.forEach((q) => (q.isBest = q.name === 'PostNL GreenEV'));
    } else {
      list.forEach((q) => (q.isBest = q.name === 'DPD Priority'));
    }

    return list;
  };

  const quotes = calculateQuotes();
  const bestQuote = quotes.find((q) => q.isBest) || quotes[0];

  const handlePriorityChange = (priority: typeof optimizationPriority) => {
    soundManager.playClick();
    setIsCalculating(true);
    setOptimizationPriority(priority);
    setTimeout(() => setIsCalculating(false), 200);
  };

  return (
    <section
      id="shipping-ai"
      className="py-20 lg:py-28 relative overflow-hidden border-t"
      style={{
        backgroundColor: theme === 'day' ? '#0b1329' : '#030712',
        borderColor: 'var(--border-subtle)',
        color: '#f8fafc',
      }}
    >
      {/* Background Animated Radial Gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          backgroundColor: 'var(--accent-primary)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Headline */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-4 bg-sky-500/10 text-sky-400 border border-sky-500/30">
            <Cpu className="w-3.5 h-3.5" />
            THE MULTI-CARRIER BRAIN
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-4 text-white">
            THE PORT HAS <br />
            <span className="text-sky-400">A BRAIN.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Carrier rates fluctuate constantly. Hubs clog, weather shifts, and fuel surcharges drift.
            Zineps evaluates millions of data points every millisecond to dispatch each package via its mathematically optimal route.
          </p>
        </div>

        {/* Live Interactive AI Route Engine Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Controls & Parameter Sliders (4 Cols) */}
          <div className="lg:col-span-4 rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 font-mono text-xs">
              <span className="text-slate-400 uppercase font-bold flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-sky-400" /> ROUTE PARAMETERS
              </span>
              <span className="text-emerald-400 font-semibold">LIVE CALCULATOR</span>
            </div>

            {/* Origin & Destination Selectors */}
            <div className="space-y-4 mb-6 font-mono text-xs">
              <div>
                <label className="text-slate-400 uppercase font-semibold block mb-1.5">Origin Port / Warehouse</label>
                <select
                  id="ai-origin-select"
                  value={selectedOrigin}
                  onChange={(e) => {
                    soundManager.playClick();
                    setSelectedOrigin(e.target.value);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  {ORIGINS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-400 uppercase font-semibold block mb-1.5">Destination City</label>
                <select
                  id="ai-dest-select"
                  value={selectedDest}
                  onChange={(e) => {
                    soundManager.playClick();
                    setSelectedDest(e.target.value);
                  }}
                  className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              {/* Weight Slider */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-slate-400 uppercase font-semibold">Parcel Weight</label>
                  <span className="text-sky-400 font-bold">{weightKg} kg</span>
                </div>
                <input
                  id="ai-weight-slider"
                  type="range"
                  min="0.5"
                  max="15.0"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value))}
                  className="w-full accent-sky-500"
                />
              </div>
            </div>

            {/* Optimization Priority Mode */}
            <div className="pt-4 border-t border-slate-800">
              <label className="text-slate-400 uppercase font-mono text-xs font-semibold block mb-3">
                Optimization Objective
              </label>
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {[
                  { id: 'balanced', label: 'Balanced (AI)', icon: Zap },
                  { id: 'cheapest', label: 'Lowest Cost', icon: DollarSign },
                  { id: 'fastest', label: 'Max Speed', icon: Clock },
                  { id: 'green', label: 'Green Eco', icon: Leaf },
                ].map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = optimizationPriority === opt.id;
                  return (
                    <button
                      key={opt.id}
                      id={`ai-priority-${opt.id}`}
                      type="button"
                      onClick={() => handlePriorityChange(opt.id as typeof optimizationPriority)}
                      className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'bg-sky-500 text-white border-sky-400 font-bold shadow-md shadow-sky-500/20'
                          : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Carrier Benchmark & Optimal Recommendation (8 Cols) */}
          <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md flex flex-col justify-between">
            <div>
              {/* Header with Route Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    ACTIVE ROUTE CORRIDOR
                  </span>
                  <div className="flex items-center gap-2 text-xl font-bold text-white font-mono">
                    <span>{selectedOrigin.split(' ')[0]}</span>
                    <span className="text-sky-400">➔</span>
                    <span>{selectedDest.split(' ')[0]}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-normal">
                      {weightKg}kg Parcel
                    </span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase">Engine Evaluation</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1 justify-end">
                    <Sparkles className="w-3 h-3" /> 5 Carriers Evaluated in 38ms
                  </span>
                </div>
              </div>

              {/* Best Route Banner Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 border-2 border-sky-400/60 shadow-xl mb-6 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-400 text-slate-950 font-mono text-[11px] font-black uppercase mb-2">
                      <Check className="w-3 h-3 stroke-[3]" /> BEST ROUTE MATCH
                    </div>
                    <h3 className="text-2xl font-black text-white font-mono flex items-center gap-3">
                      {bestQuote.name}
                      <span className="text-sky-400 text-3xl font-extrabold">{bestQuote.currency}{bestQuote.cost}</span>
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 font-mono">
                      {bestQuote.reason}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 font-mono text-xs text-right">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Transit</span>
                      <span className="text-white font-bold text-sm">{bestQuote.days} days</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">SLA Index</span>
                      <span className="text-emerald-400 font-bold text-sm">{bestQuote.sla}%</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Carbon</span>
                      <span className="text-emerald-400 font-bold text-sm">{bestQuote.carbonKg}kg</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-Time Carrier Benchmark Comparison Table */}
              <div className="space-y-2 font-mono text-xs">
                <span className="text-slate-400 text-[11px] uppercase font-bold block mb-2">
                  Full Carrier Comparison Matrix:
                </span>

                {quotes.map((q) => (
                  <div
                    key={q.name}
                    className={`p-3.5 rounded-xl border flex flex-wrap items-center justify-between gap-3 transition-all duration-200 ${
                      q.isBest
                        ? 'bg-sky-500/10 border-sky-500/40 text-white font-semibold'
                        : 'bg-slate-800/40 border-slate-800/80 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          q.isBest ? 'bg-sky-400 animate-ping' : 'bg-slate-600'
                        }`}
                      />
                      <span className="font-bold text-white text-sm">{q.name}</span>
                    </div>

                    <div className="flex items-center gap-5">
                      <span>{q.days} days</span>
                      <span>SLA: {q.sla}%</span>
                      <span className="text-emerald-400">{q.carbonKg}kg CO₂</span>
                      <span className="text-base font-bold text-white min-w-16 text-right">
                        {q.currency}{q.cost}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA & Guarantee */}
            <div className="pt-6 border-t border-slate-800 mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                <span>Custom carrier rate card APIs fully supported</span>
              </div>

              <button
                id="shipping-ai-cta"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onOpenQuickStart();
                }}
                className="px-6 py-2.5 rounded-xl text-xs font-mono font-bold text-white bg-sky-500 hover:bg-sky-400 transition-transform active:scale-95 flex items-center gap-1.5"
              >
                <span>ENABLE AUTO-DISPATCH</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
