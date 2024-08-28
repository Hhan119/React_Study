import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function GalleryForm(props) {
    
    const dropZone = useRef()
    const imageInput = useRef()
    const captionInput = useRef()
    // 엄로드 할 선택된 이미지들을 관리하는 상태 값 
    const [imageData , setImageData] = useState([])
    const navigate = useNavigate()
    const [state, setState]=useState([])
    // 이름 혹은 주속를 입력했을 때 호출되는 함수
    

    const dropZoneStyle={
        minHeight:"300px",
        border:"3px solid #cecece",
        borderRadius:"10px",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        cursor:"pointer",
        flexWrap:"wrap",
        rowGap:"10px",
        columnGap:"10px"
    }

    const selectedStyle={
        width:"300px",
        borderRadius:"10px"
    }

    // 이미지를 drop 했을 때 호출되는 함수
    const handleDrop = (e)=>{
        e.preventDefault()
       
        //drop 된 파일의 정보가 들어 있는 배열얻어내기
		const files=e.dataTransfer.files;
			
        //이미지 파일만 담을 배열 
        const imageFiles=[];
			
        //javascript 반복문
        for(let i=0; i<files.length; i++){
            //i 번째 File 객체
            const tmp=files[i];
            //이미지 파일인지 여부를 알아내서 이미지 파일이 아니면 동작하지 않도록 설정
            const reg=/image/;
            if(!reg.test(tmp.type)){ //파일의 type 이 만일 정규표현식을 통과하지 못하면
                console.log("이미지 파일이 아닙니다")
                continue; //반복문 수행을 계속 이어간다 
            }
           
            //이미지 파일을 배열에 누적시킨다 
            imageFiles.push(tmp);
            //파일로 부터 데이터를 읽어들일 객체 생성
            const reader=new FileReader();
            //파일을 DataURL 형식의 문자열로 읽어들이기
            reader.readAsDataURL(tmp);
            //로딩이 완료(파일데이터를 모드 읽었을때) 되었을때 실행할 함수 등록
            reader.onload=(event)=>{
                //읽은 파일 데이터 얻어내기 
                const data=event.target.result;
                const result=imageFiles.map(item=>{
                    // 다 읽은 파일의 이름과 읽으라고 시켰던 파일의 이름이 같으면
                    if(item.name === tmp.name){
                        item.dataUrl = data // dataUrl 이라는 방에 읽은 이미지 데이터를 넣어준다.
                    }
                    return item
                })
                // state 변경하기 
                setImageData(result)
                console.log(imageFiles)
            };
        }
        
        // input에 파일을 넣어주기 위한 작업 
        //DataTransfer 객체 생성
        const dataTransfer = new DataTransfer();
        // imageFiles 배열에 들어 있는 선택된 이미지 파일을 DataTransfer 객체에 모두 넣어주기  
        imageFiles.forEach(item => dataTransfer.items.add(item));
        
        // input type="file" 에 DataTransfer 객체에 담긴 파일 목록을 넣어주기 
        imageInput.current.files=dataTransfer.files;
    }

    
    const handleChange = (e)=>{
        // 선택한 파일
        const files=e.target.files;
        //이미지 파일만 담을 배열 
        const imageFiles=[];

        //javascript 반복문
        for(let i=0; i<files.length; i++){
            //i 번째 File 객체
            const tmp=files[i];
            //이미지 파일인지 여부를 알아내서 이미지 파일이 아니면 동작하지 않도록 설정
            const reg=/image/;
            if(!reg.test(tmp.type)){ //파일의 type 이 만일 정규표현식을 통과하지 못하면
                console.log("이미지 파일이 아닙니다")
                continue; //반복문 수행을 계속 이어간다 
            }
        //이미지 파일을 배열에 누적시킨다 
        imageFiles.push(tmp);
         //파일로 부터 데이터를 읽어들일 객체 생성
         const reader=new FileReader();
         //파일을 DataURL 형식의 문자열로 읽어들이기
         reader.readAsDataURL(tmp);
         //로딩이 완료(파일데이터를 모드 읽었을때) 되었을때 실행할 함수 등록
         reader.onload=(event)=>{
             //읽은 파일 데이터 얻어내기 
             const data=event.target.result
                const result=imageFiles.map(item=>{
                    // 다 읽은 파일의 이름과 읽으라고 시켰던 파일의 이름이 같으면
                    if(item.name === tmp.name){
                        item.dataUrl = data // dataUrl 이라는 방에 읽은 이미지 데이터를 넣어준다.
                    }
                    return item
                })
             
              // state 변경하기 
              setImageData(result)
            };
         }
    }

    //업로드 버튼을 눌렀을때 호출되는 함수 
    const handleUpload = ()=>{
        //입력한 제목과 이미지 파일을 FormData 객체에 담는다 
        const formData=new FormData()
        // caption 이라는 키값으로 제목 담기 
        formData.append("caption", captionInput.current.value)
        //반복문 돌면서 선택한 파일을 모두 images 라는 키값으로 담아서
        const files=imageInput.current.files //선택한 파일 배열 
        for(let i=0; i<files.length; i++){
            formData.append("images", files[i])
        }
       
        axios.post("/gallery", formData, {
            headers:{"Content-Type":"multipart/form-data"}
        })
        .then(res=>{
            console.log(res.data)
            navigate("/gallery")
        })
    }


    return (
        <>

            <Form.Group as={Row} className="mb-3" controlId="caption">
                <Form.Label column sm={2}>설명 </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={captionInput} type="text" name="caption" placeholder="설명 입력" />
                </Col>
            </Form.Group>
           
            <Form.Group as={Row} className="mb-3" controlId="image">
                <Form.Label column sm={2}>이미지 </Form.Label>
                <Col sm={10}>
                    <Form.Control ref={imageInput} onChange={handleChange} type="file" accept="image/*" name="image" multiple />
                </Col>
            </Form.Group>
            <a href="about:blank" onClick={(e)=>{
                e.preventDefault()// 빈페이지를 띄우려고 하려는 기본 동작 막기
                imageInput.current.click() // 파일 선택 창 띄우기 
            }}>
            <div ref={dropZone} onDragOver={(e)=>e.preventDefault()} 
                onDrop={handleDrop} style={dropZoneStyle} className="mb-3">
                {
                    // item은 File 객체인데, 임의로 dataUrl이라는 방에 이미지 데이터를 넣어두었다.
                    imageData.length > 0 ? imageData.map(item=><img style={selectedStyle} key={item.name} src={item.dataUrl} alt={item.name}/>)
                    : <strong>Drag and Drop Files <br />or Click Here!</strong>
                }
            </div>
            </a>
            <Button onClick={handleUpload} variant="primary">업로드</Button>
            
        </>
    );
}

export default GalleryForm;