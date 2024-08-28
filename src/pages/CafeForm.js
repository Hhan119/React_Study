import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { initEditor } from '../editor/SmartEditor';
import { useNavigate } from 'react-router-dom';

function CafeForm() {

    // SmartEditor에 작성한 내용을 textarea의 value로 넣어 줄 때 필요한 함수가 editorTool이다.
    const [editorTool, setEditorTool] = useState([])

    useEffect(()=>{
        // initEditor() 함수를 호출하면서 smartEditor로 변환 할 textarea의 id를 전닳하면
        // textarea 가 smartEditor로 변경되면서 에디터 tool 객체가 리턴된다.
        // initEditor() 함수를 호출해야 SMartEditor 가 초기화 된다. 
        setEditorTool(initEditor("content"));
    },[])

    // 입력한 내용을 얻어오기 위한 useRef()
    const inputTitle=useRef()
    const inputContent=useRef()

    // 경로 이동을 할 함수
    const navigate = useNavigate()

    return (
        <>
           <h1>새글 추가 양식입니다.</h1> 
           <Form>
                <FloatingLabel label="제목" className="mb-3" controlId="title">
                    <Form.Control ref={inputTitle} type="text" placeholder="제목 입력..."/>
                </FloatingLabel>
                <Form.Group className="mb-3"  controlId="content">
                    <Form.Label>내용</Form.Label>
                    <Form.Control ref={inputContent} as="textarea" rows="10"/>
                </Form.Group>
                <Button type="submit" onClick={(e)=>{
                    // 폼 제출 막기(새로고침 방지)
                    e.preventDefault();
                    // 에디터 tool을 이용해서 SmartEditor에 입력한 내용을 textarea의 value 값으로 변환
                    editorTool.exec();
                    // 입력한 제목과 내용을 읽어와서
                    const title=inputTitle.current.value
                    const content=inputContent.current.value
                    console.log(title, content)
                    // axios 를 이용해서 api 서버에 전송
                    axios.post("/cafes", {title, content})
                    .then(res=>{
                        console.log(res.data)
                        alert("저장했습니다")
                        //글 목록 보기로 이동 
                        navigate("/cafes")
                    })
                    .catch(error=>{
                        console.log(error)
                    })
                }}>저장</Button>
            </Form>
        </>
    );
}

export default CafeForm;