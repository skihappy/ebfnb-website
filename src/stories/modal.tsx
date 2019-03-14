/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React from 'react'
import PageTitle from '../components/PageTitle'
import useModal from '../hooks/useModal'

export const jsxFix = jsx

const App = () => {
  const {
    toggleModal,
    modalProps,
    modalMainProps,
    modalOverlayProps,
  } = useModal()
  return (
    <div>
      <div {...modalMainProps()}>
        <button
          type="button"
          onClick={() => toggleModal()}
          css={css`
            border: 2px solid red;
          `}
        >
          Toggle without fear
        </button>
        <input type="input" />
        <input type="input" />
      </div>
      <div {...modalOverlayProps()} />
      <div {...modalProps()}>
        This is the modal without any fear <input type="input" />{' '}
        <input type="input" />
      </div>
    </div>
  )
}

storiesOf('modal', module).add('Simple modal', () => {
  return <App />
})
