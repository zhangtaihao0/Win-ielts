import { useQuestionRenderer } from '../hooks/useQuestionRenderer';
import type { QuestionRendererProps } from '../types/Main';
import {
  QuestionContainer,
  Passage,
  QuestionText,
  OptionsContainer,
  OptionButton,
  OptionLabel,
  OptionText,
  TextInputContainer,
  TextArea,
  CharCount,
  BTNWrapper,
  BtnContainer,
  BtnText,
} from './QuestionRendererStyled';

const QuestionRenderer = ({
  question,
  answer,
  onAnswerChange,
  onPrevious,
  onNext,
  showPrevious,
  isLastQuestion,
}: QuestionRendererProps) => {
  const { questionText, passage, isMultipleChoice, options, countDisplayText } =
    useQuestionRenderer(question, answer);

  return (
    <QuestionContainer>
      {passage && <Passage>{passage}</Passage>}
      <QuestionText>{questionText}</QuestionText>
      {isMultipleChoice ? (
        <OptionsContainer>
          {options.map((option, index) => (
            <OptionButton
              key={`${option.label}-${index}`}
              $isSelected={answer === option.label}
              onClick={() => onAnswerChange(option.label)}
            >
              <OptionLabel>{option.label}.</OptionLabel>
              <OptionText>{option.text}</OptionText>
            </OptionButton>
          ))}
        </OptionsContainer>
      ) : (
        <TextInputContainer>
          <TextArea
            value={answer}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Type your answer here..."
          />
          <CharCount>{countDisplayText}</CharCount>
        </TextInputContainer>
      )}
      <BTNWrapper>
        {showPrevious && (
          <BtnContainer onClick={onPrevious} style={{ backgroundColor: '#e0e0e0', color: '#333' }}>
            <BtnText>Previous</BtnText>
          </BtnContainer>
        )}
        <BtnContainer onClick={onNext}>
          <BtnText>{isLastQuestion ? 'Submit' : 'Next'}</BtnText>
        </BtnContainer>
      </BTNWrapper>
    </QuestionContainer>
  );
};

export default QuestionRenderer;
