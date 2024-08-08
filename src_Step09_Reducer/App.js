import MyCounter from "./components/MyCounter";
import YourCounter from "./components/YourCounter";
import Friends from "./components/Friends";

//함수형 component
function App() {

  return (
    <>
      <h1>인덱스 페이지 입니다</h1>
    <MyCounter/>
    <YourCounter/>
    <Friends/>
    </>
  );
}


//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;
