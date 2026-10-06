import React, { useState } from 'react';
import { Check, Copy, Crown, ExternalLink, Flame, Shield, Sparkles, Zap } from 'lucide-react';
import { SERVER_CONFIG } from '../data/storeData';
import { soundFX } from '../utils/sound';
import { ServerHeroBanner, TelegramIcon } from './MinecraftIcons';

interface HeroProps {
  onScrollToCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToCatalog,
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#131926] via-[#0d121c] to-[#0c0f17] border-b border-white/10 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[250px] bg-purple-500/10 blur-[100px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 mc-pattern-grid opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center space-y-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono shadow-sm">
            <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>
              AUTUMN SALE LIVE · USE CODE <strong>EAGLE20</strong> FOR 20% OFF
            </span>
          </div>

          <a
            href={SERVER_CONFIG.developer.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#229ED9]/15 border border-[#229ED9]/40 text-[#38bdf8] text-xs font-mono shadow-sm hover:bg-[#229ED9]/25 transition-all"
          >
            <TelegramIcon size={14} className="text-[#38bdf8]" />
            <span>
              Developer: <strong>{SERVER_CONFIG.developer.name}</strong> ({SERVER_CONFIG.developer.telegram})
            </span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

        <div className="max-w-xl mx-auto my-3">
          <ServerHeroBanner />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white uppercase drop-shadow-md">
            EAGLE SMP{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              STORE
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
            The official web store for Eagle SMP Minecraft Server. Engineered by Lead Developer{' '}
            <span className="text-amber-300 font-semibold">{SERVER_CONFIG.developer.name}</span>. Unlock
            lifetime flight, unlimited vaults, exclusive kits, and companion pets.
          </p>
        </div>

        <div className="max-w-lg mx-auto p-3.5 bg-slate-950/80 rounded-xl border border-amber-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-left pl-1">
            <div className="text-[10px] font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SERVER ADDRESS (JAVA &amp; BEDROCK):</span>
            </div>
            <div className="font-mono text-base font-bold text-amber-300 flex flex-wrap items-center gap-2 mt-0.5">
              <span>
                IP: <strong className="text-white">{SERVER_CONFIG.javaIp}</strong>
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-emerald-400">
                Port: <strong>{SERVER_CONFIG.port}</strong>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              soundFX.playOrb();
              navigator.clipboard.writeText(SERVER_CONFIG.fullAddress).catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 border border-amber-500/40 text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">COPIED IP &amp; PORT!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>COPY IP &amp; PORT</span>
              </>
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onScrollToCatalog();
            }}
            className="px-6 py-3 mc-btn-primary text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg flex items-center gap-2 hover:brightness-110 active:scale-95 shadow-lg shadow-amber-500/20"
          >
            <Crown className="w-4 h-4" />
            <span>EXPLORE RANKS &amp; PACKAGES</span>
          </button>

          <a
            href={SERVER_CONFIG.developer.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.playClick()}
            className="px-5 py-3 rounded-lg bg-[#229ED9]/20 hover:bg-[#229ED9]/30 text-[#38bdf8] text-xs font-semibold uppercase tracking-wider border border-[#229ED9]/50 flex items-center gap-2 transition-all shadow-md shadow-[#229ED9]/15"
          >
            <TelegramIcon size={16} className="text-[#38bdf8]" />
            <span>CONTACT DEV ({SERVER_CONFIG.developer.telegram})</span>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 border-t border-white/5 max-w-4xl mx-auto text-left">
          <div className="p-3 bg-slate-950/40 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-display">
              <Zap className="w-4 h-4" />
              <span>INSTANT DELIVERY</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Automated RCON dispatch delivers packages within 60 seconds.
            </p>
          </div>

          <div className="p-3 bg-slate-950/40 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-display">
              <Shield className="w-4 h-4" />
              <span>LIFETIME PERMANENCE</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Never expire. Ranks stay forever across all seasons and resets.
            </p>
          </div>

          <div className="p-3 bg-slate-950/40 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold font-display">
              <Sparkles className="w-4 h-4" />
              <span>CROSSPLAY READY</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Seamlessly supports Java and Bedrock (Xbox, Switch, Mobile).
            </p>
          </div>

          <div className="p-3 bg-slate-950/40 rounded-lg border border-white/5">
            <div className="flex items-center gap-2 text-sky-400 text-xs font-bold font-display">
              <Crown className="w-4 h-4" />
              <span>LEAD DEV VERIFIED</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Engineered by TheKillerDGod with custom optimized plugins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
