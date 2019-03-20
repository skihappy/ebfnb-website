/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React, { useState, useEffect, useMemo } from 'react'
import useBoolean from '../hooks/useBoolean'

export default jsx

const App = () => {
  const { getBoolean, toggleBoolean, onBooleanChange } = useBoolean(
    false,
    'bool1'
  )
  const [count, setCount] = useState(0)

  useEffect(() => {
    return onBooleanChange(() => setCount(p => p + 1))
  }, [onBooleanChange])

  const isBooleanTrue = getBoolean()

  const buttonCss = useMemo(
    () => css`
      border: 2px solid black;
      color: ${isBooleanTrue ? 'red' : 'green'};
    `,
    [isBooleanTrue]
  )

  return (
    <div>
      <button type="button" css={buttonCss} onClick={toggleBoolean}>
        Toggle me
      </button>
      <p>
        {`You toggled me `}
        <strong>{count}</strong>
        {` times but now I am `}
        <strong>{isBooleanTrue.toString()}</strong>
      </p>
    </div>
  )
}

storiesOf('useBoolean', module).add('use case for useBoolean', () => <App />)
