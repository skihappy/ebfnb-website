/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

export const jsxFix = jsx

const PageArticle = ({
  id,
  title,
  content,
}: {
  id: string
  title: string
  content: string
}) => (
  <article
    id={id}
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
    <h3>{title}</h3>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </article>
)

export default PageArticle
