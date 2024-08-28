import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Pagination } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';

function GalleryDetail(props) {
    // "gallery/:num"에서 해당되는 경로 파라미터 값 읽어오기
    const {num}=useParams()

    // galley 하나의 정보를 상태값으로 관리
    const [state, setState] = useState(null)

    const navigate =useNavigate()
    // 로그인 된 사용자명이 store에 있는지 읽어와 본다.
    const userName=useSelector(state=>state.userName)
    // useEffect()에 전달한 함수는 Component 가 활성화 되는 시점에 1번 호출되고 
    // num이 변경될 때 마다 다시 호출된다.
    useEffect(()=>{
        axios.get(`/gallery/${num}`)
        .then(res=>{
            console.log(res.data)
            // 서버로부터 응답된 갤러ㅣ 정보를 state에 반영한다.
            setState(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    },[num])

    const handleDelete = ()=>{
        axios.delete(`/gallery/${num}`)
        .then(res=>{
            console.log(res.data)
            navigate(`/gallery`)
        })
    }
    return (
        <>
            <h1>Gallery 자세히 보기 페이지</h1>
            {   state && 
                <>
                    <Pagination>
                        <Pagination.Item as={Link} to={`/gallery/${state.prevNum}`}>&larr; Prev</Pagination.Item>
                        <Pagination.Item as={Link} to={`/gallery/${state.nextNum}`}>&rarr; Next</Pagination.Item>
                    </Pagination>
                    <Card>
                        <Card.Img variant="top" src={`/upload/images/${state.saveFileName}`}/>
                        <Card.Body>
                            <Card.Text>{state.caption}</Card.Text>
                            <Card.Text>writer : {state.writer}</Card.Text>
                            <Card.Text>{state.regdate}</Card.Text>
                            {
                                userName === state.writer &&
                                <Button variant="danger" onClick={handleDelete}>삭제</Button>
                            }
                           
                        </Card.Body>
                    </Card>
                </>
            }
        </>
    );
}


export default GalleryDetail;