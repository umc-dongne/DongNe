import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import importImg from '../../styles/importImg';
import moment from 'moment';
import { useEffect } from 'react';
import client from '../../axiosConfig';
import DetailSum from './DetailSum';
import { useState } from 'react';

const StyledSum = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  width: 42rem;
  height: 21.25rem;
  margin-left: 3.9375rem;

  .sum_title {
    font-size: 1.1rem;
    color: ${palette[4]};
    display: flex;
    flex-direction: row;
    width: 14.1875rem;
    height: 2rem;
    align-items: center;
  }
  .sum_title > h1 {
    margin-left: 0.875rem;
  }

  .sum_body {
    color: ${palette[4]};

    margin-top: 2.25rem;
    width: 41.75rem;
    height: 17rem;
    padding: 1.4rem 0rem;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .sum_body_left {
    width: 13rem;
    height: 16.6875rem;
    // padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .sum_body_right {
    width: 18.5rem;
    height: 16.6875rem;
  }
`;

const FinanceSum = () => {
  const today = moment();
  const month = moment(today.format()).month() + 1;
  const year = moment(today.format()).year();

  return (
    <StyledSum>
      <div className="sum_title">
        <img src={importImg.homeMemo} alt="homeMemoImg" />
        <h1>동네 회계 {month}월 요약</h1>
      </div>
      <div className="sum_body">
        <DetailSum year={year} month={month} />
      </div>
    </StyledSum>
  );
};

export default FinanceSum;
