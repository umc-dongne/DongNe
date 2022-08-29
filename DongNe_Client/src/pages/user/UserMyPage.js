import React from 'react';
import BackgroundTemplate from '../../template/BackgroundTemplate';
import styled from 'styled-components';
import UserMypageComponent from '../../components/UserMypageComponent';
import { Link } from 'react-router-dom';
import HomePageTemplate from '../../template/HomePageTemplate';
import UserNavigator from '../../components/user/UserNavigator';

const WhitBox = styled.div`
  box-sizing: border-box;
  position: absolute;
  width: 110rem;
  height: 45rem;
  left: 4rem;
  top: 8rem;

  background: linear-gradient(180deg, #ffffff 0%, rgba(251, 251, 251, 0) 100%);
  border: 2px solid rgba(255, 255, 255, 0.6);
  border-radius: 28px;
  backdrop-filter: blur(40px);
  /* Note: backdrop-filter has minimal browser support */

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserMyPage = () => {
  return (
    <BackgroundTemplate style={{ zIndex: 0 }}>
      <UserNavigator style={{ zIndex: 1 }}/>
        <WhitBox style={{ zIndex: 2 }}>
          <UserMypageComponent />
        </WhitBox>
    </BackgroundTemplate>
  );
};

export default UserMyPage;
