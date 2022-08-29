import React, { useState, useEffect } from 'react';
import Lock from '../styles/imgs/icon/Lock.png';
import person from '../styles/imgs/icon/person.png';
import profile from '../styles/imgs/icon/profile.png';
import Button from './Button';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import line from '../styles/imgs/icon/line.png';
import setting from '../styles/imgs/icon/setting.png';
import axios from 'axios';
import { API } from '../axiosConfig';
import ProfileImg from '../styles/imgs/icon/ProfileImg.png';

const WhiteBox = styled.div`
  width: 65rem;
  height: 42rem;
  border-radius: 1.75rem;
  font-size: 1rem;
  padding-top: 3rem;

  .frame {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .text {
    font-size: 2rem;
    text-align: center;
    font-family: 'Pretendard Medium';
    display: flex;
    justify-content: flex-start;
    padding-bottom: 2rem;
  }

  .name {
    font-family: 'Pretendard Bold';
    color: #2b78ff;
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .part1 {
    display: flex;
    flex-direction: column;
    padding-right: 5rem;
    line-height: 200%;
  }
  .part2 {
    width: 50rem;
    display: flex;
    flex-direction: column;
  }

  .settingIcon {
    position: absolute;
    width: 2.8rem;
    top: 15rem;
    left: 30rem;
  }
  .icon {
    padding-right: 0.5rem;
    width: 2rem;
  }

  .between {
    padding-right: 1rem;
  }
  .Basic {
    display: flex;
    align-items: center;
    padding-bottom: 0.8rem;
  }

  .category {
    width: 7rem;
    font-family: 'Pretendard ExtraBold';
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
  }

  .categoryItem {
    height: 2rem;
    background: #2b78ff;
    border-radius: 2.5rem;
    font-family: 'Pretendard';
    font-size: 1rem;
    color: #cee7f6;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    margin-right: 0.5rem;
  }

  .information {
    font-size: 0.9rem;
    outline: none;
    padding-left: 1rem;
  }

  .btnStlye {
    padding-left: 5rem;
  }

  .timeCheck {
    font-size: 0.8rem;
    position: absolute;
    right: 24rem;
    top: 4rem;
  }
`;
const StyledAvatar = styled.div`
  & img {
    object-fit: cover;
    height: 6rem;
    width: 6rem;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  width: 10rem;
  background-color: #f7f7f7;
  border: 0.4rem solid white;
  box-shadow: rgba(100, 100, 111, 0.2) 0rem 0.4375rem 1.8125rem 0rem;
  border-radius: 50% 50% 50% 0%;
`;

function Mypage(props) {
  const history = useHistory();

  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [area, setArea] = useState('');
  const [url, setUrl] = useState('');
  const [intro, setIntro] = useState('');
  const [change, setChange] = useState(false);
  const [storage, setStorage] = useState(false);
  const [clubs, setClubs] = useState('');
  const [time, setTime] = useState('');

  const handleApi = async () => {
    if (change) {
      const result = await axios.patch(
        `${API}/admin/member/mypage?adminIdx=${adminIdx}`,
        {
          clubName: name,
          establishmentYear: year,
          clubRegion: area,
          clubWebLink: url,
          clubIntroduction: intro,
          clubCategoryIdx: 1,
        },
        {
          headers: {
            'x-access-token': jwtToken,
          },
        },
      );

      console.log(result);

      const value = result.data;
      if (value.isSuccess) {
        alert('수정이 완료되었습니다!');
      } else {
        alert(value.message);
      }

      setChange(false);
    } else {
      setChange(true);
    }
  };

  const jwtToken = sessionStorage.getItem('jwtToken');
  const adminIdx = sessionStorage.getItem('adminIdx');
  const memberName = props.memberName;

  const infoApi = async () => {
    const result = await axios.get(
      `${API}/admin/member/mypage?adminIdx=${adminIdx}`,
      {
        headers: {
          'x-access-token': jwtToken,
        },
      },
    );
    const value = result.data;
    console.log(value);
    if (value.isSuccess) {
      console.log('API 적용 성공');
      console.log(value.result);
      setStorage(value.result.adminMypageInfo[0]);
      setName(value.result.adminMypageInfo[0].clubName);
      setYear(value.result.adminMypageInfo[0].establishmentYear.slice(0, 10));
      setArea(value.result.adminMypageInfo[0].clubRegion);
      setUrl(value.result.adminMypageInfo[0].clubWebLink);
      setIntro(value.result.adminMypageInfo[0].clubIntroduction);
      setClubs(value.result.adminMypageInfo[0].categoryName);
      setTime(value.result.adminMypageInfo[0].updatedAt.slice(0, 10));
    } else {
      alert(value.message);
    }
  };

  useEffect(() => {
    infoApi();
  }, []);

  return (
    <>
      {storage && (
        <WhiteBox>
          <div className="frame">
            <div className="text" style={{ marginBottom: '0.5rem' }}>
              <span className="name">{storage.clubName}</span>님의 마이페이지
            </div>
            <div className="timeCheck">마지막 업데이트({time})</div>
            <div className="content">
              <div className="part1">
                <StyledAvatar
                  style={{
                    color: '#2B78FF',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                  }}
                >
                  {/* todo: 프로필 사진 */}
                  <img src={ProfileImg} alt="profile" />
                </StyledAvatar>
                <img className="settingIcon" src={setting} alt="" />
              </div>

              <div className="part2">
                <div className="Basic">
                  <span className="category">
                    {' '}
                    <img src={person} alt="" className="icon" /> 이메일
                  </span>
                  <div className="between">
                    <input
                      disabled
                      value={storage.adminEmail}
                      type={'text'}
                      className="information"
                      placeholder="abcdef@naver.com"
                      style={{
                        width: '40.5rem',
                        height: '2.5rem',
                        backgroundColor: '#F3F3F3',
                        border: 'none',
                        borderRadius: '3px',
                      }}
                    />
                  </div>
                </div>

                <div className="Basic">
                  <span className="category">
                    {' '}
                    <img src={profile} alt="" className="icon" />
                    단체명
                  </span>
                  <div className="between">
                    <input
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      disabled={!change}
                      value={name}
                      type={'text'}
                      className="information"
                      style={{
                        width: '40.5rem',
                        height: '2.5rem',
                        backgroundColor: '#F3F3F3',
                        border: 'none',
                        borderRadius: '3px',
                      }}
                    />
                  </div>
                </div>

                <div className="Basic">
                  <span className="category">
                    {' '}
                    <img src={Lock} alt="" className="icon" />
                    비밀번호
                  </span>
                  <div className="between">
                    <input
                      disabled
                      value="********"
                      className="information"
                      style={{
                        width: '40.5rem',
                        height: '2.5rem',
                        backgroundColor: '#F3F3F3',
                        border: 'none',
                        borderRadius: '3px',
                      }}
                    />
                  </div>
                </div>

                <img
                  src={line}
                  alt=""
                  style={{
                    width: '50rem',
                    height: '0.3rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                  }}
                />

                <img
                  src={line}
                  alt=""
                  style={{
                    width: '50rem',
                    height: '0.3rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                  }}
                />

                <div className="Basic">
                  <span className="category">단체 카테고리</span>

                  <div className="categoryItem">
                    <div>{clubs}</div>
                  </div>
                </div>

                <div className="Basic">
                  <span className="category">단체 설립 년도</span>
                  <input
                    onChange={(e) => {
                      setYear(e.target.value);
                    }}
                    disabled={!change}
                    value={year}
                    type={'text'}
                    className="information"
                    style={{
                      width: '40.5rem',
                      height: '2.5rem',
                      backgroundColor: '#F3F3F3',
                      border: 'none',
                      borderRadius: '3px',
                    }}
                  />
                </div>

                <div className="Basic">
                  <span className="category">단체 활동 지역</span>
                  <input
                    onChange={(e) => {
                      setArea(e.target.value);
                    }}
                    disabled={!change}
                    value={area}
                    type={'text'}
                    className="information"
                    style={{
                      width: '40.5rem',
                      height: '2.5rem',
                      backgroundColor: '#F3F3F3',
                      border: 'none',
                      borderRadius: '3px',
                    }}
                  />
                </div>

                <div className="Basic">
                  <span className="category">단체 URL</span>
                  <input
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    disabled={!change}
                    value={url}
                    type={'text'}
                    className="information"
                    style={{
                      width: '40.5rem',
                      height: '2.5rem',
                      backgroundColor: '#F3F3F3',
                      border: 'none',
                      borderRadius: '3px',
                    }}
                  />
                </div>

                <div className="Basic">
                  <span className="category">단체 소개</span>
                  <textarea
                    onChange={(e) => {
                      setIntro(e.target.value);
                    }}
                    className="information"
                    disabled={!change}
                    value={intro}
                    type={'text'}
                    style={{
                      width: '39.65rem',
                      height: '5rem',
                      paddingRight: ' 1rem',
                      backgroundColor: '#F3F3F3',
                      border: 'none',
                      borderRadius: '3px',
                      fontFamily: 'Pretendard Regular',
                      fontSize: '0.9rem',
                      resize: 'none',
                      outline: 'none',
                    }}
                  />
                </div>

                <div
                  onClick={() => {
                    handleApi();
                  }}
                >
                  <Button
                    text={change ? '저장하기' : '개인 정보 수정하기'}
                    style={{
                      borderRadius: '4px',
                      width: '49.3rem',
                      marginTop: '1.5rem',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </WhiteBox>
      )}
    </>
  );
}

export default Mypage;
