import React, { useState, useEffect } from 'react';
import { ArrowRight, Compass, ShieldCheck, Mail, Sparkles, Anchor } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface FinalCTAProps {
  theme: ThemeMode;
  onOpenQuickStart: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ theme, onOpenQuickStart }) => {
  const [shipDepartX, setShipDepartX] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setShipDepartX((prev) => (prev > 105 ? -20 : prev + 0.1));
    }, 60);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="final-cta"
      className="py-24 lg:py-32 relative overflow-hidden border-t"
      style={{
        background:
          theme === 'day'
            ? 'linear-gradient(180deg, #e8f4fc 0%, #d3e9f8 60%, #c4def3 100%)'
            : theme === 'night'
            ? 'linear-gradient(180deg, #060e1d 0%, #08162f 60%, #050b18 100%)'
            : 'linear-gradient(180deg, #091325 0%, #0d1e3d 60%, #060e1c 100%)',
      }}
    >
      {/* Background Animated Water Lines & Horizon */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest mb-6 border"
          style={{
            backgroundColor: 'var(--badge-bg)',
            color: 'var(--badge-text)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <Anchor className="w-3.5 h-3.5" />
          DEPARTURE CLEARED • BERTH ALLOCATED
        </div>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-none mb-4" style={{ color: 'var(--text-primary)' }}>
          THE PORT IS READY. <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                theme === 'day'
                  ? 'linear-gradient(90deg, #0284c7, #f97316)'
                  : 'linear-gradient(90deg, #38bdf8, #fb923c)',
            }}
          >
            ARE YOU?
          </span>
        </h2>

        <p className="text-base sm:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-secondary)' }}>
          Join thousands of merchants, 3PLs, and global brands who route their freight with sub-millisecond precision. Start shipping in 15 minutes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            id="final-cta-start-shipping"
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenQuickStart();
            }}
            className="px-8 py-4 rounded-full text-sm font-extrabold tracking-wide transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-2 cursor-pointer hover:brightness-105"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--accent-primary-contrast, #0a071b)',
              boxShadow: 'var(--glow-effect)',
            }}
          >
            <span>START SHIPPING NOW</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            id="final-cta-talk-to-zineps"
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenQuickStart();
            }}
            className="px-7 py-4 rounded-full text-sm font-bold tracking-wide border transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
            }}
          >
            TALK TO ZINEPS
          </button>
        </div>

        {/* The Departing Container Ship Vector Sailing Toward the Horizon */}
        <div className="relative w-full max-w-3xl mx-auto h-44 overflow-hidden rounded-2xl border" style={{ borderColor: 'var(--border-subtle)', backgroundColor: 'var(--water-deep)' }}>
          <svg className="w-full h-full" viewBox="0 0 700 160" preserveAspectRatio="none">
            {/* Horizon and Sunset / Twilight Glow */}
            <linearGradient id="horizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
            <rect x="0" y="0" width="700" height="90" fill="url(#horizonGlow)" />

            {/* Sea Horizon Line */}
            <line x1="0" y1="85" x2="700" y2="85" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

            {/* Water Surface Waves */}
            <path
              d="M0,95 Q175,90 350,95 T700,95"
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="1.5"
            />
            <path
              d="M0,120 Q175,115 350,120 T700,120"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />

            {/* Container Ship Sailing Away toward Horizon */}
            <g transform={`translate(${shipDepartX * 6}, 55)`} className="transition-transform duration-75">
              {/* Ship Wake */}
              <path d="M-40,30 Q-90,38 -140,42" stroke="white" strokeWidth="2" opacity="0.3" fill="none" />

              {/* Hull */}
              <path d="M0,20 L15,35 L140,35 L155,20 Z" fill="#0f172a" stroke="#334155" strokeWidth="1" />
              <path d="M10,30 L15,35 L140,35 L145,30 Z" fill="#dc2626" />

              {/* Containers Stacks */}
              <rect x="22" y="10" width="22" height="10" rx="1" fill="#ef4444" />
              <rect x="46" y="10" width="22" height="10" rx="1" fill="#0ea5e9" />
              <rect x="70" y="10" width="22" height="10" rx="1" fill="#10b981" />
              <rect x="94" y="10" width="22" height="10" rx="1" fill="#f59e0b" />
              <rect x="34" y="1" width="22" height="9" rx="1" fill="#38bdf8" />
              <rect x="58" y="1" width="22" height="9" rx="1" fill="#a855f7" />

              {/* Superstructure Bridge */}
              <rect x="120" y="-4" width="20" height="24" rx="2" fill="#f8fafc" />
              <rect x="123" y="0" width="14" height="4" fill="#0284c7" />
              <line x1="130" y1="-4" x2="130" y2="-12" stroke="#475569" strokeWidth="2" />
              <circle cx="130" cy="-12" r="2" fill="#ef4444" className="animate-pulse" />
            </g>
          </svg>

          {/* Departure Telemetry Watermark */}
          <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[10px] font-mono text-white/60">
            <span>VESSEL: ZINEPS VOYAGER (OUTBOUND)</span>
            <span>NEXT PORT OF CALL: HAMBURG TERMINAL 2</span>
          </div>
        </div>
      </div>
    </section>
  );
};
