/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from '@reach/router'
import LayoutContainer from './LayoutContainer'
import logo from '../assets/food-not-bombs.svg'
import useRoutes from '../hooks/use-routes'
import useTheme from '../hooks/use-theme'

export const jsxFix = jsx

const Logo = () => {
  return (
    <Link
      to="/"
      data-alt="East Bay Food Not Bombs logo"
      css={css`
        background-image: url(${logo});
        background-repeat: no-repeat;
        background-size: contain;
        display: block;
        height: 60px;
        overflow: hidden;
        width: 60px;
        grid-area: logo;
      `}
      title="EBFNB | Home"
    >
      <span
        css={css`
          padding-left: 60px;
        `}
      >
        EBFNB
      </span>
    </Link>
  )
}

const Menu = () => {
  const { colors } = useTheme()
  const { getMenuLinks } = useRoutes()

  return (
    <ul
      css={css`
        display: grid;
        grid-area: menu;
        justify-items: right;
        margin: 0;
        padding: 0;
        place-items: top / center;
        list-style: none;
        text-align: center;
      `}
    >
      {getMenuLinks().map(({ key, to, label }, index) => {
        return (
          <li
            css={css`
              grid-column-start: ${index + 1};
              width: 100%;
              margin: 0;
              padding: 0;
            `}
            key={key}
          >
            <Link
              to={to}
              css={css`
                display: block;
                text-decoration: none;
                line-height: 70px;
                height: 60px;
                color: #000;
                font-size: 20px;
                border: 1px dotted transparent;
                &:hover {
                  text-shadow: 0px 0px 16px ${colors.orange};
                }
              `}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

const Header = () => {
  const { fontHeading } = useTheme()
  return (
    <header
      css={css`
        font-family: ${fontHeading};
        background-color: #fff;
        border-bottom: 1px solid #000;
        box-shadow: 2px 0px 4px 4px rgba(0, 0, 0, 0.5);
        height: 60px;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
      `}
    >
      <LayoutContainer
        tag="nav"
        customCss={css`
          bottom: 0;
          display: grid;
          grid-column-gap: 10px;
          grid-template-areas: 'logo menu toggle';
          grid-template-columns: 60px 1fr 60px;
          grid-template-rows: 60px;
          left: 0;
          place-items: top / right;
          position: absolute;
          right: 0;
          top: 0;
        `}
      >
        <Logo />
        <Menu />
      </LayoutContainer>
    </header>
  )
}

export default Header
