import React from 'react';
import BackgroundTemplate from '../template/BackgroundTemplate';
import styled from 'styled-components';
import palette from '../styles/pallete';
import RegisterSelect from '../components/RegisterSelect';
import userLoginIcon from '../styles/imgs/icon/Admin_blue.png';
import adminLoginIcon from '../styles/imgs/icon/User_blue.png';
import ArrowBackIcon from '../styles/imgs/icon/Arrow_back.png';
import Logo from '../styles/imgs/icon/Logo.png';
import { Link } from 'react-router-dom';

// import Button from '../components/Button';


const WhiteBox = styled.div`
  position: relative;
  text-align: center;
  font-family: 'Pretendard Regular';
  font-size: 1rem;
  color: ${palette[3]};

  .arrowIcon {
    position: absolute;
    left: 0.625rem;
    top: 5.8rem;
    width:2.5rem;
    height:2.5rem;
  } 

  .Logo {
    width: 2rem;
    padding-bottom:0.5rem;
  }

  .ExtraBold {
    font-family: 'Pretendard ExtraBold';
    font-size: 2rem;
  }

  .size{
    width: 50rem;
    height: 40rem;
  }
  .Square{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }

`;



const AdminRegisterPage = () => {
  return (
    <BackgroundTemplate style={{ zIndex: 0 }}>
        <WhiteBox style={{ zIndex: 1 }}>
          <Link to="/"><img src={ArrowBackIcon} alt='' className='arrowIcon' /></Link>
        <img src={Logo} className="Logo" />
        <div style={{ marginBottom: '2rem', color: "#2B78FF"}}>
          동아리 관리를 더욱 간편하게, 동네
        </div>
        <div className='size'>
          <div className="ExtraBold" style={{ marginBottom: '2rem' }}>
            회원 가입
          </div>
          <div className='Square'>
              <RegisterSelect 
                style={{ zindex: 1 }} 
                title="단체 회원"
                subtitle="그룹 운영자 및 임원진"
                img_src={adminLoginIcon}
                text1="⦁ 회원 관리"
                text2="⦁ 출결 관리"
                text3="⦁ 회계 관리"
                text4="⦁ 동아리 홍보"
                explain={["일정 관리 및 다양한 동아리 활동들을",<br/>,"편리하게 관리하세요!"]}              
                nextlink="/admin/register/check1" />
              <RegisterSelect 
                style={{ zindex: 1 }}
                title="일반 회원"
                subtitle="대학생, 취준생, 직장인 등"
                img_src={userLoginIcon} 
                text1="⦁ 친목 도모"
                text2="⦁ 자기 개발"
                text3="⦁ 출석 체크"
                text4="⦁ 동아리 홍보"
                explain="다양한 동아리들을 살펴보고 가입하세요!"
                nextlink="/user/register/check1" />
        </div>
        </div>
        </WhiteBox>
    </BackgroundTemplate>
  );
};

export default AdminRegisterPage;