/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Router } from '@reach/router'
import LayoutContainer from './LayoutContainer'
import LazyRoute from './LazyRoute'
import useRoutes from '../hooks/use-routes'

export const jsxFix = jsx

const Main = () => {
  const { getRoutes } = useRoutes()

  return (
    <LayoutContainer
      tag="main"
      customCss={css`
        padding-top: calc(60px + 1rem);
      `}
    >
      <Router>
        {getRoutes().map(({ key, path, component }) => (
          <LazyRoute key={key} path={path} component={component} />
        ))}
      </Router>
    </LayoutContainer>
  )
}

export default Main
