import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import palette from '../../styles/pallete';
import importImg from '../../styles/importImg';

const StyledCard = styled.button`
  box-sizing: border-box;
  width: 3.75rem;
  height: 7rem;
  position: relative;

  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;

  font-family: 'Pretendard Medium';
  color: ${palette[5]};

  /* background: linear-gradient(180deg, #fafafa 0%, rgba(250, 250, 250, 0) 100%); */
  /* box-shadow: inset 0rem 0rem 0.625rem rgba(200, 200, 200, 0.1); */

  .UserImg {
    position: relative;
    box-sizing: border-box;
    width: 3.75rem;
    height: 3.75rem;
  }

  .UserName {
    font-family: 'Pretendard Medium';
    width: inherit;
    font-style: normal;
    font-weight: 700;
    font-size: 0.875rem;
    line-height: 1.5rem;
  }

  .UserTeam {
    width: inherit;
    font-size: 0.75rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .screen {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    width: inherit;
    height: inherit;
    background-color: white;
    opacity: 1;
  }
  .onScreen {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
    width: inherit;
    height: inherit;
    background-color: white;
    opacity: 0.2;
  }
  .avatarCheck {
    position: absolute;
    top: 20%;
    left: 25%;
    border: none;
    opacity: 1;
  }

  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

  img {
    border-radius: 50%;
    border: 0.0625rem solid ${palette[3]};
  }
`;

const Avatar = ({
  UserName,
  // onClick,
  UserCode,
  UserTeam,
  checked,
  img_src,
  to,
  history,
  ...rest
}) => {
  const [checken, setChecken] = useState(false);
  useEffect(() => {
    setChecken((cur) => !cur);
  }, [checked]);

  return (
    <StyledCard type="button" {...rest}>
      <div className={checken ? 'screen' : 'onScreen'}>
        <div className="UserImg">
          <img src={importImg.membersProfile} />
        </div>
        <span className="UserName">{UserName}</span>
        <span className="UserTeam">{UserTeam}</span>
      </div>
      {checken ? null : (
        <img className="avatarCheck" src={importImg.attendAvatarCheck} />
      )}
    </StyledCard>
  );
};

export default Avatar;
