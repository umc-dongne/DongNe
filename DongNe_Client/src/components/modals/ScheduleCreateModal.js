import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import data from '../../data';
import EventButton from '../EventButton';
import importImg from '../../styles/importImg';
import membersData from '../../../src/membersData';
import MembersCard from '../MembersCard';
import Avatar from '../modals/Avatar';
import client from '../../axiosConfig';

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
    color: ${palette[5]};
    width: inherit;
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
    margin-top: 2rem;
    font-family: 'Pretendard Medium';
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 160%;
    // margin_top:1.9375rem;
    display: flex;
    align-items: center;
    // position: relative;
  }

  .button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: -0.75rem;
  }
  .body__left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    font-size: 1.125rem;
    margin-bottom: 0.75rem;
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
    align-items: flex-start;
    justify-content: flex-start;
  }
  .name_input_form {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 0.75rem;
  }
  .name_input_form > span {
    width: 4.1875rem;
    white-space: nowrap;
  }
  .group_members > span {
    width: 5.8rem;
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
    height: 2.5rem;
    border: none;
    margin-left: 1.375rem;
    resize: none;
    outline: none;
  }

  .name_input_formGroup > .name_input_form:nth-child(2) {
    margin-left: 1rem;
  }
  .codeButton {
    box-sizing: border-box;
    width: 6.4375rem;
    height: 2.5rem;
    border: 0.1875rem solid #2b78ff;
    border-radius: 0.25rem;
    background-color: ${palette[0]};
    color: ${palette[3]};
    font-family: 'Pretendard Bold';
    cursor: pointer;
    margin-left: 0.625rem;
  }
  .eventButton {
    width: 33.1875rem;
    height: 3.5rem;
    position: absolute;
    bottom: 3rem;
    /* margin-top: 2rem; */
  }
  .code__input {
    width: 21rem;
  }
  .long__input {
    width: 27.75rem;
  }
  .long_long_input {
    width: 27.75rem;
    height: 5.6875rem;
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
  .group_members {
    position: relative;
    display: flex;
    width: inherit;
    align-items: flex-start;
  }
  .not_attended {
    margin-top: 1.3125rem;
  }
  .buttons {
    margin-top: 1rem;
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
  .endTime {
    position: relative;
    right: 0.4rem;
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
const ScheduleCreateModal = ({ onClick, groupIdx, groupTitle }) => {
  const [success, setSuccess] = useState(true);
  const jwtToken = sessionStorage.getItem('jwtToken');
  const adminIdx2 = sessionStorage.getItem('adminIdx');
  const [isAbled, setIsAbled] = useState(true);
  const [scheduleTitle, setScheduleTitle] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleCode, setScheduleCode] = useState('');
  const [scheduleStartTime, setScheduleStartTime] = useState('');
  const [scheduleEndTime, setScheduleEndTime] = useState('');
  const [scheduleDescription, setScheduleDescription] = useState('');
  const [scheduleEtc, setScheduleEtc] = useState('');
  const [schedulePlace, setSchedulePlace] = useState('');
  console.log(jwtToken, adminIdx2);
  const [scheduleDetail, setScheduleDetail] = useState({});
  const [allMembers, setAllMembers] = useState([]);

  const [fetchGroupMemberSuccess, setFetchGroupMemberSuccess] = useState(false);
  const [btnSuccess, setbtnSuccess] = useState(false);
  const [absentMembers, setAbsentMembers] = useState([]);

  //함수 구간

  /**
   * 스케쥴 저장
   */
  const saveScheduleData = async (jwt, adminIdx) => {
    await client
      .post(
        '/admin/schedule',
        {
          groupIdx: groupIdx,
          scheduleDate: scheduleDate,
          init_time: scheduleStartTime,
          end_time: scheduleEndTime,
          introduction: scheduleDescription,
          place: schedulePlace,
          scheduleName: scheduleTitle,
          adminIdx: adminIdx2,
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
          alert('스케줄 생성에 성공했습니다.');
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  useEffect(() => {
    if (btnSuccess) {
      saveScheduleData(jwtToken, adminIdx2);
    }
  }, [btnSuccess]);

  const onClickSave = () => {
    setbtnSuccess(true);
  };

  const onChangeScheduleTitle = (e) => setScheduleTitle(e.target.value);
  const onChangeScheduleDate = (e) => setScheduleDate(e.target.value);
  const onChangeScheduleCode = (e) => setScheduleCode(e.target.value);
  const onChangeScheduleStartTime = (e) => setScheduleStartTime(e.target.value);
  const onChangeScheduleEndTime = (e) => setScheduleEndTime(e.target.value);
  const onChangeScheduleDescription = (e) =>
    setScheduleDescription(e.target.value);
  const onChangeEtc = (e) => setScheduleEtc(e.target.value);

  const onChangeSchedulePlace = (e) => setSchedulePlace(e.target.value);
  console.log('res', scheduleDetail);
  console.log('members', absentMembers);

  /**
   * 전체 그룹원 호출
   */

  useEffect(() => {
    const fetchAllClubMembers = async (jwt, adminIdx) => {
      await client
        .get('/admin/group/members', {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            groupIdx: groupIdx,
            adminIdx: adminIdx,
            page: 1,
            pageSize: 100,
          },
        })
        .then((response) => {
          setAllMembers(response.data.result.pagingRetrieveGroupMembersResult);
          if (!response.data.isSuccess) {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    };
    if (fetchGroupMemberSuccess) {
    } else {
      fetchAllClubMembers(jwtToken, adminIdx2);
      setFetchGroupMemberSuccess(true);
    }
  }, [allMembers]);

  return (
    <>
      <ModalOverlay />
      <StyledModal>
        <div className="content-area">
          <div className="header">
            <div>{true ? `${groupTitle} - 일정 생성` : ''}</div>
            <TextBtn onClick={onClick}>
              <img src={importImg.modalClose} />
            </TextBtn>
          </div>
          <div className="body">
            <form className="body__left">
              <div className="name_input_form">
                <span>출결 코드</span>
                <input
                  disabled={!isAbled}
                  type="text"
                  onChange={onChangeScheduleCode}
                  value={success ? scheduleCode : ''}
                  className="code__input"
                />
                <button className="codeButton" type="button">
                  코드 복사
                </button>
              </div>
              <div className="name_input_formGroup">
                <div className="name_input_form">
                  <span>일자</span>
                  <input
                    disabled={!isAbled}
                    onChange={onChangeScheduleDate}
                    value={success ? scheduleDate : ''}
                    type="date"
                  />
                </div>
                <div className="name_input_form ">
                  <span>항목</span>
                  <input
                    disabled={!isAbled}
                    onChange={onChangeScheduleTitle}
                    value={success ? scheduleTitle : ''}
                    type="text"
                  />
                </div>
              </div>
              <div className="name_input_formGroup">
                <div className="name_input_form">
                  <span>시작 시간</span>
                  <input
                    disabled={!isAbled}
                    type="datetime-local"
                    value={success ? scheduleStartTime : ''}
                    onChange={onChangeScheduleStartTime}
                    min="2018-06-07T00:00"
                    max="2025-12-31T00:00"
                  />
                </div>
                <div className="name_input_form">
                  <span>종료 시간</span>
                  <input
                    className="endTime"
                    disabled={!isAbled}
                    type="datetime-local"
                    value={success ? scheduleEndTime : ''}
                    onChange={onChangeScheduleEndTime}
                    min="2018-06-07T00:00"
                    max="2025-12-31T00:00"
                  />
                </div>
              </div>
              <div className="name_input_form">
                <span>내용</span>
                <input
                  disabled={!isAbled}
                  type="text"
                  onChange={onChangeScheduleDescription}
                  value={success ? scheduleDescription : ''}
                  className="long__input"
                />
              </div>
              <div className="name_input_form">
                <span>장소</span>
                <input
                  disabled={!isAbled}
                  type="text"
                  onChange={onChangeSchedulePlace}
                  value={success ? schedulePlace : ''}
                  className="long__input"
                />
              </div>
              <div className="name_input_form">
                <span>비고</span>
                <textarea
                  disabled={!isAbled}
                  maxLength="300"
                  onChange={onChangeEtc}
                  value={success ? scheduleEtc : ''}
                  className="long_long_input"
                />
              </div>
              <div className="eventButton"></div>
            </form>
            <form className="body__right">
              <div className="group_members">
                <span>그룹 전체 회원</span>
                <div className="members_body">
                  {allMembers.map((elem) => (
                    <div key={elem.userIdx} className="eachCard">
                      <Avatar
                        UserName={elem.name}
                        UserCode={elem.teamName}
                        UserTeam={elem.teamName}
                        // checked={!clubMembersStatus[elem.userIdx]}
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
                onClick={isAbled ? onClickSave : null}
              />
            </div>

            {isAbled ? null : (
              <div className="eventButton">
                <EventButton text={'삭제하기'} />
              </div>
            )}
          </div>
        </div>
      </StyledModal>
    </>
  );
};

export default ScheduleCreateModal;
