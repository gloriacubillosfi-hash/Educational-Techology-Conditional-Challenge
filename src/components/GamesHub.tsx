import React, { useState } from 'react';
import { MatchingGame } from './MatchingGame';
import { SpeedRushGame } from './SpeedRushGame';
import { SentenceBuilderGame } from './SentenceBuilderGame';
import { BugHunterGame } from './BugHunterGame';
import { soundManager } from '../utils/audio';
import { Target, Zap, Layers, Bug, Sparkles, Gamepad2 } from 'lucide-react';

interface GamesHubProps {
  onScoreUpdate: (points: number, isCorrect: boolean) => void;
  onMatchCompleted: (bonus: number) => void;
  currentStreak: number;
  initialGame?: 'matching' | 'speed' | 'builder' | 'bug';
}

export const GamesHub: React.FC<GamesHubProps> = ({
  onScoreUpdate,
  onMatchCompleted,
  currentStreak,
  initialGame = 'matching'
}) => {
  const [activeGame, setActiveGame] = useState<'matching' | 'speed' | 'builder' | 'bug'>(initialGame);

  const games = [
    {
      id: 'matching' as const,
      title: 'Matching Pairs',
      subtitle: 'Juego de Emparejamiento',
      icon: Target,
      color: 'from-sky-500 to-indigo-600',
      badge: 'Principal • 3 Levels'
    },
    {
      id: 'speed' as const,
      title: 'Speed Rush',
      subtitle: 'Time-Attack Zero vs First',
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
      badge: 'Arcade Rush'
    },
    {
      id: 'builder' as const,
      title: 'Sentence Builder',
      subtitle: 'Unscramble Magnetic Tiles',
      icon: Layers,
      color: 'from-purple-500 to-pink-600',
      badge: 'Syntax Puzzle'
    },
    {
      id: 'bug' as const,
      title: 'Bug Hunter',
      subtitle: 'Debug Code & Fix Traps',
      icon: Bug,
      color: 'from-rose-500 to-red-600',
      badge: 'Code Detective'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Arcade Navigation Carousel */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
        <div className="flex items-center space-x-2 mb-3 px-1">
          <Gamepad2 className="w-5 h-5 text-sky-400" />
          <h2 className="text-base font-bold text-white">Gamified Practice Arena</h2>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2 py-0.5 rounded-full">
            4 Interactive Games
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          {games.map(game => {
            const Icon = game.icon;
            const isActive = activeGame === game.id;

            return (
              <button
                key={game.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveGame(game.id);
                }}
                className={`p-3 sm:p-4 rounded-2xl border text-left transition-all duration-200 relative group overflow-hidden ${
                  isActive
                    ? 'bg-slate-800 border-sky-400 ring-2 ring-sky-400/50 shadow-lg shadow-sky-500/20'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${game.color} flex items-center justify-center text-white shadow-sm`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-sky-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {game.badge}
                  </span>
                </div>

                <div className="font-bold text-sm text-white">{game.title}</div>
                <div className="text-[11px] text-slate-400 truncate">{game.subtitle}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render Active Game */}
      <div className="animate-in fade-in duration-200">
        {activeGame === 'matching' && (
          <MatchingGame
            onScoreUpdate={onScoreUpdate}
            onMatchCompleted={onMatchCompleted}
            currentStreak={currentStreak}
          />
        )}

        {activeGame === 'speed' && (
          <SpeedRushGame
            onScoreUpdate={onScoreUpdate}
            currentStreak={currentStreak}
          />
        )}

        {activeGame === 'builder' && (
          <SentenceBuilderGame
            onScoreUpdate={onScoreUpdate}
            currentStreak={currentStreak}
          />
        )}

        {activeGame === 'bug' && (
          <BugHunterGame
            onScoreUpdate={onScoreUpdate}
            currentStreak={currentStreak}
          />
        )}
      </div>

    </div>
  );
};
