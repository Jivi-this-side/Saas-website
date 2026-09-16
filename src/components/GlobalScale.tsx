import React, { useState } from 'react';
import { Globe, ShieldCheck, MapPin, Compass, Navigation, ArrowUpRight, Anchor, Ship, Layers } from 'lucide-react';
import { ThemeMode } from '../types';

interface GlobalScaleProps {
  theme: ThemeMode;
}

interface HubInfo {
  id: string;
  name: string;
  country: string;
  coords: string;
  volume: string;
  status: string;
  x: number;
  y: number;
  terminalCode: string;
  vesselsInPort: number;
  avgTurnaround: string;
  callout: {
    dx: number;
    dy: number;
    textWidth: number;
  };
}

const GLOBAL_HUBS: HubInfo[] = [
  {
    id: 'rotterdam',
    name: 'Port of Rotterdam',
    country: 'Netherlands',
    coords: '51.92° N, 4.47° E',
    volume: '14.8M TEU',
    status: 'Optimal',
    x: 412,
    y: 120,
    terminalCode: 'NLRTM',
    vesselsInPort: 48,
    avgTurnaround: '18.4 hrs',
    callout: { dx: 14, dy: -20, textWidth: 80 },
  },
  {
    id: 'hamburg',
    name: 'Port of Hamburg',
    country: 'Germany',
    coords: '53.55° N, 9.99° E',
    volume: '8.7M TEU',
    status: 'Optimal',
    x: 426,
    y: 114,
    terminalCode: 'DEHAM',
    vesselsInPort: 32,
    avgTurnaround: '16.2 hrs',
    callout: { dx: 14, dy: 14, textWidth: 74 },
  },
  {
    id: 'antwerp',
    name: 'Port of Antwerp-Bruges',
    country: 'Belgium',
    coords: '51.21° N, 4.40° E',
    volume: '12.0M TEU',
    status: 'Optimal',
    x: 409,
    y: 124,
    terminalCode: 'BEANR',
    vesselsInPort: 39,
    avgTurnaround: '19.1 hrs',
    callout: { dx: -124, dy: 14, textWidth: 110 },
  },
  {
    id: 'singapore',
    name: 'Port of Singapore',
    country: 'Asia Hub',
    coords: '1.29° N, 103.85° E',
    volume: '37.5M TEU',
    status: 'Express Sync',
    x: 622,
    y: 244,
    terminalCode: 'SGSIN',
    vesselsInPort: 94,
    avgTurnaround: '12.8 hrs',
    callout: { dx: 14, dy: 6, textWidth: 84 },
  },
  {
    id: 'newyork',
    name: 'Port of NY & NJ',
    country: 'United States',
    coords: '40.71° N, 74.00° W',
    volume: '9.5M TEU',
    status: 'Direct Customs',
    x: 236,
    y: 148,
    terminalCode: 'USNYC',
    vesselsInPort: 41,
    avgTurnaround: '21.5 hrs',
    callout: { dx: -106, dy: -8, textWidth: 92 },
  },
];

type CorridorFilter = 'all' | 'transatlantic' | 'europe-asia' | 'regional';

export const GlobalScale: React.FC<GlobalScaleProps> = ({ theme }) => {
  const [selectedHub, setSelectedHub] = useState<HubInfo>(GLOBAL_HUBS[0]);
  const [corridor, setCorridor] = useState<CorridorFilter>('all');
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  const handleHubSelect = (hub: HubInfo) => {
    setSelectedHub(hub);
  };

  return (
    <section
      id="global-scale"
      className="py-20 lg:py-28 relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--bg-surface-elevated)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{
              backgroundColor: 'var(--badge-bg)',
              color: 'var(--badge-text)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <Globe className="w-3.5 h-3.5" />
            WORLDWIDE MARITIME & CARRIER SCALE
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            The port that expands <br />
            <span
              style={{
                color: theme === 'day' ? '#0284c7' : theme === 'signal' ? '#f72585' : '#4cc9f0',
              }}
            >
              across 200+ global destinations.
            </span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            From intra-European parcel road networks to transatlantic maritime lanes, Zineps bridges regional boundaries with unified tariff logic and continuous carrier sync.
          </p>
        </div>

        {/* Dynamic Scale Metrics as the Port Itself */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 font-mono">
          {[
            { label: 'Shipping Partners', value: '20+', detail: 'All major tier-1 carriers & 3PLs' },
            { label: 'Global Destinations', value: '200+', detail: 'Cross-border postal & customs clearance' },
            { label: 'Shipping Methods', value: '1,000+', detail: 'Next-day, lockers, freight & eco-couriers' },
            { label: 'AI Routing Decision', value: '48ms', detail: 'Sub-millisecond carrier evaluation' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-6 rounded-3xl border shadow-sm flex flex-col justify-between"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-strong)',
              }}
            >
              <div>
                <span className="text-[11px] uppercase font-semibold text-slate-400 block mb-2">{stat.label}</span>
                <div
                  className="text-3xl sm:text-4xl font-black mb-1"
                  style={{
                    color: theme === 'day' ? '#0284c7' : theme === 'signal' ? '#f72585' : '#4cc9f0',
                  }}
                >
                  {stat.value}
                </div>
              </div>
              <p className="text-xs text-slate-400 font-sans mt-2">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Global Shipping Arcs & World Terminal Radar */}
        <div
          className="rounded-3xl border p-6 sm:p-8 shadow-xl overflow-hidden relative"
          style={{
            backgroundColor: theme === 'day' ? 'var(--bg-surface)' : theme === 'signal' ? '#09031a' : '#0c0822',
            borderColor: theme === 'day' ? 'var(--border-strong)' : theme === 'signal' ? '#4d195e' : '#2d2363',
            color: theme === 'day' ? 'var(--text-primary)' : '#f8fafc',
          }}
        >
          {/* Radar Header with Corridor Filter Controls */}
          <div
            className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b mb-6 font-mono text-xs"
            style={{
              borderColor: theme === 'day' ? 'var(--border-subtle)' : theme === 'signal' ? '#4d195e' : '#1e1645',
            }}
          >
            <div className="flex items-center gap-2.5">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{
                  backgroundColor: theme === 'day' ? '#0284c7' : theme === 'signal' ? '#f72585' : '#4cc9f0',
                }}
              />
              <span
                className="font-bold uppercase tracking-wider"
                style={{
                  color: theme === 'day' ? '#0284c7' : theme === 'signal' ? '#f72585' : '#4cc9f0',
                }}
              >
                LIVE GLOBAL MARITIME & CARRIER RADAR
              </span>
              <span
                className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold"
                style={{
                  backgroundColor: theme === 'day' ? '#e0f2fe' : theme === 'signal' ? 'rgba(247, 37, 133, 0.2)' : 'rgba(67, 97, 238, 0.2)',
                  color: theme === 'day' ? '#0369a1' : theme === 'signal' ? '#f72585' : '#4cc9f0',
                  border: `1px solid ${theme === 'day' ? '#bae6fd' : theme === 'signal' ? 'rgba(247, 37, 133, 0.4)' : 'rgba(67, 97, 238, 0.4)'}`,
                }}
              >
                TELEMETRY ACTIVE
              </span>
            </div>

            {/* Corridor Filter Tabs */}
            <div
              className="flex items-center gap-1.5 p-1 rounded-xl border"
              style={{
                backgroundColor: theme === 'day' ? '#f1f5f9' : theme === 'signal' ? '#070216' : '#0a071b',
                borderColor: theme === 'day' ? '#cbd5e1' : theme === 'signal' ? '#4d195e' : '#2d2363',
              }}
            >
              <span
                className="text-[10px] uppercase px-2 font-bold hidden md:inline"
                style={{ color: theme === 'day' ? '#64748b' : '#94a3b8' }}
              >
                LANES:
              </span>
              {(['all', 'transatlantic', 'europe-asia', 'regional'] as CorridorFilter[]).map((mode) => {
                const isActive = corridor === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setCorridor(mode)}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-semibold uppercase transition-colors cursor-pointer"
                    style={{
                      backgroundColor: isActive
                        ? theme === 'day'
                          ? '#0284c7'
                          : theme === 'signal'
                          ? '#f72585'
                          : '#4361ee'
                        : 'transparent',
                      color: isActive
                        ? '#ffffff'
                        : theme === 'day'
                        ? '#475569'
                        : '#94a3b8',
                    }}
                  >
                    {mode === 'all' ? 'All Lanes' : mode === 'transatlantic' ? 'Transatlantic' : mode === 'europe-asia' ? 'Europe-Asia' : 'Regional'}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Terminal Hub Selector (4 Cols) */}
            <div className="lg:col-span-4 space-y-2.5 font-mono text-xs">
              <div
                className="text-[11px] font-bold uppercase tracking-wider px-1 pb-1"
                style={{ color: theme === 'day' ? '#64748b' : '#94a3b8' }}
              >
                Select Terminal Hub ({GLOBAL_HUBS.length} Verified Ports):
              </div>
              {GLOBAL_HUBS.map((hub) => {
                const isSelected = selectedHub.id === hub.id;
                const isHovered = hoveredHub === hub.id;

                let hubBg = theme === 'day' ? '#ffffff' : theme === 'signal' ? 'rgba(18, 10, 42, 0.7)' : 'rgba(15, 14, 38, 0.8)';
                let hubBorder = theme === 'day' ? '#e2e8f0' : theme === 'signal' ? '#38165e' : '#29245a';
                let hubText = theme === 'day' ? '#0f172a' : '#ffffff';

                if (isSelected) {
                  hubBg = theme === 'day' ? '#f0f9ff' : theme === 'signal' ? 'rgba(247, 37, 133, 0.22)' : 'rgba(67, 97, 238, 0.25)';
                  hubBorder = theme === 'day' ? '#0284c7' : theme === 'signal' ? '#f72585' : '#4cc9f0';
                } else if (isHovered) {
                  hubBg = theme === 'day' ? '#f8fafc' : theme === 'signal' ? 'rgba(30, 15, 65, 0.9)' : '#181538';
                  hubBorder = theme === 'day' ? '#cbd5e1' : theme === 'signal' ? '#7209b7' : '#3f3685';
                }

                return (
                  <button
                    key={hub.id}
                    id={`hub-selector-${hub.id}`}
                    type="button"
                    onClick={() => handleHubSelect(hub)}
                    onMouseEnter={() => setHoveredHub(hub.id)}
                    onMouseLeave={() => setHoveredHub(null)}
                    className="w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer shadow-xs"
                    style={{
                      backgroundColor: hubBg,
                      borderColor: hubBorder,
                      color: hubText,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                        style={{
                          backgroundColor: isSelected
                            ? theme === 'day'
                              ? '#0284c7'
                              : theme === 'signal'
                              ? '#f72585'
                              : '#4361ee'
                            : theme === 'day'
                            ? '#e2e8f0'
                            : theme === 'signal'
                            ? '#2b104a'
                            : '#1e1747',
                          color: isSelected
                            ? '#ffffff'
                            : theme === 'day'
                            ? '#334155'
                            : '#cbd5e1',
                        }}
                      >
                        {hub.terminalCode.slice(2)}
                      </div>
                      <div>
                        <div
                          className="font-bold text-xs sm:text-sm mb-0.5"
                          style={{ color: theme === 'day' ? '#0f172a' : '#ffffff' }}
                        >
                          {hub.name}
                        </div>
                        <div
                          className="text-[10px]"
                          style={{ color: theme === 'day' ? '#64748b' : '#94a3b8' }}
                        >
                          {hub.country} • {hub.coords}
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                        style={{
                          backgroundColor: theme === 'day' ? '#e0f2fe' : theme === 'signal' ? 'rgba(247, 37, 133, 0.2)' : 'rgba(247, 37, 133, 0.2)',
                          color: theme === 'day' ? '#0369a1' : '#f72585',
                          borderColor: theme === 'day' ? '#bae6fd' : 'rgba(247, 37, 133, 0.3)',
                        }}
                      >
                        {hub.status}
                      </span>
                      <span
                        className="text-[10px] mt-1 font-mono"
                        style={{ color: theme === 'day' ? '#64748b' : '#94a3b8' }}
                      >
                        {hub.volume}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: High-Precision Global Logistics Map & Shipping Arcs (8 Cols) */}
            <div className="lg:col-span-8 flex flex-col">
              <div
                className="w-full h-72 sm:h-[360px] md:h-[390px] rounded-2xl overflow-hidden border relative flex items-center justify-center p-2 sm:p-4"
                style={{
                  backgroundColor: theme === 'day' ? '#edf6fc' : theme === 'signal' ? '#070216' : '#0a071b',
                  borderColor: theme === 'day' ? '#cbd5e1' : theme === 'signal' ? '#4d195e' : '#2d2363',
                }}
              >
                <svg className="w-full h-full" viewBox="0 0 800 420" fill="none" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    {/* Ocean Background Gradient */}
                    <linearGradient id="oceanRadar" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop
                        offset="0%"
                        stopColor={theme === 'day' ? '#e8f4fc' : theme === 'signal' ? '#14082e' : '#120d2e'}
                      />
                      <stop
                        offset="100%"
                        stopColor={theme === 'day' ? '#d9ecf8' : theme === 'signal' ? '#060212' : '#0a071b'}
                      />
                    </linearGradient>

                    <linearGradient id="transatlanticGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor={theme === 'day' ? '#0284c7' : '#f72585'} />
                      <stop offset="50%" stopColor={theme === 'day' ? '#2563eb' : '#4cc9f0'} />
                      <stop offset="100%" stopColor={theme === 'day' ? '#3b82f6' : '#4361ee'} />
                    </linearGradient>

                    <linearGradient id="europeAsiaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={theme === 'day' ? '#2563eb' : '#4361ee'} />
                      <stop offset="50%" stopColor={theme === 'day' ? '#7c3aed' : '#7209b7'} />
                      <stop offset="100%" stopColor={theme === 'day' ? '#d97706' : '#ffba08'} />
                    </linearGradient>

                    <filter id="glowArc" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Ocean Background */}
                  <rect width="800" height="420" fill="url(#oceanRadar)" rx="12" />

                  {/* World Coordinate Grid Lines */}
                  {[70, 140, 210, 280, 350].map((y) => (
                    <line
                      key={`lat-${y}`}
                      x1="0"
                      y1={y}
                      x2="800"
                      y2={y}
                      stroke={theme === 'day' ? 'rgba(2, 132, 199, 0.12)' : theme === 'signal' ? 'rgba(247, 37, 133, 0.12)' : 'rgba(56, 189, 248, 0.08)'}
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  ))}
                  {[100, 200, 300, 400, 500, 600, 700].map((x) => (
                    <line
                      key={`lon-${x}`}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="420"
                      stroke={theme === 'day' ? 'rgba(2, 132, 199, 0.12)' : theme === 'signal' ? 'rgba(247, 37, 133, 0.12)' : 'rgba(56, 189, 248, 0.08)'}
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  ))}

                  {/* Equator & Prime Meridian markers */}
                  <line
                    x1="0"
                    y1="210"
                    x2="800"
                    y2="210"
                    stroke={theme === 'day' ? 'rgba(2, 132, 199, 0.25)' : theme === 'signal' ? 'rgba(247, 37, 133, 0.28)' : 'rgba(56, 189, 248, 0.2)'}
                    strokeWidth="1"
                  />
                  <line
                    x1="400"
                    y1="0"
                    x2="400"
                    y2="420"
                    stroke={theme === 'day' ? 'rgba(2, 132, 199, 0.25)' : theme === 'signal' ? 'rgba(247, 37, 133, 0.28)' : 'rgba(56, 189, 248, 0.2)'}
                    strokeWidth="1"
                  />
                  <text
                    x="12"
                    y="206"
                    fill={theme === 'day' ? 'rgba(2, 132, 199, 0.7)' : theme === 'signal' ? 'rgba(247, 37, 133, 0.7)' : 'rgba(56, 189, 248, 0.5)'}
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    0° EQUATOR
                  </text>
                  <text
                    x="404"
                    y="16"
                    fill={theme === 'day' ? 'rgba(2, 132, 199, 0.7)' : theme === 'signal' ? 'rgba(247, 37, 133, 0.7)' : 'rgba(56, 189, 248, 0.5)'}
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    0° MERIDIAN
                  </text>

                  {/* WORLD CONTINENTS - Vector Cartography */}
                  <g
                    className="world-continents"
                    fill={theme === 'day' ? '#ffffff' : theme === 'signal' ? 'rgba(114, 9, 183, 0.18)' : 'rgba(56, 189, 248, 0.08)'}
                    stroke={theme === 'day' ? '#94a3b8' : theme === 'signal' ? 'rgba(247, 37, 133, 0.45)' : 'rgba(56, 189, 248, 0.28)'}
                    strokeWidth="1.2"
                  >
                    {/* Greenland */}
                    <polygon points="315,38 348,34 358,54 340,78 314,64" />

                    {/* North America */}
                    <polygon points="80,74 120,54 170,48 214,56 244,72 230,90 250,102 244,116 260,118 248,136 242,160 214,168 194,188 176,170 168,142 140,138 132,112 102,96 74,80" />
                    {/* Florida & Gulf */}
                    <polygon points="218,156 228,172 222,178 212,168" />
                    {/* Central America */}
                    <polyline points="194,188 206,198 214,216 224,222 222,228 208,220 198,206" fill="none" strokeWidth="2" />

                    {/* South America */}
                    <polygon points="222,226 244,228 266,242 286,262 278,286 260,316 246,348 238,370 230,364 234,334 228,298 218,270 214,244" />

                    {/* Scandinavia */}
                    <polygon points="422,54 434,48 444,62 438,92 428,104 418,94" />

                    {/* British Isles */}
                    <polygon points="386,96 398,90 402,106 396,118 386,114" />
                    <polygon points="376,104 384,100 386,112 378,116" />

                    {/* Continental Europe */}
                    <polygon points="406,112 424,106 448,108 468,118 460,134 444,138 432,148 420,146 414,134 402,132 392,144 382,142 384,126 404,120" />
                    {/* Italy & Balkans */}
                    <polygon points="428,146 436,158 430,166 424,156" />
                    <polygon points="438,148 450,152 446,168 438,164" />

                    {/* Africa */}
                    <polygon points="392,158 422,154 456,166 478,186 468,212 480,238 464,286 446,326 434,344 420,326 412,284 396,258 376,226 372,196 384,172" />
                    {/* Madagascar */}
                    <polygon points="478,294 484,290 482,324 474,328" />

                    {/* Asia / Eurasia */}
                    <polygon points="468,118 514,104 570,96 636,92 686,98 720,114 706,136 670,140 644,154 628,168 656,188 642,214 616,228 604,216 590,236 578,242 564,216 546,196 514,184 488,184 480,164 474,138" />
                    {/* Arabian Peninsula */}
                    <polygon points="482,188 506,192 514,216 498,226 484,212" />
                    {/* Indian Subcontinent */}
                    <polygon points="544,198 566,204 570,236 558,256 544,232 538,210" />
                    {/* Southeast Asia & Malaysia */}
                    <polygon points="606,224 620,230 626,244 620,252 612,238" />
                    {/* Indonesia / Archipelago */}
                    <polygon points="630,258 654,256 666,266 642,274" />
                    <polygon points="662,230 674,236 670,250 658,244" />
                    {/* Japan Archipelago */}
                    <polygon points="698,154 710,162 704,182 694,188 696,170" />

                    {/* Australia */}
                    <polygon points="666,288 706,280 730,296 736,334 714,354 680,350 660,326 662,302" />
                    {/* New Zealand */}
                    <polygon points="748,354 754,366 750,378 744,368" />
                  </g>

                  {/* ACTIVE SHIPPING LANES & FLIGHT ARCS */}
                  {/* 1. Transatlantic Expressway: New York (236, 148) -> Rotterdam (412, 120) */}
                  {(corridor === 'all' || corridor === 'transatlantic') && (
                    <g className="corridor-transatlantic">
                      <path
                        d="M 236,148 Q 315,74 412,120"
                        stroke={theme === 'day' ? 'rgba(2, 132, 199, 0.25)' : theme === 'signal' ? 'rgba(247, 37, 133, 0.25)' : 'rgba(56, 189, 248, 0.2)'}
                        strokeWidth="3"
                        fill="none"
                      />
                      <path
                        d="M 236,148 Q 315,74 412,120"
                        stroke="url(#transatlanticGrad)"
                        strokeWidth="2.5"
                        strokeDasharray="8 6"
                        className="animate-flow-dash"
                        fill="none"
                        filter="url(#glowArc)"
                      />
                      <g transform="translate(320, 94)">
                        <circle
                          cx="0"
                          cy="0"
                          r="3"
                          fill={theme === 'day' ? '#0284c7' : theme === 'signal' ? '#f72585' : '#4cc9f0'}
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r="6"
                          stroke={theme === 'day' ? '#0284c7' : theme === 'signal' ? '#f72585' : '#4cc9f0'}
                          strokeWidth="1"
                          opacity="0.6"
                          className="animate-ping"
                        />
                        <text
                          x="6"
                          y="-3"
                          fill={theme === 'day' ? '#0369a1' : theme === 'signal' ? '#f72585' : '#4cc9f0'}
                          fontSize="8"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          ATL-EXP 04
                        </text>
                      </g>
                    </g>
                  )}

                  {/* 2. Europe-Asia Maritime Silk Road: Rotterdam (412, 120) -> Suez -> Singapore (622, 244) */}
                  {(corridor === 'all' || corridor === 'europe-asia') && (
                    <g className="corridor-europe-asia">
                      <path
                        d="M 412,120 Q 436,160 480,188 T 546,234 T 622,244"
                        stroke={theme === 'day' ? 'rgba(124, 58, 237, 0.25)' : theme === 'signal' ? 'rgba(114, 9, 183, 0.35)' : 'rgba(114, 9, 183, 0.3)'}
                        strokeWidth="3"
                        fill="none"
                      />
                      <path
                        d="M 412,120 Q 436,160 480,188 T 546,234 T 622,244"
                        stroke="url(#europeAsiaGrad)"
                        strokeWidth="2.5"
                        strokeDasharray="8 6"
                        className="animate-flow-dash"
                        fill="none"
                        filter="url(#glowArc)"
                      />
                      <g transform="translate(534, 218)">
                        <circle cx="0" cy="0" r="3" fill="#ffba08" />
                        <circle cx="0" cy="0" r="6" stroke="#ffba08" strokeWidth="1" opacity="0.6" className="animate-ping" />
                        <text
                          x="6"
                          y="3"
                          fill={theme === 'day' ? '#b45309' : '#ffba08'}
                          fontSize="8"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          ASIA-FEEDER 12
                        </text>
                      </g>
                    </g>
                  )}

                  {/* 3. Intra-European Feeder & Rail Corridor: Antwerp (409, 124) -> Rotterdam (412, 120) -> Hamburg (426, 114) */}
                  {(corridor === 'all' || corridor === 'regional') && (
                    <g className="corridor-regional">
                      <path
                        d="M 409,124 L 412,120 L 426,114"
                        stroke={theme === 'day' ? '#d97706' : '#ffba08'}
                        strokeWidth="3"
                        strokeDasharray="4 3"
                        className="animate-flow-dash"
                        fill="none"
                      />
                    </g>
                  )}

                  {/* 4. Transpacific Air / Maritime Link: Singapore (622, 244) -> East */}
                  {corridor === 'all' && (
                    <g className="corridor-transpacific">
                      <path
                        d="M 622,244 Q 710,210 800,214"
                        stroke={theme === 'day' ? '#0284c7' : '#f72585'}
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        className="animate-flow-dash"
                        fill="none"
                      />
                    </g>
                  )}

                  {/* PORT TERMINAL HUBS - Non-overlapping vector pins */}
                  {GLOBAL_HUBS.map((hub) => {
                    const isSelected = selectedHub.id === hub.id;
                    const isHovered = hoveredHub === hub.id;
                    const isPrimary = hub.id === 'rotterdam';

                    const pinColor = isSelected
                      ? theme === 'day'
                        ? '#0284c7'
                        : theme === 'signal'
                        ? '#f72585'
                        : '#4cc9f0'
                      : isPrimary
                      ? '#ffba08'
                      : theme === 'day'
                      ? '#2563eb'
                      : '#f72585';

                    return (
                      <g
                        key={`hub-marker-${hub.id}`}
                        transform={`translate(${hub.x}, ${hub.y})`}
                        className="cursor-pointer group"
                        onClick={() => handleHubSelect(hub)}
                        onMouseEnter={() => setHoveredHub(hub.id)}
                        onMouseLeave={() => setHoveredHub(null)}
                      >
                        {/* Active Sonar Ping if Selected */}
                        {isSelected && (
                          <>
                            <circle
                              cx="0"
                              cy="0"
                              r="16"
                              fill="none"
                              stroke={pinColor}
                              strokeWidth="1.5"
                              opacity="0.4"
                              className="animate-ping"
                            />
                            <circle cx="0" cy="0" r="10" fill={pinColor} opacity="0.25" />
                          </>
                        )}

                        {/* Base Marker Circle */}
                        <circle
                          cx="0"
                          cy="0"
                          r={isSelected ? 6 : isHovered ? 5 : 4}
                          fill={pinColor}
                          stroke="#ffffff"
                          strokeWidth="1.5"
                          className="transition-all"
                        />

                        {/* Port Terminal Label Tag (Carefully offset to prevent overlaps) */}
                        <g transform={`translate(${hub.callout.dx}, ${hub.callout.dy})`}>
                          <rect
                            x="0"
                            y="0"
                            width={hub.callout.textWidth}
                            height="17"
                            rx="4"
                            fill={
                              isSelected
                                ? theme === 'day'
                                  ? '#0284c7'
                                  : theme === 'signal'
                                  ? '#f72585'
                                  : 'rgba(67, 97, 238, 0.95)'
                                : theme === 'day'
                                ? 'rgba(255, 255, 255, 0.95)'
                                : theme === 'signal'
                                ? 'rgba(14, 8, 36, 0.92)'
                                : 'rgba(10, 7, 27, 0.88)'
                            }
                            stroke={
                              isSelected
                                ? '#ffffff'
                                : theme === 'day'
                                ? '#cbd5e1'
                                : theme === 'signal'
                                ? 'rgba(247, 37, 133, 0.5)'
                                : 'rgba(114, 9, 183, 0.4)'
                            }
                            strokeWidth="1"
                          />
                          <text
                            x="6"
                            y="12"
                            fill={
                              isSelected
                                ? '#ffffff'
                                : theme === 'day'
                                ? '#0f172a'
                                : '#ffffff'
                            }
                            fontSize="8.5"
                            fontFamily="monospace"
                            fontWeight={isSelected ? 'bold' : 'normal'}
                          >
                            {hub.name.replace('Port of ', '')}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Dedicated Docked Telemetry Bar (Sits neatly below the map without clipping or occluding southern coordinates) */}
              <div
                className="mt-3.5 p-3.5 sm:p-4 rounded-2xl border flex flex-wrap items-center justify-between text-xs font-mono shadow-md"
                style={{
                  backgroundColor: theme === 'day' ? '#ffffff' : theme === 'signal' ? '#070216' : '#0a071b',
                  borderColor: theme === 'day' ? '#cbd5e1' : theme === 'signal' ? '#4d195e' : '#2d2363',
                  color: theme === 'day' ? '#0f172a' : '#f8fafc',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center border"
                    style={{
                      backgroundColor: theme === 'day' ? '#e0f2fe' : theme === 'signal' ? 'rgba(247, 37, 133, 0.2)' : 'rgba(67, 97, 238, 0.2)',
                      color: theme === 'day' ? '#0284c7' : theme === 'signal' ? '#f72585' : '#4cc9f0',
                      borderColor: theme === 'day' ? '#bae6fd' : theme === 'signal' ? 'rgba(247, 37, 133, 0.3)' : 'rgba(76, 201, 240, 0.3)',
                    }}
                  >
                    <Anchor className="w-4 h-4" />
                  </div>
                  <div>
                    <span
                      className="block text-[10px] uppercase font-bold"
                      style={{ color: theme === 'day' ? '#64748b' : '#94a3b8' }}
                    >
                      INSPECTED TERMINAL GATEWAY
                    </span>
                    <span className="font-bold text-xs sm:text-sm">
                      {selectedHub.name} ({selectedHub.country}) •{' '}
                      <span
                        className="font-mono font-bold"
                        style={{
                          color: theme === 'day' ? '#0284c7' : theme === 'signal' ? '#f72585' : '#4cc9f0',
                        }}
                      >
                        {selectedHub.terminalCode}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-0">
                  <div>
                    <span
                      className="block text-[10px]"
                      style={{ color: theme === 'day' ? '#64748b' : '#94a3b8' }}
                    >
                      VESSELS IN BERTH
                    </span>
                    <span
                      className="font-bold text-xs sm:text-sm"
                      style={{
                        color: theme === 'day' ? '#0284c7' : theme === 'signal' ? '#4cc9f0' : '#4cc9f0',
                      }}
                    >
                      {selectedHub.vesselsInPort} Ships
                    </span>
                  </div>
                  <div>
                    <span
                      className="block text-[10px]"
                      style={{ color: theme === 'day' ? '#64748b' : '#94a3b8' }}
                    >
                      AVG TURNAROUND
                    </span>
                    <span
                      className="font-bold text-xs sm:text-sm"
                      style={{ color: theme === 'day' ? '#b45309' : '#ffba08' }}
                    >
                      {selectedHub.avgTurnaround}
                    </span>
                  </div>
                  <div className="text-right">
                    <span
                      className="block text-[10px]"
                      style={{ color: theme === 'day' ? '#64748b' : '#94a3b8' }}
                    >
                      ANNUAL THROUGHPUT
                    </span>
                    <span
                      className="font-bold text-xs sm:text-sm"
                      style={{
                        color: theme === 'day' ? '#2563eb' : '#f72585',
                      }}
                    >
                      {selectedHub.volume}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
