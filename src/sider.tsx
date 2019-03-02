/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React, { useState, useEffect, useMemo } from 'react'
import Sider from './components/Sider'

export default jsx

const MenuItem = (props: any) => (
  <li>
    <button type="button" {...props} />
  </li>
)

const Header = ({ toggleSider, isSiderOpen }: any) => {
  const ulCss = css`
    display: flex;
    list-style: none;
    button {
      border: 2px green;
      width: auto;
      margin: 10px;
      text-align: center;
    }
  `
  return (
    <ul css={ulCss}>
      <MenuItem onClick={toggleSider}>
        {isSiderOpen ? 'close' : 'open'}
      </MenuItem>
      <MenuItem>Something else</MenuItem>
    </ul>
  )
}

const Content = ({ isSiderOpen, ...props }: any) => {
  const ulCss = css`
    display: flex;
    flex-direction: column;
    list-style: none;
    button {
      border: 2px green;
      width: auto;
      margin: 10px;
      text-align: center;
    }
  `
  return (
    <div {...props}>
      <Sider
        isOpen={isSiderOpen}
        css={css`
          backround-color: blue;
          border: 1px;
        `}
      >
        <ul css={ulCss}>
          <MenuItem>Do this</MenuItem>
          <MenuItem>Do that</MenuItem>
        </ul>
      </Sider>
    </div>
  )
}
const App = () => {
  const [isSiderOpen, setIsSiderOpen] = useState('false')
  const toggleSider = () => setIsSiderOpen(isOpen => !isOpen)
  return (
    <div>
      <Header {...{ isSiderOpen, toggleSider }} />
      <Content {...{ isSiderOpen }}>Whatzup</Content>
    </div>
  )
}

storiesOf('Sider', module).add('Right sider w/o animation', () => <App />)
