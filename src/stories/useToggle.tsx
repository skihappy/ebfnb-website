/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf, addDecorator } from '@storybook/react'
import React, { useState } from 'react'
import useToggle from '../hooks/useToggle'
import { withInfo } from '@storybook/addon-info'

export const jsxFix = jsx

const App = () => {
  const [toggleCount, setToggleCount] = useState(0)
  const [isToggled, toggleProps] = useToggle(false, {
    onToggle: () => setToggleCount(count => count + 1),
  })
  return (
    <div
      css={css`
        button[istoggled='true'] {
          color: red;
        }
        button[istoggled='false'] {
          color: green;
        }
      `}
    >
      <button
        type="button"
        {...toggleProps({
          css: css`
            border: 2px solid black;
          `,
        })}
      >
        Toggle me
      </button>
      <p>
        You toggled me
        {toggleCount}
        times but now I am
        {`${isToggled}`}
      </p>
    </div>
  )
}
const info = {
  text: `
  ~~~js
  App = () => {
    const [toggleCount, setToggleCount] = useState(0)
    const [isToggled, toggleProps] = useToggle(false, {
      onToggle: () => setToggleCount(count => count + 1),
    })
    return (
      <div
        css={css'
          button[istoggled='true'] {
            color: red;
          }
          button[istoggled='false'] {
            color: green;
          }
        '}
      >
        <button
          type="button"
          // onClick={() => console.log(isToggled)}
          {...toggleProps({
            css: css'
              border: 2px solid black;
            ',
          })}
        >
          Toggle me
        </button>
        <p
          css={css'
            color: {isToggled ? 'red' : 'green'};
          '}
        >
          You toggled me
          {toggleCount}
          times but now I am
          {isToggled}
        </p>
      </div>
    )
  }
  ~~~
  `,
}
storiesOf('useToggle', module)
  .addDecorator(withInfo)
  .add('use case for useToggle', () => <App />, { info })
