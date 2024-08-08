import React from 'react';

/*
    특정 componenet에만 적용될 외부 css 파일을 만들때는 xxx.module.css 형태로 만들어야 한다. 
    import 된 myCss는 object이다. 
    - object의 구조
    {클래스명 : "변형된 클래스명", ...}
*/
import myCss from './css/study.module.css'
// 외부 css 를 바인딩해서 사용하게 도와주는 binder import 
import binder from 'classnames/bind'

const cx =binder.bind(myCss)

function Study2() {
    // myCss는 object이다. 
    console.log(myCss);
    return (
        <div>
            <h3>Study2</h3>
            <div className={cx('box')}>Study2.js box</div>
            <p className={cx('bg-yellow')}>노란 배경</p>
            <div className={cx('box','bg-yellow')}>box</div>
            <div className={cx({box:true, 'bg-yellow':false})}>box</div>
        </div>
    );
}

export default Study2;