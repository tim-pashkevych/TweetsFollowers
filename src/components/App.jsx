import { Route, Routes } from "react-router-dom"
import { lazy, useEffect } from "react"

import { Layout, Loader } from "@/components"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsersThunk } from "@/redux/users/operations"
import { selectIsLoadingUsers } from "@/redux/users/selectors"
import { refreshUserThunk } from "@/redux/auth/operations"
import { selectIsLoading } from "@/redux/auth/slice"
import { PublicRoute } from "@/routes/PublicRoute"
import { PrivateRoute } from "@/routes/PrivateRoute"

const HomePage = lazy(() => import("@/pages/HomePage/HomePage"))
const DashboardPage = lazy(() => import("@/pages/DashboardPage/DashboardPage"))
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
        <Route
          index
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path='login'
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path='dashboard'
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
