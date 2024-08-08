
import App from '../App' 
import Home from '../pages/Home'
import Member from '../pages/Member'
import MemberForm from '../pages/MemberForm'
import MemeberUpdateForm from '../pages/MemeberUpdateForm'


const { createBrowserRouter } = require("react-router-dom")


// 라우트 정보를 배열에 저장
const routes = [
    {path:"/", element:<Home/>},
    {path:"/members", element:<Member/>},
    {path:"/members/new", element:<MemberForm/>},
    {path:"/members/:num/edit", element:<MemeberUpdateForm/>}
]

// BreowserRouter 를 만들기
const router = createBrowserRouter([{
    path:"/",
    element:<App/>,
    children: routes.map((route)=>{
        return {
            index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역할을 하게 하기 
            path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시 되지 안도록  
            element: route.element //어떤 컴포넌트를 활성화 할것인지
        }
    })
}])

// import 한 곳에 router(BrowserRouter)를 사용하도록 
// router 는 두가지 종류가 있따. 
// HashRouter, BrowserRouter 
export default router