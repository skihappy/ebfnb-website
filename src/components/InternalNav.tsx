/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import {
  faChevronDown,
  faChevronUp,
  faListOl,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useTheme from '../hooks/useTheme'

export const jsxFix = jsx

const buttonSize = 40

const createCss = ({ colors }) => ({
  wrapper: css`
    display: grid;
    grid-template-areas: 'up' 'menu' 'down';
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
      {[
        { key: 'up', icon: faChevronUp },
        { key: 'menu', icon: faListOl },
        { key: 'down', icon: faChevronDown },
      ].map(({ key, icon }) => (
        <button key={key} css={buttonCss(key)} type="button">
          <FontAwesomeIcon icon={icon} />
        </button>
      ))}
    </div>
  )
}

export default InternalNav
