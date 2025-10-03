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
    actionUrl: 'https://example.com/practice-reading',
    subType: 'Academic',
    initiation_begin: 'Start your reading practice',
    important_note: [
      'This section has 3 questions only.',
      'Each question carries 3 points, making a total of 9 points.',
      'You will have 15 minutes for each question, so a total of 45 minutes.',
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
    actionUrl: 'https://example.com/improve-writing',
    subType: 'Academic',
    initiation_begin: 'Start your writing practice',
    important_note: [
      'This section has 3 questions only.',
      'Each question carries 3 points, making a total of 9 points.',
      'You will have 15 minutes for each question, so a total of 45 minutes.',
      'Make sure to manage your time effectively.',
      'You cannot skip questions once attempted.',
    ],
  },
  {
    id: 3,
    type: 'Listening',
    img: 'img/listening.png',
    topScore: 9,
    currentScore: 0,
    actionUrl: 'https://example.com/start-listening',
    subType: 'Academic',
    initiation_begin: 'Start your listening practice',
    important_note: [
      'This section has 3 questions only.',
      'Each question carries 3 points, making a total of 9 points.',
      'You will have 15 minutes for each question, so a total of 45 minutes.',
      'Make sure to manage your time effectively.',
      'You cannot skip questions once attempted.',
    ],
  },
  {
    id: 4,
    type: 'Speaking',
    img: 'img/speaking.png',
    topScore: 9,
    currentScore: 0,
    actionUrl: 'https://example.com/practice-speaking',
    subType: 'Academic',
    initiation_begin: 'Start your speaking practice',
    important_note: [
      'This section has 3 questions only.',
      'Each question carries 3 points, making a total of 9 points.',
      'You will have 15 minutes for each question, so a total of 45 minutes.',
      'Make sure to manage your time effectively.',
      'You cannot skip questions once attempted.',
    ],
  },
];
