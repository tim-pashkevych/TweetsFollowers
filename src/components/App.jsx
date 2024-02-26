import { lazy, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { refreshUserThunk } from "@/redux/auth/operations"
import { selectIsLoading } from "@/redux/auth/slice"
import { PublicRoute } from "@/routes/PublicRoute"
import { PrivateRoute } from "@/routes/PrivateRoute"

import { Layout, Loader } from "@/components"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))
const TweetsPage = lazy(() => import("@/pages/TweetsPage/TweetsPage"))
const LoginPage = lazy(() => import("@/pages/LoginPage/LoginPage"))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage/NotFoundPage"))

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)

  useEffect(() => {
    dispatch(refreshUserThunk())
  }, [dispatch])

  return isLoading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path='login'
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path='tweets'
          element={
            <PrivateRoute>
              <TweetsPage />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
