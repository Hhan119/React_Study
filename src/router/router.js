
import App from '../App' 
import Gallery from '../pages/Gallery'
import GalleryForm from '../pages/GalleryForm'
import GalleryDetail from '../pages/GalleryDetail'
import Home from '../pages/Home'
import Member from '../pages/Member'
import MemberForm from '../pages/MemberForm'
import MemeberUpdateForm from '../pages/MemeberUpdateForm'
import Post from '../pages/Post'
import PostForm from '../pages/PostForm'
import PostUpdateForm from '../pages/PostUpdateForm'
import KakaoRedirect from '../pages/KakaoRedirect'
import GoogleRedirect from '../pages/GoogleRedirect'
import ProtectedRoute from '../components/ProtectedRoute'
import CafeForm from '../pages/CafeForm'
import Cafe from '../pages/Cafe'
import CafeDetail from '../pages/CafeDetail'
import CafeUpdateForm from '../pages/CafeUpdateForm'
import FileUpload from '../pages/FileUpload'


const { createBrowserRouter } = require("react-router-dom")


// 라우트 정보를 배열에 저장
const routes = [
    {path:"/", element:<Home/>},
    {path:"/members", element:<Member/>},
    {path:"/members/new", element:<MemberForm/>},
    {path:"/members/:num/edit", element:<MemeberUpdateForm/>},
    {path:"/gallery", element:<Gallery/>},
    {path:"/gallery/new", element:<ProtectedRoute><GalleryForm/></ProtectedRoute>},
    {path:"/gallery/:num", element:<GalleryDetail/>},
    {path:"/posts", element:<Post/>},
    {path:"/posts/new", element:<PostForm/>},
    {path:"/posts/:id/edit", element:<PostUpdateForm/>},
    {path:"/kakaoLogin/redirect", element:<KakaoRedirect/>},
    {path:"/googleLogin/redirect", element:<GoogleRedirect/>},
    {path:"/cafes", element:<Cafe/>},
    {path:"/cafes/new", element:<ProtectedRoute><CafeForm/></ProtectedRoute>},
    {path:"/cafes/:num", element:<CafeDetail/>},
    {path:"/cafes/:num/edit", element:<ProtectedRoute><CafeUpdateForm/></ProtectedRoute>},
    {path:"/s3test", element:<FileUpload/>},



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