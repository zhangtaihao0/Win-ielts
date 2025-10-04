import { useEffect, useState } from 'react';
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
  DeleteWrapper,
  DeleteTestsContainer,
  CachedButtonPrimary,
  CachedButtonSecondary,
  BtnContainer,
  BtnText,
  ErrorWrapper,
} from './SubPageStyled';
import { ieltsExamData } from '../utils/MainData';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGenerateTest } from '../hooks/useIelts';
import { clearAllData, deleteTest } from '../utils/db';
import { useDifficulty } from '../hooks/useDifficulty';

const SubPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItem = location.state?.selectedItem;
  const { difficulty } = useDifficulty('Easy');
  const { test, loading, error, generateTest, timeLimit, hasCachedTest, checkCache } =
    useGenerateTest({
      examType: selectedItem?.type,
    });
  const [clearing, setClearing] = useState(false);
  const [deletingSingle, setDeletingSingle] = useState(false);

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

  // Clear All Cache Handler //
  const handleClearCache = async () => {
    const confirmed = window.confirm(
      'This will clear all cached tests, answers, and results. Are you sure?',
    );
    if (!confirmed) return;
    setClearing(true);
    try {
      await clearAllData();
      await checkCache();
      alert('✅ Cache cleared successfully! Generate a new test to see fresh data.');
    } catch (err) {
      console.error('Error clearing cache:', err);
      alert('❌ Failed to clear cache. Check console for details.');
    } finally {
      setClearing(false);
    }
  };

  // Delete Current Test Handler //
  const handleDeleteCurrentTest = async () => {
    if (!selectedItem?.type || !difficulty) return;
    const confirmed = window.confirm(
      `Delete cached test for ${selectedItem.type} (${difficulty})? You'll need to generate a new one.`,
    );
    if (!confirmed) return;
    setDeletingSingle(true);
    try {
      await deleteTest(selectedItem.type, difficulty);
      await checkCache();
      alert(`✅ ${selectedItem.type} (${difficulty}) test deleted successfully!`);
    } catch (err) {
      console.error('Error deleting test:', err);
      alert('❌ Failed to delete test. Check console for details.');
    } finally {
      setDeletingSingle(false);
    }
  };

  return (
    <SubBlock>
      <SubContainer>
        <HeaderText>
          🚀 {selectedItem ? selectedItem.initiation_begin : 'No Item Selected'}
        </HeaderText>
        {selectedItem?.important_note && (
          <NotesList>
            {selectedItem.important_note.map((note: string, index: number) => (
              <NoteItem key={index}>{note}</NoteItem>
            ))}
          </NotesList>
        )}
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
          {/* Dev Tools Section */}
          {selectedItem && selectedItem.id !== ieltsExamData.length && (
            <DeleteWrapper>
              <DeleteTestsContainer>
                {hasCachedTest && (
                  <CachedButtonPrimary
                    onClick={handleDeleteCurrentTest}
                    disabled={deletingSingle}
                    style={{
                      cursor: deletingSingle ? 'not-allowed' : 'pointer',
                      opacity: deletingSingle ? 0.6 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!deletingSingle) {
                        e.currentTarget.style.backgroundColor = '#F57C00';
                      }
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#FF9800';
                    }}
                  >
                    {deletingSingle ? '🗑️ Deleting...' : `Delete ${selectedItem.type}`}
                  </CachedButtonPrimary>
                )}
                {/* Clear All Cache Button */}
                <CachedButtonSecondary
                  onClick={handleClearCache}
                  disabled={clearing}
                  style={{
                    cursor: clearing ? 'not-allowed' : 'pointer',
                    opacity: clearing ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!clearing) {
                      e.currentTarget.style.backgroundColor = '#d14545';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#EB5757';
                  }}
                >
                  {clearing ? 'Deleting...' : 'Delete All Tests'}
                </CachedButtonSecondary>
              </DeleteTestsContainer>
            </DeleteWrapper>
          )}
        </InfoBoxTests>
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
