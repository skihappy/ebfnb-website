import React from 'react'

const DefaultFallback = () => <div>Loading....</div>

const LazyRoute = ({
  component,
  fallback = DefaultFallback,
}: {
  path: string
  component: string
  fallback?: () => JSX.Element
}) => {
  const RouteComponent = React.lazy(() => import(`./${component}`))
  return (
    <React.Suspense fallback={fallback}>
      <RouteComponent />
    </React.Suspense>
  )
}

export default LazyRoute
