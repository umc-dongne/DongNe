import { React, useState, useEffect } from 'react';
import client from '../../axiosConfig';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import importImg from '../../styles/importImg';

const LeftStyleDiv = styled.div`
  width: 13rem;
  height: 16.6875rem;
  flex-direction: column;
`;

const CategoryStyledDiv = styled.div`
  font-family: 'Pretendard Bold';
  font-size: 1.125rem;

  width: 13rem;
  height: 1.5rem;
  margin-top: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RightStyledDiv = styled.div`
  width: 18.5rem;
  height: 16.6875rem;

  flex-direction: column;
`;
const AddStyledDiv = styled.div`
  font-family: 'Pretendard Bold';

  font-size: 1.125rem;
  width: 18.5rem;
  height: 1.5rem;
  margin-top: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DetailSum = ({ year, month }) => {
  const [plus, setPlus] = useState(0);
  const [minus, setMinus] = useState(0);
  const [category_list, setCategory_list] = useState([]);

  const create_data = (arr) => {
    // pos
    for (let i = 0; i < arr.pos.length; i++) {
      const category = {
        category_idx: arr.pos[i].finAccountCategoryIdx,
        category_name: arr.pos[i].categoryName + '(+)',
        value: parseInt(arr.pos[i].posCost),
      };
      setCategory_list((category_list) => [...category_list, category]);
      setPlus((plus) => plus + parseInt(arr.pos[i].posCost));
    }

    // neg
    for (let i = 0; i < arr.neg.length; i++) {
      setMinus((minus) => minus + parseInt(arr.neg[i].posCost));
      const category = {
        category_idx: arr.neg[i].finAccountCategoryIdx,
        category_name: arr.neg[i].categoryName + '(-)',
        value: parseInt(arr.neg[i].posCost),
      };
      setCategory_list((category_list) => [...category_list, category]);
    }
  };

  // api 연결 (adminIdx, jwt 토큰 필요)
  const jwt = sessionStorage.getItem('jwtToken');
  const adminIdx = parseInt(sessionStorage.getItem('adminIdx'));
  useEffect(() => {
    const fetchData = async () => {
      const url_month =
        'admin/finAccount/category/month?year=' + year + '&month=' + month;
      await client
        .get(url_month, {
          headers: {
            'x-access-token': jwt,
            adminIdx: adminIdx,
          },
        })
        .then((res) => {
          // console.log(res.data.result);
          create_data(res.data.result);
        })
        .catch(function (err) {
          console.log(err);
        });
    };

    fetchData();
  }, []);

  if (!category_list) return <div></div>;
  return (
    <>
      <LeftStyleDiv>
        {/* <CategoryStyledDiv>
          <div>지원금</div>
          <div style={{ fontFamily: 'Pretendard Light ' }}>{70000}</div>
        </CategoryStyledDiv> */}
        {category_list.map((category, index) => (
          <CategoryStyledDiv key={index}>
            <div>{category.category_name}</div>
            <div style={{ fontFamily: 'Pretendard Light ' }}>
              {category.value}
            </div>
          </CategoryStyledDiv>
        ))}
      </LeftStyleDiv>

      <img src={importImg.line} alt="lineImg" />
      <RightStyledDiv>
        <AddStyledDiv>
          <div>+ 더하기</div>
          <div style={{ fontFamily: 'Pretendard Light ' }}>{plus}원</div>
        </AddStyledDiv>
        <AddStyledDiv>
          <div>- 빼기</div>
          <div style={{ fontFamily: 'Pretendard Light' }}>{minus}원</div>
        </AddStyledDiv>
        <AddStyledDiv style={{ fontSize: '1.5rem', marginTop: '12rem' }}>
          <div>합계</div>
          <div style={{ fontFamily: 'Pretendard Light' }}>{plus - minus}원</div>
        </AddStyledDiv>
      </RightStyledDiv>
    </>
  );
};

export default DetailSum;
