import React from 'react';
import { Crown, Sparkles, Trophy } from 'lucide-react';
import { TOP_DONATORS } from '../data/storeData';
import { PlayerAvatar } from './MinecraftIcons';

interface HallOfFameProps {
  currencySymbol: string;
  currencyRate: number;
}

export const HallOfFame: React.FC<HallOfFameProps> = ({ currencySymbol, currencyRate }) => (
  <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-[#0b0e14]">
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>HALL OF FAME</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide">
          TOP DONATORS OF THE MONTH
        </h2>
        <p className="text-xs sm:text-sm text-slate-400">
          A tribute to our most dedicated champions who keep Eagle Network running with zero lag on
          dedicated AMD Ryzen 9 7950X hardware.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto items-end pt-4">
        {/* #2 */}
        <div className="order-2 md:order-1 p-5 rounded-xl bg-slate-900/60 border border-slate-400/30 flex flex-col items-center text-center relative group hover:border-slate-300 transition-all">
          <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-950 flex items-center justify-center font-bold text-xs mb-3 font-mono shadow-md">
            #2
          </div>
          <PlayerAvatar ign={TOP_DONATORS[1].ign} size={64} />
          <div className="mt-3 font-bold font-display text-base text-slate-200">
            {TOP_DONATORS[1].ign}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">{TOP_DONATORS[1].title}</div>
          <div className="text-lg font-mono font-bold text-amber-300 mt-2">
            {currencySymbol}
            {(TOP_DONATORS[1].amount * currencyRate).toFixed(2)}
          </div>
        </div>

        {/* #1 */}
        <div className="order-1 md:order-2 p-6 rounded-xl bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-950 border-2 border-amber-400 flex flex-col items-center text-center relative group shadow-xl shadow-amber-500/15 md:-translate-y-4">
          <div className="absolute -top-3 px-3 py-0.5 bg-amber-400 text-slate-950 rounded-full font-mono font-bold text-[10px] uppercase flex items-center gap-1 shadow-md">
            <Crown className="w-3 h-3" />
            <span>SERVER BENEFACTOR</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm mb-3 font-mono shadow-md">
            #1
          </div>
          <PlayerAvatar ign={TOP_DONATORS[0].ign} size={76} />
          <div className="mt-3 font-bold font-display text-lg text-amber-300">
            {TOP_DONATORS[0].ign}
          </div>
          <div className="text-xs text-amber-200/80 font-mono mt-0.5">{TOP_DONATORS[0].title}</div>
          <div className="text-xl font-mono font-bold text-amber-400 mt-2">
            {currencySymbol}
            {(TOP_DONATORS[0].amount * currencyRate).toFixed(2)}
          </div>
        </div>

        {/* #3 */}
        <div className="order-3 md:order-3 p-5 rounded-xl bg-slate-900/60 border border-amber-700/40 flex flex-col items-center text-center relative group hover:border-amber-600 transition-all">
          <div className="w-8 h-8 rounded-full bg-amber-700 text-amber-100 flex items-center justify-center font-bold text-xs mb-3 font-mono shadow-md">
            #3
          </div>
          <PlayerAvatar ign={TOP_DONATORS[2].ign} size={64} />
          <div className="mt-3 font-bold font-display text-base text-slate-200">
            {TOP_DONATORS[2].ign}
          </div>
          <div className="text-xs text-slate-400 font-mono mt-0.5">{TOP_DONATORS[2].title}</div>
          <div className="text-lg font-mono font-bold text-amber-300 mt-2">
            {currencySymbol}
            {(TOP_DONATORS[2].amount * currencyRate).toFixed(2)}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        {TOP_DONATORS.slice(3).map((donator) => (
          <div
            key={donator.rank}
            className="p-3 bg-slate-950/70 border border-white/5 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded bg-slate-800 text-slate-300 flex items-center justify-center font-mono text-xs font-bold">
                #{donator.rank}
              </span>
              <PlayerAvatar ign={donator.ign} size={32} />
              <div>
                <div className="text-xs font-bold text-white font-mono">{donator.ign}</div>
                <div className="text-[10px] text-slate-400">{donator.title}</div>
              </div>
            </div>
            <div className="font-mono text-xs font-bold text-amber-400">
              {currencySymbol}
              {(donator.amount * currencyRate).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto p-3.5 bg-amber-500/10 rounded-xl border border-amber-500/20 text-center text-xs text-amber-300 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
        <span>
          The #1 Monthly Donator receives a custom NPC statue built in spawn with their skin and
          name for the next 30 days!
        </span>
      </div>
    </div>
  </section>
);
