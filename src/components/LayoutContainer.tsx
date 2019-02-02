/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { ReactNode } from 'react'

export const jsxFix = jsx

const LayoutContainer = ({
  children = null,
  customCss = css``,
  tag: Tag = 'div',
}: {
  children?: ReactNode
  customCss?: SerializedStyles
  tag?: string
}) => (
  <Tag
    css={[
      customCss,
      css`
        max-width: 60rem;
        margin-left: auto;
        margin-right: auto;
      `,
    ]}
  >
    {children}
  </Tag>
)

export default LayoutContainer
