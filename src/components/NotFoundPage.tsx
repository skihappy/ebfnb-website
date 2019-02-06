import React from 'react'
import { RouteComponentProps } from '@reach/router'
import PageTitle from './PageTitle'

const NotFoundPage: (props: RouteComponentProps) => JSX.Element = () => (
  <div>
    <PageTitle documentTitle="404 Not Found">OOPS! Page Not Found!</PageTitle>
  </div>
)

export default NotFoundPage
