import useCurrentUser from './use-current-user'
import routeJson from '../routes.json'

const routeInfo = Object.entries(routeJson).map(([key, route]) => ({
  ...route,
  key,
  hasEmbeddedRouter: route.hasEmbeddedRouter || false,
  inMenu: route.inMenu !== false,
}))

type Route = {
  key: string
  path: string
  component: string
}
const routes: Route[] = routeInfo
  .map(route =>
    route.hasEmbeddedRouter
      ? {
          ...route,
          path: `${route.path}/*`,
        }
      : route
  )
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
const menuLinks: MenuLink[] = routeInfo
  .filter(({ inMenu }) => inMenu)
  .map(({ key, path, label }) => ({ key, to: path, label }))

const useRoutes = () => {
  const { isLoggedIn } = useCurrentUser()

  return {
    getRoutes: () => routes,
    getMenuLinks: () =>
      menuLinks
        .filter(({ key }) => key !== 'dashboard' || isLoggedIn())
        .filter(({ key }) => key !== 'join' || !isLoggedIn()),
  }
}

export default useRoutes
