/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { Link } from '@reach/router'
import tasks from '../data/tasks'

const filter = (list, fn) => list.filter(fn)
const slice = (list, end, start = 0) => list.slice(start, end)

const getTasks = (active, limit = -1) => {
  const filtered = filter(
    tasks,
    ({ status: { id } }) => !active || id === 'new' || id === 'active'
  )
  return limit > 0 ? slice(tasks, limit) : tasks
}

export const jsxFix = jsx

// const Tasks = ({ status = [] }: { active?: boolean }) => (
const Tasks = ({
  active = false,
  limit = -1,
}: {
  active?: boolean
  limit?: number
}) => (
  <ul
    css={css`
      list-style: none;
      margin: -0.5rem 0 0;
      padding: 0;
    `}
  >
    {getTasks(active).map(({ uuid, name, status: { id: status, reason } }) => (
      <li
        key={uuid}
        css={css`
          border-top: 2px dotted #cccccc;
          margin-bottom: 0.5rem;
          h4 {
            font-size: 1rem;
            margin: 0;
          }

          p {
            margin: 0;
          }
        `}
      >
        <h4>
          <Link to={`/my-fnb/tasks/${uuid}`}>{name}</Link>
        </h4>
        <p>
          Status:
          {' '}
          <strong>{status}</strong>
          {reason ? <em>{` (${reason})`}</em> : null}
        </p>
      </li>
    ))}
  </ul>
)

export default Tasks
