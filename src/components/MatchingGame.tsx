import React, { useState, useEffect, useMemo } from 'react';
import { MATCHING_LEVELS, MatchingLevel } from '../data/conditionalsData';
import { ConditionalType } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Target, Trophy, Flame, RotateCcw, Volume2, Sparkles, CheckCircle2, XCircle, ArrowRight, Award, Zap, HelpCircle } from 'lucide-react';

interface MatchingGameProps {
  onScoreUpdate: (points: number, isCorrect: boolean) => void;
  onMatchCompleted: (bonus: number) => void;
  currentStreak: number;
}

interface CardItem {
  id: string; // unique card id
  pairId: string;
  part: 'if' | 'result';
  text: string;
  type: ConditionalType;
  edTechTheme: string;
  matched: boolean;
}

export const MatchingGame: React.FC<MatchingGameProps> = ({
  onScoreUpdate,
  onMatchCompleted,
  currentStreak
}) => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [selectedIfCard, setSelectedIfCard] = useState<CardItem | null>(null);
  const [selectedResultCard, setSelectedResultCard] = useState<CardItem | null>(null);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [isLevelFinished, setIsLevelFinished] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [timerActive, setTimerActive] = useState(true);
  const [shuffledIfCards, setShuffledIfCards] = useState<CardItem[]>([]);
  const [shuffledResultCards, setShuffledResultCards] = useState<CardItem[]>([]);
  const [wrongPairAnimation, setWrongPairAnimation] = useState<string | null>(null);
  const [pendingBonusPair, setPendingBonusPair] = useState<{
    fullSentence: string;
    type: ConditionalType;
    theme: string;
  } | null>(null);
  const [showHint, setShowHint] = useState(false);

  const levelData = MATCHING_LEVELS[currentLevelIndex];

  // Initialize and shuffle cards whenever level changes
  const initLevel = (levelIdx: number) => {
    const lvl = MATCHING_LEVELS[levelIdx];
    const ifCards: CardItem[] = lvl.pairs.map(p => ({
      id: `${p.id}-if`,
      pairId: p.id,
      part: 'if' as const,
      text: p.ifText,
      type: p.type,
      edTechTheme: p.edTechTheme,
      matched: false
    })).sort(() => Math.random() - 0.5);

    const resultCards: CardItem[] = lvl.pairs.map(p => ({
      id: `${p.id}-res`,
      pairId: p.id,
      part: 'result' as const,
      text: p.resultText,
      type: p.type,
      edTechTheme: p.edTechTheme,
      matched: false
    })).sort(() => Math.random() - 0.5);

    setShuffledIfCards(ifCards);
    setShuffledResultCards(resultCards);
    setSelectedIfCard(null);
    setSelectedResultCard(null);
    setMatchedPairIds([]);
    setMoves(0);
    setRoundScore(0);
    setIsLevelFinished(false);
    setSecondsElapsed(0);
    setTimerActive(true);
    setPendingBonusPair(null);
  };

  useEffect(() => {
    initLevel(currentLevelIndex);
  }, [currentLevelIndex]);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && !isLevelFinished) {
      interval = setInterval(() => {
        setSecondsElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, isLevelFinished]);

  // Check matching logic
  const handleSelectIf = (card: CardItem) => {
    if (card.matched || isLevelFinished) return;
    soundManager.playClick();
    setSelectedIfCard(card);

    if (selectedResultCard) {
      evaluatePair(card, selectedResultCard);
    }
  };

  const handleSelectResult = (card: CardItem) => {
    if (card.matched || isLevelFinished) return;
    soundManager.playClick();
    setSelectedResultCard(card);

    if (selectedIfCard) {
      evaluatePair(selectedIfCard, card);
    }
  };

  const evaluatePair = (ifCard: CardItem, resCard: CardItem) => {
    setMoves(prev => prev + 1);

    if (ifCard.pairId === resCard.pairId) {
      // Correct Match!
      soundManager.playMatchSuccess();
      const newMatched = [...matchedPairIds, ifCard.pairId];
      setMatchedPairIds(newMatched);

      // Score update
      const points = 50;
      setRoundScore(prev => prev + points);
      onScoreUpdate(points, true);

      // Pronounce full sentence
      const fullSentence = `${ifCard.text} ${resCard.text}`;
      soundManager.speak(fullSentence);

      // Trigger small confetti
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 }
      });

      // Show Bonus type identification prompt for mixed or high levels
      setPendingBonusPair({
        fullSentence,
        type: ifCard.type,
        theme: ifCard.edTechTheme
      });

      setSelectedIfCard(null);
      setSelectedResultCard(null);

      // Check if level complete
      if (newMatched.length === levelData.pairs.length) {
        handleLevelComplete();
      }
    } else {
      // Wrong Match
      soundManager.playError();
      setWrongPairAnimation(ifCard.id + '-' + resCard.id);
      onScoreUpdate(0, false);

      setTimeout(() => {
        setSelectedIfCard(null);
        setSelectedResultCard(null);
        setWrongPairAnimation(null);
      }, 900);
    }
  };

  const handleBonusAnswer = (userType: ConditionalType) => {
    soundManager.playClick();
    if (!pendingBonusPair) return;

    if (userType === pendingBonusPair.type) {
      soundManager.playVictory();
      const bonusPts = 25;
      setRoundScore(prev => prev + bonusPts);
      onScoreUpdate(bonusPts, true);
      confetti({
        particleCount: 45,
        spread: 50,
        origin: { y: 0.6 }
      });
    } else {
      soundManager.playError();
      onScoreUpdate(0, false);
    }
    setPendingBonusPair(null);
  };

  const handleLevelComplete = () => {
    setTimerActive(false);
    setIsLevelFinished(true);
    soundManager.playVictory();
    onMatchCompleted(100);

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 }
    });
  };

  const handleNextLevel = () => {
    soundManager.playClick();
    if (currentLevelIndex < MATCHING_LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      setCurrentLevelIndex(0); // Loop back or replay
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Level Selection Bar & HUD */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Level Switcher */}
          <div className="flex items-center space-x-2">
            {MATCHING_LEVELS.map((lvl, idx) => (
              <button
                key={lvl.levelId}
                onClick={() => {
                  soundManager.playClick();
                  setCurrentLevelIndex(idx);
                }}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center space-x-1.5 ${
                  currentLevelIndex === idx
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 ring-2 ring-sky-400/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                }`}
              >
                <span>Level {lvl.levelId}</span>
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-2">
              <span className="text-slate-400">Time:</span>
              <span className="font-mono font-bold text-white">{formatTime(secondsElapsed)}</span>
            </div>

            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-2">
              <span className="text-slate-400">Moves:</span>
              <span className="font-mono font-bold text-sky-400">{moves}</span>
            </div>

            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center space-x-2">
              <span className="text-slate-400">Pairs:</span>
              <span className="font-mono font-bold text-emerald-400">
                {matchedPairIds.length} / {levelData.pairs.length}
              </span>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                initLevel(currentLevelIndex);
              }}
              title="Restart Level"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Level Title & Mission with Thematic Image Banner */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-700 shrink-0 shadow-md">
              <img
                src={
                  currentLevelIndex === 0
                    ? '/src/assets/images/ai_smart_tutor_1791665177327.jpg'
                    : currentLevelIndex === 1
                    ? '/src/assets/images/vr_science_lab_1791665166902.jpg'
                    : '/src/assets/images/digital_collaborative_class_1791665187424.jpg'
                }
                alt="Level theme illustration"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Matching Pairs • Juego de Emparejamiento
                </h3>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {levelData.targetType.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{levelData.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start md:self-auto">
            <button
              onClick={() => {
                soundManager.playClick();
                setShowHint(!showHint);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center space-x-1.5 ${
                showHint
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-amber-300'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>{showHint ? 'Hide Grammar Hint' : '💡 Show Grammar Hint'}</span>
            </button>
          </div>
        </div>

        {/* Optional Grammar Hint Box */}
        {showHint && (
          <div className="mt-3 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 animate-in fade-in duration-200">
            <strong>💡 Clave gramatical para este nivel: </strong>
            {currentLevelIndex === 0 && (
              <span>Zero Conditional (Hechos & Reglas): Ambos verbos van en <em>Present Simple</em> (If/When + Present Simple, Present Simple).</span>
            )}
            {currentLevelIndex === 1 && (
              <span>First Conditional (Planes & Predicciones): Cláusula con If en <em>Present Simple</em>, cláusula de resultado con <em>will + verbo infinitivo</em>.</span>
            )}
            {currentLevelIndex === 2 && (
              <span>Nivel Mixto: Identifica si la oración describe una regla tecnológica constante (Zero) o un plan futuro para la escuela (First).</span>
            )}
          </div>
        )}
      </div>

      {/* Bonus Question Toast Popup (When a match is made) */}
      {pendingBonusPair && !isLevelFinished && (
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-2 border-indigo-500/50 rounded-2xl p-4 sm:p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Bonus Classification (+25 XP)
                </span>
                <span className="text-xs text-slate-400">• Theme: {pendingBonusPair.theme}</span>
              </div>
              <p className="text-sm font-semibold text-white">
                "{pendingBonusPair.fullSentence}"
              </p>
              <p className="text-xs text-slate-300">
                Which conditional structure is this sentence demonstrating?
              </p>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => handleBonusAnswer('zero')}
                className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition"
              >
                Zero (Fact/Rule)
              </button>
              <button
                onClick={() => handleBonusAnswer('first')}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
              >
                First (Future Plan)
              </button>
              <button
                onClick={() => setPendingBonusPair(null)}
                className="px-2.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 text-xs transition"
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Matching Arena (Two Columns for fluid readability & tap usability) */}
      {!isLevelFinished ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
            {/* Column 1: IF Clauses */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span>1. Condition (If / When) • Condición</span>
                </span>
                <span className="text-xs text-slate-500">Pick an If card</span>
              </div>

              <div className="space-y-3">
                {shuffledIfCards.map(card => {
                  const isMatched = matchedPairIds.includes(card.pairId);
                  const isSelected = selectedIfCard?.id === card.id;

                  return (
                    <button
                      key={card.id}
                      disabled={isMatched}
                      onClick={() => handleSelectIf(card)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative group ${
                        isMatched
                          ? 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-60 cursor-not-allowed'
                          : isSelected
                          ? 'bg-sky-950/80 border-sky-400 text-white ring-2 ring-sky-400/50 shadow-lg shadow-sky-500/20 translate-x-1'
                          : 'bg-slate-900 border-slate-800 hover:border-sky-500/50 text-slate-200 hover:bg-slate-850'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="text-xs font-bold text-sky-400 font-mono mb-1">
                          [If-Clause] • {card.edTechTheme}
                        </div>
                        <div className="flex items-center space-x-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              soundManager.speak(card.text);
                            }}
                            title="Escuchar audio en inglés (Listen to clause in English)"
                            className="p-1 rounded-lg bg-sky-500/10 hover:bg-sky-500/30 text-sky-300 hover:text-white transition"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                          {isMatched && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          )}
                        </div>
                      </div>
                      <div className="text-sm sm:text-base font-medium leading-snug">
                        {card.text}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Column 2: RESULT Clauses */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>2. Result (Consequence) • Resultado</span>
                </span>
                <span className="text-xs text-slate-500">Pick matching Result</span>
              </div>

            <div className="space-y-3">
              {shuffledResultCards.map(card => {
                const isMatched = matchedPairIds.includes(card.pairId);
                const isSelected = selectedResultCard?.id === card.id;

                return (
                  <button
                    key={card.id}
                    disabled={isMatched}
                    onClick={() => handleSelectResult(card)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 relative group ${
                      isMatched
                        ? 'bg-slate-900/40 border-slate-800 text-slate-600 opacity-60 cursor-not-allowed'
                        : isSelected
                        ? 'bg-emerald-950/80 border-emerald-400 text-white ring-2 ring-emerald-400/50 shadow-lg shadow-emerald-500/20 -translate-x-1'
                        : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 text-slate-200 hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-xs font-bold text-emerald-400 font-mono mb-1">
                        [Result-Clause] • {card.edTechTheme}
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundManager.speak(card.text);
                          }}
                          title="Escuchar audio en inglés (Listen to clause in English)"
                          className="p-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/30 text-emerald-300 hover:text-white transition"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        {isMatched && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        )}
                      </div>
                    </div>
                    <div className="text-sm sm:text-base font-medium leading-snug">
                      {card.text}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Level Victory Screen */
        <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-sky-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Trophy className="w-10 h-10 text-slate-950" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Stage Completed!
            </span>
            <h3 className="text-3xl font-extrabold text-white">
              Outstanding Grammatical Pairing!
            </h3>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You correctly aligned all technology conditionals for <strong>{levelData.title}</strong> in {moves} moves.
            </p>
          </div>

          {/* Victory Stats Scorecard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto text-left">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Time Elapsed</div>
              <div className="text-lg font-bold font-mono text-white">{formatTime(secondsElapsed)}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Total Moves</div>
              <div className="text-lg font-bold font-mono text-sky-400">{moves}</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 font-bold uppercase">XP Earned</div>
              <div className="text-lg font-bold font-mono text-emerald-400">+{roundScore + 100} XP</div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Streak Active</div>
              <div className="text-lg font-bold font-mono text-orange-400">{currentStreak}x</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => initLevel(currentLevelIndex)}
              className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay Level</span>
            </button>

            <button
              onClick={handleNextLevel}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 transition transform hover:-translate-y-0.5"
            >
              <span>
                {currentLevelIndex < MATCHING_LEVELS.length - 1 ? 'Next Level' : 'Replay from Level 1'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Interactive TTS Pronunciation Console & Audio Assistant Bar */}
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Volume2 className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <span>Pronunciación Sonora Automática (TTS)</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {soundManager.voiceEnabled ? 'ACTIVA' : 'PAUSADA'}
                </span>
              </h4>
              <p className="text-xs text-slate-400">
                Cada pareja completada se pronuncia automáticamente en inglés natural para afianzar tu oído.
              </p>
            </div>
          </div>

          {/* TTS Controls */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            {/* Speed selector */}
            <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => {
                  soundManager.speechRate = 0.85;
                  soundManager.playClick();
                  soundManager.speak("Learner speed set to 0.85x");
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  soundManager.speechRate <= 0.88 ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                🐢 0.85x Lento
              </button>
              <button
                onClick={() => {
                  soundManager.speechRate = 1.0;
                  soundManager.playClick();
                  soundManager.speak("Normal native speed set to 1.0x");
                }}
                className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                  soundManager.speechRate > 0.88 ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                ⚡ 1.0x Normal
              </button>
            </div>

            {/* Test Voice Button */}
            <button
              onClick={() => {
                soundManager.speak("If students practice with educational technology, their learning outcomes improve significantly.");
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-300 hover:text-white border border-slate-700 font-semibold transition flex items-center space-x-1.5"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Probar Voz</span>
            </button>
          </div>
        </div>

        {/* Matched Pairs Audio Review Gallery */}
        {matchedPairIds.length > 0 && (
          <div className="space-y-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Oraciones Emparejadas (Haz clic para escuchar de nuevo):</span>
              <span className="text-emerald-400 font-mono">{matchedPairIds.length} de {levelData.pairs.length} Listas</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {matchedPairIds.map(pairId => {
                const pair = levelData.pairs.find(p => p.id === pairId);
                if (!pair) return null;
                const sentence = `${pair.ifText} ${pair.resultText}`;

                return (
                  <button
                    key={pairId}
                    onClick={() => soundManager.speak(sentence)}
                    className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-950 border border-slate-800 hover:border-sky-500/50 text-left transition flex items-center justify-between group"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="text-[10px] font-bold text-sky-400 font-mono">
                        {pair.type === 'zero' ? '[Zero Conditional]' : '[First Conditional]'} • {pair.edTechTheme}
                      </div>
                      <div className="text-xs text-slate-200 truncate mt-0.5">
                        "{sentence}"
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-sky-500/10 group-hover:bg-sky-500/20 text-sky-400 shrink-0">
                      <Volume2 className="w-3.5 h-3.5" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
