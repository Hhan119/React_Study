
import { Component } from 'react';
import axios from 'axios';

//클래스형 component
class Post extends Component{
  // 상태값 (UI에서 사용하는 데이터)
  state ={
    posts:[]
  }
  
  // Post 컴포넌트가 준비 완료되었을때, 최초 한번 호출되는 함수(개발환경에서는 2번) 
  componentDidMount(){
    this.getPosts()
  }

  // Post 컴포넌트가 비활성화 되기 직전에 호출되는 함수
  componentWillUnmount(){
    console.log("Post 컴포넌트에서 무언가 마무리 작업을 합니다!");
    }

  // 전체 글 목록을 받아오느 함수
  getPosts = ()=>{
    // axios가 get 방식 "/v2/posts" 요청을 대신 해준다. 응답되는 json 문자열을 
    // 실제 array or object로 변경을 해서 then() 함수 안에 전달한 함수의 매개변수 res에 넣어준다.
    // res는 object 이고 res의 data라는 방에 array or object가 들어있다. 
    axios.get("/v2/posts")
    .then(res=>{
      console.log(res)
      this.setState({
        posts:res.data
      })
    })

  }

  render(){

    return (
      <div className="container">
        <h3>새 글 작성 폼 </h3>
        <form action="/v2/posts" method="post" onSubmit={(e)=>{
          e.preventDefault(); // 폼 전송 막기
          // 요청 url
          const url=e.target.action;
          // 전송할 폼 데이터
          const formData = new FormData(e.target);
          // FormData에 들어 있는 내용을 이용해서 json 문자열 만들어내기 
          const formObject={
          }
          formData.forEach((value, key)=>{
            formObject[key]=value;
          });
          // const jsonString = JSON.stringify(formObject);
          // object를 json 문자열로 변경할 필요 없이 object를 두번째 인자로 전달 or query 문자열을 전달 하면된다.
          // axios.posts(요청 url, object or query 문자열)
          axios.post(url, formObject)
          .then(res=>{  
            this.getPosts()
          })
        }}>
          <input type="text" name="title" placeholder='제목 입력..'/><br />
          <input type="text" name="author" placeholder='작성자 입력..'/><br />
          <button type="submit">저장</button>
        </form>
        <h3>버튼 클릭시 fatch 값 가져와서 출력</h3>
        <button onClick={()=>{
          fetch("/v2/posts")
          .then(res=>res.json())
          .then(data=>{
            console.log(data)
            // 서버로부터 응답된 data로 상태값을 변경한다.(UI 자동 업데이트)
            this.setState({
              posts:data
            })
          })
        }}>요청</button>
        
        <h3>글 목록 보기</h3>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
              {this.state.posts.map(item =>
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td><button onClick={()=>{
                    const title = prompt(item.id+ " 번 글의 수정할 제목 입력...")
                    // 수정 할 정보를 FormData 객체에 담는다.
                    const obj ={
                      title:title,
                      author:item.author
                    }
                    // odbject를 이용해서 json 문자열을 얻너낸다.
                    const jsonString = JSON.stringify(obj);
                    axios.put("/v2/posts/"+item.id, obj)
                      .then(res=>{
                        this.getPosts();

                      })
                  }}>수정</button></td>
                  <td><button onClick={()=>{
                    // axios.delete(요청 URL)
                     axios.delete("/v2/posts/"+item.id,{
                      method:"delete"
                     })
                      .then(res=>{
                        posts:this.state.posts.filter(it=>res.data.id !== it.id)
                      })
                    
                  }}>x</button></td>
                </tr>
              )}
          </tbody>
        </table>
      </div>
    )
  } 
}

export default Post;
