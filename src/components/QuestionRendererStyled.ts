import styled from 'styled-components';

export const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: white;
  padding: 10px 0px;
  border-radius: 12px;
  @media screen and (max-width: 960px) {
    padding: 10px 0px;
  }
`;

export const Passage = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-left: 4px solid #4e56c0;
  border-radius: 8px;
  line-height: 1.8;
  font-size: 16px;
  color: #333;
  @media screen and (max-width: 960px) {
    padding: 20px;
    font-size: 15px;
    text-align: left;
    line-height: 1.5;
    letter-spacing: normal;
    word-spacing: normal;
  }
`;

export const QuestionText = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.6;
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: flex-start;
  padding: 16px 20px;
  background: ${(props) => (props.$isSelected ? '#e8f5e9' : '#fff')};
  border: 2px solid ${(props) => (props.$isSelected ? '#4caf50' : '#e0e0e0')};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  &:hover {
    transform: translateX(4px);
  }
  &:active {
    transform: translateX(2px);
  }
`;

export const OptionLabel = styled.span`
  font-weight: 600;
  color: #4e56c0;
  min-width: 30px;
  margin-right: 12px;
`;

export const OptionText = styled.span`
  flex: 1;
`;

export const TextInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TextArea = styled.textarea`
  min-height: 150px;
  padding: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  font-family: inherit;
  line-height: 1.6;
  resize: vertical;
  transition: all 0.2s ease;
  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }
  &::placeholder {
    color: #999;
  }
  @media screen and (max-width: 960px) {
    width: auto;
  }
`;

export const CharCount = styled.div`
  text-align: right;
  font-size: 13px;
  color: #666;
`;

export const BTNWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    display: block;
  }
`;

export const BtnContainer = styled.a`
  display: flex;
  width: 20%;
  height: 45px;
  background-color: #00ffde;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #4c4c53;
  cursor: pointer;
  @media screen and (max-width: 960px) {
    width: 100%;
    margin-top: 12%;
    margin-bottom: 5%;
  }
`;

export const BtnText = styled.span`
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
`;
