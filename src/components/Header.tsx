import React, { useState } from 'react';
import {
  Check,
  ChevronDown,
  Copy,
  Crown,
  CircleHelp,
  Key,
  ShoppingBag,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { CurrencyCode, PackageCategory } from '../types/store';
import { CURRENCIES, SERVER_CONFIG } from '../data/storeData';
import { soundFX } from '../utils/sound';
import { PlayerAvatar, ServerLogoBadge, TelegramIcon } from './MinecraftIcons';

interface HeaderProps {
  playerIgn: string;
  onOpenIgnModal: () => void;
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  currentCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  activeSection: string;
  onSelectSection: (section: string) => void;
  selectedCategory: PackageCategory;
  onSelectCategory: (cat: PackageCategory) => void;
}

export const Header: React.FC<HeaderProps> = ({
  playerIgn,
  onOpenIgnModal,
  cartCount,
  cartSubtotal,
  onOpenCart,
  currentCurrency,
  onSelectCurrency,
  activeSection,
  onSelectSection,
  selectedCategory,
  onSelectCategory,
}) => {
  const [ipCopied, setIpCopied] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(soundFX.isEnabled());
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const handleCopyIp = () => {
    soundFX.playClick();
    navigator.clipboard.writeText(SERVER_CONFIG.fullAddress).catch(() => {});
    setIpCopied(true);
    setTimeout(() => setIpCopied(false), 2000);
  };

  const handleToggleSound = () => {
    const next = soundFX.toggleSound();
    setSoundEnabled(next);
    if (next) soundFX.playClick();
  };

  const currency = CURRENCIES[currentCurrency] || CURRENCIES.USD;

  return (
    <header className="sticky top-0 z-40 bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/10">
      <div className="bg-slate-950/80 px-4 py-1.5 border-b border-white/5 text-[11px] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="text-slate-400">
            Java &amp; Bedrock (Port {SERVER_CONFIG.bedrockPort})
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={SERVER_CONFIG.developer.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#229ED9]/15 hover:bg-[#229ED9]/25 text-[#229ED9] border border-[#229ED9]/30 transition-all font-mono text-[11px] group"
            title="Chat with Developer TheKillerDGod on Telegram"
          >
            <TelegramIcon size={12} className="text-[#229ED9]" />
            <span className="text-slate-400 group-hover:text-slate-300">Dev:</span>
            <strong className="text-[#38bdf8] font-semibold">{SERVER_CONFIG.developer.name}</strong>
            <span className="text-slate-500 hidden sm:inline">({SERVER_CONFIG.developer.telegram})</span>
          </a>

          <button
            type="button"
            onClick={handleCopyIp}
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all font-mono text-[11px]"
          >
            {ipCopied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">IP COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>
                  IP: <strong>{SERVER_CONFIG.javaIp}</strong> Port: <strong>{SERVER_CONFIG.port}</strong>
                </span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleToggleSound}
            className="p-1 rounded text-slate-400 hover:text-white transition-colors"
            title={soundEnabled ? 'Mute Minecraft sound FX' : 'Unmute Minecraft sound FX'}
            aria-label={soundEnabled ? 'Mute Minecraft sound FX' : 'Unmute Minecraft sound FX'}
          >
            {soundEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-600" />
            )}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <button
          type="button"
          className="flex items-center gap-3.5 cursor-pointer text-left"
          onClick={() => {
            onSelectCategory('all');
            onSelectSection('store');
          }}
        >
          <ServerLogoBadge size={46} />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black font-display tracking-wider text-white">
                EAGLE <span className="text-amber-400">SMP</span>
              </span>
              <span className="text-[10px] font-silkscreen bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded uppercase">
                STORE
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono tracking-wide hidden sm:block">
              Official Minecraft Server · Dev:{' '}
              <span className="text-amber-300 font-semibold">{SERVER_CONFIG.developer.name}</span>
            </div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onSelectCategory('all');
              onSelectSection('store');
            }}
            className={`transition-colors py-1 ${
              activeSection === 'store' && selectedCategory === 'all'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            Store Packages
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onSelectCategory('ranks');
              onSelectSection('store');
            }}
            className={`transition-colors flex items-center gap-1.5 py-1 ${
              activeSection === 'store' && selectedCategory === 'ranks'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-300 hover:text-amber-300'
            }`}
          >
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>Lifetime Ranks</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onSelectCategory('pets');
              onSelectSection('store');
            }}
            className={`transition-colors flex items-center gap-1.5 py-1 ${
              activeSection === 'store' && selectedCategory === 'pets'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-300 hover:text-amber-300'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PET</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onSelectCategory('items');
              onSelectSection('store');
            }}
            className={`transition-colors flex items-center gap-1.5 py-1 ${
              activeSection === 'store' && selectedCategory === 'items'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-300 hover:text-amber-300'
            }`}
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>Item</span>
          </button>
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onSelectSection('faq');
              document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors py-1 flex items-center gap-1 ${
              activeSection === 'faq'
                ? 'text-amber-400 border-b-2 border-amber-400'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <CircleHelp className="w-3.5 h-3.5" />
            <span>FAQ &amp; Rules</span>
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={SERVER_CONFIG.developer.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#229ED9]/10 hover:bg-[#229ED9]/20 text-[#38bdf8] border border-[#229ED9]/30 text-xs font-semibold transition-all shadow-sm"
          >
            <TelegramIcon size={14} className="text-[#38bdf8]" />
            <span>{SERVER_CONFIG.developer.telegram}</span>
          </a>

          <div className="relative">
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                setCurrencyOpen(!currencyOpen);
              }}
              aria-label={`Select currency, current ${currency.code}`}
              className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1.5"
            >
              <span>{currency.code}</span>
              <ChevronDown className="w-3 h-3 text-slate-500" />
            </button>
            {currencyOpen && (
              <div className="absolute right-0 mt-1 w-32 bg-slate-900 border border-white/10 rounded-lg shadow-xl py-1 z-50 font-mono text-xs">
                {Object.values(CURRENCIES).map((curr) => (
                  <button
                    key={curr.code}
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      onSelectCurrency(curr.code);
                      setCurrencyOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 text-left flex items-center justify-between hover:bg-white/5 ${
                      curr.code === currentCurrency ? 'text-amber-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>{curr.code}</span>
                    <span className="text-slate-500">{curr.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onOpenIgnModal();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-white/10 hover:border-amber-500/40 text-left transition-all"
          >
            <PlayerAvatar ign={playerIgn} size={28} showStatus={true} />
            <div className="hidden sm:block">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 leading-none">
                {playerIgn ? 'Logged In As' : 'Identify IGN'}
              </div>
              <div className="text-xs font-mono font-bold text-emerald-400 leading-tight">
                {playerIgn || 'Set Username'}
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onOpenCart();
            }}
            aria-label={`Open shopping cart, ${cartCount} items`}
            className="relative px-3.5 py-2 mc-btn-primary text-slate-950 font-bold text-xs rounded-lg flex items-center gap-2 hover:brightness-110 active:scale-95 shadow-md shadow-amber-500/20"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline font-mono">
              {currency.symbol}
              {(cartSubtotal * currency.rate).toFixed(2)}
            </span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-slate-950 text-amber-300 rounded-full flex items-center justify-center text-[10px] font-mono font-bold border border-amber-400">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

