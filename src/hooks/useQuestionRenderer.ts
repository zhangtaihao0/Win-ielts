import { useMemo } from 'react';
import type { Question, ParsedOption, WordLimits } from '../types/Main';

export const useQuestionRenderer = (question: Question, answer: string) => {
  const questionText = useMemo(() => {
    if ('question' in question) return question.question;
    if ('prompt' in question) return question.prompt;
    if ('text' in question) return question.text;
    return '';
  }, [question]);

  // Extract passage or transcript if available //
  const passage = useMemo(() => {
    if ('passage' in question) return question.passage;
    if ('transcript' in question) return question.transcript;
    return undefined;
  }, [question]);

  // Check if question is multiple-choice //
  const isMultipleChoice = question.type === 'multiple-choice';

  // Parse options for multiple-choice questions //
  const options = useMemo((): ParsedOption[] => {
    if (!('options' in question) || !question.options) return [];
    const firstOption = question.options[0];
    if (firstOption && firstOption.includes('.')) {
      return question.options.map((option) => {
        const match = option.match(/^([A-D])\.\s*(.+)$/);
        if (match) {
          return {
            label: match[1],
            text: match[2],
          };
        }
        return {
          label: option.charAt(0),
          text: option,
        };
      });
    }
    const parsed: ParsedOption[] = [];
    for (let i = 0; i < question.options.length; i += 2) {
      if (i + 1 < question.options.length) {
        parsed.push({
          label: question.options[i].replace('.', '').trim(),
          text: question.options[i + 1],
        });
      }
    }
    return parsed;
  }, [question]);

  // Get word limits for writing tasks //
  const wordLimits = useMemo((): WordLimits | null => {
    if ('minWords' in question && 'maxWords' in question) {
      return { min: question.minWords, max: question.maxWords };
    }
    return null;
  }, [question]);

  // Calculate current word count //
  const wordCount = useMemo(() => {
    return answer
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0).length;
  }, [answer]);

  // Calculate character count //
  const charCount = answer.length;
  const countDisplayText = useMemo(() => {
    if (wordLimits) {
      return `${wordCount} words (${wordLimits.min}-${wordLimits.max} required)`;
    }
    return `${charCount} characters`;
  }, [wordCount, charCount, wordLimits]);

  return {
    questionText,
    passage,
    isMultipleChoice,
    options,
    wordLimits,
    wordCount,
    charCount,
    countDisplayText,
  };
};
