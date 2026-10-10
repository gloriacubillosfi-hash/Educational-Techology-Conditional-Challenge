import React, { useState } from 'react';
import { UserStats, Achievement } from '../types';
import { Trophy, Flame, Target, CheckCircle2, RotateCcw, Award, Zap, Sparkles, BookOpen, Layers } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ScoreDashboardProps {
  stats: UserStats;
  achievements: Achievement[];
  onResetStats: () => void;
  onOpenCertificate: () => void;
  onGoToGame: () => void;
}

export const ScoreDashboard: React.FC<ScoreDashboardProps> = ({
  stats,
  achievements,
  onResetStats,
  onOpenCertificate,
  onGoToGame
}) => {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Calculate XP towards next level (250 XP per level)
  const currentLevelFloorXP = (stats.level - 1) * 250;
  const nextLevelCeilXP = stats.level * 250;
  const levelXPProgress = stats.xp - currentLevelFloorXP;
  const progressPercent = Math.min(100, Math.max(0, (levelXPProgress / 250) * 100));

  const accuracy = stats.totalAttempts > 0 
    ? Math.round((stats.correctAnswers / stats.totalAttempts) * 100) 
    : 100;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Level & XP Overview Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-500 to-orange-500 flex items-center justify-center font-black text-2xl sm:text-3xl text-slate-950 shadow-lg shadow-amber-500/20">
              Lv.{stats.level}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  EdTech Scholar Profile
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold">
                  {stats.level >= 5 ? 'Digital Pedagogy Master' : stats.level >= 3 ? 'EdTech Specialist' : 'Active Learner'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Total XP: <strong className="text-amber-400">{stats.xp.toLocaleString()}</strong> • Next Level in <span className="text-slate-200">{nextLevelCeilXP - stats.xp} XP</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenCertificate();
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition"
            >
              <Award className="w-4 h-4" />
              <span>View Diploma</span>
            </button>

            <button
              onClick={() => {
                soundManager.playClick();
                onGoToGame();
              }}
              className="flex items-center space-x-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-md transition"
            >
              <Target className="w-4 h-4" />
              <span>Play More</span>
            </button>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 space-y-2">
          <div className="flex justify-between text-xs text-slate-400 font-semibold">
            <span>Level {stats.level} Progress</span>
            <span>{Math.round(progressPercent)}% ({levelXPProgress} / 250 XP)</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* 4 Performance Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold">Total Score</span>
            <Trophy className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{stats.score.toLocaleString()}</div>
          <div className="text-[11px] text-slate-500">Points collected</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold">Max Streak</span>
            <Flame className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl font-black text-orange-400 font-mono">{stats.maxStreak}x</div>
          <div className="text-[11px] text-slate-500">Consecutive correct</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold">Card Matches</span>
            <Target className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black text-sky-400 font-mono">{stats.matchesCompleted}</div>
          <div className="text-[11px] text-slate-500">Completed pairings</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs uppercase font-bold">Overall Accuracy</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{accuracy}%</div>
          <div className="text-[11px] text-slate-500">{stats.correctAnswers} of {stats.totalAttempts} correct</div>
        </div>

      </div>

      {/* Badges & Achievements Arena */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Digital Achievements & Badges</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Unlocked: {achievements.filter(a => a.unlocked).length} of {achievements.length} badges
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map(ach => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition ${
                ach.unlocked
                  ? 'bg-slate-950/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-950/40 border-slate-800 opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                  ach.unlocked ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-slate-800 border border-slate-700 grayscale'
                }`}>
                  {ach.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-sm font-bold text-white">{ach.title}</h4>
                    {ach.unlocked && (
                      <span className="text-[10px] text-amber-400 font-bold">UNLOCKED</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-snug">{ach.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reset Stats Controls */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-300">Reset Learning Progress</h4>
          <p className="text-xs text-slate-500">
            Clear your local scores, streaks, and unlocked badges to start from level 1 again.
          </p>
        </div>

        {!showConfirmReset ? (
          <button
            onClick={() => setShowConfirmReset(true)}
            className="flex items-center space-x-1.5 text-xs text-slate-400 hover:text-rose-400 px-3 py-2 rounded-xl border border-slate-800 hover:border-rose-500/30 transition self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Stats</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                onResetStats();
                setShowConfirmReset(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
            >
              Confirm Reset
            </button>
            <button
              onClick={() => setShowConfirmReset(false)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
