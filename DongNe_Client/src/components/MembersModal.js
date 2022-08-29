import React from 'react';
import styled from 'styled-components';
import palette from '../styles/pallete';
import EventButton from './EventButton';
import importImg from '../styles/importImg';
import client from '../axiosConfig';
import { Fragment, useEffect, useState } from 'react';

const StyledModal = styled.div`
  position: fixed;
  width: 50.75rem;
  height: 38.75rem;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background: #ffffff;
  box-shadow: 0rem 0rem 0.9375rem rgba(34, 42, 63, 0.6);
  border-radius: 0.625rem;

  .content-area {
    color: ${palette[5]};
    margin: 3rem 3.875rem;
    // margin: 2.625rem;
  }
  .header {
    font-size: 1.75rem;
    line-height: 160%;
    font-weight: 800;
    font-family: 'Pretendard Bold';
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.25rem;
  }
  .body {
    font-family: 'Pretendard Bold';
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 160%;
    // margin_top:1.9375rem;
    display: flex;
    align-items: center;
    // position: relative;
  }
  .body > form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 50%;
  }

  .button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // margin-top: -0.75rem;
  }
  .modalBtn {
    // width: inherit;
    width: 20.625rem;
    height: 3.5rem;
    font-weight: 700;
    font-size: 1.375rem;
  }

  .body__left {
    width: 16.5rem;
    height: 12.25rem;
    // left: 39.1875rem;
    // top: 22.125rem;
  }
  .body__left__elem {
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    // margin-right:2rem;
    margin-bottom: 0.75rem;
  }
  .body__left__elem > div {
    width: 3.9375rem;
    height: 1.8125rem;
  }
  .body__left__elem > input {
    background: #f3f3f3;
    border-radius: 0.25rem;
    width: 11.25rem;
    height: 2.5rem;
    border: none;
    margin-left: 1.375rem;
    padding-left: 1rem;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .body__right {
    width: 23.8125rem;
    height: 11.9375rem;
    // left: 57.6875rem;
    // top: 22.4375rem;
  }
  .body__right__elem {
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    margin-left: -2.9375rem;
    margin-bottom: 0.75rem;
  }
  .body__right__elem > div {
    width: 6.4375rem;
    height: 1.8125rem;
  }
  .body__right__elem > input {
    background: #f3f3f3;
    border-radius: 0.25rem;
    width: 16rem;
    height: 2.5rem;
    border: none;
    margin-left: 1.375rem;
    padding-left: 1rem;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .body__bottom {
    width: 42.375rem;
    height: 13.5625rem;
    // left: 39.125rem;
    // top: 36.5625rem;
    margin-top: -2.5rem;
  }
  .body__bottom__elem {
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.75rem;
  }
  .body__bottom__elem > div {
    width: 4.1875rem;
    height: 1.8125rem;
  }
  .body__bottom__elem > input {
    background: #f3f3f3;
    border-radius: 0.25rem;
    border: none;
    width: 37.0625rem;
    height: 2.5rem;
    margin-left: 1.125rem;
    padding-left: 1rem;

    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  .dropdown {
    position: relative;
    display: inline-block;
  }

  .dropbtn_icon {
    font-family: 'Material Icons';
  }
  .dropbtn {
    display: block;
    border: 2px solid rgb(94, 94, 94);
    border-radius: 4px;
    background-color: #fcfcfc;
    font-weight: 400;
    color: rgb(124, 124, 124);
    padding: 12px;
    width: 240px;
    text-align: left;
    cursor: pointer;
    font-size: 12px;
    z-index: 1;
    position: relative;
  }
  .dropdown-content {
    display: none;
    font-weight: 400;
    background-color: #fcfcfc;
    min-width: 240px;
    border-radius: 8px;
    height: 160px;
    overflow: scroll;
    box-shadow: 0px 0px 10px 3px rgba(190, 190, 190, 0.6);
  }
  .dropdown-content::-webkit-scrollbar {
    width: 5px;
    height: 10px;
  }
  .dropdown-content::-webkit-scrollbar-thumb {
    border-radius: 2px;
    background-color: rgb(194, 194, 194);
  }

  .dropdown-content div {
    display: block;
    text-decoration: none;
    color: rgb(37, 37, 37);
    font-size: 12px;
    padding: 12px 20px;
  }
  .dropdown-content div:hover {
    background-color: rgb(226, 226, 226);
  }

  .dropdown-content.show {
    display: block;
  }
`;

const TextBtn = styled.button`
  border: none;
  background-color: #11ffee00;
  cursor: pointer;
  padding: 0;
  font-family: 'Pretendard Bold';
  color: ${palette[3]};
  font-size: 1.25rem;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const MembersModal = ({ userIdx, visible, onClick }) => {
  const [success, setSuccess] = useState(false);
  const [Listsuccess, setListSuccess] = useState(false);

  const jwtToken = sessionStorage.getItem('jwtToken');
  const adminIdx2 = sessionStorage.getItem('adminIdx');
  const [userId, setuserId] = useState('');
  const [name, setName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [school, setSchool] = useState('');
  const [birth, setBirth] = useState('');
  const [address, setAddress] = useState('');
  const [introduction, setIntroduction] = useState('');
  const [teamName, setTeamName] = useState('');
  const [change, setChange] = useState(false);

  const [clubTeamListIdx, setClubTeamListIdx] = useState('');
  const [clubTeamListName, setClubTeamListName] = useState('');

  const [MemberDetail, setMemberDetail] = useState({});
  const [clubTeamList, setClubTeamList] = useState({});

  const onChangeName = (e) => setName(e.target.value);
  const onChangePhoneNum = (e) => setPhoneNum(e.target.value);
  const onChangeSchool = (e) => setSchool(e.target.value);
  const onChangeBirth = (e) => setBirth(e.target.value);
  const onChangeAddress = (e) => setAddress(e.target.value);
  const onChangeIntroduction = (e) => setIntroduction(e.target.value);
  const onChangeTeamName = (e) => setClubTeamListName(e.target.value);

  useEffect(() => {
    const fetchMemberDetail = async (jwtToken, adminIdx) => {
      await client
        .get('/admin/member/info', {
          headers: {
            'x-access-token': jwtToken,
          },
          params: {
            userIdx: userIdx,
            adminIdx: adminIdx,
          },
        })
        .then((response) => {
          setMemberDetail(response.data.result.memberInfo);
          setClubTeamList(response.data.result.clubTeamList);
          if (!response.data.isSuccess) {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    };
    if (success) {
      setName(MemberDetail[0].name);
      setPhoneNum(MemberDetail[0].phoneNum);
      setSchool(MemberDetail[0].school);
      setBirth(MemberDetail[0].birth);
      setAddress(MemberDetail[0].address);
      setIntroduction(MemberDetail[0].introduction);
      setTeamName(MemberDetail[0].teamName);
      setClubTeamListIdx(clubTeamList[0].clubTeamListIdx);
      setClubTeamListName(clubTeamList[0].teamName);
    } else {
      fetchMemberDetail(jwtToken, adminIdx2);
      setSuccess(true);
    }

    if (Listsuccess) {
      setClubTeamListIdx(clubTeamList[0].clubTeamListIdx);
      setClubTeamListName(clubTeamList[0].teamName);
    } else {
      fetchMemberDetail(jwtToken, adminIdx2);
      setListSuccess(true);
    }
  }, [MemberDetail]);

  const update = async () => {
    if (change) {
      setChange(false);
    } else {
      setChange(true);
    }
  };

  const deleteMember = async (jwtToken, adminIdx) => {
    await client
      .patch(
        '/admin/member',
        {
          UserName: name,
          UserTeam: teamName,
        },
        {
          headers: {
            'x-access-token': jwtToken,
          },
          params: {
            userIdx: userIdx,
            adminIdx: adminIdx,
          },
        },
      )

      .then((response) => {
        if (!response.data.isSuccess) {
          alert(response.data.message);
        } else {
          alert('회원을 삭제했습니다.');
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <StyledModal>
        <div className="content-area">
          <div className="header">
            <div>회원 정보</div>
            <TextBtn onClick={onClick}>
              <img src={importImg.modalClose} />
            </TextBtn>
          </div>
          <div className="body">
            <form className="body__left">
              <div className="body__left__elem">
                <div>이름</div>
                <input
                  type="text"
                  onChange={onChangeName}
                  value={success ? name : ''}
                  disabled
                />
              </div>
              <div className="body__left__elem">
                <div>전화번호</div>
                <input
                  type="string"
                  onChange={onChangePhoneNum}
                  value={
                    success
                      ? phoneNum.substring(0, 3) +
                        '-' +
                        phoneNum.substring(3, 7) +
                        '-' +
                        phoneNum.substring(7, 11)
                      : ''
                  }
                  disabled
                />
              </div>
              <div className="body__left__elem">
                <div>생년월일</div>
                <input
                  // type="date"
                  onChange={onChangeBirth}
                  value={success ? birth.substring(0, 10) : ''}
                  disabled
                />
              </div>
            </form>
            <form className="body__right">
              <div className="body__right__elem">
                <div>팀/조</div>
                <input
                  className="dropdown"
                  onChange={onChangeTeamName}
                  value={Listsuccess ? teamName : ''}
                  disabled
                />
              </div>
              <div className="body__right__elem">
                <div>학교/소속</div>
                <input
                  type="text"
                  onChange={onChangeSchool}
                  value={success ? school : ''}
                  disabled
                />
              </div>
              <div className="body__right__elem">
                <div>주소</div>
                <input
                  type="text"
                  onChange={onChangeAddress}
                  value={success ? address : ''}
                  disabled
                />
              </div>
            </form>
          </div>
          <div className="body">
            <form className="body__bottom">
              <div className="body__bottom__elem">
                <div>한줄 소개</div>
                <input
                  type="text"
                  onChange={onChangeIntroduction}
                  value={success ? introduction : ''}
                  disabled
                />
              </div>
              <div className="body__bottom__elem">
                <div>비고</div>
                <input
                  type="text"
                  style={{ height: 5 + 'rem' }}
                  disabled={!change}
                />
              </div>
            </form>
          </div>
          <div className="button">
            <div
              onClick={() => {
                update();
              }}
            >
              <EventButton
                text={change ? '저장하기' : '수정하기'}
                className="modalBtn"
              />
            </div>
            {/* 비고 항목 수정 및 저장 api 없음 */}
            <div
              onClick={() => {
                deleteMember(jwtToken, adminIdx2);
              }}
            >
              <EventButton text={'삭제하기'} className="modalBtn" />
            </div>
          </div>
        </div>
      </StyledModal>
    </>
  );
};

export default MembersModal;
