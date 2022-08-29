import React from 'react';
import styled from 'styled-components';
import MembersCard from '../../components/MembersCard';
import palette from '../../styles/pallete';
import SidebarTemplate from '../../template/SidebarTemplate';
// import membersData from '../../membersData';
import MembersModal from '../../components/MembersModal';
import importImg from '../../styles/importImg';
import EventButton from '../../components/EventButton';
import client from '../../axiosConfig';
import { useEffect, useState } from 'react';

const StyleldMembersBody = styled.div`
  position: relative;
  width: inherit;
  margin-top: 3.75rem;
  margin-left: 3.25rem;
  // margin-right: 3rem;
  font-family: 'Pretendard Regular';

  .members_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .members_header__left {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: ${palette[5]};
    font-family: 'Pretendard Bold';
  }
  .members_header__left > div {
    margin-left: 1rem;
  }
  .members_header__right {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.5rem;
  }
  .members_header_textBtn_bar {
    margin: 0rem 1.25rem;
  }

  .textBtn_off {
    color: ${palette[1][2]};
    font-family: 'Pretendard Regular';
    font-weight: 400;
  }
  .addBtn {
    margin-left: 2.5rem;
    width: 8rem;
    height: 3rem;
    font-weight: 600;
  }

  .members_body {
    margin-top: 2.3rem;
    display: flex;
    flex-wrap: wrap;
  }
  .eachCard {
    margin-right: 0rem;
    margin-top: 0rem;
  }
  .eachCard:nth-child(-n + 8) {
    margin-top: 0rem;
  }
  .eachCard:nth-child(8n) {
    margin-right: -1rem;
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
const AdminMembersPage = () => {
  const [userId, setuserId] = useState('');
  const [modal, setModal] = useState(false);
  const jwtToken = sessionStorage.getItem('jwtToken');
  const adminIdx = sessionStorage.getItem('adminIdx');
  const [MembersData, setMembersData] = useState([]);

  const fetchMembers = async (jwtToken, adminIdx, page, pageSize) => {
    await client
      .get('/admin/member', {
        headers: {
          'x-access-token': jwtToken,
        },
        params: {
          adminIdx: adminIdx,
          page: page,
          pageSize: pageSize,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setMembersData(response.data.result.pagingRetrieveMemberListResult); //d?
        if (!response.data.isSuccess) {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchMembers(jwtToken, adminIdx, 1, 32);
  }, []);

  const onClickForModal = (idx) => {
    setModal((current) => !current);
    console.log(idx);
    if (!modal) {
      setuserId(idx);
      console.log(idx);
    }

  };

  return (
    <SidebarTemplate pageNum={1} isMembers={true}>
      <StyleldMembersBody>
        <div className="members_header">
          <div className="members_header__left">
            <img src={importImg.event} />
            <div>현재 활동 회원 명단</div>
          </div>
          <div className="members_header__right">
            <TextBtn>카드로 보기</TextBtn>
            <div className="members_header_textBtn_bar">|</div>
            <TextBtn className="textBtn_off">표로 보기</TextBtn>
            {/* <div className="addBtn">
              <EventButton text={'추가하기 +'} />
            </div> */}
          </div>
        </div>
        <div className="members_body">
          {MembersData.map((elem) => {
            return (
            <div key={elem.userIdx} className="eachCard">
              <MembersCard
                UserImg={elem.userImgUrl}
                UserName={elem.name}
                UserTeam={elem.teamName}

                onClick={() => {
                  console.log('hi');
                  return onClickForModal(elem.userIdx);
                }}
                // onClickForMember={null}
                key={elem.userIdx}
                userId={elem.userIdx}
                // isMemberDetail={true}
                to={`/admin/members/${elem.userIdx}`}

                // onClick={onClickForModal(elem.userIdx)}
              />
            </div>
            )})
          }
        </div>

        {
          modal && (
          <MembersModal userIdx={userId} onClick={onClickForModal} /> 
          )
        }
        </StyleldMembersBody>
    </SidebarTemplate>
  );
};

export default AdminMembersPage;
