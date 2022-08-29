import { React, useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import importImg from '../../styles/importImg';
import EventButton from '../EventButton';
import EditDetail from './EditDetail';
import moment from 'moment';
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
    height: 25em;
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

  .saveBtn {
    width: 42.5rem;
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

const AddModal = ({ isOpen, onCancel }) => {
  const [date, setDate] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editCategoryIdx, setEditCategoryIdx] = useState(0);
  const [editItem, setEditItem] = useState('');
  const [editAccount, setEditAccount] = useState(0);
  const [editEtc, setEditEtc] = useState('');
  const [editIsProfit, setEditIsProfit] = useState(1);

  // x 버튼
  const handleClickExit = () => {
    onCancel();
  };
  // 저장하기 버튼
  const handleSave = () => {
    var value;
    if (editIsProfit === 1) {
      value = editAccount;
    } else if (editIsProfit === 0) {
      value = editAccount * -1;
    } else {
      alert('다시 입력하세요');
    }

    if (
      !moment(date, 'YYYY-MM-DD', true).isValid() ||
      !editCategory ||
      !editCategoryIdx ||
      !editItem
    ) {
      alert('다시 입력해주세요.');
      onCancel();
    } else {
      // api 연결
      const jwt = sessionStorage.getItem('jwtToken');
      const adminIdx = parseInt(sessionStorage.getItem('adminIdx'));
      const url = '/admin/finAccount';
      const options = {
        headers: {
          'x-access-token': jwt,
        },
      };
      console.log(url);
      const body = {
        adminIdx: adminIdx,
        finAccountCategoryIdx: editCategoryIdx,
        finAccountItem: editItem,
        isProfit: String(editIsProfit),
        finAccountCost: value,
        finAccountDate: date,
        etc: editEtc,
      };
      console.log(body);
      client
        .post(url, body, options)
        .then((res) => {
          console.log(res);
          alert('추가하기 완료');
          window.location.replace('/admin/finance');
        })
        .catch(function (err) {
          console.log(err);
          alert('추가하기 실패');
          onCancel();
        });
    }

    console.log('date', date);
    console.log('editCategory ', editCategory);
    console.log('editCategoryIdx', editCategoryIdx);
    console.log('editItem ', editItem);
    console.log('editAccount ', value);
    console.log('editIsProfit', editIsProfit);
    console.log('editEtc ', editEtc);
  };

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
          <div>추가하기</div>
          <TextBtn onClick={handleClickExit}>
            <img src={importImg.modalClose} alt="closeImg" />
          </TextBtn>
        </div>

        <div>
          <EditDetail
            date={date}
            category={editCategory}
            categoryIdx={editCategoryIdx}
            item={editItem}
            account={editAccount}
            isProfit={editIsProfit}
            etc={editEtc}
            setEditCategory={setEditCategory}
            setEditCategoryIdx={setEditCategoryIdx}
            setEditItem={setEditItem}
            setEditAccount={setEditAccount}
            setEditIsProfit={setEditIsProfit}
            setEditEtc={setEditEtc}
            setDate={setDate}
          />
        </div>

        <div className="bottom">
          <EventButton
            text={'저장하기'}
            className="saveBtn"
            onClick={handleSave}
          />
        </div>
      </DateModalContent>
    </ReactModal>
  );
};

export default AddModal;
