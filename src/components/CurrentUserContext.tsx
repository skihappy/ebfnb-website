import React, { ReactNode, useReducer, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const LOGIN = 'login'
const LOGOUT = 'logout'

type State = {
  isLoggedIn: () => boolean
  getEmail: () => string | null
  login: (email: string, password: string) => boolean
  logout: () => boolean
}

const initialContext: State = {
  isLoggedIn: () => false,
  getEmail: () => null,
  login: (email, password) => false,
  logout: () => false,
}

export const CurrentUserContext = React.createContext(initialContext)

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const { get: getUser, set: setUser } = useLocalStorage('currentUser', '')
  const user = getUser()

  const currentUser: State = {
    isLoggedIn: () => user !== '',
    getEmail: () => (user === '' ? null : user),
    login: (email, password) => {
      if (user === '' && email !== '' && password !== '') {
        alert(email)
        setUser(email)
        return true
      }

      return false
    },
    logout: () => {
      if (user !== '') {
        setUser('')
        return true
      }

      return false
    },
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {children}
    </CurrentUserContext.Provider>
  )
}
