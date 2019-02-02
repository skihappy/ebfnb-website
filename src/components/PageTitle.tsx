/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect, ReactNode } from 'react'

export const jsxFix = jsx

const PageTitle = ({
  children,
  documentTitle = children.toString(),
}: {
  documentTitle?: string
  children: ReactNode
}) => {
  useEffect(() => {
    if (document) {
      document.title = `${documentTitle} | East Bay Food Not Bombs`
    }
  }, [children])
  return (
    <h1
      css={css`
        font-size: 2.5rem;
        font-weight: 400;
      `}
    >
      {children}
    </h1>
  )
}

export default PageTitle
