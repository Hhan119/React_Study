// App.css 적용하기 (내부 css)
import { useRef, useState } from 'react';
import './App.css'
import axios from 'axios';

//함수형 component
function App2() {

  //input 요소의 참조값을 활용하기 위해
  const inputFile = useRef()
  
  const [fileData, setFileData] = useState({
    orgFileName:"",
    saveFileName:"",
    fileSize:0,
    url:""
  })


  //업로드 버튼을 눌렀을때 호출되는 함수 
  const handleUpload = ()=>{
    //FormData 객체를 생성해서
    const formData = new FormData()
    //선택한 파일을 "image" 라는 파라미터명으로 담고 
    formData.append("myFile", inputFile.current.files[0])
    //axios 를 이용해서 multipart 요청을 보낸다
    axios.post("/file/upload", formData, {
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    .then(res=>{
        console.log(res.data)
        // 다운로드 요청을 할 url 구성
        const url="http://localhost:8888/file/download?"+
            "orgFileName="+res.data.orgFileName+
            "&saveFileName="+res.data.saveFileName+
            "&fileSize="+res.data.fileSize;
        // 상태값 변경
        setFileData({
            orgFileName:res.data.orgFileName,
            saveFileName:res.data.saveFileName,
            fileSize:res.data.fileSize,
            url
        })
    })
    .catch(error=>{
        console.log(error)
    })
  }
  return (
    <div className="container">
      <h1>파일 업로드 테스트</h1>
      
      <input type="file" ref={inputFile}/>
      <button onClick={handleUpload}>업로드</button>
    {
        fileData.fileSize !== 0 &&
        <div>
            <p>원본 파일명 : <strong>{fileData.orgFileName}</strong></p>
            <p>저장 파일명 : <strong>{fileData.saveFileName}</strong></p>
            <p>파일의 크기 : <strong>{fileData.fileSize}</strong></p>
            <a href={fileData.url}>다운로드</a>
            
            </div>

    }   
      
      
    </div>
  );
}

//외부에서 App.js 를 import 하면 App 함수를 사용할수 있다. (src/index.js)
export default App2;