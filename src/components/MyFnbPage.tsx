/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Router, Link, RouteComponentProps, Redirect, Match } from '@reach/router'
import React, { useEffect } from 'react'
import LazyRoute from './LazyRoute'
import useCurrentUser from '../hooks/useCurrentUser'
import PageTitle from './PageTitle'

export const jsxFix = jsx

type Route = (props: RouteComponentProps) => JSX.Element

const MyFnbIndex: Route = () => (
  <React.Fragment>
    <PageTitle documentTitle="My FNB">My Food Not Bombs</PageTitle>
    <nav>
      <ul>
        <li>
          <Link to="dashboard">My Dashboard</Link>
        </li>
        <li>
          <Link to="tasks">Tasks</Link>
        </li>
      </ul>
    </nav>
  </React.Fragment>
)

const MyFnbLogoutLink = ({
  email,
  logout,
}: {
  email: string
  logout: (event: any) => void
}) => (
  <div
    css={css`
      border-bottom: 1px solid #ccc;
      font-size: 0.8rem;
      margin-top: -1rem;
      padding: 0.25rem 0;

      display: grid;
      grid-template-areas: 'first second';
      grid-template-columns: 1fr 3fr;
      p {
        margin: 0;
      }
      .first {
        grid-area: first;
      }
      .second {
        grid-area: second;
        text-align: right;
      }
    `}
  >
    <p className="first">
      <Match path="/my-fnb">
        {({ match }) =>
          match ? (
            'My FNB'
          ) : (
            <Link to="/my-fnb">My FNB</Link>
          )
        }
      </Match>
    </p>
    <p className="second">
      You are logged in as
      {' '}
      <strong>{email}</strong>
      {'. '}
      <Link to="/my-fnb/logout">Log out &raquo;</Link>
    </p>
  </div>
)

const MyFnbDenied: Route = () => (
  <React.Fragment>
    <PageTitle documentTitle="Access Denied">Members Only</PageTitle>
    <p>Please log in or create an account.</p>
  </React.Fragment>
)

const MyFnbLogoutRoute: Route = () => {
  const { logout } = useCurrentUser()

  // useEffect(() => logout(), [])
  logout()

  return <Redirect to="/my-fnb" />
}
const MyFnb = () => {
  const { isLoggedIn, getEmail, logout } = useCurrentUser()

  return isLoggedIn() ? (
    <React.Fragment>
      <MyFnbLogoutLink email={getEmail()} logout={logout} />
      <Router>
        <MyFnbIndex path="/" />
        <LazyRoute path="dashboard" component="DashboardPage" />
        <LazyRoute path="tasks/*" component="TaskPage" />
        <MyFnbLogoutRoute path="/logout" />
      </Router>
    </React.Fragment>
  ) : (
    <Router>
      <LazyRoute path="/" component="JoinPage" />
      <MyFnbDenied default />
    </Router>
  )
}
export default MyFnb
