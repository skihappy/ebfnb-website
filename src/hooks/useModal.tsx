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
const useModal = () => {
  const defaultModalFocusedElementRef = useRef(null)
  const mainRef = useRef(null)
  const modalRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const memo = useMemo(
    () => ({
      lastFocusedElement: null,
    }),
    [true]
  )

  const closeModal = useMemo(
    () => () => {
      setIsOpen(false)
    },
    [true]
  )

  const openModal = useMemo(
    () => () => {
      setIsOpen(true)
    },
    [true]
  )

  const toggleModal = useMemo(
    () => () => {
      setIsOpen(state => !state)
    },
    [true]
  )

  const onModalKeyDown = useMemo(
    () => e => {
      if (!modalRef.current) {
        return
      }
      if (e.which === 9) {
        const { activeElement } = document
        const focusableElements = [
          ...modalRef.current.querySelectorAll(FOCUSABLE_SELECTORS),
        ]

        const firstFocusable = focusableElements[0]
        const lastFocusable = focusableElements[focusableElements.length - 1]
        console.log('rocket', document.activeElement, lastFocusable)

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
    },
    [true]
  )

  const onEscape = useMemo(
    () => e => {
      if (e.which === 27) {
        closeModal()
      }
    },
    [true]
  )

  useEffect(() => {
    /* 
    Deal with transfering focus
    on open - remember last focused element and transfer focus into modal
    on close - restore focus to the last focused in main
    */
    if (isOpen) {
      memo.lastFocusedElement = document.activeElement
      if (modalRef.current) {
        if (defaultModalFocusedElementRef.current) {
          defaultModalFocusedElementRef.current.focus()
        } else {
          const focusableElements = modalRef.current.querySelectorAll(
            FOCUSABLE_SELECTORS
          )
          if (focusableElements[0]) focusableElements[0].focus()
        }
      }
      document.addEventListener('keydown', onEscape)
    } else if (memo.lastFocusedElement) {
      memo.lastFocusedElement.focus()
      document.removeEventListener('keydown', onEscape)
    }

    // on open - remove all focusable elements in main from tabbing sequence
    // on close - restore them back into tabbing sequence
    if (mainRef.current) {
      mainRef.current
        .querySelectorAll(FOCUSABLE_SELECTORS)
        .forEach(
          isOpen
            ? el => el.setAttribute('tabindex', '-1')
            : el => el.removeAttribute('tabindex')
        )
    }
  }, [isOpen])

  const modalOverlayProps = (props = {}) => {
    const { opacity = '.5', ...restProps } = props
    return {
      css: css`
        display: ${isOpen ? 'block' : 'none'};
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

  const modalProps = (props = {}) => {
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
          display: ${isOpen ? 'block' : 'none'};
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
      ],
      onKeyDown: onModalKeyDown,
      ref: modalRef,
      ...restProps,
    }
  }

  const modalMainProps = (props = {}) => ({
    ref: mainRef,
    'aria-hidden': isOpen ? 'true' : 'false',
    css: css`
      z-index: 997;
    `,
    ...props,
  })

  return {
    modalOverlayProps,
    modalMainProps,
    modalProps,
    openModal,
    closeModal,
    toggleModal,
  }
}

export default useModal
