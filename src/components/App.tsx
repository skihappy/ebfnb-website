/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import { Router } from '@reach/router'
import { Fragment, lazy, Suspense } from 'react'
import LayoutContainer from './LayoutContainer'
import Header from './Header'

export const jsxFix = jsx

export const DefaultLazyRouteFallback = () => (
  <div>
    <p>Loading....</p>
  </div>
)

export const LazyRoute = ({
  component,
  Fallback = DefaultLazyRouteFallback
}: {
  path: string
  component: string
  Fallback?: () => JSX.Element
}) => {
  const RouteComponent = lazy(() => import(`./${component}`))
  return (
    <Suspense fallback={Fallback}>
      <RouteComponent />
    </Suspense>
  )
}

const App = () => {
  return (
    <Fragment>
      <Global
        styles={css`
          * {
            box-sizing: border-box;
          }

          body {
            overflow-y: scroll;
          }
        `}
      />
      <Header />
      <LayoutContainer
        tag="main"
        customCss={css`
          margin-top: 100px;
        `}
      >
        <Router>
          <LazyRoute path="/cook" component="CookPage" />
        </Router>
      </LayoutContainer>
    </Fragment>
  )
}

export default App
