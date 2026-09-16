import React, { useState, useEffect } from 'react';
import { Anchor, Sun, Moon, Radio, Menu, X, ArrowUpRight, ShieldCheck, Check, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  onOpenQuickStart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, setTheme, onOpenQuickStart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Automation', href: '#automation' },
    { label: 'Shipping AI', href: '#shipping-ai' },
    { label: 'Platform', href: '#platform' },
    { label: 'Partners', href: '#partners' },
    { label: 'Integrations', href: '#integrations' },
    { label: 'Manifest FAQ', href: '#manifest' },
  ];

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 backdrop-blur-md shadow-sm border-b'
          : 'py-5 bg-transparent'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--bg-surface)' : 'transparent',
        borderColor: scrolled ? 'var(--border-subtle)' : 'transparent',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <a
          href="#"
          id="nav-brand-link"
          className="flex items-center gap-3 group"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden transition-transform group-hover:scale-105"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--accent-primary-contrast, #0a071b)',
              boxShadow: 'var(--glow-effect)'
            }}
          >
            {/* Harbor Crane & Port Anchor Icon */}
            <Anchor className="w-5 h-5 relative z-10" />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping opacity-75" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight leading-none" style={{ color: 'var(--text-primary)' }}>
                ZINEPS
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase px-1.5 py-0.5 rounded tracking-wider border font-semibold"
                style={{
                  backgroundColor: 'var(--badge-bg)',
                  color: 'var(--badge-text)',
                  borderColor: 'var(--border-subtle)'
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                PORT v2.4
              </span>
            </div>
            <span className="text-[11px] font-medium tracking-wide uppercase font-mono hidden md:block" style={{ color: 'var(--text-muted)' }}>
              Intelligent Logistics Port
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full border backdrop-blur-md"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)'
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 hover:scale-105"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Controls & CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Selector Segmented Pill (Light / Dark / Signal) */}
          <div
            id="theme-selector-pill"
            className="flex items-center p-1 rounded-full border shadow-xs"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
            }}
            title="Switch Port Display Theme"
          >
            <button
              id="theme-btn-day"
              type="button"
              onClick={() => setTheme('day')}
              className={`p-1.5 px-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                theme === 'day'
                  ? 'bg-[#ffba08] text-[#120e33] shadow-xs font-bold'
                  : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
              title="Light (Day Port)"
              aria-label="Switch to Light Theme"
            >
              <Sun className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Light</span>
            </button>
            <button
              id="theme-btn-night"
              type="button"
              onClick={() => setTheme('night')}
              className={`p-1.5 px-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                theme === 'night'
                  ? 'bg-[#4361ee] text-[#ffffff] shadow-xs font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Dark (Night Port)"
              aria-label="Switch to Dark Theme"
            >
              <Moon className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Dark</span>
            </button>
            <button
              id="theme-btn-signal"
              type="button"
              onClick={() => setTheme('signal')}
              className={`p-1.5 px-2.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                theme === 'signal'
                  ? 'bg-[#f72585] text-[#ffffff] shadow-xs font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Signal (Neon Radar)"
              aria-label="Switch to Signal Theme"
            >
              <Radio className="w-3.5 h-3.5" />
              <span className="text-[11px] hidden sm:inline">Signal</span>
            </button>
          </div>

          {/* Primary CTA */}
          <button
            id="nav-cta-start-shipping"
            type="button"
            onClick={onOpenQuickStart}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-extrabold tracking-wide transition-all duration-200 hover:scale-105 shadow-sm active:scale-95"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--accent-primary-contrast, #0a071b)',
            }}
          >
            <span>START SHIPPING</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            id="nav-mobile-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg lg:hidden border"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              borderColor: 'var(--border-subtle)',
              color: 'var(--text-primary)'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer"
          className="lg:hidden mt-3 mx-4 p-5 rounded-2xl border shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--border-strong)',
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                Port Navigation
              </span>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-500">
                <ShieldCheck className="w-4 h-4" />
                <span>99.99% Port Uptime</span>
              </div>
            </div>

            {/* Links */}
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold rounded-lg transition-colors hover:bg-slate-500/10"
                style={{ color: 'var(--text-primary)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {/* Visually Distinct Accessible Mobile Theme Toggle Switch */}
            <div
              id="mobile-theme-drawer-switch"
              className="mt-1 p-3.5 rounded-xl border flex flex-col gap-2.5"
              style={{
                backgroundColor: 'var(--bg-surface-elevated)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent-primary)' }} />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                    Display Mode
                  </span>
                </div>
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold uppercase tracking-wide"
                  style={{
                    backgroundColor:
                      theme === 'day'
                        ? 'rgba(255, 186, 8, 0.2)'
                        : theme === 'night'
                        ? 'rgba(76, 201, 240, 0.2)'
                        : 'rgba(247, 37, 133, 0.22)',
                    color:
                      theme === 'day'
                        ? '#ffba08'
                        : theme === 'night'
                        ? '#4cc9f0'
                        : '#f72585',
                  }}
                >
                  {theme === 'day' ? 'Light Active' : theme === 'night' ? 'Dark Active' : 'Signal Active'}
                </span>
              </div>

              {/* 3 Large Accessible Touch Buttons */}
              <div
                role="radiogroup"
                aria-label="Theme mode selector"
                className="grid grid-cols-3 gap-2"
              >
                {/* 1. Light (Day Port) */}
                <button
                  id="mobile-theme-opt-light"
                  type="button"
                  role="radio"
                  aria-checked={theme === 'day'}
                  onClick={() => setTheme('day')}
                  className={`min-h-[58px] p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 text-center ${
                    theme === 'day'
                      ? 'border-[#ffba08] shadow-[0_0_12px_rgba(255,186,8,0.25)] ring-2 ring-[#ffba08]/20'
                      : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: theme === 'day' ? '#ffffff' : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#ffba08] text-[#120e33] shadow-xs">
                      <Sun className="w-3 h-3" />
                    </div>
                    {theme === 'day' && <Check className="w-3 h-3 text-[#ffba08]" />}
                  </div>
                  <span className="text-xs font-bold leading-tight" style={{ color: theme === 'day' ? '#120e33' : 'var(--text-primary)' }}>
                    Light
                  </span>
                  <span className="text-[9px] font-mono leading-none" style={{ color: theme === 'day' ? '#6b7280' : 'var(--text-muted)' }}>
                    Day Port
                  </span>
                </button>

                {/* 2. Dark (Night Port) */}
                <button
                  id="mobile-theme-opt-dark"
                  type="button"
                  role="radio"
                  aria-checked={theme === 'night'}
                  onClick={() => setTheme('night')}
                  className={`min-h-[58px] p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 text-center ${
                    theme === 'night'
                      ? 'border-[#4cc9f0] shadow-[0_0_14px_rgba(76,201,240,0.3)] ring-2 ring-[#4cc9f0]/20'
                      : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: theme === 'night' ? '#120d2e' : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#4361ee] text-white shadow-xs">
                      <Moon className="w-3 h-3 text-[#4cc9f0]" />
                    </div>
                    {theme === 'night' && <Check className="w-3 h-3 text-[#4cc9f0]" />}
                  </div>
                  <span className="text-xs font-bold leading-tight" style={{ color: theme === 'night' ? '#ffffff' : 'var(--text-primary)' }}>
                    Dark
                  </span>
                  <span className="text-[9px] font-mono leading-none" style={{ color: theme === 'night' ? '#958ec7' : 'var(--text-muted)' }}>
                    Night Port
                  </span>
                </button>

                {/* 3. Signal (Neon Radar) */}
                <button
                  id="mobile-theme-opt-signal"
                  type="button"
                  role="radio"
                  aria-checked={theme === 'signal'}
                  onClick={() => setTheme('signal')}
                  className={`min-h-[58px] p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 active:scale-95 text-center ${
                    theme === 'signal'
                      ? 'border-[#f72585] shadow-[0_0_16px_rgba(247,37,133,0.38)] ring-2 ring-[#f72585]/20'
                      : 'border-transparent hover:border-slate-300 dark:hover:border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: theme === 'signal' ? '#1a0f44' : 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  <div className="flex items-center gap-1">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-[#f72585] text-white shadow-xs">
                      <Radio className="w-3 h-3" />
                    </div>
                    {theme === 'signal' && <Check className="w-3 h-3 text-[#f72585]" />}
                  </div>
                  <span className="text-xs font-bold leading-tight" style={{ color: theme === 'signal' ? '#ffffff' : 'var(--text-primary)' }}>
                    Signal
                  </span>
                  <span className="text-[9px] font-mono leading-none" style={{ color: theme === 'signal' ? '#c084fc' : 'var(--text-muted)' }}>
                    Neon Radar
                  </span>
                </button>
              </div>

              {/* High-visibility Palette Indicators */}
              <div className="flex items-center justify-between text-[11px] font-mono px-3 py-1.5 rounded-lg bg-black/20 text-slate-300">
                <span>Color Contrast:</span>
                <span className="font-bold flex items-center gap-1.5">
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: theme === 'day' ? '#ffba08' : theme === 'night' ? '#4cc9f0' : '#f72585' }}
                  />
                  {theme === 'day' ? 'Warm Daylight' : theme === 'night' ? 'Cyber Indigo' : 'Electric Magenta'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t flex flex-col gap-3" style={{ borderColor: 'var(--border-subtle)' }}>
              <button
                id="mobile-cta-start-shipping"
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuickStart();
                }}
                className="w-full py-3 rounded-xl text-center text-sm font-extrabold tracking-wide flex items-center justify-center gap-2 shadow-sm"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--accent-primary-contrast, #0a071b)',
                }}
              >
                <span>START SHIPPING NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
