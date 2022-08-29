import palette from '../styles/pallete';
import styled from 'styled-components';
import copy from '../styles/imgs/icon/home_file-copy.png';
import client from '../axiosConfig';
import { useEffect, useState } from 'react';
import importImg from '../styles/importImg';
import { Link } from 'react-router-dom';
import ProfileImg from '../styles/imgs/icon/ProfileImg.png';

const StyledTag = styled.div`
  background-color: #2b78ff;
  padding: 0.8rem 1.5rem;
  border-radius: 4rem;
  font-size: 1rem;
  color: ${palette[1][0]};
  margin-right: 0.7rem;
`;

const StyledDiv = styled.div`
  position: relative;
  width: auto;
  height: 100%;

  .side__home__body {
    position: relative;
    left: 30.68rem;
  }
`;

const StyledAvatar = styled.div`
  & img {
    object-fit: cover;
    height: 6rem;
    width: 6rem;
  }
  display: flex;
  // align-items: center;
  justify-content: center;
  height: 11.25rem;
  width: 11.25rem;
  background-color: #f7f7f7;
  border: 0.4rem solid white;
  // padding: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 50% 50% 50% 0%;
  .logo {
    align-items: center;
    justify-content: center;
    border-radius: 50% 50% 50% 0%;
    overflow: hidden;
  }
  .logo > img {
    height: 11.25rem;
    width: 11.25rem;
  }
`;

const StyledSideBar = styled.div`
  margin-left: 3.93rem;
  margin-top: 8.8125rem;
  border-right: 0.01px solid ${palette[1][3]};
  position: fixed;
  left: 0;
  top: 0;
  width: 30.6875rem;
  height: 100vh;

  font-size: 1.4rem;
  font-family: 'Pretendard Medium';

  .greeting {
    font-family: 'Pretendard Medium';
    font-size: 3.25rem;
    margin-top: 35.78px;
    line-height: 62px;
  }
  .greeting > div {
    display: flex;
    align-items: center;
  }
  .name {
    font-family: 'Pretendard Bold';
    color: ${palette[3]};
    margin-top: 0.22px;
  }
  .description {
    font-size: 18px;
    margin-top: 28px;
    line-height: 160%;
  }
  .invite {
    display: flex;
    font-family: 'Pretendard Regular';
    font-size: 18px;
    margin-top: 20px;
    color: ${palette[3]};
    line-height: 160%;
  }
  .tags {
    margin-top: 4rem;
    display: flex;
  }
  .properties {
    margin-top: 30px;
    font-family: 'Pretendard Regular';
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 46px;
  }
  .properties > div {
    margin-top: 14px;
    display: flex;
    align-items: center;
  }
  .properties > div > img {
    width: 28px;
    height: 28px;
    margin-right: 18px;
  }
  .properties > div > span {
    height: 28px;
  }
  .bold {
    font-weight: 700;
    margin-right: 0.5rem;
  }
  .imageBtn1 {
    border: none;
    background-color: #11ffee00;
    cursor: pointer;
    margin-left: 2.5rem;
  }
  .imageBtn2 {
    border: none;
    background-color: #11ffee00;
    cursor: pointer;
  }
  .sidebar__contentArea {
    width: 21.375rem;
  }
  .code {
    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

    width: 10rem;

    height: 2rem;
  }
`;

const HomeSideBarTemplate = ({ children }) => {
  const [clubSuccess, setSuccess] = useState(false);
  const jwtToken = sessionStorage.getItem('jwtToken');
  const adminIdx = sessionStorage.getItem('adminIdx');
  const [ClubName, setClubName] = useState('');
  const [clubMemberCount, setClubMemberCount] = useState('');
  const [establishmentYear, setEstablishmentYear] = useState('');
  const [clubRegion, setClubRegion] = useState('');
  const [clubWebLink, setClubWebLink] = useState('');
  const [clubIntroduction, setClubIntroduction] = useState('');
  const [clubCode, setClubCode] = useState('');
  const [categoryName, setCategoryName] = useState('');

  const [ClubDetail, setClubDetail] = useState([]);

  useEffect(() => {
    const fetchClubDetail = async (jwtToken, adminIdx) => {
      await client
        .get('/admin/member/mainhome', {
          headers: {
            'x-access-token': jwtToken,
          },
          params: {
            adminIdx: adminIdx,
          },
        })
        .then((response) => {
          setClubDetail(response.data.result);
          if (!response.data.isSuccess) {
            alert(response.data.message);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    };
    if (clubSuccess) {
      setClubName(ClubDetail[0].ClubName);
      setClubMemberCount(ClubDetail[0].clubMemberCount);
      setEstablishmentYear(ClubDetail[0].establishmentYear);
      setClubRegion(ClubDetail[0].clubRegion);
      setClubWebLink(ClubDetail[0].clubWebLink);
      setClubIntroduction(ClubDetail[0].clubIntroduction);
      setClubCode(ClubDetail[0].clubCode);
      setCategoryName(ClubDetail[0].categoryName);
    } else {
      fetchClubDetail(jwtToken, adminIdx);
      setSuccess(true);
    }
  }, [ClubDetail]);

  const handleClick = (e) => {
    navigator.clipboard.writeText(clubCode);
    console.log(clubCode);
  };

  const goMypage = (e) => {
    <Link to="/admin/myPage"></Link>;
    console.log('gomypage');
  };

  return (
    <StyledDiv>
      <StyledSideBar>
        <div className="sidebar__contentArea">
          <StyledAvatar>
            <div className="logo">
              <img src={importImg.umcLogo} />
            </div>
          </StyledAvatar>
          <div key={adminIdx}>
            <div className="greeting">
              <div>
                <span>안녕하세요,</span>
                <button className="imageBtn1" onClick={goMypage}>
                  <img src={importImg.blueArrowForward}></img>
                </button>
              </div>
              <span className="name">{clubSuccess ? `${ClubName}` : ''}</span>
              <span> 님!</span>
            </div>
            <h4 className="description">
              {clubSuccess ? `${clubIntroduction}` : ''}
            </h4>
            <div className="invite">
              <span className="name">초대 코드 : </span>
              <div className="code">
                {clubSuccess && clubCode ? `${clubCode}` : '없음'}
              </div>
              <button className="imageBtn2" onClick={handleClick}>
                <img src={copy}></img>
              </button>
            </div>
            <footer>
              <ul className="tags">
                <StyledTag>{clubSuccess ? `# ${categoryName}` : ''}</StyledTag>
              </ul>
              <div className="properties">
                <div>
                  <img src={importImg.clubMemberCount}></img>
                  <span className="bold">
                    {clubSuccess ? `${ClubName}` : ' '}
                  </span>
                  <span>
                    {clubSuccess
                      ? `  (총 인원 ${clubMemberCount}명)`
                      : '  (총 인원 명)'}
                  </span>
                </div>
                <div>
                  <img src={importImg.clubEstablishment}></img>
                  <span className="bold">
                    {clubSuccess
                      ? `${establishmentYear.substring(
                          2,
                          4,
                        )}년 ${establishmentYear.substring(5, 7)}월 설립`
                      : ' 년 월 설립'}
                  </span>
                </div>
                <div>
                  <img src={importImg.clubRegion}></img>
                  <span className="bold">
                    {clubSuccess ? `${clubRegion} ` : ' '}
                  </span>
                  <span>활동</span>
                </div>
                <div>
                  <img src={importImg.clubWebLink}></img>
                  <span>{clubSuccess ? `${clubWebLink}` : ' '}</span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </StyledSideBar>
      <div className="side__home__body">{children}</div>
    </StyledDiv>
  );
};

export default HomeSideBarTemplate;
