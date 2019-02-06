import useCurrentUser from './useCurrentUser'
import routeJson from '../routes.json'

const routeInfo = Object.entries(routeJson).map(([key, route]) => ({
  ...route,
  key,
}))

type Route = {
  key: string
  path: string
  component: string
}
const routes: Route[] = routeInfo
  .map(route => ({
    ...route,
    path: `${route.path}/*`,
  }))
  .map(({ key, path, component }) => ({
    key,
    path,
    component,
  }))

type MenuLink = {
  key: string
  to: string
  label: string
}
const menuLinks: MenuLink[] = routeInfo.map(({ key, path, label }) => ({
  key,
  to: path,
  label,
}))

const useRoutes = () => {
  const { isLoggedIn } = useCurrentUser()

  return {
    hasLoggedInUser: () => isLoggedIn(),
    getRoutes: () => routes,
    getMenuLinks: () => menuLinks,
  }
}

export default useRoutes
