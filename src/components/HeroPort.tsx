import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Compass, Cpu, Sparkles, Truck, RefreshCw } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface HeroPortProps {
  theme: ThemeMode;
  onOpenQuickStart: () => void;
  onScrollToGame: () => void;
}

export const HeroPort: React.FC<HeroPortProps> = ({ theme, onOpenQuickStart, onScrollToGame }) => {
  // Interactive Port State
  const [shipPosition, setShipPosition] = useState(15);
  const [craneHoist, setCraneHoist] = useState(false);
  const [truckX, setTruckX] = useState(20);
  const [weatherMode, setWeatherMode] = useState<'calm' | 'busy'>('busy');
  const [activeContainersCount, setActiveContainersCount] = useState(1420);

  // Animated harbor loop
  useEffect(() => {
    const interval = setInterval(() => {
      setShipPosition((prev) => (prev > 95 ? -25 : prev + 0.15));
      setTruckX((prev) => (prev > 85 ? -10 : prev + 0.35));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Periodic crane motion
  useEffect(() => {
    const craneInterval = setInterval(() => {
      setCraneHoist((prev) => !prev);
      setActiveContainersCount((prev) => prev + 1);
    }, 4500);

    return () => clearInterval(craneInterval);
  }, []);

  const handleManualHoist = () => {
    soundManager.playClick();
    setCraneHoist(!craneHoist);
    setActiveContainersCount((c) => c + 1);
  };

  const handleResetShip = () => {
    soundManager.playClick();
    setShipPosition(0);
  };

  return (
    <section
      id="hero-digital-port"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden"
      style={{
        background:
          theme === 'day'
            ? 'linear-gradient(180deg, #f7f9ff 0%, #eef2ff 60%, #dbe4ff 100%)'
            : theme === 'signal'
            ? 'linear-gradient(180deg, #060314 0%, #160e3b 55%, #291666 100%)'
            : 'linear-gradient(180deg, #0a071b 0%, #120d2e 55%, #1a1340 100%)',
      }}
    >
      {/* Background Subtle Tech Grid & Harbor Coordinate Markings */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--border-strong) 1px, transparent 0)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* Top Floating Port Metadata Badge & Coordinates */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono mb-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-xs"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-semibold text-[11px] tracking-wider uppercase">
              PORT TERMINAL A-04 • LIVE AI ROUTING ACTIVE
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[11px] opacity-80" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> 51.9244° N, 4.4777° E (Rotterdam Hub)
            </span>
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-sky-400" /> Latency: 32ms
            </span>
            <span>Tide: +1.2m</span>
          </div>
        </div>

        {/* Hero Main Copy: Editorial Typography & High-End Visual Balance */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold font-mono uppercase tracking-widest mb-4 border"
            style={{
              backgroundColor: 'var(--badge-bg)',
              color: 'var(--badge-text)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <Sparkles className="w-3 h-3" />
            The Intelligent Port for Modern Logistics
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.06] mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            THE INTELLIGENT LAYER <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  theme === 'day'
                    ? 'linear-gradient(90deg, #0284c7, #0369a1, #f97316)'
                    : theme === 'night'
                    ? 'linear-gradient(90deg, #38bdf8, #818cf8, #fb923c)'
                    : 'linear-gradient(90deg, #06b6d4, #ff5757, #facc15)',
              }}
            >
              FOR LOGISTICS.
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl font-normal leading-relaxed max-w-2xl mb-8"
            style={{ color: 'var(--text-secondary)' }}
          >
            Zineps orchestrates merchants, global carriers, and 3PL terminals into a unified digital port.
            Automate carrier selection, generate compliant manifests, eliminate shipping errors, and reduce logistics overhead by up to 34%.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              id="hero-cta-primary"
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenQuickStart();
              }}
              className="px-7 py-3.5 rounded-full text-sm font-extrabold tracking-wide transition-all duration-300 hover:scale-105 shadow-md flex items-center gap-2 cursor-pointer hover:brightness-105"
              style={{
                backgroundColor: 'var(--accent-primary, #F4F754)',
                color: 'var(--accent-primary-contrast, #0a071b)',
                boxShadow: 'var(--glow-effect)',
              }}
            >
              <span>START SHIPPING</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              id="hero-cta-secondary"
              href="#platform"
              onClick={() => soundManager.playClick()}
              className="px-6 py-3.5 rounded-full text-sm font-bold tracking-wide border transition-all duration-200 hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
              }}
            >
              EXPLORE PLATFORM
            </a>

            <button
              id="hero-cta-game"
              type="button"
              onClick={() => {
                soundManager.playClick();
                onScrollToGame();
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-mono font-bold tracking-wider uppercase border transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--accent-secondary)',
              }}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>PLAY SHIPMENT SIMULATOR</span>
            </button>
          </div>

          {/* Interactive Port Control Pill Bar */}
          <div
            className="inline-flex flex-wrap items-center gap-2 sm:gap-4 p-2 rounded-2xl border backdrop-blur-md"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <span className="text-[11px] font-mono font-semibold uppercase px-2" style={{ color: 'var(--text-muted)' }}>
              Terminal Sandbox:
            </span>

            <button
              id="port-btn-hoist"
              type="button"
              onClick={handleManualHoist}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium border flex items-center gap-1.5 transition-all hover:scale-105"
              style={{
                backgroundColor: craneHoist ? 'var(--badge-bg)' : 'var(--bg-surface-elevated)',
                borderColor: craneHoist ? 'var(--accent-primary)' : 'var(--border-subtle)',
                color: craneHoist ? 'var(--accent-primary)' : 'var(--text-secondary)',
              }}
            >
              <RefreshCw className={`w-3 h-3 ${craneHoist ? 'animate-spin' : ''}`} />
              <span>{craneHoist ? 'Crane: Lowering' : 'Trigger Crane Hoist'}</span>
            </button>

            <button
              id="port-btn-ship-reset"
              type="button"
              onClick={handleResetShip}
              className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium border transition-all hover:scale-105"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              Dock Approaching Ship
            </button>

            <div className="text-[11px] font-mono px-2 py-1 rounded-md bg-slate-500/10 font-medium" style={{ color: 'var(--text-muted)' }}>
              Containers Moved: <span className="font-bold text-sky-500">{activeContainersCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* THE LIVING DIGITAL PORT SCENE: Responsive SVG / Canvas Harbor Composition */}
      <div className="relative w-full mt-6 lg:mt-8 pt-4 overflow-hidden border-t" style={{ borderColor: 'var(--border-subtle)' }}>
        {/* Harbor Sky / Distant Terminal Horizon */}
        <div className="relative w-full h-64 sm:h-72 md:h-88 lg:h-96">
          <svg
            className="w-full h-full preserve-3d"
            viewBox="0 0 1440 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMax meet"
          >
            <defs>
              {/* Water Gradients */}
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={theme === 'day' ? '#4cc9f0' : theme === 'signal' ? '#f72585' : '#3a0ca3'} />
                <stop offset="40%" stopColor={theme === 'day' ? '#4361ee' : theme === 'signal' ? '#7209b7' : '#1a1340'} />
                <stop offset="100%" stopColor={theme === 'day' ? '#3a0ca3' : theme === 'signal' ? '#060314' : '#0a071b'} />
              </linearGradient>

              {/* Crane Steel Gradient */}
              <linearGradient id="craneSteelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffba08" />
                <stop offset="100%" stopColor="#7209b7" />
              </linearGradient>

              {/* Night Glow Filter */}
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Distant Skyline / Terminal Silhouettes */}
            <g opacity={theme === 'day' ? '0.25' : '0.45'}>
              <rect x="80" y="160" width="120" height="70" fill="currentColor" className="text-slate-400" rx="4" />
              <rect x="220" y="140" width="160" height="90" fill="currentColor" className="text-slate-400" rx="4" />
              <rect x="400" y="170" width="80" height="60" fill="currentColor" className="text-slate-400" rx="2" />
              {/* Distant Wind Turbines */}
              <line x1="120" y1="120" x2="120" y2="160" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
              <line x1="280" y1="100" x2="280" y2="140" stroke="currentColor" strokeWidth="2" className="text-slate-400" />
            </g>

            {/* DOCK / QUAY STRUCTURE (Left and Central Terminal) */}
            <rect x="0" y="220" width="620" height="75" fill={theme === 'day' ? '#64748b' : '#120d2e'} />
            <rect x="0" y="215" width="620" height="6" fill="#ffba08" strokeDasharray="16 12" strokeWidth="1" />
            <rect x="0" y="295" width="620" height="105" fill={theme === 'day' ? '#334155' : '#0a071b'} />

            {/* Dock Bollards */}
            {[40, 140, 240, 340, 440, 540].map((bx) => (
              <g key={bx}>
                <rect x={bx} y={212} width="12" height="8" rx="2" fill="#0a071b" />
                <circle cx={bx + 6} cy={212} r="4" fill="#cbd5e1" />
              </g>
            ))}

            {/* STACKED SHIPPING CONTAINERS ON DOCK - Applied Palette */}
            {/* Column 1 */}
            <rect x="60" y="175" width="48" height="20" rx="2" fill="#f72585" stroke="#ffffff" strokeWidth="0.5" />
            <text x="68" y="189" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">DPD</text>
            <rect x="60" y="153" width="48" height="20" rx="2" fill="#4361ee" stroke="#ffffff" strokeWidth="0.5" />
            <text x="66" y="167" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">ZINEPS</text>
            <rect x="60" y="131" width="48" height="20" rx="2" fill="#ffba08" stroke="#ffffff" strokeWidth="0.5" />
            <text x="68" y="145" fill="#000000" fontSize="8" fontFamily="monospace" fontWeight="bold">DHL</text>

            {/* Column 2 */}
            <rect x="114" y="175" width="48" height="20" rx="2" fill="#4cc9f0" stroke="#ffffff" strokeWidth="0.5" />
            <text x="122" y="189" fill="#0a071b" fontSize="8" fontFamily="monospace" fontWeight="bold">GLS</text>
            <rect x="114" y="153" width="48" height="20" rx="2" fill="#7209b7" stroke="#ffffff" strokeWidth="0.5" />
            <text x="120" y="167" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">FEDEX</text>

            {/* Column 3 */}
            <rect x="168" y="175" width="48" height="20" rx="2" fill="#3a0ca3" stroke="#ffffff" strokeWidth="0.5" />
            <text x="174" y="189" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">UPS</text>
            <rect x="168" y="153" width="48" height="20" rx="2" fill="#f72585" stroke="#ffffff" strokeWidth="0.5" />
            <text x="174" y="167" fill="#ffffff" fontSize="8" fontFamily="monospace" fontWeight="bold">POSTNL</text>

            {/* MOVING TERMINAL TRUCK WITH CONTAINER */}
            <g transform={`translate(${truckX * 5}, 200)`} className="transition-transform duration-75">
              {/* Truck Cabin */}
              <rect x="52" y="4" width="22" height="15" rx="3" fill="#ffffff" stroke="#334155" strokeWidth="1" />
              <rect x="62" y="7" width="10" height="7" rx="1" fill="#4cc9f0" />
              {/* Wheels */}
              <circle cx="12" cy="21" r="4" fill="#0a071b" />
              <circle cx="28" cy="21" r="4" fill="#0a071b" />
              <circle cx="64" cy="21" r="4" fill="#0a071b" />
              {/* Container on flatbed */}
              <rect x="4" y="0" width="46" height="17" rx="2" fill="#f72585" stroke="#ffffff" strokeWidth="0.5" />
              <text x="8" y="12" fill="#ffffff" fontSize="7" fontFamily="monospace" fontWeight="bold">ZINEPS AI</text>
              {/* Headlight beam */}
              <polygon points="74,12 110,6 110,22 74,16" fill="#ffba08" opacity={theme !== 'day' ? '0.35' : '0.12'} />
            </g>

            {/* GIANT SHIP-TO-SHORE GANTRY CRANE (Center Dock) */}
            <g id="gantry-crane-1" transform="translate(380, 50)">
              {/* Crane Legs */}
              <line x1="20" y1="165" x2="50" y2="40" stroke="#ffba08" strokeWidth="7" strokeLinecap="round" />
              <line x1="120" y1="165" x2="90" y2="40" stroke="#ffba08" strokeWidth="7" strokeLinecap="round" />
              {/* Structural Cross Bracing */}
              <line x1="30" y1="120" x2="110" y2="120" stroke="#7209b7" strokeWidth="3" />
              <line x1="30" y1="120" x2="90" y2="70" stroke="#7209b7" strokeWidth="2" strokeDasharray="4 2" />
              <line x1="110" y1="120" x2="50" y2="70" stroke="#7209b7" strokeWidth="2" strokeDasharray="4 2" />
              {/* Operator Cabin */}
              <rect x="58" y="28" width="24" height="16" rx="2" fill="#120d2e" />
              <rect x="62" y="32" width="10" height="7" rx="1" fill="#4cc9f0" />
              {/* Crane Boom / Horizontal Jib extending over water */}
              <rect x="0" y="36" width="280" height="12" rx="2" fill="#ffba08" />
              <polygon points="0,36 40,0 120,36" fill="none" stroke="#7209b7" strokeWidth="3" />
              <line x1="40" y1="0" x2="270" y2="36" stroke="#4cc9f0" strokeWidth="2" />

              {/* MOVING TROLLEY & HOIST CABLE WITH CONTAINER */}
              <g
                transform={`translate(${craneHoist ? 160 : 210}, 44)`}
                className="transition-transform duration-1000 ease-in-out"
              >
                {/* Trolley Box */}
                <rect x="0" y="0" width="18" height="8" rx="1" fill="#0a071b" />
                {/* Cables */}
                <line x1="4" y1="8" x2="4" y2={craneHoist ? 115 : 65} stroke="#7209b7" strokeWidth="1.5" />
                <line x1="14" y1="8" x2="14" y2={craneHoist ? 115 : 65} stroke="#7209b7" strokeWidth="1.5" />
                {/* Spreader & Suspended Container */}
                <g transform={`translate(-14, ${craneHoist ? 115 : 65})`}>
                  <rect x="0" y="0" width="46" height="4" fill="#0a071b" rx="1" />
                  <rect x="2" y="4" width="42" height="18" rx="2" fill="#4361ee" stroke="#ffffff" strokeWidth="0.8" />
                  <text x="6" y="16" fill="#ffffff" fontSize="7" fontFamily="monospace" fontWeight="bold">ZINEPS #09</text>
                  {/* Warning Strobe Light on Crane Spreader */}
                  <circle cx="23" cy="2" r="2" fill="#f72585" className="animate-ping" />
                </g>
              </g>
            </g>

            {/* HARBOR WATER (Right / Lower Area) */}
            <rect x="580" y="215" width="860" height="185" fill="url(#waterGrad)" />

            {/* Water Wave Highlights & Current Lines */}
            <g opacity="0.6">
              <path
                d="M580 230 Q 720 225, 860 230 T 1140 230 T 1440 230"
                stroke="#ffffff"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
                className="animate-pulse"
              />
              <path
                d="M600 250 Q 780 245, 960 250 T 1320 250"
                stroke="#ffffff"
                strokeWidth="1"
                fill="none"
                opacity="0.25"
              />
              <path
                d="M640 280 Q 820 275, 1020 280 T 1400 280"
                stroke="#ffffff"
                strokeWidth="1.2"
                fill="none"
                opacity="0.2"
              />
              <path
                d="M620 320 Q 840 315, 1080 320 T 1440 320"
                stroke="#ffffff"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              />
            </g>

            {/* BUOY WITH FLASHING LIGHT */}
            <g transform="translate(1320, 245)">
              <circle cx="10" cy="18" r="8" fill="#ef4444" />
              <line x1="10" y1="18" x2="10" y2="4" stroke="#0f172a" strokeWidth="2" />
              <circle cx="10" cy="4" r="3" fill="#fbbf24" className="animate-ping" />
              <text x="2" y="32" fill="#ffffff" fontSize="7" fontFamily="monospace" opacity="0.7">BY-01</text>
            </g>

            {/* GIANT CONTAINER SHIP "ZINEPS VOYAGER" (Cruising across harbor) */}
            <g
              id="container-ship"
              transform={`translate(${580 + (shipPosition * 7)}, 165)`}
              className="transition-transform duration-75"
            >
              {/* Ship Wake Ripples in Water */}
              <path
                d="M -30,65 Q -80,75 -140,85"
                stroke="#ffffff"
                strokeWidth="3"
                fill="none"
                opacity="0.35"
                strokeLinecap="round"
              />
              <path
                d="M 120,68 Q 20,80 -60,95"
                stroke="#ffffff"
                strokeWidth="2"
                fill="none"
                opacity="0.25"
              />

              {/* Ship Main Hull */}
              <path
                d="M 0,38 L 24,68 L 220,68 L 250,38 Z"
                fill={theme === 'day' ? '#1e293b' : '#0a101f'}
                stroke={theme === 'day' ? '#334155' : '#1e293b'}
                strokeWidth="1.5"
              />
              {/* Red Antifouling Lower Hull Strip */}
              <path d="M 16,58 L 24,68 L 220,68 L 232,58 Z" fill="#f72585" />

              {/* Ship Bow Wave */}
              <circle cx="248" cy="48" r="4" fill="#4cc9f0" opacity="0.6" className="animate-ping" />

              {/* STACKED CONTAINER CARGO ON DECK - Palette Coordinated */}
              {/* Tier 1 */}
              <rect x="36" y="24" width="34" height="14" rx="1.5" fill="#f72585" stroke="#ffffff" strokeWidth="0.4" />
              <rect x="72" y="24" width="34" height="14" rx="1.5" fill="#4361ee" stroke="#ffffff" strokeWidth="0.4" />
              <rect x="108" y="24" width="34" height="14" rx="1.5" fill="#4cc9f0" stroke="#0a071b" strokeWidth="0.4" />
              <rect x="144" y="24" width="34" height="14" rx="1.5" fill="#ffba08" stroke="#0a071b" strokeWidth="0.4" />
              {/* Tier 2 */}
              <rect x="38" y="10" width="34" height="14" rx="1.5" fill="#3a0ca3" stroke="#ffffff" strokeWidth="0.4" />
              <rect x="74" y="10" width="34" height="14" rx="1.5" fill="#f72585" stroke="#ffffff" strokeWidth="0.4" />
              <rect x="110" y="10" width="34" height="14" rx="1.5" fill="#7209b7" stroke="#ffffff" strokeWidth="0.4" />
              {/* Tier 3 */}
              <rect x="56" y="-3" width="34" height="13" rx="1.5" fill="#4361ee" stroke="#ffffff" strokeWidth="0.4" />
              <text x="60" y="6" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="bold">ZINEPS</text>
              <rect x="92" y="-3" width="34" height="13" rx="1.5" fill="#4cc9f0" stroke="#0a071b" strokeWidth="0.4" />

              {/* Ship Superstructure / Bridge */}
              <rect x="182" y="6" width="36" height="32" rx="2" fill="#ffffff" stroke="#7209b7" strokeWidth="1" />
              {/* Bridge Windows */}
              <rect x="186" y="10" width="28" height="6" rx="1" fill="#4cc9f0" />
              {/* Radar Mast & Antenna */}
              <line x1="200" y1="6" x2="200" y2="-8" stroke="#3a0ca3" strokeWidth="2" />
              <ellipse cx="200" cy="-8" rx="8" ry="2" fill="#4cc9f0" className="animate-radar origin-center" />
              {/* Exhaust Funnel */}
              <rect x="194" y="-2" width="10" height="8" rx="1" fill="#f72585" />
              <circle cx="199" cy="-6" r="3" fill="#ffba08" opacity="0.6" className="animate-ping" />

              {/* Ship Name Plate on Hull */}
              <text x="80" y="54" fill="#f8fafc" fontSize="8" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
                ZINEPS VOYAGER • ROTTERDAM
              </text>
            </g>
          </svg>
        </div>

        {/* Live Port Telemetry Ticker Strip */}
        <div
          className="w-full py-2.5 px-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono border-t"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)',
            color: 'var(--text-secondary)',
          }}
        >
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              TERMINAL 100% DISPATCHED
            </span>
            <span className="hidden sm:inline" style={{ color: 'var(--text-muted)' }}>|</span>
            <span className="hidden sm:flex items-center gap-1">
              <Truck className="w-3.5 h-3.5" /> Fleet Capacity: 94.2%
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <span>Carrier SLA Index: <strong className="text-sky-500">99.4%</strong></span>
            <span>Avg Label Generation: <strong className="text-emerald-500">48ms</strong></span>
            <span className="hidden md:inline">Next Arrival: <strong>Z-704 in 14m</strong></span>
          </div>
        </div>
      </div>
    </section>
  );
};
