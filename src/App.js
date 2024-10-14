// App.css 적용하기 (내부 css)
import { NavLink, useNavigate, useOutlet } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css"
import BsNavBar from "./components/BsNavBar"
import LoginModal from "./components/LoginModal"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { decodeToken } from "jsontokens"
import axios from "axios"
import AlertModal from "./components/AlertModal"

//함수형 component
function App() {
  // 현재 route 된 정보를 출력해주는 hook
  const currentOutlet = useOutlet()
  //로그인 모달과 관련된 값을 redux store 로 부터 읽어온다.
  const loginModal = useSelector((state) => state.loginModal) // loginModal에는 3개의 정보가 들어있다(show, message, url)
  // action을 발생하기 위한 함수
  const dispatch = useDispatch()

  // 알림 모달의 상태관리
  const [alertShow, setAlertShow] = useState(false)
  // store에서 관리되는 userName을 읽어와본다.
  const userName = useSelector((state) => state.userName)
  // timeout의 아이디 상태값으로 관리
  const [timeoutId, setTimeoutId] = useState({
    id1: null,
    id2: null,
  })
  const navigate = useNavigate()

  // App 컴포넌트가 최초 활성화 되거나 혹은 userName이 변경되었을때 실행할 함수 등록
  // userName은 로그인하면 로그인된 Id, 로그아웃하면 null로 변경한다.
  useEffect(() => {
    if (timeoutId.id1) {
      clearTimeout(timeoutId.id1)
      clearTimeout(timeoutId.id2)
      setTimeoutId({
        id1: null,
        id2: null,
      })
    }

    if (localStorage.token) {
      const result = decodeToken(localStorage.token.substring(7))
      //expire 되는 시간이 초 단위로 저장되어 있으므로 1000 을 곱해서 ms 초 단위로 만든다
      const expTime = result.payload.exp * 1000
      //현재 시간 ms 초 단위로 얻어내기
      const now = new Date().getTime()
      // 만약에 토큰의 유효시간이 남아있다면
      if (expTime > now) {
        // 남은 시간을 얻어낸다.
        const remainTime = expTime - now
        // 로그아웃 예고 알림을 띄운다.
        const id1 = setTimeout(() => {
          setAlertShow(true)
        }, remainTime - 1000 * 60 * 5)
        // 남은시간이 경과 했을 대 실행할 함수 등록
        const id2 = setTimeout(() => {
          // locatStorage에서 token을 삭제한다.
          delete localStorage.token
          // axios 헤더에 설정된 값 초기화 하기
          delete axios.defaults.headers.common["Authorization"]
          alert("로그 아웃 되었습니다.")
          // 0.1초 이후에 redux store의 상태값을 변경한다.
          setTimeout(() => {
            dispatch({ type: "UPDATE_USER", payload: null })
            navigate("/")
          }, 100)
        }, remainTime)
        // timeout 아이디 값을 상태값으로 관리
        setTimeoutId({ id1, id2 })
      }
    }
  }, [userName])
  return (
    <>
      <AlertModal
        show={alertShow}
        message="5분 뒤에 로그아웃 됩니다. 다시 로그인 해주세요!"
        yes={() => setAlertShow(false)}
      />
      <BsNavBar />
      <div className="container" style={{ marginTop: "60px" }}>
        <div>{currentOutlet}</div>
      </div>
      {loginModal.show && (
        <LoginModal
          onHide={() => dispatch({ type: "LOGIN_MODAL", payload: { show: false } })}
          show={loginModal.show}
          message={loginModal.message}
          url={loginModal.url}
        />
      )}
    </>
  )
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App
