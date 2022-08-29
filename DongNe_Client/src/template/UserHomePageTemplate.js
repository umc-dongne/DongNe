import React from 'react';
import styled from 'styled-components';
import Navigator from '../components/Navigator';
import UserNavigator from '../components/user/UserNavigator';
import palette from '../styles/pallete';

const StyledBody = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledBox = styled.div`
  width: max-content;
  height: auto;
  width: auto;
  position: absolute;
  top: 4.6rem;
  left: 0;
`;

const UserHomePageTemplate = ({ location, children }) => {
  return (
    <StyledBody>
      <UserNavigator
        location={location}
        style={{ position: 'absolute', zIndex: 1 }}
      ></UserNavigator>
      <StyledBox>{children}</StyledBox>
      <footer style={{ position: 'absolute', bottom: '0' }}>
        {/* <StyledImg src={vector} /> */}
      </footer>
    </StyledBody>
  );
};

export default UserHomePageTemplate;
