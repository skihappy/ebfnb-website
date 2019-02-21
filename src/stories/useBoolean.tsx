/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React, { useState, useEffect } from 'react'
import useBoolean from '../hooks/useBoolean'

export default jsx

const App = () => {
  const { get, toggle, listen } = useBoolean(false, 'bool1')
  const [count, setCount] = useState(0)

  useEffect(
    () => listen('onChange', () => setCount(oldCount => oldCount + 1)),
    [true]
  )
  const buttonCss = css`
    border: 2px solid black;
    color: ${get() ? 'red' : 'green'};
  `
  return (
    <div>
      <button
        type="button"
        css={buttonCss}
        onClick={() => {
          toggle()
        }}
      >
        Toggle me
      </button>
      <p>
        You toggled me
        {count}
        times but now I am
        {`${get()}`}
      </p>
    </div>
  )
}

storiesOf('useBoolean', module).add('use case for useBoolean', () => <App />)
