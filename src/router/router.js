import App from "../App"
import Gallery from "../pages/Gallery"
import GalleryForm from "../pages/GalleryForm"
import GalleryDetail from "../pages/GalleryDetail"
import Home from "../pages/Home"
import Member from "../pages/Member"
import MemberForm from "../pages/MemberForm"
import MemeberUpdateForm from "../pages/MemeberUpdateForm"
import Post from "../pages/Post"
import PostForm from "../pages/PostForm"
import PostUpdateForm from "../pages/PostUpdateForm"
import KakaoRedirect from "../pages/KakaoRedirect"
import GoogleRedirect from "../pages/GoogleRedirect"
import ProtectedRoute from "../components/ProtectedRoute"
import CafeForm from "../pages/CafeForm"
import Cafe from "../pages/Cafe"
import CafeDetail from "../pages/CafeDetail"
import CafeUpdateForm from "../pages/CafeUpdateForm"
import FileUpload from "../pages/FileUpload"
import ChatRoom from "../pages/ChatRoom"
import UserForm from "../pages/UserForm"
import UserDetail from "../pages/UserDetail"
import UserUpdatedFrom from "../pages/UserUpdatedFrom"
import UserPwdUpdateForm from "../pages/UserPwdUpdateForm"
import NotFound from "../pages/NotFound"

const { createBrowserRouter, createHashRouter } = require("react-router-dom")

// 라우트 정보를 배열에 저장
const routes = [
  // spring boot 서버에 넣어서 실행하면 최초 로딩될때 /index.html 경로로 전달된다.
  // 그럴때도 Home 컴포넌트가 활성화 될 수 있도록 라우트 정보를 추가한다.
  { path: "/index.html", element: <Home /> },
  { path: "/", element: <Home /> },
  { path: "/members", element: <Member /> },
  { path: "/members/new", element: <MemberForm /> },
  { path: "/members/:num/edit", element: <MemeberUpdateForm /> },
  { path: "/gallery", element: <Gallery /> },
  {
    path: "/gallery/new",
    element: (
      <ProtectedRoute>
        <GalleryForm />
      </ProtectedRoute>
    ),
  },
  { path: "/gallery/:num", element: <GalleryDetail /> },
  { path: "/posts", element: <Post /> },
  { path: "/posts/new", element: <PostForm /> },
  { path: "/posts/:id/edit", element: <PostUpdateForm /> },
  { path: "/kakaoLogin/redirect", element: <KakaoRedirect /> },
  { path: "/googleLogin/redirect", element: <GoogleRedirect /> },
  { path: "/cafes", element: <Cafe /> },
  {
    path: "/cafes/new",
    element: (
      <ProtectedRoute>
        <CafeForm />
      </ProtectedRoute>
    ),
  },
  { path: "/cafes/:num", element: <CafeDetail /> },
  {
    path: "/cafes/:num/edit",
    element: (
      <ProtectedRoute>
        <CafeUpdateForm />
      </ProtectedRoute>
    ),
  },
  { path: "/s3test", element: <FileUpload /> },
  { path: "/chat", element: <ChatRoom /> },
  { path: "/user/new", element: <UserForm /> },
  {
    path: "/user/detail",
    element: (
      <ProtectedRoute>
        <UserDetail />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/edit",
    element: (
      <ProtectedRoute>
        <UserUpdatedFrom />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user/password/edit",
    element: (
      <ProtectedRoute>
        <UserPwdUpdateForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]

// BreowserRouter 를 만들기
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: routes.map((route) => {
      return {
        index: route.path === "/", //자식의 path 가 "/" 면 index 페이지 역할을 하게 하기
        path: route.path === "/" ? undefined : route.path, // path 에 "/" 두개가 표시 되지 안도록
        element: route.element, //어떤 컴포넌트를 활성화 할것인지
      }
    }),
  },
])

// import 한 곳에 router(BrowserRouter)를 사용하도록
// router 는 두가지 종류가 있따.
// HashRouter, BrowserRouter
export default router
