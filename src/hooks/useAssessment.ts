import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTestTimer } from './useTestTimer';
import { useEvaluation } from './useEvaluation';
import { saveSession, saveAnswers } from '../utils/db';
import type { TestSession, Answer, UseAssessmentProps } from '../types/Main';
import { useNavigate } from 'react-router-dom';

export const useAssessment = ({ test, onSubmit }: UseAssessmentProps) => {
  const [sessionId] = useState(() => uuidv4());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Get evaluation hook //
  const { evaluating, error: evaluationError, evaluateTest } = useEvaluation();

  // Handle time up scenario //
  const handleTimeUp = useCallback(() => {
    alert('Time is up! Your test will be submitted.');
    handleSubmit('timed-out');
  }, []);

  // Timer management
  const { timeRemaining, startTimer, formatTime } = useTestTimer({
    timeLimit: test.timeLimit ?? 60,
    onTimeUp: handleTimeUp,
    autoStart: true,
  });

  // Initialize test session on mount //
  useEffect(() => {
    const session: TestSession = {
      testId: sessionId,
      examType: test.examType,
      difficulty: test.difficulty,
      startTime: Date.now(),
      timeLimit: test.timeLimit ?? 60,
      answers: [],
      status: 'in-progress',
    };
    saveSession(sessionId, session);
    startTimer();
  }, [sessionId, test, startTimer]);

  // Submit test //
  const handleSubmit = useCallback(
    async (status: 'completed' | 'timed-out' = 'completed') => {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        const answersArray: Answer[] = Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
          timestamp: Date.now(),
        }));
        const session: TestSession = {
          testId: sessionId,
          examType: test.examType,
          difficulty: test.difficulty,
          startTime: Date.now() - ((test.timeLimit ?? 60) * 60 * 1000 - timeRemaining * 1000),
          endTime: Date.now(),
          timeLimit: test.timeLimit ?? 60,
          answers: answersArray,
          status,
        };
        await saveSession(sessionId, session);
        await saveAnswers(sessionId, answersArray);
        // Evaluate the test with AI //
        const score = await evaluateTest(test, answersArray);
        if (evaluationError) {
          console.error('Evaluation error:', evaluationError);
          alert('There was an error evaluating your test. Please try again.');
          setIsSubmitting(false);
          return;
        }
        if (onSubmit && score !== null) {
          onSubmit(sessionId, status, score);
        }
        navigate('/results', {
          state: {
            score,
            examType: test.examType,
          },
        });
      } catch (error) {
        console.error('Submission error:', error);
        alert('There was an error submitting your test. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      answers,
      sessionId,
      test,
      timeRemaining,
      onSubmit,
      isSubmitting,
      evaluateTest,
      evaluationError,
      navigate,
    ],
  );

  // Get current question and answer //
  const currentQuestion = test.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion?.id] || '';

  // Update answer for current question //
  const handleAnswerChange = useCallback(
    (answer: string) => {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: answer,
      }));
    },
    [currentQuestion?.id],
  );

  // Navigate to previous question //
  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Validate if answer is provided //
  const isAnswerValid = useCallback(() => {
    const answer = currentAnswer.trim();
    if (!answer) return false;
    if (currentQuestion.type !== 'multiple-choice') {
      return answer.length > 0;
    }
    return true;
  }, [currentAnswer, currentQuestion?.type]);

  // Navigate to next question or submit //
  const handleNext = useCallback(() => {
    if (!isAnswerValid()) {
      alert('Please provide an answer before proceeding.');
      return;
    }
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }, [isAnswerValid, currentQuestionIndex, test.questions.length, handleSubmit]);

  return {
    sessionId,
    currentQuestionIndex,
    currentQuestion,
    currentAnswer,
    answers,
    timeRemaining,
    formatTime,
    handleAnswerChange,
    handlePrevious,
    handleNext,
    handleSubmit,
    totalQuestions: test.questions.length,
    isSubmitting: isSubmitting || evaluating,
    evaluationError,
  };
};
