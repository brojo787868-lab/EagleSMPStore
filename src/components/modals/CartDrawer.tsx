import React, { useState } from 'react';
import { ArrowRight, CircleAlert, ShoppingBag, Tag, Trash2, X } from 'lucide-react';
import { CartItem } from '../../types/store';
import { SERVER_CONFIG } from '../../data/storeData';
import { soundFX } from '../../utils/sound';
import { MinecraftIcon, PlayerAvatar, TelegramIcon } from '../MinecraftIcons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
  onOpenCheckout: () => void;
  playerIgn: string;
  onOpenIgnModal: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountPercent: number;
  currencySymbol: string;
  currencyRate: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  playerIgn,
  onOpenIgnModal,
  couponCode,
  setCouponCode,
  discountPercent,
  currencySymbol,
  currencyRate,
}) => {
  const [inputCode, setInputCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; isError: boolean } | null>(
    null
  );

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const discountAmount = (discountPercent / 100) * subtotal;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-label="Shopping Cart">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0f1420] border-l border-amber-500/30 flex flex-col shadow-2xl">
          <div className="p-5 border-b border-white/10 bg-slate-900/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg font-display text-white tracking-wide">
                  YOUR SHOPPING CART
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} in basket
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              aria-label="Close shopping cart"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-5 py-3.5 bg-slate-950 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PlayerAvatar ign={playerIgn} size={32} showStatus={true} />
              <div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                  Recipient Minecraft IGN:
                </div>
                <div className="text-xs font-bold text-emerald-400 font-mono">
                  {playerIgn || 'Not set (Guest)'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onOpenIgnModal();
              }}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium underline"
            >
              {playerIgn ? 'Change' : 'Set IGN'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-12 h-12 text-slate-600 mb-3" />
                <p className="font-medium text-slate-300">Your cart is currently empty</p>
                <p className="text-xs text-slate-500 mt-1">
                  Browse our lifetime ranks and mystery crate keys to power up your Minecraft
                  gameplay.
                </p>
              </div>
            ) : (
              cart.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-900/70 border border-white/5 rounded-xl flex items-center justify-between gap-3 group hover:border-amber-500/30 transition-all"
                >
                  <div className="p-2 bg-slate-950 rounded-lg border border-white/5 shrink-0">
                    <MinecraftIcon type={item.minecraftIcon} size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <div className="text-xs font-mono text-amber-400 mt-0.5">
                      {currencySymbol}
                      {(item.price * currencyRate * quantity).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center border border-white/10 rounded-lg bg-slate-950">
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        onUpdateQuantity(item.id, quantity - 1);
                      }}
                      aria-label={`Decrease quantity of ${item.name}`}
                      className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-2 text-xs font-mono font-bold text-slate-200">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        onUpdateQuantity(item.id, quantity + 1);
                      }}
                      aria-label={`Increase quantity of ${item.name}`}
                      className="px-2 py-0.5 text-xs text-slate-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      onRemoveItem(item.id);
                    }}
                    aria-label={`Remove ${item.name} from cart`}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-5 bg-slate-950 border-t border-white/10 space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  soundFX.playClick();
                  const clean = inputCode.trim().toUpperCase();
                  if (!clean) return;
                  if (clean === 'EAGLE20') {
                    setCouponCode('EAGLE20');
                    setCouponMessage({
                      text: 'Coupon EAGLE20 applied! 20% discount granted.',
                      isError: false,
                    });
                    soundFX.playOrb();
                  } else if (clean === 'SUMMER') {
                    setCouponCode('SUMMER');
                    setCouponMessage({
                      text: 'Coupon SUMMER applied! 15% discount granted.',
                      isError: false,
                    });
                    soundFX.playOrb();
                  } else if (clean === 'LAUNCH') {
                    setCouponCode('LAUNCH');
                    setCouponMessage({
                      text: 'Coupon LAUNCH applied! 10% discount granted.',
                      isError: false,
                    });
                    soundFX.playOrb();
                  } else {
                    setCouponMessage({
                      text: 'Invalid promotional code. Try EAGLE20 or SUMMER.',
                      isError: true,
                    });
                  }
                }}
                className="space-y-1.5"
              >
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      aria-label="Coupon Code"
                      placeholder="Coupon Code (e.g. EAGLE20)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs font-mono uppercase text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg border border-white/10 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <div
                    className={`text-[11px] ${
                      couponMessage.isError ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {couponMessage.text}
                  </div>
                )}
              </form>

              <div className="space-y-1.5 text-xs text-slate-400 font-mono pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-slate-200">
                    {currencySymbol}
                    {(subtotal * currencyRate).toFixed(2)}
                  </span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>
                      Discount ({discountPercent}% - {couponCode}):
                    </span>
                    <span>
                      -{currencySymbol}
                      {(discountAmount * currencyRate).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/5 font-display">
                  <span>TOTAL DUE:</span>
                  <span className="text-amber-400 font-mono">
                    {currencySymbol}
                    {(finalTotal * currencyRate).toFixed(2)}
                  </span>
                </div>
              </div>

              {!playerIgn && (
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center gap-2 text-xs text-amber-300">
                  <CircleAlert className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>
                    Please provide your Minecraft username to deliver packages in-game.
                  </span>
                </div>
              )}

              {cart.length > 0 && (
                <a
                  href={`https://t.me/TheKillerDGod?text=${encodeURIComponent(
                    `Hello @TheKillerDGod! I want to buy the following Rank / Item from Eagle SMP:\nItems: ${cart
                      .map((entry) => `${entry.item.name} (x${entry.quantity})`)
                      .join(', ')}\nTotal: ${currencySymbol}${(finalTotal * currencyRate).toFixed(
                      2
                    )}\nPlayer IGN: ${playerIgn || 'Steve'}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFX.playClick()}
                  className="w-full py-3 rounded-lg bg-[#229ED9] hover:bg-[#1d8bc0] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#229ED9]/25"
                >
                  <TelegramIcon size={16} className="text-white" />
                  <span>Buy via Telegram ({SERVER_CONFIG.developer.telegram})</span>
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onOpenCheckout();
                }}
                className="w-full py-3.5 mc-btn-primary text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 shadow-lg shadow-amber-500/20"
              >
                <span>PROCEED TO WEB CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[10px] text-slate-500">
                Instant Automated LuckPerms Delivery · 256-bit Encrypted Checkout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
