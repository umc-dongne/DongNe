import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../styles/pallete';
import importImg from '../styles/importImg';

const StyledCard = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 0.625rem;
  outline: none;
  cursor: pointer;

  margin-bottom: 1.75rem;
  margin-right: 0.875rem;

  width: 10.5rem;
  height: 12.5rem;

  font-family: 'Pretendard Medium';
  // font-size: 1rem;
  color: ${palette[5]};

  font-style: normal;
  font-weight: 300;
  font-size: 0.9375rem;
  line-height: 1.125rem;

  background: linear-gradient(180deg, #fafafa 0%, rgba(250, 250, 250, 0) 100%);
  box-shadow: inset 0rem 0rem 0.625rem rgba(200, 200, 200, 0.1);

  .card__body {
    position: relative;
    box-sizing: border-box;
    top: 2.5rem;
    left: -2rem;
  }

  .UserImg {
    box-sizing: border-box;
    position: relative;
    width: 4.25rem;
    height: 4.25rem;
    left: 2.5rem;
    top: -2.5rem;
  }
  .UserName {
    position: relative;
    font-style: normal;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.5rem;
    display: flex;
    justify-content: center;
    margin-bottom: 1rem; 
  }
  // .UserCode {
  //   position: relative;
  //   display: flex;
  //   justify-content: center;
  // }
  .UserTeam {
    position: relative;
    display: flex;
    justify-content: center;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}
`;

const MembersCard = ({
  UserName,
  onClick,
  UserCode,
  UserTeam,
  img_src,
  to,
  history,
  ...rest
}) => {
  return (
    <StyledCard onClick={onClick} {...rest}>
      <div className="UserImg">
        {/* <img src={UserImg} /> */}
        <img src={importImg.membersProfile} />
      </div>
      <div className="card__body">
        <div className="UserName">{UserName}</div>
        {/* <div className="UserCode">{UserCode}</div> */}
        <div className="UserTeam">{UserTeam}</div>
      </div>
    </StyledCard>
  );
};

export default MembersCard;
