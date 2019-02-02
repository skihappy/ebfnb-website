import { useContext } from 'react'
import routeInfo from '../routes.json'
import { UserContext } from '../components/UserContext'

type Route = {
  key: string
  path: string
  component: string
}
const routes: Route[] = Object.entries(routeInfo).map(
  ([key, { path, component }]) => ({
    key,
    path,
    component,
  })
)

type MenuLink = {
  key: string
  to: string
  label: string
}
const menuLinks: MenuLink[] = Object.entries(routeInfo)
  .filter(([_, { inMenu = true }]) => inMenu)
  .map(([index, { path, label }]) => ({ key: index, to: path, label }))

const useRoutes = () => {
  const { isLoggedIn } = useContext(UserContext)

  return {
    isUserLoggedIn: isLoggedIn,
    getRoutes: () => routes,
    getMenuLinks: () => menuLinks,
  }
}

export default useRoutes
