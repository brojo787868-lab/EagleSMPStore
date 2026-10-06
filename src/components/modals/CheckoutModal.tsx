import React, { useState } from 'react';
import { Check, CircleCheckBig, Copy, ExternalLink, Gift, Lock, MessageSquare, Sparkles, X } from 'lucide-react';
import { CartItem } from '../../types/store';
import { SERVER_CONFIG } from '../../data/storeData';
import { soundFX } from '../../utils/sound';
import { fireConfetti } from '../../utils/confetti';
import { PlayerAvatar, TelegramIcon } from '../MinecraftIcons';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  playerIgn: string;
  onSetPlayerIgn: (ign: string) => void;
  onClearCart: () => void;
  discountPercent: number;
  couponCode: string;
  currencySymbol: string;
  currencyRate: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  playerIgn,
  onSetPlayerIgn,
  onClearCart,
  discountPercent,
  couponCode,
  currencySymbol,
  currencyRate,
}) => {
  const [ignInput, setIgnInput] = useState(playerIgn || '');
  const [isGifting, setIsGifting] = useState(false);
  const [recipientIgn, setRecipientIgn] = useState('');
  const [giftNote, setGiftNote] = useState('');
  const [isBedrock, setIsBedrock] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'telegram' | 'discord'>('telegram');
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [logs, setLogs] = useState<string[]>([]);
  const [txId, setTxId] = useState('');
  const [txCopied, setTxCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, entry) => sum + entry.item.price * entry.quantity, 0);
  const discountAmount = (discountPercent / 100) * subtotal;
  const finalTotal = Math.max(0, subtotal - discountAmount);
  const targetIgn = isGifting ? recipientIgn.trim() || 'Player' : ignInput.trim() || 'Steve';

  const orderItemsList = cart
    .map(
      ({ item, quantity }) =>
        `- ${item.name} x${quantity} (${currencySymbol}${(item.price * currencyRate * quantity).toFixed(2)})`
    )
    .join('\n');

  const telegramMessage = [
    `Hello @TheKillerDGod! I want to buy the following Rank / Item from Eagle SMP Store:`,
    orderItemsList,
    discountPercent > 0 ? `Promo Code: ${couponCode} (-${discountPercent}%)` : null,
    `Total: ${currencySymbol}${(finalTotal * currencyRate).toFixed(2)}`,
    `Minecraft IGN: ${targetIgn}${isBedrock ? ' (Bedrock Edition)' : ' (Java Edition)'}`,
    isGifting && giftNote ? `Gift Note: ${giftNote}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const telegramOrderUrl = `https://t.me/TheKillerDGod?text=${encodeURIComponent(telegramMessage)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-label="Secure Minecraft Checkout"
    >
      <div className="relative w-full max-w-3xl bg-[#0f1420] border border-amber-500/40 rounded-xl shadow-2xl overflow-hidden flex flex-col my-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400 border border-amber-500/20">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display text-white tracking-wide flex items-center gap-2">
                SECURE MINECRAFT CHECKOUT
                <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded">
                  256-BIT ENCRYPTED
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Official store for Eagle Network · Instant in-game delivery
              </p>
            </div>
          </div>
          {step !== 'processing' && (
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              aria-label="Close checkout"
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {step === 'form' && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!targetIgn) {
                setErrorMsg('Please specify a valid Minecraft username.');
                return;
              }
              if (!acceptedTerms) {
                setErrorMsg('Please accept the store terms of service to continue.');
                return;
              }
              setErrorMsg(null);
              soundFX.playClick();

              setStep('processing');
              setLogs([]);
              const generatedTx = `EAGLE-${Math.floor(100000 + Math.random() * 900000)}`;
              setTxId(generatedTx);

              const rconSteps: { text: string; delay: number }[] = [
                {
                  text: `[Gateway] Initializing secure dispatch channel for ${targetIgn}...`,
                  delay: 300,
                },
                {
                  text: `[Gateway] Method: ${
                    paymentMethod === 'telegram'
                      ? 'TELEGRAM MESSENGER (@TheKillerDGod)'
                      : paymentMethod.toUpperCase()
                  } (${currencySymbol}${(finalTotal * currencyRate).toFixed(2)})`,
                  delay: 800,
                },
                {
                  text: `[Network] Connecting to Eagle Velocity Proxy (${SERVER_CONFIG.fullAddress})...`,
                  delay: 1400,
                },
                {
                  text: `[Mojang API] Resolving UUID for player '${targetIgn}'... UUID verified.`,
                  delay: 2000,
                },
              ];

              let curDelay = 2500;
              cart.forEach(({ item, quantity }) => {
                item.serverCommands.forEach((cmd) => {
                  rconSteps.push({
                    text: `[Server-RCON] Executing: ${cmd.replace(/%player%/g, targetIgn)} (x${quantity})`,
                    delay: curDelay,
                  });
                  curDelay += 400;
                });
              });

              rconSteps.push({
                text: `[Delivery] All perks and packages assigned to ${targetIgn} successfully!`,
                delay: curDelay + 400,
              });
              rconSteps.push({
                text: `[Store] Order ${generatedTx} registered in database. Discord notification sent.`,
                delay: curDelay + 800,
              });

              rconSteps.forEach(({ text, delay }) => {
                setTimeout(() => {
                  setLogs((prev) => [...prev, text]);
                  soundFX.playTick();
                }, delay);
              });

              setTimeout(() => {
                setStep('success');
                soundFX.playFanfare();
                fireConfetti({
                  particleCount: 100,
                  spread: 80,
                  origin: { y: 0.5 },
                  colors: ['#F59E0B', '#10B981', '#6366F1', '#EC4899'],
                });
                onClearCart();
              }, curDelay + 1100);
            }}
            className="p-6 space-y-6"
          >
            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-2">
                    Step 1: Minecraft Character Identity
                  </h3>
                  <p className="text-xs text-slate-400">
                    Items will be delivered to this exact in-game username.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      setIsGifting(!isGifting);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                      isGifting
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>{isGifting ? 'Gifting to Friend' : 'Gift this?'}</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="md:col-span-2 space-y-2">
                  <label
                    htmlFor="checkout-ign"
                    className="block text-xs font-mono text-slate-300"
                  >
                    {isGifting ? "Recipient's Minecraft Username:" : 'Your Minecraft Username (IGN):'}
                  </label>
                  <div className="relative">
                    <input
                      id="checkout-ign"
                      type="text"
                      required
                      placeholder="e.g. Dream, Notch, or YourIGN"
                      value={isGifting ? recipientIgn : ignInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (isGifting) {
                          setRecipientIgn(val);
                        } else {
                          setIgnInput(val);
                          onSetPlayerIgn(val);
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-slate-900 border border-white/10 rounded-lg text-sm font-mono text-emerald-400 focus:outline-none focus:border-amber-400 uppercase tracking-wide"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="bedrock-check"
                      checked={isBedrock}
                      onChange={(e) => setIsBedrock(e.target.checked)}
                      className="rounded bg-slate-900 border-white/20 text-amber-500 focus:ring-0"
                    />
                    <label htmlFor="bedrock-check" className="text-xs text-slate-400 cursor-pointer">
                      This is a <strong>Bedrock Edition / Xbox Gamertag</strong> account (prefix `*`)
                    </label>
                  </div>
                  {isGifting && (
                    <div className="pt-2">
                      <label
                        htmlFor="gift-note"
                        className="block text-xs font-mono text-slate-400 mb-1"
                      >
                        Optional Gift Note (broadcasted in chat):
                      </label>
                      <input
                        id="gift-note"
                        type="text"
                        placeholder="e.g. Happy Birthday buddy! Enjoy the Eagle Rank!"
                        value={giftNote}
                        onChange={(e) => setGiftNote(e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-white/10 rounded-lg text-xs text-slate-200"
                      />
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center p-3 bg-slate-900/60 rounded-xl border border-white/5">
                  <PlayerAvatar ign={targetIgn} size={54} />
                  <span className="mt-2 text-xs font-mono font-bold text-amber-300 truncate max-w-[140px]">
                    {targetIgn || 'Steve'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {isBedrock ? 'Bedrock / Geyser' : 'Java Edition'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold">
                Step 2: Payment &amp; Order Messenger
              </h3>
              <div className="p-4 bg-slate-950/90 rounded-xl border border-[#229ED9]/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#229ED9]/20 border border-[#229ED9]/40 text-[#38bdf8]">
                      <TelegramIcon size={20} className="text-[#38bdf8]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold font-display text-white">
                        Telegram Messenger — {SERVER_CONFIG.developer.telegram}
                      </div>
                      <div className="text-[11px] font-mono text-[#38bdf8]">
                        Official Rank &amp; Item Checkout with {SERVER_CONFIG.developer.name}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                    DIRECT MESSENGER
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All Rank, PET, and Item purchases are processed directly via Telegram Messenger with{' '}
                  <strong className="text-[#38bdf8]">{SERVER_CONFIG.developer.telegram}</strong>. Click
                  below to open Telegram with your order details and Minecraft IGN pre-filled!
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={telegramOrderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#229ED9] hover:bg-[#1d8bc0] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-[#229ED9]/25"
                  >
                    <TelegramIcon size={15} className="text-white" />
                    <span>Message {SERVER_CONFIG.developer.telegram} on Telegram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={SERVER_CONFIG.discordUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.playClick()}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#5865F2]/20 hover:bg-[#5865F2]/30 text-[#8ea1e1] border border-[#5865F2]/40 font-semibold text-xs transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[#5865F2]" />
                    <span>Community Discord Support (#store-support)</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/90 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-white/5">
                <span>Items in Order ({cart.length}):</span>
                <span className="font-mono text-slate-100">
                  {currencySymbol}
                  {(subtotal * currencyRate).toFixed(2)}
                </span>
              </div>
              {discountPercent > 0 && (
                <div className="flex items-center justify-between text-xs text-emerald-400 pb-2 border-b border-white/5 font-mono">
                  <span>Promotion Applied ({couponCode}):</span>
                  <span>
                    -{currencySymbol}
                    {(discountAmount * currencyRate).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between text-base font-bold font-display text-white">
                <span>TOTAL DUE TODAY:</span>
                <span className="text-xl text-amber-400 font-mono">
                  {currencySymbol}
                  {(finalTotal * currencyRate).toFixed(2)}
                </span>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                <input
                  type="checkbox"
                  id="eula-terms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="rounded mt-0.5 bg-slate-900 border-white/20 text-amber-500"
                />
                <label
                  htmlFor="eula-terms"
                  className="text-[11px] text-slate-400 leading-snug cursor-pointer"
                >
                  I agree to the <strong>Eagle Network Terms of Service</strong>, acknowledge that
                  all items are digital goods delivered automatically, and certify that I have
                  authorization from the payment method holder. Compliant with Mojang Commercial
                  Guidelines.
                </label>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onClose();
                }}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs rounded-lg transition-colors"
              >
                Cancel
              </button>
              <a
                href={telegramOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  soundFX.playClick();
                  soundFX.playOrb();
                }}
                className="px-7 py-3.5 bg-[#229ED9] hover:bg-[#1d8bc0] text-white font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 hover:brightness-110 active:scale-95 shadow-lg shadow-[#229ED9]/25"
              >
                <TelegramIcon size={16} className="text-white" />
                <span>
                  BUY VIA TELEGRAM {SERVER_CONFIG.developer.telegram} ({currencySymbol}
                  {(finalTotal * currencyRate).toFixed(2)})
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </form>
        )}

        {step === 'processing' && (
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-3 bg-amber-500/10 rounded-full border border-amber-500/30 text-amber-400 animate-spin">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">
                PROCESSING MINECRAFT RCON DISPATCH...
              </h3>
              <p className="text-xs text-slate-400">
                Contacting Eagle Network BungeeCord proxy and executing server commands...
              </p>
            </div>
            <div className="p-4 bg-black rounded-xl border border-white/10 font-mono text-xs text-emerald-400 space-y-1.5 h-60 overflow-y-auto shadow-inner">
              {logs.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-slate-600 select-none">&gt;</span>
                  <span className={line.includes('Executing') ? 'text-amber-300' : 'text-emerald-400'}>
                    {line}
                  </span>
                </div>
              ))}
              <div className="animate-pulse text-slate-500">_</div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="p-8 space-y-6 text-center animate-in zoom-in-95 duration-300">
            <div className="inline-flex p-3.5 bg-emerald-500/20 rounded-full border border-emerald-500/40 text-emerald-400 mb-2">
              <CircleCheckBig className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold font-display text-white">PURCHASE SUCCESSFUL!</h3>
              <p className="text-xs text-slate-300">
                Your items and rank permissions have been deployed to <strong>{targetIgn}</strong> on
                Eagle Network!
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 bg-slate-950 rounded-xl border border-amber-500/30 text-left space-y-2.5">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-white/10">
                <span className="text-slate-400 font-mono">Transaction ID:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-amber-300">{txId}</span>
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      navigator.clipboard.writeText(txId).catch(() => {});
                      setTxCopied(true);
                      setTimeout(() => setTxCopied(false), 2000);
                    }}
                    aria-label="Copy transaction ID"
                    className="p-1 hover:bg-white/10 rounded text-slate-400 hover:text-white"
                  >
                    {txCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Recipient Account:</span>
                <span className="font-mono text-emerald-400 font-bold">{targetIgn}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">● Active on Server</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                <span className="text-slate-400">Total Paid:</span>
                <span className="font-mono text-amber-400 font-bold">
                  {currencySymbol}
                  {(finalTotal * currencyRate).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 max-w-md mx-auto text-xs text-amber-300">
              💡 <strong>In-Game Note:</strong> Join IP: <code>{SERVER_CONFIG.javaIp}</code> Port:{' '}
              <code>{SERVER_CONFIG.port}</code>. If you are already connected, your rank prefix and
              crate keys update automatically without disconnecting!
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onClose();
                  setStep('form');
                }}
                className="px-6 py-2.5 mc-btn-primary text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg shadow-lg"
              >
                Back to Eagle Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
