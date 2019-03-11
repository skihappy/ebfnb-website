/** @jsx jsx */
import { css, jsx, SerializedStyles, keyframes } from '@emotion/core'
import React, { ReactNode, useMemo } from 'react'

export const jsxFix = jsx

const SLIDE_DURATION = '.1s'
const CHANGE_OPACITY_DURATION = '.5s'

enum Side {
  top = 'top',
  right = 'right',
  bottom = 'bottom',
  left = 'left',
}
interface SiderProps {
  side?: Side
  size?: string
  isOpen?: boolean
  children?: any
}

const Sider = ({
  children = null,
  side = Side.left,
  size = 'fit-content',
  isOpen = true,
  ...attrs
}: SiderProps) => {
  const [fullDimention, controlledDimention] =
    side === 'top' || side === 'bottom'
      ? ['width', 'height']
      : ['height', 'width']

  const siderCss = css`
    ${side}:0;
    ${side === 'top' || side === 'bottom' ? 'left' : 'top'}:0;
  //  position:absolute;
    ${fullDimention}: 100%;
    max-${controlledDimention}: 100%;
    ${controlledDimention}:${isOpen ? size : 0};
    overflow:hidden;
  `

  return (
    <div css={siderCss} {...attrs}>
      {children}
    </div>
  )
}

export default Sider
