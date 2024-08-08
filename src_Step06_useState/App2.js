// App.css 적용하기 (내부 css)
import {useState} from 'react';
import './App.css'

//함수형 component
function App() {
console.log("App 함수가 호출됨");
// 여러개의 값을 한번에 관리 할 수 있는 object로 상태값 관리하기
const [state, setState] = useState({count:0, myName:"김구라"})

// useState 함수를 이용해서 이름의 초기값은 김구라 버튼을 누르면 호랑이로 바뀌도록 해보세요
//const [myName, setmyName] = useState("김구라")
  return (
    <div className="container">
      <h1>인덱스 페이지 입니다</h1>
          <button onClick={()=>{
            setState({
                ...state,// 기존의 상태값을 펼쳐 놓고
                count:state.count+1 // 수정할 값만 수정
            })
          }}>{state.count}</button> 
          <p>내 이름은 <strong>{state.myName}</strong></p>
          <button onClick={()=>{
            setState({
                ...state, 
                myName:"호랑이"
            }) 
          }}>이름 변경</button> 
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;
