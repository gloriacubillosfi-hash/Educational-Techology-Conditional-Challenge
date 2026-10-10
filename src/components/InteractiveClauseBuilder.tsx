import React, { useState } from 'react';
import { Volume2, RefreshCw, Sparkles, CheckCircle2, ArrowRightLeft } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ClausePreset {
  id: string;
  type: 'zero' | 'first';
  theme: string;
  conditionSubject: string;
  conditionVerb: string;
  conditionRest: string;
  resultSubject: string;
  resultVerbZero: string;
  resultVerbFirst: string;
  resultRest: string;
  explanation: string;
}

const PRESETS: ClausePreset[] = [
  {
    id: 'p1',
    type: 'zero',
    theme: 'Automated Quizzing',
    conditionSubject: 'a student',
    conditionVerb: 'completes',
    conditionRest: 'the digital coding test',
    resultSubject: 'the LMS',
    resultVerbZero: 'generates',
    resultVerbFirst: 'will generate',
    resultRest: 'an automated proficiency report',
    explanation: 'Zero Conditional expresses routine automation: whenever the student completes the test, the report is generated without human delay.'
  },
  {
    id: 'p2',
    type: 'first',
    theme: 'Next-Gen VR Labs',
    conditionSubject: 'our department',
    conditionVerb: 'deploys',
    conditionRest: 'virtual science headsets next semester',
    resultSubject: 'students',
    resultVerbZero: 'explore',
    resultVerbFirst: 'will explore',
    resultRest: 'molecular structures in full 3D simulation',
    explanation: 'First Conditional expresses a concrete future plan: deploying headsets next semester leads to the realistic future outcome of 3D exploration.'
  },
  {
    id: 'p3',
    type: 'zero',
    theme: 'Adaptive Difficulty',
    conditionSubject: 'pupils',
    conditionVerb: 'make',
    conditionRest: 'frequent grammar mistakes',
    resultSubject: 'the intelligent tutor',
    resultVerbZero: 'recommends',
    resultVerbFirst: 'will recommend',
    resultRest: 'targeted remedial exercises immediately',
    explanation: 'Zero Conditional captures algorithmic logic: every time mistakes occur, recommendations are triggered automatically.'
  },
  {
    id: 'p4',
    type: 'first',
    theme: 'Cloud Laptop Grant',
    conditionSubject: 'the district',
    conditionVerb: 'funds',
    conditionRest: 'the 1-to-1 computer program this autumn',
    resultSubject: 'disadvantaged learners',
    resultVerbZero: 'access',
    resultVerbFirst: 'will access',
    resultRest: 'equal multimedia educational content',
    explanation: 'First Conditional projects a planned institutional policy decision onto its impending social and academic benefits.'
  }
];

export const InteractiveClauseBuilder: React.FC = () => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [conditionalType, setConditionalType] = useState<'zero' | 'first'>('zero');
  const [isInverted, setIsInverted] = useState(false);

  const current = PRESETS[selectedPresetIndex];

  const handleNextPreset = () => {
    soundManager.playClick();
    const nextIdx = (selectedPresetIndex + 1) % PRESETS.length;
    setSelectedPresetIndex(nextIdx);
    setConditionalType(PRESETS[nextIdx].type);
  };

  const toggleInverted = () => {
    soundManager.playClick();
    setIsInverted(!isInverted);
  };

  // Construct sentence pieces
  const ifPart = `If ${current.conditionSubject} ${current.conditionVerb} ${current.conditionRest}`;
  const resultVerb = conditionalType === 'zero' ? current.resultVerbZero : current.resultVerbFirst;
  const resultPart = `${current.resultSubject} ${resultVerb} ${current.resultRest}`;

  const fullSentence = isInverted 
    ? `${resultPart} if ${current.conditionSubject} ${current.conditionVerb} ${current.conditionRest}.`
    : `${ifPart}, ${resultPart.charAt(0).toLowerCase() + resultPart.slice(1)}.`;

  const speakSentence = () => {
    soundManager.speak(fullSentence);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Interactive Grammar Laboratory</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            EdTech Sentence Architecture Lab
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Toggle between <strong>Zero</strong> and <strong>First Conditional</strong> or invert clause order to observe grammatical shifts live.
          </p>
        </div>

        <button
          onClick={handleNextPreset}
          className="self-start sm:self-auto flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-700 transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Switch Scenario ({selectedPresetIndex + 1}/{PRESETS.length})</span>
        </button>
      </div>

      {/* Control Switchers */}
      <div className="flex flex-wrap items-center gap-3 bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
        
        {/* Type selector */}
        <div className="flex items-center space-x-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              soundManager.playClick();
              setConditionalType('zero');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              conditionalType === 'zero'
                ? 'bg-sky-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Zero Conditional (Fact/Rule)
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setConditionalType('first');
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              conditionalType === 'first'
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            First Conditional (Future Real)
          </button>
        </div>

        {/* Clause Inversion Toggle */}
        <button
          onClick={toggleInverted}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
            isInverted
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
          }`}
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          <span>Order: {isInverted ? 'Result + If (No Comma)' : 'If + Result (With Comma)'}</span>
        </button>

        <span className="text-xs text-slate-500 ml-auto hidden md:inline">
          Theme: <span className="text-sky-300 font-medium">{current.theme}</span>
        </span>
      </div>

      {/* Live Sentence Display Board */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 to-slate-900 border border-indigo-500/30 relative shadow-inner">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Synthesized English Sentence
          </span>
          <button
            onClick={speakSentence}
            className="flex items-center space-x-1.5 text-xs font-medium text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 px-3 py-1 rounded-lg border border-sky-500/30 transition"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Listen Pronunciation</span>
          </button>
        </div>

        {/* Sentence with syntax coloring */}
        <div className="text-base sm:text-xl font-medium text-white leading-relaxed">
          {!isInverted ? (
            <>
              <span className="text-amber-400 font-bold underline decoration-amber-400/50">If</span>{' '}
              <span className="text-slate-200">{current.conditionSubject}</span>{' '}
              <span className="text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                {current.conditionVerb}
              </span>{' '}
              <span className="text-slate-200">{current.conditionRest}</span>
              <span className="text-rose-400 font-black text-2xl mx-0.5">,</span>{' '}
              <span className="text-slate-200">{current.resultSubject}</span>{' '}
              {conditionalType === 'zero' ? (
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {current.resultVerbZero}
                </span>
              ) : (
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {current.resultVerbFirst}
                </span>
              )}{' '}
              <span className="text-slate-200">{current.resultRest}</span>.
            </>
          ) : (
            <>
              <span className="text-slate-200">{current.resultSubject}</span>{' '}
              {conditionalType === 'zero' ? (
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {current.resultVerbZero}
                </span>
              ) : (
                <span className="text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {current.resultVerbFirst}
                </span>
              )}{' '}
              <span className="text-slate-200">{current.resultRest}</span>{' '}
              <span className="text-amber-400 font-bold underline decoration-amber-400/50">if</span>{' '}
              <span className="text-slate-200">{current.conditionSubject}</span>{' '}
              <span className="text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
                {current.conditionVerb}
              </span>{' '}
              <span className="text-slate-200">{current.conditionRest}</span>.
            </>
          )}
        </div>

        {/* Legend pills */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-2 text-xs">
          <div className="flex items-center space-x-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>Condition Marker ("If / When")</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
            <span>Present Simple in Condition ("{current.conditionVerb}")</span>
          </div>
          <div className="flex items-center space-x-1.5 text-slate-400">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>
              {conditionalType === 'zero' ? 'Present Simple in Result' : 'will + Base Verb in Result'} ("{resultVerb}")
            </span>
          </div>
          {!isInverted && (
            <div className="flex items-center space-x-1.5 text-rose-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
              <span>Mandatory Comma</span>
            </div>
          )}
          {isInverted && (
            <div className="flex items-center space-x-1.5 text-purple-400 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
              <span>Zero Comma (Inverted Rule)</span>
            </div>
          )}
        </div>
      </div>

      {/* Grammar Breakdown Insight */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs sm:text-sm text-slate-300 space-y-2">
        <div className="font-semibold text-white flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Linguistic & Educational Context:</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          {conditionalType === 'zero'
            ? `In Zero Conditional, both verbs stay in Present Simple. This expresses a universal law or continuous feature of ${current.theme}. Whenever the condition is met, the outcome happens 100% of the time.`
            : `In First Conditional, the If-clause remains in Present Simple ("${current.conditionVerb}"), while the result clause projects into the future using "${resultVerb}". This expresses a probable future occurrence for ${current.theme}.`
          }
        </p>
      </div>

    </div>
  );
};
