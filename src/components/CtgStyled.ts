import styled from 'styled-components';

export const CtgBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
  @media screen and (max-width: 960px) {
    height: auto;
  }
`;

export const CtgContainer = styled.div`
  display: flex;
  max-width: 1060px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  box-sizing: border-box;
  @media screen and (max-width: 960px) {
    padding: 0px 20px;
  }
`;

export const BoxCtg = styled.div`
  background-color: #f6f9fc;
  padding: 10px;
  border-radius: 10px;
  transition: transform 0.2s;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 0.5px solid transparent;
  cursor: pointer;
  flex: 0 0 calc(50% - 10px);
  &:hover {
    border-color: #ea2264;
  }
  @media screen and (max-width: 960px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export const BorderText = styled.div`
  height: 20px;
  width: fit-content;
  border-radius: 100px;
  padding: 1px 8px;
  border: 1px solid #c8c7c7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
`;

export const SpanText = styled.span`
  font-size: 12px;
  font-weight: 600;
`;

export const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const HeaderText = styled.span`
  color: #4c4c53;
  font-size: 32px;
  font-weight: 900;
  @media screen and (max-width: 960px) {
    font-size: 18px;
    font-weight: 900;
  }
`;

export const ScoreData = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #4c4c53;
`;

export const ScoreBlankData = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #4c4c53;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 10px;
  border-radius: 10px;
`;

export const CardImage = styled.img`
  width: 60%;
  object-fit: cover;
  border-radius: 10px;
  @media screen and (max-width: 960px) {
    width: 70%;
  }
`;
