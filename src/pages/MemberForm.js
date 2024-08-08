
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function MemberForm() {
    // 리아트 페이지 이동을 javascript 할 때 사용하는 함수
    const navigate = useNavigate()

    const [state, setState]=useState({})
    // 이름 혹은 주속를 입력했을 때 호출되는 함수 
    const handleChange = (e)=>{
        // change event 가 읽어낸 요소에 입력한 값을 state 값으로 반영한다.
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleSave=()=>{
        // state 로 관리되는 object를 전송한다.(요청의 body에 json 문자열이 전송된다)
        // state가 데이터 받을 때는 json 문자열을 objcet로 변형되어 가져온다.
        axios.post("/members", state)
        .then(res=>{
        console.log(res.data)
        alert(res.data.name+"님의 정보가 추가되었습니다.")
        // 현재 위치는 "/member/new" 인데 "/members"로 이동하면 회원 목록이 나온다.
        navigate("/members")
        //응답된 데이터를 state 에 반영하기
        setState(res.data)
        })
        .catch(error=>{
        console.log(error);
        });
    }
    return (
        <>
            
            <h1>회원 추가 양식</h1><br />
            
            <Form>
            <Form.Group as={Row} className="mb-3" controlId="name">
                <Form.Label column sm={2}>팀이릅 </Form.Label>
                <Col sm={10}>
                    <Form.Control onChange={handleChange} type="text" name="name"placeholder="팀이릅 입력" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="addr">
                <Form.Label column sm={2}>국적 </Form.Label>
                <Col sm={10}>
                    <Form.Control onChange={handleChange} type="text" name="addr" placeholder="국적 입력" />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button onClick={handleSave} variant="primary">추가</Button>
                </Col>
            </Form.Group>
            </Form>
            
        </>
    );
}

export default MemberForm;