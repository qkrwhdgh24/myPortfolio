import { Outlet, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import GlobalStyle from './styles/GlobalStyle';
import MainVideo from './component/MainVideo';
import Action from './component/Aciton';
import Comedy from './component/Comedy';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from './store/reducers'
import thunk from 'redux-thunk';
import DetailPage from './component/DetailPage';


/*
중첩 라우팅을 사용해서 children으로 링크를 설정했다면
컴포넌트 내에서도 중첩라우팅을 children과 같은 개념으로 구조를 작성할 수 있게 해주는hook

*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

function App() {
  return (
    <>
      <GlobalStyle />{/*reset css사용 */}
      <Header />
      <MainVideo/>
      <Outlet/>
      
      <Provider store={store}>
        <Action/>
        {/* <Comedy/> */}
        
      </Provider>

      {/* <Routes>
        <Route path=':movieId' element = {<DetailPage/>}/>
      </Routes> */}


    </>
  );
}

export default App;
