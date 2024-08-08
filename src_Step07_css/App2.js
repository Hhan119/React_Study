import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// cn 함수를 이용해서 클래스를 좀 더 편하게 제어 할 수 있다. 
import cn from 'classnames'
import binder from 'classnames/bind'

function App2(props) {
    // 버튼의 색상을 상태값으로 관리하기 위해
    const [color, setColor] = useState("");
    // 체크박스의 체크여부(버튼을 크게 만들지여부)를 상태값으로 관리
    const [isLarge, setisLarge] = useState(false);
    
    // 적용할 클래스를 value 값으로 가지고 있는 object 만들어서 
    const btnStyle={
        default:"btn btn-info",
        large:"btn btn-info btn-lg"
    }
    const cx = binder.bind(btnStyle)

    return (
        <div className="container">
            <h1>classnames, classnames/bind 사용해보기</h1>
            <select onChange={(e)=>{
                // 선택된 value 값으로 color 변경한다.
                setColor(e.target.value)
            }}>
                <option value="">선택</option>
                <option value="btn-primary">blue</option>
                <option value="btn-success">green</option>
                <option value="btn-danger">red</option>
            </select><br />
            <button className={"btn"+" "+color}>버튼</button><br />
            <button className={`btn ${color}`}>버튼2</button>
            <button className={cn("btn", color)}>버튼3</button>
            <br />
            <label>
                크게 <input type="checkbox" onChange={(e)=>{
                    // 체크박스의 체크여부 상태값에 반영하기
                    setisLarge(e.target.checked)
            }}/>
            </label>
            <br />
            <p>체크 박스 체크여부 : <strong>{JSON.stringify(isLarge)}</strong></p>
            <button className={"btn btn-info " + (isLarge ? 'btn-lg':'')}>버튼</button>
            <button className={`btn btn-info ${isLarge ? 'btn-lg':''}`}>버튼</button>
            <button className={cn("btn btn-info", {"btn-lg":isLarge})}>버튼</button>
            <button className={cx({default:!isLarge, large:isLarge})}>버튼</button>
            <button className={cx(!isLarge ? "default":"large")}>버튼</button>
        </div>

    );
}

export default App2;