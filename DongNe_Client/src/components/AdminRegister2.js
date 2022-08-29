import React, { useState, useEffect } from 'react';
import category from '../styles/imgs/icon/category_add.png';
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

  color: #2d3b5c;

  & img {
    padding-right: 0.5rem;
    width: 1.5rem;
  }

  .inputInformation {
    display: flex;
    align-items: center;
    font-weight: bold;
    padding-bottom: 0.8rem;
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
    padding-bottom: 1.2rem;
    padding-right: 1.8rem;
  }

  .check {
    display: flex;
    flex-direction: row;
  }

  .bigoutline {
    padding-top: 2rem;
  }

  .twin {
    display: flex;
    flex-direction: row;
  }
`;

function AdminRegister2(props) {
  const history = useHistory();
  const nextlink = props.nextlink;
  const location = useLocation();

  const [group, setGroup] = useState('');
  const [year, setYear] = useState('');
  const [area, setArea] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [url, setUrl] = useState('');
  const [Ok, setOk] = useState(false);

  const nextpage = props.nextpage;
  const presentpage = props.presentpage;

  useEffect(() => {
    if (group && year && area && introduce && url) {
      setOk(true);
    } else {
      setOk(false);
    }

    if (group && year && area && introduce) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [group, year, area, introduce, url]);

  const handleApi = async () => {
    const result = await axios.post(`${API}/admin/auth/register`, {
      clubName: group,
      adminEmail: location.state.props.id,
      adminPwd: location.state.props.pw,
      establishmentYear: year,
      clubRegion: area,
      clubIntroduction: introduce,
      clubWebLink: url,
      clubImgUrl: 'img',
    });
    console.log(result);
    const value = result.data;
    if (value.isSuccess) {
      alert('회원가입이 완료되었습니다!');
    } else {
      alert(value.message);
    }
    // const res  = await  Axios.post({
    //     url: {"http://3.38.55.57:3000"}
    // })
  };

  return (
    <WhiteBox>
      <div className="bigoutline">
        <div className="twin">
          <div className="outline">
            <div className="inputInformation">
              <div>
                단체 이름 &nbsp;{' '}
                <span style={{ color: palette[3] }}>(필수)</span>
              </div>
            </div>
            <div className="check">
              <input
                onChange={(e) => {
                  setGroup(e.target.value);
                }}
                value={group}
                type={'text'}
                className="information"
                placeholder="이름을 입력하세요."
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
              <div>
                단체 카테고리&nbsp;{' '}
                <span style={{ color: palette[3] }}>(필수)</span>{' '}
              </div>
            </div>
            <div>
              <img
                src={category}
                alt=""
                style={{ width: '5rem', paddingBottom: '1rem' }}
              />
            </div>
          </div>
        </div>

        <div className="twin">
          <div className="outline">
            <div className="inputInformation">
              <div>
                단체 설립 연도 &nbsp;{' '}
                <span style={{ color: palette[3] }}>(필수)</span>
              </div>
            </div>
            <div className="check">
              <input
                onChange={(e) => {
                  setYear(e.target.value);
                }}
                value={year}
                className="information"
                placeholder="ex) 2022-02-02"
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
              <div>
                단체 주 활동 지역&nbsp;{' '}
                <span style={{ color: palette[3] }}>(필수)</span>{' '}
              </div>
            </div>
            <div>
              <input
                onChange={(e) => {
                  setArea(e.target.value);
                }}
                value={area}
                type={'text'}
                className="information"
                placeholder="지역을 입력하세요."
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

        <div className="outline">
          <div className="inputInformation">
            <div>
              단체 소개 &nbsp; <span style={{ color: palette[3] }}>(필수)</span>
            </div>
          </div>
          <div>
            <textarea
              onChange={(e) => {
                setIntroduce(e.target.value);
              }}
              value={introduce}
              type={'text'}
              style={{
                width: '44.7rem',
                height: '6rem',
                backgroundColor: '#F3F3F3',
                border: 'none',
                borderRadius: '0.1875rem',
                resize: 'none',
                outline: 'none',
              }}
            />
          </div>
        </div>

        <div className="outline">
          <div className="inputInformation">
            <div>
              {' '}
              단체 사이트 / 채널 URL &nbsp;
              <span style={{ color: palette[3] }}>(선택)</span>
            </div>
          </div>
          <div>
            <input
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              placeholder="http://"
              value={url}
              type={'text'}
              className="information"
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
        {/* <div onClick={()=>{
                    handleApi();
                }}>가입 완료하기</div> */}

        <div style={{ paddingTop: '1rem' }} onClick={handleApi}>
          <Button
            text="가입 완료하기"
            fullWidth
            history={history}
            to="/"
            style={{ height: '2.7rem', borderRadius: '3px' }}
          />
        </div>
      </div>
    </WhiteBox>
  );
}

export default AdminRegister2;
