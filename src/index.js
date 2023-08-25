import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';//페이지 이동 처리 api

import App from './App';
import NotFound from './pages/NotFound';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import DetailPage from './component/DetailPage';
const router = createBrowserRouter([

  {
    path : `${process.env.PUBLIC_URL}`,
    element : <App/>,
    errorElement : <NotFound/>,
    children:[
      /*children : 중첩라우터 children으로 연결 내부에 있는 파일은 부모요소의 링크를
      기준으로 한다. 내부에 children으로 작성하면 되면 중첩 url을 생략할 수 
      있어서 문법이 간결해진다.
      */
     {path:'videos', element: <Videos/>},
     {path:'videos/:keyword', element : <Videos/>},//검색으로 나오는 결과물
     {path:'videos/watch/:videoId', element :<VideoDetail/>},
     
    ]
    
  },
    {path:'/movie/:movieId',element : <DetailPage/>}

])

// const routes = [
//   {
//     path : '/',
//     element : <App/>,
//     errorElement : <NotFound/>,
//     children:[
//       /*children : 중첩라우터 children으로 연결 내부에 있는 파일은 부모요소의 링크를
//       기준으로 한다. 내부에 children으로 작성하면 되면 중첩 url을 생략할 수 
//       있어서 문법이 간결해진다.
//       */
//      {path:'videos', element: <Videos/>},
//      {path:'videos/:keyword', element : <Videos/>},//검색으로 나오는 결과물
//      {path:'videos/watch/:videoId', element :<VideoDetail/>},
     
//     ]
    
//   },
//     {path:'/movie/:movieId',element : <DetailPage/>}
  
// ]

// const router = createBrowserRouter({
//   basename: process.env.PUBLIC_URL,
//   routes: routes
// })


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router ={router} basename={process.env.PUBLIC_URL}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
