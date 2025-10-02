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
  },
  {
    id: 2,
    type: 'Writing',
    img: 'img/writing.png',
    topScore: 9,
    currentScore: 0,
    actionUrl: 'https://example.com/improve-writing',
    subType: 'Academic',
  },
  {
    id: 3,
    type: 'Listening',
    img: 'img/listening.png',
    topScore: 9,
    currentScore: 0,
    actionUrl: 'https://example.com/start-listening',
    subType: 'Academic',
  },
  {
    id: 4,
    type: 'Speaking',
    img: 'img/speaking.png',
    topScore: 9,
    currentScore: 0,
    actionUrl: 'https://example.com/practice-speaking',
    subType: 'Academic',
  },
];
