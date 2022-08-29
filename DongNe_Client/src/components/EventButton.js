import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../styles/pallete';

const StyledImg = styled.img`
  width: 2rem;
  margin: 0.5rem;
`;
const StyledDiv = styled.div`
  font-family: 'Pretendard Bold';
  font-size: inherit;
  font-weight: inherit;
  color: ${palette[0]};
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 0.625rem;
  outline: none;
  cursor: pointer;

  margin-bottom: 1rem;

  width: inherit;
  height: inherit;

  font-family: 'Pretendard Bold';
  font-size: 1rem;
  color: ${palette[0]};

  background: ${palette[3]};

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const EventButton = ({ text, img_src, onClick, props, ...rest }) => {
  return (
    <StyledButton type="button" {...rest} onClick={onClick}>
      {img_src ? <StyledImg src={img_src} /> : <div />}
      <StyledDiv>{text}</StyledDiv>
    </StyledButton>
  );
};

export default EventButton;
