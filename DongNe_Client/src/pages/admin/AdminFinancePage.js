import { React, useState } from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import importImg from '../../styles/importImg';
// components
import SidebarTemplate from '../../template/SidebarTemplate';
import FinanceRecent from '../../components/finance/FinanceRecent';
import FinanceSum from '../../components/finance/FinanceSum';
import FinanceCalandar from '../../components/finance/FinanceCalandar';

const StyleldFinanceBody = styled.div`
  position: relative;
  width: 91.0625rem;
  height: 55.125rem;
  margin-top: 3.625rem;
  margin-left: 3.25rem;
  margin-right: 4.1875rem;
  margin-bottom: 3.75rem;
  font-family: 'Pretendard Regular';

  h1 {
    color: ${palette[5]};
    font-size: 1.3rem;
    font-family: 'Pretendard ExtraBold';
  }
  h4 {
    font-family: 'Pretendard Light';
  }

  .finance_header {
    width: inherit;
    display: flex;
    justify-content: space-between;
    align-items: start;
    color: ${palette[5]};
  }
  .finance_header_group {
    width: 44.6875rem;
    font-size: 1rem;
    // margin-left: 1.5rem;
    display: flex;
    align-items: flex-start;
  }
  .finance_header_group > img {
    position: relative;
    bottom: 0.3rem;
  }
  .finance_header_title {
    margin-top: 1rem;
    margin-left: 0.875rem;
  }
  .finance_header_title > h4 {
    //margin-top: 0.9375rem;
    margin-left: 1rem;
    width: 17.9375rem;
  }

  .finance_header_date {
    position: relative;
    bottom: 1rem;
    display: flex;
    align-items: center;
    width: 11.4375rem;
    height: 3rem;
    margin-left: 13.75rem;
  }
  .finance_header_date > h1 {
    width: 5rem;
    height: 1.6875rem;
    font-size: 1.1rem;
    text-align: center;
    line-height: 1.6875rem;
  }

  .finance_header_right {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
  .finance_header_textBtn_bar {
    margin: 0rem 1.25rem;
  }

  .textBtn_off {
    color: ${palette[1][2]};
    font-family: 'Pretendard Regular';
    font-weight: 400;
  }
  .imageBtn {
    border: none;
    background-color: #11ffee00;
    cursor: pointer;
    padding: 0;
  }
  .finance_body {
    margin-top: 2.3rem;
    display: flex;
    flex-wrap: wrap;
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
  font-weight: 800;
`;

const AdminFinancePage = () => {
  const [modal, setModal] = useState(false);

  const onClickForModal = () => {
    setModal((current) => !current);
  };
  return (
    <SidebarTemplate pageNum={3}>
      <StyleldFinanceBody>
        <div className="finance_header">
          <div className="finance_header_group">
            {/* <img src={importImg.money}></img> */}
            <div
              className="finance_header_title"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img src={importImg.money} alt="moneyImg" />
              <h1>동네 8월 회계 현황</h1>
              <h4>날짜를 클릭하여 회계 현황을 확인하세요!</h4>
            </div>

            {/* <div className="finance_header_date">
              <button className="imageBtn">
                <img src={importImg.chevronLeft}></img>
              </button>
              <h1>2022.08</h1>
              <button className="imageBtn">
                <img src={importImg.chevronRight}></img>
              </button>
            </div> */}
          </div>
          <div className="finance_header_right">
            <TextBtn>달력으로 보기</TextBtn>
            <div className="finance_header_textBtn_bar">|</div>
            <TextBtn className="textBtn_off">표로 보기</TextBtn>
          </div>
        </div>

        <div className="finance_body">
          <FinanceCalandar />
          <div className="sideBox">
            <FinanceSum />
            <FinanceRecent />
          </div>
        </div>

        {/* {modal === true ? <FinanceModal onClick={onClickForModal} /> : null} */}
      </StyleldFinanceBody>
    </SidebarTemplate>
  );
};

export default AdminFinancePage;
