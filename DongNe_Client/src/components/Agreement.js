import React, {useState, useEffect}  from 'react';
import Off from '../styles/imgs/icon/off.png';
import On from '../styles/imgs/icon/On.png';
import line from '../styles/imgs/icon/line.png';
import Button from '../components/Button';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const WhiteBox = styled.div`
    width: 45rem;
    height: 35rem;
    border-radius: 0.625rem;
    padding-left: 3rem;
    padding-right: 3rem;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    background: linear-gradient(180deg, #FFFFFF 0%, rgba(251, 251, 251, 0) 100%);
    border: 0.125rem solid rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(2.5rem);
    /* Note: backdrop-filter has minimal browser support */

    color: #2D3B5C;  

    .bold{
        font-family: 'Pretendard Bold';
        padding-bottom: 1rem;
        font-size: 1.2rem;
    }
    & > div{
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        /* text-align: center; */
    }
    
    .img{
        padding-right: 1rem;
        width: 1.8rem;
        height: 1.8rem;
    }

    .outline{
        padding-top: 1rem;
    }
    
    .Agreementbtn{
        height: 2rem;
        border-radius: 0.1875rem;
    }

    .content{
        padding-top: 0.5rem;
        padding-bottom: 1rem;
    }
    .class {
        display: flex;
        align-items: center;
        padding-bottom: 0.5rem;
        font-family: 'Pretendard Bold';
        font-size: 1rem;
    }

    .explain{
        padding-bottom: 0.5rem;
        padding-left: 2.5rem;
    }

    .in{
        width: 45rem;
        height: 19rem;
        overflow-y: scroll;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */
       & ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
        }
    }

`

const InnerBox = styled.div`
    width: 40rem;
    height: 3rem;
    border-radius: 0.1875rem;
    font-size: 0.9rem;
    background-color: #F3F3F3;
    overflow-y: scroll;
    padding: 0.3rem;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
       & ::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
    
    .textcontent{
        padding: 0.3rem;
        line-height: 1.3rem;
    }
`

function Agreement(props) {
    const history  = useHistory();

    const [selectAll, setSelectAll] = useState(false);
    const [selectFirst, setSelectFirst] = useState(false);
    const [selectSecond, setSelectSecond] = useState(false);
    const [selectOption, setSelectOption] = useState(false);
    const [Ok, setOk] = useState(false);
    
    useEffect(() => {
      if (selectAll) {
        setSelectFirst(true);
        setSelectSecond(true);
        setSelectOption(true);
        setOk(true);
      } else {
        setOk(false);
      }
    }, [selectAll]);
  
    useEffect(() => {
      if (selectFirst && selectSecond && selectOption) {
        setSelectAll(true);
        setOk(true);
      } else {
        setSelectAll(false);
        setOk(false);
      }
      if (selectFirst && selectSecond) {
        setOk(true);
      } else {
        setOk(false);
      }
    }, [selectFirst, selectSecond, selectOption]);

    const Nextpage = props.Nextpage;
    const Presentpage = props.Presentpage;

    return (
        <WhiteBox>
        <div className='outline'>
            <div className='bold'>????????????</div>
            <div className="square">
                <div className='content'>
                    <div className='class'>
                        {selectAll ? (
                            <img
                            className='img'
                            src={On}
                            alt=''
                            onClick={() => {
                                setSelectAll(false);
                                setSelectFirst(false);
                                setSelectSecond(false);
                                setSelectOption(false);
                            }}
                            />
                            ) : (
                                <img className='img' src={Off} alt='' onClick={() => setSelectAll(!selectAll)} />
                                )}
                        ?????? ????????? ???????????????.
                    </div>
                </div>
            </div>
            <img src={line} alt="" style={{width: "45em"}}/>
            
            <div className='in'>
                <div className='content'>
                    <div className='class'>
                        {selectFirst ? (
                            <img className='img' src={On} alt='' onClick={() => setSelectFirst(!selectFirst)} />
                            ) : (
                                <img className='img' src={Off} alt='' onClick={() => setSelectFirst(!selectFirst)} />
                                )}
                        ????????? ?????? ?????? <span style={{color:"#2B78FF"}}>(??????)</span>
                    </div>
                    <div className='explain'>
                        <InnerBox className='innerText'>
                        <div className='textcontent'>
                            <p style={{fontWeight: "bold"}}>????????? ?????? ?????? ???????????????! </p>
                        ????????? ??? ??????(?????? ???????????????)??? ????????? ????????? ???????????????. 
                        ??? ????????? ????????? ???????????? ????????? ???????????? ???????????? ???????????? ??????
                        ??????(?????? ???????????????)??? ?????? ???????????? ????????? ????????? ??????(?????? ????????????) ?????? ??????????????? ????????? ????????????, 
                        ????????? ???????????? ????????? ????????? ????????? ????????? ??? ??? ?????? ????????? ????????? ???????????? ????????????.
                        </div>
                        </InnerBox>
                    </div>
                </div>

                <div className='content'>
                    <div className='class'>
                        {selectSecond ? (
                            <img className='img' src={On} alt='' onClick={() => setSelectSecond(!selectSecond)} />
                            ) : (
                                <img
                                className='img'
                                src={Off}
                                alt=''
                                onClick={() => setSelectSecond(!selectSecond)}
                                />
                                )}
                        ???????????? ?????? ?????? <span style={{color: "#2B78FF"}}>(??????)</span>
                    </div>
                    <div className='explain'>
                        <InnerBox className='innerText'>
                        <div className='textcontent'>
                        ???????????????????????? ?????? ???????????? ???????????? ??????????????? ?????? ???????????? ??????????????? ??????, ??????????????? ?????? ??? ????????????, 
                        ??????????????? ?????? ??? ????????????, ?????? ????????? ??? ?????? ?????? ??? ???????????? ?????? ????????? ?????? ???????????? ????????? ?????? ??? ???????????? ????????? ????????????.
                        </div>
                        </InnerBox>
                    </div>
                </div>

                <div className='content'>
                    <div className='class'>
                        {selectOption ? (
                            <img className='img' src={On} alt='' onClick={() => setSelectOption(!selectOption)} />
                            ) : (
                                <img
                                className='img'
                                src={Off}
                                alt=''
                                onClick={() => setSelectOption(!selectOption)}
                                />
                                )}
                        ?????????/????????? ???????????? <span style={{color: '#AAAAAA' }}>(??????)</span>
                    </div>
                    <div className='explain'>
                        <InnerBox className='innerText'>
                        <div className='textcontent'>
                        ????????? ??? ????????? ????????? ?????? ????????? ????????? ?????? ??? ???????????? ????????? ????????????.
                        </div>
                        </InnerBox>
                    </div>
                </div>
            </div>

            {Ok ? (
                <Button
                className="Agreementbtn"
                text="??????"
                fullWidth
                history={history}
                to={Nextpage}
                style={{ marginTop:"1rem", height: "2.5rem"}}>
                </Button>
            ) : ( 
                <Button
                className="Agreementbtn"
                text="??????"
                fullWidth
                history={history}
                to={Presentpage}
                style={{ marginTop:"1rem", height: "2.5rem"}}>
                </Button>
            ) }
        </div>
        
    </WhiteBox>
    );
  }
  
  export default Agreement;
  