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
import type { QuestionRendererProps } from '../types/Main';

const QuestionRenderer = ({
  question,
  answer,
  onAnswerChange,
  onPrevious,
  onNext,
  showPrevious,
  isLastQuestion,
}: QuestionRendererProps) => {
  const getQuestionText = () => {
    if ('question' in question) return question.question;
    if ('prompt' in question) return question.prompt;
    if ('text' in question) return question.text;
    return '';
  };

  // Get passage or transcript if available //
  const getPassage = () => {
    if ('passage' in question) return question.passage;
    if ('transcript' in question) return question.transcript;
    return undefined;
  };

  // Is multiple-choice //
  const isMultipleChoice = question.type === 'multiple-choice';
  const parseOptions = () => {
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
    const parsed = [];
    for (let i = 0; i < question.options.length; i += 2) {
      if (i + 1 < question.options.length) {
        parsed.push({
          label: question.options[i].replace('.', '').trim(),
          text: question.options[i + 1],
        });
      }
    }
    return parsed;
  };

  // Prepare data for rendering //
  const options = isMultipleChoice ? parseOptions() : [];
  const passage = getPassage();
  const questionText = getQuestionText();

  // Get word limits for writing tasks //
  const getWordLimits = () => {
    if ('minWords' in question && 'maxWords' in question) {
      return { min: question.minWords, max: question.maxWords };
    }
    return null;
  };

  // Calculate current word count //
  const wordLimits = getWordLimits();
  const wordCount = answer
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;

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
          <CharCount>
            {wordLimits
              ? `${wordCount} words (${wordLimits.min}-${wordLimits.max} required)`
              : `${answer.length} characters`}
          </CharCount>
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
