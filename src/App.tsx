import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { Navbar } from './components/Navbar';
import { HeroPort } from './components/HeroPort';
import { TrustedBy } from './components/TrustedBy';
import { ShippingGame } from './components/ShippingGame';
import { AutomationSection } from './components/AutomationSection';
import { ShippingAI } from './components/ShippingAI';
import { LiveDashboard } from './components/LiveDashboard';
import { PartnerPlatform } from './components/PartnerPlatform';
import { IntegrationsConveyor } from './components/IntegrationsConveyor';
import { GlobalScale } from './components/GlobalScale';
import { ManifestFAQ } from './components/ManifestFAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { QuickStartModal } from './components/QuickStartModal';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>('day');
  const [isQuickStartOpen, setIsQuickStartOpen] = useState(false);
  const [showShippingGame, setShowShippingGame] = useState<boolean>(() => {
    try {
      return localStorage.getItem('zineps_show_shipping_game') !== 'false';
    } catch {
      return true;
    }
  });

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme !== 'day') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleToggleShippingGame = (show: boolean) => {
    setShowShippingGame(show);
    try {
      localStorage.setItem('zineps_show_shipping_game', show ? 'true' : 'false');
    } catch {}
  };

  const handleScrollToGame = () => {
    handleToggleShippingGame(true);
    setTimeout(() => {
      const el = document.getElementById('play-shipping-game');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 60);
  };

  const handleExploreZineps = () => {
    const el = document.getElementById('shipping-ai');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative selection:bg-sky-500/30 selection:text-sky-900 dark:selection:text-sky-200">
      {/* Sticky Minimal Navigation */}
      <Navbar
        theme={theme}
        setTheme={setTheme}
        onOpenQuickStart={() => setIsQuickStartOpen(true)}
      />

      {/* 1. Hero: The Digital Port */}
      <HeroPort
        theme={theme}
        onOpenQuickStart={() => setIsQuickStartOpen(true)}
        onScrollToGame={handleScrollToGame}
      />

      <TrustedBy theme={theme} />

      {/* 2. Playable Shipping Game: Keep the Shipments Moving (Ultra-smooth 60fps Canvas or Removable) */}
      {showShippingGame ? (
        <ShippingGame
          theme={theme}
          onExploreZineps={handleExploreZineps}
          onRemoveGame={() => handleToggleShippingGame(false)}
        />
      ) : (
        <div id="play-shipping-game" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div
            className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-2xl border text-xs font-mono transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-subtle)',
            }}
          >
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interactive mini-game removed (0% background CPU). You can restore it anytime.</span>
            </div>
            <button
              type="button"
              onClick={() => handleToggleShippingGame(true)}
              className="text-xs font-bold text-sky-500 hover:text-sky-400 flex items-center gap-1.5 px-3 py-1 rounded-lg border border-sky-500/30 bg-sky-500/10 hover:bg-sky-500/20 transition-colors cursor-pointer"
            >
              <span>Restore Simulation Game</span>
            </button>
          </div>
        </div>
      )}

      {/* 3. Automation: From Label to Return */}
      <AutomationSection
        theme={theme}
      />

      {/* 5. Shipping AI: The Port Has a Brain */}
      <ShippingAI
        theme={theme}
        onOpenQuickStart={() => setIsQuickStartOpen(true)}
      />

      {/* 6. Live Platform Dashboard: SaaS Control Tower */}
      <LiveDashboard
        theme={theme}
      />

      {/* 7. Partner Platform: 3PLs & Carrier Infrastructure */}
      <PartnerPlatform
        theme={theme}
        onOpenQuickStart={() => setIsQuickStartOpen(true)}
      />

      {/* 8. Integrations: Multi-lane Conveyor System */}
      <IntegrationsConveyor
        theme={theme}
      />

      {/* 9. Global Scale: Worldwide Maritime & Carrier Network */}
      <GlobalScale
        theme={theme}
      />

      {/* 10. Manifest / FAQ: Customs Document Accordion */}
      <ManifestFAQ
        theme={theme}
      />

      {/* 11. Final CTA: Vessel Departing to the Horizon */}
      <FinalCTA
        theme={theme}
        onOpenQuickStart={() => setIsQuickStartOpen(true)}
      />

      {/* 12. Footer & Harbor Status */}
      <Footer
        theme={theme}
      />

      {/* Quick Start / Sandbox Onboarding Modal */}
      <QuickStartModal
        isOpen={isQuickStartOpen}
        onClose={() => setIsQuickStartOpen(false)}
        theme={theme}
      />
    </div>
  );
}
