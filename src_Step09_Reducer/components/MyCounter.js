import React, { useState } from 'react';


function MyCounter(props) {
    // 버튼을 누르면 숫자가 1씩 감소 + 버튼을 누르면 숫자가 1씩 증가되도록 programming 해보세요
    const [count, setCount]=useState(0);

    
    return (
        <div>
           <button onClick={()=>{setCount(count-1)}}>-</button>
           <strong>{count}</strong>
           <button onClick={()=>{setCount(count+1)}}>+</button>
        </div>
    );
}

export default MyCounter;