/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Router } from '@reach/router'
import LayoutContainer from './LayoutContainer'
import LazyRoute from './LazyRoute'
import useRoutes from '../hooks/useRoutes'
import useCurrentUser from '../hooks/useCurrentUser'
import NotFoundPage from './NotFoundPage'

export const jsxFix = jsx

const Main = () => {
  const { getRoutes } = useRoutes()

  return (
    <LayoutContainer
      tag="main"
      customCss={css`
        padding: calc(60px + 0.5rem) 60px 2.5rem;
      `}
    >
      <Router>
        <NotFoundPage default />
        <LazyRoute key="index" path="/" component="HomePage" />
        {getRoutes().map(({ key, path, component }) => (
          <LazyRoute key={key} path={path} component={component} />
        ))}
        <LazyRoute key="my-fnb" path="my-fnb/*" component="MyFnbPage" />
      </Router>
    </LayoutContainer>
  )
}

export default Main
