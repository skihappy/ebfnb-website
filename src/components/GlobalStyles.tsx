/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import useTheme from '../hooks/use-theme'

export const jsxFix = jsx

const GlobalStyles = () => {
  const { font } = useTheme()

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        body {
          font-family: ${font.family.default};
          overflow-y: scroll;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${font.family.heading};
        }

        img,
        video,
        iframe {
          max-width: 100%;
        }
      `}
    />
  )
}

export default GlobalStyles
