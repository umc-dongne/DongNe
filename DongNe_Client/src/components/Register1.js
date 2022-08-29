import React, { useState, useEffect } from 'react';
import Email from '../styles/imgs/icon/Email.png';
import Lock from '../styles/imgs/icon/Lock.png';
import line from '../styles/imgs/icon/line.png';
import Button from '../components/Button';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import palette from '../styles/pallete';

const WhiteBox = styled.div`
  width: 45rem;
  height: 35rem;
  border-radius: 0.625rem;
  padding-left: 3rem;
  padding-right: 3rem;
  font-size: 1rem;

  background: linear-gradient(180deg, #ffffff 0%, rgba(251, 251, 251, 0) 100%);
  border: 0.125rem solid rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(2.5rem);
  /* Note: backdrop-filter has minimal browser support */

  color: #2d3b5c;

  & img {
    padding-right: 0.5rem;
    width: 1.5rem;
  }

  .inputInformation {
    display: flex;
    align-items: center;
    font-weight: bold;
    padding-bottom: 0.3rem;
  }

  .information {
    font-size: 0.8rem;
    outline: none;
    ::placeholder {
      padding: 0.3rem;
      color: #aaaaaa;
    }
  }

  .outline {
    padding-top: 1rem;
    padding-bottom: 0.8rem;
  }

  .check {
    display: flex;
    flex-direction: row;
  }

  .idcheck {
    padding-left: 1rem;
  }

  .bigoutline {
    padding-top: 1.5rem;
  }

  .lineUp {
    padding-bottom: 8rem;
  }
`;

function Register1(props) {
  const history = useHistory();
  const nextlink = props.nextlink;

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwcheck, setPwcheck] = useState('');
  const [Ok, setOk] = useState(false);

  useEffect(() => {
    if (id && pw && pwcheck) {
      if (pw === pwcheck) {
        setOk(true);
      } else {
        setOk(false);
      }
    } else {
      setOk(false);
    }
  }, [id, pw, pwcheck]);

  const nextpage = props.nextpage;
  const presentpage = props.presentpage;

  return (
    <WhiteBox>
      <div className="bigoutline">
        <div className="lineUp">
          <div className="outline">
            <div className="inputInformation">
              <img src={Email} alt="" />
              아이디 &nbsp; <span style={{ color: palette[3] }}>(필수)</span>
            </div>
            <div className="check">
              <input
                onChange={(e) => {
                  setId(e.target.value);
                }}
                value={id}
                type={'text'}
                className="information"
                placeholder="ex) abcdefg@naver.com"
                style={{
                  width: '37.7rem',
                  height: '2.5rem',
                  backgroundColor: '#F3F3F3',
                  border: 'none',
                  borderRadius: '0.1875rem',
                }}
              />
              <div className="idcheck">
                <Button
                  text="중복확인"
                  fullWidth
                  style={{
                    height: '2.5rem',
                    width: '6rem',
                    borderRadius: '0.1875rem',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="outline">
            <div className="inputInformation">
              <img src={Lock} alt="" /> 비밀번호 &nbsp;{' '}
              <span style={{ color: palette[3] }}>(필수)</span>
            </div>
            <div>
              <input
                onChange={(e) => {
                  setPw(e.target.value);
                }}
                value={pw}
                type={'password'}
                className="information"
                placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."
                style={{
                  width: '44.7rem',
                  height: '2.5rem',
                  backgroundColor: '#F3F3F3',
                  border: 'none',
                  borderRadius: '0.1875rem',
                }}
              />
            </div>
          </div>

          <div className="outline">
            <div className="inputInformation">
              <img src={Lock} alt="" /> 비밀번호 확인 &nbsp;{' '}
              <span style={{ color: palette[3] }}>(필수)</span>
            </div>
            <div>
              <input
                onChange={(e) => {
                  setPwcheck(e.target.value);
                }}
                value={pwcheck}
                type={'password'}
                style={{
                  width: '44.7rem',
                  height: '2.5rem',
                  backgroundColor: '#F3F3F3',
                  border: 'none',
                  borderRadius: '0.1875rem',
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ paddingTop: '1rem' }}>
          {Ok ? (
            <Button
              text="다음으로"
              fullWidth
              history={history}
              to={nextpage}
              props={{ id: id, pw: pw }}
              style={{ height: '2.7rem', borderRadius: '0.1875rem' }}
            />
          ) : (
            <Button
              text="다음으로"
              fullWidth
              history={history}
              to={presentpage}
              style={{ height: '2.7rem', borderRadius: '0.1875rem' }}
            />
          )}
        </div>
      </div>
    </WhiteBox>
  );
}

export default Register1;
