import React, { useState } from 'react';
import { LayoutDashboard, TrendingUp, Package, Truck, AlertTriangle, ArrowUpRight, Search, Filter, CheckCircle2, Clock, X, ChevronRight } from 'lucide-react';
import { ThemeMode, ShipmentItem } from '../types';
import { soundManager } from '../utils/audio';

interface LiveDashboardProps {
  theme: ThemeMode;
}

const MOCK_SHIPMENTS: ShipmentItem[] = [
  {
    id: 'ZN-892401',
    origin: 'Amsterdam, NL',
    destination: 'Berlin, DE',
    carrier: 'DPD Priority',
    status: 'In Transit',
    eta: 'Tomorrow, 11:30 AM',
    cost: 3.82,
    weight: '1.2 kg',
    type: 'B2C Parcel',
    timestamp: '12m ago',
  },
  {
    id: 'ZN-892402',
    origin: 'Rotterdam, NL',
    destination: 'Paris, FR',
    carrier: 'DHL Express',
    status: 'Delivered',
    eta: 'Delivered Today',
    cost: 5.40,
    weight: '0.8 kg',
    type: 'Next-Day Air',
    timestamp: '34m ago',
  },
  {
    id: 'ZN-892403',
    origin: 'Hamburg, DE',
    destination: 'Madrid, ES',
    carrier: 'UPS Standard',
    status: 'In Transit',
    eta: 'Sep 17, 2:00 PM',
    cost: 6.90,
    weight: '4.5 kg',
    type: 'Heavy Freight',
    timestamp: '1h ago',
  },
  {
    id: 'ZN-892404',
    origin: 'Antwerp, BE',
    destination: 'London, UK',
    carrier: 'FedEx EU',
    status: 'Customs',
    eta: 'Sep 18, 9:00 AM',
    cost: 8.20,
    weight: '2.1 kg',
    type: 'IOSS Pre-Cleared',
    timestamp: '2h ago',
  },
  {
    id: 'ZN-892405',
    origin: 'Eindhoven, NL',
    destination: 'Vienna, AT',
    carrier: 'PostNL Global',
    status: 'Out for Delivery',
    eta: 'Today, 4:15 PM',
    cost: 4.15,
    weight: '1.8 kg',
    type: 'Eco EV Route',
    timestamp: '3h ago',
  },
];

export const LiveDashboard: React.FC<LiveDashboardProps> = ({ theme }) => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | 'today' | 'quarter'>('7d');
  const [statusFilter, setStatusFilter] = useState<'All' | 'In Transit' | 'Delivered' | 'Customs'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiAutopilotActive, setAiAutopilotActive] = useState(true);
  const [hoveredDataPoint, setHoveredDataPoint] = useState<number | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentItem | null>(null);

  // Dynamic metrics based on dateRange
  const metrics = {
    today: { total: '2,840', inTransit: '412', avgCost: '€3.88', onTime: '99.6%', saved: '€1,240' },
    '7d': { total: '19,420', inTransit: '3,891', avgCost: '€3.94', onTime: '99.4%', saved: '€8,650' },
    '30d': { total: '84,190', inTransit: '14,200', avgCost: '€4.02', onTime: '99.1%', saved: '€38,400' },
    quarter: { total: '264,800', inTransit: '28,400', avgCost: '€4.08', onTime: '99.3%', saved: '€112,000' },
  }[dateRange];

  // SVG Chart points
  const chartPoints = [
    { day: 'Mon', vol: 1800, cost: 3.92 },
    { day: 'Tue', vol: 2400, cost: 3.84 },
    { day: 'Wed', vol: 2900, cost: 3.81 },
    { day: 'Thu', vol: 3200, cost: 3.79 },
    { day: 'Fri', vol: 3950, cost: 3.75 },
    { day: 'Sat', vol: 2100, cost: 3.88 },
    { day: 'Sun', vol: 1600, cost: 3.91 },
  ];

  const filteredShipments = MOCK_SHIPMENTS.filter((s) => {
    const matchesFilter = statusFilter === 'All' || s.status === statusFilter;
    const matchesSearch =
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.carrier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section
      id="platform"
      className="py-20 lg:py-28 relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Value Prop */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              THE ZINEPS PLATFORM IN ACTION
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
              Mission control for your <br />
              <span className="text-sky-500">entire shipping operations.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Real-time multi-carrier telematics, instant cost analytics, and automated dispute resolution in one unified interface.
          </p>
        </div>

        {/* The SaaS Dashboard Shell Mockup */}
        <div
          className="rounded-3xl border shadow-2xl overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
          }}
        >
          {/* Top Operational Bar */}
          <div
            className="px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            {/* Left Search and Terminal Badge */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold" style={{ color: 'var(--text-primary)' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>TERMINAL ROTTERDAM-EU</span>
              </div>
              <div className="relative hidden sm:block">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="dashboard-search-input"
                  type="text"
                  placeholder="Filter by ID, City, Carrier..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl border text-xs font-mono outline-none focus:ring-1 focus:ring-sky-500 w-56"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>
            </div>

            {/* Right Controls: AI Autopilot & Date Range */}
            <div className="flex items-center gap-3">
              {/* AI Autopilot Toggle Button */}
              <button
                id="dashboard-ai-toggle"
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setAiAutopilotActive(!aiAutopilotActive);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold border flex items-center gap-2 transition-all ${
                  aiAutopilotActive
                    ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'border-slate-500/20 bg-slate-500/10 text-slate-400'
                }`}
                title="AI Dynamic Route Autopilot"
              >
                <span className={`w-2 h-2 rounded-full ${aiAutopilotActive ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                <span>AI Reroute Engine: {aiAutopilotActive ? 'ONLINE' : 'MANUAL'}</span>
              </button>

              {/* Date Range Selector Pills */}
              <div className="flex rounded-xl border p-1" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}>
                {(['today', '7d', '30d', 'quarter'] as const).map((range) => (
                  <button
                    key={range}
                    id={`date-range-${range}`}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setDateRange(range);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono uppercase font-bold transition-all ${
                      dateRange === range
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    {range === 'quarter' ? 'Q3' : range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Metric Highlights Strip (4 KPIs) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="p-5 font-mono">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Total Dispatched</span>
              <div className="text-2xl sm:text-3xl font-black" style={{ color: 'var(--text-primary)' }}>
                {metrics.total}
              </div>
              <span className="text-[11px] text-emerald-500 font-bold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> +14.8% vs last period
              </span>
            </div>

            <div className="p-5 font-mono">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Active In-Transit</span>
              <div className="text-2xl sm:text-3xl font-black text-sky-500">
                {metrics.inTransit}
              </div>
              <span className="text-[11px] text-slate-400 font-medium block mt-1">
                Across 24 carrier lanes
              </span>
            </div>

            <div className="p-5 font-mono">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Average Cost / Parcel</span>
              <div className="text-2xl sm:text-3xl font-black text-emerald-500">
                {metrics.avgCost}
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block mt-1">
                Saved {metrics.saved} (18.4%)
              </span>
            </div>

            <div className="p-5 font-mono">
              <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">On-Time Delivery SLA</span>
              <div className="text-2xl sm:text-3xl font-black text-sky-400">
                {metrics.onTime}
              </div>
              <span className="text-[11px] text-slate-400 font-medium block mt-1">
                Zero SLA penalty claims
              </span>
            </div>
          </div>

          {/* Main Content Grid: Activity Chart & Carrier Share (Top Row) */}
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            {/* Activity Chart (8 Cols) */}
            <div className="lg:col-span-8">
              <div className="flex items-center justify-between mb-4 font-mono text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-400">
                  SHIPPING ACTIVITY & COST VOLATILITY INDEX
                </span>
                <span className="text-emerald-500 font-semibold">
                  {hoveredDataPoint !== null ? `Day: ${chartPoints[hoveredDataPoint].day} • Vol: ${chartPoints[hoveredDataPoint].vol} • Rate: €${chartPoints[hoveredDataPoint].cost}` : 'Hover bars for details'}
                </span>
              </div>

              {/* Responsive SVG Bar & Trend Chart */}
              <div className="h-56 w-full relative">
                <svg className="w-full h-full" viewBox="0 0 700 200" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  {[40, 90, 140, 190].map((y) => (
                    <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="currentColor" className="text-slate-500/15" strokeDasharray="4 4" />
                  ))}

                  {/* Activity Bars */}
                  {chartPoints.map((pt, i) => {
                    const barHeight = (pt.vol / 4200) * 160;
                    const x = 50 + i * 95;
                    const isHovered = hoveredDataPoint === i;

                    return (
                      <g
                        key={pt.day}
                        onMouseEnter={() => {
                          soundManager.playClick();
                          setHoveredDataPoint(i);
                        }}
                        onMouseLeave={() => setHoveredDataPoint(null)}
                        className="cursor-pointer"
                      >
                        <rect
                          x={x}
                          y={190 - barHeight}
                          width="44"
                          height={barHeight}
                          rx="6"
                          fill={isHovered ? 'var(--accent-primary)' : 'var(--accent-primary)'}
                          opacity={isHovered ? 1 : 0.75}
                          className="transition-all duration-200"
                        />
                        <text
                          x={x + 22}
                          y="198"
                          textAnchor="middle"
                          fill="currentColor"
                          className="text-slate-400 text-[10px] font-mono"
                        >
                          {pt.day}
                        </text>
                      </g>
                    );
                  })}

                  {/* Spline Trend Line for Cost per unit */}
                  <path
                    d="M 72,130 C 160,110 250,95 350,85 C 450,75 550,115 640,125"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Carrier Share / Performance Breakdown (4 Cols) */}
            <div className="lg:col-span-4 rounded-2xl p-5 border font-mono" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
              <span className="text-xs uppercase font-bold text-slate-400 block mb-4">
                CARRIER SPLIT & RELIABILITY
              </span>

              <div className="space-y-4 text-xs">
                {[
                  { name: 'DPD Priority', share: '44%', color: '#ef4444', sla: '99.4%' },
                  { name: 'DHL Express', share: '28%', color: '#f59e0b', sla: '99.6%' },
                  { name: 'UPS Worldwide', share: '16%', color: '#0284c7', sla: '99.1%' },
                  { name: 'FedEx EU', share: '12%', color: '#8b5cf6', sla: '98.8%' },
                ].map((c) => (
                  <div key={c.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-700 dark:text-slate-200">{c.name}</span>
                      <span className="font-semibold text-slate-400">{c.share} (SLA {c.sla})</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-500/20 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: c.share, backgroundColor: c.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Live Shipments Feed Table */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
                REAL-TIME MANIFEST LOG ({filteredShipments.length} Active Shipments)
              </span>

              {/* Status Filter Buttons */}
              <div className="flex gap-1.5 text-xs font-mono">
                {(['All', 'In Transit', 'Delivered', 'Customs'] as const).map((filter) => (
                  <button
                    key={filter}
                    id={`filter-btn-${filter.toLowerCase().replace(/\s+/g, '-')}`}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setStatusFilter(filter);
                    }}
                    className={`px-3 py-1 rounded-lg border transition-all ${
                      statusFilter === filter
                        ? 'bg-sky-500 text-white font-bold border-sky-400'
                        : 'border-slate-500/20 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-xl border" style={{ borderColor: 'var(--border-subtle)' }}>
              <table className="w-full text-left font-mono text-xs">
                <thead style={{ backgroundColor: 'var(--bg-surface-elevated)', color: 'var(--text-muted)' }}>
                  <tr>
                    <th className="p-3">SHIPMENT ID</th>
                    <th className="p-3">CORRIDOR</th>
                    <th className="p-3">CARRIER</th>
                    <th className="p-3">STATUS</th>
                    <th className="p-3">ETA</th>
                    <th className="p-3">RATE</th>
                    <th className="p-3 text-right">INSPECT</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--border-subtle)' }}>
                  {filteredShipments.map((s) => (
                    <tr
                      key={s.id}
                      className="transition-colors hover:bg-slate-500/5 cursor-pointer"
                      onClick={() => {
                        soundManager.playClick();
                        setSelectedShipment(s);
                      }}
                    >
                      <td className="p-3 font-bold text-sky-500">{s.id}</td>
                      <td className="p-3" style={{ color: 'var(--text-primary)' }}>
                        {s.origin} ➔ {s.destination}
                      </td>
                      <td className="p-3 font-semibold text-slate-400">{s.carrier}</td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            s.status === 'Delivered'
                              ? 'bg-emerald-500/10 text-emerald-500'
                              : s.status === 'In Transit'
                              ? 'bg-sky-500/10 text-sky-500'
                              : 'bg-amber-500/10 text-amber-500'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="p-3 text-slate-400">{s.eta}</td>
                      <td className="p-3 font-bold text-emerald-500">€{s.cost.toFixed(2)}</td>
                      <td className="p-3 text-right">
                        <span className="text-sky-500 flex items-center justify-end gap-0.5 font-bold hover:underline">
                          <span>Details</span>
                          <ChevronRight className="w-3 h-3" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Shipment Inspection Modal / Drawer */}
      {selectedShipment && (
        <div
          id="shipment-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            className="max-w-lg w-full rounded-3xl border shadow-2xl p-6 sm:p-8 font-mono"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b mb-4" style={{ borderColor: 'var(--border-subtle)' }}>
              <div>
                <span className="text-xs text-slate-400 uppercase font-semibold">SHIPMENT MANIFEST</span>
                <h3 className="text-xl font-bold text-sky-500">{selectedShipment.id}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedShipment(null)}
                className="p-2 rounded-xl hover:bg-slate-500/10 text-slate-400 hover:text-white"
                aria-label="Close manifest modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs mb-6">
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-500/10">
                <span className="text-slate-400">Carrier Assigned:</span>
                <span className="font-bold">{selectedShipment.carrier}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-500/10">
                <span className="text-slate-400">Trajectory:</span>
                <span className="font-bold">{selectedShipment.origin} → {selectedShipment.destination}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-500/10">
                <span className="text-slate-400">Current Status:</span>
                <span className="font-bold text-sky-400">{selectedShipment.status}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-500/10">
                <span className="text-slate-400">Estimated Delivery:</span>
                <span className="font-bold text-emerald-400">{selectedShipment.eta}</span>
              </div>
              <div className="flex justify-between p-2.5 rounded-xl bg-slate-500/10">
                <span className="text-slate-400">Contracted Rate:</span>
                <span className="font-bold text-emerald-400">€{selectedShipment.cost.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedShipment(null)}
              className="w-full py-3 rounded-xl font-bold text-xs bg-sky-500 text-white hover:bg-sky-400"
            >
              CLOSE INSPECTION
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
