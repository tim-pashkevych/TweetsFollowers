import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Header, Loader } from ".."

export const Layout = () => {
  return (
    <div>
      <Suspense>
        <Header />
        <Outlet />
      </Suspense>
    </div>
  )
}
