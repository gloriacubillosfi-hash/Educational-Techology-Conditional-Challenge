import { ConditionalType } from '../types';

export interface SentenceBuilderItem {
  id: string;
  type: ConditionalType;
  title: string;
  category: string;
  scrambledTokens: string[];
  correctSequence: string[];
  explanation: string;
}

export const SENTENCE_BUILDER_ITEMS: SentenceBuilderItem[] = [
  {
    id: 'sb1',
    type: 'zero',
    title: 'Instant Quiz Scoring Rule',
    category: 'Gamification Automation',
    scrambledTokens: ['the app', 'answers correctly,', 'If', 'awards bonus points.', 'a student'],
    correctSequence: ['If', 'a student', 'answers correctly,', 'the app', 'awards bonus points.'],
    explanation: 'Zero Conditional (Formula: If + Present Simple, Present Simple): "If a student answers correctly, the app awards bonus points."'
  },
  {
    id: 'sb2',
    type: 'first',
    title: 'Next Week VR Field Trip',
    category: 'Virtual Reality Labs',
    scrambledTokens: ['will explore', 'If our school', 'buys VR headsets,', 'ancient Egypt.', 'students'],
    correctSequence: ['If our school', 'buys VR headsets,', 'students', 'will explore', 'ancient Egypt.'],
    explanation: 'First Conditional (Formula: If + Present Simple, will + Base Verb): "If our school buys VR headsets, students will explore ancient Egypt."'
  },
  {
    id: 'sb3',
    type: 'zero',
    title: 'Adaptive Learning Algorithm',
    category: 'AI Tutor Logic',
    scrambledTokens: ['reduces difficulty', 'a pupil struggles,', 'When', 'the AI tutor', 'automatically.'],
    correctSequence: ['When', 'a pupil struggles,', 'the AI tutor', 'reduces difficulty', 'automatically.'],
    explanation: 'Zero Conditional with "When": "When a pupil struggles, the AI tutor reduces difficulty automatically."'
  },
  {
    id: 'sb4',
    type: 'first',
    title: 'Weekend Exam Preparation Goal',
    category: 'Study Tech Prediction',
    scrambledTokens: ['tonight,', 'practice with flashcards', 'you will pass', 'If you', 'tomorrow’s quiz.'],
    correctSequence: ['If you', 'practice with flashcards', 'tonight,', 'you will pass', 'tomorrow’s quiz.'],
    explanation: 'First Conditional: "If you practice with flashcards tonight, you will pass tomorrow’s quiz."'
  },
  {
    id: 'sb5',
    type: 'first',
    title: 'School Cloud Storage Backup',
    category: 'Cloud Infrastructure',
    scrambledTokens: ['won’t lose', 'If teachers save', 'files to cloud storage,', 'their lesson plans.', 'they'],
    correctSequence: ['If teachers save', 'files to cloud storage,', 'they', 'won’t lose', 'their lesson plans.'],
    explanation: 'Negative First Conditional ("won’t lose"): "If teachers save files to cloud storage, they won’t lose their lesson plans."'
  }
];
