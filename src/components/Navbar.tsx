import React, { useState } from 'react';
import { UserStats } from '../types';
import { soundManager } from '../utils/audio';
import { Sparkles, Flame, Volume2, VolumeX, HelpCircle, Award, Trophy, BookOpen, Layers, Target, CheckCircle2, Gamepad2 } from 'lucide-react';

interface NavbarProps {
  stats: UserStats;
  activeTab: 'instructions' | 'explanation' | 'examples' | 'matching' | 'quiz' | 'dashboard';
  setActiveTab: (tab: 'instructions' | 'explanation' | 'examples' | 'matching' | 'quiz' | 'dashboard') => void;
  onOpenCertificate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  stats,
  activeTab,
  setActiveTab,
  onOpenCertificate
}) => {
  const [sfxOn, setSfxOn] = useState(soundManager.enabled);
  const [voiceOn, setVoiceOn] = useState(soundManager.voiceEnabled);
  const [badgeIndex, setBadgeIndex] = useState(0);

  const BADGE_PHRASES = ['Zero & First', 'Interactive Lab', 'Gamified English', 'EdTech Logic'];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setBadgeIndex(prev => (prev + 1) % BADGE_PHRASES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const toggleSfx = () => {
    soundManager.enabled = !sfxOn;
    setSfxOn(!sfxOn);
    if (!sfxOn) soundManager.playClick();
  };

  const toggleVoice = () => {
    soundManager.voiceEnabled = !voiceOn;
    setVoiceOn(!voiceOn);
    if (!voiceOn) {
      soundManager.speak('Voice pronunciation enabled');
    }
  };

  interface NavItem {
    id: 'instructions' | 'explanation' | 'examples' | 'matching' | 'quiz' | 'dashboard';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
  }

  const navItems: NavItem[] = [
    { id: 'instructions', label: 'Instructions', icon: HelpCircle },
    { id: 'explanation', label: 'Grammar Guide', icon: BookOpen },
    { id: 'examples', label: 'EdTech Examples', icon: Layers },
    { id: 'matching', label: 'Matching Pairs (Emparejamiento)', icon: Target, highlight: true },
    { id: 'quiz', label: 'Quiz Arena', icon: CheckCircle2 },
    { id: 'dashboard', label: 'My Progress', icon: Trophy }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      {/* Top bar with Branding & Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Logo & Tagline */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('explanation')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-0.5 shadow-lg shadow-sky-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg sm:text-xl tracking-tight inline-flex items-center select-none">
                  {"EduTech Conditionals".split("").map((char, index) => (
                    <span
                      key={index}
                      className={`letter-cascade ${
                        char === " " ? "w-1.5" : "hover:text-sky-300 transition-colors"
                      }`}
                      style={{
                        animationDelay: `${index * 0.09}s`
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </span>
                <span
                  key={badgeIndex}
                  className="animate-rotate-phrase text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full"
                >
                  {BADGE_PHRASES[badgeIndex]}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                How Educational Technology Enhances Teaching & Learning
              </p>
            </div>
          </div>

          {/* Gamification Stats HUD */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Level Badge */}
            <div className="flex items-center space-x-1.5 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1.5 rounded-lg text-xs font-semibold shadow-inner">
              <span className="text-amber-400">Lv.{stats.level}</span>
              <span className="text-slate-400 hidden xs:inline">Student</span>
            </div>

            {/* Total XP / Score */}
            <div className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg text-xs font-bold text-amber-300 shadow-sm">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>{stats.score.toLocaleString()} XP</span>
            </div>

            {/* Streak Counter */}
            <div className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              stats.streak > 0 
                ? 'bg-orange-500/20 border border-orange-500/40 text-orange-400' 
                : 'bg-slate-800 border border-slate-700 text-slate-400'
            }`}>
              <Flame className={`w-4 h-4 ${stats.streak > 0 ? 'text-orange-400 animate-bounce' : 'text-slate-500'}`} />
              <span>{stats.streak}x Streak</span>
            </div>

            {/* Sound Effects Toggle */}
            <button
              onClick={toggleSfx}
              title={sfxOn ? 'Disable Sound Effects' : 'Enable Sound Effects'}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
            >
              {sfxOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
            </button>

            {/* Voice Pronunciation Toggle */}
            <button
              onClick={toggleVoice}
              title={voiceOn ? 'Text-to-Speech Pronunciation is ON' : 'Text-to-Speech Pronunciation is OFF'}
              className="px-2 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition flex items-center space-x-1"
            >
              <span className="text-[10px] font-bold text-sky-400">TTS</span>
              <span className={`w-2 h-2 rounded-full ${voiceOn ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
            </button>

            {/* Certificate Button */}
            <button
              onClick={onOpenCertificate}
              className="flex items-center space-x-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-md transition transform active:scale-95"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Diploma</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Navigation */}
        <nav className="flex items-center space-x-1 sm:space-x-2 mt-3 pt-2 border-t border-slate-800/80 overflow-x-auto no-scrollbar">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(item.id);
                }}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-sky-500 text-white font-semibold shadow-md shadow-sky-500/25 ring-1 ring-sky-400/50'
                    : item.highlight
                    ? 'bg-slate-800/80 text-sky-300 hover:bg-slate-800 hover:text-sky-200 border border-sky-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.highlight && !isActive && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
