import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import EventButton from '../EventButton';
import importImg from '../../styles/importImg';
import membersData from '../../membersData';
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
const GroupModal = ({ groupIdx, visible, onClick, isUpdate }) => {
  const history = useHistory();
  const location = useLocation();
  const [isAbled, setIsAbled] = useState(false);
  const [success, setSuccess] = useState(false);
  const [memberSuccess, setMemberSuccess] = useState(false);
  const jwtToken = sessionStorage.getItem('jwtToken');
  const adminIdx2 = sessionStorage.getItem('adminIdx');
  const [groupTitle, setGroupTitle] = useState('');
  const [groupCategory, setGroupCategory] = useState('');
  const [groupIntroduction, setGroupIntroduction] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [che, setChe] = useState(false);
  console.log(jwtToken, adminIdx2);

  const [allMembers, setAllMembers] = useState([]);
  const [allMemberSuccess, setAllMemberSuccess] = useState(false);
  const [initMemberSuccess, setInitMemberSuccess] = useState({});
  const [groupDetail, setgroupDetail] = useState({});
  const [buttonSuccess, setButtonSuccess] = useState(false);
  const [buttonSuccess2, setButtonSuccess2] = useState(false);
  const [deleteBS, setDeleteBS] = useState(false);
  const [changedNumber, setChangedNumber] = useState(null);
  const [changedNumber2, setChangedNumber2] = useState(null);

  const [settingSuccess, setSettingSuccess] = useState(false);
  const [settingSuccess2, setSettingSuccess2] = useState(false);

  const [addedMembers, setAddedMembers] = useState([]);
  const [minusedMembers, setMinusedMembers] = useState([]);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const onChangeIntroduction = (e) => {
    setGroupIntroduction(e.target.value);
  };
  const onChangeCategory = (e) => setGroupCategory(e.target.value);
  const onChangeName = (e) => setGroupTitle(e.target.value);

  const onClickUpdate = () => {
    setIsAbled((cur) => true);
  };

  const deleteGroup = async (jwt, adminIdx) => {
    await client
      .patch(
        '/admin/group/delete',
        {},
        {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            adminIdx: adminIdx,
            groupIdx: groupIdx,
          },
        },
      )
      .then((response) => {
        if (!response.data.isSuccess) {
          alert(response.data.message);
        } else {
          setDeleteSuccess(true);
          alert('그룹 삭제에 성공했습니다.');
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };
  const onClickDelete = () => {
    setDeleteBS(true);
  };

  useEffect(() => {
    if (!deleteSuccess && deleteBS) {
      deleteGroup(jwtToken, adminIdx2);
    }
  }, [deleteBS, deleteSuccess]);

  useEffect(() => {
    if (changedNumber) {
      setAddedMembers(changedNumber);
      setButtonSuccess2(true);
      setSettingSuccess(true);
    }
  }, [changedNumber]);

  useEffect(() => {
    if (changedNumber2) {
      setMinusedMembers(changedNumber2);
      setSettingSuccess2(true);
    }
  }, [changedNumber2]);
  // 1. 추가된 멤버: 결과 애들 중에 initMemberSuccess에 있던 애들이 아닌 애들
  useEffect(() => {
    const arr = [];
    const arr2 = [];
    const initKeys = Object.keys(initMemberSuccess);
    if (buttonSuccess) {
      for (var key in allMemberSuccess) {
        if (allMemberSuccess[key] === true && !initKeys.includes(key)) {
          arr.push(key);
        }
      }
      setChangedNumber(arr);
      setButtonSuccess(false);
    } else {
    }
  }, [buttonSuccess]);

  useEffect(() => {
    const arr2 = [];
    const initKeys = Object.keys(initMemberSuccess);
    if (buttonSuccess2) {
      for (var item of initKeys) {
        if (allMemberSuccess[item] === false) {
          arr2.push(item);
        }
      }
      setChangedNumber2(arr2);
      setButtonSuccess2(false);
    } else {
    }
  }, [buttonSuccess2]);

  const onClickSave = async () => {
    setButtonSuccess(true);
    //2. 해제된 멤버: 있던 애들중에 현재 false인 애들
    await patchGroupData(jwtToken, adminIdx2);
  };

  useEffect(() => {
    if (settingSuccess) {
      insertGroupMembers(jwtToken, adminIdx2);
    }
  }, [settingSuccess]);
  useEffect(() => {
    if (settingSuccess2) {
      deleteGroupMembers(jwtToken, adminIdx2);
    }
  }, [settingSuccess2]);
  const insertGroupMembers = async (jwt, adminIdx) => {
    await client
      .post(
        '/admin/group/insertMembers',
        {
          userIdx: addedMembers,
        },
        {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            adminIdx: adminIdx,
            groupIdx: groupIdx,
          },
        },
      )
      .then((response) => {
        if (!response.data.isSuccess) {
          alert(response.data.message);
        } else {
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const deleteGroupMembers = async (jwt, adminIdx) => {
    await client
      .patch(
        '/admin/group/deleteMembers',
        {
          userIdx: minusedMembers,
        },
        {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            adminIdx: adminIdx,
            groupIdx: groupIdx,
          },
        },
      )
      .then((response) => {
        if (!response.data.isSuccess) {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const patchGroupData = async (jwt, adminIdx) => {
    await client
      .patch(
        '/admin/group/info',
        {
          groupName: groupTitle,
          groupIntroduction: groupIntroduction,
          groupCategory: groupCategory,
        },
        {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            adminIdx: adminIdx,
            groupIdx: groupIdx,
          },
        },
      )
      .then((response) => {
        if (!response.data.isSuccess) {
          alert(response.data.message);
        } else {
          alert('그룹 정보 수정에 성공했습니다.');
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  const updateMembers = (idx) => {
    setAllMemberSuccess((state) => {
      return { ...state, [idx]: false };
    });
  };

  const onClickAvatar = (e, userId) => {
    setAllMemberSuccess((state) => {
      return { ...state, [userId]: !state[userId] };
    });
  };

  const updateGroupCheck = (userIdx) => {
    setAllMemberSuccess((state) => {
      return { ...state, [userIdx]: true };
    });
  };

  const updateInitState = (userIdx) => {
    setInitMemberSuccess((state) => {
      return { ...state, [userIdx]: true };
    });
  };

  /**
   * 전체 그룹 멤버 호출
   */
  useEffect(() => {
    const fetchGroupMembers = async (jwt, adminIdx) => {
      await client
        .get('/admin/member', {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            adminIdx: adminIdx,
            groupIdx: groupIdx,
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
      fetchGroupMembers(jwtToken, adminIdx2);
      setAllMemberSuccess(true);
    }
  }, [allMembers]);

  useEffect(() => {
    const fetchGroupMembers = async (jwt, adminIdx) => {
      await client
        .get('/admin/group/members', {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            adminIdx: adminIdx,
            groupIdx: groupIdx,
            page: 1,
            pageSize: 10,
          },
        })
        .then((response) => {
          setGroupMembers(
            response.data.result.pagingRetrieveGroupMembersResult,
          );
          if (!response.data.isSuccess) {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    };
    if (memberSuccess) {
      groupMembers.map((elem) => {
        updateInitState(elem.userIdx);
        return updateGroupCheck(elem.userIdx);
      });
    } else {
      fetchGroupMembers(jwtToken, adminIdx2);
      setMemberSuccess(true);
    }
  }, [groupMembers]);

  useEffect(() => {
    const fetchGroupDetail = async (jwt, adminIdx) => {
      await client
        .get('/admin/group/info', {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            adminIdx: adminIdx,
            groupIdx: groupIdx,
          },
        })
        .then((response) => {
          setgroupDetail(response.data.result);
          if (!response.data.isSuccess) {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    };
    if (success) {
      setGroupIntroduction(groupDetail[0].groupIntroduction);
      setGroupCategory(groupDetail[0].groupCategory);
      setGroupTitle(groupDetail[0].groupName);
    } else {
      fetchGroupDetail(jwtToken, adminIdx2);
      setSuccess(true);
    }
  }, [groupDetail]);
  return (
    <>
      <ModalOverlay visible={visible} />
      <StyledModal>
        <div className="content-area">
          <div className="header">
            <div>{success ? groupTitle : ''}</div>
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
                  value={success ? groupCategory : ''}
                  className="long__input"
                />
              </div>
              <div className="name_input_form">
                <span>항목</span>
                <input
                  disabled={!isAbled}
                  type="text"
                  onChange={onChangeName}
                  value={success ? groupTitle : ''}
                  className="long__input"
                />
              </div>
              <div className="name_input_form">
                <span>내용</span>
                <textarea
                  disabled={!isAbled}
                  maxLength="300"
                  onChange={onChangeIntroduction}
                  value={success ? groupIntroduction : ''}
                  className="long_long_input"
                />
              </div>
            </form>
            <form className="body__right">
              <div className="attended_members">
                <div className="span">참여 회원</div>
                <div className="members_body">
                  {!isAbled
                    ? groupMembers.map((elem) => (
                        <div key={elem.userIdx} className="eachCard">
                          <Avatar
                            UserName={elem.name}
                            UserCode={elem.school}
                            UserTeam={elem.teamName}
                          />
                        </div>
                      ))
                    : allMembers.map((elem) => (
                        <div
                          key={elem.userIdx}
                          onClick={(e) => onClickAvatar(e, elem.userIdx)}
                          className="eachCard"
                        >
                          <Avatar
                            UserName={elem.name}
                            UserCode={elem.school}
                            UserTeam={elem.teamName}
                            checked={allMemberSuccess[elem.userIdx]}
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
              <EventButton
                text={isAbled ? '저장하기' : '수정하기'}
                onClick={isAbled ? onClickSave : onClickUpdate}
              />
            </div>

            {isAbled ? null : (
              <div className="eventButton">
                <EventButton text={'삭제하기'} onClick={onClickDelete} />
              </div>
            )}
          </div>
        </div>
      </StyledModal>
    </>
  );
};

export default GroupModal;
