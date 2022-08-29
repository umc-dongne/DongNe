import React from 'react';
import Button from '../components/Button';
import styled, { css } from 'styled-components';
import palette from '../styles/pallete';
import { useHistory } from 'react-router-dom';

const RegisterSelect = (props) => {
    const history = useHistory();
    const RegisterSelectBtn = styled.div`
        width: 20rem;
        height: 22rem;
        background-color: #ffffff;
        border-radius: 0.625rem;
        outline: none;
        margin-bottom: 1rem;
        margin-top: -0.625rem;
        padding-top: 2rem;
        padding-bottom: 2rem;

        .title{
            font-family: 'Pretendard ExtraBold';
            font-size: 1.8rem;
            padding-bottom: 0.3rem;
        }

        .subtitle{
            padding-top: 0.2rem;
            padding-bottom: 0.5rem;
            font-size: 1.2rem;
            font-weight: lighter;
            color: ${palette[2]};
        }

        .explain{
            padding-top: 1rem;
            color: ${palette[4]};
            font-size: 0.8rem;
        }

        .points{
            color: ${palette[4]};
        }
    `;
    const StyledImg = styled.img`
    width: 4rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: ${palette[1]};
  `;

    const StlyedList = styled.span`
    color: ${palette[4]};
    font-size: 1rem;
    font-weight: lighter;
    padding-bottom: 2rem;

    .list{
        padding-bottom: 0.5rem;
    }
    `

    const title=props.title;
    const subtitle=props.subtitle;
    const img_src = props.img_src;
    const text1 = props.text1;
    const text2 = props.text2;
    const text3 = props.text3;
    const text4 = props.text4;
    const explain = props.explain;
    const nextlink=props.nextlink;
    
    return (
    <div className='RegisterSelectBtnTemplate' style={{margin:"0.625rem"}}>
        <RegisterSelectBtn>
        <div>
            {img_src ? <StyledImg src={img_src} /> : <div />}
            <div className='title'>{title}</div>
            <div className='subtitle' style={{ marginBottom: '1rem' }}>({subtitle})</div>
            <StlyedList>
                <div className='list'>{text1}<br /></div>
                <div className='list'>{text2}<br /></div>
                <div className='list'>{text3}<br /></div>
                <div className='list'>{text4}<br /></div>    
            </StlyedList>
            <span className='points'>⋮</span><br />
            <div className='explain'>{explain}</div>
        </div>
        </RegisterSelectBtn>
        
        <Button
          text="가입하기"
          fullWidth
          history={history}
          to={nextlink}
          style={{height:"3rem"}}
        />

    </div>
    );
  };
  
  export default RegisterSelect;
  
