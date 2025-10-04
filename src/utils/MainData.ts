import type { Difficulty, IeltsExamItem } from '../types/Main';

export const difficulties: Difficulty[] = [
  { id: 1, color: '#6FCF97', text: 'Easy' },
  { id: 2, color: '#F2C94C', text: 'Medium' },
  { id: 3, color: '#EB5757', text: 'Hard' },
];

export const ieltsExamData: IeltsExamItem[] = [
  {
    id: 1,
    type: 'Reading',
    img: 'img/reading.png',
    topScore: 9,
    currentScore: 0,
    actionUrl: '/reading-test',
    subType: 'Academic',
    initiation_begin: 'Start your reading practice',
    important_note: [
      'This section has 5 questions.',
      'Each question carries different points based on complexity.',
      'Time limit depends on difficulty: Easy (45 min), Medium (30 min), Hard (15 min).',
      'Make sure to manage your time effectively.',
      'You cannot skip questions once attempted.',
    ],
  },
  {
    id: 2,
    type: 'Writing',
    img: 'img/writing.png',
    topScore: 9,
    currentScore: 0,
    actionUrl: '/writing-test',
    subType: 'Academic',
    initiation_begin: 'Start your writing practice',
    important_note: [
      'This section has 5 writing tasks.',
      'Tasks include describing visual data and writing essays.',
      'Time limit depends on difficulty: Easy (45 min), Medium (30 min), Hard (15 min).',
      'Pay attention to minimum and maximum word counts for each task.',
      'Quality is more important than quantity.',
    ],
  },
  {
    id: 3,
    type: 'Listening',
    img: 'img/listening.png',
    topScore: 9,
    currentScore: 0,
    actionUrl: '/listening-test',
    subType: 'Academic',
    initiation_begin: 'Start your listening practice',
    important_note: [
      'This section has 5 listening questions.',
      'Each question includes an audio transcript that will be played.',
      'Time limit depends on difficulty: Easy (45 min), Medium (30 min), Hard (15 min).',
      'Listen carefully as audio can only be played once.',
      'Answer the questions based on what you hear.',
    ],
  },
  {
    id: 4,
    type: 'Speaking',
    img: 'img/speaking.png',
    topScore: 9,
    currentScore: 0,
    actionUrl: '/speaking-test',
    subType: 'Academic',
    initiation_begin: 'Start your speaking practice',
    important_note: [
      'This section has 3 speaking prompts.',
      'Prompts range from personal topics to abstract discussions.',
      'Time limit depends on difficulty: Easy (45 min), Medium (30 min), Hard (15 min).',
      'Record your responses clearly.',
      'Speak naturally and organize your thoughts before responding.',
    ],
  },
];
