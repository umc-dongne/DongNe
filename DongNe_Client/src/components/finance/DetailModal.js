import React from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import moment from 'moment';
import importImg from '../../styles/importImg';
import DetailInfo from './DetailInfo';
import EventButton from '../EventButton';
import { useState } from 'react';
import EditModal from './EditModal';
import client from '../../axiosConfig';

const DateModalContent = styled.div`
  margin: 3rem 4rem 3.875rem 4rem;

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
    height: 25rem;
  }

  .bottom {
    font-size: 1.5rem;
    font-family: 'Pretendard Bold';

    margin-top: 2rem;

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

const DetailModal = ({
  idx,
  isOpen,
  onCancel,
  date,
  category,
  item,
  account,
  etc,
}) => {
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const handleDelete = () => {
    onCancel();

    // api 요청
    const jwt = sessionStorage.getItem('jwtToken');
    const adminIdx = parseInt(sessionStorage.getItem('adminIdx'));
    const url = '/admin/finAccount/status/' + idx;
    const options = {
      headers: {
        'x-access-token': jwt,
        adminIdx: adminIdx,
      },
    };
    const body = {};
    client
      .patch(url, body, options)
      .then((res) => {
        console.log(res);
        alert('삭제하기 완료');
        onCancel();
      })
      .catch(function (err) {
        console.log(err);
        alert('삭제하기 실패');
      });
  };

  const handleEdit = () => {
    setIsOpenEdit(true);
  };
  const onCancelEdit = () => {
    setIsOpenEdit(false);
  };

  const handleClickExit = () => {
    onCancel();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: 'rgba(34, 42, 63, 0)',
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
        <div>
          <DetailInfo
            date={date}
            category={category}
            item={item}
            account={account}
            etc={etc}
          />
        </div>
        <div className="bottom">
          <EventButton
            text={'수정하기'}
            className="addBtn"
            onClick={handleEdit}
          ></EventButton>
          {isOpenEdit && (
            <EditModal
              idx={idx}
              isOpen={isOpenEdit}
              onCancel={onCancel}
              date={date}
              category={category}
              item={item}
              account={account}
              etc={etc}
            />
          )}
          <EventButton
            text={'삭제하기'}
            className="subtractBtn"
            onClick={handleDelete}
          />
        </div>
      </DateModalContent>
    </ReactModal>
  );
};

export default DetailModal;
ReactModal.setAppElement('#root');
