import React, { ReactNode, useRef } from 'react'

enum Side {
  top = 'Top',
  right = 'Right',
  bottom = 'Bottom',
  left = 'Left',
}
interface Transition {
  timingFunction?: string
  duration?: number
  delay?: number
}
interface Props {
  children?: ReactNode
  side?: Side
  width?: number | string
  isOpen?: boolean
  animation?: Animation
}

const Sider = (props: Props) => {
  const {
    children = null,
    side = Side.top,
    transition,
    width = 'auto',
    isOpen = true,
    ...attrs
  } = props
  const ref = useRef(undefined)

  let styles = {
    position: 'absolute',
  }

  const computedDimention = (dimention): number => {
    const box = ref.current.getBoundingClientRect()
    if (dimention === 'width') {
      return box.top - box.bottom
    }
    return box.right - box.left
  }

  if (side === Side.right || side === Side.left) {
    styles = {
      ...styles,
      height: '100%',
      width,
      maxWidth: '100%',
      [side]: isOpen ? 0 : -computedDimention('width'),
    }
    styles = { ...styles }
  } else {
    styles = {
      ...styles,
      width: '100%',
      height: width,
      maxHeight: '100%',
      [side]: `${isOpen ? 0 : -computedDimention('width')}`,
    }
  }
  if (transition) {
    const { timingFunction = '', duration = 0, delay = 0 } = transition
    styles = {
      ...styles,
      transition: `${side} ${duration} ${timingFunction} ${delay}`,
    }
  }
  return (
    <div ref={ref} styles={styles} {...attrs}>
      {children}
    </div>
  )
}

export default Sider
