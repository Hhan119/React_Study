import React, { useState } from 'react';

function App4(props) {
    // boolean 값을 상태값으로 관리
    const [isShow, setShow]=useState(true)
    // 체크박스의 체크 상태가 바뀔때 마다 호출되는 함수
    const handleChange = (e)=>{
        // e.target은 input type="checkbox" 참조값이고, 
        // e.target.checked는 체크박스의 체크여부를 얻어낼 수 있다. 
        // 그 값을 상태값에 반영하기
        setShow(e.target.checked)
    }
    return (
        <div>

            <h3>check box 의 체크 상태를 상태값에 반영</h3>
            <input type="checkbox" checked={isShow} onChange={handleChange}/>
            { isShow && <p>로그인이 필요합니다.</p> }

            <h3>boolean, undefiend, null은 랜더링 되지 않는다.</h3>
            <p>
                true : {true} <br />
                false : {false} <br />   
                undefiend : {undefined} <br />
                null : {null}
            </p>
            <p>
                { <strong>여보세요!</strong> }
            </p>
            <p>
                { true && <strong>안녕하세요</strong> }
            </p>
            <p>
                { false && <strong>잘가요</strong> }
            </p>
    
        </div>
    );
}

export default App4;