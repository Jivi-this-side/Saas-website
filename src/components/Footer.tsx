import React from 'react';
import { Anchor, ShieldCheck, Cpu, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface FooterProps {
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer
      id="main-footer"
      className="py-16 border-t"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Operational Status Bar */}
        <div
          className="p-4 sm:p-5 rounded-2xl border mb-12 flex flex-wrap items-center justify-between gap-4 font-mono text-xs"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-bold text-emerald-600 dark:text-emerald-400">
              ALL HARBOR TERMINALS OPERATIONAL
            </span>
            <span className="text-slate-400 hidden sm:inline">|</span>
            <span className="text-slate-400 hidden sm:inline">Uptime: 99.994%</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Global API: <strong className="text-sky-500">32ms</strong></span>
            <span>GDPR & ISO-27001 Verified</span>
          </div>
        </div>

        {/* 4 Column Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Identity (2 cols on md) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-primary-contrast, #0a071b)',
                }}
              >
                <Anchor className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight" style={{ color: 'var(--text-primary)' }}>
                ZINEPS
              </span>
            </div>
            <p className="text-xs leading-relaxed max-w-sm" style={{ color: 'var(--text-secondary)' }}>
              The intelligent port for modern logistics. Connecting merchants, carriers, and 3PL networks into one automated shipping ecosystem.
            </p>
            <div className="text-[11px] font-mono text-slate-400">
              © {new Date().getFullYear()} Zineps Technologies B.V. • Keizersgracht 421, Amsterdam, NL
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider block" style={{ color: 'var(--text-primary)' }}>
              Platform
            </span>
            <ul className="space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li><a href="#automation" className="hover:text-sky-500 transition-colors">Dispatch Automation</a></li>
              <li><a href="#shipping-ai" className="hover:text-sky-500 transition-colors">Shipping AI Engine</a></li>
              <li><a href="#platform" className="hover:text-sky-500 transition-colors">Control Tower</a></li>
              <li><a href="#partners" className="hover:text-sky-500 transition-colors">3PL Infrastructure</a></li>
            </ul>
          </div>

          {/* Col 3: Integrations */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider block" style={{ color: 'var(--text-primary)' }}>
              Integrations
            </span>
            <ul className="space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li><a href="#integrations" className="hover:text-sky-500 transition-colors">Shopify & WooCommerce</a></li>
              <li><a href="#integrations" className="hover:text-sky-500 transition-colors">DHL Express & DPD</a></li>
              <li><a href="#integrations" className="hover:text-sky-500 transition-colors">UPS & FedEx Worldwide</a></li>
              <li><a href="#integrations" className="hover:text-sky-500 transition-colors">PostNL & GLS EU</a></li>
              <li><a href="#integrations" className="hover:text-sky-500 transition-colors">OpenAPI 3.1 Specs</a></li>
            </ul>
          </div>

          {/* Col 4: Manifest & Trust */}
          <div className="space-y-3 font-mono text-xs">
            <span className="font-bold uppercase tracking-wider block" style={{ color: 'var(--text-primary)' }}>
              Security & Trust
            </span>
            <ul className="space-y-2" style={{ color: 'var(--text-muted)' }}>
              <li><a href="#manifest" className="hover:text-sky-500 transition-colors">Shipping Manifest FAQ</a></li>
              <li><a href="#manifest" className="hover:text-sky-500 transition-colors">Customs IOSS Automation</a></li>
              <li><a href="#manifest" className="hover:text-sky-500 transition-colors">SLA Dispute Guarantee</a></li>
              <li><a href="#manifest" className="hover:text-sky-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#manifest" className="hover:text-sky-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom subtle baseline */}
        <div className="pt-8 border-t flex flex-wrap items-center justify-between gap-4 text-xs font-mono" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
          <span>Zineps Maritime & Logistics OS • Designed for high-volume commerce</span>
          <div className="flex items-center gap-4">
            <span className="text-emerald-500">● 100% Green Hosted</span>
            <span>Port Latency: 32ms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
