import { React, useState, useEffect } from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
// import SelectCategory from './SelectCategory';
import Select from 'react-select';
import client from '../../axiosConfig';

const StyledSelect = styled(Select)`
  width: 14.5rem;
  height: 2.5rem;

  font-family: 'Pretendard Regular';
  font-size: 1rem;
`;

const DetailInfoStyle = styled.div`
  width: 42.375rem;
  height: 22.5rem;
  font-family: 'Pretendard Regular';
  color: ${palette[5]};
`;
const FirstRow = styled.div`
  height: 2.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const SecondRow = styled.div`
  height: 2.5rem;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const FourthRow = styled.div`
  height: 12.75rem;
  font-size: 1.125rem;

  display: flex;
`;

const TextStyle = styled.div`
  height: 2.5rem;
  width: 5.25rem;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const FirstContentStyle = styled.div`
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  color: ${palette[7]};
  font-size: 1rem;

  width: 14.5rem;
  height: 2.5rem;

  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  // justify-content: center;
`;

const FirstInputStyle = styled.input`
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  color: ${palette[7]};
  font-family: 'Pretendard Regular';
  font-size: 1rem;

  width: 14.5rem;
  height: 2.5rem;

  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  // justify-content: center;

  border: none;
  &:focus {
    border: 2px solid ${palette[3]};
  }
`;
const SecondContentStyle = styled.input`
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  height: 2.5rem;
  width: 37.125rem;
  color: ${palette[7]};
  font-family: 'Pretendard Regular';
  font-size: 1rem;

  display: flex;
  align-items: center;
  padding-left: 0.5rem;

  border: none;
  &:focus {
    border: 2px solid ${palette[3]};
  }
`;

const FourthContentStyle = styled.input`
  background-color: #f3f3f3;
  border-radius: 0.25rem;
  height: 12rem;
  width: 37.125rem;
  color: ${palette[7]};
  font-family: 'Pretendard Regular';
  font-size: 1rem;

  display: flex;
  // align-items: center;
  padding-top: 0.75rem;
  padding-left: 0.5rem;

  border: none;
  &:focus {
    border: 2px solid ${palette[3]};
  }
`;

const EditDetail = ({
  date,
  category,
  categoryIdx,
  item,
  account,
  isProfit,
  etc,
  setEditCategory,
  setEditCategoryIdx,
  setEditItem,
  setEditAccount,
  setEditIsProfit,
  setEditEtc,
  setDate,
}) => {
  const [categoryList, setCategoryList] = useState([]);
  const create_category = (data, idx) => {
    const category_temp = {
      label: data.categoryName,
      value: data.finAccountCategoryIdx,
    };

    setCategoryList((categoryList) => [...categoryList, category_temp]);
  };

  const push_categoryList = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      create_category(arr[i], i + 1);
    }
  };

  // api 연결
  const jwt = sessionStorage.getItem('jwtToken');
  const adminIdx = parseInt(sessionStorage.getItem('adminIdx'));
  useEffect(() => {
    const url = '/admin/finAccount/category';
    client
      .get(url, {
        headers: {
          'x-access-token': jwt,
          adminIdx: adminIdx,
        },
      })
      .then((res) => {
        //console.log(res);
        push_categoryList(res.data.result);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  const handleChangeSelect = (e) => {
    setEditCategory(e.label);
    setEditCategoryIdx(e.value);
  };

  const handleChange_item = (e) => {
    const { value } = e.target;
    setEditItem(value);
  };
  const handleChange_account = (e) => {
    const { value } = e.target;
    if (value > 0) {
      setEditIsProfit(1);
      setEditAccount(value);
    } else {
      setEditIsProfit(0);
      setEditAccount(value);
    }
  };
  const handleChange_etc = (e) => {
    const { value } = e.target;
    setEditEtc(value);
  };
  const handleChange_date = (e) => {
    const { value } = e.target;
    setDate(value);
  };

  return (
    <DetailInfoStyle>
      <FirstRow>
        <TextStyle>일자</TextStyle>
        {/* <FirstContentStyle>{date}</FirstContentStyle> */}
        {setDate ? (
          <FirstInputStyle onChange={handleChange_date} value={date} />
        ) : (
          <FirstContentStyle>{date}</FirstContentStyle>
        )}
        <TextStyle style={{ marginLeft: '3rem' }}>카테고리</TextStyle>
        <StyledSelect
          options={categoryList}
          placeholder={'선택'}
          onChange={handleChangeSelect}
        />
      </FirstRow>
      <SecondRow>
        <TextStyle>항목</TextStyle>
        <SecondContentStyle onChange={handleChange_item} value={item} />
      </SecondRow>
      <SecondRow>
        <TextStyle>금액</TextStyle>
        <SecondContentStyle onChange={handleChange_account} value={account} />
      </SecondRow>
      <FourthRow>
        <TextStyle>비고</TextStyle>
        <FourthContentStyle onChange={handleChange_etc} value={etc} />
      </FourthRow>
    </DetailInfoStyle>
  );
};

export default EditDetail;
