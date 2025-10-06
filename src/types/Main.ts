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

export interface BaseQuestion {
  id: string;
  type: string;
}

export interface ReadingQuestion extends BaseQuestion {
  passage: string;
  question: string;
  type: 'multiple-choice' | 'true-false-notgiven' | 'short-answer';
  options?: string[];
  statement?: string;
}

export interface WritingQuestion extends BaseQuestion {
  taskType: string;
  prompt: string;
  type: 'Writing';
  minWords: number;
  maxWords: number;
}

export interface ListeningQuestion extends BaseQuestion {
  transcript: string;
  question: string;
  type: 'multiple-choice' | 'fill-in-blank' | 'true-false';
  options?: string[];
}

export interface SpeakingQuestion extends BaseQuestion {
  text: string;
  type: 'Speaking';
}

export type Question = ReadingQuestion | WritingQuestion | ListeningQuestion | SpeakingQuestion;

export interface GeneratedTest {
  id: string;
  isValid: boolean;
  examType: 'Reading' | 'Writing' | 'Listening' | 'Speaking';
  difficulty: string;
  questions: Question[];
  timestamp?: number;
  timeLimit?: number;
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
  timeLimit: number;
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

export interface QuestionRendererProps {
  question: Question;
  answer: string;
  onAnswerChange: (answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  showPrevious: boolean;
  isLastQuestion: boolean;
  isListeningType: boolean;
}

export interface ParsedOption {
  label: string;
  text: string;
}

export interface WordLimits {
  min: number;
  max: number;
}

export interface UseAssessmentProps {
  test: GeneratedTest;
  onSubmit?: (sessionId: string, status: 'completed' | 'timed-out') => void;
}

export interface UseGenerateTestProps {
  examType: 'Reading' | 'Writing' | 'Listening' | 'Speaking';
}

export interface UseGenerateTestReturn {
  test: GeneratedTest | null;
  loading: boolean;
  error: string | null;
  generateTest: () => Promise<GeneratedTest | null>;
  timeLimit: number;
  hasCachedTest: boolean;
  checkCache: () => Promise<boolean>;
}

export interface UseTestTimerProps {
  timeLimit: number;
  onTimeUp: () => void;
  autoStart?: boolean;
}

export interface UseTestTimerReturn {
  timeRemaining: number;
  isRunning: boolean;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  formatTime: (seconds: number) => string;
}
