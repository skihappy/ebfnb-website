/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { navigate } from '@reach/router'
import React, { useState } from 'react'
import PageTitle from './PageTitle'
import useCurrentUser from '../hooks/useCurrentUser'

export const jsxFix = jsx

const JoinPage = () => {
  const { login } = useCurrentUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    const didLogin = login(email, password)

    if (didLogin) {
      navigate('/my-fnb/dashboard')
    }
  }

  // const isEmailValid = () => {
  //   if (email.length < 1) {
  //     return false
  //   }

  //   if (email.search('@', -1)) {
  //     return
  //   }

  //   return false
  // }

  return (
    <React.Fragment>
      <PageTitle documentTitle="Join Us">
        Join East Bay Food Not Bombs
      </PageTitle>
      <form
        css={css`
          display: grid;
          grid-column-gap: 0.75rem;
          grid-row-gap: 0.5rem;
          grid-template-areas: 'A1 B1' 'A2 B2' 'A3 B3';
          grid-template-columns: 8rem 1fr;
          grid-template-rows: repeat(3, 1fr);
        `}
      >
        <label
          htmlFor="email"
          css={css`
            grid-area: A1;
          `}
        >
          Email address:
          {' '}
          <input
            id="email"
            type="email"
            css={css`
              grid-area: B1;
            `}
            value={email}
            onChange={({ target: { value } }) => {
              setEmail(value)
            }}
          />
        </label>
        <label
          htmlFor="password"
          css={css`
            grid-area: A2;
          `}
        >
          Password:
          {' '}
          <input
            id="password"
            type="password"
            css={css`
              grid-area: B2;
            `}
            value={password}
            onChange={({ target: { value } }) => {
              setPassword(value)
            }}
          />
        </label>
        <button
          type="button"
          css={css`
            grid-area: B3;
          `}
          onClick={handleSubmit}
          // {if}
        >
          Join
        </button>
      </form>
    </React.Fragment>
  )
}

export default JoinPage
