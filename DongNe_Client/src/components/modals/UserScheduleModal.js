import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import EventButton from '../EventButton';
import importImg from '../../styles/importImg';
import client from '../../axiosConfig';

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

  input:focus {
    outline: none;
  }
  .content-area {
    color: ${palette[5]};
    margin: 3rem 3.875rem;
    display: flex;
    flex-direction: column;
    /* justify-content: flex-start; */
    /* align-items: flex-start; */
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
  }
  .body {
    font-family: 'Pretendard Bold';
    font-style: normal;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 160%;
    display: flex;
    /* align-items: center; */
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
    margin-top: 2rem;
  }
  .modalBtn {
    width: 100%;
    /* width: 20.625rem; */
    height: 3.5rem;
    font-weight: 700;
    font-size: 1.375rem;
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
  .body__left {
    width: 16.5rem;
    /* height: 12.25rem; */
  }
  .body__left__elem {
    margin-top: 0.75rem;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
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
  }

  .body__right {
    width: 23.8125rem;
    /* height: 11.9375rem; */
  }
  .body__right__elem {
    margin-top: 0.75rem;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    margin-left: -2.9375rem;
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
  }

  .body__bottom {
    width: 42.375rem;
    /* height: 13.5625rem; */
  }
  .body__bottom__elem {
    margin-top: 0.75rem;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
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
  }
  .code__input {
    margin-top: 2rem;
  }
  .code__input > input {
    width: 30rem;
  }
  textarea {
    background: #f3f3f3;
    border-radius: 0.25rem;
    width: 37.125rem;
    height: 5rem;
    border: none;
    margin-left: 1.375rem;
    resize: none;
    outline: none;
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

const UserScheduleModal = ({
  visible,
  onClick,
  groupTitle,
  scheduleIdx,
  scheduleTitle,
}) => {
  const jwtToken = sessionStorage.getItem('jwtToken');

  const userIdx = sessionStorage.getItem('userIdx');

  const adminIdx = sessionStorage.getItem('adminIdx');

  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleCode, setScheduleCode] = useState('');
  const [scheduleStartTime, setScheduleStartTime] = useState('');
  const [scheduleEndTime, setScheduleEndTime] = useState('');
  const [scheduleDescription, setScheduleDescription] = useState('');
  const [scheduleEtc, setScheduleEtc] = useState('');
  const [schedulePlace, setSchedulePlace] = useState('');
  const [scheduleDetail, setScheduleDetail] = useState({});
  const [success, setSuccess] = useState(false);
  const [btnSuccess, setbtnSuccess] = useState(false);

  //1. 스케줄 상세 조회

  useEffect(() => {
    const fetchScheduleDetail = async (jwt, userIdx) => {
      await client
        .get('/user/schedule', {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            userIdx: userIdx,
            scheduleIdx: scheduleIdx,
          },
        })
        .then(function (response) {
          setScheduleDetail(response.data.result[0]);
          console.log('result: ', response);
          if (!response.data.isSuccess) {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    };
    if (success) {
      //디테일한 정보 여기서 set
      // scheduleDetail.scheduleName;
      setScheduleDate(scheduleDetail.scheduleDate);
      setScheduleCode(scheduleDetail.attendanceCode);
      setScheduleStartTime(scheduleDetail.init_time);
      setScheduleEndTime(scheduleDetail.end_time);
      setScheduleDescription(scheduleDetail.introduction);
      setSchedulePlace(scheduleDetail.place);
      setScheduleEtc(scheduleDetail.etc);
    } else {
      fetchScheduleDetail(jwtToken, userIdx);
      setSuccess(true);
    }
  }, [scheduleDetail]);

  //2. 출석 이벤트 api
  const onClickAttend = () => {
    setbtnSuccess(true);
  };
  const fetchSendAttend = async () => {
    await client
      .post(
        '/user/attendance/code',
        {
          scheduleIdx: scheduleIdx,
          userIdx: userIdx,
          attendanceCode: scheduleCode,
        },
        {
          headers: {
            'x-access-token': jwtToken,
          },
        },
      )
      .then((response) => {
        if (!response.data.isSuccess) {
          alert(response.data.message);
        } else {
          alert('출석에 성공했습니다.');
        }
      })
      .catch(function (error) {
        alert(error);
      });
  };

  useEffect(() => {
    if (btnSuccess) {
      fetchSendAttend();
    }
  }, [btnSuccess]);

  console.log(success);
  return (
    <>
      <ModalOverlay visible={visible} />
      <StyledModal>
        <div className="content-area">
          <div className="header">
            <div>{success ? `${groupTitle} - ${scheduleTitle}` : null}</div>
            <TextBtn onClick={onClick}>
              <img src={importImg.modalClose} />
            </TextBtn>
          </div>
          <div className="body">
            <form className="body__left">
              <div className="body__left__elem">
                <div>카테고리</div>
                <input
                  disabled
                  defaultValue={success ? scheduleCode : ''}
                  type="text"
                ></input>
              </div>

              <div className="body__left__elem">
                <div>일자</div>
                <input
                  disabled
                  defaultValue={success ? scheduleDate : ''}
                  type="text"
                ></input>
              </div>
              <div className="body__left__elem">
                <div>시작시간</div>
                <input
                  disabled
                  defaultValue={success ? scheduleStartTime : ''}
                  type="datetime-local"
                ></input>
              </div>
            </form>
            <form className="body__right">
              <div className="body__right__elem">
                <div>항목</div>
                <input
                  disabled
                  defaultValue={success ? scheduleTitle : ''}
                  type="text"
                ></input>
              </div>

              <div className="body__right__elem">
                <div>장소</div>
                <input
                  disabled
                  defaultValue={success ? schedulePlace : ''}
                  type="text"
                ></input>
              </div>
              <div className="body__right__elem">
                <div>종료시간</div>
                <input
                  disabled
                  defaultValue={success ? scheduleEndTime : ''}
                  type="datetime-local"
                ></input>
              </div>
            </form>
          </div>
          <div className="body">
            <form className="body__bottom">
              <div className="body__bottom__elem">
                <div>내용</div>
                <input
                  disabled
                  defaultValue={success ? scheduleDescription : ''}
                  type="text"
                ></input>
              </div>
              <div className="body__bottom__elem">
                <div>비고</div>
                <textarea
                  defaultValue={success ? scheduleEtc : ''}
                  disabled
                ></textarea>
              </div>
              <div className="body__bottom__elem code__input">
                <div>출결 코드</div>
                <input defaultValue={success ? scheduleCode : ''} type="text" />
                <button
                  onClick={onClickAttend}
                  className="codeButton"
                  type="button"
                >
                  코드 입력
                </button>
              </div>
            </form>
          </div>
          <div className="button">
            <EventButton
              onClick={onClick}
              text={'완료'}
              className="modalBtn"
            ></EventButton>
          </div>
        </div>
      </StyledModal>
    </>
  );
};

export default UserScheduleModal;
