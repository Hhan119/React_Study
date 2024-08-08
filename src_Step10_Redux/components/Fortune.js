import { useSelector } from 'react-redux';
import NavBar from './NavBar';

function Fortune() {

    // 로그인 여부
    const isLogin = useSelector(state=>state.isLogin) 

    return (
        <div>
            <NavBar />
            { isLogin && <p>로그인중 이시군요...</p>}
            <p>오늘의 운세: <strong>오늘은 행운이 가득한 날이에요!</strong></p>
        </div>
    );
}

export default Fortune;