import React, { useState } from 'react';
import { UserStats } from '../types';
import { Award, X, Printer, Sparkles, CheckCircle2, Trophy } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  stats
}) => {
  const [studentName, setStudentName] = useState('Dedicated Learner');
  const [isEditingName, setIsEditingName] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Action Bar */}
        <div className="flex items-center justify-between no-print">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-white text-sm">Official Achievement Certificate</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-700 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="printable-certificate bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border-4 border-amber-500/40 rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden shadow-2xl space-y-6">
          
          {/* Subtle ornate corners */}
          <div className="absolute top-2 left-2 text-amber-500/30 text-2xl font-serif">❖</div>
          <div className="absolute top-2 right-2 text-amber-500/30 text-2xl font-serif">❖</div>
          <div className="absolute bottom-2 left-2 text-amber-500/30 text-2xl font-serif">❖</div>
          <div className="absolute bottom-2 right-2 text-amber-500/30 text-2xl font-serif">❖</div>

          {/* Golden Seal */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950">
            <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xs uppercase tracking-widest text-amber-400 font-bold">
              CERTIFICATE OF PROFICIENCY & MASTERY
            </h4>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              EduTech Conditionals Specialist
            </h2>
            <p className="text-xs text-slate-400 italic">
              "Educational Technology Enhancing Teaching & Learning"
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              This digital certification is proudly awarded to:
            </p>

            {isEditingName ? (
              <div className="inline-flex items-center space-x-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="bg-slate-950 border border-sky-400 px-4 py-1 rounded-xl text-lg sm:text-2xl font-bold text-center text-sky-300 focus:outline-none"
                  autoFocus
                />
                <button
                  onClick={() => setIsEditingName(false)}
                  className="px-3 py-1 rounded-lg bg-sky-500 text-slate-950 text-xs font-bold"
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                onClick={() => setIsEditingName(true)}
                title="Click to change your name on certificate"
                className="cursor-pointer group inline-block"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-sky-300 border-b-2 border-dashed border-slate-600 group-hover:border-sky-400 pb-1">
                  {studentName}
                </div>
                <span className="text-[10px] text-slate-500 block mt-1 no-print">
                  (Click to customize recipient name)
                </span>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            For successfully demonstrating competency in distinguishing, formulating, and applying <strong>Zero Conditional</strong> (timeless facts & automation rules) and <strong>First Conditional</strong> (future possibilities & educational predictions) structures in English.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto pt-2 border-t border-slate-800 text-xs">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <div className="text-slate-500 text-[10px] uppercase font-bold">XP Score</div>
              <div className="font-bold text-amber-400 font-mono">{stats.score.toLocaleString()} XP</div>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <div className="text-slate-500 text-[10px] uppercase font-bold">Rank Level</div>
              <div className="font-bold text-sky-400 font-mono">Level {stats.level}</div>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <div className="text-slate-500 text-[10px] uppercase font-bold">Max Streak</div>
              <div className="font-bold text-orange-400 font-mono">{stats.maxStreak}x</div>
            </div>
          </div>

          {/* Signatures & Date */}
          <div className="pt-4 flex items-center justify-between text-left text-xs text-slate-400 border-t border-slate-800">
            <div>
              <div className="font-mono text-slate-300 font-semibold">{currentDate}</div>
              <div className="text-[10px] text-slate-500">Date of Certification</div>
            </div>

            <div className="text-right">
              <div className="font-serif italic text-amber-400 font-bold text-sm">EduTech English Academy</div>
              <div className="text-[10px] text-slate-500">Digital Pedagogy Program</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
