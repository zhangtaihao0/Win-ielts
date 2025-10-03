import { useState, useCallback } from 'react';
import type { AIResponse, GeneratedTest } from '../types/Main';
import { AI_PROMPTS } from '../constants/prompts';
import { saveTest, getTest } from '../utils/db';
import { v4 as uuidv4 } from 'uuid';
import { useDifficulty } from './useDifficulty';

interface UseGenerateTestProps {
  examType: 'Reading' | 'Writing' | 'Listening' | 'Speaking';
}

interface UseGenerateTestReturn {
  test: GeneratedTest | null;
  loading: boolean;
  error: string | null;
  generateTest: () => Promise<GeneratedTest | null>;
}

export const useGenerateTest = ({ examType }: UseGenerateTestProps): UseGenerateTestReturn => {
  const { difficulty } = useDifficulty('Easy');
  const [test, setTest] = useState<GeneratedTest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateTest = useCallback(async (): Promise<GeneratedTest | null> => {
    if (!difficulty) {
      setError('Difficulty level not set');
      return null;
    }

    setLoading(true);
    setError(null);
    const testId = `${examType}-${difficulty}`;

    try {
      // Check cache first
      const cachedTest = await getTest(testId);
      if (cachedTest) {
        const typedTest = cachedTest as GeneratedTest;
        setTest(typedTest);
        setLoading(false);
        return typedTest; 
      }
      let prompt: string;
      switch (examType) {
        case 'Reading':
          prompt = AI_PROMPTS.READING(difficulty);
          break;
        case 'Writing':
          prompt = AI_PROMPTS.WRITING(difficulty);
          break;
        case 'Listening':
          prompt = AI_PROMPTS.LISTENING(difficulty);
          break;
        case 'Speaking':
          prompt = AI_PROMPTS.SPEAKING(difficulty);
          break;
        default:
          throw new Error('Invalid exam type');
      }
      // Call API //
      const res = await fetch('/api/ai-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to generate test');
      }
      const aiData: AIResponse = await res.json();
      const parsed = JSON.parse(aiData.text) as GeneratedTest;
      parsed.questions = parsed.questions.map((q) => ({
        ...q,
        id: q.id || uuidv4(),
      }));
      parsed.id = testId;
      parsed.timestamp = Date.now();
      await saveTest(testId, parsed);
      setTest(parsed);
      return parsed; 
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error generating test');
      }
      console.error('Test generation error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [examType, difficulty]);

  return { test, loading, error, generateTest };
};
