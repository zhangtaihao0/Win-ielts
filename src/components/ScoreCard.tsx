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
  const state = location.state as {
    score: number;
    examType: string;
    difficulty: string;
  } | null;

  // Redirect if no state is present //
  useEffect(() => {
    if (!state || state.score === undefined || !state.examType || !state.difficulty) {
      navigate('/', { replace: true });
    }
  }, [state, navigate]);

  // Always call hooks before any return //
  useEffect(() => {
    if (!state || state.score === undefined || !state.examType || !state.difficulty) {
      return;
    }
    const { score, examType } = state;
    const checkAndSaveScore = async () => {
      try {
        await saveHighScore(examType, score);
      } catch (error) {
        console.error('Error saving score:', error);
      }
    };
    checkAndSaveScore();
  }, [state]);

  // Early return if state is invalid //
  if (!state || state.score === undefined || !state.examType || !state.difficulty) {
    return null;
  }
  const { score, examType, difficulty } = state;

  // Re-try - clears test and navigates home //
  const handleReattempt = async () => {
    try {
      await clearRecentTestData(examType, difficulty);
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Error clearing data:', error);
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
