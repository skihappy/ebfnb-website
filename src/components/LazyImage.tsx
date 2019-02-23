/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { ReactNode, useRef, useState, useEffect } from 'react'

export const jsxFix = jsx

const style = (element, prop) =>
  typeof getComputedStyle !== 'undefined'
    ? getComputedStyle(element, null).getPropertyValue(prop)
    : element.style[prop]

const overflow = element =>
  style(element, 'overflow') +
  style(element, 'overflow-y') +
  style(element, 'overflow-x')

// const scrollParent = element => {
//   if (!(element instanceof HTMLElement)) {
//     return window
//   }

//   let parent = element

//   while (parent) {
//     if (parent === document.body || parent === document.documentElement) {
//       break
//     }

//     if (!parent.parentNode) {
//       break
//     }

//     if (/(scroll|auto)/.test(overflow(parent))) {
//       return parent
//     }

//     parent = parent.parentNode
//   }

//   return window
// }

const LazyImage = ({
  src,
  placeholderSrc = '',
  rootMargin = '0px',
  alt,
  ...props
}: {
  src: string
  placeholderSrc: string
  rootMargin: string
  alt: string
}) => {
  const imgRef = useRef(undefined)
  const [currentSrc, setCurrentSrc] = useState(placeholderSrc)

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const observerCb = ([entry], observer) => {
        if (entry.isIntersecting) {
          setCurrentSrc(src)
          observer.unobserve(entry.target)
        }
      }

      const imageObserver = new IntersectionObserver(observerCb, {
        // root: scrollParent(imgRef.current),
        rootMargin,
      })
      imageObserver.observe(imgRef.current)
    }
  })

  if ('IntersectionObserver' in window) {
    return (
      <img
        ref={imgRef}
        src={currentSrc}
        css={css`
          background: #f1f1fa;
        `}
        alt={alt}
        {...props}
      />
    )
  }
  return <img src={src} alt={alt} {...props} />
}

export default LazyImage
