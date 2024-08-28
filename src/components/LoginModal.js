import axios from "axios";
import { decodeToken } from "jsontokens";
import { useState } from "react";
import { Alert, Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


function LoginModal(props) {

    // 페이지 이동을 위한 hook
    const navigate = useNavigate()

    // 입력한 userName 과 password 를 상태값을 관리
    const [state, setState]=useState({})
    // 아이디 또는 비밀번호가 일치하지 않는경우 에러 정보를 출력하기 위해
    const [isError, setError]=useState(false)
    // input 요소에 문자열을 입력했을 때 호출되는 함수
    const handleChange = (e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
        // action 을 dispatch 할수 있는 함수 
        const dispatch = useDispatch()
        // 로그인 버튼을 눌렀을 대 실행 할 함수
        const handelLogin = ()=>{
            axios.post("/auth", state)
            .then(res=>{
                // 로그인 성공이면, 여기가 실행되면서 jwt가 발급된다.
                console.log(res.data)
                // 토큰을 loaclStorage에 저장
                localStorage.token=res.data
                // 에러 정보 없앤다.
                setError(false)
                // 토큰을 디코딩해서 사용자 정보를 얻어온다.
                const result=decodeToken(localStorage.token.substring(7))
                // 토큰에 저장된 주제(subject) 얻어내기
                const userName=result.payload.sub
                // 로그인 상태값 변경
                // dispatch({type:"SET_LOGIN", payload:true})
                // 로그인 된 userName 변경
                dispatch({type:"UPDATE_USER", payload:userName})
                // 로그인 모달창 숨기기
                dispatch({type:"LOGIN_MODAL", payload:{show:false}})
                // axios 의 header에 인증정보를 기본으로 가지고 갈 수 있도록 설정
                axios.defaults.header.common["Authorization"]=localStorage.token
                // 로그인 이후에 원래 가려던 곳이 있으면 해당 위치로 이동할 수 있도록 처리 
                if(props.url){
                    // 원래 가려던 곳으로 이동
                    navigate(props.url)
                }
            })
            .catch(err=>{
                console.log(err)
                // 아이디 혹은 비밀번호가 틀리면 여기가 실행된다.
                setError(true)
            })
        }

    return (
        <Modal {...props} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>{props.message}</Modal.Title> 
            </Modal.Header>
            <Modal.Body>
                <FloatingLabel controlId="userName" label="User Name" className="mb-3">
                    <Form.Control onChange={handleChange} name="username" type="text" placeholder="User Name ..." />
                </FloatingLabel>
                <FloatingLabel controlId="password" label="password" className="mb-3">
                    <Form.Control onChange={handleChange} name="password" type="text" placeholder="Password ..." />
                </FloatingLabel>
                {
                    isError && <Alert variant="danger">아이디 혹은 비밀번호가 틀려요</Alert>
                }
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handelLogin}>로그인</Button>
            </Modal.Footer>
        </Modal>
     
    );
}

export default LoginModal;