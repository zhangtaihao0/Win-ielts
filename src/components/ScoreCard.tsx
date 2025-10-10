import {
  ScoreBlock,
  ScoreContainer,
  ScoreCardWrapper,
  HeaderText,
  ScoreImgContainer,
  CardImage,
  ScoreText,
  BtnContainer,
  BtnText,
} from './ScoreCardStyled';
import Trophy from '/img/trophy.png';

const ScoreCard = () => {
  return (
    <ScoreBlock>
      <ScoreContainer>
        <ScoreCardWrapper>
          <HeaderText>Your Reading Assessment</HeaderText>
          <ScoreImgContainer>
            <CardImage src={Trophy} alt="Trophy" />
            <ScoreText>
              8.5<span style={{ fontSize: '32px', color: '#fff' }}>/ 9</span>
            </ScoreText>
            <BtnContainer>
              <BtnText>Reattempt</BtnText>
            </BtnContainer>
          </ScoreImgContainer>
        </ScoreCardWrapper>
      </ScoreContainer>
    </ScoreBlock>
  );
};

export default ScoreCard;
