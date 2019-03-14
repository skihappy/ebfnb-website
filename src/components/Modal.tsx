/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect, ReactNode } from 'react'

export const jsxFix = jsx

const Modal = (props: any) => {
  const { children } = props
  let focusedElement
  const onFocus = event => {
    focusedElement = event.target
  }
  return (
    <div
      css={css`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `}
      onFocus={onFocus}
    >
      {children}
    </div>
  )
}

export default Modal
