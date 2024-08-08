// src/App2.js 파일

import React, { Component } from 'react';
// ./css/bootstrap.css 로딩
import "./css/bootstrap.css"

// npm install bootstrap으로 설치한 bootstrap css로딩
import "bootstrap/dist/css/bootstrap.css"
// npm install bootstrap으로 설치한 bootstrap js로딩
import "bootstrap/dist/js/bootstrap.js"
class App2 extends Component {

    render() {
        return (
            <div className='container'>
                <h3>인덱스 페이지</h3>
                <button className='btn btn-primary'>버튼</button>


            </div>
        );
    }           
}

export default App2;