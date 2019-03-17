/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect, useState, useMemo, useRef, ReactNode } from 'react'

export const jsxFix = jsx

const FOCUSABLE_SELECTORS = `
  a[href], 
  area[href], 
  input:not([disabled]), 
  select:not([disabled]), 
  textarea:not([disabled]), 
  button:not([disabled]), 
  iframe, 
  embed, 
  *[tabindex], 
  *[contenteditable]
`

const useTempFocus = ({ ref, isActive }) => {
  const memo = useMemo(
    () => ({
      restoreFocusTo: null,
    }),
    [true]
  )
  useEffect(() => {
    if (isActive) {
      memo.restoreFocusTo = document.activeElement
      if (ref.current) {
        const element = ref.current.matches(FOCUSABLE_SELECTORS)
          ? ref.current
          : ref.current.querySelector(FOCUSABLE_SELECTORS)
        element.focus()
      }
    } else if (memo.restoreFocusTo) {
      memo.restoreFocusTo.focus()
    }
  }, [isActive])
}

const useTrappedFocus = ({
  isActive,
  ref,
  onEscapedFocusCss = css`
    transform: scale(0.95, 0.95);
    transition: transform 0.25s;
  `,
}) => {
  const memo = useMemo(
    () => ({
      lastChildFocused: null,
    }),
    [true]
  )

  const onEscapedFocus = () => {
    console.log(isActive, memo.lastChildFocused)
    if (isActive && memo.lastChildFocused) {
      memo.lastChildFocused.focus()
    }
  }
  const onChildFocus = ({ target }) => {
    console.log('onChildFocus')
    memo.lastChildFocused = target
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('transitionend', onEscapedFocus)
      ref.current.addEventListener('focusin', onChildFocus)
      return () => {
        ref.current.removeEventListener('transitionend', onEscapedFocus)
        ref.current.removeEventListener('focusin', onChildFocus)
      }
    }
  }, [isActive])

  return isActive
    ? css`
        &:not(:focus-within): {
          transform: scale(0.95, 0.95);
          transition: transform 0.25s;
        //  ${onEscapedFocusCss}
        }
      `
    : css``
}

const useTrappedTab = ({ ref, isActive }) => {
  const onKeyDown = e => {
    if (isActive && e.which === 9) {
      const { activeElement } = document
      const focusables = [...ref.current.querySelectorAll(FOCUSABLE_SELECTORS)]
      const firstFocusable = focusables[0]
      const lastFocusable = focusables[focusables.length - 1]

      if (e.shiftKey) {
        if (activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable.focus()
        }
      } else if (activeElement === lastFocusable) {
        e.preventDefault()
        firstFocusable.focus()
      }
    }
  }

  useEffect(() => {
    if (ref.current) {
      const focusablesOfParent = [
        ...ref.current.parentElement.querySelectorAll(FOCUSABLE_SELECTORS),
      ]
      const focusablesInside = [
        ...ref.current.querySelectorAll(FOCUSABLE_SELECTORS),
      ]
      const focusablesOutside = focusablesOfParent.filter(
        el => !focusablesInside.includes(el)
      )

      focusablesOutside.forEach(
        isActive
          ? el => {
              el.setAttribute('tabindex', '-1')
              if (el.getAttribute('aria-hidden') === 'true') {
                el.setAttribute('data-aria-hidden-true', '')
              }
              el.setAttribute('aria-hidden', 'true')
            }
          : el => {
              el.removeAttribute('tabindex')
              if (!el.hasAttribute('data-aria-hidden-true')) {
                el.removeAttribute('aria-hidden')
              } else {
                el.removeAttribute('data-aria-hidden-true')
              }
            }
      )

      ref.current.addEventListener('keydown', onKeyDown)
      return () => {
        if (ref.current) {
          ref.current.removeEventListener('keydown', onKeyDown)
        }
      }
    }
  }, [isActive])
}

const useModal = ({ onClose = () => {}, isActive }) => {
  const defaultFocusedElementRef = useRef(null)
  const modalRef = useRef(null)

  useEffect(() => {
    const onEscape = e => {
      if (isActive && e.which === 27) {
        onClose()
      }
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [isActive])

  const refToFocus = defaultFocusedElementRef
    ? defaultFocusedElementRef
    : modalRef

  useTempFocus({ ref: refToFocus, isActive })

  useTrappedTab({ ref: modalRef, isActive })
  const trappedFocusCss = useTrappedFocus({ ref: modalRef, isActive })
  console.log(trappedFocusCss)
  const modalOverlayProps = (props: any = {}) => {
    const { opacity = '.5', ...restProps } = props
    return {
      css: css`
        display: ${isActive ? 'block' : 'none'};
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        opacity: ${opacity};
        background-color: #7777;
        z-index: 998;
      `,
      ...restProps,
    }
  }

  const modalProps = (props: any = {}) => {
    const {
      width = '60%',
      height,
      offsetX = '0px',
      offsetY = '0px',
      maxWidth = '100%',
      maxHeight = '100%',
      ...restProps
    } = props
    return {
      css: [
        css`
          display: ${isActive ? 'block' : 'none'};
          position: fixed;
          width: ${width};
          max-width: ${maxWidth};
          max-height: ${maxHeight};
          top: calc(50% + ${offsetY});
          left: calc(50% + ${offsetX});
          transform: translate(-50%, -50%);
          z-index: 999;
        `,
        height &&
          css`
            height: ${height};
          `,
        trappedFocusCss,
      ],
      ref: modalRef,
      ...restProps,
    }
  }

  return {
    modalOverlayProps,
    modalProps,
    defaultFocusedElementRef,
  }
}

export default useModal
