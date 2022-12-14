import React, { useEffect, useState } from 'react';
import BackgroundTemplate from '../../template/BackgroundTemplate';
import Button from '../../components/Button';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import { Link, useHistory } from 'react-router-dom';
import client from '../../axiosConfig';
import EventButton from '../../components/EventButton';
import importImg from '../../styles/importImg';

const StyledImg = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
`;
const WhiteBox = styled.div`
  position: relative;
  width: 50vh;

  text-align: center;
  font-family: 'Pretendard Regular';
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
    margin-left: 0.5rem;
  }
  .styledForm {
    flex-direction: column;
    display: flex;
    text-align: center;
  }
  .styledForm > input {
    margin-bottom: 1rem;
    background-color: transparent;
    border: none;
    border-bottom: 0.001rem ${palette[3]} solid;
    box-sizing: border-box;
    outline: none;
    height: 4.5rem;
  }
  .eventButton {
    width: inherit;
    height: 4.5rem;
  }
  .links {
    margin-top: 1.2344rem;
  }
`;

const UserLoginPage = () => {
  const [inputId, setInputId] = useState('');
  const history = useHistory();
  const [inputPw, setInputPw] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const fetchData = async () => {
    console.log(inputId, inputPw);
    await client
      .post('/user/auth/login', {
        userEmail: inputId,
        password: inputPw,
      })
      .then(function (response) {
        console.log(response.data);
        if (!response.data.isSuccess) {
          alert(response.data.message);
          return setIsLogin(false);
        }
        sessionStorage.setItem('jwtToken', response.data.result.jwt);
        sessionStorage.setItem('userIdx', response.data.result.userId);
        return setIsLogin(true);
      })
      .catch(function (error) {
        alert(error);
        return setIsLogin(false);
      });
  };

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = async () => {
    await fetchData();
    console.log(isLogin);
    return;
  };

  useEffect(() => {
    if (isLogin) {
      history.push({
        pathname: '/user/main',
      });
    }
  }, [isLogin]);

  return (
    <div>
      <BackgroundTemplate style={{ zIndex: 0 }}>
        <WhiteBox style={{ zIndex: 1 }}>
          <div className="Logo">
            <img src={importImg.Logo} />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            ????????? ????????? ?????? ????????????, ??????
          </div>
          <div className="ExtraBold" style={{ marginBottom: '2rem' }}>
            USER-LOG-IN
          </div>
          <div>
            <form className="styledForm">
              <input
                type="text"
                name="input_id"
                value={inputId}
                onChange={handleInputId}
                placeholder="?????????"
              ></input>
              <input
                type="password"
                name="input_pw"
                value={inputPw}
                onChange={handleInputPw}
                placeholder="????????????"
              ></input>
              <div className="eventButton">
                <EventButton
                  text="?????????"
                  type="button"
                  onClick={() => onClickLogin()}
                  img_src={null}
                  fullWidth
                  history={history}
                  style={{ marginBottom: '1rem' }}
                />
              </div>
            </form>
            <div className="links">
              <Link to="/register" className="Link">
                ????????????
              </Link>
              <Link to="/user/login" className="Link">
                ???????????? ??????
              </Link>
            </div>
          </div>
        </WhiteBox>
        <div style={{ position: 'absolute', top: '-11rem', right: '0' }}>
          <StyledImg src={importImg.character} />
        </div>
        <div style={{ position: 'absolute', top: '108px', left: '0' }}>
          <StyledImg src={importImg.plane} />
        </div>
      </BackgroundTemplate>
    </div>
  );
};

export default UserLoginPage;
