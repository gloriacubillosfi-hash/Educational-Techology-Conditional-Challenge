export type ConditionalType = 'zero' | 'first';

export interface ConditionalItem {
  id: string;
  type: ConditionalType;
  title: string;
  category: 'LMS & Classrooms' | 'AI & Feedback' | 'Virtual Reality & STEM' | 'Gamified Learning' | 'Accessibility & Inclusivity';
  ifClause: string;
  resultClause: string;
  fullSentence: string;
  invertedSentence: string;
  explanation: string;
  ruleFormula: string;
  edTechInsight: string;
}

export interface MatchingCard {
  id: string; // unique card id
  pairId: string; // ties if-clause and result-clause together
  part: 'if' | 'result';
  text: string;
  type: ConditionalType;
  edTechTheme: string;
}

export interface QuizQuestion {
  id: string;
  type: ConditionalType;
  questionPrompt: string;
  sentenceWithBlank: string;
  options: string[];
  correctAnswer: string;
  ruleExplanation: string;
  edTechContext: string;
  mode: 'verb-form' | 'identify-type' | 'find-mistake';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  reqScore?: number;
  reqMatches?: number;
  reqStreak?: number;
}

export interface UserStats {
  score: number;
  xp: number;
  level: number;
  streak: number;
  maxStreak: number;
  matchesCompleted: number;
  quizzesCompleted: number;
  correctAnswers: number;
  totalAttempts: number;
  achievements: string[]; // achievement ids
}
