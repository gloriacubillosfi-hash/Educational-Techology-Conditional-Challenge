import React, { useState, useEffect } from 'react';
import { Target, BookOpen, Trophy, Zap, CheckCircle2, ArrowRight, Sparkles, HelpCircle, Layers, Cpu, Volume2, Quote, RefreshCw, Play, Square } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface InstructionsViewProps {
  onStartPlaying: () => void;
  onExploreGrammar: () => void;
  onStartSpeedRush?: () => void;
}

const ROTATING_PHRASES = [
  'Powers Conditionals Learning',
  'Transforms Teaching & Learning',
  'Enhances Classroom Collaboration',
  'Automates Instant Feedback',
  'Accelerates Student Mastery',
  'Brings Zero & First Conditionals to Life'
];

export const InstructionsView: React.FC<InstructionsViewProps> = ({
  onStartPlaying,
  onExploreGrammar,
  onStartSpeedRush
}) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhraseIndex(prev => (prev + 1) % ROTATING_PHRASES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const handleNextPhrase = () => {
    soundManager.playClick();
    setCurrentPhraseIndex(prev => (prev + 1) % ROTATING_PHRASES.length);
  };

  const presentationText = `Hello everyone. Today I am going to present my Google IA studio activity about Zero Conditional and First Conditional. The main topic of my activity is educational technology and the learning process. The main pedagogical objective is to help students practice the Zero Conditional and First Conditional in a meaningful educational context. Through this activity, students can understand how conditional sentences can be used to talk about learning, technology, and classroom situations.`;

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      
      {/* Official Activity Presentation & Pedagogical Objective Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-sky-950 border-2 border-indigo-500/40 p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Activity Presentation & Pedagogical Objective</span>
          </div>

          {/* Audio Player Controls */}
          <div className="flex items-center flex-wrap gap-2 self-start sm:self-auto">
            <button
              onClick={() => {
                soundManager.speak(presentationText);
              }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition transform active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Play English Audio (Escuchar Audio)</span>
            </button>

            <button
              onClick={() => soundManager.stopSpeech()}
              title="Stop English Audio"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition"
            >
              <Square className="w-3.5 h-3.5 fill-slate-400" />
            </button>
          </div>
        </div>

        {/* Presentation Statement Box */}
        <div className="relative p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-indigo-500/30 shadow-inner">
          <Quote className="absolute top-4 right-4 w-8 h-8 text-indigo-500/20 pointer-events-none" />
          
          <div className="space-y-3 text-slate-100 text-base sm:text-lg leading-relaxed font-sans">
            <p className="font-semibold text-white">
              "Hello everyone. Today I am going to present my Google IA studio activity about Zero Conditional and First Conditional.
            </p>
            <p className="text-sky-200">
              The main topic of my activity is educational technology and the learning process.
            </p>
            <p className="text-slate-200">
              The main pedagogical objective is to help students practice the Zero Conditional and First Conditional in a meaningful educational context. Through this activity, students can understand how conditional sentences can be used to talk about learning, technology, and classroom situations."
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-300 font-medium">
              🎯 Pedagogical Focus: Meaningful Contexts
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-medium">
              💡 Theme: Educational Technology & Learning
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-300 font-medium">
              ⚙️ Grammar: Zero & First Conditional
            </span>
          </div>
        </div>
      </div>

      {/* Hero Welcome Banner with Featured EdTech Image */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Interactive English Learning Platform</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight animate-title-motion">
                How Educational Technology <br className="hidden sm:inline" />
                <span
                  key={currentPhraseIndex}
                  className="inline-block animate-rotate-phrase bg-gradient-to-r from-sky-400 via-indigo-300 via-emerald-400 to-sky-400 bg-clip-text text-transparent animate-gradient-text"
                >
                  {ROTATING_PHRASES[currentPhraseIndex]}
                </span>
              </h1>

              {/* Dynamic Rotation Indicators & changer */}
              <div className="flex items-center space-x-2 pt-1">
                <div className="flex items-center space-x-1.5">
                  {ROTATING_PHRASES.map((phrase, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        soundManager.playClick();
                        setCurrentPhraseIndex(idx);
                      }}
                      title={`Switch to: "${phrase}"`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentPhraseIndex === idx
                          ? 'w-6 bg-sky-400 shadow-sm shadow-sky-400/50'
                          : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={handleNextPhrase}
                  title="Rotate to next dynamic title"
                  className="p-1 rounded-lg text-slate-500 hover:text-sky-400 transition"
                >
                  <RefreshCw className="w-3 h-3 animate-spin-slow" />
                </button>
              </div>
            </div>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              In modern education, innovative digital classrooms, AI mentors, and virtual reality labs operate on cause-and-effect logic. Learn to use the <strong>Zero Conditional</strong> (for automated rules & scientific facts) and the <strong>First Conditional</strong> (for realistic future school plans & predictions) with real educational scenarios.
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={onStartPlaying}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-sky-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Target className="w-5 h-5" />
                <span>Play Matching Game</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onStartSpeedRush || onStartPlaying}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-lg shadow-amber-500/20 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Zap className="w-5 h-5 text-slate-950 fill-slate-950" />
                <span>Speed Rush (Time-Attack)</span>
              </button>

              <button
                onClick={onExploreGrammar}
                className="inline-flex items-center space-x-2 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-semibold px-5 py-3 rounded-xl border border-slate-700 transition"
              >
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>Review Grammar Rules</span>
              </button>
            </div>
          </div>

          {/* Hero Visual Asset */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl group">
              <img
                src="/src/assets/images/edtech_hero_banner_1791665156134.jpg"
                alt="Modern interactive digital classroom with students and teacher using educational technology"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-left p-2.5 rounded-xl bg-slate-950/80 backdrop-blur-sm border border-slate-800">
                <div className="text-[11px] font-bold text-sky-400">Collaborative Smart Classroom</div>
                <div className="text-[10px] text-slate-300">
                  "If educators integrate interactive holograms, students visualize complex topics easily."
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Visual Thematic Gallery: How Technology Enhances Learning */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>EdTech Themes in English Context</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Explore how each educational technology domain connects directly to Zero and First Conditional sentences.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Theme Card 1: AI & Gamification */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-sky-500/50 transition group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="/src/assets/images/ai_smart_tutor_1791665177327.jpg"
                alt="Student using gamified AI learning tablet with badges and stars"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-sky-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Zero Conditional
              </div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white">Gamification & AI Tutors</h4>
                <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-sky-300 font-medium italic">
                  "If a student completes daily math drills, the AI tutor awards instant bonus badges."
                </div>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Pedagogical Impact:</strong> Instant feedback and micro-rewards keep learners cognitively stimulated and prevent dropouts.
              </p>
            </div>
          </div>

          {/* Theme Card 2: VR & STEM */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-emerald-500/50 transition group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="/src/assets/images/vr_science_lab_1791665166902.jpg"
                alt="High school student in VR headset studying 3D genetics and DNA simulation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-emerald-500/90 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                First Conditional
              </div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white">Immersive Virtual Labs</h4>
                <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-emerald-300 font-medium italic">
                  "If our school adopts VR headsets next month, pupils will explore cell biology in 3D."
                </div>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Pedagogical Impact:</strong> Experiential learning replaces abstract textbooks with safe, tangible 360-degree science experiments.
              </p>
            </div>
          </div>

          {/* Theme Card 3: Cloud Collaboration */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:border-purple-500/50 transition group flex flex-col">
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="/src/assets/images/digital_collaborative_class_1791665187424.jpg"
                alt="Collaborative classroom study group interacting around an illuminated touch screen table"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-purple-500/90 text-white text-[10px] font-black uppercase tracking-wider">
                Conditional Logic
              </div>
            </div>
            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-bold text-white">Interactive Touch Tables</h4>
                <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-purple-300 font-medium italic">
                  "When students collaborate on cloud whiteboards, classroom teamwork flourishes."
                </div>
              </div>
              <p className="text-xs text-slate-400">
                <strong>Pedagogical Impact:</strong> Synchronized cloud screens foster active peer discussion and cross-cultural communication.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Step 1: Understand the Conditionals */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition space-y-4">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            1. What You Will Learn
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            You will discover how English speakers describe digital tools, learning platforms, and future classroom transformations:
          </p>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start space-x-2">
              <span className="text-sky-400 font-bold mt-0.5">▪</span>
              <span><strong>Zero Conditional:</strong> For automated software rules, scientific facts, and constant habits. (e.g., <em>"If a student clicks submit, the system records the grade."</em>)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-emerald-400 font-bold mt-0.5">▪</span>
              <span><strong>First Conditional:</strong> For real future possibilities and upcoming tech implementations. (e.g., <em>"If our school adopts VR headsets next month, pupils will explore 3D worlds."</em>)</span>
            </li>
          </ul>
        </div>

        {/* Step 2: How the Matching Game Works */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            2. How the Matching Game Works
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Test your grammatical agility across 3 progressively challenging levels:
          </p>
          <ol className="space-y-2 text-xs sm:text-sm text-slate-300 list-decimal list-inside">
            <li>Select an <strong>If-clause card</strong> (e.g. <em>"If teachers use interactive polls..."</em>).</li>
            <li>Select its matching <strong>Result-clause card</strong> that logically and grammatically completes the thought.</li>
            <li><strong>Bonus Tag:</strong> Identify whether it is <em>Zero Conditional</em> (general fact) or <em>First Conditional</em> (future outcome) for extra XP!</li>
            <li>Chain correct pairs to activate your <strong>Streak Multiplier</strong>.</li>
          </ol>
        </div>

        {/* Step 3: Scoring & Gamification Guide */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition space-y-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Trophy className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            3. Scoring & Rewards Engine
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Every correct action rewards your digital pedagogical profile:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <div className="font-bold text-sky-400">+50 XP</div>
              <div className="text-slate-400">Correct Card Pair</div>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <div className="font-bold text-emerald-400">+25 XP</div>
              <div className="text-slate-400">Conditional Type Bonus</div>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <div className="font-bold text-orange-400">+10 to +50 XP</div>
              <div className="text-slate-400">Streak Combo Boost</div>
            </div>
            <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
              <div className="font-bold text-purple-400">+100 XP</div>
              <div className="text-slate-400">Level Completion</div>
            </div>
          </div>
          <p className="text-xs text-slate-400">
            Reach 500 XP and 1,000 XP milestones to unlock the <strong>Official EdTech Conditional Diploma</strong>!
          </p>
        </div>

        {/* Step 4: Pro Tips & Best Practices */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            4. Pro Tips & Traps to Avoid
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200">
              <strong>⚠️ Trap 1:</strong> Never say <em>"If technology will improve"</em>. Always use Present Simple after "if": <em>"If technology improves, we will learn faster."</em>
            </div>
            <div className="p-2.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-200">
              <strong>💡 Tip 2:</strong> Use the <strong>TTS button</strong> on any example card to listen to the natural spoken pronunciation with native audio pacing!
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200">
              <strong>comma rule:</strong> If the sentence starts with "If...", add a comma before the result. If the result starts the sentence, NO comma!
            </div>
          </div>
        </div>

      </div>

      {/* Quick Navigation Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950/70 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h4 className="text-base font-bold text-white">Ready to test your EdTech English skills?</h4>
          <p className="text-xs text-slate-400">
            Jump directly into the matching game or test your skills in the quiz arena.
          </p>
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            onClick={onStartPlaying}
            className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm shadow-md transition"
          >
            Start Matching
          </button>
        </div>
      </div>

    </div>
  );
};
