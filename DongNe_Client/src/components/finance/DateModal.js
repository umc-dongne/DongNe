import { React, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import importImg from '../../styles/importImg';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import TableHeader from './TableHeader';
import TableList from './TableList';
import moment from 'moment';
import EventButton from '../EventButton';
import client from '../../axiosConfig';

const DateModalContent = styled.div`
  margin: 3rem 4rem 1.875rem 4rem;

  .header {
    margin-bottom: 1.875rem;
    font-size: 1.75rem;
    line-height: 160%;
    font-family: 'Pretendard ExtraBold';
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${palette[5]};
  }

  .content {
    height: 20rem;
  }

  .sum {
    margin-top: 1rem;
    font-size: 1.5rem;
    font-family: 'Pretendard Bold';

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${palette[4]};
  }

  .bottom {
    font-size: 1.5rem;
    font-family: 'Pretendard Bold';
    margin-top: 1.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: ${palette[4]};
  }

  .addBtn {
    width: 20.625rem;
    height: 3.5rem;

    font-size: 1.25rem;
    line-height: 1.5rem;
  }

  .subtractBtn {
    width: 20.625rem;
    height: 3.5rem;

    font-size: 1.25rem;
    line-height: 1.5rem;
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

const DateModal = ({ isOpen, onCancel, date }) => {
  const [finAccounts, setFinAccounts] = useState([]);
  const [finAccountSum, setFinAccountSum] = useState(0);

  const create_finAccount = (data) => {
    if (data.isProfit) {
      var value = parseInt(data.finAccountCost);
    } else {
      var value = -1 * parseInt(data.finAccountCost);
    }
    setFinAccountSum((finAccountSum) => finAccountSum + value);

    const finAccount = {
      idx: data.finAccountIdx,
      date: data.finAccountDate,
      category: data.categoryName,
      item: data.finAccountItem,
      account: value,
      etc: data.etc,
    };
    setFinAccounts((finAccounts) => [...finAccounts, finAccount]);
  };

  const push_finAccount = (arr) => {
    for (let j = 0; j < arr.length; j++) {
      create_finAccount(arr[j]);
    }
  };
  // x 버튼 이벤트
  const handleClickExit = () => {
    onCancel();
  };

  // api 연결 (adminIdx, jwt토큰 필요)
  const jwt = sessionStorage.getItem('jwtToken');
  const adminIdx = parseInt(sessionStorage.getItem('adminIdx'));

  useEffect(() => {
    const year = moment(date).year();
    const month = moment(date).month() + 1;
    const day = moment(date).date();
    const url =
      '/admin/finAccount/day?year=' + year + '&month=' + month + '&day=' + day;
    client
      .get(url, {
        headers: {
          'x-access-token': jwt,
          adminIdx: adminIdx,
        },
      })
      .then((res) => {
        push_finAccount(res.data.result);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  if (!finAccounts || !finAccountSum) return <div></div>;

  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(34, 42, 63, 0.85)',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        },
        content: {
          // position
          position: 'absolute',
          top: '50%',
          left: '50%',
          WebkitTransform: 'translate(-50%, -50%)',
          // size
          width: '50.75rem',
          height: '38.75rem',
          // style
          boxShadow: '0rem 0rem 0.9375rem rgba(34, 42, 63, 0.6)',
          backgroundColor: palette[0],
          borderRadius: '0.625rem',

          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          outline: 'none',
          //padding: "20px",

          zIndex: 1001,
        },
      }}
    >
      <DateModalContent>
        <div className="header">
          <div>
            {moment(date).month() + 1}월 {moment(date).date()}일
          </div>
          <TextBtn onClick={handleClickExit}>
            <img src={importImg.modalClose} alt="closeImg" />
          </TextBtn>
        </div>
        <div className="content">
          <TableHeader />
          {finAccounts.map((finAccount, index) => (
            <TableList
              key={index}
              idx={finAccount.idx}
              category={finAccount.category}
              date={finAccount.date}
              item={finAccount.item}
              account={finAccount.account}
              etc={finAccount.etc}
              onCancel={onCancel}
            />
          ))}
        </div>
        <div className="sum">
          <div>합계</div>
          <span>{finAccountSum}원</span>
        </div>
        <div className="bottom"></div>
      </DateModalContent>
    </ReactModal>
  );
};

export default DateModal;

ReactModal.setAppElement('#root');
