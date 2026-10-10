export interface BugHunterItem {
  id: string;
  systemName: string;
  buggedSentence: string;
  buggyToken: string;
  patchOptions: string[];
  correctPatch: string;
  ruleExplanation: string;
  correctSentence: string;
}

export const BUG_HUNTER_ITEMS: BugHunterItem[] = [
  {
    id: 'bug1',
    systemName: 'AutoGrade AI Bot v2.4',
    buggedSentence: 'If the teacher will upload the exam, the algorithm grades it instantly.',
    buggyToken: 'will upload',
    patchOptions: ['uploads', 'uploaded', 'is uploading'],
    correctPatch: 'uploads',
    ruleExplanation: 'Critical Rule Trap! We NEVER use "will" in the IF-clause: use Present Simple ("uploads").',
    correctSentence: 'If the teacher uploads the exam, the algorithm grades it instantly.'
  },
  {
    id: 'bug2',
    systemName: 'Virtual Campus Gateway',
    buggedSentence: 'If our school installs fiber Wi-Fi next month, students study everywhere.',
    buggyToken: 'study',
    patchOptions: ['will study', 'studies', 'are studied'],
    correctPatch: 'will study',
    ruleExplanation: 'First Conditional for next month requires "will + base verb" ("will study") in the result clause.',
    correctSentence: 'If our school installs fiber Wi-Fi next month, students will study everywhere.'
  },
  {
    id: 'bug3',
    systemName: 'Gamified Duels Engine',
    buggedSentence: 'If a student answer the question correctly, the system awards 100 XP.',
    buggyToken: 'answer',
    patchOptions: ['answers', 'will answer', 'answering'],
    correctPatch: 'answers',
    ruleExplanation: 'Subject-Verb Agreement: Third-person singular "a student" requires "answers" with an "s" in Present Simple.',
    correctSentence: 'If a student answers the question correctly, the system awards 100 XP.'
  },
  {
    id: 'bug4',
    systemName: 'Cloud Sync Engine 3.0',
    buggedSentence: 'Students will access the digital whiteboard, if the educator starts the meeting.',
    buggyToken: ',',
    patchOptions: ['(Remove comma)', ';', ':'],
    correctPatch: '(Remove comma)',
    ruleExplanation: 'Punctuation Rule: When the result clause comes first ("Students will access..."), do NOT use a comma before "if".',
    correctSentence: 'Students will access the digital whiteboard if the educator starts the meeting.'
  },
  {
    id: 'bug5',
    systemName: 'VR Simulator 4D',
    buggedSentence: 'If the VR system overheat, safety protocols shutdown the lab headset.',
    buggyToken: 'overheat',
    patchOptions: ['overheats', 'will overheat', 'is overheat'],
    correctPatch: 'overheats',
    ruleExplanation: 'Zero Conditional hardware rule: "the VR system" (singular) + "overheats".',
    correctSentence: 'If the VR system overheats, safety protocols shutdown the lab headset.'
  }
];
