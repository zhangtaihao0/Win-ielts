import { useState, useCallback, useEffect } from 'react';
import type { AIResponse, GeneratedTest, UseGenerateTestProps, UseGenerateTestReturn } from '../types/Main';
import { AI_PROMPTS } from '../constants/prompts';
import { saveTest, getTest, testExists } from '../utils/db';
import { v4 as uuidv4 } from 'uuid';
import { useDifficulty } from './useDifficulty';


export const useGenerateTest = ({ examType }: UseGenerateTestProps): UseGenerateTestReturn => {
  const { difficulty } = useDifficulty('Easy');
  const [test, setTest] = useState<GeneratedTest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasCachedTest, setHasCachedTest] = useState(false);
  const timeLimit = getTimeLimit(difficulty || 'Easy');

  const checkCache = useCallback(async (): Promise<boolean> => {
    if (!difficulty) return false;
    const exists = await testExists(examType, difficulty);
    setHasCachedTest(exists);
    return exists;
  }, [examType, difficulty]);

  useEffect(() => {
    setTest(null);
    setError(null);
    setHasCachedTest(false);
    if (difficulty) {
      checkCache();
    }
  }, [examType, difficulty, checkCache]);

  // Generate Test Function //
  const generateTest = useCallback(async (): Promise<GeneratedTest | null> => {
    if (!difficulty) {
      setError('Difficulty level not set');
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const cachedTest = await getTest(examType, difficulty);
      if (cachedTest) {
        setTest(cachedTest);
        setHasCachedTest(true);
        setLoading(false);
        return cachedTest;
      }
      // Determine the correct prompt based on exam type //
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
      // Call AI API //
      const res = await fetch('/api/ai-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        let errorMessage = 'Failed to generate test';
        try {
          const data = await res.json();
          errorMessage = data.error || errorMessage;
        } catch {
          errorMessage = `Server error: ${res.status} ${res.statusText}`;
        }
        throw new Error(errorMessage);
      }
      const aiData: AIResponse = await res.json();
      // Clean up the response //
      let cleanedText = aiData.text.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      const parsed = JSON.parse(cleanedText) as GeneratedTest;
      parsed.questions = parsed.questions.map((q) => ({
        ...q,
        id: q.id || uuidv4(),
      }));
      // Create final test object with metadata //
      const finalTest: GeneratedTest = {
        ...parsed,
        examType,
        timestamp: Date.now(),
        timeLimit: getTimeLimit(difficulty),
      };
      await saveTest(examType, difficulty, finalTest);
      setTest(finalTest);
      setHasCachedTest(true);
      return finalTest;
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

  return {
    test,
    loading,
    error,
    generateTest,
    timeLimit,
    hasCachedTest,
    checkCache,
  };
};

// Helper to determine time limit based on difficulty //
function getTimeLimit(difficulty: string): number {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 45;
    case 'medium':
      return 30;
    case 'hard':
      return 15;
    default:
      return 30;
  }
}
