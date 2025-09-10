import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout'
import RetrospectiveList from './pages/RetrospectList'
import RetrospectiveDetail from './pages/RetrospectDetail'
import EmptyLayout from './layouts/EmptyLayout'
import RetrospectCreate from './pages/RetrospectCreate'
import Login from './pages/Login'
import OAuthCallback from './components/Login/OAuthCallback'
import Home from './pages/Home'
import RetrospectMaterial from './pages/RetrospectMaterial'
import RetrospectMaterialList from './pages/RetrospectMaterialList'

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
            element={<Home />}
          />
          <Route
            path="/retrospects/:folderId"
            element={<RetrospectiveList />}
          />
          <Route
            path="/retrospects/:folderId/:retroId"
            element={<RetrospectiveDetail />}
          />
          <Route
            path="/materials"
            element={<RetrospectMaterialList />}
          />
          <Route
            path="/materials/:parentId"
            element={<RetrospectMaterial />}
          />
        </Route>
      </Routes>
    </>
  )
}

export default App
