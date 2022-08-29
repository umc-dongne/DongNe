import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';

const TableListStyle = styled.div`
  width: 42.5rem;
  height: 2.5rem;
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const NumStyle = styled.div`
  width: 2rem;
  height: 2.5rem;
  color: ${palette[4]}
  font-family: 'Pretendard Bold';
  font-size: 1.125rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const CateStyle = styled.div`
  width: 13rem;
  height: 2.5rem;
  color: ${palette[4]}
  font-family: 'Pretendard Bold';
  font-size: 1.125rem;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`;

const ItemStyle = styled.div`
  width: 16rem;
  height: 2.5rem;
  color: ${palette[4]}
  font-family: 'Pretendard Bold';
  font-size: 1.125rem;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`;

const AccountStyle = styled.div`
  width: 10rem;
  height: 2.5rem;
  color: ${palette[4]}
  font-family: 'Pretendard Bold';
  font-size: 1.125rem;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
`;
const TableHeader = () => {
  return (
    <TableListStyle>
      <NumStyle />
      <CateStyle>카테고리</CateStyle>
      <ItemStyle>아이템</ItemStyle>
      <AccountStyle>금액</AccountStyle>
    </TableListStyle>
  );
};

export default TableHeader;
