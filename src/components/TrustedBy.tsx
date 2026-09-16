import React from 'react';
import { ThemeMode } from '../types';

interface TrustedByProps {
  theme?: ThemeMode;
}

interface PartnerLogo {
  id: string;
  name: string;
  src?: string;
  category: string;
  svgBadge?: React.ReactNode;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  {
    id: 'mate',
    name: 'MATE.',
    src: '/image%20149.png',
    category: 'E-Mobility DTC',
  },
  {
    id: 'monkey',
    name: 'MONKEY',
    src: '/image%20142.png',
    category: 'Apparel & Lifestyle',
  },
  {
    id: 'trent',
    name: 'TRENT',
    src: '/image%20150.png',
    category: 'Footwear & Streetwear',
  },
  {
    id: 'thetester',
    name: 'THE TESTER',
    src: '/thetester.svg',
    category: 'Health Diagnostics DTC',
  },
  {
    id: '101kruiden',
    name: '101KRUIDEN',
    src: '/101kruiden.svg',
    category: 'Organic Botanicals',
  },
  {
    id: 'veldhoen',
    name: 'VELDHOEN & CO',
    category: 'Omnichannel Benelux',
    svgBadge: (
      <div className="flex items-center gap-2.5 font-bold tracking-tight text-base sm:text-lg select-none">
        <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 text-xs font-black">
          V
        </div>
        <span>VELDHOEN</span>
      </div>
    ),
  },
  {
    id: 'nordica',
    name: 'NORDICA GOODS',
    category: 'Nordic Home Goods',
    svgBadge: (
      <div className="flex items-center gap-2.5 font-bold tracking-tight text-base sm:text-lg select-none">
        <div className="w-7 h-7 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 text-xs font-black">
          N
        </div>
        <span>NORDICA</span>
      </div>
    ),
  },
  {
    id: 'decathlon-eu',
    name: 'DECATHLON HUB',
    category: 'Sports & Fulfillment',
    svgBadge: (
      <div className="flex items-center gap-2.5 font-bold tracking-tight text-base sm:text-lg select-none">
        <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-500 text-xs font-black">
          D
        </div>
        <span>DECATHLON <span className="text-xs text-sky-500 font-semibold uppercase tracking-wider">3PL</span></span>
      </div>
    ),
  },
  {
    id: 'bol-merchants',
    name: 'BOL.COM PARTNER',
    category: 'Marketplace Sellers',
    svgBadge: (
      <div className="flex items-center gap-2.5 font-bold tracking-tight text-base sm:text-lg select-none">
        <div className="w-7 h-7 rounded-lg bg-blue-600/15 border border-blue-600/30 flex items-center justify-center text-blue-400 text-xs font-black">
          B
        </div>
        <span>BOL PARTNER</span>
      </div>
    ),
  },
  {
    id: 'gymshark-eu',
    name: 'GYMSHARK DTC',
    category: 'Athletic Wear',
    svgBadge: (
      <div className="flex items-center gap-2.5 font-bold tracking-tight text-base sm:text-lg select-none">
        <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-xs font-black">
          G
        </div>
        <span>GYMSHARK</span>
      </div>
    ),
  },
];

export const TrustedBy: React.FC<TrustedByProps> = ({ theme = 'day' }) => {
  const isDark = theme !== 'day';

  return (
    <div
      id="trusted-by-section"
      className="py-8 sm:py-12 border-y relative transition-colors duration-300"
      style={{
        borderColor: 'var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      {/* 1. Header with exact matching CSS selector */}
      <div className="w-full max-w-[1523px] mx-auto px-4 sm:px-6 md:px-[73px] text-center">
        <div
          className="text-2xl sm:text-3xl md:text-[38px] font-bold tracking-tight mb-2 sm:mb-4 transition-colors"
          style={{ color: 'var(--text-primary)' }}
        >
          Trusted by
        </div>
        <p
          className="text-xs sm:text-sm font-medium tracking-wide uppercase max-w-xl mx-auto mb-6"
          style={{ color: 'var(--text-muted)' }}
        >
          Powering linehaul, parcel routing & inventory for 2,400+ leading brands & 3PLs
        </p>
      </div>

      {/* 2. Marquee conveyor with exact matching CSS selector */}
      <div
        className="overflow-hidden py-3 relative"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="relative w-full overflow-hidden flex">
          {/* Continuous Loop Strip 1 */}
          <div
            className="flex shrink-0 items-center animate-marquee-continuous"
            style={{ gap: '48px', paddingRight: '48px' }}
          >
            {PARTNER_LOGOS.map((logo, idx) => (
              <div
                key={`strip1-${logo.id}-${idx}`}
                className="flex items-center justify-center shrink-0 group transition-transform duration-200 hover:scale-105"
                title={`${logo.name} • ${logo.category}`}
              >
                {logo.svgBadge ? (
                  <div
                    className="transition-colors duration-200"
                    style={{
                      color: isDark ? '#f1f5f9' : '#1e293b',
                    }}
                  >
                    {logo.svgBadge}
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center">
                    <img
                      alt={logo.name}
                      src={logo.src}
                      height="36"
                      loading="eager"
                      className={`h-8 sm:h-9 w-auto max-w-[160px] object-contain pointer-events-none select-none transition-all duration-200 ${
                        isDark ? 'brightness-0 invert opacity-85 group-hover:opacity-100' : 'opacity-75 group-hover:opacity-100'
                      }`}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    {/* Reliable fallback if image path ever fails */}
                    <div
                      className="hidden items-center gap-2 font-bold tracking-tight text-base sm:text-lg select-none"
                      style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 text-xs font-black">
                        {logo.name.charAt(0)}
                      </div>
                      <span>{logo.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continuous Loop Strip 2 (duplicate for infinite seamless scroll) */}
          <div
            aria-hidden="true"
            className="flex shrink-0 items-center animate-marquee-continuous"
            style={{ gap: '48px', paddingRight: '48px' }}
          >
            {PARTNER_LOGOS.map((logo, idx) => (
              <div
                key={`strip2-${logo.id}-${idx}`}
                className="flex items-center justify-center shrink-0 group transition-transform duration-200 hover:scale-105"
                title={`${logo.name} • ${logo.category}`}
              >
                {logo.svgBadge ? (
                  <div
                    className="transition-colors duration-200"
                    style={{
                      color: isDark ? '#f1f5f9' : '#1e293b',
                    }}
                  >
                    {logo.svgBadge}
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center">
                    <img
                      alt={logo.name}
                      src={logo.src}
                      height="36"
                      loading="eager"
                      className={`h-8 sm:h-9 w-auto max-w-[160px] object-contain pointer-events-none select-none transition-all duration-200 ${
                        isDark ? 'brightness-0 invert opacity-85 group-hover:opacity-100' : 'opacity-75 group-hover:opacity-100'
                      }`}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden items-center gap-2 font-bold tracking-tight text-base sm:text-lg select-none"
                      style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 text-xs font-black">
                        {logo.name.charAt(0)}
                      </div>
                      <span>{logo.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continuous Loop Strip 3 (guarantees zero gaps on ultra-wide & 4K screens) */}
          <div
            aria-hidden="true"
            className="hidden lg:flex shrink-0 items-center animate-marquee-continuous"
            style={{ gap: '48px', paddingRight: '48px' }}
          >
            {PARTNER_LOGOS.map((logo, idx) => (
              <div
                key={`strip3-${logo.id}-${idx}`}
                className="flex items-center justify-center shrink-0 group transition-transform duration-200 hover:scale-105"
                title={`${logo.name} • ${logo.category}`}
              >
                {logo.svgBadge ? (
                  <div
                    className="transition-colors duration-200"
                    style={{
                      color: isDark ? '#f1f5f9' : '#1e293b',
                    }}
                  >
                    {logo.svgBadge}
                  </div>
                ) : (
                  <div className="relative flex items-center justify-center">
                    <img
                      alt={logo.name}
                      src={logo.src}
                      height="36"
                      loading="eager"
                      className={`h-8 sm:h-9 w-auto max-w-[160px] object-contain pointer-events-none select-none transition-all duration-200 ${
                        isDark ? 'brightness-0 invert opacity-85 group-hover:opacity-100' : 'opacity-75 group-hover:opacity-100'
                      }`}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const fallback = target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden items-center gap-2 font-bold tracking-tight text-base sm:text-lg select-none"
                      style={{ color: isDark ? '#f1f5f9' : '#1e293b' }}
                    >
                      <div className="w-7 h-7 rounded-lg bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-500 text-xs font-black">
                        {logo.name.charAt(0)}
                      </div>
                      <span>{logo.name}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

