import {
  MianBlock,
  MainContainer,
  TextConatiner,
  HeaderText,
  DifficultyRow,
  DifficultyButton,
} from './MianStyled';
import { difficulties } from '../utils/MainData';
import { useDifficulty } from '../hooks/useDifficulty';

const Main = () => {
  const { difficulty, updateDifficulty } = useDifficulty();

  return (
    <MianBlock>
      <MainContainer>
        <TextConatiner>
          <HeaderText>IELTS Unlocked</HeaderText>
        </TextConatiner>
        <DifficultyRow>
          {difficulties.map((d) => (
            <DifficultyButton
              key={d.id}
              $isActive={difficulty === d.text}
              $color={d.color}
              onClick={() => updateDifficulty(d.text)}
            >
              {d.text}
            </DifficultyButton>
          ))}
        </DifficultyRow>
      </MainContainer>
    </MianBlock>
  );
};

export default Main;
