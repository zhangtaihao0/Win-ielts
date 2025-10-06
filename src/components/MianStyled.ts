import styled from 'styled-components';

export const MianBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @media screen and (max-width: 960px) {
    height: auto;
    padding: 0;
  }
`;

export const MainContainer = styled.div`
  display: flex;
  width: 1060px;
  max-width: 1060px;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 960px) {
    display: flex;
    margin-left: 0;
    padding: 0px 20px;
    flex-direction: column;
  }
`;

export const TextConatiner = styled.div`
  width: 100%;
`;

export const HeaderText = styled.span`
  color: #4c4c53;
  font-size: 32px;
  font-weight: 900;
  @media screen and (max-width: 960px) {
    font-size: 28px;
    font-weight: 900;
  }
`;

export const DifficultyRow = styled.div`
  display: flex;
  gap: 12px;
  height: 30px;
  @media screen and (max-width: 960px) {
    gap: 10px;
    margin-top: 20px;
    width: 100%;
  }
`;

export const DifficultyButton = styled.button<{ $isActive: boolean; $color: string }>`
  padding: 0px 24px;
  border-radius: 100px;
  border: 1.5px solid ${(props) => props.$color};
  background-color: ${(props) => (props.$isActive ? props.$color : 'transparent')};
  color: ${(props) => (props.$isActive ? '#ffffff' : props.$color)};
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  &:hover {
    background-color: ${(props) => props.$color};
    color: #ffffff;
    transform: translateY(-2px);
  }
`;
