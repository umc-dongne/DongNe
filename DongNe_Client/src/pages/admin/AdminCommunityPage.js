import React from 'react';
import styled from 'styled-components';
import HomePageTemplate from '../../template/HomePageTemplate';
import vector from '../../styles/imgs/background/VectorHome.png';
import palette from '../../styles/pallete';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Button from '../../components/Button';
import vertical_line from '../../styles/imgs/icon/vertical_line.png';
import stand_person from '../../styles/imgs/icon/stand_person.png';
import point from '../../styles/imgs/icon/point.png';
import CommunityMembers from '../../components/CommunityMembers';
import CommunityPosts from '../../components/CommunityPosts';

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
  background: ${palette.background};

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

const WhitBox = styled.div`
  margin-top: 3rem;
  margin-left: 5rem;
  .all {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .first {
    box-sizing: border-box;
    width: 18rem;
    height: 47rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .second {
    box-sizing: border-box;
    width: 30rem;
    display: flex;
    flex-direction: column;
    padding: 1rem 3rem;
  }
  .third {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  .subtitle {
    font-family: 'Pretendard Bold';
    display: flex;
    align-items: center;
    padding-bottom: 1rem;
  }
  .list {
    font-size: 1rem;
    color: #aaaaaa;
    padding-bottom: 1.5rem;
  }

  .clublist {
    display: flex;
    flex-wrap: wrap;
  }

  .postlist {
    display: flex;
    flex-direction: column;
  }
`;

const Community = () => {
  return (
    <BackgroundImg style={{ zIndex: 0 }}>
      <HomePageTemplate location={4} style={{ zIndex: 1 }}>
        <WhitBox style={{ zIndex: 2 }}>
          <div className="all">
            <div className="first">
              <div>
                <div
                  style={{
                    fontFamily: 'Pretendard Regular',
                    fontSize: '2.5rem',
                    paddingBottom: '2rem',
                    lineHeight: '120%',
                  }}
                >
                  통합
                  <br />
                  <span
                    style={{ color: '#2B78FF', fontFamily: 'Pretendard Bold' }}
                  >
                    커뮤니티
                  </span>
                </div>
                <div className="list">▶ 자유 게시판</div>
                <div className="list">▶ 홍보 게시판</div>
                <div className="list">▶ 정보 게시판</div>
                <div className="list" style={{ paddingBottom: '6rem' }}>
                  ▶ 후기 게시판
                </div>
                <div className="list">▶ 취준생 게시판</div>
                <div className="list">▶ 운영진 게시판</div>
              </div>
              <div>
                <Button
                  text="글 작성하기 +"
                  style={{ width: '15rem', borderRadius: '0.25rem' }}
                />
              </div>
            </div>

            <img src={vertical_line} alt="" style={{ height: '45rem' }} />

            <div className="second">
              <div className="subtitle">
                <img
                  src={stand_person}
                  alt=""
                  style={{ paddingRight: '1rem' }}
                />{' '}
                활동 중인 단체 목록
              </div>
              <div className="clublist">
                <CommunityMembers
                  name="UMC"
                  explain="#IT #연합동아리"
                  people="82"
                />
                <CommunityMembers
                  name="Cluv M"
                  explain="#정동아리"
                  people="49"
                />
                <CommunityMembers
                  name="우리동네"
                  explain="#개발동아리 #FE"
                  people="29"
                />
                <CommunityMembers
                  name="Cluving"
                  explain="#스포츠동아리"
                  people="46"
                />
                <CommunityMembers
                  name="아리랑"
                  explain="#댄스동아리"
                  people="72"
                />
                <CommunityMembers
                  name="동동"
                  explain="#IT #연합동아리"
                  people="41"
                />
                <CommunityMembers
                  name="블레"
                  explain="#사진동아리"
                  people="50"
                />
                <CommunityMembers
                  name="하루살이"
                  explain="#창업동아리"
                  people="69"
                />
              </div>
            </div>

            <div className="third">
              <div className="subtitle">
                <img src={point} alt="" style={{ paddingRight: '1rem' }} /> 인기
                게시글
              </div>
              <div className="postlist">
                <CommunityPosts
                  type="후기"
                  title="Cluving 스포츠 활동 후기"
                  goodPoint="123"
                  chatPoint="222"
                  tagPoint="36"
                />
                <CommunityPosts
                  type="취준"
                  title="효과적인 동아리 운영 방법 및 정보 인수인계 팁!"
                  goodPoint="123"
                  chatPoint="222"
                  tagPoint="36"
                />
                <CommunityPosts
                  type="정보"
                  title="UMV 2기 Designer 활동 후기"
                  goodPoint="123"
                  chatPoint="222"
                  tagPoint="36"
                />
                <CommunityPosts
                  type="후기"
                  title="아리랑 댄스 동아리 6기 회원 모집! 지금 바로 신청하세요!"
                  goodPoint="123"
                  chatPoint="222"
                  tagPoint="36"
                />
                <CommunityPosts
                  type="모집"
                  title="블레 - 개발 동아리 12기 (Front End) 회원 모집"
                  goodPoint="123"
                  chatPoint="222"
                  tagPoint="36"
                />
                <CommunityPosts
                  type="후기"
                  title="블레 11기 개발자 사이드 프로젝트 후기"
                  goodPoint="123"
                  chatPoint="222"
                  tagPoint="36"
                />
                <CommunityPosts
                  type="모집"
                  title="UMC 3기 - IT 연합 동아리 회원 모집 (!22.08.26)"
                  goodPoint="123"
                  chatPoint="222"
                  tagPoint="36"
                />
                <CommunityPosts
                  type="정보"
                  title="동네 회계 장부 정리 꿀팁"
                  goodPoint="123"
                  chatPoint="222"
                  tagPoint="36"
                />
              </div>
              <Button
                text="더보기"
                style={{ width: '58rem', borderRadius: '4px' }}
              />
            </div>
          </div>
        </WhitBox>
      </HomePageTemplate>
      <footer
        style={{ position: 'absolute', bottom: '0', right: 0, zIndex: -1000 }}
      >
        <StyledImg src={vector} />
      </footer>
    </BackgroundImg>
  );
};

export default Community;
