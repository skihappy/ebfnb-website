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
  <article id={id}>
    <h3>{title}</h3>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: content }} />
  </article>
)

export default PageArticle
