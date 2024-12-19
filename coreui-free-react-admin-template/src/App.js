import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PrivateRoute from './PrivateRoute'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const DetailOrder = React.lazy(() => import('./views/pages/detailOrder/DetailOrder'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)

    const username = localStorage.getItem('username')
    if (username) {
      dispatch({ type: 'login' }) // Set isAuthenticated to true if username exists
    }
  }, [dispatch, isColorModeSet, setColorMode, storedTheme])

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" name="Login Page" element={<Login />} />
          <Route path="/register" name="Register Page" element={<Register />} />
          <Route path="/404" name="Page 404" element={<Page404 />} />
          <Route path="/detailOrder/:id" name="Page Detail order" element={<DetailOrder />} />
          <Route path="/500" name="Page 500" element={<Page500 />} />
          <Route path="/DetailTuyenXe/:id" name="Chi tiết tuyến xe" element={<DetailOrder />} />
          {/* <Route path="*" name="Home" element={<PrivateRoute />}>  */}
          <Route path="*" name="Home" element={<DefaultLayout />} />
          {/* </Route>  */}
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
