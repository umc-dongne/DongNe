import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import login_bell from '../../styles/imgs/icon/nav_bell.png';
import user from '../../styles/imgs/icon/nav_user.png';
import logIn from '../../styles/imgs/icon/nav_log-in.png';
import Logo from '../../styles/imgs/icon/Logo.png';

const StyledImg = styled.img`
  width: 1.7rem;
  margin: 0px;
  cursor: pointer;
`;

const StyledNav = styled.nav`
  a {
    color: ${palette.CACACA};
    text-decoration: none;
    outline: none;
    font-size: 1.2rem;
  }
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 3.75rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1rem 1.5rem -0.8rem rgba(0, 0, 0, 0.1);
  border-bottom-right-radius: 23px;
  border-bottom-left-radius: 23px;
  padding: 0.6rem 0.8rem;
  margin-bottom: 1rem;
  width: 111.4rem;
  height: 3.4rem;

  font-family: 'Pretendard Regular';
  font-size: 1.2rem;
  background-color: ${palette[0]};
  color: ${palette.CACACA};
  /* background: ${palette[3]}; */

  .menus,
  .icons {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .menus > li {
    padding: 0px 1.5rem;
    margin-right: 2rem;
    list-style: none;
  }
  .icons > li {
    padding: 0px 1rem;
    list-style: none;
  }
  .selected {
    color: ${palette[3]};
    font-family: 'Pretendard Bold';
  }

  .Link {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    color: ${palette[5]};
  }
`;

const UserNavigator = ({ location }) => {
  const onLogout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('adminIdx');
    sessionStorage.removeItem('userIdx');
  };
  const history = useHistory();
  const onClickIcon = () => {
    history.push('/user/main');
  };

  return (
    <StyledNav>
      <ul className="menus icons">
        <li>
          <StyledImg
            onClick={onClickIcon}
            className="logo"
            src={Logo}
          ></StyledImg>
        </li>

        <li>
          <Link to="/user/home" className={location === 0 ? 'selected' : null}>
            ???
          </Link>
        </li>

        <li>
          <Link
            to="/user/attendance"
            className={location === 1 ? 'selected' : null}
          >
            ?????? ??????
          </Link>
        </li>

        <li>
          <Link to="/user/home" className={location === 2 ? 'selected' : null}>
            ?????? ??????
          </Link>
        </li>
        <li>
          <Link
            to="/user/community"
            className={location === 3 ? 'selected' : null}
          >
            ?????? ????????????
          </Link>
        </li>
      </ul>
      <ul className="icons">
        <li>
          <Link to="/user/home" className="Link">
            <StyledImg src={login_bell}></StyledImg>
            ????????????
          </Link>
        </li>
        <li>
          {/* {todo: human icon} */}
          <Link to="/user/myPage" className="Link">
            <StyledImg src={user}></StyledImg>
            ???????????????
          </Link>
        </li>
        <li>
          {/* {todo: logout icon} */}
          <Link onClick={onLogout} to="/" className="Link">
            <StyledImg src={logIn}></StyledImg>
            ????????????
          </Link>
        </li>
      </ul>
    </StyledNav>
  );
};

export default UserNavigator;
