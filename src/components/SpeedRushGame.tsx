import React, { useState, useEffect, useCallback } from 'react';
import { SPEED_RUSH_ITEMS, SpeedRushItem } from '../data/speedRushData';
import { ConditionalType } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Zap, Heart, RotateCcw, Trophy, Volume2, VolumeX, Sparkles, CheckCircle2, XCircle, ArrowRight, Timer, Flame, HelpCircle, Keyboard, Award } from 'lucide-react';

interface SpeedRushGameProps {
  onScoreUpdate: (points: number, isCorrect: boolean) => void;
  currentStreak: number;
}

type DifficultyMode = 'practice' | 'normal' | 'turbo';

interface AnswerHistory {
  item: SpeedRushItem;
  userChoice: ConditionalType;
  isCorrect: boolean;
  timeSpent: number;
}

export const SpeedRushGame: React.FC<SpeedRushGameProps> = ({
  onScoreUpdate,
  currentStreak
}) => {
  const [difficulty, setDifficulty] = useState<DifficultyMode>('normal');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [autoSpeech, setAutoSpeech] = useState(true);
  const [showHint, setShowHint] = useState(false);
  const [history, setHistory] = useState<AnswerHistory[]>([]);

  const maxTimeMap: Record<DifficultyMode, number> = {
    practice: 15,
    normal: 10,
    turbo: 6
  };
  const maxTime = maxTimeMap[difficulty];
  const [timeLeft, setTimeLeft] = useState(maxTime);

  const [feedback, setFeedback] = useState<{
    correct: boolean;
    explanation: string;
  } | null>(null);

  const currentItem: SpeedRushItem = SPEED_RUSH_ITEMS[currentIndex % SPEED_RUSH_ITEMS.length];

  // Auto-speak when new sentence appears if autoSpeech is on
  useEffect(() => {
    if (!isGameOver && !feedback && autoSpeech) {
      soundManager.speak(currentItem.sentence);
    }
  }, [currentIndex, isGameOver, autoSpeech]);

  // Timer countdown
  useEffect(() => {
    if (isGameOver || feedback) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeOut();
          return maxTime;
        }
        if (prev <= 4) {
          // Subtle ticking sound
          soundManager.playClick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isGameOver, feedback, maxTime]);

  const handleTimeOut = () => {
    soundManager.playError();
    const newLives = lives - 1;
    setLives(newLives);
    setCombo(0);
    onScoreUpdate(0, false);

    setHistory(prev => [
      ...prev,
      {
        item: currentItem,
        userChoice: currentItem.correctType === 'zero' ? 'first' : 'zero',
        isCorrect: false,
        timeSpent: maxTime
      }
    ]);

    if (newLives <= 0) {
      handleGameOver();
    } else {
      nextItem();
    }
  };

  const handleAnswer = useCallback((choice: ConditionalType) => {
    if (feedback || isGameOver) return;
    soundManager.playClick();

    const isCorrect = choice === currentItem.correctType;
    const timeSpent = maxTime - timeLeft;

    setHistory(prev => [
      ...prev,
      {
        item: currentItem,
        userChoice: choice,
        isCorrect,
        timeSpent
      }
    ]);

    if (isCorrect) {
      soundManager.playMatchSuccess();
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));

      const comboBonus = Math.min(newCombo * 10, 50);
      const speedBonus = timeLeft * 3;
      const diffMultiplier = difficulty === 'turbo' ? 1.5 : 1.0;
      const points = Math.round((40 + comboBonus + speedBonus) * diffMultiplier);

      setScore(prev => prev + points);
      onScoreUpdate(points, true);

      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.7 }
      });

      setFeedback({
        correct: true,
        explanation: currentItem.explanation
      });
    } else {
      soundManager.playError();
      const newLives = lives - 1;
      setLives(newLives);
      setCombo(0);
      onScoreUpdate(0, false);

      setFeedback({
        correct: false,
        explanation: currentItem.explanation
      });

      if (newLives <= 0) {
        handleGameOver();
        return;
      }
    }
  }, [feedback, isGameOver, currentItem, maxTime, timeLeft, combo, difficulty, lives, onScoreUpdate]);

  // Keyboard shortcut listeners (Z / 1 for Zero, F / 2 for First)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (feedback) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          nextItem();
        }
        return;
      }
      if (isGameOver) return;

      const key = e.key.toLowerCase();
      if (key === 'z' || key === '1') {
        handleAnswer('zero');
      } else if (key === 'f' || key === '2') {
        handleAnswer('first');
      } else if (key === ' ') {
        e.preventDefault();
        soundManager.speak(currentItem.sentence);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [feedback, isGameOver, handleAnswer, currentItem]);

  const nextItem = () => {
    setFeedback(null);
    setTimeLeft(maxTime);
    setCurrentIndex(prev => prev + 1);
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    soundManager.playVictory();
    confetti({
      particleCount: 120,
      spread: 85,
      origin: { y: 0.5 }
    });
  };

  const handleRestart = (newDiff?: DifficultyMode) => {
    soundManager.playClick();
    const targetDiff = newDiff || difficulty;
    if (newDiff) setDifficulty(newDiff);
    setCurrentIndex(0);
    setLives(3);
    setTimeLeft(maxTimeMap[targetDiff]);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setIsGameOver(false);
    setFeedback(null);
    setHistory([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Arcade Header HUD Bar */}
      <div className="bg-slate-900 border-2 border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-6 -mr-6 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 p-0.5 shadow-lg shadow-amber-500/30">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-white tracking-tight">
                  Speed Rush Sorter
                </h3>
                <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                  Time-Attack Arcade
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Clasifica antes de que el reloj llegue a cero: ¿Zero (Regla) o First (Futuro)?
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center flex-wrap gap-2.5 text-xs sm:text-sm">
            {/* Lives */}
            <div className="flex items-center space-x-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 shadow-inner">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 transition-all duration-300 ${
                    i < lives
                      ? 'text-rose-500 fill-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.6)]'
                      : 'text-slate-800'
                  }`}
                />
              ))}
            </div>

            {/* Score */}
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 font-mono font-bold text-amber-400">
              {score} XP
            </div>

            {/* Combo */}
            <div className={`px-3 py-1.5 rounded-xl border font-mono font-bold transition flex items-center space-x-1 ${
              combo >= 3
                ? 'bg-orange-500/20 border-orange-500/50 text-orange-300 shadow-md shadow-orange-500/20'
                : 'bg-slate-950 border-slate-800 text-sky-400'
            }`}>
              {combo >= 3 && <Flame className="w-3.5 h-3.5 text-orange-400 animate-bounce" />}
              <span>{combo}x Frenzy</span>
            </div>

            {/* Restart */}
            <button
              onClick={() => handleRestart()}
              title="Reiniciar Speed Rush"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Difficulty & Audio Toolbar */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Difficulty mode selector */}
          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => handleRestart('practice')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                difficulty === 'practice' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⏱️ Práctica (15s)
            </button>
            <button
              onClick={() => handleRestart('normal')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                difficulty === 'normal' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              ⚡ Normal (10s)
            </button>
            <button
              onClick={() => handleRestart('turbo')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                difficulty === 'turbo' ? 'bg-rose-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🔥 Turbo (6s • 1.5x XP)
            </button>
          </div>

          {/* Audio & Hint Switches */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAutoSpeech(!autoSpeech)}
              className={`px-2.5 py-1 rounded-xl border transition flex items-center space-x-1 font-semibold ${
                autoSpeech
                  ? 'bg-sky-500/10 border-sky-500/30 text-sky-300'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              {autoSpeech ? <Volume2 className="w-3.5 h-3.5 text-sky-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>Auto-Voz {autoSpeech ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => setShowHint(!showHint)}
              className="px-2.5 py-1 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-amber-300 flex items-center space-x-1"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{showHint ? 'Ocultar Pista' : 'Pista Rápida'}</span>
            </button>
          </div>
        </div>

        {/* Optional Hint Box */}
        {showHint && (
          <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 animate-in fade-in duration-200 space-y-1">
            <div><strong>💡 Regla Relámpago:</strong></div>
            <div className="text-slate-300">
              • <strong>ZERO CONDITIONAL:</strong> Hechos universales y automatizaciones de software. Fórmula: <em>Presente + Presente</em> (busca verbos en presente sin "will").
            </div>
            <div className="text-slate-300">
              • <strong>FIRST CONDITIONAL:</strong> Planes futuros y consecuencias probables. Fórmula: <em>Presente + will / won't + infinitivo</em>.
            </div>
          </div>
        )}

        {/* Dynamic Timer Countdown Bar */}
        {!isGameOver && (
          <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center space-x-1">
                <Timer className="w-3.5 h-3.5 text-amber-400" />
                <span>Tiempo Restante:</span>
              </span>
              <span className={`font-bold ${
                timeLeft <= 3 ? 'text-rose-400 animate-pulse text-sm' : 'text-slate-200'
              }`}>
                {timeLeft}s
              </span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-300 ${
                  timeLeft <= 3
                    ? 'bg-rose-500 shadow-lg shadow-rose-500/50'
                    : timeLeft <= 5
                    ? 'bg-amber-400 shadow-lg shadow-amber-400/50'
                    : 'bg-emerald-400 shadow-lg shadow-emerald-400/50'
                }`}
                style={{ width: `${(timeLeft / maxTime) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

      </div>

      {!isGameOver ? (
        /* Question Card */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between text-xs">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-semibold font-mono">
              Item #{currentIndex + 1} de {SPEED_RUSH_ITEMS.length}
            </span>
            <span className="text-slate-300 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800 font-medium">
              📱 {currentItem.techContext}
            </span>
          </div>

          {/* Sentence Display */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-4 relative">
            <p className="text-lg sm:text-2xl font-bold text-white leading-relaxed">
              "{currentItem.sentence}"
            </p>
            <div className="flex items-center justify-center space-x-3 pt-1">
              <button
                onClick={() => soundManager.speak(currentItem.sentence)}
                className="inline-flex items-center space-x-1.5 text-xs text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 px-3 py-1.5 rounded-xl border border-sky-500/30 font-medium transition"
              >
                <Volume2 className="w-4 h-4" />
                <span>Escuchar en Inglés (Space)</span>
              </button>
            </div>
          </div>

          {/* Fast Keyboard Hint */}
          <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-500">
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">Z</kbd>
              <span>o</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">1</kbd>
              <span>= Zero</span>
            </span>
            <span className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">F</kbd>
              <span>o</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono">2</kbd>
              <span>= First</span>
            </span>
          </div>

          {/* Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer('zero')}
              disabled={!!feedback}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-sky-950/80 to-slate-900 hover:from-sky-900/90 hover:to-slate-900 border-2 border-sky-500/50 hover:border-sky-400 text-sky-300 hover:text-white font-black text-base sm:text-lg transition transform active:scale-95 flex flex-col items-center justify-center space-y-1 shadow-lg shadow-sky-500/10"
            >
              <span className="tracking-wide">ZERO CONDITIONAL</span>
              <span className="text-xs font-normal text-sky-400/80 font-sans">
                (Regla General / Automatización de Software)
              </span>
              <span className="text-[10px] text-slate-400 font-mono pt-1">Presiona [Z] o [1]</span>
            </button>

            <button
              onClick={() => handleAnswer('first')}
              disabled={!!feedback}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-950/80 to-slate-900 hover:from-emerald-900/90 hover:to-slate-900 border-2 border-emerald-500/50 hover:border-emerald-400 text-emerald-300 hover:text-white font-black text-base sm:text-lg transition transform active:scale-95 flex flex-col items-center justify-center space-y-1 shadow-lg shadow-emerald-500/10"
            >
              <span className="tracking-wide">FIRST CONDITIONAL</span>
              <span className="text-xs font-normal text-emerald-400/80 font-sans">
                (Plan Futuro / Predicción Educativa)
              </span>
              <span className="text-[10px] text-slate-400 font-mono pt-1">Presiona [F] o [2]</span>
            </button>
          </div>

          {/* Feedback Reveal */}
          {feedback && (
            <div className={`p-5 rounded-2xl border space-y-2 animate-in fade-in duration-200 ${
              feedback.correct
                ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/70 border-rose-500/50 text-rose-200'
            }`}>
              <div className="flex items-center justify-between">
                <div className="font-bold text-sm sm:text-base flex items-center space-x-2">
                  {feedback.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                  <span>{feedback.correct ? '¡Velocidad Excelente! Respuesta Correcta' : 'Tiempo o Clasificación Incorrecta'}</span>
                </div>
                <button
                  onClick={nextItem}
                  className="px-4 py-2 rounded-xl bg-white text-slate-950 font-bold text-xs shadow-md transition hover:bg-slate-200 flex items-center space-x-1.5"
                >
                  <span>Siguiente Oración (Enter)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-95 pt-1">
                {feedback.explanation}
              </p>
            </div>
          )}

        </div>
      ) : (
        /* Game Over & Detailed Review Screen */
        <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 text-center space-y-8 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/25">
            <Trophy className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              ¡Ronda Arcade Completada!
            </span>
            <h3 className="text-3xl font-black text-white">
              Resumen de Speed Rush
            </h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              Obtuviste <strong className="text-amber-400">{score} XP</strong> con una racha máxima de <strong className="text-sky-400">{maxCombo}x</strong> en modo {difficulty.toUpperCase()}.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Preguntas</div>
              <div className="text-lg font-bold font-mono text-white">{history.length}</div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Aciertos</div>
              <div className="text-lg font-bold font-mono text-emerald-400">
                {history.filter(h => h.isCorrect).length}
              </div>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Precisión</div>
              <div className="text-lg font-bold font-mono text-sky-400">
                {history.length > 0 ? Math.round((history.filter(h => h.isCorrect).length / history.length) * 100) : 0}%
              </div>
            </div>
          </div>

          {/* Sentences Audio Review Bank */}
          {history.length > 0 && (
            <div className="text-left space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Repaso de Oraciones con Audio en Inglés:
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {history.map((entry, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs gap-3 ${
                      entry.isCorrect
                        ? 'bg-slate-950/80 border-emerald-500/30'
                        : 'bg-slate-950/80 border-rose-500/30'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          entry.item.correctType === 'zero' ? 'bg-sky-500/20 text-sky-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {entry.item.correctType === 'zero' ? 'Zero Conditional' : 'First Conditional'}
                        </span>
                        <span className="text-[10px] text-slate-500">{entry.item.techContext}</span>
                      </div>
                      <p className="text-slate-200 font-medium">"{entry.item.sentence}"</p>
                    </div>
                    <button
                      onClick={() => soundManager.speak(entry.item.sentence)}
                      className="p-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 shrink-0"
                      title="Escuchar pronunciación"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleRestart('normal')}
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 transition transform active:scale-95 flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Jugar de Nuevo (Normal)</span>
            </button>

            <button
              onClick={() => handleRestart('turbo')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-400 hover:to-amber-400 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition transform active:scale-95 flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Desafío Turbo Rush (6s)</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
