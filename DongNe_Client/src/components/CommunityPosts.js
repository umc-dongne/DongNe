import React from 'react';
import styled, { css } from 'styled-components';
import Chat from '../styles/imgs/icon/Chat.png';
import tag from '../styles/imgs/icon/tag.png';
import good from '../styles/imgs/icon/good.png';

const WhitBox = styled.div`
    width: 58rem;
    height: 3.5rem;
    background-color: black;
    background: linear-gradient(180deg, #FBFBFB 0%, rgba(251, 251, 251, 0) 100%);
    backdrop-filter: blur(6.25rem);
    /* Note: backdrop-filter has minimal browser support */
    border-radius: 0.625rem;

    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    padding-bottom: 1.5rem;

    .all{
        margin: 0 1rem;
    }

    .type{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 4rem;
        height: 2rem;
        background: #E1F0FF;
        border-radius: 0.25rem;
        color:#2B78FF;
        font-family: 'Pretendard Bold';
    }

    .title{
        display: flex;
        align-items: center;
        width: 36rem;
        color: #465B90;
        font-family: 'Pretendard Bold';
        font-size: 1rem;
        padding: 0 1rem;
    }

    .tag{
        width:15rem;
        background-color: black;
    }
    
    & img{
        width:1.5rem;
        padding-right: 1rem;
    }

    .icons{
        display: flex;
        flex-direction: row;
        width: 15rem;
    }

    .details{
        display: flex;
        align-items: center;
        padding-right: 1rem;
    }
`

const Posts = (props) => {

    const type = props.type;
    const title = props.title;
    const goodPoint = props.goodPoint;
    const chatPoint = props.chatPoint;
    const tagPoint = props.tagPoint;

    return (
        <WhitBox>
            <div className='all'>
                <div className='type'>
                    {type}
                </div>
                <div className='title'>
                    {title}
                </div>
                <div className='icons'>
                    <div className='details'><img src={good} alt="" />{goodPoint}</div>
                    <div className='details'><img src={Chat} alt="" />{chatPoint}</div>
                    <div className='details'><img src={tag} alt="" />{tagPoint}</div>
                </div>
            </div>
        </WhitBox>
    )
  };
  
  export default Posts;
  