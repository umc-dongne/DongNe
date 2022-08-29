import React, { useState, useEffect } from 'react';
import Email from '../styles/imgs/icon/Email.png';
import Lock from '../styles/imgs/icon/Lock.png';
import Button from './Button';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import palette from '../styles/pallete';
import axios from 'axios';
import { API } from '../axiosConfig';

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
    padding-bottom: 1rem;
    padding-right: 1.8rem;
  }

  .check {
    display: flex;
    flex-direction: row;
  }

  .search {
    padding-left: 0.5rem;
  }

  .bigoutline {
    padding-top: 1.5rem;
  }

  .twin {
    display: flex;
    flex-direction: row;
  }

  .list {
    padding-bottom: 1rem;
  }
`;

function UserRegister2(props) {
  const history = useHistory();
  const nextlink = props.nextlink;
  const location = useLocation();

  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [school, setSchool] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selfintro, setSelfintro] = useState('');
  const [Ok, setOk] = useState(false);

  useEffect(() => {
    if (name && birth && school && phone && address && selfintro) {
      setOk(true);
    } else {
      setOk(false);
    }

    if (name && birth && school && phone && address) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [name, birth, school, phone, address, selfintro]);

  const nextpage = props.nextpage;
  const presentpage = props.presentpage;

  const handleApi = async () => {
    const result = await axios.post(`${API}/user/auth/register`, {
      name: name,
      userEmail: location.state.props.id,
      password: location.state.props.pw,
      phoneNum: phone,
      school: school,
      birth: birth,
      address: address,
      introduction: selfintro,
      userImgUrl: 'Image',
    });
    console.log(result);
    const value = result.data;
    if (value.isSuccess) {
      alert('회원가입이 완료되었습니다!');
    } else {
      alert(value.message);
    }
  };

  return (
    <WhiteBox>
      <div className="bigoutline">
        <div className="list">
          <div className="twin">
            <div className="outline">
              <div className="inputInformation">
                <img src={Email} alt="" />
                이름&nbsp; <span style={{ color: palette[3] }}>(필수)</span>
              </div>
              <div className="check">
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type={'text'}
                  className="information"
                  placeholder="예) 김동네"
                  style={{
                    width: '21.2rem',
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
                <img src={Email} alt="" />
                생년월일&nbsp; <span style={{ color: palette[3] }}>(필수)</span>
              </div>
              <div className="check">
                <input
                  onChange={(e) => {
                    setBirth(e.target.value);
                  }}
                  value={birth}
                  className="information"
                  placeholder="ex) 2001-01-01"
                  style={{
                    width: '21.2rem',
                    height: '2.5rem',
                    backgroundColor: '#F3F3F3',
                    border: 'none',
                    borderRadius: '0.1875rem',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="list">
          <div className="twin">
            <div className="outline">
              <div className="inputInformation">
                <img src={Lock} alt="" />
                학교&nbsp; <span style={{ color: palette[3] }}>(필수)</span>
              </div>
              <div className="check">
                <input
                  onChange={(e) => {
                    setSchool(e.target.value);
                  }}
                  value={school}
                  type={'text'}
                  className="information"
                  placeholder="재학중인 학교를 입력해주세요."
                  style={{
                    width: '15.7rem',
                    height: '2.5rem',
                    backgroundColor: '#F3F3F3',
                    border: 'none',
                    borderRadius: '0.1875rem',
                  }}
                />
                <div className="search">
                  <Button
                    text="학교검색"
                    fullWidth
                    // history={history}
                    // to={nextlink}
                    style={{
                      height: '2.5rem',
                      width: '5rem',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="outline">
              <div className="inputInformation">
                <img src={Email} alt="" />
                전화번호&nbsp; <span style={{ color: palette[3] }}>(필수)</span>
              </div>
              <div className="check">
                <input
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                  type={'number'}
                  className="information"
                  placeholder="ex) 010xxxxxxxx"
                  style={{
                    width: '21.2rem',
                    height: '2.5rem',
                    backgroundColor: '#F3F3F3',
                    border: 'none',
                    borderRadius: '0.1875rem',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="list">
          <div className="inputInformation">
            <img src={Lock} alt="" />
            주소&nbsp; <span style={{ color: palette[3] }}>(필수)</span>
          </div>
          <div className="check">
            <input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
              type={'text'}
              className="information"
              style={{
                width: '38rem',
                height: '2.5rem',
                backgroundColor: '#F3F3F3',
                border: 'none',
                borderRadius: '0.1875rem',
              }}
            />
            <div className="search">
              <Button
                text="주소검색"
                fullWidth
                // history={history}
                // to={nextlink}
                style={{ height: '2.5rem', width: '6rem', borderRadius: '3px' }}
              />
            </div>
          </div>
        </div>

        <div className="list">
          <div className="outline">
            <div className="inputInformation">
              <div>
                한 줄 소개 &nbsp;{' '}
                <span style={{ color: '#AAAAAA' }}>(선택)</span>
              </div>
            </div>
            <div>
              <textarea
                onChange={(e) => {
                  setSelfintro(e.target.value);
                }}
                value={selfintro}
                type={'text'}
                style={{
                  width: '44.7rem',
                  height: '3.5rem',
                  backgroundColor: '#F3F3F3',
                  border: 'none',
                  borderRadius: '0.1875rem',
                  resize: 'none',
                }}
              />
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            handleApi();
          }}
          style={{ paddingTop: '1rem' }}
        >
          <Button
            text="가입 완료하기"
            fullWidth
            history={history}
            to="/"
            props={{ id: location.state.props.id, pw: location.state.props.pw }}
            style={{ height: '2.7rem', borderRadius: '3px' }}
          />
        </div>
      </div>
    </WhiteBox>
  );
}

export default UserRegister2;
