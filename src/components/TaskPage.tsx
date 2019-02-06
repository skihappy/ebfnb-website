import React from 'react'
import Tasks from './Tasks'
import PageTitle from './PageTitle'

const TaskPage = () => (
  <React.Fragment>
    <PageTitle documentTitle="Tasks">My Tasks</PageTitle>
    <Tasks />
  </React.Fragment>
)

export default TaskPage
