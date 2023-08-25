import React, {useRef} from "react";
import {styled } from "styled-components";
import useClick from "./Hook/useClick";
//import {AiFillCloseCircle} from 'react-icons/ai';
import {IoCloseSharp} from 'react-icons/io'
import {RiCloseLine} from 'react-icons/ri'

export default function Modal({backdrop_path,setModal,title,overview}){
    
    const ModalRef = useRef();
    //useRef = 특정한 dom요소에 접근하기 위한 hook

    useClick(ModalRef,()=>{
        setModal(false);
    })

    return(
        <ModalContainer>
            <ModalWrapper>
                <ModalItem ref={ModalRef}>
                    <ModalInfo>
                        <ModalTitle>{title}</ModalTitle>
                    </ModalInfo>
                    <ModalCloseBtn onClick={()=>setModal(false)}>
                        <RiCloseLine className="close"/>
                    </ModalCloseBtn>
                    <Poster src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}/>
                    <ModalText>
                        {overview}
                    </ModalText>
                </ModalItem>
            </ModalWrapper>
        </ModalContainer>

    )
}

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.7);
    z-index: 9999;
    transform: translate(0px, calc(-150px + -50%));
`

const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    background: #000000;
`
const ModalItem= styled.div`
    max-width: 50vw;
    max-height: 80vh;


`

const Poster=styled.img`
    width: 100%;
`

const ModalCloseBtn = styled.button`
    width:40px;
    height: 40px;
    position: absolute;
    top: 20px;
    right:20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000000;
    border-radius: 100%;
    .close{
        font-size: 60px;
        color: #ffffff;
    }
`
const ModalInfo = styled.div`
    position: absolute;
    top:0px;
    left: 0px;
    padding-top: 250px;
    padding-left: 30px;
    width: auto;
    height: auto;
`

const ModalTitle = styled.h2`
    font-size: 40px;
    font-weight: bold;
    color: #ffffff;
    text-transform: uppercase;
    
`
const ModalText = styled.div`
    font-size: 20px;
    color: #ffffff;
    line-height: 1.5;
    padding: 24px;
    box-sizing: border-box;
`

