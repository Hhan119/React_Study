import React, { Component } from 'react';

class App extends Component {
  // 상태값(state) 정의하기 (java클래스 안에서 필드를 정의하는 느낌으로 만들면 된다. )
  state ={
    count:0
  }
  // 멤버함수 추가
  clicked=()=>{
    this.setState({
      count:this.state.count+1
    })
    }
  //App 클래스안에 속해 있는 맴버 함수(메소드)
  render() {

    //render() 함수 안에서 리턴한 jsx 로 화면 구성이 된다. 
    return (
      <div>
        <h1>인덱스 페이지 입니다</h1>
          <button onClick={()=>{
            // state 값을 직접 변경한다고 해서 ui가 업데이트 되지 않음
            //this.state.count = this.state.count+1
            // state 는 object인데 setState() 함수를 호출하면서 새로운 object를 넣어주어야 ui가 자동 업데이트 됨
            this.setState({
              count : this.state.count+1
            })
          }}>{this.state.count}</button>
          <button onClick={this.clicked}>{this.state.count}</button>
          <p>현재 값은 {this.state.count} 입니다.</p>
      </div>
    )
  };
};

export default App;