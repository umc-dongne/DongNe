import styled from 'styled-components';
import importImg from '../styles/importImg';
import palette from '../styles/pallete';
import Card from './Card';
import data from '../data';
import { useEffect, useState } from 'react';
import AttendModal from './AttendModal';
import {
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import EventButton from './EventButton';
import client from '../axiosConfig';
import ScheduleCreateModal from './modals/ScheduleCreateModal';
const StyledAttendanceBody = styled.div`
  /* position: relative; */
  width: inherit;
  margin-top: 3.75rem;
  margin-left: 3.25rem;
  margin-right: 3rem;
  font-family: 'Pretendard Medium';
  .attend_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .attend_header__left {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: ${palette[5]};
    font-family: 'Pretendard Bold';
  }
  .attend_header__left > div {
    margin-left: 1rem;
  }
  .attend_header__right {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
  }
  .attend_header_textBtn_bar {
    margin: 0rem 1.25rem;
  }
  .attend_body {
    margin-top: 2.3rem;
    display: flex;
    flex-wrap: wrap;
  }
  .eachCard {
    margin-right: 3rem;
    margin-top: 2.25rem;
  }
  .eachCard:nth-child(-n + 4) {
    margin-top: 0rem;
  }
  .eachCard:nth-child(4n) {
    margin-right: 0rem;
  }
  .textBtn_off {
    color: ${palette[1][2]};
    font-family: 'Pretendard Medium
';
  }
  .addBtn {
    margin-left: 2.5rem;
    width: 8rem;
    height: 3rem;
    font-weight: 600;
  }
  .back_arrow {
    margin-right: 1rem;
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

const GroupSchedules = () => {
  const match = useRouteMatch();
  const history = useHistory();
  const groupIdx = match.params.id;
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const jwtToken = sessionStorage.getItem('jwtToken');
  const adminIdx2 = sessionStorage.getItem('adminIdx');
  const [success, setSuccess] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [grouoSuccess, setgrouoSuccess] = useState(false);
  const [schedules, setSchedules] = useState(false);
  const [scheduleIdx, setScheduleIdx] = useState(false);
  const [groupTitle, setGroupTitle] = useState('');
  const [groupDetail, setgroupDetail] = useState({});

  const onClickBack = () => {
    history.goBack();
  };
  const onClickForModal = (idx) => {
    setModal((current) => !current);
    setScheduleIdx(idx);
  };

  const onClickForCreateBtn = () => {
    setCreateModal((current) => !current);
  };

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
    if (grouoSuccess) {
      setGroupTitle(groupDetail[0].groupName);
    } else {
      fetchGroupDetail(jwtToken, adminIdx2);
      setgrouoSuccess(true);
    }
  }, [groupDetail]);

  useEffect(() => {
    const fetchSchedule = async (jwt, adminIdx) => {
      await client
        .get('/admin/schedule/list', {
          headers: {
            'x-access-token': jwt,
          },
          params: {
            adminIdx: adminIdx,
            groupIdx: groupIdx,
            curPage: 1,
            pageSize: 100,
          },
        })
        .then(function (response) {
          setSchedules(response.data.result);
          if (!response.data.isSuccess) {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    if (success) {
      console.log(schedules);
    } else {
      fetchSchedule(jwtToken, adminIdx2);

      if (!schedules.schedule) {
        setSuccess(false);
      } else {
        if (schedules.schedule.length === 0) {
          setSuccess(true);
          setEmpty(true);
        } else {
          setSuccess(true);
        }
      }
    }
  }, [schedules, createModal, modal]);
  return (
    <StyledAttendanceBody>
      <div className="attend_header">
        <div className="attend_header__left">
          <TextBtn onClick={onClickBack} className="back_arrow">
            <img src={importImg.attendBackChevron}></img>
          </TextBtn>
          <img src={importImg.attendCheck} />
          <div>{grouoSuccess ? `${groupTitle} - 출결관리` : '- 출결관리'}</div>
        </div>
        <div className="attend_header__right">
          <TextBtn>카드로 보기</TextBtn>
          <div className="attend_header_textBtn_bar">|</div>
          <TextBtn className="textBtn_off">표로 보기</TextBtn>
          <div className="addBtn">
            <EventButton onClick={onClickForCreateBtn} text={'추가하기 +'} />
          </div>
        </div>
      </div>
      <div className="attend_body">
        {!empty && success ? (
          schedules.schedule.map((elem) => (
            <Card
              key={elem.scheduleIdx}
              className="eachCard"
              subTitle={elem.scheduleDate}
              title={elem.scheduleName}
              onClickForDetail={() => onClickForModal(elem.scheduleIdx)}
              isGroupDetail={false}
              onClickForGroup={null}
            />
          ))
        ) : (
          <div>출결 목록이 존재하지 않습니다.</div>
        )}
      </div>

      {
        modal === true ? (
          <AttendModal
            groupIdx={groupIdx}
            groupTitle={groupTitle}
            scheduleIdx={scheduleIdx}
            onClick={onClickForModal}
          />
        ) : null //기계역할
      }
      {
        createModal === true ? (
          <ScheduleCreateModal
            groupIdx={groupIdx}
            groupTitle={groupTitle}
            onClick={onClickForCreateBtn}
          />
        ) : null //기계역할
      }
    </StyledAttendanceBody>
  );
};

export default GroupSchedules;
