import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Sparkles, Building, Mail, Package } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface QuickStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeMode;
}

export const QuickStartModal: React.FC<QuickStartModalProps> = ({ isOpen, onClose, theme }) => {
  const [email, setEmail] = useState('');
  const [volume, setVolume] = useState('1,000 - 5,000');
  const [primaryCarrier, setPrimaryCarrier] = useState('DPD & DHL');
  const [step, setStep] = useState<'form' | 'success'>('form');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundManager.playSuccess();
    setStep('success');
  };

  const handleResetAndClose = () => {
    soundManager.playClick();
    setStep('form');
    setEmail('');
    onClose();
  };

  return (
    <div
      id="quick-start-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        className="max-w-md w-full rounded-3xl border shadow-2xl p-6 sm:p-8 font-mono relative overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-strong)',
          color: 'var(--text-primary)',
        }}
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-500/10 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              INSTANT PORT ACCESS
            </div>

            <h3 className="text-2xl font-extrabold tracking-tight mb-2">
              Start Shipping with Zineps
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6 font-sans">
              Connect your storefront or ERP in under 15 minutes. No setup fees, zero lock-in contracts.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 uppercase font-semibold block mb-1.5">
                  Business Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="modal-email-input"
                    type="email"
                    required
                    placeholder="alex@yourbrand.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border font-mono text-xs outline-none focus:ring-2 focus:ring-sky-500"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-primary)',
                    }}
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 uppercase font-semibold block mb-1.5">
                  Estimated Monthly Shipments
                </label>
                <select
                  id="modal-volume-select"
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                  className="w-full p-2.5 rounded-xl border font-mono text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option value="Under 1,000">Under 1,000 parcels / mo</option>
                  <option value="1,000 - 5,000">1,000 - 5,000 parcels / mo</option>
                  <option value="5,000 - 25,000">5,000 - 25,000 parcels / mo</option>
                  <option value="25,000+">25,000+ High Volume Enterprise</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 uppercase font-semibold block mb-1.5">
                  Current Primary Carrier
                </label>
                <select
                  id="modal-carrier-select"
                  value={primaryCarrier}
                  onChange={(e) => setPrimaryCarrier(e.target.value)}
                  className="w-full p-2.5 rounded-xl border font-mono text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  style={{
                    backgroundColor: 'var(--bg-surface-elevated)',
                    borderColor: 'var(--border-subtle)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <option value="DPD & DHL">DPD & DHL</option>
                  <option value="UPS Worldwide">UPS Worldwide</option>
                  <option value="FedEx Express">FedEx Express</option>
                  <option value="PostNL / GLS">PostNL / GLS Regional</option>
                  <option value="Multiple / Looking for Rates">Multiple / Need Volume Rates</option>
                </select>
              </div>

              <div className="pt-3">
                <button
                  id="modal-submit-btn"
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer hover:brightness-105"
                  style={{
                    backgroundColor: 'var(--accent-primary, #F4F754)',
                    color: 'var(--accent-primary-contrast, #0a071b)',
                    boxShadow: 'var(--glow-effect)',
                  }}
                >
                  <span>PROVISION PORT TEST SANDBOX</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Instant API credentials generated in test mode</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-500 mx-auto flex items-center justify-center mb-4">
              <Check className="w-7 h-7 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Sandbox Cleared!</h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              We dispatched your developer sandbox keys and onboarding manifest to <strong className="text-sky-400">{email}</strong>.
            </p>
            <div className="p-4 rounded-xl bg-slate-500/10 border border-slate-500/20 text-left text-xs mb-6 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase block">Sample API Key:</span>
              <code className="text-sky-400 font-bold break-all">zn_live_pk_8294719284019a8f</code>
            </div>
            <button
              id="modal-finish-btn"
              type="button"
              onClick={handleResetAndClose}
              className="w-full py-3 rounded-xl font-extrabold text-xs cursor-pointer hover:brightness-105"
              style={{
                backgroundColor: 'var(--accent-primary, #F4F754)',
                color: 'var(--accent-primary-contrast, #0a071b)',
              }}
            >
              RETURN TO DIGITAL PORT
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
