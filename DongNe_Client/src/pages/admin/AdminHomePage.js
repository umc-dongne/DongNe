import React from 'react';
import styled from 'styled-components';
import HomePageTemplate from '../../template/HomePageTemplate';
import vector from '../../styles/imgs/background/VectorHome.png';
import HomeSideBarTemplate from '../../template/HomeSideBarTemplate';
import palette from '../../styles/pallete';

import importImg from '../../styles/importImg';

import Button from '../../components/Button';
import EventButton from '../../components/EventButton';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const StyledImg = styled.img`
  position: fixed;
  right: 0;
  bottom: 0;
`;

const BackgroundImg = styled.div`
  font-family: 'Pretendard Regular';
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: transparent;

  h1 {
    color: ${palette[5]};
    font-size: 1.3rem;
    font-family: 'Pretendard ExtraBold';
  }
  h4 {
    font-family: 'Pretendard Regular';
  }

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
  .imageBtn {
    border: none;
    background-color: #11ffee00;
    cursor: pointer;
    padding: 0;
  }
  .homeFlex {
    margin-top: 3.125rem;
    display: flex;
    justify-content: space-around;
  }
  .sideBox {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 33.75rem;
    margin-left: 3.1rem;
  }

  .header {
    width: inherit;
    display: flex;
    justify-content: space-between;
    align-items: start;
    color: ${palette[5]};
  }
  .header__title__group {
    font-size: 1rem;
    margin-left: 1.5rem;
    display: flex;
    align-items: flex-start;
  }
  .header__title__group > img {
    position: relative;
    bottom: 0.3rem;
  }
  .header__title__write {
    margin-left: 0.6rem;
  }
  .header__title__write > h4 {
    margin-top: 0.375rem;
    font-weight: 300;
    font-size: 18px;
    line-height: 160%;
    color: ${palette[5]};
  }
`;

const StyledMiddleBox = styled.div`
  font-family: 'Pretendard Regular';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 44.6875rem;
  margin-left: 3.75rem;

  .headerDate {
    position: relative;
    bottom: 1rem;
    display: flex;
    align-items: center;
  }

  .headerDate > h1 {
    font-size: 1.1rem;
  }
  .headerDate > h4 {
    margin-top: 0.3rem;
  }
  .DayPicker {
    display: inline-block;
    font-size: 1rem;
    margin-top: 3rem;
  }
  .button {
    margin-top: 3rem;
    width: 600px;
    height: 48px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
`;

const StyledMemo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
  .li_header__title {
    font-weight: 700;
    font-size: 18px;
    line-height: 21px;
    color: ${palette[4]};
  }
  .li_header__date {
    font-family: 'Pretendard Light';
    font-weight: 300;
    font-size: 14px;
    line-height: 160%;
    margin-top: 0.125rem;
    color: ${palette[5]};
  }
  .memo_body {
    margin-top: 1.5rem;
    margin-left: 3rem;
    width: 33rem;
    padding: 1.4rem 0rem;
    border-radius: 1rem;
    background: linear-gradient(
      180deg,
      #fbfbfb 0%,
      rgba(251, 251, 251, 0) 100%
    );
    backdrop-filter: blur(10rem);
  }
  .memo_body__li {
    margin-left: 1rem;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .memo__li__content {
    font-weight: 300;
    font-size: 14px;
    line-height: 160%;
    margin-left: 1rem;
    width: 20.5625rem;
    color: ${palette[5]};
  }
  .memoBtn {
    margin-left: 3rem;
    margin-top: 1.3rem;
    width: 530px;
    height: 48px;
    font-weight: 700;
    font-size: 20px;
    line-height: 24px;
  }
  .memo__header__icons > button:first-child {
    margin-right: 1rem;
  }
`;

const StyledGalary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
  margin-top: 1.1rem;

  .galary__group {
    margin-left: 3rem;
    margin-top: 1.1rem;
    width: 33rem;
    height: 17rem;
    background-color: wheat;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    background: linear-gradient(
      180deg,
      #fbfbfb 0%,
      rgba(251, 251, 251, 0) 100%
    );
    backdrop-filter: blur(10rem);
  }
  .galary__box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14.125rem;
    height: 15rem;
    background: #f7f7f7;
    opacity: 0.6;
    border-radius: 0.7rem;
  }
  .galary__box:first-child {
    margin-right: 1.125rem;
  }
`;

const CalendarBox = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const myEventsList = [
    { start: new Date(), end: new Date(), title: 'special event' },
  ];

  return (
    <StyledMiddleBox>
      <div className="header">
        <div className="header__title__group">
          <img src={importImg.calenderIcon}></img>
          <div className="header__title__write">
            <h1>동네 7월 공식 일정</h1>
            <h4>날짜를 클릭하여 동아리 일정을 편리하게 추가하고 수정하세요!</h4>
          </div>
        </div>

        <div className="headerDate">
          <button className="imageBtn">
            <img src={importImg.chevronLeft}></img>
          </button>
          <h1>2022.07</h1>
          <button className="imageBtn">
            <img src={importImg.chevronRight}></img>
          </button>
        </div>
      </div>
      <div className="DayPicker">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          style={{ height: 500 }}
        />
      </div>
      <EventButton text={'수정하기'} className="button"></EventButton>
    </StyledMiddleBox>
  );
};

const Memo = () => {
  return (
    <StyledMemo>
      <div className="header">
        <div className="header__title__group">
          <img src={importImg.homeMemo} />
          <div className="header__title__write">
            <h1>동네 관리 메모장</h1>
            <h4>잊을 법한 내용을 정리하고 기억하세요.</h4>
          </div>
        </div>
        <div className="memo__header__icons">
          <button className="imageBtn">
            <img src={importImg.homeCreate} />
          </button>

          <button className="imageBtn">
            <img src={importImg.homeSetting} />
          </button>
        </div>
      </div>
      <ul className="memo_body">
        <li className="memo_body__li">
          <div className="memo_li__header">
            <h1 className="li_header__title">7월 1일자 회의록</h1>
            <div className="li_header__date">2022.07.01</div>
          </div>
          <div className="memo__li__content">
            <div>1.커스터마이징: 범위가 넓을것</div>
            <div>2. 회원관리 대부분 게시판으로</div>
          </div>
        </li>
        <li className="memo_body__li">
          <div className="memo_li__header">
            <h1 className="li_header__title">핀테크 스터디</h1>
            <div className="li_header__date">2022.07.08</div>
          </div>
          <div className="memo__li__content">
            <div>https://nomadcoders.co/react-for-beginners</div>
            <div>ReactJS로 영화 웹 서비스 만들기</div>
          </div>
        </li>
        <li className="memo_body__li">
          <div className="memo_li__header">
            <h1 className="li_header__title">디자이너 초청건</h1>
            <div className="li_header__date">2022.07.12</div>
          </div>
          <div className="memo__li__content">
            <div>
              1차 멘토링 기간은 금주 목요일, 금요일에 진행될 예정입니다.
            </div>
            <div>각각 iOS는 목요일, AOS는 미정, Web과 Server - Sprin...</div>
          </div>
        </li>
      </ul>
      <EventButton text={'더보기'} className="memoBtn"></EventButton>
    </StyledMemo>
  );
};

const Photo = () => {
  return (
    <StyledGalary>
      <div className="header">
        <div className="header__title__group">
          <img src={importImg.photo}></img>
          <div className="header__title__write">
            <h1>동네 최근 활동</h1>
            <h4>최근의 동아리 활동을 살펴보세요!</h4>
          </div>
        </div>
        <button className="imageBtn">
          <img src={importImg.arrowForward}></img>
        </button>
      </div>
      <div className="galary__group">
        <div className="galary__box">갤러리 사진1 영역</div>
        <div className="galary__box">갤러리 사진2 영역</div>
      </div>
    </StyledGalary>
  );
};

const AdminHomePage = () => {
  return (
    <BackgroundImg>
      <HomePageTemplate location={0}>
        <HomeSideBarTemplate>
          <div className="homeFlex">
            <CalendarBox />
            <div className="sideBox">
              <Memo />
              <Photo />
            </div>
          </div>
        </HomeSideBarTemplate>
      </HomePageTemplate>
      <footer
        style={{ position: 'absolute', bottom: '0', right: 0, zIndex: -1000 }}
      >
        <StyledImg src={vector} />
      </footer>
    </BackgroundImg>
  );
};

export default AdminHomePage;
