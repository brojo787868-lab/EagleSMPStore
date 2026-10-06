import React, { useState } from 'react';
import { CircleCheck, ShoppingCart, Terminal, X } from 'lucide-react';
import { StoreItem } from '../../types/store';
import { soundFX } from '../../utils/sound';
import { MinecraftIcon, MinecraftTooltip, TelegramIcon } from '../MinecraftIcons';

interface ItemDetailModalProps {
  item: StoreItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: StoreItem, qty: number) => void;
  currencySymbol: string;
  currencyRate: number;
  playerIgn: string;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
  currencySymbol,
  currencyRate,
  playerIgn,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !item) return null;

  const totalStr = (item.price * currencyRate * quantity).toFixed(2);
  const ign = playerIgn || 'YourIGN';
  const telegramUrl = `https://t.me/TheKillerDGod?text=${encodeURIComponent(
    `Hello TheKillerDGod! I want to order "${item.name}" (Qty: ${quantity}, Total: ${currencySymbol}${totalStr}) on Eagle SMP.\nMy Minecraft IGN is: ${ign}`
  )}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-label={`${item.name} Details`}
    >
      <div className="relative w-full max-w-2xl bg-[#0f1420] border border-amber-500/40 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-800/80 rounded-lg border border-white/10">
              <MinecraftIcon type={item.minecraftIcon} size={28} />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                {item.category.toUpperCase()} PACKAGE
              </div>
              <h2 className="text-xl font-bold font-display text-white tracking-wide">
                {item.name}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onClose();
            }}
            aria-label="Close item details"
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
              In-Game Item Preview &amp; Lore:
            </div>
            <MinecraftTooltip title={`&6&l${item.name}`} lore={item.lore} />
          </div>

          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
              Unlocked Perks &amp; Privileges:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {item.perks.map((perk, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 p-2.5 bg-slate-950/60 rounded-lg border border-white/5 text-xs text-slate-200"
                >
                  <CircleCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{perk.replace(/&[0-9a-fk-or]/g, '')}</span>
                </div>
              ))}
            </div>
          </div>

          {item.crateRewards && item.crateRewards.length > 0 && (
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-2 font-semibold">
                Possible Crate Drops &amp; Probabilities:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.crateRewards.map((reward, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-slate-950/60 border border-white/5 rounded-lg flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-200 truncate mr-2">{reward.name}</span>
                    <span className="font-mono text-amber-300 font-bold text-[11px] shrink-0">
                      {reward.chance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-1.5 flex items-center gap-1.5 font-semibold">
              <Terminal className="w-3.5 h-3.5 text-amber-400" />
              Automated Server Console Dispatch:
            </div>
            <div className="p-3 bg-black/80 rounded-lg border border-white/10 font-mono text-[11px] text-emerald-400 space-y-1 overflow-x-auto">
              {item.serverCommands.map((cmd, idx) => (
                <div key={idx} className="truncate">
                  <span className="text-slate-500">[Server]:</span> {cmd.replace(/%player%/g, ign)}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-950/90 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-mono">Quantity:</span>
            <div className="flex items-center border border-white/10 rounded-lg bg-slate-900">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                aria-label="Decrease quantity"
                className="px-3 py-1 text-slate-400 hover:text-white transition-colors"
              >
                -
              </button>
              <span className="px-3 py-1 font-mono text-xs font-bold text-amber-300">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setQuantity(quantity + 1);
                }}
                aria-label="Increase quantity"
                className="px-3 py-1 text-slate-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>
            <div className="text-right ml-2">
              <div className="text-xl font-bold font-mono text-amber-400">
                {currencySymbol}
                {totalStr}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#229ED9] hover:bg-[#1d8bc0] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#229ED9]/20"
              title="Message @TheKillerDGod directly on Telegram to buy"
            >
              <TelegramIcon size={16} className="text-white" />
              <span>Buy via Telegram (@TheKillerDGod)</span>
            </a>

            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                soundFX.playOrb();
                onAddToCart(item, quantity);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-2.5 mc-btn-primary text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 shadow-lg shadow-amber-500/20"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
