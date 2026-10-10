import React, { useState } from 'react';
import { EDTECH_CONDITIONAL_EXAMPLES } from '../data/conditionalsData';
import { ConditionalItem, ConditionalType } from '../types';
import { soundManager } from '../utils/audio';
import { Volume2, Check, Copy, ArrowRightLeft, Sparkles, Filter, BookOpen } from 'lucide-react';

const CATEGORY_IMAGES: Record<string, string> = {
  'Gamified Learning': '/src/assets/images/ai_smart_tutor_1791665177327.jpg',
  'AI & Feedback': '/src/assets/images/ai_smart_tutor_1791665177327.jpg',
  'Virtual Reality & STEM': '/src/assets/images/vr_science_lab_1791665166902.jpg',
  'LMS & Classrooms': '/src/assets/images/digital_collaborative_class_1791665187424.jpg',
  'Accessibility & Inclusivity': '/src/assets/images/edtech_hero_banner_1791665156134.jpg',
};

export const ExamplesSection: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'all' | ConditionalType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeInverted, setActiveInverted] = useState<Record<string, boolean>>({});

  const categories = [
    'all',
    'Gamified Learning',
    'AI & Feedback',
    'LMS & Classrooms',
    'Virtual Reality & STEM',
    'Accessibility & Inclusivity'
  ];

  const filteredExamples = EDTECH_CONDITIONAL_EXAMPLES.filter(item => {
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesType && matchesCategory;
  });

  const toggleInverted = (id: string) => {
    soundManager.playClick();
    setActiveInverted(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    soundManager.playClick();
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string) => {
    soundManager.speak(text);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Real-World Pedagogical Contexts</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Educational Technology in Action
        </h2>
        <p className="mt-2 text-slate-300 text-sm max-w-3xl leading-relaxed">
          Examine how Zero and First Conditionals articulate real digital transformations in modern education—from AI adaptive quizzes and VR science simulations to accessibility tools that leave no learner behind.
        </p>

        {/* Filters */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Type filter */}
          <div className="flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => { soundManager.playClick(); setSelectedType('all'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedType === 'all' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All Tenses ({EDTECH_CONDITIONAL_EXAMPLES.length})
            </button>
            <button
              onClick={() => { soundManager.playClick(); setSelectedType('zero'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedType === 'zero' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Zero Conditional (Facts)
            </button>
            <button
              onClick={() => { soundManager.playClick(); setSelectedType('first'); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedType === 'first' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              First Conditional (Future)
            </button>
          </div>

          {/* Category filter */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { soundManager.playClick(); setSelectedCategory(cat); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All EdTech Sectors' : cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredExamples.map(item => {
          const isInverted = !!activeInverted[item.id];
          const displayedSentence = isInverted ? item.invertedSentence : item.fullSentence;
          const categoryImage = CATEGORY_IMAGES[item.category];

          return (
            <div
              key={item.id}
              className={`bg-slate-900 border rounded-2xl overflow-hidden transition shadow-md hover:shadow-xl ${
                item.type === 'zero'
                  ? 'border-sky-500/30 hover:border-sky-500/60'
                  : 'border-emerald-500/30 hover:border-emerald-500/60'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
                
                {/* Visual Thumbnail Column */}
                {categoryImage && (
                  <div className="sm:col-span-4 relative h-48 sm:h-auto overflow-hidden">
                    <img
                      src={categoryImage}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-transparent via-slate-900/40 to-slate-900"></div>
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[10px] font-bold text-slate-300">
                      {item.category}
                    </div>
                  </div>
                )}

                {/* Content Details Column */}
                <div className={`${categoryImage ? 'sm:col-span-8' : 'sm:col-span-12'} p-6 space-y-4`}>
                  
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        item.type === 'zero'
                          ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30'
                          : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.type === 'zero' ? 'Zero Conditional' : 'First Conditional'}
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleInverted(item.id)}
                        title="Flip sentence order (Inverted syntax without comma)"
                        className="flex items-center space-x-1 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded-lg border border-slate-700 transition"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5 text-purple-400" />
                        <span>{isInverted ? 'Show If-First' : 'Invert Clauses'}</span>
                      </button>

                      <button
                        onClick={() => handleSpeak(displayedSentence)}
                        title="Listen to native English pronunciation"
                        className="flex items-center space-x-1 text-xs text-sky-400 hover:text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 px-2.5 py-1 rounded-lg border border-sky-500/30 transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen</span>
                      </button>

                      <button
                        onClick={() => handleCopy(displayedSentence, item.id)}
                        title="Copy sentence to clipboard"
                        className="p-1 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
                      >
                        {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>

                  {/* Full sentence display */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80">
                    <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
                      {displayedSentence}
                    </p>
                    {isInverted && (
                      <p className="text-[11px] text-purple-300 mt-2 font-mono">
                        * Notice: When the result clause comes first, no comma is used before "if".
                      </p>
                    )}
                  </div>

                  {/* Rule Formula badge */}
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span className="text-slate-300 font-semibold">Formula:</span>
                    <span className={item.type === 'zero' ? 'text-sky-300' : 'text-emerald-300'}>
                      {item.ruleFormula}
                    </span>
                  </div>

                  {/* Two Column Insight */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-semibold text-slate-300">Grammar Rationale:</div>
                      <p className="text-slate-400 leading-relaxed">{item.explanation}</p>
                    </div>

                    <div className="bg-slate-850 p-3 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-semibold text-slate-300 flex items-center space-x-1.5">
                        <span className="text-amber-400">⚡</span>
                        <span>EdTech Impact:</span>
                      </div>
                      <p className="text-slate-400 leading-relaxed">{item.edTechInsight}</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
