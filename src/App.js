// App.css 적용하기 (내부 css)
import { NavLink, useOutlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import BsNavBar from './components/BsNavBar';
import LoginModal from './components/LoginModal';
import { useSelector } from 'react-redux';

//함수형 component
function App() {

  // 현재 route 된 정보를 출력해주는 hook
  const currentOutlet = useOutlet()
 //로그인 모달과 관련된 값을 redux store 로 부터 읽어온다.
 const loginModal = useSelector(state => state.loginModal) // loginModal에는 3개의 정보가 들어있다(show, message, url)
  return (
    <>
      <BsNavBar></BsNavBar>
      <div className="container">
        <div>{currentOutlet}</div>

      </div>
      <LoginModal show={loginModal.show} message={loginModal.message} url={loginModal.url} />
    </>
        
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App;
