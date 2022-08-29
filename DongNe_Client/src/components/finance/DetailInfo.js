import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';

const DetailInfoStyle = styled.div`
  width: 42.375rem;
  height: 22.5rem;
  font-family: 'Pretendard Regular';
  color: ${palette[5]};
  font-size: 1.125rem;
`;
const FirstRow = styled.div`
  height: 2.5rem;
  margin-bottom: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const SecondRow = styled.div`
  height: 2.5rem;
  margin-bottom: 0.75rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const FourthRow = styled.div`
  height: 12.75rem;

  display: flex;
`;

const TextStyle = styled.div`
  height: 2.5rem;
  width: 5.25rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const FirstContentStyle = styled.div`
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  color: ${palette[7]};

  width: 14.5rem;
  height: 2.5rem;

  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  // justify-content: center;
`;

const SecondContentStyle = styled.div`
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  height: 2.5rem;
  width: 37.125rem;
  color: ${palette[7]};

  display: flex;
  align-items: center;
  padding-left: 0.5rem;
`;

const FourthContentStyle = styled.div`
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  height: 12rem;
  width: 37.125rem;
  color: ${palette[7]};

  display: flex;
  // align-items: center;
  padding-top: 0.75rem;
  padding-left: 0.5rem;
`;

const DetailInfo = ({ date, category, item, account, etc }) => {
  return (
    <DetailInfoStyle>
      <FirstRow>
        <TextStyle>일자</TextStyle>
        <FirstContentStyle>{date}</FirstContentStyle>
        <TextStyle style={{ marginLeft: '3rem' }}>카테고리</TextStyle>
        <FirstContentStyle>{category}</FirstContentStyle>
      </FirstRow>
      <SecondRow>
        <TextStyle>항목</TextStyle>
        <SecondContentStyle>{item}</SecondContentStyle>
      </SecondRow>
      <SecondRow>
        <TextStyle>금액</TextStyle>
        <SecondContentStyle>{account}</SecondContentStyle>
      </SecondRow>
      <FourthRow>
        <TextStyle>비고</TextStyle>
        <FourthContentStyle>{etc}</FourthContentStyle>
      </FourthRow>
    </DetailInfoStyle>
  );
};

export default DetailInfo;
