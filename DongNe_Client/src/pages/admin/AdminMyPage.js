import React, {useState, useEffect} from 'react';
import BackgroundTemplate from '../../template/BackgroundTemplate';
import styled from 'styled-components';
import AdminMypageComponent from '../../components/AdminMypageComponent';
import { Link } from 'react-router-dom';
import HomePageTemplate from '../../template/HomePageTemplate';
import axios from 'axios';
import { API } from '../../axiosConfig';


const WhitBox = styled.div`
    box-sizing: border-box;   
    position: absolute; 
    width: 110rem;
    height: 45rem;
    left: 4rem;
    top: 3rem;

    background: linear-gradient(180deg, #FFFFFF 0%, rgba(251, 251, 251, 0) 100%);
    border: 0.125rem solid rgba(255, 255, 255, 0.6); 
    border-radius: 1.75rem;
    backdrop-filter: blur(2.5rem);
/* Note: backdrop-filter has minimal browser support */

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;


const AdminMyPage = () => {
  return (
      <BackgroundTemplate style={{ zIndex: 0 }}>
      <HomePageTemplate style={{ zIndex: 1 }}>
          <WhitBox style={{ zIndex: 2 }}>
              <AdminMypageComponent />
      </WhitBox>
      </HomePageTemplate>
      </BackgroundTemplate>
  );
};

export default AdminMyPage;