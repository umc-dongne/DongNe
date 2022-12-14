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
import UserNavigator from '../../components/user/UserNavigator';

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
    margin-top: 8rem;
    margin-left:5rem;
    .all{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .first{
        box-sizing: border-box;
        width: 18rem;
        height: 47rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .second{
        box-sizing: border-box;
        width: 30rem;
        display: flex;
        flex-direction: column;
        padding: 1rem 3rem;
    }
    .third{
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    .subtitle{
        font-family: "Pretendard Bold";
        display: flex;
        align-items: center;
        padding-bottom: 1rem;
    }
    .list{
        font-size: 1rem;
        color: #AAAAAA;
        padding-bottom: 1.5rem;
    }

    .clublist{
        display: flex;
        flex-wrap: wrap;
    }

    .postlist{
        display: flex;
        flex-direction: column;
    }
`


const Community = () => {
  return (
    <BackgroundImg style={{ zIndex: 0 }}>
      <UserNavigator location={3} style={{ zIndex: 1 }} />
        <WhitBox style={{ zIndex: 2 }}>
            <div className='all'>
                <div className='first'>
                    <div>
                        <div style={{fontFamily: "Pretendard Regular", fontSize:"2.5rem", paddingBottom:"2rem", lineHeight:"120%"}}
                            >??????<br/><span style={{color:"#2B78FF", fontFamily: "Pretendard Bold"}}>????????????</span>
                        </div>
                        <div className='list'>??? ?????? ?????????</div>
                        <div className='list'>??? ?????? ?????????</div>
                        <div className='list'>??? ?????? ?????????</div>
                        <div className='list' style={{paddingBottom:"6rem"}}>??? ?????? ?????????</div>
                        <div className='list'>??? ????????? ?????????</div>
                        <div className='list'>??? ????????? ?????????</div>
                    </div>
                    <div>
                        <Button text="??? ???????????? +" style={{width:"15rem", borderRadius:"4px"}}/>
                    </div>
                </div>

                <img src={vertical_line} alt="" style={{height: "45rem"}}/>
                
                <div className='second'>
                    <div className='subtitle'>
                        <img src={stand_person} alt="" style={{paddingRight:"1rem"}} /> ?????? ?????? ?????? ??????
                    </div>
                    <div className='clublist'>
                        <CommunityMembers name="UMC" explain="#IT #???????????????" people="82" />
                        <CommunityMembers name="Cluv M" explain="#????????????" people="49" />
                        <CommunityMembers name="????????????" explain="#??????????????? #FE" people="29" />
                        <CommunityMembers name="Cluving" explain="#??????????????????" people="46" />
                        <CommunityMembers name="?????????" explain="#???????????????" people="72" />
                        <CommunityMembers name="??????" explain="#IT #???????????????" people="41" />
                        <CommunityMembers name="??????" explain="#???????????????" people="50" />
                        <CommunityMembers name="????????????" explain="#???????????????" people="69" />
                    </div>
                </div>

                <div className='third'>
                    <div className='subtitle'>
                        <img src={point} alt="" style={{paddingRight:"1rem"}} /> ?????? ?????????
                    </div>
                    <div className='postlist'>
                            <CommunityPosts type="??????" title="Cluving ????????? ?????? ??????" goodPoint="123" chatPoint="222" tagPoint="36"/>
                        <CommunityPosts type="??????" title="???????????? ????????? ?????? ?????? ??? ?????? ???????????? ???!" goodPoint="123" chatPoint="222" tagPoint="36"/>
                        <CommunityPosts type="??????" title="UMV 2??? Designer ?????? ??????" goodPoint="123" chatPoint="222" tagPoint="36"/>
                        <CommunityPosts type="??????" title="????????? ?????? ????????? 6??? ?????? ??????! ?????? ?????? ???????????????!" goodPoint="123" chatPoint="222" tagPoint="36"/>
                        <CommunityPosts type="??????" title="?????? - ?????? ????????? 12??? (Front End) ?????? ??????" goodPoint="123" chatPoint="222" tagPoint="36"/>
                        <CommunityPosts type="??????" title="?????? 11??? ????????? ????????? ???????????? ??????" goodPoint="123" chatPoint="222" tagPoint="36"/>
                        <CommunityPosts type="??????" title="UMC 3??? - IT ?????? ????????? ?????? ?????? (!22.08.26)" goodPoint="123" chatPoint="222" tagPoint="36"/>
                        <CommunityPosts type="??????" title="?????? ?????? ?????? ?????? ??????" goodPoint="123" chatPoint="222" tagPoint="36"/>
                    </div>
                    <Button text="?????????" style={{width: "58rem", borderRadius:"4px"}} />
                </div>
            </div>
        </WhitBox>
      <footer
        style={{ position: 'absolute', bottom: '0', right: 0, zIndex: -1000 }}
      >
        <StyledImg src={vector} />
      </footer>
    </BackgroundImg>
  );
};

export default Community;
