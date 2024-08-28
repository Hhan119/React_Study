import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Link, useNavigate } from "react-router-dom";

// axios를 이용해서 get 방식 /members 요청을 해서 응답되는 데이터를 이용해서 출력
function Member() {

    const navigate = useNavigate()

    const reflash = ()=>{
        axios.get("/posts")
        .then(res=>SetMembers(res.data))
        .catch(error=>console.log(error))
    }
    const [state, setState]=useState({})
    // 회원 목록 상태값 관리
    const [members, SetMembers]=useState([]);
    // Member componenet 가 활성화 되는 시점에 호출되는 함수 등록
    // useEffect(함수, 반배열) 함수는 component가 활성화 될 때 최도 1번 호출된다. 
    useEffect(()=>{
        // 해당 component 에서 필요한 준비 작업을 여기서 하면된다.
        axios.get("/posts")
        .then(res=>{
        console.log(res.data)
        //응답된 데이터를 state 에 반영하기
        SetMembers(res.data)
      
      })
      .catch(error=>{
        console.log(error)
      })
    }, [])        
    const handleDelete=(id)=>{
        axios.delete("/posts/"+id)
        .then(res=>{
        console.log(res.data)
        setState({
            ...state,
        })
        alert(id+"번호의 회원을 삭제하였습니다.")
        //응답된 데이터를 state 에 반영하기
        reflash()
        })
        .catch(error=>{
        console.log(error);
        });
        
    }
   
    return (
        <>
            <Link to="/posts/new">게시글 추가</Link>
            <h1>게시판 목록</h1> 
            <p>게시판 목록을 보여드릴게요.</p>
            <table className="table table-bordered" size="sm" >
                <thead>
                    <tr className="table-primary">
                        <th>번호</th>
                        <th>작성자</th>
                        <th>제목</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    { members.map(item=><tr key={item.id}> 
                        <td>{item.id}</td>
                        <td>{item.author}</td>
                        <td>{item.title}</td>
                        <td><button className="btn btn-info" onClick={()=>{
                            // 회원정보 수정 페이지로 이동
                            navigate(`/posts/${item.id}/edit`)
                        }}>회원수정</button></td>
                        <td><button className="btn btn-danger" onClick={()=>{handleDelete(item.id)}}>회원삭제</button></td>
                        </tr>)}
                
                </tbody>


            </table>
        </>
    );
}

export default Member;