import React, { useState } from 'react';

function App5(props) {
    
    // string, array, number type을 상태값으로 관리하기
    const [state, setState] = useState({
        inputName:"",
        names:[],
        seq:0
    })
    return (
        <div>
            <input type="text" onChange={(e)=>{
                 setState({
                    ...state,
                    inputName:e.target.value
                })
            }} />
            <button onClick={()=>{
                setState({
                    ...state,
                    names:[...state.names, {name:state.inputName, id:state.seq}],
                    seq:state.seq+1
                })
            }}>추가</button>
            <ul>
                {state.names.map(item => <li key={item.id}>{item.name}</li>)}
                
            </ul>
            <pre>{JSON.stringify(state, null, 2)}</pre>
            
            
        </div>
    );
}

export default App5;