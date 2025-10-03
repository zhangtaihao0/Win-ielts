import { useEffect } from 'react';
import {
  SubBlock,
  SubContainer,
  HeaderText,
  NotesList,
  NoteItem,
  BtnContainer,
  BtnText,
} from './SubPageStyled';
import { ieltsExamData } from '../utils/MainData';
import { useLocation } from 'react-router-dom';
import { useGenerateTest } from '../hooks/useIelts';

const SubPage = () => {
  const location = useLocation();
  const selectedItem = location.state?.selectedItem;
  const { test, loading, error, generateTest } = useGenerateTest({
    examType: selectedItem?.type,
  });

  // Watch for test changes and handle the generated test
  useEffect(() => {
    if (test) {
      console.log('Generated Test Ready:', test);
      // You can navigate to test page or do other actions here
      // navigate('/test-page', { state: { test } });
    }
  }, [test]);

  // Handle Start Test Button Click
  const handleStartTest = async () => {
    if (!selectedItem) return;
    await generateTest();
    // Don't check test here - it won't be updated yet!
    // Use the useEffect above to handle the test when it's ready
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
        {selectedItem && selectedItem.id !== ieltsExamData.length && (
          <BtnContainer onClick={handleStartTest}>
            <BtnText>{loading ? 'Generating Test...' : 'Start Test'}</BtnText>
          </BtnContainer>
        )}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </SubContainer>
    </SubBlock>
  );
};

export default SubPage;