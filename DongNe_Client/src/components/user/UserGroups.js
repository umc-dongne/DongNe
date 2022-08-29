import styled from 'styled-components';
import importImg from '../../styles/importImg';
import palette from '../../styles/pallete';
import Card from '../Card';
import { useEffect, useState } from 'react';
import { Route, useLocation, useRouteMatch } from 'react-router-dom';
import client from '../../axiosConfig';
import UserGroupModal from '../modals/UserGroupModal';
const StyledAttendanceBody = styled.div`
  /* position: relative; */
  width: inherit;
  margin-top: 3.75rem;
  margin-left: 3.25rem;
  margin-right: 3rem;
  font-family: 'Pretendard Regular';
  .attend_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .attend_header__left {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: ${palette[5]};
    font-family: 'Pretendard Bold';
  }
  .attend_header__left > div {
    margin-left: 1rem;
  }
  .attend_header__right {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
  }
  .attend_header_textBtn_bar {
    margin: 0rem 1.25rem;
  }

  .attend_body {
    margin-top: 2.3rem;
    display: flex;
    flex-wrap: wrap;
  }
  .eachCard {
    margin-right: 3rem;
    margin-top: 2.25rem;
  }
  .eachCard:nth-child(-n + 4) {
    margin-top: 0rem;
  }
  .eachCard:nth-child(4n) {
    margin-right: 0rem;
  }
  .textBtn_off {
    color: ${palette[1][2]};
    font-family: 'Pretendard Regular';
  }
  .addBtn {
    margin-left: 2.5rem;
    width: 8rem;
    height: 3rem;
    font-weight: 600;
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
`;
const UserGroups = () => {
  const [groupId, setgroupId] = useState('');
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const jwtToken = sessionStorage.getItem('jwtToken');
  const userIdx = sessionStorage.getItem('userIdx');
  const [groupData, setGroupData] = useState([]);
  const adminIdx = sessionStorage.getItem('adminIdx');

  const fetchGroups = async (jwt, adminIdx, page, pageSize) => {
    await client
      .get('/user/group', {
        headers: {
          'x-access-token': jwt,
        },
        params: {
          adminIdx: adminIdx,
          userIdx: userIdx,
          page: page,
          pageSize: pageSize,
        },
      })
      .then(function (response) {
        console.log(response.data);
        setGroupData(response.data.result.pagingRetrieveGroupListResult);
        if (!response.data.isSuccess) {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchGroups(jwtToken, adminIdx, 1, 100);
  }, [modal]);

  const onClickForModal = (idx) => {
    setModal((current) => !current);
    console.log(idx);
    if (!modal) {
      setgroupId(idx);
      console.log(idx);
    }
  };
  return (
    <StyledAttendanceBody>
      <div className="attend_header">
        <div className="attend_header__left">
          <img src={importImg.attendCheck} />
          <div>출결관리</div>
        </div>
        <div className="attend_header__right">
          <TextBtn>카드로 보기</TextBtn>
          <div className="attend_header_textBtn_bar">|</div>
          <TextBtn className="textBtn_off">표로 보기</TextBtn>
        </div>
      </div>
      <div className="attend_body">
        {groupData.length !== 0 ? (
          groupData.map((elem) => {
            return (
              <div key={elem.groupIdx} className="eachCard">
                <Card
                  subTitle={elem.groupCategory}
                  title={elem.groupName}
                  onClickForDetail={() => {
                    console.log('ho');
                    return onClickForModal(elem.groupIdx);
                  }}
                  onClickForGroup={null}
                  key={elem.groupIdx}
                  groupId={elem.groupIdx}
                  isGroupDetail={true}
                  to={`/user/attendance/${elem.groupIdx}`}
                />
              </div>
            );
          })
        ) : (
          <div>속해있는 그룹이 없습니다.</div>
        )}
      </div>

      {
        modal && (
          // <div>Hi</div>
          <UserGroupModal groupIdx={groupId} onClick={onClickForModal} />
        ) //기계역할
      }
    </StyledAttendanceBody>
  );
};

export default UserGroups;
