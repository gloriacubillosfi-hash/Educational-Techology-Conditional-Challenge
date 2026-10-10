import { ConditionalType } from '../types';

export interface SpeedRushItem {
  id: string;
  sentence: string;
  correctType: ConditionalType;
  techContext: string;
  explanation: string;
}

export const SPEED_RUSH_ITEMS: SpeedRushItem[] = [
  {
    id: 'sr1',
    sentence: 'If a student submits homework past the deadline, the LMS stamps it as late.',
    correctType: 'zero',
    techContext: 'LMS Submission Rule',
    explanation: 'Zero Conditional: Automatic software behavior that triggers every time.'
  },
  {
    id: 'sr2',
    sentence: 'If our school purchases interactive holograms next term, pupils will study anatomy in 3D.',
    correctType: 'first',
    techContext: 'Future Tech Grant',
    explanation: 'First Conditional: Real future possibility with "will study".'
  },
  {
    id: 'sr3',
    sentence: 'When language learners tap the speaker icon, the digital app pronounces the word.',
    correctType: 'zero',
    techContext: 'Audio Dictionary Feature',
    explanation: 'Zero Conditional: Instant app automation using "When + Present, Present".'
  },
  {
    id: 'sr4',
    sentence: 'If the teacher activates the AI grading assistant tonight, she will save four hours of work.',
    correctType: 'first',
    techContext: 'Teacher Productivity AI',
    explanation: 'First Conditional: Real plan for tonight resulting in future time saved.'
  },
  {
    id: 'sr5',
    sentence: 'If you complete five coding challenges today, the platform will award you a gold certificate.',
    correctType: 'first',
    techContext: 'Gamified Certification',
    explanation: 'First Conditional: Future condition and predicted consequence.'
  },
  {
    id: 'sr6',
    sentence: 'If the tablet battery reaches zero percent, the educational screen turns off automatically.',
    correctType: 'zero',
    techContext: 'Hardware Physics Rule',
    explanation: 'Zero Conditional: Physical/technological certainty without exceptions.'
  },
  {
    id: 'sr7',
    sentence: 'When students write collaboratively in Google Docs, everyone sees real-time edits.',
    correctType: 'zero',
    techContext: 'Cloud Synchronization',
    explanation: 'Zero Conditional: Universal cloud functionality.'
  },
  {
    id: 'sr8',
    sentence: 'If our district upgrades classroom fiber internet tomorrow, video calls won’t freeze.',
    correctType: 'first',
    techContext: 'Campus Wi-Fi Upgrade',
    explanation: 'First Conditional: Specific tomorrow upgrade preventing future lag.'
  },
  {
    id: 'sr9',
    sentence: 'If a blind pupil turns on the screen reader, it vocalizes on-screen text instantly.',
    correctType: 'zero',
    techContext: 'Assistive Tech Rule',
    explanation: 'Zero Conditional: Assistive tech rule executing in Present Simple.'
  },
  {
    id: 'sr10',
    sentence: 'If the computer lab installs 3D modeling tools this Friday, engineering classes will design prototypes.',
    correctType: 'first',
    techContext: 'STEM Workshop Plan',
    explanation: 'First Conditional: Concrete future event ("this Friday") with "will design".'
  },
  {
    id: 'sr11',
    sentence: 'If you adjust the font size in the digital textbook, the screen reformats the paragraph.',
    correctType: 'zero',
    techContext: 'E-Reader Accessibility',
    explanation: 'Zero Conditional: Immediate UI rendering logic without exceptions.'
  },
  {
    id: 'sr12',
    sentence: 'If our class wins the coding tournament next month, our school will receive a grant for robotics kits.',
    correctType: 'first',
    techContext: 'EdTech Robotics Competition',
    explanation: 'First Conditional: Future conditional prediction regarding next month’s grant.'
  },
  {
    id: 'sr13',
    sentence: 'When the microphone detects noisy ambient chatter, the AI headset cancels background sound.',
    correctType: 'zero',
    techContext: 'Noise Cancelling Classroom Tech',
    explanation: 'Zero Conditional: Instant automated hardware filter.'
  },
  {
    id: 'sr14',
    sentence: 'If you don’t back up your digital project to the cloud tonight, you might lose your draft.',
    correctType: 'first',
    techContext: 'Cloud Backup Warning',
    explanation: 'First Conditional: Realistic warning for tonight.'
  },
  {
    id: 'sr15',
    sentence: 'If learners answer three quiz questions in a row, the gamified engine triggers a 2x bonus combo.',
    correctType: 'zero',
    techContext: 'Gamification Rule Logic',
    explanation: 'Zero Conditional: Algorithmic reward triggered on every 3-streak.'
  }
];
