import React from 'react';
import { Check, Crown, Minus, X } from 'lucide-react';
import { StoreItem } from '../../types/store';
import { RANK_COMPARISON, RANK_HEADERS, STORE_ITEMS } from '../../data/storeData';
import { soundFX } from '../../utils/sound';
import { TelegramIcon } from '../MinecraftIcons';

interface RankMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: StoreItem) => void;
  currencySymbol: string;
  currencyRate: number;
}

function renderCellValue(val: string) {
  if (val === '✅' || val.startsWith('✅')) {
    return (
      <span className="text-emerald-400 font-bold inline-flex items-center gap-1">
        <Check className="w-4 h-4" />
      </span>
    );
  }
  if (val === '❌') {
    return (
      <span className="text-slate-600 inline-flex items-center">
        <Minus className="w-4 h-4" />
      </span>
    );
  }
  return val;
}

export const RankMatrixModal: React.FC<RankMatrixModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  currencySymbol,
  currencyRate,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
      role="dialog"
      aria-label="Server Rank Comparison Matrix"
    >
      <div className="relative w-full max-w-5xl bg-[#0f1420] border border-amber-500/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30 text-amber-400">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white tracking-wide">
                SERVER RANK COMPARISON MATRIX
              </h2>
              <p className="text-xs text-slate-400">
                Detailed comparison of commands, limits, kits, and lifetime privileges.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            aria-label="Close rank matrix"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-x-auto p-6">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-3 px-4 text-xs font-mono uppercase text-slate-400 font-semibold w-1/4">
                  Feature / Perk
                </th>
                {RANK_HEADERS.map((header) => {
                  const storeItem = STORE_ITEMS.find((it) => it.id === header.id);
                  return (
                    <th key={header.id} className="py-3 px-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                          {header.badge}
                        </span>
                        <span
                          className="font-bold font-display text-base tracking-wide"
                          style={{ color: header.color }}
                        >
                          {header.name}
                        </span>
                        {storeItem && (
                          <div className="mt-1 flex flex-col items-center gap-1">
                            <span className="text-xs font-mono font-bold text-amber-300">
                              {currencySymbol}
                              {(storeItem.price * currencyRate).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                soundFX.playClick();
                                onAddToCart(storeItem);
                              }}
                              aria-label={`Add ${storeItem.name} to cart`}
                              className="px-2.5 py-1 text-[11px] font-bold rounded bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-300 border border-amber-500/30 transition-all"
                            >
                              Add to Cart
                            </button>
                            <a
                              href={`https://t.me/TheKillerDGod?text=${encodeURIComponent(
                                `Hello TheKillerDGod! I want to buy the "${storeItem.name}" (${currencySymbol}${(
                                  storeItem.price * currencyRate
                                ).toFixed(2)}) on Eagle SMP.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => soundFX.playClick()}
                              className="px-2 py-0.5 text-[10px] rounded bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#38bdf8] border border-[#229ED9]/30 flex items-center gap-1 transition-colors"
                              title="Buy directly via Telegram with TheKillerDGod"
                            >
                              <TelegramIcon size={10} className="text-[#38bdf8]" />
                              <span>Telegram</span>
                            </a>
                          </div>
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs">
              {RANK_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-300">{row.perk}</td>
                  <td className="py-3 px-3 text-center text-pink-300 font-bold font-mono bg-pink-500/5">
                    {renderCellValue(row.primeEaglePlus)}
                  </td>
                  <td className="py-3 px-3 text-center text-purple-300 font-bold font-mono bg-purple-500/5">
                    {renderCellValue(row.primeEagle)}
                  </td>
                  <td className="py-3 px-3 text-center text-emerald-300 font-bold font-mono bg-emerald-500/5">
                    {renderCellValue(row.eagle)}
                  </td>
                  <td className="py-3 px-3 text-center text-amber-200/90 font-mono">
                    {renderCellValue(row.mvpPlus)}
                  </td>
                  <td className="py-3 px-3 text-center text-cyan-300 font-mono">
                    {renderCellValue(row.vvipPlus)}
                  </td>
                  <td className="py-3 px-3 text-center text-slate-300 font-mono">
                    {renderCellValue(row.vip)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-slate-950/70 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            ⚡ <strong>Upgrading?</strong> If you already own a rank, log in with your IGN and our
            system only charges the price difference!
          </div>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
