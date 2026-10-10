import React, { useState } from 'react';
import { useUserStats } from './hooks/useUserStats';
import { Navbar } from './components/Navbar';
import { InstructionsView } from './components/InstructionsView';
import { ExplanationSection } from './components/ExplanationSection';
import { ExamplesSection } from './components/ExamplesSection';
import { GamesHub } from './components/GamesHub';
import { QuizGame } from './components/QuizGame';
import { ScoreDashboard } from './components/ScoreDashboard';
import { CertificateModal } from './components/CertificateModal';
import { SpeechIndicator } from './components/SpeechIndicator';
import { Sparkles, Trophy, X, ArrowRight } from 'lucide-react';
import { soundManager } from './utils/audio';

export default function App() {
  const {
    stats,
    achievements,
    latestUnlockedAchievement,
    addScore,
    recordMatchCompleted,
    recordQuizCompleted,
    resetStats,
    dismissAchievementToast
  } = useUserStats();

  const [activeTab, setActiveTab] = useState<
    'instructions' | 'explanation' | 'examples' | 'matching' | 'quiz' | 'dashboard'
  >('instructions');

  const [arcadeGame, setArcadeGame] = useState<'matching' | 'speed' | 'builder' | 'bug'>('matching');
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar
        stats={stats}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCertificate={() => setIsCertificateOpen(true)}
      />

      {/* Floating Live Speech TTS Indicator */}
      <SpeechIndicator />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'instructions' && (
          <InstructionsView
            onStartPlaying={() => {
              soundManager.playClick();
              setArcadeGame('matching');
              setActiveTab('matching');
            }}
            onStartSpeedRush={() => {
              soundManager.playClick();
              setArcadeGame('speed');
              setActiveTab('matching');
            }}
            onExploreGrammar={() => {
              soundManager.playClick();
              setActiveTab('explanation');
            }}
          />
        )}

        {activeTab === 'explanation' && (
          <ExplanationSection
            onGoToGame={() => {
              soundManager.playClick();
              setActiveTab('matching');
            }}
          />
        )}

        {activeTab === 'examples' && <ExamplesSection />}

        {activeTab === 'matching' && (
          <GamesHub
            initialGame={arcadeGame}
            onScoreUpdate={addScore}
            onMatchCompleted={recordMatchCompleted}
            currentStreak={stats.streak}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizGame
            onScoreUpdate={addScore}
            onQuizCompleted={recordQuizCompleted}
            currentStreak={stats.streak}
          />
        )}

        {activeTab === 'dashboard' && (
          <ScoreDashboard
            stats={stats}
            achievements={achievements}
            onResetStats={resetStats}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onGoToGame={() => {
              soundManager.playClick();
              setActiveTab('matching');
            }}
          />
        )}
      </main>

      {/* Achievement Unlocked Toast Notification */}
      {latestUnlockedAchievement && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 border-2 border-amber-500/60 rounded-2xl p-4 shadow-2xl flex items-center space-x-3 animate-in slide-in-from-bottom duration-300">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-2xl shrink-0">
            {latestUnlockedAchievement.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
              Badge Unlocked!
            </div>
            <h4 className="text-sm font-bold text-white truncate">
              {latestUnlockedAchievement.title}
            </h4>
            <p className="text-xs text-slate-300 truncate">
              {latestUnlockedAchievement.description}
            </p>
          </div>
          <button
            onClick={dismissAchievementToast}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Diploma / Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        stats={stats}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            EduTech Conditionals • Zero & First Conditional Master • Theme: How Educational Technology Enhances Teaching & Learning
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('instructions')}
              className="hover:text-slate-300 transition"
            >
              How to Play
            </button>
            <button
              onClick={() => setActiveTab('explanation')}
              className="hover:text-slate-300 transition"
            >
              Grammar Rules
            </button>
            <button
              onClick={() => setIsCertificateOpen(true)}
              className="text-amber-400 hover:text-amber-300 transition font-semibold"
            >
              Get Diploma
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
