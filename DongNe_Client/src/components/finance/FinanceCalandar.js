import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import EventButton from '../EventButton';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import DateModal from './DateModal';
import './custom.css';
import palette from '../../styles/pallete';
import client from '../../axiosConfig';
import AddModal from './AddModal';

const StyledLeftBox = styled.div`
  font-family: 'Pretendard Regular';
  //display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 44.6875rem;
  height: 49.5rem;
  // margin-top: 1.625rem;

  .button {
    display: flex;
    flex-direction: row;
    margin-top: 1.25rem;
    justify-content: space-between;
    width: 44.625rem;
  }
  .addBtn {
    width: 44.6875rem;
    height: 3rem;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
`;

const FinanceCalandar = () => {
  moment.locale('ko-KR');

  const localizer = momentLocalizer(moment);
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [date, setDate] = useState();
  // const [month, setMonth] = useState();
  const [myEventsList, setMyEventsList] = useState([]);

  const getEventList = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      const event = {
        start: arr[i].finAccountDate,
        overlap: false,
        display: 'list-item',
        backgroundColor: palette[3],
        title: arr[i].finAccountDate,
      };
      setMyEventsList((myEventsList) => [...myEventsList, event]);
    }
  };

  const handelCancel = () => {
    setIsOpen(false);
  };

  // const handleDateClick = (dateClickInfo: any) => {
  //   setIsOpen(true);
  //   setDate(dateClickInfo.dateStr);
  // };

  const handleEventClick = (eventClickInfo) => {
    setIsOpen(true);
    setDate(eventClickInfo.event.title);
  };

  // 더하기 버튼 이벤트
  const handleAddClick = () => {
    console.log('add');
    setIsAddOpen(true);
  };
  const handleAddCancel = () => {
    setIsAddOpen(false);
  };

  // api 연결 (jwt 토큰 필요)
  const jwt = sessionStorage.getItem('jwtToken');
  const adminIdx = parseInt(sessionStorage.getItem('adminIdx'));
  useEffect(() => {
    const url = './admin/finAccount/dates/' + adminIdx;
    client
      .get(url, {
        headers: {
          'x-access-token': jwt,
        },
      })
      .then((res) => {
        getEventList(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <StyledLeftBox>
      <div className="Calender">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          fixedWeekCount={false}
          headerToolbar={{
            start: '',
            center: '',
            end: 'prev title next',
          }}
          events={myEventsList}
          // dateClick={handleDateClick}
          eventClick={handleEventClick}
        />
      </div>
      <div className="button">
        <EventButton
          text={'추가하기'}
          className="addBtn"
          onClick={handleAddClick}
        />
        {isAddOpen && (
          <AddModal isOpen={isAddOpen} onCancel={handleAddCancel} />
        )}
      </div>
      {isOpen && (
        <DateModal isOpen={isOpen} onCancel={handelCancel} date={date} />
      )}
    </StyledLeftBox>
  );
};

export default FinanceCalandar;
