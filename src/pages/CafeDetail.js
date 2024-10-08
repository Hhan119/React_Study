import axios from 'axios';
import React, { createRef, useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

// css import
import myCss from './css/cafe_detail.module.css'
// binder import
import binder from 'classnames/bind'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-bootstrap";
import ConfirmModal from '../components/ConfirmModal';
// cs 함수
const cx=binder.bind(myCss)

// 새로 등록한 댓글을 추가할 인덱스 
let commentIndex=0;

function CafeDetail() {
    // "/cafes/:num" 에서 num에 해당되는 경로 파라미터 값 읽어오기 
    const {num} = useParams()
    // 글 하나의 정보를 상태값으로 관리(초기 값으로 빈 오브젝트를 넣어줘야함)
    const [state, setState] = useState({})
    // 검색 키워드 관련처리(변경 할 내용이 없다면 setParams 제외 가능) 
    const [params, setParams]=useSearchParams()
    // 댓글 목록을 상태값으로 관리
    const [commentList, setCommentList]=useState([])
    
    useEffect(()=>{
        // 서버에 요청을 할 때 검색 키워드 관련 정보도 같이 보낸다.
        const query = new URLSearchParams(params).toString()
        // 여기서 query는 "condition=검색조건&keyword=검색어" 형식의 문자열이다.
        axios.get(`/cafes/${num}?${query}`)
        .then(res=>{
            console.log(res.data)
            setState(res.data.dto) // dto를 넣어줘야 데이터 출력이 됨
            // 댓글 목록 배열에 ref 라는 방을 추가한다. 
            const list=res.data.commentList.mpa(item=>{
                item.ref=createRef()
                return item
            }) 
            // 댓글 목록
            //setCommentList(res.data.commentList)
            setCommentList(list)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [num]) // 경로 파라미터가 변경될 때 서버로부터 데이터를 다시 받아오도록 한다

    // 로그인 된 사용자명이 store에 있는지 읽어온다.
    const userName = useSelector(state=>state.userName)
    // javascript로 경로 이동 하기위한 hook
    const navigate = useNavigate()
    //Confirm 모달을 띄울지 여부를 상태값으로 관리하기 
    const [confirmShow, setConfirmShow]=useState(false)
    //글 삭제 확인을 눌렀을때 호출되는 함수 
    const handleYes = ()=>{
        
        axios.delete(`/cafes/${num}`)
        .then(res=>{
            console.log(res.data)
            navigate("/cafes")
        })
        .catch(error=>{
            console.log(error)
        })
    }

    const dispatch=useDispatch()

    const handleCommentSubmit = (e)=>{
        e.preventDefault() // 폼 전속을 막기

        if(!userName){
            // 로그인 모달을 띄운다.
            const payload={show:true, message:"댓글 작성을 하려면, 로그인을 해주세요"}
            dispatch({type:"LOGIN_MODAL", payload})
            return; // 여기서 함수를 종료한다
        }

        const action=e.target.action 
        const method=e.target.method
        const formData=new FormData(e.target) // 폼에 입력한 내용을 FormData로 얻어내기
        // FormData 에 입력한 내용을 object 로 변환 해서 json 문자열을 서버에 전송할수도 있다. 
        // const obj = Object.fromEntries(FormData.entries())
        // form에 입력한 내용을 FormData 객체에 담기(input 요소에 name 속성이 반드시 필요!)
        
        axios[method](action, formData)
        .then(res=>{
            // 방금 저장한 댓글의 정보
            console.log(res.data)
            const newComment = res.data
            // 댓글의 정보에 ref 라는 방을 추가하고 거기에 참족밧을 담을 object를 넣어준다.
            // 아래 코드를 실행하면 newComment는 이런 모양이다.
            // {num:x, content:"xxx", ..., ref:{current:x}}
            newComment.ref=createRef()
            // 이 댓글을 commentIndex에 끼워넣기
            commentList.splice(commentIndex, 0, newComment)
            // 끼워 넣은 새로운 배열로 상태값을 변경한다.
            setCommentList([...commentList])
            // 댓글 입력한 textarea 초기화 
            e.target.content.value=""
            
        })
        .catch(error =>{
            console.log(error)
        })
    }

    return (
        <div>
            <nav>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/cafes">Cafe</Link></li>
                    <li className="breadcrumb-item active">Detail</li>
                </ol>
            </nav>
            { state.prevNum !== 0 ? <Link to={`/cafes/${state.prevNum}?${new URLSearchParams(params).toString()}`}>이전글</Link> : ""}
            { state.nextNum !== 0 ? <Link to={`/cafes/${state.nextNum}${new URLSearchParams(params).toString()}`}>다음글</Link> : ""}

            <h1>글 자세히 보기 페이지</h1>
            {   params.get("condition") &&
                <p>
                    <strong>{params.get("condition")}</strong> 조건
                    <strong>{params.get("keyword")}</strong> 검색어로 검색된 내용
                </p>
            }
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <td>{state.num}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{state.writer}</td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td>{state.title}</td>
                    </tr>
                    <tr>
                        <th>조회수</th>
                        <td>{state.viewCount}</td>
                    </tr>
                </thead>
            </table>
            <div className={cx("content")} dangerouslySetInnerHTML={{__html:state.content}}></div>
            {
                userName === state.writer && <>
                    <Button onClick={()=>navigate(`/cafes/${num}/edit`)} variant="warning">수정</Button>
                    <Button onClick={setConfirmShow} variant="danger">삭제</Button>
                </>
            }
            <ConfirmModal show={confirmShow} message="글을 삭제하시겠습니까?" 
                yes={handleYes} no={()=>setConfirmShow(false)}/>

            <h3>댓글을 입력해주세요.</h3>
            <form className={cx("comment-form")} action={`/cafes/${state.num}/comments`} 
            method="post" onSubmit={handleCommentSubmit}>
                <input type="hidden" name="ref_group" defaultValue={state.num} />
                <input type="hidden" name="target_id" defaultValue={state.name} />
                <textarea name="content"></textarea>
                <button type="submit" onClick={()=>commentIndex=0}>등록</button>
            </form>
            {/* 댓글 목록 출력하기 */}
            <div className={cx("comments")}>
                <ul>
                    {
                        // li 안에서 item의 인덱스 값이 필요하다
                        commentList.map((item, index)=>(
                        <li key={item.num}
                            ref={item.ref}
                            className={cx({indent:item.num !== item.comment_group})}>
                                <svg style={{
                                    display: item.num !== item.comment_group ? 'inline':'none'
                                }}  className={cx('reply-icon')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"/>
                                </svg>
                            <dl>
                                <dt>
                                    { 
                                        item.profile === null ? <svg className={cx('profile-image')} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                            </svg>
                                        : <img className={cx('profile-image')} src={`/upload/images/${item.profile}`} alt="프로필 이미지" />
                                    }
                                    <span>{item.writer}</span>
                                    { item.num !== item.comment_group ? <i>@{item.target_id}</i> : null}
                                    <small>{item.regdate}</small>
                                    <Button variant="outline-success" size="sm" className="answer-btn" onClick={(e)=>{
                                        // 현재 버튼의 텍스트 
                                        const text=e.target.innerText
                                        if(text == "답글"){
                                            e.target.innerText="취소"
                                            item.ref.current.querySelector("."+cx("re-insert-form")).style.display="flex" // li요소의 참조값 
                                        } else{
                                            e.target.innerText="답글"
                                            item.ref.current.querySelector("."+cx("re-insert-form")).style.display="none"
                                        }
                                    }}>답글</Button>
                                </dt>
                                <dd>
                                    <pre>{item.content}</pre>
                                </dd>
                            </dl>
                            <form action={`/cafes/${num}/comments`}
                                className={cx(`re-insert-form`)}
                                onSubmit={handleCommentSubmit}
                                method="post">
                                <input type="hidden" name="ref_group" defaultValue={state.num} />
                                <input type="hidden" name="target_id" defaultValue={item.writer}/>
                                <input type="hidden" name="comment_group" defaultValue={item.comment_group}/>
                                <textarea name="content"></textarea>
                                <button type="submit" onClick={()=>{
                                    item.ref.current.querySelector("."+cx("re-insert-form"))
                                        .style.display="none"
                                        item.ref.current.querySelector(".answer-btn").innerText="답글"
                                        // 새로운 댓글은 이 폼이 속해있는 댓글의 인덱스 바로 다음 인덱스에 추가 되어야 한다
                                        commentIndex = index +1
                                        
                                }}>등록</button>
                            </form>
                        </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default CafeDetail;