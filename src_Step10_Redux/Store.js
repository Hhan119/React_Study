// App.css 적용하기 (내부 css)
import * as ReactDOM from 'react-dom';
// legacy_createStore 를 createStore 라는 이름으로 사용하기(store를 만들 함수)
import {legacy_createStore as createStore} from 'redux';
// store(저장소) 공급자
import {Provider} from 'react-redux';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// store 에서 관리 될 state의 초기값
const initialState={
  userName:null,
  isLogin:false

}
// reducer 함수
const reducer = (state=initialState, aciotn)=>{
  let newState

  return newState
}

// reducer 함수를 전달하면서 store(저장소)를 만든다.
const store = createStore(reducer)

// id가 root 인 곳에 UI 출력하기
const root =ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)