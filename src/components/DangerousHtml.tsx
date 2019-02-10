import { navigate } from '@reach/router'
import React, { useRef, useEffect } from 'react'

const clickListener = event => {
  const {
    defaultPrevented,
    button,
    metaKey,
    altKey,
    ctrlKey,
    shiftKey,
    target: { href },
  } = event
  const shouldNavigate =
    !defaultPrevented &&
    button === 0 &&
    !(metaKey || altKey || ctrlKey || shiftKey)
  if (shouldNavigate) {
    event.preventDefault()
    navigate(href)
  }
}

const hostname = window ? window.location.hostname : ''

const processInternalLinks = (
  operation: 'addEventListener' | 'removeEventListener',
  ref: React.MutableRefObject<any>
) =>
  ref.current.querySelectorAll('a').forEach(anchor => {
    if (hostname === anchor.hostname || !anchor.hostname.length) {
      anchor[operation]('click', clickListener)
    }
  })

const DangerousHtml = ({ html, ...props }: { html: string }) => {
  const ref = useRef(null)

  useEffect(() => {
    processInternalLinks('addEventListener', ref)
    return () => processInternalLinks('removeEventListener', ref)
  }, [ref.current])

  /* eslint-disable-next-line react/no-danger */
  return <div ref={ref} dangerouslySetInnerHTML={{ __html: html }} {...props} />
}

export default DangerousHtml
