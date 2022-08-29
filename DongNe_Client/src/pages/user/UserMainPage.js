import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserMainPageComponent from '../../components/UserMainPageComponent';

const UserMainPage = () => {
  const history = useHistory();

  return (
    <UserMainPageComponent 
      name="Dongne"
    />
  );
};

export default UserMainPage;
