import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Play, RotateCcw, Heart, ArrowLeft, ArrowRight, ShieldCheck, Zap, Sparkles, ChevronDown, X, Activity } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundManager } from '../utils/audio';

interface ShippingGameProps {
  theme: ThemeMode;
  onExploreZineps: () => void;
  onRemoveGame?: () => void;
}

interface FallingPackage {
  id: number;
  x: number; // 0 - 100 percentage of width
  y: number; // in pixels
  speed: number; // pixels per second
  carrier: string;
  color: string;
  textColor: string;
  weight: string;
  dest: string;
  width: number;
  height: number;
}

interface StackedPackage {
  carrier: string;
  color: string;
  textColor: string;
  offsetX: number;
  rotation: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  size: number;
}

const CARRIERS_CONFIG = [
  { name: 'DPD', color: '#f72585', text: '#ffffff' },
  { name: 'DHL', color: '#ffba08', text: '#0f172a' },
  { name: 'ZINEPS', color: '#4361ee', text: '#ffffff' },
  { name: 'UPS', color: '#7209b7', text: '#ffffff' },
  { name: 'FEDEX', color: '#3a0ca3', text: '#ffffff' },
  { name: 'EXPRESS', color: '#06d6a0', text: '#0f172a' },
];

const TARGET_SHIPMENTS = 20;

export const ShippingGame: React.FC<ShippingGameProps> = ({
  theme,
  onExploreZineps,
  onRemoveGame,
}) => {
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'completed' | 'gameover'>('ready');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [highScore, setHighScore] = useState(0);
  const [gameCollapsed, setGameCollapsed] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // High-performance physics refs (zero React re-renders during active frame loop)
  const vehicleXPercentRef = useRef<number>(50); // 10 to 90
  const vehicleTargetXRef = useRef<number>(50);
  const fallingPackagesRef = useRef<FallingPackage[]>([]);
  const stackedPackagesRef = useRef<StackedPackage[]>([]);
  const particlesRef = useRef<SparkParticle[]>([]);
  const keysPressedRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const lastSpawnTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const gameStateRef = useRef<'ready' | 'playing' | 'completed' | 'gameover'>('ready');
  const scoreRef = useRef<number>(0);

  // Sync ref
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Handle Keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStateRef.current !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressedRef.current.left = true;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressedRef.current.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        keysPressedRef.current.left = false;
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        keysPressedRef.current.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Pause loop when scrolled offscreen to guarantee 0% CPU usage
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMilestoneComplete = useCallback(() => {
    setGameState('completed');
    gameStateRef.current = 'completed';
    soundManager.playSuccess();
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  // Start / Reset Game
  const startGame = useCallback(() => {
    soundManager.playClick();
    setScore(0);
    scoreRef.current = 0;
    setLives(3);
    vehicleXPercentRef.current = 50;
    vehicleTargetXRef.current = 50;
    fallingPackagesRef.current = [];
    stackedPackagesRef.current = [];
    particlesRef.current = [];
    lastSpawnTimeRef.current = performance.now();
    setGameState('playing');
    gameStateRef.current = 'playing';
  }, []);

  // Canvas drawing & animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let lastTime = performance.now();

    // High DPI Canvas resize handler
    const updateCanvasSize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(300, Math.floor(rect.width));
      const height = Math.max(260, Math.floor(rect.height || 360));

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);
      }
    };

    updateCanvasSize();
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    const renderLoop = (time: number) => {
      const delta = Math.min(0.064, (time - lastTime) / 1000); // capped delta for stable physics
      lastTime = time;

      const rectWidth = parseFloat(canvas.style.width) || 600;
      const rectHeight = parseFloat(canvas.style.height) || 360;

      // Only run calculations if visible
      if (isVisibleRef.current) {
        // Clear background
        ctx.fillStyle = theme === 'day' ? '#f8fafc' : theme === 'signal' ? '#080318' : '#0b1120';
        ctx.fillRect(0, 0, rectWidth, rectHeight);

        // Draw warehouse floor grid lines
        ctx.strokeStyle = theme === 'day' ? 'rgba(203, 213, 225, 0.4)' : 'rgba(76, 201, 240, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        const gridSize = 32;
        for (let x = 0; x < rectWidth; x += gridSize) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, rectHeight);
        }
        for (let y = 0; y < rectHeight; y += gridSize) {
          ctx.moveTo(0, y);
          ctx.lineTo(rectWidth, y);
        }
        ctx.stroke();

        // Terminal dock floor baseline
        const dockY = rectHeight - 28;
        ctx.fillStyle = theme === 'day' ? '#e2e8f0' : 'rgba(30, 41, 59, 0.8)';
        ctx.fillRect(0, dockY, rectWidth, 28);
        ctx.strokeStyle = theme === 'day' ? '#cbd5e1' : 'rgba(51, 65, 85, 0.8)';
        ctx.beginPath();
        ctx.moveTo(0, dockY);
        ctx.lineTo(rectWidth, dockY);
        ctx.stroke();

        // Hazard stripes along dock edge
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let x = 0; x < rectWidth; x += 30) {
          ctx.moveTo(x, dockY);
          ctx.lineTo(x + 15, dockY + 28);
        }
        ctx.stroke();

        if (gameStateRef.current === 'playing') {
          // 1. Move Vehicle with keyboard input
          const moveSpeed = 65; // % per second
          if (keysPressedRef.current.left) {
            vehicleTargetXRef.current = Math.max(10, vehicleTargetXRef.current - moveSpeed * delta);
          }
          if (keysPressedRef.current.right) {
            vehicleTargetXRef.current = Math.min(90, vehicleTargetXRef.current + moveSpeed * delta);
          }

          // Smooth lerp to target X for fluid butter motion
          vehicleXPercentRef.current += (vehicleTargetXRef.current - vehicleXPercentRef.current) * Math.min(1, delta * 24);

          // 2. Spawn packages periodically
          const spawnInterval = Math.max(650, 1400 - scoreRef.current * 35);
          if (time - lastSpawnTimeRef.current > spawnInterval) {
            lastSpawnTimeRef.current = time;
            const carrierChoice = CARRIERS_CONFIG[Math.floor(Math.random() * CARRIERS_CONFIG.length)];
            const destinations = ['AMS', 'BER', 'PAR', 'LON', 'MAD', 'VIE'];
            const newPkg: FallingPackage = {
              id: Math.random(),
              x: Math.floor(Math.random() * 70) + 15,
              y: -35,
              speed: 140 + Math.random() * 50 + scoreRef.current * 6,
              carrier: carrierChoice.name,
              color: carrierChoice.color,
              textColor: carrierChoice.text,
              weight: `${(Math.random() * 8 + 1).toFixed(1)}kg`,
              dest: destinations[Math.floor(Math.random() * destinations.length)],
              width: 58,
              height: 28,
            };
            fallingPackagesRef.current.push(newPkg);
          }

          // 3. Update & Draw Falling Packages
          const vehiclePixelX = (vehicleXPercentRef.current / 100) * rectWidth;
          const catchZoneY = dockY - 32;
          const catchToleranceX = 54; // +/- pixels around vehicle center

          const remainingPackages: FallingPackage[] = [];

          for (let i = 0; i < fallingPackagesRef.current.length; i++) {
            const pkg = fallingPackagesRef.current[i];
            pkg.y += pkg.speed * delta;
            const pkgPixelX = (pkg.x / 100) * rectWidth;

            // Collision check
            if (pkg.y >= catchZoneY - 10 && pkg.y <= catchZoneY + 16) {
              const diffX = Math.abs(pkgPixelX - vehiclePixelX);
              if (diffX < catchToleranceX) {
                // CAUGHT
                soundManager.playCatch();
                const offset = (pkgPixelX - vehiclePixelX) * 0.7;
                const tilt = Math.max(-10, Math.min(10, offset * 0.8));

                // Spawn spark particles at catch position
                for (let p = 0; p < 12; p++) {
                  const angle = Math.random() * Math.PI * 2;
                  const speed = Math.random() * 120 + 40;
                  particlesRef.current.push({
                    x: pkgPixelX,
                    y: catchZoneY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed - 50,
                    color: pkg.color,
                    alpha: 1,
                    size: Math.random() * 3 + 2,
                  });
                }

                // Add to physical visual stack
                stackedPackagesRef.current = [
                  ...stackedPackagesRef.current.slice(-5),
                  {
                    carrier: pkg.carrier,
                    color: pkg.color,
                    textColor: pkg.textColor,
                    offsetX: offset,
                    rotation: tilt,
                  },
                ];

                // Increment score in state
                const nextScore = scoreRef.current + 1;
                scoreRef.current = nextScore;
                setScore(nextScore);
                setHighScore((prev) => Math.max(prev, nextScore));

                if (nextScore >= TARGET_SHIPMENTS) {
                  setTimeout(handleMilestoneComplete, 120);
                }
                continue;
              }
            }

            // Missed package check
            if (pkg.y > rectHeight + 20) {
              soundManager.playMiss();
              setLives((prev) => {
                const next = prev - 1;
                if (next <= 0) {
                  setGameState('gameover');
                  gameStateRef.current = 'gameover';
                }
                return next;
              });
              continue;
            }

            remainingPackages.push(pkg);

            // Draw falling package on canvas
            ctx.save();
            ctx.translate(pkgPixelX, pkg.y);

            // Box shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.beginPath();
            ctx.roundRect(-pkg.width / 2 + 2, -pkg.height / 2 + 3, pkg.width, pkg.height, 4);
            ctx.fill();

            // Box body
            ctx.fillStyle = pkg.color;
            ctx.beginPath();
            ctx.roundRect(-pkg.width / 2, -pkg.height / 2, pkg.width, pkg.height, 4);
            ctx.fill();

            // Border highlight
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Carrier label
            ctx.fillStyle = pkg.textColor;
            ctx.font = 'bold 10px monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(pkg.carrier, 0, -4);

            // Destination & weight subline
            ctx.font = '8px monospace';
            ctx.fillText(`${pkg.dest} • ${pkg.weight}`, 0, 7);

            ctx.restore();
          }

          fallingPackagesRef.current = remainingPackages;
        }

        // 4. Draw Particle Sparks
        const remainingParticles: SparkParticle[] = [];
        for (let i = 0; i < particlesRef.current.length; i++) {
          const pt = particlesRef.current[i];
          pt.x += pt.vx * delta;
          pt.y += pt.vy * delta;
          pt.vy += 220 * delta; // gravity
          pt.alpha -= 1.8 * delta;

          if (pt.alpha > 0) {
            ctx.save();
            ctx.globalAlpha = Math.max(0, pt.alpha);
            ctx.fillStyle = pt.color;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            remainingParticles.push(pt);
          }
        }
        particlesRef.current = remainingParticles;

        // 5. Draw Electric Cargo Forklift & Stack
        const curVehicleX = (vehicleXPercentRef.current / 100) * rectWidth;
        const vehicleY = dockY - 12;

        ctx.save();
        ctx.translate(curVehicleX, vehicleY);

        // Draw Stacked packages on forks
        let stackYOffset = -14;
        for (let s = 0; s < stackedPackagesRef.current.length; s++) {
          const spkg = stackedPackagesRef.current[s];
          const stackWidth = 52 - s * 2;
          const stackHeight = 14;

          ctx.save();
          ctx.translate(spkg.offsetX * 0.6, stackYOffset);
          ctx.rotate((spkg.rotation * Math.PI) / 180);

          ctx.fillStyle = spkg.color;
          ctx.beginPath();
          ctx.roundRect(-stackWidth / 2, -stackHeight / 2, stackWidth, stackHeight, 3);
          ctx.fill();

          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();

          ctx.fillStyle = spkg.textColor;
          ctx.font = 'bold 8px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(spkg.carrier, 0, 0);

          ctx.restore();
          stackYOffset -= 15;
        }

        // Draw Forklift Chassis
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
        ctx.beginPath();
        ctx.ellipse(0, 14, 46, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        // Counterweight (back)
        ctx.fillStyle = '#d97706';
        ctx.beginPath();
        ctx.roundRect(-42, -16, 20, 22, 3);
        ctx.fill();

        // Main chassis body
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.roundRect(-24, -12, 48, 20, 4);
        ctx.fill();
        ctx.strokeStyle = '#78350f';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Cabin safety frame
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(-18, -32, 24, 22);

        // Flashing rooftop beacon
        ctx.fillStyle = gameStateRef.current === 'playing' ? '#ef4444' : '#94a3b8';
        ctx.beginPath();
        ctx.arc(-6, -34, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Mast & Lifting Forks
        ctx.fillStyle = '#334155';
        ctx.fillRect(20, -36, 6, 42);
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(20, 2, 30, 4); // horizontal fork blades

        // Wheels
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(-26, 8, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(14, 8, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Wheel hubs
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(-26, 8, 2.5, 0, Math.PI * 2);
        ctx.arc(14, 8, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Headlight glow
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(22, -4, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      animationFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [theme, handleMilestoneComplete]);

  // Direct mouse / pointer drag handling for instant butter-smooth tracking
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX;
    const percent = Math.max(12, Math.min(88, ((clientX - rect.left) / rect.width) * 100));
    vehicleTargetXRef.current = percent;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing' || e.buttons === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX;
    const percent = Math.max(12, Math.min(88, ((clientX - rect.left) / rect.width) * 100));
    vehicleTargetXRef.current = percent;
  };

  // Touch step handlers
  const handleTouchLeft = () => {
    vehicleTargetXRef.current = Math.max(12, vehicleTargetXRef.current - 14);
  };

  const handleTouchRight = () => {
    vehicleTargetXRef.current = Math.min(88, vehicleTargetXRef.current + 14);
  };

  return (
    <section
      id="play-shipping-game"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Game Card Container */}
      <div
        className="rounded-3xl border shadow-xl overflow-hidden transition-all duration-300 relative"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-strong)',
        }}
      >
        {/* Header Ribbon / Narrative Anchor */}
        <div
          className="px-5 sm:px-6 py-4 border-b flex flex-wrap items-center justify-between gap-4"
          style={{
            backgroundColor: 'var(--bg-surface-elevated)',
            borderColor: 'var(--border-subtle)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white shadow-xs"
              style={{ backgroundColor: 'var(--accent-secondary)' }}
            >
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500">
                  Interactive Dispatch Mini-Game
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
                  <Activity className="w-3 h-3 animate-pulse" />
                  60 FPS CANVAS
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                KEEP THE SHIPMENTS MOVING.
              </h2>
            </div>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Score Display */}
            <div
              className="px-3.5 py-1.5 rounded-xl font-mono border flex items-center gap-2.5 text-xs"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-subtle)',
              }}
            >
              <div>
                <span className="text-[9px] uppercase block" style={{ color: 'var(--text-muted)' }}>Routed</span>
                <span className="text-xs sm:text-sm font-bold text-sky-500">{String(score).padStart(2, '0')} / {TARGET_SHIPMENTS}</span>
              </div>
              <div className="h-5 w-px bg-slate-500/20" />
              <div>
                <span className="text-[9px] uppercase block" style={{ color: 'var(--text-muted)' }}>Best</span>
                <span className="text-xs sm:text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{String(highScore).padStart(2, '0')}</span>
              </div>
            </div>

            {/* Lives Indicator */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border bg-rose-500/5 border-rose-500/20">
              {[1, 2, 3].map((heartIndex) => (
                <Heart
                  key={heartIndex}
                  className={`w-3.5 h-3.5 transition-all duration-300 ${
                    heartIndex <= lives ? 'fill-rose-500 text-rose-500 scale-100' : 'text-slate-300 dark:text-slate-700 scale-90'
                  }`}
                />
              ))}
            </div>

            {/* Minimize / Expand Toggle */}
            <button
              id="game-collapse-btn"
              type="button"
              onClick={() => setGameCollapsed(!gameCollapsed)}
              className="p-2 rounded-xl border text-xs font-mono transition-colors hover:bg-slate-500/10"
              style={{
                borderColor: 'var(--border-subtle)',
                color: 'var(--text-secondary)',
              }}
              title={gameCollapsed ? 'Expand Simulation' : 'Minimize Simulation'}
              aria-label="Toggle game collapse"
            >
              <ChevronDown className={`w-4 h-4 transition-transform ${gameCollapsed ? 'rotate-180' : ''}`} />
            </button>

            {/* Quick Remove / Dismiss Button */}
            {onRemoveGame && (
              <button
                id="game-remove-btn"
                type="button"
                onClick={onRemoveGame}
                className="px-2.5 py-1.5 rounded-xl border text-xs font-mono text-rose-500/80 hover:text-rose-400 hover:bg-rose-500/10 border-rose-500/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Remove mini-game from page"
                aria-label="Remove Mini-Game"
              >
                <X className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Remove Game</span>
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Game Arena Body */}
        {!gameCollapsed && (
          <div className="p-4 sm:p-6">
            {/* Instruction Banner */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3 font-mono" style={{ color: 'var(--text-muted)' }}>
              <span>
                Controls: <strong className="text-sky-400">Arrow Keys</strong> or <strong className="text-sky-400">A / D</strong> • Or <strong className="text-sky-400">Click & Drag</strong> mouse/finger across dock.
              </span>
              <span className="hidden md:inline">Hardware accelerated 60fps • 0% CPU when scrolled away</span>
            </div>

            {/* The Simulation Arena Canvas Container */}
            <div
              ref={containerRef}
              id="game-arena"
              className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border select-none transition-colors"
              style={{
                borderColor: 'var(--border-subtle)',
              }}
            >
              {/* HTML5 Double-Buffered Canvas for Zero-Lag Physics */}
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                className="absolute inset-0 w-full h-full cursor-ew-resize touch-none"
              />

              {/* Ready State Overlay */}
              {gameState === 'ready' && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs bg-slate-900/40 pointer-events-auto">
                  <div className="max-w-md p-6 rounded-2xl border shadow-2xl bg-slate-900/95 text-white border-sky-500/30">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 mx-auto flex items-center justify-center mb-4">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Autonomous Dispatch Challenge</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      Drive the autonomous electric cargo hauler. Catch incoming parcels from DPD, DHL, FedEx, and UPS before they hit the dock.
                    </p>
                    <button
                      id="game-start-btn"
                      type="button"
                      onClick={startGame}
                      className="w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide text-white bg-sky-500 hover:bg-sky-400 shadow-lg shadow-sky-500/30 transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>START SHIPMENT DISPATCH</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Game Over State */}
              {gameState === 'gameover' && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xs bg-slate-900/60 pointer-events-auto">
                  <div className="max-w-md p-6 rounded-2xl border shadow-2xl bg-slate-900/95 text-white border-rose-500/40">
                    <span className="text-xs font-mono font-bold uppercase text-rose-400 block mb-1">
                      Carrier Capacity Backlogged
                    </span>
                    <h3 className="text-2xl font-black mb-2">Shipment Missed!</h3>
                    <p className="text-xs text-slate-300 mb-6">
                      You routed <span className="font-bold text-sky-400">{score} shipments</span> before manual dispatch bottlenecked.
                    </p>
                    <div className="flex gap-3">
                      <button
                        id="game-retry-btn"
                        type="button"
                        onClick={startGame}
                        className="flex-1 py-3 rounded-xl font-bold text-sm text-white bg-sky-500 hover:bg-sky-400 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Try Again</span>
                      </button>
                      <button
                        id="game-skip-btn"
                        type="button"
                        onClick={onExploreZineps}
                        className="flex-1 py-3 rounded-xl font-bold text-sm border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer"
                      >
                        Explore Zineps
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Completed / Milestone State: "IMAGINE DOING THIS 10,000 TIMES" */}
              {gameState === 'completed' && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md bg-slate-950/80 animate-in fade-in duration-500 pointer-events-auto">
                  <div className="max-w-lg p-8 rounded-3xl border shadow-2xl bg-slate-900 text-white border-amber-500/40 relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl" />
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 mb-4">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      20 SHIPMENTS ROUTED SUCCESSFULLY
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug mb-3">
                      IMAGINE DOING THIS <br />
                      <span className="text-amber-400">10,000 TIMES A DAY.</span>
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6 font-medium">
                      Manual sorting and carrier chasing breaks at scale. <br />
                      <strong className="text-white">Let Zineps handle it autonomously.</strong>
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        id="game-completed-cta"
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          onExploreZineps();
                        }}
                        className="flex-1 py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/30 transition-transform active:scale-95 cursor-pointer"
                      >
                        EXPLORE ZINEPS AI ENGINE
                      </button>
                      <button
                        id="game-replay-btn"
                        type="button"
                        onClick={startGame}
                        className="py-3.5 px-5 rounded-xl font-bold text-sm border border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-800 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Replay</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile On-Screen Touch Arrows */}
              <div className="absolute bottom-3 left-3 right-3 flex justify-between sm:hidden pointer-events-auto z-20">
                <button
                  id="game-touch-left"
                  type="button"
                  onTouchStart={handleTouchLeft}
                  onClick={handleTouchLeft}
                  className="w-14 h-14 rounded-2xl bg-slate-900/85 text-white border border-slate-700 flex items-center justify-center active:scale-90 active:bg-sky-600 shadow-xl"
                  aria-label="Move Forklift Left"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <button
                  id="game-touch-right"
                  type="button"
                  onTouchStart={handleTouchRight}
                  onClick={handleTouchRight}
                  className="w-14 h-14 rounded-2xl bg-slate-900/85 text-white border border-slate-700 flex items-center justify-center active:scale-90 active:bg-sky-600 shadow-xl"
                  aria-label="Move Forklift Right"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
