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

// const useSider = ({
//   side = Side.left,
//   size = 'fit-content',
//   isOpen = true,
//   ...attrs
// }: SiderProps) => {
//   const prevValues = useMemo({ isOpen })
//   const
//   const [fullDimention, controlledDimention] =
//     side === 'top' || side === 'bottom'
//       ? ['width', 'height']
//       : ['height', 'width']
//   const axis = side === 'top' || side === 'bottom' ? 'Y' : 'X'
//   const siderCss = [
//     css`
//       position:absolute;
//       ${fullDimention}: 100%;
//       max-${controlledDimention}: 100%;
//       ${controlledDimention}:${size};
//     `,
//     !isOpen &&
//       css`
//         ${controlledDimention}: 0px;
//       `,
//     // siderEffect({ side, action }),
//   ]

//   const opacityTo = opacity => keyframes`
//     to {opacity:${opacity}}
//   `
//   const scaleTo = scale => keyframes`
//     to {transform: scale${axis}(${scale})}
//   `
//   const slideOpen = keyframes`
//     to {transform: scale${axis}(1)}
//   `
//   const slideClosed = keyframes`
//     to {transform: scale${axis}(0)}
//   `
//   const animateOpen = `${scaleTo(1)} ${SLIDE_DURATION},${opacityTo(
//     0
//   )} ${CHANGE_OPACITY_DURATION}`

//   const animateClose = `${opacityTo(1)} ${CHANGE_OPACITY_DURATION},${scaleTo(
//     0
//   )} ${SLIDE_DURATION}`

//   const openCss = css`
//     animation: ${slideOpen} 2s, ${opacityTo(1)} 2s 2s;
//   `
//   const closedCss = css`
//     animation: ${opacityTo(0)} 2s, ${slideClosed} 2s 2s;
//   `
//   return [
//     css`
//       transform-origin: ${side};
//       animation-fill-mode: both;
//     `,
//     action === 'open' ? openCss : closedCss,
//   ]
// }

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
    position:absolute;
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
