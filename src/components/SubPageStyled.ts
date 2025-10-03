import styled from 'styled-components';

export const SubBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
  @media screen and (max-width: 960px) {
    height: auto;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  max-width: 1060px;
  width: 100%;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  box-sizing: border-box;
  @media screen and (max-width: 960px) {
    padding: 0px 20px;
  }
`;

export const HeaderText = styled.span`
  color: #4c4c53;
  font-size: 32px;
  font-weight: 900;
  width: 100%;
  margin-bottom: 20px;
  @media screen and (max-width: 960px) {
    font-size: 22px;
    font-weight: 900;
    text-align: center;
  }
`;

export const NotesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const NoteItem = styled.li`
  background: #f8f9fa;
  padding: 16px 20px;
  border-radius: 8px;
  color: #4c4c53;
  font-size: 16px;
  line-height: 1.6;
  position: relative;
  padding-left: 48px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  &:hover {
    background: #ddf4e7;
    transform: translateX(4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  }
  &::before {
    content: '📌';
    position: absolute;
    left: 16px;
    top: 16px;
    font-size: 20px;
  }
  @media screen and (max-width: 960px) {
    font-size: 14px;
    padding: 14px 16px;
    padding-left: 44px;
    &::before {
      left: 14px;
      top: 14px;
      font-size: 18px;
    }
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
  margin-top: 23px;
  text-decoration: none;
  color: #4c4c53;
  cursor: pointer;
  @media screen and (max-width: 960px) {
    width: 100%;
    margin-bottom: 5%;
  }
`;

export const BtnText = styled.span`
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
`;
