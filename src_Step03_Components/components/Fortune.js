import React, { Component } from 'react';

class Fortune extends Component {


    render() {
        return (
            // 부모 component가 전달한 property는 자식 component에서 this.props로 참조할 수 있다.
            // 예를들어, 부모 component가 data라는 property 명으로 String type으로 '좋은 날이에요'를 전달했다면,
            // 자식 componenet 에서는 this.props.data로 전달된 String type을 사용 할 수 있다. 
            // <Fortune date={'좋은 날이에요'} />
            //  
            <>
                <h3>오늘의 운세</h3>
              <p>오늘의 운세 : <strong>{this.props.data}</strong></p>  
            </>
        );
    }
}

export default Fortune;