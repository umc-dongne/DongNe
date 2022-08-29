import React from 'react';
import styled from 'styled-components';
import vector from '../styles/imgs/background/vector.png';
import palette from '../styles/pallete';

const StyledImg = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
`;

const BackgroundImg = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${palette.background};
`;

const BackgroundTemplate = ({ children }) => {
  return (
    <BackgroundImg>
      <footer style={{ position: 'absolute', bottom: '0' }}>
        <StyledImg src={vector} />
      </footer>
      {children}
    </BackgroundImg>
  );
};

export default BackgroundTemplate;
