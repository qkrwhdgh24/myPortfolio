import React, { useEffect, useState } from "react";
import { BiSearch } from 'react-icons/bi'
import { MdClear } from 'react-icons/md'
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

export default function Search() {
    const [text, setText] = useState('')
    const navigate = useNavigate()//페이지를 이동할때 사용하는 hook
    //Link와 같은 역할을 하지만 이벤트나 어떤 행동이후에 동작하도록 할때에는 useNavigate() hook을 이용한다.
    const [visible, setVisible] = useState(false);
    const [showClearBtn, setShowClearBtn] = useState(false);
    const [list, setList] = useState(false);
    //검색어를 입력했을때의 상태값을 저장하여 새로운 container를 생성
    const [movieList, setMovieList] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize =10;
    let data  = []//data에 영화 리스트를 받아올 변수
    const API_KEY = '82776dd4e021405937c471b1f995902b';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&sort_by=&include_adult=false&query=${text}&language=ko-KR&page=1`;

    useEffect(()=>{
        if(!text){
            setList(false);
            setIsSearchActive(false);
        }
    },[text])

    useEffect(()=>{
        if(isSearchActive){
            document.body.classList.add('on')
        }else{
            document.body.classList.remove('on')
        }
    },[isSearchActive])



    const toggleInputOpen = (e) => {
        e.preventDefault()//기본 이벤트의 동작을 중지
        /*리액트는 기본동작이 기본적으로 중지되지 않으므로 명시적으로 항상
        e.preventDefault()를 추가해야 한다. */
        if (text.trim() !== '') {
            setVisible(true);
            //setShowClearBtn(!showClearBtn);
        } else {
            setVisible((prev) => !prev);
        }
    }
    const inputKeyPress = (e) => {
        if (visible && e.key === 'Enter') {
            e.preventDefault()
            navigate(`/videos/${text}`);
        }
    }
    const onClear = (e) =>{
        e.preventDefault();
        setText('');
        setShowClearBtn(false);
    }



    const fetch = async () =>{
        const res = await axios.get(url);
        data = res.data.results || [];
        setMovieList(data)
        //console.log(data)

    }


    return (
        <>
        <SearchForm visible={`${visible}`} className={visible ? 'on' : null}>
            <button className="search-btn" onClick={toggleInputOpen}>
                <BiSearch />
            </button>
            {visible && (
                <input type="text"
                    placeholder="제목,사람,장르"
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value)
                        setShowClearBtn(e.target.value.trim() !== '')
                        fetch(setMovieList());
                        setList(true);
                        setIsSearchActive(true);
                    }}
                    onKeyPress={inputKeyPress}
                />
            )}
            {showClearBtn && (
                <button className="clear-btn" onClick = {onClear}>
                    <MdClear />
                </button>
            )}
        </SearchForm>
        <ResultContainer className={(list ? "on":"")}>
                <div className="searchMovie">
                    <h3>{text}로 검색한 결과입니다.</h3>
                    {list ? (
                        <div className="listContainer">
                            {movieList && movieList.map(movie =>(
                                <List props={movie} key={movie.id}/>
                            ))}
                        </div>

                    ):(
                        <p>loading..</p>
                    )}
                </div>
        </ResultContainer>
        </>
    )
}

const List = (props) =>{
    const {backdrop_path, title} = props.props;
    const imgUrl = backdrop_path;

    return (
        <div className="listItem">
            <img src={`https://image.tmdb.org/t/p/original/${imgUrl}`} alt={title}/>
        </div>
    )
}

const SearchForm = styled.form`
    display: flex;
    padding: 2px;
    border: solid 1px transparent;
    overflow: hidden;
    position: relative;
    top: 0;
    left: 0;
    
    &.on{
        border-color : #ffffff;
        background : rgba(0,0,0,0.7);
        transition: 500ms;
    }
    button{
        color: #ffffff;
        font-size: 20px;
        display: flex;
        align-items: center;
    }
    input{
        width:${({ visible }) => (visible ? '200px' : '0px')};
        color: #ffffff;    
    }
    .clear-btn{
        position: absolute;
        right:0;
        top: 0;
    }
   
`
const ResultContainer = styled.div`
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    display: none;
    z-index: -1;
    padding-top: 100px;
    overflow: scroll;
    &.on{
        display: block;
    }

    .searchMovie{
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        h3{
            color: #ffffff;
            font-weight:bold;
            font-size: 36px;
            text-align: center;
        }

        .listContainer{
            width: 100%;
            height: 100%;
            justify-content: center;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            .listItem{
                img{
                    width: 350px;
                }
            }
        }
    }
`