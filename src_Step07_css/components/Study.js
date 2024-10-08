import React from 'react';

/*
    특정 componenet에만 적용될 외부 css 파일을 만들때는 xxx.module.css 형태로 만들어야 한다. 
    import 된 myCss는 object이다. 
    - object의 구조
    {클래스명 : "변형된 클래스명", ...}
*/
import myCss from './css/study.module.css'

function Study() {
    // myCss는 object이다. 
    console.log(myCss);
    return (
        <div>
            <h3>Study</h3>
            <div className={myCss.box}>Study.js box</div>
            <p className={myCss['bg-yellow']}>노란 배경</p>
            <div className={myCss.box + ' ' + myCss['bg-yellow']}>box</div>
            <div className={`${myCss.box} ${myCss['bg-yellow']}`}>box</div>
        </div>
    );
}

export default Study;