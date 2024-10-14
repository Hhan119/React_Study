import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

//초기 상태로 되돌리기 위해 필요한 변수
let savedImageSrc

function UserUpdateForm() {

    const [userInfo, setUserInfo] = useState({})
    // 이미지 input 요소의 참조값을 사용하기 위해
    const imageInput = useRef()
    // drop zone div 요소의 참조값을 사용하기 위해
    const dropZone = useRef()
    const personSvg = useRef()

    //프로필 이미지 src에 적용할 값을 state로 관리하기
    const [imageSrc, setImageSrc] = useState(null)

    const navigate = useNavigate()

    const dropZoneStyle = {
        minHeight: "300px",
        border: "3px solid #cecece",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    }
    const profileStyle = {
        width: "200px",
        height: "200px",
        border: "1px solid #cecece",
        borderRadius: "50%",
    }

    const profileStyle2 = {
        width: "200px",
        height: "200px",
        border: "1px solid #cecece",
        borderRadius: "50%",
        display: "none"
    }

    useEffect(() => {
        axios.get("/user")
            .then(res => {
                setUserInfo(res.data)
                //만일 등록된 프로필 이미지가 있다면
                if (res.data.profile) {
                    setImageSrc(`/upload/images/${res.data.profile}`)
                    savedImageSrc=`upload/images/${res.data.profile}`
                } else {
                    // person svg 이미지를 읽어서 data url로 만든다음 imageSrc에 반영하기
                    // svg 이미지를 2진 데이터 문자열로 읽어들여서
                    const svgString = new XMLSerializer().serializeToString(personSvg.current)
                    // 2진 데이터 문자열을 btoa(binary to ascii) 함수를 이용해서 ascii 코드로 변경
                    const encodedData = btoa(svgString)
                    //변경된 ascii 코드를 이용해서 dataUrl을 구성
                    const dataUrl = "data:image/svg+xml;base64," + encodedData
                    setImageSrc(dataUrl)
                    console.log(dataUrl)
                    savedImageSrc=dataUrl
                }
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // input type="file" 요소에 change 이벤트가 일어났을 때 호출되는 함수
    const handleChange = (e) => {
        //선택한 파일 객체
        const file = e.target.files[0]
        //파일로부터 데이터를 읽어들일 객체 생성
        const reader = new FileReader()
        //파일ㅇㄹ DataURL 형식의 문자열로 읽어들이기
        reader.readAsDataURL(file)
        //로딩이 완료(파일데이터를 모두 읽었을 때)되었을 때 실행할 함수 등록
        reader.onload = (event) => {
            //읽은 파일 데이터 얻어내기
            const data = event.target.result
            setImageSrc(data)
        }
    }

    // drop zone div에 drop이벤트가 일어났을 때 호출되는 함수
    const handleDrop = (e) =>{
        e.preventDefault()
        //drop된 파일 객체 얻어내기
        const file=e.dataTransfer.files[0]
        const reg=/image/
        if(!reg.test(file.type)){ // 파일의 type이 만일 정규표현식을 통과하지 못하면
            console.log("이미지 파일이 아닙니다")
            return
        }
        //파일로부터 데이터를 읽어들일 객체 생성
        const reader = new FileReader()
        //파일을 DataURL 형식의 문자열로 읽어들이기
        reader.readAsDataURL(file)
        //로딩이 완료(파일데이터를 모두 읽었을 때)되었을 때 실행할 함수 등록
        reader.onload = (event) => {
            //읽은 파일 데이터 얻어내기
            const data = event.target.result
            setImageSrc(data)
        }

        // input 요소에 drop된 파일의 정보 넣어주기
        imageInput.current.files = e.dataTransfer.files
    }

    //폼에 reset 이벤트가 일어났을 때 호출되는 함수
    const handleReset = () => {
        setImageSrc(savedImageSrc)
    }

    //폼에 submit 이벤트가 일어났을 때 호출되는 함수
    const handleSubmit = (e) => {
        e.preventDefault()
        //이벤트가 일어난 form 요소에 입력하거나 선택된 내용을 FormData 객체로 얻어내기
        const formData = new FormData(e.target) // e.target은 폼 데이터

        axios.patch("/user", formData, {
            headers:{"Content-type":"multipart/form-data"}
        })
        .then(res=>{
            alert("수정 했습니다")
            navigate("/user/detail")
        })
        .catch(error=>{
            console.log(error)
        })
    }


    return (
        <>
            <svg ref={personSvg} style={profileStyle2} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>
            <h1>개인정보 수정 양식</h1>
            <Form onReset={handleReset} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>사용자명</Form.Label>
                    <Form.Control name="userName" defaultValue={userInfo.userName} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control name="email" defaultValue={userInfo.email} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>프로필 이미지 ( click or drag&drop to Edit )</Form.Label>
                    <Form.Control onChange={handleChange} ref={imageInput} style={{ display: "none" }} type="file" name="image" accept="image/*" />
                </Form.Group>
                <div className="mb-3">
                    <a href="about:blank" onClick={(e) => {
                        e.preventDefault()
                        // input type="file"요소를 강제 클릭
                        imageInput.current.click()
                    }}>
                        <div
                            style={dropZoneStyle}
                            ref={dropZone}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={handleDrop}
                        >
                            <img src={imageSrc} style={profileStyle} alt="프로필 이미지" />
                        </div>
                    </a>
                </div>
                <Button type="submit" variant="success" size="sm">수정확인</Button>
                <Button type="reset" className="ms-1" variant="danger" size="sm">Reset</Button>
            </Form>
        </>
    )
}

export default UserUpdateForm