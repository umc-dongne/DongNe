import { React, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import DetailModal from './DetailModal';

const TableListStyle = styled.div`
  background-color: #fafafa;
  width: 42.5rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  margin-bottom: 1rem;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const NumStyle = styled.div`
  //background-color: blue;
  width: 2rem;
  height: 2.5rem;
  color: ${palette[7]}
  font-family: 'Pretendard Medium';
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const CateStyle = styled.div`
  //background-color: blue;
  width: 13rem;
  height: 2.5rem;
  color:  ${palette[7]}
  font-family: 'Pretendard Medium';
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`;

const ItemStyle = styled.div`
  //background-color: blue;
  width: 16rem;
  height: 2.5rem;
  color: ${palette[7]}
  font-family: 'Pretendard Medium';
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`;

const AccountStyle = styled.div`
  //background-color: blue;
  width: 10rem;
  height: 2.5rem;
  color: ${palette[7]}
  font-family: 'Pretendard Medium';
  font-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`;

const Btn = styled.button`
  width: 1rem;
  height: 1rem;
`;

const TableList = ({ idx, date, category, item, account, etc, onCancel }) => {
  const [isOpen, setIsOpen] = useState();
  const handleClick = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <TableListStyle>
      {/* <NumStyle></NumStyle> */}
      <NumStyle>
        <Btn onClick={handleClick} />
      </NumStyle>
      <CateStyle>{category}</CateStyle>
      <ItemStyle>{item}</ItemStyle>
      <AccountStyle>{account}</AccountStyle>
      {isOpen && (
        <DetailModal
          idx={idx}
          isOpen={isOpen}
          onCancel={onCancel}
          date={date}
          category={category}
          item={item}
          account={account}
          etc={etc}
        />
      )}
    </TableListStyle>
  );
};

export default TableList;
