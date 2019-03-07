/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React, { useState, useEffect, useMemo } from 'react'
import Sider from '../components/Sider'

export default jsx

const MenuItem = (props: any) => (
  <li>
    <button type="button" {...props} />
  </li>
)

const AnimatedSider = ({ side = 'left', isOpen = true, ...restProps }: any) => {
  console.log('animated', isOpen)
  const animationCss = css`
    transform-origin: ${side};
    transform: scale(${side === 'top' || side === 'bottom' ? '1,0' : '0,1'});
    transition: opacity 250ms, transform 250ms 250ms;
    opacity: 0;
    &[data-is-open] {
      transform: scale(1, 1);
      opacity: 1;
      transition: transform 250ms, opacity 250ms 250ms;
    }
  `
  return (
    <Sider
      css={animationCss}
      data-is-open={isOpen}
      {...{ side, isOpen, ...restProps }}
    />
  )
}

const App = ({ AppSider = Sider }: any) => {
  const [isSiderOpen, setIsSiderOpen] = useState(false)
  const toggleSider = () => setIsSiderOpen(!isSiderOpen)
  return (
    <div>
      {/* Header */}
      <nav
        css={css`
          height: 60px;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
        `}
      >
        <ul
          css={css`
            display: flex;
            list-style: none;
            button {
              border: 2px green;
              width: auto;
              margin: 10px;
              text-align: center;
            }
          `}
        >
          <MenuItem onClick={toggleSider}>
            {isSiderOpen ? 'close' : 'open'}
          </MenuItem>
          <MenuItem>Something else</MenuItem>
        </ul>
      </nav>

      {/** Content panel */}
      <div
        css={css`
          position: fixed;
          top: 60px;
          left: 0;
          width: 100%;
          height: 100%;
        `}
      >
        <p>whatzup</p>
        <AppSider
          isOpen={isSiderOpen}
          css={css`
            background-color: red;
            border: 1px;
          `}
        >
          <ul
            css={css`
              display: flex;
              flex-direction: column;
              list-style: none;
              button {
                border: 2px green;
                width: auto;
                margin: 10px;
                text-align: center;
              }
            `}
          >
            <MenuItem>Do this</MenuItem>
            <MenuItem>Do that</MenuItem>
          </ul>
        </AppSider>
      </div>
    </div>
  )
}

storiesOf('Sider', module)
  .add('A simple Sider', () => <App />)
  .add('An animated slider', () => <App AppSider={AnimatedSider} />)
