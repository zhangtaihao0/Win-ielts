import { useLocation } from 'react-router-dom';
import { useAssessment } from '../hooks/useAssessment';
import type { GeneratedTest } from '../types/Main';
import {
  MainAssessmentBlock,
  SubContainer,
  StaticBox,
  TimeBlock,
  TimeIndicator,
  TimeText,
  TypeInfo,
} from './AssessmentBlockStyled';
import QuestionRenderer from './QuestionRenderer';

const AssessmentBlock = () => {
  const location = useLocation();
  const { test } = location.state as { test: GeneratedTest; selectedItem: unknown };
  const {
    currentQuestionIndex,
    currentQuestion,
    currentAnswer,
    timeRemaining,
    formatTime,
    handleAnswerChange,
    handlePrevious,
    handleNext,
    totalQuestions,
  } = useAssessment({ test });

  return (
    <MainAssessmentBlock>
      <SubContainer>
        <StaticBox>
          <TimeBlock>
            <TimeIndicator $isWarning={timeRemaining < 300}>
              <TimeText>{formatTime(timeRemaining)}</TimeText>
            </TimeIndicator>
          </TimeBlock>
          <TypeInfo>
            Question {currentQuestionIndex + 1} of {totalQuestions} | Exam Type: {test.examType} |
            Difficulty: {test.difficulty}
          </TypeInfo>
        </StaticBox>
        <QuestionRenderer
          question={currentQuestion}
          answer={currentAnswer}
          onAnswerChange={handleAnswerChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          showPrevious={currentQuestionIndex > 0}
          isLastQuestion={currentQuestionIndex === totalQuestions - 1}
        />
      </SubContainer>
    </MainAssessmentBlock>
  );
};

export default AssessmentBlock;
