import styled, { keyframes } from 'styled-components';

export const MainAssessmentBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
  @media screen and (max-width: 960px) {
    height: auto;
    margin-top: 10px;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  max-width: 1060px;
  width: 100%;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  padding: 0px 5px;
  @media screen and (max-width: 960px) {
    padding: 0px 20px;
  }
`;

export const StaticBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(111, 207, 151, 0.7);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(111, 207, 151, 0);
  }
`;

const pulseWarning = keyframes`
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(235, 87, 87, 0.7);
  }
  50% {
    box-shadow: 0 0 0 15px rgba(235, 87, 87, 0);
  }
`;

export const TimeBlock = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 960px) {
    justify-content: flex-end;
  }
`;

export const TimeIndicator = styled.div<{ $isWarning: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: ${(props) => (props.$isWarning ? '#EB5757' : '#6FCF97')};
  border-radius: 50%;
  color: white;
  font-size: 24px;
  font-weight: bold;
  z-index: 1000;
  animation: ${(props) => (props.$isWarning ? pulseWarning : pulse)} 2s infinite;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  &::before {
    content: '';
    position: absolute;
    inset: -5px;
    border-radius: 50%;
    border: 3px solid ${(props) => (props.$isWarning ? '#EB5757' : '#6FCF97')};
    opacity: 0.3;
  }
  &:hover {
    transform: scale(1.05);
  }
`;

export const TimeText = styled.div`
  font-size: 15px;
  font-weight: bold;
  letter-spacing: 1px;
`;

export const TypeInfo = styled.div`
  padding: 10px 15px;
  background-color: #e3f2fd;
  border: 2px solid #2196f3;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1565c0;
  width: 80%;
  line-height: 1.5;
  @media screen and (max-width: 960px) {
    display: none;
  }
`;
