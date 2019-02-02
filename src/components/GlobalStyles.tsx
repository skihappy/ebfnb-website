/** @jsx jsx */
import { css, Global, jsx } from '@emotion/core'
import useTheme from '../hooks/use-theme'

export const jsxFix = jsx

const GlobalStyles = () => {
  const { fontDefault = 'sans-serif', fontHeading = 'serif' } = useTheme()

  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }

        body {
          font-family: ${fontDefault};
          overflow-y: scroll;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: ${fontHeading};
        }
      `}
    />
  )
}

export default GlobalStyles
