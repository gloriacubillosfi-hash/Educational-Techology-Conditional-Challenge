import React, { useState } from 'react';
import { ZERO_CONDITIONAL_INFO, FIRST_CONDITIONAL_INFO, COMMON_MISTAKES } from '../data/conditionalsData';
import { InteractiveClauseBuilder } from './InteractiveClauseBuilder';
import { BookOpen, AlertTriangle, CheckCircle, HelpCircle, ArrowRight, ShieldAlert, Sparkles, Cpu, Lightbulb, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ExplanationSectionProps {
  onGoToGame: () => void;
}

export const ExplanationSection: React.FC<ExplanationSectionProps> = ({ onGoToGame }) => {
  const [activeTab, setActiveTab] = useState<'comparison' | 'zero' | 'first' | 'mistakes'>('comparison');

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-12">
      
      {/* Intro Hero Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Comprehensive English Grammar Guide</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Mastering Conditionals in Educational Technology
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every digital tool in modern schools runs on conditional logic: <em>If a user taps, then an action executes</em>. Learn how the English language distinguishes between <strong>timeless educational facts (Zero)</strong> and <strong>future tech possibilities (First)</strong>.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onGoToGame();
            }}
            className="flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold px-5 py-3 rounded-xl shadow-lg shadow-sky-500/25 transition transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap self-start md:self-auto"
          >
            <span>Practice in Game</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-nav tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-800">
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('comparison'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'comparison'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            ⚖️ Zero vs First Comparison
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('zero'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'zero'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            ⚙️ Zero Conditional Deep-Dive
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('first'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'first'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            🔮 First Conditional Deep-Dive
          </button>
          <button
            onClick={() => { soundManager.playClick(); setActiveTab('mistakes'); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'mistakes'
                ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:text-white'
            }`}
          >
            ⚠️ Common Pitfalls & Traps
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      {activeTab === 'comparison' && (
        <div className="space-y-8">
          {/* Side by side comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Zero Conditional Card (Type 0) */}
            <div className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                    Type 0 • Constant Reality
                  </span>
                  <span className="text-xs font-mono text-slate-400">100% Certainty</span>
                </div>

                {/* Type 0 Image */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-sky-500/30 group">
                  <img
                    src="/src/assets/images/ai_smart_tutor_1791665177327.jpg"
                    alt="Type 0 Zero Conditional: AI smart tutor automation and instant reward feedback"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-[11px] font-bold text-sky-300 bg-slate-950/85 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-800">
                    ⚙️ TYPE 0: Automated AI logic & immediate score badges
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white">Zero Conditional</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Describes general truths, scientific laws, digital automation, and repeatable software behaviors that always occur.
                </p>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-sky-300">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-sans font-semibold">Standard Formula</div>
                  If / When + <span className="text-sky-400 font-bold">Present Simple</span>, ... + <span className="text-sky-400 font-bold">Present Simple</span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-slate-200">EdTech Example:</div>
                    <button
                      onClick={() => soundManager.speak("If a student clicks submit, the digital portal records the timestamp instantly.")}
                      className="flex items-center space-x-1 text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 px-2.5 py-1 rounded-lg border border-sky-500/30 transition text-[11px]"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Audio en inglés</span>
                    </button>
                  </div>
                  <div className="p-2.5 bg-slate-800/60 rounded-lg border border-slate-700/60 italic text-slate-200">
                    "If a student clicks submit, the digital portal records the timestamp instantly."
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center space-x-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Tip: "When" can freely replace "If" without altering the meaning.</span>
              </div>
            </div>

            {/* First Conditional Card (Type 1) */}
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    Type 1 • Future Possibility
                  </span>
                  <span className="text-xs font-mono text-slate-400">High Probability</span>
                </div>

                {/* Type 1 Image */}
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden border border-emerald-500/30 group">
                  <img
                    src="/src/assets/images/vr_science_lab_1791665166902.jpg"
                    alt="Type 1 First Conditional: VR science lab adoption and predictions"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 right-2 text-[11px] font-bold text-emerald-300 bg-slate-950/85 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-800">
                    🔮 TYPE 1: Planned VR deployment & predicted 3D learning
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white">First Conditional</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Describes a specific, realistic condition in the present or future, and its probable consequence in the future.
                </p>

                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300">
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-sans font-semibold">Standard Formula</div>
                  If + <span className="text-sky-400 font-bold">Present Simple</span>, ... + <span className="text-emerald-400 font-bold">will / won't + Base Verb</span>
                </div>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold text-slate-200">EdTech Example:</div>
                    <button
                      onClick={() => soundManager.speak("If our school purchases VR goggles next month, we will inspect ancient Egypt in 3D.")}
                      className="flex items-center space-x-1 text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30 transition text-[11px]"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Audio en inglés</span>
                    </button>
                  </div>
                  <div className="p-2.5 bg-slate-800/60 rounded-lg border border-slate-700/60 italic text-slate-200">
                    "If our school purchases VR goggles next month, we will inspect ancient Egypt in 3D."
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] text-rose-300 flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Warning: Never put "will" inside the IF clause!</span>
              </div>
            </div>

          </div>

          {/* Quick Matrix Comparison Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="px-6 py-4 bg-slate-850 border-b border-slate-800">
              <h4 className="font-bold text-white text-base">Key Differences at a Glance</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-950/60 text-slate-400 border-b border-slate-800">
                    <th className="p-4 font-semibold">Feature</th>
                    <th className="p-4 font-semibold text-sky-400">Zero Conditional</th>
                    <th className="p-4 font-semibold text-emerald-400">First Conditional</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  <tr>
                    <td className="p-4 font-semibold text-white">Time Reference</td>
                    <td className="p-4">All time / Any time (Timeless)</td>
                    <td className="p-4">Specific future or upcoming occasion</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Degree of Certainty</td>
                    <td className="p-4">100% Guaranteed outcome / Law</td>
                    <td className="p-4">Likely / Probable consequence</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">If-Clause Verb</td>
                    <td className="p-4 font-mono text-sky-300">Present Simple</td>
                    <td className="p-4 font-mono text-sky-300">Present Simple</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">Result-Clause Verb</td>
                    <td className="p-4 font-mono text-sky-300">Present Simple</td>
                    <td className="p-4 font-mono text-emerald-300">will / won't + Base Verb</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">"When" Substitution</td>
                    <td className="p-4 text-emerald-400">Yes! (When = If in facts)</td>
                    <td className="p-4 text-amber-400">Only if you are 100% sure it will occur</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-white">EdTech Application</td>
                    <td className="p-4">Software buttons, algorithms, digital rules</td>
                    <td className="p-4">School plans, upcoming grants, exam preparation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Interactive Clause Builder Component */}
          <InteractiveClauseBuilder />
        </div>
      )}

      {/* Zero Conditional Deep Dive */}
      {activeTab === 'zero' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            {/* Zero Conditional Featured Image Banner */}
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-sky-500/30 shadow-lg">
              <img
                src="/src/assets/images/ai_smart_tutor_1791665177327.jpg"
                alt="Zero Conditional AI smart tutor illustration"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-semibold text-white bg-slate-950/80 backdrop-blur-sm p-3 rounded-xl border border-slate-800">
                <span className="text-sky-400 font-bold">TYPE 0 Live Rule: </span>
                "If a learner submits their math challenge, the adaptive engine logs their score instantly."
              </div>
            </div>

            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <span className="text-sky-400">Zero Conditional (Type 0):</span>
              <span>General Truths & Tech Automations</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We use the zero conditional when the time being referred to is <strong>now or always</strong> and the situation is <strong>real and possible</strong>. In computing and EdTech, code executions behave exactly like this:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">Formula A (Standard)</div>
                <div className="font-mono text-sm text-white">
                  <strong>If / When</strong> + Present Simple, + Present Simple.
                </div>
                <p className="text-xs text-slate-400">
                  Example: <em>"If a student forgets their LMS password, the automated system sends a reset link."</em>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Formula B (Inverted - No Comma)</div>
                <div className="font-mono text-sm text-white">
                  Present Simple + <strong>if / when</strong> + Present Simple.
                </div>
                <p className="text-xs text-slate-400">
                  Example: <em>"The automated system sends a reset link if a student forgets their LMS password."</em>
                </p>
              </div>
            </div>

            <h4 className="font-bold text-white text-base pt-2">Why EdTech Loves Zero Conditional:</h4>
            <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
              <li><strong>Algorithmic logic:</strong> Computers evaluate conditions deterministically.</li>
              <li><strong>Habitual classroom routines:</strong> <em>"If pupils finish early, they open their reading app."</em></li>
              <li><strong>Accessibility defaults:</strong> <em>"When screen readers encounter image tags, they read the alt text aloud."</em></li>
            </ul>
          </div>
        </div>
      )}

      {/* First Conditional Deep Dive */}
      {activeTab === 'first' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5">
            {/* First Conditional Featured Image Banner */}
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-emerald-500/30 shadow-lg">
              <img
                src="/src/assets/images/vr_science_lab_1791665166902.jpg"
                alt="First Conditional Virtual Reality STEM lab illustration"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-semibold text-white bg-slate-950/80 backdrop-blur-sm p-3 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold">TYPE 1 Live Prediction: </span>
                "If our science academy launches VR cosmos simulations tomorrow, students will explore Mars in 360 degrees."
              </div>
            </div>

            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <span className="text-emerald-400">First Conditional (Type 1):</span>
              <span>Real Future Possibilities & School Predictions</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We use the first conditional when referring to a <strong>realistic future condition</strong> and its <strong>probable outcome</strong>. In educational planning, teachers and students use this tense to set study goals and anticipate technological breakthroughs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Affirmative Future Result</div>
                <div className="font-mono text-sm text-white">
                  If + Present Simple, + <strong>will + Base Verb</strong>.
                </div>
                <p className="text-xs text-slate-400">
                  Example: <em>"If you practice with vocabulary flashcards tonight, you will pass tomorrow’s exam."</em>
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">Negative Future Result</div>
                <div className="font-mono text-sm text-white">
                  If + Present Simple, + <strong>won’t (will not) + Base Verb</strong>.
                </div>
                <p className="text-xs text-slate-400">
                  Example: <em>"If our school upgrades the internet bandwidth, teachers won’t suffer video buffering."</em>
                </p>
              </div>
            </div>

            <h4 className="font-bold text-white text-base pt-2">Crucial First Conditional Rules:</h4>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm space-y-1.5">
              <div className="font-bold flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>The "Will" Prohibition:</span>
              </div>
              <p>
                English grammar strictly prohibits putting "will" inside the condition clause introduced by "if". Always say: <strong>"If we deploy AI..."</strong> (NOT <em>"If we will deploy AI..."</em>).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Common Mistakes Tab */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <ShieldAlert className="w-6 h-6 text-rose-400" />
              <span>4 Frequent Grammar Traps in EdTech Contexts</span>
            </h3>
            <p className="text-sm text-slate-300">
              Check your awareness against these frequent student mistakes:
            </p>

            <div className="grid grid-cols-1 gap-4 mt-4">
              {COMMON_MISTAKES.map((item, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-2 text-rose-400 font-mono text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center font-bold text-xs">✕</span>
                      <span className="line-through">{item.bad}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs sm:text-sm">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center font-bold text-xs">✓</span>
                      <span>{item.good}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-300 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <strong className="text-amber-400">Why? </strong>
                    <span>{item.why}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
