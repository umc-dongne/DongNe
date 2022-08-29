import React from 'react';
import styled from 'styled-components';
import BackgroundTemplate from './BackgroundTemplate';
import Button from '../components/Button';
import palette from '../styles/pallete';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// img
import userLoginIcon from '../styles/imgs/icon/login_user_icon.png';
import adminLoginIcon from '../styles/imgs/icon/login_admin_icon.png';
import importImg from '../styles/importImg';

const StyledImg = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
`;

const WhiteBox = styled.div`
  position: relative;
  width: 50vh;

  text-align: center;
  font-family: 'Pretendard Medium';
  font-size: 1rem;
  color: ${palette[3]};
  //width: 33%;

  .ExtraBold {
    font-family: 'Pretendard ExtraBold';
    font-size: 2rem;
  }

  .Logo {
    font-family: 'Pretendard Medium';
    color: #3333;
    margin-bottom: 1rem;
  }
  .Link {
    color: ${palette[3]};
  }
`;

const LoginLandingTemplate = () => {
  const history = useHistory();

  return (
    <BackgroundTemplate style={{ zIndex: 0 }}>
      <WhiteBox style={{ zIndex: 1 }}>
        <div className="Logo">
          <img src={importImg.Logo} />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          동아리 관리를 더욱 간편하게, 동네
        </div>
        <div className="ExtraBold" style={{ marginBottom: '2rem' }}>
          LOG-IN
        </div>
        <Button
          text="일반 회원 로그인"
          img_src={userLoginIcon}
          fullWidth
          history={history}
          to="/user/login"
          style={{ marginBottom: '1rem' }}
        />
        <Button
          text="단체 회원 로그인"
          img_src={adminLoginIcon}
          fullWidth
          history={history}
          to="admin/login"
        />
        <Link to="/register" className="Link">
          회원이 아니신가요? 회원가입
        </Link>
      </WhiteBox>
      <div style={{ position: 'absolute', top: '-11rem', right: '0' }}>
        <StyledImg src={importImg.character} />
      </div>
      <div style={{ position: 'absolute', top: '6.75rem', left: '0' }}>
        <StyledImg src={importImg.plane} />
      </div>
    </BackgroundTemplate>
  );
};

export default LoginLandingTemplate;
