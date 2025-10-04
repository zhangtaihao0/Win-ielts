import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTestTimer } from '../hooks/useTestTimer';
import { saveSession, saveAnswers } from '../utils/db';
import type { GeneratedTest, TestSession, Answer } from '../types/Main';
import { v4 as uuidv4 } from 'uuid';

const ReadingBlock = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { test } = location.state as { test: GeneratedTest; selectedItem: unknown };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers] = useState<Answer[]>([]);
  const [sessionId] = useState(() => uuidv4());

  const handleTimeUp = () => {
    alert('Time is up! Your test will be submitted.');
    handleSubmit('timed-out');
  };

  const { timeRemaining, startTimer, formatTime } = useTestTimer({
    timeLimit: test.timeLimit ?? 60, 
    onTimeUp: handleTimeUp,
    autoStart: true,
  });

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

    // Start the timer
    startTimer();
  }, [sessionId, test, startTimer]);

  const handleSubmit = async (status: 'completed' | 'timed-out' = 'completed') => {
    const session: TestSession = {
      testId: sessionId,
      examType: test.examType,
      difficulty: test.difficulty,
      startTime: Date.now() - (((test.timeLimit ?? 60) * 60 * 1000) - timeRemaining * 1000),
      endTime: Date.now(),
      timeLimit: test.timeLimit ?? 60,
      answers,
      status,
    };

    await saveSession(sessionId, session);
    await saveAnswers(sessionId, answers);

    navigate('/results', { state: { session, test } });
  };

  const currentQuestion = test.questions[currentQuestionIndex];

  return (
    <div style={{ padding: '20px' }}>
      {/* Timer Display */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '15px 25px',
          background: timeRemaining < 300 ? '#EB5757' : '#6FCF97',
          color: 'white',
          borderRadius: '8px',
          fontSize: '24px',
          fontWeight: 'bold',
          zIndex: 1000,
        }}
      >
        ⏱️ {formatTime(timeRemaining)}
      </div>

      {/* Question Progress */}
      <div style={{ marginBottom: '20px' }}>
        <h3>
          Question {currentQuestionIndex + 1} of {test.questions.length}
        </h3>
        <p>
          Exam Type: {test.examType} | Difficulty: {test.difficulty}
        </p>
      </div>

      {/* Question Content */}
      <div style={{ marginBottom: '30px' }}>
        {/* Render question based on type */}
        <pre>{JSON.stringify(currentQuestion, null, 2)}</pre>
      </div>

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {currentQuestionIndex > 0 && (
          <button onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}>Previous</button>
        )}
        {currentQuestionIndex < test.questions.length - 1 ? (
          <button onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}>Next</button>
        ) : (
          <button onClick={() => handleSubmit('completed')}>Submit Test</button>
        )}
      </div>
    </div>
  );
};

export default ReadingBlock;
