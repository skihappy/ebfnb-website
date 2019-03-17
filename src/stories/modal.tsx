/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React, { useState, useEffect } from 'react'
import useModal from '../hooks/useModal'

export const jsxFix = jsx

const Modal = ({ onClose, isActive }) => {
  const { modalProps, defaultFocusedElementRef, modalOverlayProps } = useModal({
    onClose,
    isActive,
  })

  return (
    <React.Fragment>
      <div {...modalOverlayProps()} />
      <div {...modalProps()}>
        <div
          css={css`
            border: 2px solid red;
            background-color: white;
          `}
        >
          This is the modal
          <div>
            <input type="input" />{' '}
            <input type="input" ref={defaultFocusedElementRef} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
const App = () => {
  const [isActive, setIsActive] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsActive(true)}
        css={css`
          border: 2px solid red;
        `}
      >
        open
      </button>
      <input type="input" />
      <input type="input" />
      <Modal isActive={isActive} onClose={() => setIsActive(false)} />
    </div>
  )
}

storiesOf('modal', module).add('Simple modal', () => {
  return <App />
})
