import { React } from 'react';
import styled from 'styled-components';
import palette from '../../styles/pallete';
import client from '../../axiosConfig';
import { useEffect } from 'react';
import { useState } from 'react';

const DetailRecentStyle = styled.div`
  width: 42.25rem;
  height: 17.1875rem;
  //background-color: black;
  background-color: rgba(251, 251, 251, 100);
  border-radius: 0.625rem;
  color: ${palette[4]};
  font-family: 'Pretendard Bold';
  font-size: 1.125rem;
`;

const DetailHeader = styled.div`
  width: 42.25rem;
  height: 4.25rem;
  border-bottom: 1px dashed ${palette[3]};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailContent = styled.div`
  width: 42.25rem;
  height: 3.375rem;
  border-bottom: 1px solid #cee7f7;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ShortStyle = styled.div`
  width: 8rem;
  height: 3.375rem;
  border-left: 1px dashed #cee7f7;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const LongStyle = styled.div`
  width: 18.25rem;
  height: 3.375rem;
  border-left: 1px dashed #cee7f7;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const index_arr = [0, 1, 2, 3];
const DetailRecent = () => {
  const [details, setDetails] = useState([]);

  const create_detail = (data) => {
    if (data.isProfit) {
      var value = parseInt(data.finAccountCost);
    } else {
      var value = -1 * parseInt(data.finAccountCost);
    }

    const detail = {
      finAccountDate: data.finAccountDate,
      categoryName: data.categoryName,
      finAccountItem: data.finAccountItem,
      finAccountCost: value,
    };
    setDetails((details) => [...details, detail]);
  };

  const push_detail = (arr) => {
    for (let j = 0; j < arr.length; j++) {
      create_detail(arr[j]);
    }
  };

  // api 연결 (adminIdx, jwt토큰 필요)
  const jwt = sessionStorage.getItem('jwtToken');
  const adminIdx = parseInt(sessionStorage.getItem('adminIdx'));
  useEffect(() => {
    client
      .get('/admin/finAccount', {
        headers: {
          'x-access-token': jwt,
          adminIdx: adminIdx,
        },
      })
      .then((response) => {
        // setDetails(response.data.result);
        push_detail(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!details) {
    return <div>로딩중</div>;
  }
  console.log(details);

  return (
    <DetailRecentStyle>
      <DetailHeader>
        <ShortStyle style={{ height: '4.25rem', borderLeft: 'none' }}>
          일자
        </ShortStyle>
        <ShortStyle style={{ height: '4.25rem' }}>카테고리</ShortStyle>
        <LongStyle style={{ height: '4.25rem' }}>항목</LongStyle>
        <ShortStyle style={{ height: '4.25rem' }}>금액</ShortStyle>
      </DetailHeader>
      {index_arr.map((idx, index) =>
        details[idx] ? (
          <DetailContent key={index}>
            <ShortStyle style={{ borderLeft: 'none' }}>
              {details[idx].finAccountDate}
            </ShortStyle>
            <ShortStyle>{details[idx].categoryName}</ShortStyle>
            <LongStyle>{details[idx].finAccountItem}</LongStyle>
            <ShortStyle>{details[idx].finAccountCost}</ShortStyle>
          </DetailContent>
        ) : (
          <DetailContent key={index}>
            <ShortStyle style={{ borderLeft: 'none' }} />
            <ShortStyle />
            <LongStyle />
            <ShortStyle />
          </DetailContent>
        ),
      )}
    </DetailRecentStyle>
  );
};

export default DetailRecent;
