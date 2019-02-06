import { useContext } from 'react'
import { CurrentUserContext } from '../components/CurrentUserContext'

const useCurrentUser = () => {
  const { isLoggedIn, getEmail, login, logout } = useContext(CurrentUserContext)

  return { isLoggedIn, getEmail, login, logout }
}

export default useCurrentUser
