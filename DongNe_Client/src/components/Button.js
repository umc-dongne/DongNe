import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../styles/pallete';

const StyledImg = styled.img`
  width: 2rem;
  margin: 0.5rem;
`;
const StyledDiv = styled.div`
  font-family: 'Pretendard Bold';
  font-size: 1rem;
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

  width: 40.625rem;
  height: 3rem;

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

const Button = ({ text, img_src, to, history, props, ...rest }) => {
  const onClick = (e) => {
      if (to) {
        if(props){
          history.push({
            pathname: to, 
            state: {props}
          });
          return ;
        }
        history.push(to);

      } else {
        history.push('/');
      }
  
  }

  return (
    <StyledButton {...rest} onClick={onClick}>
      {img_src ? <StyledImg src={img_src} /> : <div />}
      <StyledDiv>{text}</StyledDiv>
    </StyledButton>
  );
};

export default Button;
