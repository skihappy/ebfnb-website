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
  const navCss = css`
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  `

  return (
    <nav css={navCss}>
      <ul css={ulCss}>
        <MenuItem onClick={toggleSider}>
          {isSiderOpen ? 'close' : 'open'}
        </MenuItem>
        <MenuItem>Something else</MenuItem>
      </ul>
    </nav>
  )
}

const SideMenu = ({ isOpen }: any) => {
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
    <Sider
      isOpen={isOpen}
      css={css`
        background-color: red;
        border: 1px;
      `}
    >
      <ul css={ulCss}>
        <MenuItem>Do this</MenuItem>
        <MenuItem>Do that</MenuItem>
      </ul>
    </Sider>
  )
}

const App = () => {
  const [isSiderOpen, setIsSiderOpen] = useState(false)
  const toggleSider = () => setIsSiderOpen(!isSiderOpen)
  return (
    <div>
      <Header {...{ isSiderOpen, toggleSider }} />
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
        <SideMenu isOpen={isSiderOpen} />
      </div>
    </div>
  )
}

storiesOf('Sider', module).add('A simple Sider', () => <App />)
