/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { ReactNode } from 'react'

export const jsxFix = jsx

const Article = ({ key, children }: { key: string; children: ReactNode }) => (
  <article
    id={key}
    css={css`
      img {
        width: 100%;
        max-width: 400px;
        border: 8px solid black;
        float: right;
        margin: 1rem 0 1rem 1rem;
      }
    `}
  >
    {children}
  </article>
)

export default Article
