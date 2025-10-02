import styled from 'styled-components';

export const NavContainer = styled.nav`
  height: 70px;
  display: flex;
  font-size: 1rem;
  top: 0;
  z-index: 1;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 960px) {
    transition: 0.9s all ease;
  }
`;

export const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  width: 100%;
  padding: 15px 0px;
  max-width: 1060px;
  margin-left: 10px;
  margin-right: 10px;
  @media screen and (max-width: 960px) {
    padding: 15px 10px;
  }
`;

export const Logo = styled.img`
  width: 48px;
  height: 48px;
  @media screen and (max-width: 960px) {
    height: 40px;
  }
`;

export const DetailsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NavTextLink = styled.a`
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  padding: 0 10px;
  color: #090040;
  &:hover {
    color: #346751;
    text-decoration: underline;
    text-underline-offset: 5px;
  }
`;
