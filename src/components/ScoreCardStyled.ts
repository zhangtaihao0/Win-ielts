import styled from 'styled-components';

export const ScoreBlock = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  @media screen and (max-width: 960px) {
    height: auto;
    padding: 0;
  }
`;

export const ScoreContainer = styled.div`
  display: flex;
  width: 1060px;
  max-width: 1060px;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
  @media screen and (max-width: 960px) {
    display: flex;
    margin-left: 0;
    padding: 30px 20px;
  }
`;

export const ScoreCardWrapper = styled.div`
  width: 50%;
  border-radius: 15px;
  padding: 20px 15px;
  background-color: #a7aae1;
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;

export const HeaderText = styled.span`
  color: #fff;
  font-size: 22px;
  font-weight: 900;
  width: 100%;
  @media screen and (max-width: 960px) {
    font-size: 18px;
    font-weight: 900;
    text-align: center;
  }
`;

export const ScoreImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
  flex-direction: column;
  text-align: center;
  @media screen and (max-width: 960px) {
    margin-top: 20px;
  }
`;

export const CardImage = styled.img`
  width: 30%;
  object-fit: cover;
  border-radius: 10px;
  @media screen and (max-width: 960px) {
    width: 50%;
  }
`;

export const ScoreText = styled.span`
  color: #ffd700;
  font-size: 60px;
  width: 100%;
  margin-top: 10px;
  font-weight: 900;
`;

export const BtnContainer = styled.a`
  display: flex;
  width: 50%;
  height: 45px;
  background-color: #00ffde;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 30px;
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