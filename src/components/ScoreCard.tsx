import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
import { clearRecentTestData, saveHighScore } from '../utils/db';

const ScoreCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, examType, difficulty } = location.state as {
    score: number;
    examType: string;
    difficulty: string;
  };

  useEffect(() => {
    const checkAndSaveScore = async () => {
      try {
        await saveHighScore(examType, score);
      } catch (error) {
        console.error('Error saving score:', error);
      }
    };

    checkAndSaveScore();
  }, [score, examType]);

  // Re-try //
  const handleReattempt = async () => {
    try {
      await clearRecentTestData(examType, difficulty);
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
