import {
  SubBlock,
  SubContainer,
  HeaderText,
  NotesList,
  NoteItem,
  BtnContainer,
  BtnText,
} from './SubPageStyled';
import { useLocation } from 'react-router-dom';

const SubPage = () => {
  const location = useLocation();
  const selectedItem = location.state?.selectedItem;

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
        <BtnContainer>
          <BtnText>Start Test</BtnText>
        </BtnContainer>
      </SubContainer>
    </SubBlock>
  );
};

export default SubPage;
