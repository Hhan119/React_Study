import React, { Component } from 'react';
import Child from './components/Child';
import Fortune from './components/Fortune';
import List from './components/List';

class App3 extends Component {
    state={
        fortuneToday:"행복한 날이에요!",
        names:["호랑이", "사자", "늑대"]

    }
    clicked = ()=>{
        // 자식 components가 사용하는 state를 변경하면 자식 component도 자동으로 UI 업데이트 된다.
        this.setState({
            fortuneToday:"점점 더 좋은날이 와요"
        })
    }
    onDelete = ()=>{
        this.setState({
        
        })
    }
    render() {
        return (
            <div>
                <h1>인덱스 페이지</h1>
                <Child/>
                <Child/>
                <Child/>
                
                <br />

                <button onClick={this.clicked}>운세 버튼</button>
                <Fortune data={'좋은 날이에요'}/>
                <Fortune data={this.state.fortuneToday}/>

                <List names={this.state.names} onDelete={(idx)=>{
                    // this.state.names에서 idx 인덱스의 아이템이 제거된 새로우 배열을 얻어내서 상태값을 변경한다. 
                    const newArr =this.state.names.filter((item, index)=>{
                        // 만약에 현재 아이템의 인덱스가 삭제할 인덱스 아니라면, 
                        if(index !== idx){
                            return true; // true를 리턴해서 남겨둔다.
                        } else{
                            return false; // false라면 리턴해서 삭제한다. 
                        }              
                }); 
                this.setState({
                    names:newArr
                })
            }}/>
                    
            </div>
        );
    }
}

export default App3;