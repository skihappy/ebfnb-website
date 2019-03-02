/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React, { useState, useEffect, useMemo } from 'react'
import useBoolean from '../hooks/useBoolean'

export default jsx

const CSS = props => {
  return <div {...props}>iuyqiwuweyf</div>
}
const App = () => {
  const { getBoolean, toggleBoolean, addEventListener } = useBoolean(
    false,
    'bool1'
  )
  const [count, setCount] = useState(0)
  const booleanValue = getBoolean()
  useEffect(
    () =>
      addEventListener('onChange', () => setCount(oldCount => oldCount + 1)),
    [true]
  )
  const buttonCss = useMemo(
    () => css`
      border: 2px solid black;
      color: ${booleanValue ? 'red' : 'green'};
    `,
    [booleanValue]
  )
  return (
    <div>
      <CSS
        css={css`
          color: green;
        `}
      />
      <button
        type="button"
        css={buttonCss}
        onClick={() => {
          toggleBoolean()
        }}
      >
        Toggle me
      </button>
      <p>
        You toggled me
        {count}
        times but now I am
        {`${booleanValue}`}
      </p>
    </div>
  )
}

storiesOf('useBoolean', module).add('use case for useBoolean', () => <App />)
