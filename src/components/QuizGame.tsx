import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/conditionalsData';
import { QuizQuestion } from '../types';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Trophy, Volume2, Sparkles, HelpCircle, AlertCircle } from 'lucide-react';

interface QuizGameProps {
  onScoreUpdate: (points: number, isCorrect: boolean) => void;
  onQuizCompleted: (bonus: number) => void;
  currentStreak: number;
}

export const QuizGame: React.FC<QuizGameProps> = ({
  onScoreUpdate,
  onQuizCompleted,
  currentStreak
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [scoreEarned, setScoreEarned] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUIZ_QUESTIONS[currentIndex];

  const handleSelectOption = (opt: string) => {
    if (isAnswered || isFinished) return;
    soundManager.playClick();
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === question.correctAnswer;
    if (isCorrect) {
      soundManager.playMatchSuccess();
      const points = 35;
      setScoreEarned(prev => prev + points);
      setCorrectCount(prev => prev + 1);
      onScoreUpdate(points, true);

      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.7 }
      });
    } else {
      soundManager.playError();
      onScoreUpdate(0, false);
    }

    // Pronounce the sentence if possible
    soundManager.speak(question.sentenceWithBlank.replace('_____', opt));
  };

  const handleNextQuestion = () => {
    soundManager.playClick();
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundManager.playVictory();
      onQuizCompleted(120);

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }
  };

  const handleRestartQuiz = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScoreEarned(0);
    setCorrectCount(0);
    setIsFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header and Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EdTech Knowledge Arena</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Conditional Mastery Quiz
            </h2>
          </div>

          <div className="flex items-center space-x-3 text-xs sm:text-sm">
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400">
              Question <strong className="text-white">{currentIndex + 1}</strong> of {QUIZ_QUESTIONS.length}
            </div>
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400">
              Accuracy: <strong className="text-emerald-400">{correctCount}</strong> correct
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
          <div
            className="bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {!isFinished ? (
        /* Question Card */
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          
          {/* Context & Tag */}
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              {question.mode === 'verb-form' ? '🔤 Verb Form Choice' : question.mode === 'identify-type' ? '🔍 Conditional Type' : '🛠️ Find & Fix Error'}
            </span>
            <span className="text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
              {question.edTechContext}
            </span>
          </div>

          {/* Prompt */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white mb-2">
              {question.questionPrompt}
            </h3>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 text-lg sm:text-xl font-medium text-slate-100 leading-relaxed font-sans">
              {question.sentenceWithBlank}
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === opt;
              const isCorrectOpt = opt === question.correctAnswer;

              let btnStyle = 'bg-slate-950 border-slate-800 hover:border-sky-500/60 text-slate-200 hover:bg-slate-850';

              if (isAnswered) {
                if (isCorrectOpt) {
                  btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 ring-2 ring-emerald-500/40 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/40 font-bold';
                } else {
                  btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border text-left text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                  )}
                  {isAnswered && isSelected && !isCorrectOpt && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Pedagogical Explanation Reveal */}
          {isAnswered && (
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {selectedOption === question.correctAnswer ? (
                    <span className="text-emerald-400 font-bold text-sm flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Excellent! Correct Answer</span>
                    </span>
                  ) : (
                    <span className="text-rose-400 font-bold text-sm flex items-center space-x-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Learning Opportunity: Keep Practicing</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => soundManager.speak(question.ruleExplanation)}
                  className="flex items-center space-x-1 text-xs text-sky-400 hover:text-sky-300 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Explanation</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {question.ruleExplanation}
              </p>

              {/* Next Question Button */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center space-x-2 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{currentIndex < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Finished Victory Summary */
        <div className="bg-slate-900 border-2 border-sky-500/40 rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-2xl">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
            <Trophy className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
              Quiz Completed!
            </span>
            <h3 className="text-3xl font-extrabold text-white">
              Quiz Score: {correctCount} / {QUIZ_QUESTIONS.length} Correct
            </h3>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              You earned <strong className="text-emerald-400">+{scoreEarned + 120} XP</strong> for completing this grammar challenge!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRestartQuiz}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
