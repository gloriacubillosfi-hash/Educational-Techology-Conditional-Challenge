import React, { useState } from 'react';
import { BUG_HUNTER_ITEMS, BugHunterItem } from '../data/bugHunterData';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Bug, Terminal, CheckCircle2, XCircle, ArrowRight, RotateCcw, Volume2, ShieldCheck, Sparkles } from 'lucide-react';

interface BugHunterGameProps {
  onScoreUpdate: (points: number, isCorrect: boolean) => void;
  currentStreak: number;
}

export const BugHunterGame: React.FC<BugHunterGameProps> = ({
  onScoreUpdate,
  currentStreak
}) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [selectedPatch, setSelectedPatch] = useState<string | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [isError, setIsError] = useState(false);

  const currentBug: BugHunterItem = BUG_HUNTER_ITEMS[itemIndex];

  const handleApplyPatch = (patch: string) => {
    if (isFixed) return;
    soundManager.playClick();
    setSelectedPatch(patch);

    if (patch === currentBug.correctPatch) {
      soundManager.playMatchSuccess();
      setIsFixed(true);
      setIsError(false);

      const points = 50;
      onScoreUpdate(points, true);

      confetti({
        particleCount: 35,
        spread: 50,
        origin: { y: 0.6 }
      });

      soundManager.speak(currentBug.correctSentence);
    } else {
      soundManager.playError();
      setIsError(true);
      onScoreUpdate(0, false);
    }
  };

  const handleNextBug = () => {
    soundManager.playClick();
    const nextIdx = (itemIndex + 1) % BUG_HUNTER_ITEMS.length;
    setItemIndex(nextIdx);
    setSelectedPatch(null);
    setIsFixed(false);
    setIsError(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <Bug className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Grammar Bug Hunter</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                DEBUGGER
              </span>
            </h3>
            <p className="text-xs text-slate-400">Identify and patch grammatical errors in EdTech software code</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400 font-mono">
            Bug <strong>{itemIndex + 1}</strong> of {BUG_HUNTER_ITEMS.length}
          </span>
        </div>
      </div>

      {/* Terminal Debugger Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Terminal Titlebar */}
        <div className="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="text-xs font-mono text-slate-400 ml-2">
              system_terminal • {currentBug.systemName}
            </span>
          </div>
          <span className="text-[10px] font-mono text-rose-400 uppercase font-bold">
            Syntax Bug Detected
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Bugged Script Box */}
          <div className="p-5 rounded-2xl bg-slate-950 font-mono border border-slate-800 space-y-2">
            <div className="text-[11px] text-slate-500">// Script with conditional grammatical error:</div>
            <div className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans font-medium">
              "{currentBug.buggedSentence}"
            </div>
            <div className="text-xs text-rose-400 flex items-center space-x-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>Suspect bug token: <strong className="bg-rose-500/20 px-1.5 py-0.5 rounded border border-rose-500/40">{currentBug.buggyToken}</strong></span>
            </div>
          </div>

          {/* Patches Selection */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Correct Patch to Deploy:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentBug.patchOptions.map((patch, idx) => {
                const isSelected = selectedPatch === patch;
                const isCorrect = patch === currentBug.correctPatch;

                let btnStyle = 'bg-slate-950 border-slate-850 hover:border-sky-500/60 text-slate-300 hover:text-white';
                if (isFixed && isCorrect) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold ring-2 ring-emerald-500/40';
                } else if (isError && isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 font-bold ring-2 ring-rose-500/40';
                }

                return (
                  <button
                    key={idx}
                    disabled={isFixed}
                    onClick={() => handleApplyPatch(patch)}
                    className={`p-4 rounded-xl border text-center font-mono text-sm sm:text-base transition-all duration-200 flex items-center justify-center space-x-2 ${btnStyle}`}
                  >
                    <span>patch("{patch}")</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fixed Explanation Reveal */}
          {isFixed && (
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Bug Patched Successfully! (+50 XP)</span>
                </div>
                <button
                  onClick={() => soundManager.speak(currentBug.correctSentence)}
                  className="flex items-center space-x-1 text-xs text-sky-400 hover:text-sky-300"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Clean Sentence</span>
                </button>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 font-sans text-sm font-semibold text-white">
                "{currentBug.correctSentence}"
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {currentBug.ruleExplanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextBug}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center space-x-1.5"
                >
                  <span>Next Code Bug</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
