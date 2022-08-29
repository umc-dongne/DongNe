import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import vector from '../../styles/imgs/background/VectorHome.png';
import palette from '../../styles/pallete';

import importImg from '../../styles/importImg';

import Button from '../../components/Button';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import UserHomePageTemplate from '../../template/UserHomePageTemplate';
import UserHomeSideBarTemplate from '../../template/UserHomeSideBarTemplate';
import client from '../../axiosConfig';

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
  background: ${palette[0]};

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
    margin-top: 0.3rem;
  }
`;

const StyledMiddleBox = styled.div`
  font-family: 'Pretendard Regular';
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 45rem;
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
  }
`;

const StyledMemo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: inherit;
  .li_header__title {
    font-size: 1.1rem;
    color: ${palette[4]};
  }
  .li_header__date {
    font-family: 'Pretendard Light';
    margin-top: 0.3rem;
  }
  .memo_body {
    margin-top: 1.5rem;
    width: inherit;
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
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .memo__li__content {
    margin-left: 1rem;
    width: 50%;
  }
  .memoBtn {
    margin-top: 1.3rem;
    width: inherit;
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
    margin-top: 1.1rem;
    width: 33rem;
    height: 20rem;
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
    height: 17.75rem;
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
      <div className="button">
        <Button text={'수정'}></Button>
      </div>
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
            <span>
              1.커스터마이징: 범위가 넓을것 2. 회원관리 대부분 게시판으로
            </span>
          </div>
        </li>
        <li className="memo_body__li">
          <div className="memo_li__header">
            <h1 className="li_header__title">7월 1일자 회의록</h1>
            <div className="li_header__date">2022.07.01</div>
          </div>
          <div className="memo__li__content">
            <span>
              1.커스터마이징: 범위가 넓을것 2. 회원관리 대부분 게시판으로
            </span>
          </div>
        </li>
        <li className="memo_body__li">
          <div className="memo_li__header">
            <h1 className="li_header__title">7월 1일자 회의록</h1>
            <div className="li_header__date">2022.07.01</div>
          </div>
          <div className="memo__li__content">
            <span>
              1.커스터마이징: 범위가 넓을것 2. 회원관리 대부분 게시판으로
            </span>
          </div>
        </li>
      </ul>
      <Button text={'더보기'} className="memoBtn"></Button>
    </StyledMemo>
  );
};

const Photo = () => {
  return (
    <StyledGalary>
      <div className="header">
        <div className="header__title__group">
          <img src={importImg.calenderIcon}></img>
          <div className="header__title__write">
            <h1>동네 7월 공식 일정</h1>
            <h4>날짜를 클릭하여 동아리 일정을 편리하게 추가하고 수정하세요!</h4>
          </div>
        </div>
        <button className="imageBtn">
          <img src={importImg.chevronRight}></img>
        </button>
      </div>
      <div className="galary__group">
        <div className="galary__box">갤러리 사진1 영역</div>
        <div className="galary__box">갤러리 사진2 영역</div>
      </div>
    </StyledGalary>
  );
};

const UserHomePage = () => {
  const [name, setName] = useState();
  const [clubIntroduction, setClubIntroduction] = useState();
  const [ClubName, setClubName] = useState();
  const [clubMemberCount, setClubMemberCount] = useState();
  const [establishmentYear, setEstablishmentYear] = useState();
  const [clubRegion, setClubRegion] = useState();
  const [clubWebLink, setClubWebLink] = useState();

  // api 연결
  const jwt = sessionStorage.getItem('jwtToken');
  const adminIdx = sessionStorage.getItem('adminIdx');
  const userIdx = sessionStorage.getItem('userIdx');
  useEffect(() => {
    const url =
      '/user/member/mainhome?userIdx=' + userIdx + '&adminIdx=' + adminIdx;
    client
      .get(url, {
        headers: {
          'x-access-token': jwt,
        },
      })
      .then((res) => {
        console.log(res);
        setName(res.data.result[0].name);
        setClubIntroduction(res.data.result[0].clubIntroduction);
        setClubName(res.data.result[0].ClubName);
        setClubMemberCount(res.data.result[0].clubMemberCount);
        setEstablishmentYear(res.data.result[0].establishmentYear);
        setClubRegion(res.data.result[0].clubRegion);
        setClubWebLink(res.data.result[0].clubWebLink);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <BackgroundImg>
      <UserHomePageTemplate location={0}>
        <UserHomeSideBarTemplate
          name={name}
          clubIntroduction={clubIntroduction}
          ClubName={ClubName}
          clubMemberCount={clubMemberCount}
          establishmentYear={establishmentYear}
          clubRegion={clubRegion}
          clubWebLink={clubWebLink}
        >
          <div className="homeFlex">
            <CalendarBox />
            <div className="sideBox">
              <Memo />
              <Photo />
            </div>
          </div>
        </UserHomeSideBarTemplate>
      </UserHomePageTemplate>
      <footer
        style={{ position: 'absolute', bottom: '0', right: 0, zIndex: -1000 }}
      >
        <StyledImg src={vector} />
      </footer>
    </BackgroundImg>
  );
};

export default UserHomePage;
