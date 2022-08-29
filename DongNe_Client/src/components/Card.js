import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../styles/pallete';
import importImg from '../styles/importImg';
import { useHistory, useLocation } from 'react-router-dom';

const StyledCard = styled.div`
  position: relative;
  width: 20rem;
  height: 13.75rem;
  background-color: wheat;
  border-radius: 0.7813rem;
  font-family: 'Pretendard Bold';
  color: #ffffff;
  font-size: 1.125rem;
  filter: drop-shadow(0rem 0rem 1.25rem rgba(34, 42, 63, 0.25));
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${importImg.cardBack});
  background-size: cover;
  .title {
    font-size: 1.5rem;
    margin-top: 0.625rem;
  }
  .card__header {
    box-sizing: border-box;
    padding-top: 1.75rem;
    padding-left: 1.75rem;
  }
  .card__body {
    display: flex;
    justify-content: space-between;
    width: inherit;
    height: 40%;
    position: absolute;
    bottom: 0;
    border-radius: inherit;
  }
  .card__button {
    font-family: 'Pretendard Medium';
    font-size: 1.125rem;
    border: none;
    background: transparent;
    color: inherit;
    background: none;
    width: 100%;
    border-radius: inherit;
  }
  .card__button:hover {
    transition: all 0.4s ease-in-out;
    background: linear-gradient(0deg, #2b78ff 0%, rgba(43, 120, 255, 0) 100%);
    cursor: pointer;
    color: #ffffff;
  }
  .card__body {
    color: transparent;
  }
  .card__body:hover {
    transition: all 0.4s ease-in-out;
    color: #ffffff;
    background: linear-gradient(0deg, #2b78ff 0%, rgba(43, 120, 255, 0) 50%);
  }
  .IsAttend {
    background: #2b78ff;
    box-shadow: 0rem 0rem 0.625rem rgba(0, 0, 0, 0.25);
    border-radius: 0.25rem;
    width: 3.25rem;
    height: 2.25rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 1rem;
    top: 1rem;
  }
  .IsAbsent {
    background: #ff6363;
    box-shadow: 0rem 0rem 0.625rem rgba(0, 0, 0, 0.25);
    border-radius: 0.25rem;
    width: 3.25rem;
    height: 2.25rem;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 1rem;
    top: 1rem;
  }
`;

const Card = ({
  subTitle,
  onClickForDetail,
  onClickForGroup,
  title,
  img_src,
  groupId,
  isGroupDetail,
  isAttend,
  isForUser,
  to,
  ...rest
}) => {
  const location = useLocation();
  const history = useHistory();
  const onClickCard = (e) => {
    if (groupId) {
      history.push(`${to}`);
    } else {
      history.push(location);
    }
  };

  return (
    <StyledCard {...rest}>
      {isForUser ? (
        <div className={isAttend ? 'IsAttend' : 'IsAbsent'}>
          {isAttend ? '출석' : '결석'}
        </div>
      ) : null}
      <div className="card__header">
        <div className="subTitle">{subTitle}</div>
        <div className="title">{title}</div>
      </div>
      <div className="card__body">
        <button className="card__button" onClick={onClickForDetail}>
          자세히 보기
        </button>
        {isGroupDetail ? (
          <button className="card__button" onClick={onClickCard}>
            출결 현황 보기
          </button>
        ) : null}
      </div>
    </StyledCard>
  );
};
export default Card;
