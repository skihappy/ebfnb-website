/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React, { useState, useContext, useEffect } from 'react'
import Sider from '../components/Sider'

export default jsx

const OPACITY_DURATION = '.8s'
const SCALE_DURATION = '.25s'

const SiderContext = React.createContext()

const MenuItem = (props: any) => (
  <li>
    <button type="button" {...props} />
  </li>
)

const Menu = () => (
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
)
const SideMenu = props => {
  const isOpen = useContext(SiderContext)

  return (
    <Sider
      {...props}
      isOpen={isOpen}
      css={css`
        background-color: red;
        border: 1px;
      `}
    >
      <Menu />
    </Sider>
  )
}

const AnimatedSideMenu = (props: any) => {
  const isOpen = useContext(SiderContext)

  return (
    <SideMenu
      css={css`
        transform-origin: left;
        transform: scale(0, 1);
        transition: opacity ${OPACITY_DURATION},
          transform ${SCALE_DURATION} ${OPACITY_DURATION};
        opacity: 0;
        width: fit-content;
        &[data-is-open='true'] {
          transform: scale(1, 1);
          opacity: 1;
          transition: transform ${SCALE_DURATION},
            opacity ${OPACITY_DURATION} ${SCALE_DURATION};
        }
      `}
      data-is-open={isOpen}
      {...{ ...props, side: 'left' }}
    />
  )
}

const App = ({ children }: any) => {
  const [isSiderOpen, setIsSiderOpen] = useState(false)

  return (
    <SiderContext.Provider value={isSiderOpen}>
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
            <MenuItem
              onClick={() => {
                setIsSiderOpen(state => !state)
              }}
            >
              {isSiderOpen ? 'close' : 'open'}
            </MenuItem>
            <MenuItem>Something else</MenuItem>
          </ul>
        </nav>

        {/** Content container */}
        <div
          css={css`
            position: fixed;
            top: 60px;
            left: 0;
            width: 100%;
            height: 100%;
          `}
        >
          {children}
        </div>
      </div>
    </SiderContext.Provider>
  )
}

storiesOf('Sider', module)
  .add('Fixed content, non-animated sider', () => (
    <App>
      <p>whatzup</p>
      <SideMenu />
    </App>
  ))
  .add('Fixed content, animated sider', () => (
    <App>
      <p>whatzup</p>
      <AnimatedSideMenu />
    </App>
  ))
  .add('Sliding content, animated sider', () => (
    <App>
      <div
        css={css`
          width: 100%;
          display: grid;
          grid-template-columns: min-content auto;
          grid-template-rows: 1fr;
          grid-template-columns: min-content auto;
        `}
      >
        <AnimatedSideMenu
          css={css`
            float: left;
          `}
        />
        <p>whatzup</p>
      </div>
    </App>
  ))
