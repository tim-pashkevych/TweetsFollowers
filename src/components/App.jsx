import { Route, Routes } from "react-router-dom"
import { lazy } from "react"

import { Layout } from "@/components"

const Home = lazy(() => import("@/pages/Home/Home"))
const NotFound = lazy(() => import("@/pages/NotFound/NotFound"))

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
