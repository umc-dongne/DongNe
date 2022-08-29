import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../styles/pallete';
import community from '../styles/imgs/icon/community.png';

const StyledCard = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 0.625rem;
  outline: none;
  cursor: pointer;

  width: 10.5rem;
  height: 12.5rem;

  font-family: 'Pretendard Medium';
  // font-size: 1rem;
  color: ${palette[5]};

  font-style: normal;
  font-weight: 300;
  font-size: 0.9375rem;
  line-height: 1.125rem;

  background: linear-gradient(180deg, #fafafa 0%, rgba(250, 250, 250, 0) 100%);
  box-shadow: inset 0rem 0rem 0.625rem rgba(200, 200, 200, 0.1);

  .UserImg {
    /* box-sizing: border-box;
    position: relative; */
    width: 4.25rem;
    height: 4.25rem;
    left: 2.5rem;
    top: -2.5rem;
  }

  .card__body {
    /* position: relative; */
    top: 2.5rem;
    left: -2rem;
  }

  .GroupName {
    /* position: relative; */
    font-family: "Pretendard Bold";
    font-weight: 700;
    font-size: 1.25rem;
    line-height: 1.5rem;
    display: flex;
    justify-content: center;
    margin-bottom: 0.5rem; // 아래 여백 필요
  }

  .GroupExplain {
    /* position: relative; */
    display: flex;
    justify-content: center;
    font-family: "Pretendard Medium";
  }

  .GroupPeople{
    /* position: relative; */
    display: flex;
    justify-content: center;
    font-family: "Pretendard Medium";
  }

`;

const MembersCard = (props) => {
  const name = props.name;
  const explain = props.explain;
  const people = props.people;

  return (
    <StyledCard>
      <div className="UserImg">
        <img src={community} alt="" />
      </div>
      <div className="card__body">
        <div className="GroupName">{name}</div>
        <div className="GroupExplain">{explain}</div>
        <div className="GroupPeople">현재<span style={{fontFamily: "Pretendard Bold"}}>{people}</span>명 활동중</div>
      </div>
    </StyledCard>
  );
};

export default MembersCard;
