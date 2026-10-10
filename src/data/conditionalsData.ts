import { ConditionalItem, ConditionalType, MatchingCard, QuizQuestion, Achievement } from '../types';

export const ZERO_CONDITIONAL_INFO = {
  title: 'Zero Conditional (General Truths & Technological Rules)',
  formula: 'If / When + Present Simple, ... + Present Simple',
  invertedFormula: 'Present Simple + if / when + Present Simple (No comma)',
  purpose: 'Used to talk about facts, scientific rules, general truths, and automatic system behaviors that always happen whenever the condition is met.',
  edTechRelation: 'In Educational Technology, software behaviors, system automation, and proven learning outcomes behave as zero conditionals: whenever an action is performed, a guaranteed result happens.',
  keyRule: 'Both clauses MUST use the Present Simple tense. You can freely replace "If" with "When" without changing the meaning.',
  examplesSummary: [
    'If a student presses "Submit", the platform logs the answer instantly.',
    'When the video player reaches 100%, the learning system marks the lesson as complete.'
  ]
};

export const FIRST_CONDITIONAL_INFO = {
  title: 'First Conditional (Real Future Possibilities & Predictions)',
  formula: 'If + Present Simple, ... + will / won’t + Base Verb',
  invertedFormula: 'will / won’t + Base Verb + if + Present Simple (No comma)',
  purpose: 'Used to talk about a realistic condition in the present or future, and its probable result in the future.',
  edTechRelation: 'In Educational Technology, adopting new tools, studying with AI, and teacher planning are future possibilities with probable outcomes.',
  keyRule: 'Never put "will" inside the IF-clause! Use Present Simple after "if", and "will / won’t + infinitive" in the result clause.',
  examplesSummary: [
    'If our school buys VR headsets next month, students will explore ancient Rome in 3D.',
    'If you practice with flashcards every day, you will remember 80% more vocabulary.'
  ]
};

export const EDTECH_CONDITIONAL_EXAMPLES: ConditionalItem[] = [
  // Zero Conditional Examples
  {
    id: 'zc-1',
    type: 'zero',
    title: 'Instant Quiz Feedback System',
    category: 'Gamified Learning',
    ifClause: 'If a student answers an interactive quiz correctly',
    resultClause: 'the app awards them immediate digital badges',
    fullSentence: 'If a student answers an interactive quiz correctly, the app awards them immediate digital badges.',
    invertedSentence: 'The app awards students immediate digital badges if they answer an interactive quiz correctly.',
    explanation: 'Zero Conditional: Both verbs ("answers" and "awards") are in Present Simple because this is an automated rule coded into the gamified software.',
    ruleFormula: 'If + Present Simple (answers), Present Simple (awards)',
    edTechInsight: 'Gamification algorithms immediately reinforce positive learning behaviors with automated visual rewards.'
  },
  {
    id: 'zc-2',
    type: 'zero',
    title: 'Adaptive AI Difficulty Adjustment',
    category: 'AI & Feedback',
    ifClause: 'When a learner struggles with a math concept',
    resultClause: 'the adaptive software lowers the difficulty level automatically',
    fullSentence: 'When a learner struggles with a math concept, the adaptive software lowers the difficulty level automatically.',
    invertedSentence: 'The adaptive software lowers the difficulty level automatically when a learner struggles with a math concept.',
    explanation: 'Zero Conditional: "Struggles" and "lowers" are both Present Simple. This happens every single time the algorithm detects low accuracy.',
    ruleFormula: 'When + Present Simple (struggles), Present Simple (lowers)',
    edTechInsight: 'Personalized AI algorithms prevent cognitive overload by adjusting problem complexity on the fly.'
  },
  {
    id: 'zc-3',
    type: 'zero',
    title: 'Digital Cloud Synchronization',
    category: 'LMS & Classrooms',
    ifClause: 'If teachers edit a shared lesson document online',
    resultClause: 'students see the updates in real time',
    fullSentence: 'If teachers edit a shared lesson document online, students see the updates in real time.',
    invertedSentence: 'Students see the updates in real time if teachers edit a shared lesson document online.',
    explanation: 'Zero Conditional: "Edit" and "see" represent a constant cloud technology functionality—instant collaboration.',
    ruleFormula: 'If + Present Simple (edit), Present Simple (see)',
    edTechInsight: 'Collaborative cloud platforms eliminate version conflicts and keep entire classrooms synchronized.'
  },
  {
    id: 'zc-4',
    type: 'zero',
    title: 'Speech-to-Text Accessibility',
    category: 'Accessibility & Inclusivity',
    ifClause: 'If hearing-impaired learners activate live captions',
    resultClause: 'the speech-to-text engine converts the lecture into text on screen',
    fullSentence: 'If hearing-impaired learners activate live captions, the speech-to-text engine converts the lecture into text on screen.',
    invertedSentence: 'The speech-to-text engine converts the lecture into text on screen if hearing-impaired learners activate live captions.',
    explanation: 'Zero Conditional: Universal accessibility feature. "Activate" and "converts" reflect dependable technological assistive logic.',
    ruleFormula: 'If + Present Simple (activate), Present Simple (converts)',
    edTechInsight: 'Assistive tech guarantees equitable classroom access for diverse physical and cognitive learning needs.'
  },
  {
    id: 'zc-5',
    type: 'zero',
    title: 'Virtual Chemistry Lab Safety',
    category: 'Virtual Reality & STEM',
    ifClause: 'When students mix dangerous simulated chemicals in VR',
    resultClause: 'the simulation shows the chemical reaction without physical hazard',
    fullSentence: 'When students mix dangerous simulated chemicals in VR, the simulation shows the chemical reaction without physical hazard.',
    invertedSentence: 'The simulation shows the chemical reaction without physical hazard when students mix dangerous simulated chemicals in VR.',
    explanation: 'Zero Conditional: Demonstrates a constant scientific simulation principle ("mix" -> "shows").',
    ruleFormula: 'When + Present Simple (mix), Present Simple (shows)',
    edTechInsight: 'Virtual STEM simulations enable risk-free experimentation with dangerous or costly laboratory reagents.'
  },

  // First Conditional Examples
  {
    id: 'fc-1',
    type: 'first',
    title: 'Upcoming AI Grading Assistant Adoption',
    category: 'AI & Feedback',
    ifClause: 'If our school adopts the AI grading assistant next month',
    resultClause: 'teachers will save five hours of paperwork every week',
    fullSentence: 'If our school adopts the AI grading assistant next month, teachers will save five hours of paperwork every week.',
    invertedSentence: 'Teachers will save five hours of paperwork every week if our school adopts the AI grading assistant next month.',
    explanation: 'First Conditional: "Adopts" (Present Simple in if-clause) + "will save" (future result). This is a real future possibility for next month.',
    ruleFormula: 'If + Present Simple (adopts), will + verb (will save)',
    edTechInsight: 'Automating administrative grading frees up educators to deliver one-on-one student mentoring.'
  },
  {
    id: 'fc-2',
    type: 'first',
    title: 'Classroom Tablet Grant Project',
    category: 'LMS & Classrooms',
    ifClause: 'If the government approves the educational technology grant tomorrow',
    resultClause: 'every student will receive a personal learning tablet',
    fullSentence: 'If the government approves the educational technology grant tomorrow, every student will receive a personal learning tablet.',
    invertedSentence: 'Every student will receive a personal learning tablet if the government approves the educational technology grant tomorrow.',
    explanation: 'First Conditional: Realistic future scenario. If the condition occurs ("approves"), the consequence ("will receive") is projected.',
    ruleFormula: 'If + Present Simple (approves), will + verb (will receive)',
    edTechInsight: '1-to-1 device programs bridge socioeconomic gaps and democratize access to rich digital curricula.'
  },
  {
    id: 'fc-3',
    type: 'first',
    title: 'Gamified Exam Preparation Plan',
    category: 'Gamified Learning',
    ifClause: 'If you complete all daily micro-quizzes before Friday',
    resultClause: 'you will unlock the bonus master exam badge',
    fullSentence: 'If you complete all daily micro-quizzes before Friday, you will unlock the bonus master exam badge.',
    invertedSentence: 'You will unlock the bonus master exam badge if you complete all daily micro-quizzes before Friday.',
    explanation: 'First Conditional: Specific impending deadline ("before Friday"). Notice: "complete" (not "will complete"), paired with "will unlock".',
    ruleFormula: 'If + Present Simple (complete), will + verb (will unlock)',
    edTechInsight: 'Spaced repetition combined with gamified streaks produces superior long-term memory retention.'
  },
  {
    id: 'fc-4',
    type: 'first',
    title: 'High-Speed Wi-Fi Installation',
    category: 'LMS & Classrooms',
    ifClause: 'If the IT department upgrades classroom Wi-Fi this weekend',
    resultClause: 'video conferencing won’t lag during international exchange sessions',
    fullSentence: 'If the IT department upgrades classroom Wi-Fi this weekend, video conferencing won’t lag during international exchange sessions.',
    invertedSentence: 'Video conferencing won’t lag during international exchange sessions if the IT department upgrades classroom Wi-Fi this weekend.',
    explanation: 'First Conditional (Negative): "Upgrades" + negative modal "won’t lag" (will not lag). Future consequence of a weekend upgrade.',
    ruleFormula: 'If + Present Simple (upgrades), won’t + verb (won’t lag)',
    edTechInsight: 'Robust network infrastructure is the fundamental prerequisite for seamless global collaborative classrooms.'
  },
  {
    id: 'fc-5',
    type: 'first',
    title: 'Virtual Space Exploration Module',
    category: 'Virtual Reality & STEM',
    ifClause: 'If the science class launches the new VR cosmos module tomorrow',
    resultClause: 'students will inspect Mars rovers in hyper-realistic detail',
    fullSentence: 'If the science class launches the new VR cosmos module tomorrow, students will inspect Mars rovers in hyper-realistic detail.',
    invertedSentence: 'Students will inspect Mars rovers in hyper-realistic detail if the science class launches the new VR cosmos module tomorrow.',
    explanation: 'First Conditional: Real plan scheduled for tomorrow. "Launches" in if-clause, "will inspect" in result clause.',
    ruleFormula: 'If + Present Simple (launches), will + verb (will inspect)',
    edTechInsight: 'Immersive media turns abstract astronomical data into visceral, unforgettable learning encounters.'
  }
];

// Matching Game Data Sets (3 Levels)
export interface MatchingLevel {
  levelId: number;
  title: string;
  subtitle: string;
  targetType: 'zero' | 'first' | 'mixed';
  pairs: {
    id: string;
    ifText: string;
    resultText: string;
    type: ConditionalType;
    edTechTheme: string;
  }[];
}

export const MATCHING_LEVELS: MatchingLevel[] = [
  {
    levelId: 1,
    title: 'Level 1: System Rules & Instant Feedback',
    subtitle: 'Zero Conditional: General facts & software automation rules (If + Present Simple, Present Simple)',
    targetType: 'zero',
    pairs: [
      {
        id: 'p1',
        ifText: 'If a student submits an online quiz,',
        resultText: 'the system calculates their score instantly.',
        type: 'zero',
        edTechTheme: 'Instant Assessment'
      },
      {
        id: 'p2',
        ifText: 'When a teacher posts homework to Google Classroom,',
        resultText: 'enrolled students receive an email notification.',
        type: 'zero',
        edTechTheme: 'Cloud Notification'
      },
      {
        id: 'p3',
        ifText: 'If language learners click an unknown word,',
        resultText: 'the digital dictionary displays audio pronunciation.',
        type: 'zero',
        edTechTheme: 'Vocabulary App'
      },
      {
        id: 'p4',
        ifText: 'When educational games incorporate leaderboard points,',
        resultText: 'classroom engagement rises significantly.',
        type: 'zero',
        edTechTheme: 'Gamified Motivation'
      }
    ]
  },
  {
    levelId: 2,
    title: 'Level 2: Future School Plans & Predictions',
    subtitle: 'First Conditional: Real upcoming actions & future outcomes (If + Present Simple, will + Base Verb)',
    targetType: 'first',
    pairs: [
      {
        id: 'p5',
        ifText: 'If our school purchases 3D printers next term,',
        resultText: 'engineering students will prototype physical inventions.',
        type: 'first',
        edTechTheme: 'Makerspace STEM'
      },
      {
        id: 'p6',
        ifText: 'If you practice on the coding portal tonight,',
        resultText: 'you will pass tomorrow’s Python programming test.',
        type: 'first',
        edTechTheme: 'Interactive Coding'
      },
      {
        id: 'p7',
        ifText: 'If educators integrate AI writing assistants this year,',
        resultText: 'they will provide faster tailored feedback to essays.',
        type: 'first',
        edTechTheme: 'AI Mentorship'
      },
      {
        id: 'p8',
        ifText: 'If we test the virtual reality headsets in biology class,',
        resultText: 'pupils will travel inside human cells in 360 degrees.',
        type: 'first',
        edTechTheme: 'VR Immersion'
      }
    ]
  },
  {
    levelId: 3,
    title: 'Level 3: EdTech Master Challenge',
    subtitle: 'Mixed Conditional: Distinguish between general technological laws (Zero) and future possibilities (First)',
    targetType: 'mixed',
    pairs: [
      {
        id: 'p9',
        ifText: 'If speech recognition software listens to a learner,',
        resultText: 'it highlights pronunciation flaws in green or red.',
        type: 'zero',
        edTechTheme: 'Speech AI (Zero)'
      },
      {
        id: 'p10',
        ifText: 'If the university launches digital diplomas next month,',
        resultText: 'graduates will share verified credentials on LinkedIn.',
        type: 'first',
        edTechTheme: 'Digital Badging (First)'
      },
      {
        id: 'p11',
        ifText: 'When students collaborate on digital whiteboards,',
        resultText: 'creative brainstorming becomes more dynamic and visual.',
        type: 'zero',
        edTechTheme: 'Visual Whiteboards (Zero)'
      },
      {
        id: 'p12',
        ifText: 'If our district adopts adaptive learning algorithms soon,',
        resultText: 'struggling readers will receive custom remedial stories.',
        type: 'first',
        edTechTheme: 'Personalized Reading (First)'
      }
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'zero',
    mode: 'verb-form',
    questionPrompt: 'Complete the sentence with the correct verb form for an automatic tech rule (Zero Conditional):',
    sentenceWithBlank: 'If a student _____ (finish) a lesson, the learning platform awards 50 XP points.',
    options: ['finishes', 'will finish', 'finished', 'is finishing'],
    correctAnswer: 'finishes',
    ruleExplanation: 'Zero conditional uses Present Simple in both clauses. For "a student" (third person singular), the verb is "finishes". Never use "will" in the if-clause!',
    edTechContext: 'LMS gamification systems automatically reward XP when criteria are completed.'
  },
  {
    id: 'q2',
    type: 'first',
    mode: 'verb-form',
    questionPrompt: 'Choose the correct form for an upcoming school plan (First Conditional):',
    sentenceWithBlank: 'If the academy installs interactive smartboards next Monday, teachers _____ (demonstrate) 3D science simulations.',
    options: ['will demonstrate', 'demonstrate', 'demonstrated', 'would demonstrate'],
    correctAnswer: 'will demonstrate',
    ruleExplanation: 'First conditional uses "If + Present Simple, will + Base Verb" for realistic future plans.',
    edTechContext: 'Smartboards transform traditional blackboards into interactive digital touchscreens.'
  },
  {
    id: 'q3',
    type: 'zero',
    mode: 'identify-type',
    questionPrompt: 'Analyze this statement and identify the conditional type:',
    sentenceWithBlank: '"When users click the microphone icon, the speech tutor translates their voice in real time."',
    options: ['Zero Conditional (General Fact / Tech Rule)', 'First Conditional (Future Prediction)', 'Second Conditional (Imaginary Situation)', 'Past Conditional'],
    correctAnswer: 'Zero Conditional (General Fact / Tech Rule)',
    ruleExplanation: 'Both verbs are Present Simple ("click" and "translates"), and "When" can substitute "If". It describes a permanent software feature.',
    edTechContext: 'Voice translation AI operates as a predictable, instantaneous technological tool.'
  },
  {
    id: 'q4',
    type: 'first',
    mode: 'find-mistake',
    questionPrompt: 'Find and fix the common grammatical trap in this EdTech prediction:',
    sentenceWithBlank: 'Which sentence is grammatically CORRECT?',
    options: [
      'If the school will buy tablets, students will study everywhere.',
      'If the school buys tablets, students will study everywhere.',
      'If the school buys tablets, students study everywhere tomorrow.',
      'If the school buy tablets, students will studies everywhere.'
    ],
    correctAnswer: 'If the school buys tablets, students will study everywhere.',
    ruleExplanation: 'Common error alert! We NEVER use "will" in the IF-clause: "If the school buys..." (not "If the school will buy"). Then the result clause uses "will + base verb" ("will study").',
    edTechContext: 'Mobile tablet initiatives expand learning beyond physical classroom walls.'
  },
  {
    id: 'q5',
    type: 'first',
    mode: 'verb-form',
    questionPrompt: 'Choose the correct negative form for this First Conditional prediction:',
    sentenceWithBlank: 'If we backup our digital project on cloud storage tonight, we _____ (not / lose) our files if the power cuts out.',
    options: ['won’t lose', 'don’t lose', 'will not lost', 'not lose'],
    correctAnswer: 'won’t lose',
    ruleExplanation: 'First conditional negative result is "won’t + base verb" (will not lose).',
    edTechContext: 'Cloud backups protect collaborative classroom projects from sudden data loss.'
  },
  {
    id: 'q6',
    type: 'zero',
    mode: 'verb-form',
    questionPrompt: 'Invert the clauses correctly (Zero Conditional):',
    sentenceWithBlank: 'Which inverted sentence is punctuated correctly according to English grammar rules?',
    options: [
      'The LMS updates student records automatically if the teacher grades the quiz.',
      'The LMS updates student records automatically, if the teacher grades the quiz.',
      'If the teacher grades the quiz the LMS updates student records automatically.',
      'The LMS will updates student records automatically if the teacher grade the quiz.'
    ],
    correctAnswer: 'The LMS updates student records automatically if the teacher grades the quiz.',
    ruleExplanation: 'When the result clause comes first, do NOT use a comma before "if". (Result clause + if + condition clause).',
    edTechContext: 'Learning Management Systems (LMS) automatically aggregate student grades.'
  },
  {
    id: 'q7',
    type: 'first',
    mode: 'identify-type',
    questionPrompt: 'Identify the conditional type and its communicative purpose:',
    sentenceWithBlank: '"If you attend the virtual chemistry webinar tomorrow, you will earn an official digital attendance certificate."',
    options: [
      'First Conditional (Specific future possibility & condition)',
      'Zero Conditional (Universal scientific law)',
      'Past Perfect conditional',
      'Imperative sentence'
    ],
    correctAnswer: 'First Conditional (Specific future possibility & condition)',
    ruleExplanation: 'It speaks about a concrete future event ("tomorrow") with a probable outcome ("will earn"). Structure: If + Present Simple, will + base verb.',
    edTechContext: 'Digital certificates and micro-credentials validate student skills online.'
  },
  {
    id: 'q8',
    type: 'zero',
    mode: 'verb-form',
    questionPrompt: 'Complete the sentence with the correct verb for this scientific fact in a virtual lab:',
    sentenceWithBlank: 'When water _____ (reach) 100 degrees Celsius in the VR simulation, it boils.',
    options: ['reaches', 'will reach', 'reached', 'is reaching'],
    correctAnswer: 'reaches',
    ruleExplanation: 'Scientific facts are classic Zero Conditionals: Present Simple in both clauses ("reaches" and "boils").',
    edTechContext: 'Virtual reality accurately simulates thermodynamic laws for STEM education.'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_match',
    title: 'First Digital Connection',
    description: 'Match your first conditional pair correctly in the game.',
    icon: '⚡',
    unlocked: false,
    reqMatches: 1
  },
  {
    id: 'streak_3',
    title: 'Smart Algorithm Streak',
    description: 'Achieve a 3x consecutive correct answer streak.',
    icon: '🔥',
    unlocked: false,
    reqStreak: 3
  },
  {
    id: 'streak_5',
    title: 'EdTech Innovator',
    description: 'Maintain a 5x streak across games or quizzes.',
    icon: '🚀',
    unlocked: false,
    reqStreak: 5
  },
  {
    id: 'score_500',
    title: 'Knowledge Synthesizer',
    description: 'Accumulate 500 XP points in your learning journey.',
    icon: '🏆',
    unlocked: false,
    reqScore: 500
  },
  {
    id: 'score_1000',
    title: 'Master of Digital Pedagogy',
    description: 'Score 1,000 XP points and achieve conditional mastery!',
    icon: '👑',
    unlocked: false,
    reqScore: 1000
  },
  {
    id: 'cards_master',
    title: 'Code Matcher Elite',
    description: 'Complete 10 total conditional card matches.',
    icon: '🧩',
    unlocked: false,
    reqMatches: 10
  }
];

export const COMMON_MISTAKES = [
  {
    bad: 'If technology will improve, students will learn faster.',
    good: 'If technology improves, students will learn faster.',
    why: 'Never put "will" inside the IF clause in First Conditional! Use Present Simple after "if".'
  },
  {
    bad: 'If the app detects an error, it will notify the teacher every day.',
    good: 'If the app detects an error, it notifies the teacher every day.',
    why: 'For habitual, routine or automated software rules that happen every day, use Zero Conditional (Present Simple + Present Simple).'
  },
  {
    bad: 'Students will learn faster, if the teacher uses digital flashcards.',
    good: 'Students will learn faster if the teacher uses digital flashcards.',
    why: 'Punctuation rule: When the result clause comes first, do NOT place a comma before "if". Comma is only needed when starting with "If...".'
  },
  {
    bad: 'If a student use the AI tutor, they get instant answers.',
    good: 'If a student uses the AI tutor, they get instant answers.',
    why: 'Subject-verb agreement: Remember third-person singular "s" (he/she/it/a student uses).'
  }
];
