import { useEffect } from 'react';
import {
  SubBlock,
  SubContainer,
  HeaderText,
  NotesList,
  NoteItem,
  InfoBoxTests,
  DisplayChacheWrapper,
  TypeInfo,
  GenratedInfo,
  BtnContainer,
  BtnText,
  ErrorWrapper,
} from './SubPageStyled';
import { ieltsExamData } from '../utils/MainData';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGenerateTest } from '../hooks/useIelts';
import { useDifficulty } from '../hooks/useDifficulty';

const SubPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItem = location.state?.selectedItem;
  const { difficulty } = useDifficulty('Easy');
  const { test, loading, error, generateTest, timeLimit, hasCachedTest } = useGenerateTest({
    examType: selectedItem?.type,
  });
  // Navigate to test page when test is ready //
  useEffect(() => {
    if (test && selectedItem?.actionUrl && selectedItem?.type) {
      const isCorrectTest = test.examType === selectedItem.type;
      if (isCorrectTest) {
        navigate(selectedItem.actionUrl, {
          state: {
            test: { ...test, timeLimit },
            selectedItem,
          },
        });
      } else {
        console.warn(
          `⚠️ Test mismatch detected! Expected: ${selectedItem.type}, Got: ${test.examType}`,
        );
      }
    }
  }, [test, selectedItem, navigate, timeLimit]);

  // Start or Load Test Handler //
  const handleStartTest = async () => {
    if (!selectedItem) return;
    await generateTest();
  };

  return (
    <SubBlock>
      <SubContainer>
        <HeaderText>
          🚀 {selectedItem ? selectedItem.initiation_begin : 'No Item Selected'}
        </HeaderText>
        <InfoBoxTests>
          <DisplayChacheWrapper>
            {selectedItem && difficulty && selectedItem.id !== ieltsExamData.length && (
              <TypeInfo>
                📋 {selectedItem.type} • {difficulty} • {timeLimit} minutes
              </TypeInfo>
            )}
            {/* Cache Status Indicator */}
            {selectedItem && selectedItem.id !== ieltsExamData.length && (
              <GenratedInfo>
                {hasCachedTest
                  ? '✅ Test available - will load instantly'
                  : '⚡ Test will be generated'}
              </GenratedInfo>
            )}
          </DisplayChacheWrapper>
        </InfoBoxTests>
        {selectedItem?.important_note && (
          <NotesList>
            {selectedItem.important_note.map((note: string, index: number) => (
              <NoteItem key={index}>{note}</NoteItem>
            ))}
          </NotesList>
        )}
        {/* Action BTN */}
        {selectedItem && selectedItem.id !== ieltsExamData.length && (
          <BtnContainer
            onClick={loading ? undefined : handleStartTest}
            style={{
              opacity: loading ? 0.6 : 1,
              pointerEvents: loading ? 'none' : 'auto',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <BtnText>
              {loading ? 'Generating Test...' : hasCachedTest ? 'Load Test' : 'Generate New Test'}
            </BtnText>
          </BtnContainer>
        )}
        {/* Error handler */}
        {error && <ErrorWrapper>Error: {error}</ErrorWrapper>}
      </SubContainer>
    </SubBlock>
  );
};

export default SubPage;
