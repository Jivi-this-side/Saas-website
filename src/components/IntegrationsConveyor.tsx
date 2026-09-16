import React, { useState } from 'react';
import { Layers, CheckCircle, Code, Copy, Check, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { ThemeMode, IntegrationCard } from '../types';
import { soundManager } from '../utils/audio';

interface IntegrationsConveyorProps {
  theme: ThemeMode;
}

const INTEGRATIONS_DATA: IntegrationCard[] = [
  {
    id: 'shopify',
    name: 'Shopify Plus',
    category: 'store',
    icon: '🛍️',
    color: '#95BF47',
    latency: '34ms',
    throughput: '12,500 req/min',
    features: ['Instant Order Webhooks', 'Automated Tracking Push', 'Fulfillment Sync', 'HS Customs Code Autofill'],
    samplePayload: {
      event: 'order.fulfilled',
      zineps_shipment_id: 'ZN-892401',
      order_id: '#10492',
      carrier_assigned: 'DPD Priority',
      tracking_url: 'https://track.zineps.com/ZN-892401',
      dispatch_status: 'AUTO_DISPATCHED',
    },
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    category: 'store',
    icon: '🛒',
    color: '#96588a',
    latency: '42ms',
    throughput: '6,400 req/min',
    features: ['Native WP REST API', 'Checkout Carrier Rates', 'One-Click Thermal Printing', 'Return Portal Link'],
    samplePayload: {
      event: 'order.dispatched',
      wc_order: 4892,
      zineps_batch: 'BATCH-NL-09',
      carrier_service: 'DHL Express',
      label_format: 'ZPL_203DPI',
    },
  },
  {
    id: 'amazon',
    name: 'Amazon FBM',
    category: 'store',
    icon: '📦',
    color: '#ff9900',
    latency: '51ms',
    throughput: '8,900 req/min',
    features: ['Buy Shipping API Compliance', 'On-Time Dispatch Guarantee', 'Automated VTR Tracking', 'Prime Approved'],
    samplePayload: {
      event: 'fbm.label_purchased',
      amazon_order_id: '402-8192841-01',
      prime_compliant: true,
      carrier: 'UPS Standard',
      carrier_pickup: '2026-09-15T15:00:00Z',
    },
  },
  {
    id: 'dhl',
    name: 'DHL Express Global',
    category: 'carrier',
    icon: '✈️',
    color: '#ffcc00',
    latency: '38ms',
    throughput: '14,200 req/min',
    features: ['Paperless Trade (PLT)', 'GoGreen Climate Neutral', 'Doorstep OTP Verification', 'Worldwide Air Express'],
    samplePayload: {
      event: 'carrier.booked',
      awb_number: '9284719284',
      service_code: 'EXPRESS_WORLDWIDE',
      customs_status: 'PAPERLESS_DOCS_TRANSMITTED',
      carbon_offset_kg: 0.42,
    },
  },
  {
    id: 'dpd',
    name: 'DPD Group',
    category: 'carrier',
    icon: '🚚',
    color: '#dc2626',
    latency: '29ms',
    throughput: '18,500 req/min',
    features: ['Predict 1-Hour Window', 'Pickup ParcelShops (85k)', 'Live Courier GPS Radar', 'B2B/B2C Routing'],
    samplePayload: {
      event: 'carrier.in_transit',
      parcel_number: '05221948271',
      predict_window: '14:15 - 15:15',
      hub_code: 'BER-HUB-02',
      first_attempt_rate: '99.4%',
    },
  },
  {
    id: 'ups',
    name: 'UPS Worldwide',
    category: 'carrier',
    icon: '🛡️',
    color: '#3b2314',
    latency: '36ms',
    throughput: '11,000 req/min',
    features: ['UPS Access Point Network', 'Paperless Invoice (EDI)', 'Hazmat Certified', 'Guaranteed Morning Air'],
    samplePayload: {
      event: 'manifest.accepted',
      tracking_1z: '1Z9999999999999999',
      service: 'UPS_SAVER',
      pickup_confirmed: true,
      billing_account: 'ZN-ENTERPRISE-01',
    },
  },
];

export const IntegrationsConveyor: React.FC<IntegrationsConveyorProps> = ({ theme }) => {
  const [selectedIntegration, setSelectedIntegration] = useState<IntegrationCard>(INTEGRATIONS_DATA[0]);
  const [copied, setCopied] = useState(false);

  const handleSelect = (item: IntegrationCard) => {
    soundManager.playClick();
    setSelectedIntegration(item);
  };

  const copyPayload = () => {
    soundManager.playClick();
    navigator.clipboard.writeText(JSON.stringify(selectedIntegration.samplePayload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="integrations"
      className="py-20 lg:py-28 relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Headline */}
        <div className="max-w-3xl mb-12">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{
              backgroundColor: 'var(--badge-bg)',
              color: 'var(--badge-text)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <Layers className="w-3.5 h-3.5" />
            ZERO-CODE LOGISTICS CONVEYOR
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Plug in your stores. <br />
            <span className="text-sky-500">Flow seamlessly to any carrier.</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Zineps standardizes disparate APIs, barcode requirements, and customs formats into one continuous conveyor system.
            Tap any connector below to inspect real-time throughput and webhook payloads.
          </p>
        </div>

        {/* Visual Metaphor Flow Bar */}
        <div className="flex items-center justify-between p-3 rounded-2xl border mb-8 text-xs font-mono text-center"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <span className="font-bold text-sky-500 px-2">1. E-COMMERCE SOURCE</span>
          <span className="text-slate-400">➔</span>
          <span className="font-bold text-amber-500 px-2">2. ZINEPS ADAPTER ENGINE</span>
          <span className="text-slate-400">➔</span>
          <span className="font-bold text-emerald-500 px-2">3. CARRIER DISPATCH</span>
          <span className="text-slate-400">➔</span>
          <span className="font-bold text-slate-700 dark:text-slate-200 px-2">4. CUSTOMER DOOR</span>
        </div>

        {/* The Animated Conveyor System Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Conveyor Cards (6 Cols) */}
          <div className="lg:col-span-6 space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {INTEGRATIONS_DATA.map((item) => {
                const isSelected = selectedIntegration.id === item.id;
                return (
                  <button
                    key={item.id}
                    id={`integration-btn-${item.id}`}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-sky-500 shadow-md scale-102 ring-2 ring-sky-500/20'
                        : 'hover:border-slate-400'
                    }`}
                    style={{
                      backgroundColor: isSelected ? 'var(--bg-surface)' : 'var(--bg-surface-elevated)',
                      borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-subtle)',
                    }}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="font-bold text-xs sm:text-sm truncate" style={{ color: 'var(--text-primary)' }}>
                      {item.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase mt-0.5">
                      {item.category} • {item.latency}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Additional Supported Integrations Ticker */}
            <div className="p-4 rounded-2xl border font-mono text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
            >
              <span>Also integrated: <strong>Magento</strong>, <strong>BigCommerce</strong>, <strong>SAP</strong>, <strong>PrestaShop</strong>, <strong>GLS</strong>, <strong>PostNL</strong>, <strong>Royal Mail</strong></span>
              <span className="text-emerald-500 font-bold">+60 more</span>
            </div>
          </div>

          {/* Right: Live Integration Inspector & Webhook Code Preview (6 Cols) */}
          <div
            className="lg:col-span-6 rounded-3xl border p-6 sm:p-8 font-mono shadow-md"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-strong)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b mb-6 text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedIntegration.icon}</span>
                <div>
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {selectedIntegration.name}
                  </h3>
                  <span className="text-[10px] text-emerald-500 font-semibold">Verified Native Connector</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase">P99 Latency</span>
                <span className="text-sky-500 font-bold">{selectedIntegration.latency}</span>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="mb-6">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block mb-2">Supported Capabilities:</span>
              <div className="flex flex-wrap gap-2">
                {selectedIntegration.features.map((f) => (
                  <span
                    key={f}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border"
                    style={{
                      backgroundColor: 'var(--bg-surface-elevated)',
                      borderColor: 'var(--border-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>{f}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Webhook Payload JSON Box */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2 text-xs">
                <span className="text-slate-400 uppercase font-semibold flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-sky-500" /> REAL-TIME WEBHOOK PAYLOAD
                </span>
                <button
                  id="copy-webhook-btn"
                  type="button"
                  onClick={copyPayload}
                  className="flex items-center gap-1 text-[11px] font-bold text-sky-500 hover:text-sky-400 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy JSON</span>
                    </>
                  )}
                </button>
              </div>

              <pre
                className="p-4 rounded-xl text-[11px] leading-relaxed overflow-x-auto border"
                style={{
                  backgroundColor: theme === 'day' ? '#f1f5f9' : '#060a14',
                  borderColor: 'var(--border-subtle)',
                  color: theme === 'day' ? '#0f172a' : '#38bdf8',
                }}
              >
                {JSON.stringify(selectedIntegration.samplePayload, null, 2)}
              </pre>
            </div>

            {/* API Specs link */}
            <div className="pt-4 border-t flex items-center justify-between text-xs" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-slate-400">OpenAPI 3.1 Specification</span>
              <a
                href="#manifest"
                className="text-sky-500 font-bold hover:underline flex items-center gap-1"
                onClick={() => soundManager.playClick()}
              >
                <span>Browse Manifest Docs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
