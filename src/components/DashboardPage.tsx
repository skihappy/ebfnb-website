import React from 'react'
import { Link } from '@reach/router'
import PageTitle from './PageTitle'
import Tasks from './Tasks'

const DashboardPage = () => (
  <React.Fragment>
    <PageTitle documentTitle="My Dashboard">
      My Food Not Bombs Dashboard
    </PageTitle>
    <div>
      <h3>
        <Link to="../tasks">Active tasks</Link>
      </h3>
      <Tasks active />
      <Link to="../tasks">All tasks &raquo;</Link>
    </div>
  </React.Fragment>
)

export default DashboardPage
