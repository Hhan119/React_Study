import React, { Component } from 'react';
import { Link, Navigate, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Math from './Math';
import Eng from './Eng';

// javascript 로 route 이동을 하려면 필요한 함수 
// Study component에서 this.porps.navigate() 함수를 사용할 수 있도록 한다.
function withNavigation(Comp) {
    return props => <Comp {...props} Navigate={useNavigate()} />;
 }

class Study extends Component {  
    render() {
        return (
            <div>
                <h1>Study 페이지 </h1>
                <h2>공부하기</h2>
                <ul>
                    <li><NavLink to="/study/math">수학공부</NavLink></li>    
                    <li><NavLink to="/study/eng">영어공부</NavLink></li>    
                </ul>     

                <Routes>
                    <Route path='/math' Component={Math}/>
                    <Route path='/eng' Component={Eng}/>
                </Routes>
                <Link to="/">Home</Link><br/>
                <button className='btn btn-primary' onClick={()=>{
                    this.props.Navigate("/");
                }}>Home</button>
            </div>
        );
    }
}

export default withNavigation(Study);      