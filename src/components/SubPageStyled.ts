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
    margin-top: 12%;
    margin-bottom: 5%;
  }
`;

export const BtnText = styled.span`
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
`;

export const InfoBoxTests = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 960px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const DisplayChacheWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  @media screen and (max-width: 960px) {
    flex-direction: column;
  }
`;

export const TypeInfo = styled.div`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #e3f2fd;
  border: 2px solid #2196f3;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #1565c0;
  text-align: center;
`;

export const GenratedInfo = styled.div`
  margin-top: 10px;
  padding: 10px 15px;
  background-color: #e8f5e9;
  border: 2px solid #4caf50;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #2e7d32;
  text-align: center;
`;

export const DeleteWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  @media screen and (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;

export const DeleteTestsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const CachedButtonPrimary = styled.button`
  padding: 5px 16px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  transition: all 0.2s;
  @media screen and (max-width: 960px) {
    padding: 12px 16px;
  }
`;

export const CachedButtonSecondary = styled.button`
  padding: 5px 16px;
  background-color: #eb5757;
  color: white;
  border: none;
  border-radius: 4px;
  transition: all 0.2s;
  @media screen and (max-width: 960px) {
    padding: 12px 16px;
  }
`;

export const ErrorWrapper = styled.div`
  margin-top: 15px;
  padding: 10px 15px;
  color: #c62828;
  font-size: 14px;
`;
