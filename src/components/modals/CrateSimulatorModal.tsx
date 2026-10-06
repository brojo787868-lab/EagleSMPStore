import React, { useState, useEffect, useRef } from 'react';
import { CircleHelp, RefreshCw, ShoppingCart, Sparkles, X } from 'lucide-react';
import { CratePoolItem, StoreItem } from '../../types/store';
import { CRATE_SIM_POOL, STORE_ITEMS } from '../../data/storeData';
import { soundFX } from '../../utils/sound';
import { fireConfetti } from '../../utils/confetti';
import { MinecraftIcon } from '../MinecraftIcons';

interface CrateSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: StoreItem) => void;
  currencySymbol: string;
  currencyRate: number;
}

export const CrateSimulatorModal: React.FC<CrateSimulatorModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  currencySymbol,
  currencyRate,
}) => {
  const [selectedCrateIdx, setSelectedCrateIdx] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [reelItems, setReelItems] = useState<CratePoolItem[]>([]);
  const [wonItem, setWonItem] = useState<CratePoolItem | null>(null);
  const [freeSpinsLeft, setFreeSpinsLeft] = useState(10);
  const reelRef = useRef<HTMLDivElement | null>(null);

  const currentCrate = CRATE_SIM_POOL[selectedCrateIdx];

  const resetReel = () => {
    const pool = currentCrate.pool;
    const generated: CratePoolItem[] = [];
    for (let i = 0; i < 50; i++) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      generated.push({ ...pick, id: `${pick.id}-${i}` });
    }
    setReelItems(generated);
    setWonItem(null);
    if (reelRef.current) {
      reelRef.current.style.transition = 'none';
      reelRef.current.style.transform = 'translateX(0px)';
    }
  };

  useEffect(() => {
    resetReel();
  }, [selectedCrateIdx]);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning || reelItems.length < 40) return;
    setIsSpinning(true);
    setWonItem(null);
    soundFX.playClick();

    const targetItem = reelItems[38];
    const jitter = (Math.random() - 0.5) * 60;
    const offset = -6536 + ((reelRef.current?.parentElement?.clientWidth || 700) / 2 - 86) + jitter;

    if (reelRef.current) {
      reelRef.current.style.transition = 'none';
      reelRef.current.style.transform = 'translateX(0px)';
      void reelRef.current.offsetHeight;
      reelRef.current.style.transition = 'transform 5.2s cubic-bezier(0.12, 0.8, 0.22, 1)';
      reelRef.current.style.transform = `translateX(${offset}px)`;
    }

    let ticks = 0;
    const tickInterval = setInterval(() => {
      ticks++;
      soundFX.playTick();
      if (ticks >= 35) clearInterval(tickInterval);
    }, 130);

    setTimeout(() => {
      setIsSpinning(false);
      setWonItem(targetItem);
      setFreeSpinsLeft((prev) => Math.max(0, prev - 1));
      soundFX.playFanfare();
      fireConfetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F59E0B', '#10B981', '#8B5CF6', '#EC4899', '#38BDF8'],
      });
    }, 5300);
  };

  const linkedStoreItem = STORE_ITEMS.find((item) => item.id === currentCrate.storeId);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-label="Crate Unboxing Simulator"
    >
      <div className="relative w-full max-w-4xl bg-[#0f1420] border border-amber-500/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white tracking-wide flex items-center gap-2">
                CRATE UNBOXING SIMULATOR
                <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded font-mono">
                  PROBABILITY TESTER
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Experience real server crate odds before purchasing keys in the web store.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            aria-label="Close crate simulator"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 px-6 py-3 bg-slate-950/60 border-b border-white/5 overflow-x-auto">
          {CRATE_SIM_POOL.map((crate, idx) => (
            <button
              key={crate.id}
              type="button"
              disabled={isSpinning}
              onClick={() => {
                soundFX.playClick();
                setSelectedCrateIdx(idx);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all whitespace-nowrap flex items-center gap-2 border ${
                selectedCrateIdx === idx
                  ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                  : 'bg-slate-900/80 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              <span>{crate.title}</span>
              <span className="text-[10px] opacity-75 font-mono">{crate.cost}</span>
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/20">
            <div>
              <h3 className="font-bold text-lg text-amber-300 font-display">
                {currentCrate.title}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">{currentCrate.desc}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">
                Free test spins remaining:{' '}
                <strong className="text-emerald-400">{freeSpinsLeft}</strong>
              </span>
              {linkedStoreItem && (
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    onAddToCart(linkedStoreItem);
                  }}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>
                    Buy Real Keys ({currencySymbol}
                    {(linkedStoreItem.price * currencyRate).toFixed(2)})
                  </span>
                </button>
              )}
            </div>
          </div>

          <div className="relative w-full bg-slate-950 rounded-xl p-3 border-2 border-slate-800 shadow-inner overflow-hidden">
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-amber-400 z-20 shadow-[0_0_12px_#f59e0b]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-0 h-0 border-x-6 border-x-transparent border-t-8 border-t-amber-400" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-0 h-0 border-x-6 border-x-transparent border-b-8 border-b-amber-400" />
            </div>
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />

            <div className="overflow-hidden py-3">
              <div
                ref={reelRef}
                className="flex items-center gap-3 w-max"
                style={{ willChange: 'transform' }}
              >
                {reelItems.map((entry, idx) => (
                  <div
                    key={entry.id || idx}
                    className="w-40 h-44 rounded-lg bg-[#141923] border border-white/10 p-3 flex flex-col items-center justify-between text-center select-none shrink-0 relative overflow-hidden transition-all shadow-lg"
                    style={{ borderTopColor: entry.color, borderTopWidth: '3px' }}
                  >
                    <div
                      className="text-[10px] font-mono uppercase tracking-wider font-bold"
                      style={{ color: entry.color }}
                    >
                      {entry.rarity}
                    </div>
                    <div className="my-2 p-3 rounded-lg bg-slate-900/80 border border-white/5 flex items-center justify-center">
                      <MinecraftIcon type={entry.icon} size={36} />
                    </div>
                    <div className="text-xs font-semibold text-slate-200 line-clamp-2 leading-tight">
                      {entry.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleSpin}
              disabled={isSpinning || freeSpinsLeft <= 0}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide uppercase transition-all flex items-center justify-center gap-2 ${
                isSpinning
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'mc-btn-primary text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/25 active:scale-95'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSpinning ? 'Opening Crate...' : 'OPEN CRATE (SIMULATE)'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                resetReel();
              }}
              disabled={isSpinning}
              className="px-4 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 transition-all border border-white/10"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Reel</span>
            </button>
          </div>

          {wonItem && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-amber-500/20 via-purple-500/10 to-slate-900 border-2 border-amber-400/80 text-center animate-in fade-in zoom-in-95 duration-300">
              <span className="text-xs uppercase tracking-widest text-amber-300 font-mono font-bold">
                🎉 YOU UNBOXED
              </span>
              <div className="flex items-center justify-center gap-3 my-2">
                <MinecraftIcon type={wonItem.icon} size={32} />
                <h4
                  className="text-2xl font-bold font-display text-white"
                  style={{ color: wonItem.color }}
                >
                  {wonItem.name}
                </h4>
              </div>
              <p className="text-xs text-slate-300 font-mono">
                Tier:{' '}
                <span className="font-bold uppercase" style={{ color: wonItem.color }}>
                  {wonItem.rarity}
                </span>{' '}
                · Ready to claim in-game with real crate keys!
              </p>
            </div>
          )}

          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <CircleHelp className="w-3.5 h-3.5" />
              Possible Rewards in this Crate:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {currentCrate.pool.map((drop) => (
                <div
                  key={drop.id}
                  className="p-2.5 bg-slate-950/70 border border-white/5 rounded-lg flex items-center gap-2.5"
                >
                  <div className="p-1.5 bg-slate-900 rounded border border-white/5 shrink-0">
                    <MinecraftIcon type={drop.icon} size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-200 font-medium truncate">{drop.name}</div>
                    <div className="text-[10px] font-mono" style={{ color: drop.color }}>
                      {drop.rarity}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
