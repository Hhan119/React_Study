import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Form} from 'react-bootstrap';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

function MemeberUpdateForm() {

    const navigate = useNavigate()

    // 경로 파라미터 /members/:num/edit에서 num 값 읽어오기
    const {id}=useParams()

    // 수정할 회원의 정보를 state로 관라ㅣ
    const [state, setState]=useState({    
        id:0,
        author:"",
        title:""
    })
    
    const handleUpdate=()=>{
        axios.put("/posts/"+id, state)
        .then(res=>navigate("/posts"))
        .catch(err=>{console.log(err)})
    }
    useEffect(()=>{
        // 컴포넌트가 활성화 되는 시점에 수정할 회원의 번호를 이용ㅎ서 수저알 회원의 정보를 로딩한다.
        axios.get("/posts/"+id)
        .then(res=>setState(res.data))
        .catch(err=>{console.log(err)})

    },[])

    const handleChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    
    return (
        <>
             <h1>회원정보 수정 양식</h1>
            <Form>
            <Form.Group as={Row} className="mb-3" controlId="author">
                <Form.Label column sm={2}>작성자 </Form.Label>
                <Col sm={10}>
                    <Form.Control onChange={handleChange} type="text" name="author" value={state.author} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="title">
                <Form.Label column sm={2}>제목 </Form.Label>
                <Col sm={10}>
                    <Form.Control onChange={handleChange} type="text" name="title" value={state.title} />
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }}>
                    <Button onClick={()=>{handleUpdate()}} variant="primary">게시글 수정</Button>
                </Col>
            </Form.Group>
            </Form>
        </>
    );
}

export default MemeberUpdateForm;