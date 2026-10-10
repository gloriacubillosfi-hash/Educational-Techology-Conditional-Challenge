import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';
import { Volume2, VolumeX, Sparkles, Square } from 'lucide-react';

export const SpeechIndicator: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentText, setCurrentText] = useState('');

  useEffect(() => {
    const unsubscribe = soundManager.subscribeSpeaking((speaking, text) => {
      setIsSpeaking(speaking);
      setCurrentText(text);
    });
    return unsubscribe;
  }, []);

  if (!isSpeaking) return null;

  return (
    <div className="fixed top-20 right-6 z-50 max-w-md bg-slate-900/95 border-2 border-sky-400/80 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 duration-200">
      <div className="flex items-center space-x-3">
        {/* Animated Audio Equalizer Bars */}
        <div className="flex items-end space-x-1 h-6 w-7 bg-sky-500/10 rounded-lg p-1 border border-sky-500/20 shrink-0">
          <span className="w-1 bg-sky-400 rounded-full animate-bounce [animation-delay:-0.3s] h-full"></span>
          <span className="w-1 bg-sky-300 rounded-full animate-bounce [animation-delay:-0.15s] h-3/4"></span>
          <span className="w-1 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.45s] h-5/6"></span>
          <span className="w-1 bg-sky-400 rounded-full animate-bounce h-2/3"></span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 flex items-center space-x-1">
              <span>🔊 Pronunciación Sonora Automática (TTS)</span>
            </span>
            <button
              onClick={() => soundManager.stopSpeech()}
              title="Stop Speaking"
              className="p-1 text-slate-400 hover:text-white"
            >
              <Square className="w-3 h-3 fill-slate-400" />
            </button>
          </div>
          <p className="text-xs text-white font-medium truncate mt-0.5">
            "{currentText}"
          </p>
        </div>
      </div>
    </div>
  );
};
