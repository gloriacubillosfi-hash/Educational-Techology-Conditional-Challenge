import React, { useState } from 'react';
import { SENTENCE_BUILDER_ITEMS, SentenceBuilderItem } from '../data/sentenceBuilderData';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Layers, RotateCcw, Volume2, Sparkles, CheckCircle2, ArrowRight, Trophy, Check } from 'lucide-react';

interface SentenceBuilderGameProps {
  onScoreUpdate: (points: number, isCorrect: boolean) => void;
  currentStreak: number;
}

export const SentenceBuilderGame: React.FC<SentenceBuilderGameProps> = ({
  onScoreUpdate,
  currentStreak
}) => {
  const [itemIndex, setItemIndex] = useState(0);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [availableTokens, setAvailableTokens] = useState<string[]>(() => {
    return [...SENTENCE_BUILDER_ITEMS[0].scrambledTokens].sort(() => Math.random() - 0.5);
  });
  const [isCompleted, setIsCompleted] = useState(false);
  const [isError, setIsError] = useState(false);

  const currentItem: SentenceBuilderItem = SENTENCE_BUILDER_ITEMS[itemIndex];

  const handleSelectToken = (token: string, tokenIndex: number) => {
    if (isCompleted) return;
    soundManager.playClick();

    const newAvailable = [...availableTokens];
    newAvailable.splice(tokenIndex, 1);
    setAvailableTokens(newAvailable);

    const newSelected = [...selectedTokens, token];
    setSelectedTokens(newSelected);
    setIsError(false);
  };

  const handleRemoveToken = (token: string, tokenIndex: number) => {
    if (isCompleted) return;
    soundManager.playClick();

    const newSelected = [...selectedTokens];
    newSelected.splice(tokenIndex, 1);
    setSelectedTokens(newSelected);

    setAvailableTokens(prev => [...prev, token]);
    setIsError(false);
  };

  const handleCheckSentence = () => {
    soundManager.playClick();
    const isCorrect = selectedTokens.join(' ') === currentItem.correctSequence.join(' ');

    if (isCorrect) {
      soundManager.playMatchSuccess();
      setIsCompleted(true);
      setIsError(false);

      const points = 60;
      onScoreUpdate(points, true);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 }
      });

      soundManager.speak(currentItem.correctSequence.join(' '));
    } else {
      soundManager.playError();
      setIsError(true);
      onScoreUpdate(0, false);
    }
  };

  const handleResetCurrent = () => {
    soundManager.playClick();
    setSelectedTokens([]);
    setAvailableTokens([...currentItem.scrambledTokens].sort(() => Math.random() - 0.5));
    setIsCompleted(false);
    setIsError(false);
  };

  const handleNext = () => {
    soundManager.playClick();
    const nextIdx = (itemIndex + 1) % SENTENCE_BUILDER_ITEMS.length;
    setItemIndex(nextIdx);
    setSelectedTokens([]);
    setAvailableTokens([...SENTENCE_BUILDER_ITEMS[nextIdx].scrambledTokens].sort(() => Math.random() - 0.5));
    setIsCompleted(false);
    setIsError(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Sentence Builder Lab</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                PUZZLE
              </span>
            </h3>
            <p className="text-xs text-slate-400">Assemble scrambled clauses in correct syntactic order</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <span className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400">
            Puzzle <strong>{itemIndex + 1}</strong> of {SENTENCE_BUILDER_ITEMS.length}
          </span>
          <button
            onClick={handleResetCurrent}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Assembly Board */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
            {currentItem.type === 'zero' ? 'Zero Conditional' : 'First Conditional'} • {currentItem.category}
          </span>
          <h4 className="text-sm font-semibold text-white">{currentItem.title}</h4>
        </div>

        {/* Assembly Dropzone */}
        <div className={`min-h-[100px] p-5 rounded-2xl border-2 transition-all flex flex-wrap gap-2.5 items-center ${
          isCompleted
            ? 'bg-emerald-950/40 border-emerald-500/60'
            : isError
            ? 'bg-rose-950/40 border-rose-500/60'
            : 'bg-slate-950/80 border-dashed border-slate-700'
        }`}>
          {selectedTokens.length === 0 ? (
            <span className="text-sm text-slate-500 italic select-none">
              Click words below to assemble the conditional sentence...
            </span>
          ) : (
            selectedTokens.map((token, idx) => (
              <button
                key={idx}
                onClick={() => handleRemoveToken(token, idx)}
                disabled={isCompleted}
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-500 hover:to-sky-500 text-white font-medium text-sm sm:text-base shadow-md transition transform active:scale-95 flex items-center space-x-1"
              >
                <span>{token}</span>
                {!isCompleted && <span className="text-xs text-white/60 ml-1">✕</span>}
              </button>
            ))
          )}
        </div>

        {/* Available Scrambled Tiles */}
        <div className="space-y-2">
          <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
            Available Blocks:
          </div>
          <div className="flex flex-wrap gap-2.5">
            {availableTokens.map((token, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectToken(token, idx)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 hover:border-sky-400 text-slate-200 hover:text-white font-medium text-sm sm:text-base shadow-sm transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {token}
              </button>
            ))}
          </div>
        </div>

        {/* Action Controls & Validation Message */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            {isError && (
              <span className="text-rose-400 font-bold flex items-center space-x-1">
                <span>⚠️ Order is incorrect. Remember the clause and comma rules!</span>
              </span>
            )}
            {isCompleted && (
              <span className="text-emerald-400 font-bold flex items-center space-x-1">
                <Check className="w-4 h-4" />
                <span>Perfect! Sentence correctly constructed. (+60 XP)</span>
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {!isCompleted ? (
              <button
                onClick={handleCheckSentence}
                disabled={availableTokens.length > 0}
                className={`px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition ${
                  availableTokens.length === 0
                    ? 'bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-sky-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                Check Sentence
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-md transition flex items-center space-x-1.5"
              >
                <span>Next Puzzle</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Explanation Card when Completed */}
        {isCompleted && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-emerald-400">Grammar Insight:</span>
              <button
                onClick={() => soundManager.speak(currentItem.explanation)}
                className="flex items-center space-x-1 text-sky-400 hover:text-sky-300"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen</span>
              </button>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentItem.explanation}
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
