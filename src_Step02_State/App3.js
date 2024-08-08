import React, { Component } from 'react';

class App3 extends Component {
    state={
        names:[],
        inputName:""
    }

    getData = ()=>{
        const data = ["호랑이", "늑대", "상어"]
        // 받아온 데이터로 상태를 변경(UI 자동 update)
        this.setState({
            names:data
        })
    }

    addData =()=>{

        // 기존의 배열에 새로운 item이 추가된 새로운 배열을 얻어내는 방법1
        const newArr = this.state.names.concat("새 이름");
        // 기존의 배열에 새로운 item이 추가된 새로운 배열을 얻어내는 방법2
        const newArr2 = [...this.state.names, "새 이름"];

        this.setState({
            names:[...this.state.names, this.state.inputName]
        })
    }


    render() {
        return (
            <div>
                <h3>배열을 상태값으로 가지는 예제</h3>
                <p>{this.state.names}</p>
                <button onClick={this.getData}>목록 받아오기</button>
                <br />
                <input type="text" placeholder="이름 입력.." onChange={(e)=>{
                    // 현재까지 입력한 이름을 상태값에 반영 
                    this.setState({
                        inputName : e.target.value
                    })

                }}/>
                <button onClick={this.addData}>추가</button>
                <ul>
                    {this.state.names.map(item => <li>{item}</li>)}
                </ul>
            </div>
        );
    }
}

export default App3;