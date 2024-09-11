import React, { useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import AlertModal from './AlertModal';
import axios from 'axios';

function BsNavBar() {
        // 로그인 된 사용자명이 있는지 store에서 읽어와본다.
        const userName = useSelector(state=>state.userName)
        const kakaoId = useSelector(state=>state.kakaoId)
        // action을 dispatch 할 수 있는 함수
        const dispatch = useDispatch()
        const navigate = useNavigate()

        const [alertShow, setAlertShow] = useState(false)
        
        const handleLogout=()=>{
           // localStorage 에서 token을 삭제한다
           delete localStorage.token
           // userName을 null로 변경
           dispatch({type:"UPDATE_USER", payload:null})
           // 최상위 경로로 이동
           navigate("/")
           // 로그아웃 알람 띄우기
           setAlertShow(true)
        }

        const handleYes = ()=>{
            // 알림 모달 숨기기
            setAlertShow(false)
        }

        const G_REDIRECT_URL="http://localhost:3000/googleLogin/redirect";
        const G_CLIENT_ID_API_KEY="813308724720-70o3vscmtc40nt6v9llmj7t96l28k3sp.apps.googleusercontent.com"
        const googleURL = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+G_CLIENT_ID_API_KEY+"&redirect_uri="+G_REDIRECT_URL+"&response_type=code"+"&scope=email profile";

        const K_REST_API_KEY ='ea3fc29935a7e7b17c9a328b221b9488';
        const k_REDIRECT_URL ="http://localhost:3000/kakaoLogin/redirect";
        const kakaoURL = "https://kauth.kakao.com/oauth/authorize?client_id="+K_REST_API_KEY+"&redirect_uri="+k_REDIRECT_URL+"&response_type=code";
        
        const handlegoogleLogin = ()=>{
            window.location= googleURL;
        }

        const handlekakaoLogin = ()=>{
            window.location = kakaoURL;
        }

        const handlekakaoLogout = ()=>{
            const token = window.localStorage.getItem("KakaoToken");
            const kakaoId = window.localStorage.getItem("kakaoId")
            console.log(token)
            const authHeader = token.substring(7)
            console.log(authHeader)
            
            if (!token) {
                console.error("토큰이 없습니다. 로그아웃이 불가능합니다.");
                return;
              }
              
              axios.post("/api/v1/auth/kakaoLogout", {kakaoId}, {
                headers: {
                  "Authorization": `Bearer ${authHeader}`,
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              })
              .then((res) => {
                console.log(res.data); // 로그아웃 성공 메시지 확인
                window.localStorage.removeItem("KakaoToken"); // 토큰 제거
                window.localStorage.removeItem("kakaoId");
                alert("로그아웃 되었습니다.");
                // 필요한 후속 처리 (페이지 리다이렉트 등)
              })
              .catch((error) => {
                console.error("카카오 로그아웃 실패:", error);
                alert("로그아웃에 실패했습니다.");
              });
            
          const handlegoogleLogin=()=>{

          }
        }
    
    return (
            <>
            <AlertModal show={alertShow} message="로그아웃 되었습니다!" yes={handleYes} />
            <Navbar expand="md" className="bg-primary mb-2" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">Acorn</Navbar.Brand>
                    <Navbar.Toggle aria-controls="one"/>
                    <Navbar.Collapse id="one">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/members">Member</Nav.Link>
                            <Nav.Link as={NavLink} to="/posts">Post</Nav.Link>
                            <Nav.Link as={NavLink} to="/gallery">Gallery</Nav.Link>
                            <Nav.Link as={NavLink} to="/cafes">Cafe</Nav.Link>
                        </Nav>
                        { userName ? 
                        <>
                            <Nav>
                                <Nav.Link>{userName}</Nav.Link>
                                <span className="navbar-text">Signed in </span>
                                
                            </Nav>
                            <Button onClick={handleLogout} variant="outline-danger">Logout</Button>
                        </>
                        :
                        <Button variant="success" onClick={()=>{
                            // 로그인 모달을 띄우는 action을 dispatch 한다.
                            const action = {
                                type:"LOGIN_MODAL", 
                                payload:{
                                show:true,
                                message:"로그인 폼 입니다"     
                                }
                            }
                            dispatch(action)
                        }}>Sign in</Button> 
                        }
                        { kakaoId ? 
                        <>
                            <Nav>
                                <Nav.Link>{userName}</Nav.Link>
                                <span className="navbar-text">Signed in </span>
                            </Nav>
                            <Button onClick={handlekakaoLogout}>카카오 로그아웃</Button>
                            
                        </>
                        :
                        <Button onClick={handlekakaoLogin}>카카오 로그인</Button>
                        
                        }
                        <Button onClick={handlekakaoLogout}>카카오 로그아웃</Button>
                        <Button onClick={handlegoogleLogin}>구글 로그인</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            </>
           
     
        
    );
}

export default BsNavBar;