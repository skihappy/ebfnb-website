/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Router } from '@reach/router'
import LayoutContainer from './LayoutContainer'
import LazyRoute from './LazyRoute'
import useRoutes from '../hooks/use-routes'
import useCurrentUser from '../hooks/use-current-user'

export const jsxFix = jsx

const Main = () => {
  const { isLoggedIn, getEmail, logout } = useCurrentUser()
  const { getRoutes } = useRoutes()

  return (
    <LayoutContainer
      tag="main"
      customCss={css`
        padding: calc(60px + 0.5rem) 60px 2.5rem;
      `}
    >
      {!isLoggedIn() ? null : (
        <div>
          You are logged in as
          {' '}
          <strong>{getEmail()}</strong>
          {'. '}
          <button type="button" onClick={logout}>
            Log out
          </button>
        </div>
      )}
      <Router>
        {getRoutes().map(({ key, path, component }) => (
          <LazyRoute key={key} path={path} component={component} />
        ))}
      </Router>
    </LayoutContainer>
  )
}

export default Main
