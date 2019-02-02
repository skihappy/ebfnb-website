import React, { ReactNode } from 'react'

export const UserContext = React.createContext({
  isLoggedIn: false,
})

export const UserProvider = ({ children }: { children: ReactNode }) => (
  <UserContext.Provider value={{ isLoggedIn: false }}>
    {children}
  </UserContext.Provider>
)
