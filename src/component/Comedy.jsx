import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActionMovies } from "../store/actions/index";
import { styled } from "styled-components";

//swiper
import {Swiper,SwiperSlide} from 'swiper/react'; //스와이퍼 적용 임포트
import 'swiper/css'; //스와이퍼 기본 css적용
import {Navigation, Pagination} from 'swiper/modules';// 스와이프 좌우버튼 활성 모듈
import 'swiper/css/navigation'; //좌우버튼에 대한 css
import 'swiper/css/pagination' //도트 네비게이션 css
import './SwiperReset.css'




//react redux = 리액트 상태 관리 라이브러리 
//스토어데이터를 사용하기 위해서는 redux를 사용한다.
export default function Action(){
    const dispatch = useDispatch();

   useEffect(()=>{
    dispatch(fetchActionMovies())
   },[])

    const actionData = useSelector(state => state.action.movies, []) || []
    console.log(actionData.results)
    //useSelector = useDispatch로 받아온 상태값을 반환

    return (
        <ActionWrapper>
        <MovieTitle>액션 장르</MovieTitle>
        <Swiper 
            spaceBetween={10} //슬라이드와 슬라이드 사이의 여백(gap)
            slidesPerView={6}//한번에 보여질 슬라이드의 갯수
            slidesPerGroup={6}//한번에 움직일 슬라이드의 갯수
            navigation //네비게이션 css 적용
            modules={[Navigation, Pagination]} //모듈 적용
            pagination={{clickable:false}}//clickable:true 클릭하면 해당 페이지로 이동
            loop//무한 반복

            
        >
        
            
        <div className="movieWrapper">
            {actionData.results && actionData.results.map(movie =>(
                <SwiperSlide>
                    <Movie>
                    <img src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}/>
                    </Movie>
                    </SwiperSlide>
                
            ))}
        </div>
        
        </Swiper>
        </ActionWrapper>
    )

}

const ActionWrapper = styled.div`
    transform: translateY(-100px);
    box-sizing: border-box;
`
const MovieTitle = styled.h2`
        font-size: 40px;
        color: #ffffff;
        font-weight: bold;
        margin-bottom: 20px;
        padding-left:30px;
`
const Movie = styled.div`
    width: 300px;
    flex-shrink: 0;
    img{
        width: 100%;
        object-fit: cover;
    }
`

