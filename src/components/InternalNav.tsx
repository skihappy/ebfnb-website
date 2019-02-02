/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import {
  faChevronDown,
  faChevronUp,
  faListOl,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { string } from 'prop-types'
import useTheme from '../hooks/use-theme'

export const jsxFix = jsx

const buttonSize = 40

const createCss = ({ colors }) => ({
  wrapper: css`
    display: grid;
    grid-template-areas: 'up' 'list' 'down';
    grid-template-rows: repeat(3, ${buttonSize});
    grid-template-columns: ${buttonSize};
    font-size: ${buttonSize};
    grid-gap: 10px;
    position: fixed;
    right: 5px;
    top: 80px;
  `,
  button: gridArea => css`
    background-color: #fff;
    // line-height: ${buttonSize};
    display: block;
    height: ${buttonSize}px;
    width: ${buttonSize}px;
    border-radius: 9999px;
    grid-area: ${gridArea};
    overflow: hidden;
    border: 2px solid #000;
    color: #000;
    padding: 0;
    &:hover {
      background-color: ${colors.orange};
    }
  `,
})

const InternalNav = ({
  sections,
}: {
  sections: { id: string; title: string }[]
}) => {
  const theme = useTheme()
  const { wrapper: wrapperCss, button: buttonCss } = createCss(theme)
  return (
    <div css={wrapperCss}>
      <button css={buttonCss('up')} type="button">
        <FontAwesomeIcon icon={faChevronUp} />
      </button>
      <button css={buttonCss('list')} type="button">
        <FontAwesomeIcon icon={faListOl} />
      </button>
      <button css={buttonCss('down')} type="button">
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
    </div>
  )
}

export default InternalNav
