import React, {useState, useEffect}  from 'react';
import Button from '../components/Button';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';


const WhiteBox = styled.div`

    display: flex;
    justify-content: center;
    .list{
        display: flex;
        flex-direction: row;
    }
    .Clubname{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        width: 25rem;
        height: 3rem;
        border: 0.0625rem solid #2B78FF;
        border-radius: 0.625rem 0 0 0.625rem;
        font-family: 'Pretendard Bold';
        font-size: 1.2rem;
    }

    .btn{
        border-top-left-radius: 0rem;
        border-top-right-radius: 0.625rem;
        border-bottom-right-radius: 0.625rem;
        border-bottom-left-radius: 0rem;
    }
`


function Enterlist(props) {
    const history  = useHistory();
    const name = props.name;
    const img = props.img;
    const link = props.link;
    



    const handleApi = () =>{
        sessionStorage.setItem('adminIdx', link);
    }

    return (
        <WhiteBox> 
            <div className='list'>
            <div className='Clubname'> 
                <img src={img} alt="" style={{padding:"0.5rem", height:"2.5rem"}} /> 
                {name}
            </div>
            <div onClick={()=>{
                handleApi();
            }}>
                <Button
                className="btn"
                text={"입장하기"}
                history={history}
                to={"/user/home"}
                style={{height: "3.14rem", width: "7rem"}}
                // 왜3rem은 안되지
                />
            </div>
          </div>
        </WhiteBox>
    );
  }
  
  export default Enterlist;
  