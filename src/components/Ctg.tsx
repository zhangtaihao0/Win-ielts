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

const Ctg = () => {
  return (
    <CtgBlock>
      <CtgContainer>
        {ieltsExamData.map((item) => {
          return (
            <BoxCtg key={item.id}>
              <BorderText>
                <SpanText>{item.subType}</SpanText>
              </BorderText>
              <MainContainer>
                <HeaderText>{item.type}</HeaderText>
                <ScoreData>
                  {item.currentScore} / <ScoreBlankData>{item.topScore}</ScoreBlankData>
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
