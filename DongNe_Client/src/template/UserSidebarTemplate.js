import HomePageTemplate from './HomePageTemplate';
import React, { useState } from 'react';
import palette from '../styles/pallete';
import styled from 'styled-components';
import copy from '../styles/imgs/icon/home_file-copy.png';
import importImg from '../styles/importImg';
import { useHistory, useLocation } from 'react-router-dom';
import ProfileImg from '../styles/imgs/icon/ProfileImg.png'; 
import UserHomePageTemplate from './UserHomePageTemplate';

const StyledTag = styled.div`
  background-color: #2b78ff;
  padding: 0.8rem 1rem;
  border-radius: 4rem;
  font-size: 1rem;
  color: ${palette[1][0]};
  margin-right: 0.7rem;
`;

const StyledDiv = styled.div`
  position: relative;
  width: auto;
  height: 100%;

  .side__home__body {
    width: 90rem;
    height: inherit;
    position: relative;
    margin-left: 21.75rem;
  }
`;

const StyledAvatar = styled.div`
& img{
  object-fit: cover;
  height: 6rem;
  width: 6rem;
}
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  width: 10rem;
  background-color: #f7f7f7;
  border: 0.4rem solid white;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50% 50% 50% 0%;
  /* display: inline-block; */
`;

const StyledButton = styled.button`
  border: none;
  background-color: #11ffee00;
  cursor: pointer;
  padding: 0;
  font-size: 1.25rem;
  font-family: 'Pretendard Bold';
  width: 14.75rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .buttonLeft {
    display: flex;
    align-items: center;
  }

  .on {
    color: ${palette[3]};
  }
  .off {
    color: #cccccc;
  }
`;
const TokenImageButton = ({ isOn, text, img_src, to }) => {
  const history = useHistory();
  const location = useLocation();
  const onClickTogle = () => {
    if (to) {
      history.push(`/admin/${to}`);
    } else {
      history.push(location);
    }
  };
  return (
    <StyledButton onClick={onClickTogle}>
      <div className="buttonLeft">
        <img src={img_src} />
        <div className={isOn ? 'on' : 'off'}>{text}</div>
      </div>
      <img
        src={isOn ? importImg.attendChevronOn : importImg.attendChevronOff}
      />
    </StyledButton>
  );
};

const StyledSideBar = styled.div`
  margin-left: 3.93rem;
  margin-top: 8.8125rem;
  border-right: 0.01px solid ${palette[1][3]};
  position: fixed;
  left: 0;
  top: 0;
  width: 17.8125rem;
  height: 100vh;

  font-size: 1.4rem;
  font-family: 'Pretendard Regular';

  .greeting {
    font-family: 'Pretendard Medium';
    font-size: 3.25rem;
    margin-top: 3rem;
  }
  .name {
    font-family: 'Pretendard Bold';
    color: ${palette[3]};
  }
  .description {
    font-size: 18px;
    margin-top: 2rem;
  }
  .invite {
    font-size: 18px;
    margin-top: 2rem;
    color: ${palette[3]};
  }
  .tags {
    display: flex;
  }
  .properties {
    margin-top: 4rem;
  }
  .imageBtn2 {
    border: none;
    background-color: #11ffee00;
    cursor: pointer;
  }
  .sidebar__contentArea {
    position: relative;
    width: 21.25rem;
    height: inherit;
  }
  footer {
    position: absolute;
    bottom: 14.125rem;
  }
`;

const UserSidebarTemplate = ({ isAttendance, pageNum, children }) => {
  return (
    <UserHomePageTemplate location={pageNum}>
      <StyledDiv>
        <StyledSideBar>
          <div className="sidebar__contentArea">
            <StyledAvatar>
              {/* todo: 프로필 사진 */}
              <img src={ProfileImg} alt="profile" />
            </StyledAvatar>
            <div>
              <div className="greeting">
                <div className="name">동네</div>
                <div>출결 관리</div>
              </div>
              <h4 className="description">간단하고 편리하게!</h4>
            </div>
          </div>
        </StyledSideBar>
        <div className="side__home__body">{children}</div>
      </StyledDiv>
    </UserHomePageTemplate>
  );
};

export default UserSidebarTemplate;
