export type Difficulty = { id: number; color: string; text: string };

export type IeltsExamItem = {
  id: number;
  type: 'Reading' | 'Writing' | 'Listening' | 'Speaking';
  img: string;
  topScore: number;
  currentScore: number;
  actionUrl: string;
  subType?: string;
  initiation_begin: string;
  important_note: string[];
};

