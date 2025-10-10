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
  LoadingBlock,
  LoadingGif,
} from './AssessmentBlockStyled';
import QuestionRenderer from './QuestionRenderer';
// Loader //
import Loader from '/img/loading.gif';

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
    handleSubmit,
    isSubmitting,
  } = useAssessment({ test });
  // Filter listing //
  const isListeningType = test.examType === 'Listening';

  // loading //
  if (isSubmitting) {
    return (
      <LoadingBlock>
        <LoadingGif src={Loader} alt="Loading..." />
      </LoadingBlock>
    );
  }

  return (
    <MainAssessmentBlock>
      <SubContainer>
        <StaticBox>
          <TypeInfo>
            Question {currentQuestionIndex + 1} of {totalQuestions} | Exam Type: {test.examType} |
            Difficulty: {test.difficulty}
          </TypeInfo>
          <TimeBlock>
            <TimeIndicator $isWarning={timeRemaining < 300}>
              <TimeText>{formatTime(timeRemaining)}</TimeText>
            </TimeIndicator>
          </TimeBlock>
        </StaticBox>
        <QuestionRenderer
          question={currentQuestion}
          answer={currentAnswer}
          onAnswerChange={handleAnswerChange}
          onPrevious={handlePrevious}
          onNext={handleNext}
          showPrevious={currentQuestionIndex > 0}
          isLastQuestion={currentQuestionIndex === totalQuestions - 1}
          isListeningType={isListeningType}
          handleSubmit={handleSubmit}
        />
      </SubContainer>
    </MainAssessmentBlock>
  );
};

export default AssessmentBlock;
