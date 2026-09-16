import React, { useState } from 'react';
import { FileText, ChevronDown, CheckCircle2, Stamp } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface ManifestFAQProps {
  theme: ThemeMode;
}

const FAQ_ITEMS = [
  {
    num: '01',
    question: 'What is Zineps?',
    answer:
      'Zineps is the intelligent digital port for modern logistics. We provide a single orchestration API and control dashboard that connects e-commerce merchants and 3PLs to 20+ carriers. Through real-time AI carrier selection, automated barcode generation, live tracking, and frictionless returns, Zineps eliminates manual shipping operations and reduces freight costs by up to 34%.',
    badge: 'ARCHITECTURE',
  },
  {
    num: '02',
    question: 'Who is Zineps built for?',
    answer:
      'Zineps is built for scaling e-commerce brands, high-volume direct-to-consumer retailers, 3PL fulfillment operators, and multi-tenant logistics providers who want automated multi-carrier flexibility without having to build and maintain bespoke integrations with DHL, DPD, UPS, FedEx, and regional delivery fleets.',
    badge: 'TARGET USERS',
  },
  {
    num: '03',
    question: 'How does the AI shipping optimization work?',
    answer:
      'Every time an order is fulfilled, our AI Route Engine analyzes package dimensions, weight, destination postal code, real-time carrier SLA reliability, weather congestion, and negotiated tariff tables in 48ms. It then dynamically selects and dispatches via the carrier that offers the lowest rate while meeting your delivery deadline.',
    badge: 'ALGORITHM',
  },
  {
    num: '04',
    question: 'Can I bring my existing carrier contracts?',
    answer:
      'Yes, absolutely. Zineps supports Bring Your Own Contract (BYOC). You can connect your existing merchant accounts with DHL, DPD, UPS, FedEx, or PostNL and immediately utilize your pre-negotiated volume tiers. Alternatively, you can use Zineps master rates to access discounted tier-1 volume pricing instantly.',
    badge: 'BYOC COMPLIANT',
  },
  {
    num: '05',
    question: 'Which e-commerce and ERP integrations are supported?',
    answer:
      'We offer native zero-code integrations for Shopify, WooCommerce, Magento, Amazon FBM, BigCommerce, Shopware, and PrestaShop, as well as enterprise ERP connectors for SAP and Microsoft Dynamics. For custom stacks, our OpenAPI 3.1 REST APIs and webhooks allow implementation in less than an afternoon.',
    badge: 'CONNECTIVITY',
  },
  {
    num: '06',
    question: 'How does Zineps handle customs and international shipping?',
    answer:
      'Zineps natively generates compliant IOSS manifests, Paperless Trade (PLT) commercial invoices, and automated HS tariff codes. Cross-border documents are electronically transmitted directly to customs authorities before the aircraft or vessel arrives, ensuring zero clearance delays at the border.',
    badge: 'CROSS-BORDER',
  },
];

export const ManifestFAQ: React.FC<ManifestFAQProps> = ({ theme }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    soundManager.playClick();
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      id="manifest"
      className="py-20 lg:py-28 relative overflow-hidden border-t"
      style={{
        backgroundColor: 'var(--bg-base)',
        borderColor: 'var(--border-subtle)',
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
              style={{
                backgroundColor: 'var(--badge-bg)',
                color: 'var(--badge-text)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              OFFICIAL SHIPPING MANIFEST
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight" style={{ color: 'var(--text-primary)' }}>
              MANIFEST / <span className="text-sky-500">FAQ</span>
            </h2>
          </div>

          <div className="text-xs font-mono p-3 rounded-xl border flex items-center gap-2" style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>DOCUMENT REF: ZN-MANIFEST-2026-EU</span>
          </div>
        </div>

        {/* Editorial Expandable Rows Accordion */}
        <div
          className="rounded-3xl border shadow-sm divide-y overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
          }}
        >
          {FAQ_ITEMS.map((item, idx) => {
            const isExpanded = expandedIndex === idx;

            return (
              <div key={item.num} className="transition-colors">
                <button
                  id={`faq-row-${item.num}`}
                  type="button"
                  onClick={() => handleToggle(idx)}
                  className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-500/5 cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-mono text-sm font-bold text-sky-500 min-w-8">
                      {item.num}
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      {item.question}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold border"
                      style={{
                        backgroundColor: 'var(--bg-surface-elevated)',
                        borderColor: 'var(--border-subtle)',
                        color: 'var(--text-muted)'
                      }}
                    >
                      {item.badge}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center border transition-transform duration-300 ${
                        isExpanded ? 'rotate-180 bg-sky-500 text-white border-sky-400' : ''
                      }`}
                      style={{
                        borderColor: isExpanded ? 'var(--accent-primary)' : 'var(--border-subtle)',
                        color: isExpanded ? '#ffffff' : 'var(--text-secondary)',
                      }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div
                    className="px-6 pb-7 sm:px-8 sm:pb-8 pt-1 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <div className="pl-10 sm:pl-14 border-l-2 border-sky-500/40">
                      <p className="text-sm sm:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
