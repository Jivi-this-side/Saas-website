import React, { useState } from 'react';
import { Building2, Layers, Percent, FileCheck, Users, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface PartnerPlatformProps {
  theme: ThemeMode;
  onOpenQuickStart: () => void;
}

export const PartnerPlatform: React.FC<PartnerPlatformProps> = ({ theme, onOpenQuickStart }) => {
  const [partnerTier, setPartnerTier] = useState<'3pl' | 'carrier' | 'broker'>('3pl');
  const [simulatedVolume, setSimulatedVolume] = useState(50000);
  const [marginMarkup, setMarginMarkup] = useState(12);

  // Dynamic profit/margin calculation
  const calculatedSavings = Math.round(simulatedVolume * 0.95);
  const calculatedMarginProfit = Math.round((simulatedVolume * 4.2 * (marginMarkup / 100)));

  return (
    <section
      id="partners"
      className="py-20 lg:py-28 relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--bg-surface-elevated)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Header */}
        <div className="max-w-3xl mb-14">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{
              backgroundColor: 'var(--badge-bg)',
              color: 'var(--badge-text)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <Building2 className="w-3.5 h-3.5" />
            PARTNER & 3PL INFRASTRUCTURE
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Powering the world's most <br />
            <span className="text-sky-500">advanced logistics providers.</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Whether you run a 3PL fulfillment network or operate your own delivery fleet, Zineps equips you with multi-tenant merchant management, dynamic rate markups, and turnkey billing.
          </p>
        </div>

        {/* 3-Sided Value Flow Diagram: Merchant ↕ Zineps ↕ Carrier/3PL */}
        <div
          className="p-6 sm:p-8 rounded-3xl border mb-12 shadow-sm"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center font-mono">
            {/* 1. Merchants */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>1. YOUR MERCHANTS</h3>
              <p className="text-xs text-slate-400">Connect via Shopify, WooCommerce, or direct API in &lt;5 minutes.</p>
            </div>

            {/* 2. Zineps Platform Hub */}
            <div className="p-6 rounded-2xl border-2 border-sky-500 shadow-md relative" style={{ backgroundColor: 'var(--bg-surface-elevated)' }}>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold bg-sky-500 text-white uppercase tracking-wider">
                ORCHESTRATION LAYER
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm mb-1 text-sky-500">2. ZINEPS CONTROL TOWER</h3>
              <p className="text-xs text-slate-400">Automated carrier selection, custom margin markups, unified invoicing, and SLA radar.</p>
            </div>

            {/* 3. Carriers / 3PLs */}
            <div className="p-5 rounded-2xl border" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>3. CARRIERS & 3PLs</h3>
              <p className="text-xs text-slate-400">Aggregate shipping volume across 20+ carriers to unlock tier-1 volume discounts.</p>
            </div>
          </div>
        </div>

        {/* Interactive Partner Margin Simulator & Capabilities */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Capability Checklist (6 Cols) */}
          <div className="lg:col-span-6 space-y-4 font-mono">
            {[
              {
                title: 'Automated Margin Rules & Markup Engine',
                desc: 'Set custom pricing rules per merchant tier, destination country, or package weight bracket. Automatically retain dynamic margins without manual invoicing.',
                icon: Percent,
              },
              {
                title: 'Consolidated Merchant Invoicing',
                desc: 'Generate single multi-carrier invoices for each merchant customer with itemized tracking numbers, surcharges, and customs clearance fees.',
                icon: FileCheck,
              },
              {
                title: 'White-Label Merchant Portals',
                desc: 'Give your merchant clients their own branded logistics portal with your logo, tracking links, and customer return centers.',
                icon: Building2,
              },
              {
                title: 'Carrier SLA Dispute Auditing',
                desc: 'Zineps automatically tracks late deliveries and files automated compensation claims with carriers on your behalf.',
                icon: ShieldAlert,
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="p-5 rounded-2xl border flex items-start gap-4 transition-transform hover:scale-101"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-subtle)',
                  }}
                >
                  <div className="p-2.5 rounded-xl bg-sky-500/10 text-sky-500 shrink-0 mt-1">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--text-primary)' }}>
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Interactive 3PL Margin & Yield Calculator (6 Cols) */}
          <div
            className="lg:col-span-6 rounded-3xl border p-6 sm:p-8 font-mono shadow-md"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-strong)',
            }}
          >
            <div className="flex items-center justify-between pb-4 border-b mb-6 text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="font-bold uppercase tracking-wider text-sky-500">
                3PL YIELD & PROFIT SIMULATOR
              </span>
              <span className="text-emerald-500 font-semibold">INTERACTIVE MODEL</span>
            </div>

            {/* Sliders */}
            <div className="space-y-5 text-xs mb-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 uppercase font-semibold">Monthly Parcel Volume</span>
                  <span className="text-sky-500 font-bold text-sm">{simulatedVolume.toLocaleString()} parcels</span>
                </div>
                <input
                  id="partner-volume-slider"
                  type="range"
                  min="5000"
                  max="250000"
                  step="5000"
                  value={simulatedVolume}
                  onChange={(e) => setSimulatedVolume(parseInt(e.target.value, 10))}
                  className="w-full accent-sky-500"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-400 uppercase font-semibold">Configured Margin Markup</span>
                  <span className="text-emerald-500 font-bold text-sm">{marginMarkup}%</span>
                </div>
                <input
                  id="partner-margin-slider"
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={marginMarkup}
                  onChange={(e) => setMarginMarkup(parseInt(e.target.value, 10))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Calculated Yield Box */}
            <div className="p-5 rounded-2xl border mb-6" style={{ backgroundColor: 'var(--bg-surface-elevated)', borderColor: 'var(--border-subtle)' }}>
              <div className="text-[11px] text-slate-400 uppercase font-semibold mb-1">Estimated Annual Margin Profit</div>
              <div className="text-3xl font-black text-emerald-500 mb-2">
                €{(calculatedMarginProfit * 12).toLocaleString()} / yr
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                Plus an estimated <strong className="text-white">€{(calculatedSavings * 12).toLocaleString()}</strong> in consolidated carrier tier rate discounts.
              </div>
            </div>

            {/* CTA */}
            <button
              id="partner-cta-start"
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenQuickStart();
              }}
              className="w-full py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase text-white bg-sky-500 hover:bg-sky-400 shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>CONNECT YOUR 3PL OR FLEET</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
