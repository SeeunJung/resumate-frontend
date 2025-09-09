import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import RetrospectiveList from './pages/RetrospectList'
import RetrospectiveDetail from './pages/RetrospectDetail'
import EmptyLayout from './layouts/EmptyLayout'
import RetrospectCreate from './pages/RetrospectCreate'
import Login from './pages/Login'
import OAuthCallback from './components/Login/OAuthCallback'

function App() {
  return (
    <>
      <Routes>
        <Route element={<EmptyLayout />}>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/oauth/callback"
            element={<OAuthCallback />}
          />
          <Route
            path="/retrospects/new"
            element={<RetrospectCreate />}
          />
        </Route>

        <Route element={<DefaultLayout />}>
          <Route
            path="/"
            element={<h1>홈페이지 뷰 퍼블리싱 예정</h1>}
          />
          <Route
            path="/retrospects/:folderId"
            element={<RetrospectiveList />}
          />
          <Route
            path="/retrospects/:folderId/:retroId"
            element={<RetrospectiveDetail />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
