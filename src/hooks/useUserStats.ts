import { useState, useEffect, useCallback } from 'react';
import { UserStats, Achievement } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/conditionalsData';
import { soundManager } from '../utils/audio';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'edtech_conditionals_stats_v1';

const DEFAULT_STATS: UserStats = {
  score: 0,
  xp: 0,
  level: 1,
  streak: 0,
  maxStreak: 0,
  matchesCompleted: 0,
  quizzesCompleted: 0,
  correctAnswers: 0,
  totalAttempts: 0,
  achievements: []
};

export function useUserStats() {
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_STATS, ...JSON.parse(saved) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_STATS;
  });

  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    return INITIAL_ACHIEVEMENTS.map(ach => ({
      ...ach,
      unlocked: stats.achievements.includes(ach.id)
    }));
  });

  const [latestUnlockedAchievement, setLatestUnlockedAchievement] = useState<Achievement | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Check achievements whenever stats change
  useEffect(() => {
    const updated = achievements.map(ach => {
      if (ach.unlocked) return ach;
      let shouldUnlock = false;

      if (ach.reqMatches && stats.matchesCompleted >= ach.reqMatches) shouldUnlock = true;
      if (ach.reqStreak && (stats.streak >= ach.reqStreak || stats.maxStreak >= ach.reqStreak)) shouldUnlock = true;
      if (ach.reqScore && stats.score >= ach.reqScore) shouldUnlock = true;

      if (shouldUnlock) {
        soundManager.playVictory();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setLatestUnlockedAchievement({ ...ach, unlocked: true });
        return { ...ach, unlocked: true, unlockedAt: new Date().toLocaleTimeString() };
      }
      return ach;
    });

    const newUnlockedIds = updated.filter(a => a.unlocked).map(a => a.id);
    if (newUnlockedIds.length !== stats.achievements.length) {
      setAchievements(updated);
      setStats(prev => ({
        ...prev,
        achievements: newUnlockedIds
      }));
    }
  }, [stats.matchesCompleted, stats.streak, stats.maxStreak, stats.score]);

  // Calculate level based on XP
  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 250) + 1;
  };

  const addScore = useCallback((points: number, isCorrect: boolean = true) => {
    setStats(prev => {
      const newStreak = isCorrect ? prev.streak + 1 : 0;
      const newMaxStreak = Math.max(prev.maxStreak, newStreak);
      const streakBonus = isCorrect ? Math.min(newStreak * 10, 50) : 0;
      const gainedXP = isCorrect ? points + streakBonus : 0;
      const newXP = prev.xp + gainedXP;
      const newScore = prev.score + gainedXP;
      const newLevel = calculateLevel(newXP);

      if (isCorrect && newStreak > 1 && newStreak % 3 === 0) {
        soundManager.playStreak();
      }

      return {
        ...prev,
        score: newScore,
        xp: newXP,
        level: newLevel,
        streak: newStreak,
        maxStreak: newMaxStreak,
        correctAnswers: isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers,
        totalAttempts: prev.totalAttempts + 1
      };
    });
  }, []);

  const recordMatchCompleted = useCallback((bonusPoints: number = 50) => {
    setStats(prev => ({
      ...prev,
      matchesCompleted: prev.matchesCompleted + 1,
      score: prev.score + bonusPoints,
      xp: prev.xp + bonusPoints,
      level: calculateLevel(prev.xp + bonusPoints)
    }));
  }, []);

  const recordQuizCompleted = useCallback((bonusPoints: number = 100) => {
    setStats(prev => ({
      ...prev,
      quizzesCompleted: prev.quizzesCompleted + 1,
      score: prev.score + bonusPoints,
      xp: prev.xp + bonusPoints,
      level: calculateLevel(prev.xp + bonusPoints)
    }));
  }, []);

  const resetStats = useCallback(() => {
    setStats(DEFAULT_STATS);
    setAchievements(INITIAL_ACHIEVEMENTS);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const dismissAchievementToast = useCallback(() => {
    setLatestUnlockedAchievement(null);
  }, []);

  return {
    stats,
    achievements,
    latestUnlockedAchievement,
    addScore,
    recordMatchCompleted,
    recordQuizCompleted,
    resetStats,
    dismissAchievementToast
  };
}
