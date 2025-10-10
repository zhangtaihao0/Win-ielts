import { useEffect, useRef, useCallback } from 'react';
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
  PlayButton,
  PlayIcon,
} from './QuestionRendererStyled';
import Play from '/img/play.png';

const QuestionRenderer = ({
  question,
  answer,
  onAnswerChange,
  onPrevious,
  onNext,
  showPrevious,
  isLastQuestion,
  isListeningType,
  handleSubmit,
}: QuestionRendererProps) => {
  const { questionText, passage, isMultipleChoice, options, countDisplayText } =
    useQuestionRenderer(question, answer);
  const synthRef = useRef(window.speechSynthesis);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Function to start text-to-speech for passage //
  const playSpeech = useCallback(() => {
    if (!passage) return;
    const synth = synthRef.current;
    if (synth.speaking) return;
    const utterance = new SpeechSynthesisUtterance(passage);
    utterance.lang = 'en-US';
    utterance.rate = 0.7;
    utterance.pitch = 1;
    const voices = synth.getVoices();
    const femaleVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        /female|woman|Google US English|Samantha|Microsoft (Zira|Aria)/i.test(v.name),
    );
    utterance.voice = femaleVoice || voices.find((v) => v.lang.startsWith('en')) || null;
    utteranceRef.current = utterance;
    synth.speak(utterance);
  }, [passage]);

  // Load voices on mount //
  useEffect(() => {
    const synth = synthRef.current;
    const loadVoices = () => synth.getVoices();
    loadVoices();
    if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = loadVoices;
    return () => {
      if (synth.onvoiceschanged !== undefined) synth.onvoiceschanged = null;
    };
  }, []);

  // Cleanup on unmount or when question changes //
  useEffect(() => {
    const synth = synthRef.current;
    return () => {
      if (synth.speaking) synth.cancel();
    };
  }, [question]);

  // Handle next/submit button click //
  const handleNextClick = () => {
    if (isLastQuestion) {
      handleSubmit('completed');
    } else {
      onNext();
    }
  };

  return (
    <QuestionContainer>
      {isListeningType ? (
        <PlayButton onClick={playSpeech}>
          <PlayIcon src={Play} alt="Play" />
        </PlayButton>
      ) : (
        passage && <Passage>{passage}</Passage>
      )}
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
        <BtnContainer onClick={handleNextClick}>
          <BtnText>{isLastQuestion ? 'Submit' : 'Next'}</BtnText>
        </BtnContainer>
      </BTNWrapper>
    </QuestionContainer>
  );
};

export default QuestionRenderer;
