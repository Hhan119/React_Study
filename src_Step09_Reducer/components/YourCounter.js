import React, { useReducer } from 'react';

const reducer =(state, action)=>{
    let newState
    // 로직의 의해서 newState 값이 결정된다. 
    if(action === "minus"){
        // 새로운 상태값을 만들어서
        newState={
            ...state,
            count:state.count-1
        }
    }else if(action === "plus"){
        newState={
            ...state,
            count:state.count+1
        }
    }
    return newState
}

function YourCounter(props) {
    // [상태값, 상태를 변경할 때 사용할 함수 ] = useReducer(리듀서 함수, 초기값)
    const [state, dispatch] = useReducer(reducer, {count:0})

    return (
        <div>
            <button onClick={()=>{
                // "minus" action을 발행해서 상태값을 변경 시킨다.
                dispatch("minus") // 결과적으로 등록된 리듀서 함수가 호출된다.
            }}>-</button>
           <strong>{state.count}</strong>
           <button onClick={()=>{
                dispatch("plus")
           }}>+</button>
        </div>
    );
}

export default YourCounter;