import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import importImg from '../../styles/importImg';
import EventButton from '../EventButton';
import DetailRecent from './DetailRecent';

const StyledRecent = styled.div`
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  width: 42.4375rem;
  height: 25.125rem;
  margin-left: 3.9375rem;
  margin-top: 3.125rem;

  .recent_title {
    font-size: 1.1rem;
    color: ${palette[4]};
    display: flex;
    flex-direction: row;
    width: 14.1875rem;
    height: 2rem;
    align-items: center;
  }
  .recent_title > h1 {
    margin-left: 0.875rem;
  }

  .recent_body {
    margin-top: 1.5rem;
    width: 42.1875rem;
    height: 21.625rem;
    /* padding: 1.4rem 0rem; */
    margin-top: 1.5rem;
    align-items: center;
    justify-content: space-between;
  }
  .MoreBtn {
    margin-top: 1.4375rem;
    width: 42.1875rem;
    height: 3rem;
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
`;

const FinanceRecent = () => {
  return (
    <StyledRecent>
      <div className="recent_title">
        <img src={importImg.homeMemo} alt="homeMemoImg" />
        <h1>동네 회계 최근 내역</h1>
      </div>
      <div className="recent_body">
        <DetailRecent />
        <EventButton text={'더보기'} className="MoreBtn"></EventButton>
      </div>
    </StyledRecent>
  );
};

export default FinanceRecent;
