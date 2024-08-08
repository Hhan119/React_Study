import React, { useState } from 'react';

function App3(props) {
    
    const [names, setNames]=useState(["호랑이", "늑대","상어"])
    
    return (
        <div>
            <h1>배열을 state로 관리해보기</h1>
            <button onClick={()=>{
                //setNames([...names, "돼지", "용","기린"])
                setNames(names.concat("메가로돈", "티라노", "악어") )
                }}>추가</button>
                <ul>
                {names.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
        </div>
    );
}

export default App3;