import { React, useState } from 'react';
import DateModal from '../components/finance/DateModal';
import TableList from '../components/finance/TableList';
import TableHeader from '../components/finance/TableHeader';
import DetailModal from '../components/finance/DetailModal';
import moment from 'moment';
import DetailInfo from '../components/finance/DetailInfo';
import EditDetail from '../components/finance/EditDetail';
import DetailRecent from '../components/finance/DetailRecent';
import EditModal from '../components/finance/EditModal';
import SelectCategory from '../components/finance/SelectCategory';

const TestPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(true);
  };
  const handelCancel = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button onClick={handleClick}>버튼</button>
      {isOpen && (
        <EditModal
          isOpen={isOpen}
          onCancel={handelCancel}
          date={'2022-08-23'}
          category={'카테고리1'}
          item={'항목'}
          account={'100000'}
          etc={'비고1'}
        />
      )}
      {/* <DetailInfo /> */}
      {/* <EditDetail
        date="2022-08-01"
        category="카테고리"
        item="항목"
        account="account"
        etc="비고"
      /> */}
      {/* <DetailRecent /> */}
      <SelectCategory />
    </div>
  );
};

export default TestPage;
