import React, { useState } from 'react';
import { ChevronDown, CircleHelp, ExternalLink, MessageSquare, ShieldCheck } from 'lucide-react';
import { FAQ_ITEMS, SERVER_CONFIG } from '../data/storeData';
import { soundFX } from '../utils/sound';
import { TelegramIcon } from './MinecraftIcons';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    soundFX.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0a0d14] border-b border-white/5">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/10 text-xs font-mono">
            <CircleHelp className="w-3.5 h-3.5 text-amber-400" />
            <span>KNOWLEDGE BASE &amp; SUPPORT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need to know about purchasing, delivery, and server rules.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/60 border border-white/5 overflow-hidden transition-colors hover:border-white/10"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-display font-semibold text-sm text-slate-200 hover:text-amber-300 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#5865F2]/20 via-slate-900 to-slate-900 border border-[#5865F2]/40 flex flex-col justify-between gap-4">
            <div className="flex items-start gap-3.5 text-left">
              <div className="p-2.5 bg-[#5865F2] text-white rounded-xl shadow-lg shadow-[#5865F2]/30 shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white font-display">
                  Community Discord Support
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  General player community, giveaways, and ticket support in{' '}
                  <code>#store-support</code>.
                </p>
                <div className="text-[11px] font-mono text-[#8ea1e1] mt-1">
                  {SERVER_CONFIG.discordUrl}
                </div>
              </div>
            </div>
            <a
              href={SERVER_CONFIG.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="w-full py-2.5 rounded-lg bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>JOIN DISCORD (discord.gg/uTZk4vvEE)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-[#229ED9]/20 via-slate-900 to-slate-900 border border-[#229ED9]/40 flex flex-col justify-between gap-4">
            <div className="flex items-start gap-3.5 text-left">
              <div className="p-2.5 bg-[#229ED9] text-white rounded-xl shadow-lg shadow-[#229ED9]/30 shrink-0">
                <TelegramIcon size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white font-display flex items-center gap-1.5">
                  <span>Lead Developer Telegram</span>
                  <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1.5 py-0.2 rounded">
                    VERIFIED
                  </span>
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Direct contact with Developer{' '}
                  <strong className="text-amber-300">{SERVER_CONFIG.developer.name}</strong> for
                  custom rank orders, server inquiries, or partnerships.
                </p>
              </div>
            </div>
            <a
              href={SERVER_CONFIG.developer.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.playClick()}
              className="w-full py-2.5 rounded-lg bg-[#229ED9] hover:bg-[#1d8bc0] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-[#229ED9]/20"
            >
              <span>MESSAGE @TheKillerDGod ON TELEGRAM</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 text-[11px] text-slate-500 leading-relaxed space-y-1">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Mojang Commercial Usage Compliance:</span>
          </div>
          <p>
            Eagle Network is not affiliated with or endorsed by Mojang AB or Microsoft Corporation.
            Minecraft is a registered trademark of Mojang Synergies AB. All purchases support
            ongoing server development, custom plugins, dedicated enterprise hosting, and DDoS
            protection.
          </p>
        </div>
      </div>
    </section>
  );
};
