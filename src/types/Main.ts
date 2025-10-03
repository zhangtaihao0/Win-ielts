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

export interface Question {
  id: string;
  text: string;
  type: string;
  maxWords?: number;
}

export interface GeneratedTest {
  id: string;
  examType: string;
  difficulty: string;
  questions: Question[];
  timestamp: number;
  timeLimit: number; 
}

export interface Answer {
  questionId: string;
  answer: string;
  timestamp: number;
}

export interface TestSession {
  testId: string;
  examType: string;
  difficulty: string;
  startTime: number;
  endTime?: number;
  answers: Answer[];
  status: 'in-progress' | 'completed' | 'timed-out';
}

export interface EvaluationResult {
  testId: string;
  examType: string;
  difficulty: string;
  totalScore: number;
  maxScore: number;
  questionResults: QuestionResult[];
  feedback: string;
  timestamp: number;
}

export interface QuestionResult {
  questionId: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface AIRequest {
  prompt: string;
  model?: string;
}

export interface AIResponse {
  text: string;
  model: string;
  timestamp: string;
}
