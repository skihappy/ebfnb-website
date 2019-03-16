/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect, useMemo, useRef, ReactNode, memo } from 'react'

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

const useTempFocus = ({ element, isActive }) => {
  const memo = useMemo(
    {
      restoreFocusTo: null,
    },
    [true]
  )
  useEffect(() => {
    if (isActive) {
      memo.restoreFocusTo = document.activeElement
      if (element) {
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
    if (isActive && memo.lastChildFocused) {
      memo.lastChildFocused.focus()
    }
  }
  const onChildFocus = ({ target }) => {
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
  }, [true])

  return isActive
    ? css`
        &:not(:focus-within): {
          ${onEscapedFocusCss}
        }
      `
    : css``
}

const useTrappedTab = ({ ref, isActive }) => {
  const onKeyDown = e => {
    if (isActive && e.which === 9) {
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

      focusablesOutsideModal.forEach(
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

  const onEscape = e => {
    if (isActive && e.which === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [true])

  useEffect(() => {
    let element
    if (defaultFocusedElementRef.current) {
      element = defaultFocusedElementRef.current
    } else if (modalRef.current) {
      element = modalRef.current.querySelector(FOCUSABLE_SELECTORS)
    }
    useTempFocus({ element, isActive })
  }, [isActive])

  useTrappedTab({ ref: modalRef, isActive })
  const trappedFocusCss = useTrappedFocus({ ref: modalRef, isActive })

  const onFocusInsideModal = useMemo(
    () => ({ target }) => {
      console.log('onFocusInsideModal', target)
      memo.lastFocusedInsideModal = target
    },
    [true]
  )

  useEffect(() => {
    const focusablesOfModalParent = [
      ...modalRef.current.parentElement.querySelectorAll(FOCUSABLE_SELECTORS),
    ]
    const focusablesOfModal = [
      ...modalRef.current.querySelectorAll(FOCUSABLE_SELECTORS),
    ]
    const focusablesOutsideModal = focusablesOfModalParent.filter(
      el => !focusablesOfModal.includes(el)
    )

    /* 
    Deal with transfering focus
    on open - remember last focused element and transfer focus into modal
    on close - restore focus to the last focused in main
    */
    if (isOpen) {
      memo.lastFocusedElement = document.activeElement
      if (modalRef.current) {
        modalRef.current.addEventListener('transitionend', onEscapedFocus)
        if (defaultModalFocusedElementRef.current) {
          defaultModalFocusedElementRef.current.focus()
        } else if (focusablesOfModal[0]) {
          focusablesOfModal[0].focus()
        }
      }
      document.addEventListener('keydown', onEscape)
    } else {
      modalRef.current.removeEventListener('transitionend', onEscapedFocus)
      if (memo.lastFocusedElement) {
        memo.lastFocusedElement.focus()
        document.removeEventListener('keydown', onEscape)
      }
    }

    // on open - remove all focusable elements in main from tabbing sequence
    // on close - restore them back into tabbing sequence
    if (modalRef.current) {
      focusablesOutsideModal.forEach(
        isOpen
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
        isOpen &&
          css`
            &:not(:focus-within) {
              transform: translate(-50%, -50%) scale(0.9, 0.9);
              transition: transform 0.25s;
            }
          `,
      ],
      onKeyDown: onModalKeyDown,
      onFocus: onFocusInsideModal,
      ref: modalRef,
      ...restProps,
    }
  }

  return {
    modalOverlayProps,
    modalProps,
    defaultFocusedElementRef: defaultModalFocusedElementRef,
  }
}

export default useModal
