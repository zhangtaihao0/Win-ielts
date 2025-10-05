import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTestTimer } from '../hooks/useTestTimer';
import { saveSession, saveAnswers } from '../utils/db';
import type { GeneratedTest, TestSession, Answer } from '../types/Main';
import { v4 as uuidv4 } from 'uuid';
import {
  MainReadingBlock,
  SubContainer,
  StaticBox,
  TimeBlock,
  TimeIndicator,
  TimeText,
  TypeInfo,
} from './ReadingBlockStyled';
import QuestionRenderer from './QuestionRenderer';

const ReadingBlock = () => {
  const location = useLocation();
  const { test } = location.state as { test: GeneratedTest; selectedItem: unknown };
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [sessionId] = useState(() => uuidv4());

  // Test session ID to track the current test session//
  const handleTimeUp = () => {
    alert('Time is up! Your test will be submitted.');
    handleSubmit('timed-out');
  };

  // Timer management using custom hook //
  const { timeRemaining, startTimer, formatTime } = useTestTimer({
    timeLimit: test.timeLimit ?? 60,
    onTimeUp: handleTimeUp,
    autoStart: true,
  });

  // Initialize test session on component mount //
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

  // Submit test and navigate to results page //
  const handleSubmit = async (status: 'completed' | 'timed-out' = 'completed') => {
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
  };

  // Current question and answer management //
  const currentQuestion = test.questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id] || '';

  // Update answer for the current question //
  const handleAnswerChange = (answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  // Navigate to previous question //
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Navigate to next question or submit //
  const handleNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  return (
    <MainReadingBlock>
      <SubContainer>
        <StaticBox>
          <TimeBlock>
            <TimeIndicator $isWarning={timeRemaining < 300}>
              <TimeText>{formatTime(timeRemaining)}</TimeText>
            </TimeIndicator>
          </TimeBlock>
          <TypeInfo>
            Question {currentQuestionIndex + 1} of {test.questions.length} Exam Type:{' '}
            {test.examType} | Difficulty: {test.difficulty}
          </TypeInfo>
        </StaticBox>
        <QuestionRenderer
          question={currentQuestion}
          answer={currentAnswer}
          onAnswerChange={handleAnswerChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          showPrevious={currentQuestionIndex > 0}
          isLastQuestion={currentQuestionIndex === test.questions.length - 1}
        />
      </SubContainer>
    </MainReadingBlock>
  );
};

export default ReadingBlock;
