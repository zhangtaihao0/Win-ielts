import { useLocation, useNavigate } from 'react-router-dom';
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
import { clearAllData } from '../utils/db';

const ScoreCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, examType } = location.state as { score: number; examType: string };

  // Handle re-try //
  const handleReattempt = async () => {
    try {
      await clearAllData();
      navigate('/');
    } catch (error) {
      console.error('Error clearing data:', error);
      alert('There was an error. Please try again.');
    }
  };

  return (
    <ScoreBlock>
      <ScoreContainer>
        <ScoreCardWrapper>
          <HeaderText>Your {examType} Assessment</HeaderText>
          <ScoreImgContainer>
            <CardImage src={Trophy} alt="Trophy" />
            <ScoreText>
              {score.toFixed(1)}
              <span style={{ fontSize: '32px', color: '#fff' }}> / 9</span>
            </ScoreText>
            <BtnContainer onClick={handleReattempt}>
              <BtnText>Reattempt</BtnText>
            </BtnContainer>
          </ScoreImgContainer>
        </ScoreCardWrapper>
      </ScoreContainer>
    </ScoreBlock>
  );
};

export default ScoreCard;
