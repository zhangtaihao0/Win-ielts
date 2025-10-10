import { useState, useCallback } from 'react';
import { AI_EVALUATION_PROMPTS } from '../constants/prompts';
import type { GeneratedTest, Answer, UseEvaluationReturn } from '../types/Main';

export const useEvaluation = (): UseEvaluationReturn => {
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Test evaluate //
  const evaluateTest = useCallback(
    async (
      test: GeneratedTest,
      answers: Answer[]
    ): Promise<number | null> => {
      setEvaluating(true);
      setError(null);
      try {
        const prompt = AI_EVALUATION_PROMPTS.EVALUATE(
          test.examType,
          test.difficulty,
          test.questions,
          answers
        );
        const res = await fetch('/api/ai-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });
        if (!res.ok) {
          throw new Error('Failed to evaluate test');
        }
        const aiData = await res.json();
        let cleanedText = aiData.text.trim();
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        const parsed = JSON.parse(cleanedText);
        return parsed.score || 0;
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error evaluating test';
        setError(errorMessage);
        console.error('Evaluation error:', err);
        return null;
      } finally {
        setEvaluating(false);
      }
    },
    []
  );

  return {
    evaluating,
    error,
    evaluateTest,
  };
};