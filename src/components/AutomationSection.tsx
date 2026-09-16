import React, { useState } from 'react';
import { Tag, Truck, Radio, CheckCircle, RotateCcw, ArrowRight, QrCode, FileText, MapPin, Camera } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface AutomationSectionProps {
  theme: ThemeMode;
}

const STAGES = [
  {
    id: 'label',
    number: '01',
    title: 'LABEL',
    subtitle: 'Zero-Click Generation',
    icon: Tag,
    description: 'Instant multi-carrier barcode rendering, cross-border HS customs code auto-fill, and paperless electronic customs declarations in 48ms.',
    badge: 'AUTOMATED MANIFEST',
    metrics: { time: '0.048s', format: 'ZPL / PDF / PNG', errorRate: '0.001%' },
    mockupType: 'label',
  },
  {
    id: 'pickup',
    number: '02',
    title: 'PICKUP',
    subtitle: 'Autonomous Dock Scheduling',
    icon: Truck,
    description: 'Consolidate multiple carrier collections into scheduled dock windows. Automated driver geofence check-ins eliminate terminal idle time.',
    badge: 'GEOFENCE DISPATCH',
    metrics: { dockEfficiency: '+42%', driverWait: '< 4 min', manifests: 'Synchronized' },
    mockupType: 'pickup',
  },
  {
    id: 'transit',
    number: '03',
    title: 'TRANSIT',
    subtitle: 'Predictive Rerouting & Telematics',
    icon: Radio,
    description: 'Continuous monitoring of weather, traffic bottlenecks, and sorting hub congestion. In-flight rerouting prevents costly carrier SLA misses.',
    badge: 'RADAR SURVEILLANCE',
    metrics: { telemetryFreq: '10 sec', rerouteSpeed: 'Instant', claimsReduced: '-82%' },
    mockupType: 'transit',
  },
  {
    id: 'delivery',
    number: '04',
    title: 'DELIVERY',
    subtitle: 'Frictionless Doorstep Handover',
    icon: CheckCircle,
    description: 'Branded customer tracking page with live courier map, 1-hour delivery windows, dynamic SMS updates, and cryptographic photo proof of delivery.',
    badge: 'VERIFIED PROOF',
    metrics: { firstAttempt: '99.1%', csInquiries: '-65%', npsScore: '92' },
    mockupType: 'delivery',
  },
  {
    id: 'return',
    number: '05',
    title: 'RETURN',
    subtitle: 'Self-Serve Circular Logistics',
    icon: RotateCcw,
    description: 'White-label returns portal allowing customers to generate paperless QR codes for local drop-off points, triggering instant merchant inventory restock.',
    badge: 'CIRCULAR PORTAL',
    metrics: { restockSpeed: '2.1x faster', dropoffLocs: '85,000+', satisfaction: '96%' },
    mockupType: 'return',
  },
];

export const AutomationSection: React.FC<AutomationSectionProps> = ({ theme }) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const activeStage = STAGES[activeStageIndex];

  const handleStageSelect = (index: number) => {
    soundManager.playClick();
    setActiveStageIndex(index);
  };

  return (
    <section
      id="automation"
      className="py-20 lg:py-28 relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--bg-surface-elevated)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Headline */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-500 block mb-3">
            Autonomous Lifecycle Engine
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight leading-none mb-6" style={{ color: 'var(--text-primary)' }}>
            FROM LABEL <br />
            <span className="text-sky-500">TO RETURN.</span>
          </h2>
          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Shipping is not a static task—it is a living chain of custody.
            Zineps automates every touchpoint with zero manual intervention, from warehouse dispatch to the customer's front door.
          </p>
        </div>

        {/* Interactive Progress Scrubber / Timeline Bar */}
        <div className="mb-10">
          <div className="grid grid-cols-5 gap-2 sm:gap-4">
            {STAGES.map((stage, idx) => {
              const isActive = activeStageIndex === idx;
              const isPast = activeStageIndex > idx;
              const StageIcon = stage.icon;

              return (
                <button
                  key={stage.id}
                  id={`automation-tab-${stage.id}`}
                  type="button"
                  onClick={() => handleStageSelect(idx)}
                  className={`p-3 sm:p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'shadow-md scale-102 ring-2 ring-sky-500/20'
                      : 'hover:border-slate-400'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'var(--bg-surface)' : 'transparent',
                    borderColor: isActive ? 'var(--accent-primary)' : 'var(--border-subtle)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      {stage.number}
                    </span>
                    <StageIcon
                      className={`w-4 h-4 ${
                        isActive ? 'text-sky-500' : isPast ? 'text-emerald-500' : 'text-slate-400'
                      }`}
                    />
                  </div>
                  <div className="font-extrabold text-xs sm:text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {stage.title}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 hidden md:block truncate mt-0.5">
                    {stage.subtitle}
                  </div>
                  {/* Bottom Active indicator strip */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-sky-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stage Presentation Showcase (Editorial Grid) */}
        <div
          className="rounded-3xl border shadow-xl p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
          }}
        >
          {/* Left: Stage Narrative & Value Proposition (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
                style={{
                  backgroundColor: 'var(--badge-bg)',
                  color: 'var(--badge-text)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                STAGE {activeStage.number} • {activeStage.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                {activeStage.title}: {activeStage.subtitle}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                {activeStage.description}
              </p>

              {/* Stage Specific Telemetry KPIs */}
              <div className="p-4 rounded-2xl border font-mono text-xs mb-6 grid grid-cols-3 gap-2 text-center"
                style={{
                  backgroundColor: 'var(--bg-surface-elevated)',
                  borderColor: 'var(--border-subtle)',
                }}
              >
                {Object.entries(activeStage.metrics).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-[10px] text-slate-400 uppercase block mb-1 truncate">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <span className="text-sm font-bold text-sky-500">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stepper Navigation */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                id="automation-prev-btn"
                type="button"
                disabled={activeStageIndex === 0}
                onClick={() => handleStageSelect(Math.max(0, activeStageIndex - 1))}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold border disabled:opacity-30 transition-colors"
                style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}
              >
                ← Previous Stage
              </button>
              <button
                id="automation-next-btn"
                type="button"
                disabled={activeStageIndex === STAGES.length - 1}
                onClick={() => handleStageSelect(Math.min(STAGES.length - 1, activeStageIndex + 1))}
                className="px-4 py-2 rounded-xl text-xs font-mono font-bold text-white bg-sky-500 hover:bg-sky-400 transition-colors flex items-center gap-1.5 disabled:opacity-30"
              >
                <span>Next Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right: Live Interactive Mockup / Telematics Scene (7 Cols) */}
          <div className="lg:col-span-7">
            <div
              className="rounded-2xl border p-6 font-mono relative overflow-hidden shadow-inner min-h-80 flex flex-col justify-center"
              style={{
                backgroundColor: theme === 'day' ? '#f8fafc' : '#070d18',
                borderColor: 'var(--border-subtle)',
              }}
            >
              {/* STAGE 1: LABEL MOCKUP */}
              {activeStage.mockupType === 'label' && (
                <div className="flex flex-col sm:flex-row gap-6 items-center justify-center animate-in fade-in duration-300">
                  {/* Generated Thermal Barcode Label */}
                  <div className="w-56 p-4 rounded-xl bg-white text-slate-900 shadow-xl border-2 border-slate-900 select-none">
                    <div className="flex items-center justify-between border-b pb-2 mb-2">
                      <span className="font-extrabold text-sm tracking-tighter">ZINEPS LOGISTICS</span>
                      <span className="text-[10px] font-bold px-1 rounded bg-slate-900 text-white">PRIORITY</span>
                    </div>
                    <div className="text-[10px] leading-tight mb-2">
                      <strong>SHIP TO:</strong><br />
                      Alexander Weber<br />
                      Friedrichstraße 142<br />
                      10117 Berlin, DE
                    </div>
                    {/* Simulated High-Res Barcode */}
                    <div className="my-2 h-14 bg-slate-900 flex items-center justify-center p-1 rounded">
                      <div className="w-full h-full flex justify-between">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-full ${i % 3 === 0 ? 'w-1 bg-white' : i % 5 === 0 ? 'w-1.5 bg-white' : 'w-0.5 bg-white'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center text-[9px] tracking-widest font-mono font-bold">
                      *ZN-8294719-EU*
                    </div>
                    <div className="mt-2 pt-2 border-t flex justify-between text-[8px] text-slate-500">
                      <span>HS 8517.62.00</span>
                      <span>IOSS: IM2760000001</span>
                    </div>
                  </div>

                  {/* Machine Readout Metadata */}
                  <div className="text-xs space-y-2">
                    <div className="text-sky-500 font-bold flex items-center gap-1.5">
                      <QrCode className="w-4 h-4" /> 2D Datamatrix Generated
                    </div>
                    <div className="text-slate-400">Carrier: DPD Direct EU</div>
                    <div className="text-slate-400">Routing Hub: BER-04 Hub</div>
                    <div className="text-emerald-500 font-semibold">✓ Customs Pre-Approved</div>
                    <div className="text-slate-400">Payload: 0.84 kg • Vol: 0.003 m³</div>
                  </div>
                </div>
              )}

              {/* STAGE 2: PICKUP MOCKUP */}
              {activeStage.mockupType === 'pickup' && (
                <div className="p-4 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b pb-3 border-slate-700">
                    <span className="text-sky-400 font-bold text-sm">DOCK TERMINAL B — AUTOMATED DISPATCH</span>
                    <span className="text-xs text-emerald-400 font-semibold">BAY 03 ASSIGNED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-400 text-[10px] block">Approaching Vehicle</span>
                      <span className="font-bold text-white">DHL Sprinter #402</span>
                      <span className="text-emerald-400 text-[10px] block mt-1">Geofence triggered (400m)</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                      <span className="text-slate-400 text-[10px] block">Batch Consolidation</span>
                      <span className="font-bold text-white">48 Pallets Ready</span>
                      <span className="text-sky-400 text-[10px] block mt-1">Single Master Manifest</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs flex items-center justify-between">
                    <span>Automated Electronic Bill of Lading (e-BOL)</span>
                    <span className="font-bold">SIGNATURELESS</span>
                  </div>
                </div>
              )}

              {/* STAGE 3: TRANSIT MOCKUP */}
              {activeStage.mockupType === 'transit' && (
                <div className="p-4 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b pb-2 border-slate-700">
                    <span className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                      <Radio className="w-4 h-4 animate-pulse" /> LIVE TELEMATICS RADAR
                    </span>
                    <span className="text-xs text-slate-400">AUTO-REROUTE ENGINE</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-amber-500/30 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-rose-400 font-bold">⚠️ Storm Alert: Cologne Corridor</span>
                      <span className="text-slate-400 text-[10px]">Predicted delay: +3.5h</span>
                    </div>
                    <div className="p-2 rounded bg-slate-800 text-emerald-400 text-[11px] font-mono">
                      ➔ AI Reroute: Switched linehaul to Frankfurt Rail Gateway (+0 min delay, €0 fee)
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>GPS Telemetry: 50.1109° N, 8.6821° E</span>
                    <span className="text-sky-400">Estimated Delivery: 10:45 AM Tomorrow</span>
                  </div>
                </div>
              )}

              {/* STAGE 4: DELIVERY MOCKUP */}
              {activeStage.mockupType === 'delivery' && (
                <div className="p-4 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b pb-2 border-slate-700">
                    <span className="text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4" /> HANDOVER COMPLETED
                    </span>
                    <span className="text-xs text-slate-400">TIMESTAMP: 11:42:09 CET</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="h-32 rounded-xl bg-slate-800 border border-slate-700 flex flex-col items-center justify-center p-3 text-center">
                      <Camera className="w-6 h-6 text-sky-400 mb-1" />
                      <span className="text-xs font-bold text-white">Photo Proof Captured</span>
                      <span className="text-[10px] text-slate-400 mt-1">Porch delivery • Geo-tagged</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                        <span className="text-[10px] text-slate-400 block">Recipient OTP</span>
                        <span className="text-emerald-400 font-bold">VERIFIED #7492</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800 border border-slate-700">
                        <span className="text-[10px] text-slate-400 block">Customer NPS</span>
                        <span className="text-amber-400 font-bold">★★★★★ 5.0 Rated</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STAGE 5: RETURN MOCKUP */}
              {activeStage.mockupType === 'return' && (
                <div className="p-4 space-y-4 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b pb-2 border-slate-700">
                    <span className="text-sky-400 font-bold text-sm">FRICTIONLESS RETURN INITIATED</span>
                    <span className="text-xs text-emerald-400">PAPERLESS QR CODE</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0">
                      <QrCode className="w-full h-full text-slate-900" />
                    </div>
                    <div className="text-xs space-y-1">
                      <div className="font-bold text-white">Drop-off at any of 85,000+ Lockers</div>
                      <div className="text-slate-400 text-[11px]">No home printer required • Scanned instantly</div>
                      <div className="text-emerald-400 font-semibold text-[11px]">Instant Merchant Restock Triggered</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
