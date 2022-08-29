import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import EventButton from '../EventButton';
import importImg from '../../styles/importImg';
import Avatar from './Avatar';
import client from '../../axiosConfig';
import { useHistory, useLocation } from 'react-router-dom';

const StyledModal = styled.div`
  position: fixed;
  width: 75rem;
  height: 38.75rem;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  background: #ffffff;
  box-shadow: 0rem 0rem 0.9375rem rgba(34, 42, 63, 0.6);
  border-radius: 0.625rem;
  display: flex;
  justify-content: center;

  .content-area {
    position: relative;
    color: ${palette[5]};
    width: 68.75rem;
    height: 32.75rem;
    margin: 3rem 3.875rem;
  }
  .header {
    font-size: 1.75rem;
    line-height: 160%;
    font-weight: 800;
    font-family: 'Pretendard Bold';
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .body {
    margin-top: 1rem;
    font-family: 'Pretendard Medium';
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 160%;
    // margin_top:1.9375rem;
    display: flex;
    align-items: flex-start;
    // position: relative;
  }

  .body__left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    font-size: 1.125rem;
    /* margin-bottom: 0.75rem; */
    margin-right: 2.5rem;
  }
  .body__right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
  }
  .name_input_formGroup {
    display: flex;
    align-items: center;
  }
  .name_input_form {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 0.75rem;
  }
  .name_input_form > span {
    width: 4.1875rem;
    white-space: nowrap;
  }
  .attended_members > .span {
    width: 4.1875rem;
    white-space: nowrap;
  }
  input {
    background: #f3f3f3;
    border-radius: 0.25rem;
    width: auto;
    height: 2.5rem;
    border: none;
    margin-left: 1.375rem;
    outline: none;
  }
  textarea {
    background: #f3f3f3;
    border-radius: 0.25rem;
    width: auto;
    height: 16.6875rem;
    border: none;
    margin-left: 1.375rem;
    resize: none;
    outline: none;
  }

  .name_input_formGroup > .name_input_form:nth-child(2) {
    margin-left: 1rem;
  }

  .buttons {
    margin-top: 2rem;
    display: flex;
    width: 100%;
    height: 3.5rem;
    gap: 1rem;
    justify-content: space-between;
  }
  .eventButton {
    position: relative;
    width: 100%;
    height: 3.5rem;
  }
  .code__input {
    width: 21rem;
  }
  .long__input {
    width: 27.75rem;
  }
  .long_long_input {
    width: 27.75rem;
    height: 16.6875rem;
  }
  .members_body {
    width: 28rem;
    gap: 1px;
    height: 23.1875rem;
    margin-left: 1.125rem;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    overflow-x: hidden;
    -webkit-text-fill-color: black;
    transition: color 0.3s ease;
    color: rgba(0, 0, 0, 0);
  }

  .members_body::-webkit-scrollbar,
  .members_body::-webkit-scrollbar-thumb {
    width: 26px;
    border-radius: 13px;
    background-clip: padding-box;
    border: 10px solid transparent;
  }

  .members_body::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 10px;
  }
  .members_body:hover {
    color: rgba(0, 0, 0, 0.3);
  }

  .eachCard {
    /* flex: auto; */
    /* margin-right: 0.4rem; */
    margin-top: 0rem;
  }
  .attended_members {
    position: relative;
    display: flex;
    width: inherit;
    align-items: flex-start;
  }
  .not_attended {
    margin-top: 1.3125rem;
  }
`;

const SmokeBar = styled.div`
  position: absolute;
  bottom: 0rem;
  width: inherit;
  height: 3.25rem;

  background: linear-gradient(
    0deg,
    #ffffff 24.46%,
    rgba(255, 255, 255, 0) 100%
  );
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
const GroupCreaateModal = ({ groupIdx, visible, onClick, isUpdate }) => {
  const history = useHistory();
  const location = useLocation();
  const [isAbled, setIsAbled] = useState(true);
  const jwtToken = sessionStorage.getItem('jwtToken');
  const adminIdx2 = sessionStorage.getItem('adminIdx');
  const [groupTitle, setGroupTitle] = useState('');
  const [groupCategory, setGroupCategory] = useState('');
  const [groupIntroduction, setGroupIntroduction] = useState('');
  const [che, setChe] = useState(false);
  console.log(jwtToken, adminIdx2);

  const [allMembers, setAllMembers] = useState([]);
  const [allMemberSuccess, setAllMemberSuccess] = useState(false);
  const [clubMembersStatus, setClubMembersStatus] = useState({});
  const [clubMembersCheckList, setClubMembersCheckList] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [checkListUpdateSuccess, setCheckListUpdateSuccess] = useState(false);
  const [buttonSuccess, setButtonSuccess] = useState(false);

  const onChangeIntroduction = (e) => {
    setGroupIntroduction(e.target.value);
  };
  const onChangeCategory = (e) => setGroupCategory(e.target.value);
  const onChangeName = (e) => setGroupTitle(e.target.value);

  const onClickAvatar = (e, userId) => {
    setClubMembersStatus((state) => {
      return { ...state, [userId]: !state[userId] };
    });
  };

  const saveGroupData = async (jwt, adminIdx) => {
    await client
      .post(
        '/admin/group',
        {
          adminIdx: adminIdx,
          groupName: groupTitle,
          groupIntroduction: groupIntroduction,
          groupCategory: groupCategory,
          userIdx: clubMembersCheckList,
        },
        {
          headers: {
            'x-access-token': jwt,
          },
        },
      )
      .then((response) => {
        if (!response.data.isSuccess) {
          alert(response.data.message);
        } else {
          setSaveSuccess(true);
          alert('그룹 생성에 성공했습니다.');
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  useEffect(() => {
    if (!saveSuccess && checkListUpdateSuccess) {
      saveGroupData(jwtToken, adminIdx2);
    }
  }, [saveSuccess, checkListUpdateSuccess]);
  /**
   * update useState함수 좋은예?
   */
  useEffect(() => {
    if (!clubMembersCheckList && buttonSuccess) {
      const arr = [];
      for (var key in clubMembersStatus) {
        if (clubMembersStatus[key] === true) {
          arr.push(key);
        }
      }
      setClubMembersCheckList(arr);
      setCheckListUpdateSuccess(true);
    }
  }, [buttonSuccess, clubMembersCheckList]);

  const onClickSave = async () => {
    setButtonSuccess(true);
    //2. 해제된 멤버: 있던 애들중에 현재 false인 애들
  };

  /**
   * 전체 멤버 success 초기화
   */
  const updateMembers = (idx) => {
    setClubMembersStatus((state) => {
      return { ...state, [idx]: false };
    });
  };
  /**
   * 동아리 전체 인원 호출
   */
  useEffect(() => {
    const fetchAllClubMembers = async (jwt, adminIdx) => {
      await client
        .get('/admin/member', {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            adminIdx: adminIdx,
            page: 1,
            pageSize: 100,
          },
        })
        .then((response) => {
          setAllMembers(response.data.result.pagingRetrieveMemberListResult);
          if (!response.data.isSuccess) {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    };
    if (allMemberSuccess) {
      allMembers.map((elem) => {
        return updateMembers(elem.userIdx);
      });
    } else {
      fetchAllClubMembers(jwtToken, adminIdx2);
      setAllMemberSuccess(true);
    }
  }, [allMembers]);
  //2. 체크 된 userIdx로 배열 만들기

  return (
    <>
      <ModalOverlay visible={visible} />
      <StyledModal>
        <div className="content-area">
          <div className="header">
            <div>{groupTitle}</div>
            <TextBtn onClick={onClick}>
              <img src={importImg.modalClose} />
            </TextBtn>
          </div>
          <div className="body">
            <form className="body__left">
              <div className="name_input_form">
                <span>카테고리</span>
                <input
                  disabled={!isAbled}
                  type="text"
                  onChange={onChangeCategory}
                  value={groupCategory}
                  className="long__input"
                />
              </div>
              <div className="name_input_form">
                <span>항목</span>
                <input
                  disabled={!isAbled}
                  type="text"
                  onChange={onChangeName}
                  value={groupTitle}
                  className="long__input"
                />
              </div>
              <div className="name_input_form">
                <span>내용</span>
                <textarea
                  disabled={!isAbled}
                  maxLength="300"
                  onChange={onChangeIntroduction}
                  value={groupIntroduction}
                  className="long_long_input"
                />
              </div>
            </form>
            <form className="body__right">
              <div className="attended_members">
                <div className="span">참여 회원</div>
                <div className="members_body">
                  {allMembers.map((elem) => (
                    <div
                      key={elem.userIdx}
                      onClick={(e) => onClickAvatar(e, elem.userIdx)}
                      className="eachCard"
                    >
                      <Avatar
                        UserName={elem.name}
                        UserCode={elem.teamName}
                        UserTeam={elem.teamName}
                        checked={!clubMembersStatus[elem.userIdx]}
                      />
                    </div>
                  ))}
                </div>
                <SmokeBar></SmokeBar>
              </div>
            </form>
          </div>
          <div className="buttons">
            <div className="eventButton">
              <EventButton text="저장하기" onClick={onClickSave} />
            </div>
          </div>
        </div>
      </StyledModal>
    </>
  );
};

export default GroupCreaateModal;
