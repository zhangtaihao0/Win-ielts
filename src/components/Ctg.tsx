import { useEffect, useState } from 'react';
import {
  CtgBlock,
  CtgContainer,
  BoxCtg,
  BorderText,
  SpanText,
  MainContainer,
  HeaderText,
  ScoreData,
  ScoreBlankData,
  IconContainer,
  CardImage,
} from './CtgStyled';
import { ieltsExamData } from '../utils/MainData';
import { useNavigate } from 'react-router-dom';
import { getHighScore } from '../utils/db';

const Ctg = () => {
  const navigate = useNavigate();
  const [highScores, setHighScores] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchHighScores = async () => {
      const scores: Record<string, number> = {};
      for (const item of ieltsExamData) {
        const highScore = await getHighScore(item.type);
        if (highScore) {
          scores[item.id] = highScore.score;
        }
      }
      setHighScores(scores);
    };
    fetchHighScores();
  }, []);

  const handleNavigation = (item: (typeof ieltsExamData)[0]) => {
    navigate('/initiate', {
      state: {
        selectedItem: item,
      },
    });
  };

  return (
    <CtgBlock>
      <CtgContainer>
        {ieltsExamData.map((item) => {
          const displayScore = highScores[item.id] || 0;
          return (
            <BoxCtg key={item.id} onClick={() => handleNavigation(item)}>
              <BorderText>
                <SpanText>{item.subType}</SpanText>
              </BorderText>
              <MainContainer>
                <HeaderText>{item.type}</HeaderText>
                <ScoreData>
                  {displayScore.toFixed(1)} / <ScoreBlankData>{item.topScore}</ScoreBlankData>
                </ScoreData>
              </MainContainer>
              <IconContainer>
                <CardImage src={item.img} alt={item.type} />
              </IconContainer>
            </BoxCtg>
          );
        })}
      </CtgContainer>
    </CtgBlock>
  );
};

export default Ctg;
