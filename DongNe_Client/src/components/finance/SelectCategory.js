import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';

const StyledSelect = styled(Select)`
  width: 14.5rem;
  height: 2.5rem;

  font-family: 'Pretendard Regular';
  font-size: 1rem;
`;

const SelectCategory = () => {
  const handleChangeSelect = (e) => {
    console.log(e.label);
  };

  const techCompanies = [
    { label: '카테고리1', value: 1 },
    { label: '카테고리2', value: 2 },
  ];

  return (
    <StyledSelect
      options={techCompanies}
      placeholder={'카테고리'}
      onChange={handleChangeSelect}
    />
  );
};

export default SelectCategory;
