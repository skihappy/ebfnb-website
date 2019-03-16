/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import PageTitle from '../components/PageTitle'
import useModal from '../hooks/useModal'

export const jsxFix = jsx

const Modal = ({ onClose, isOpen }) => {
  const { modalProps, defaultFocusedElementRef, modalOverlayProps } = useModal({
    onClose,
    isOpen,
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
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        css={css`
          border: 2px solid red;
        `}
      >
        open
      </button>
      <input type="input" />
      <input type="input" />
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

storiesOf('modal', module).add('Simple modal', () => {
  return <App />
})
