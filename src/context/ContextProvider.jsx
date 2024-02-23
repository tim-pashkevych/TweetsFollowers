import { createContext, useState } from "react"

export const UserContext = createContext(null)

export const ContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null)

  return (
    <UserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </UserContext.Provider>
  )
}
