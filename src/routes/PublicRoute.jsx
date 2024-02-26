import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

import { selectIsLoggedIn } from "@/redux/auth/slice"

export const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const location = useLocation()

  return isLoggedIn ? (
    <Navigate to={location.state?.from || "/tweets"} />
  ) : (
    children
  )
}
