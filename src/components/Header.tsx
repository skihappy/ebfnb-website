/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Link } from '@reach/router'
import LayoutContainer from './LayoutContainer'
import logo from '../assets/food-not-bombs.svg'

export const jsxFix = jsx

const routes = {
  '/volunteer': { text: 'Volunteer with Us', alwaysShow: true },
  '/eat': { text: 'Eat with Us', alwaysShow: true },
  '/blog': { text: 'Blog', alwaysShow: true },
  '/about': { text: 'About', alwaysShow: true },
}

const Logo = () => (
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

const Menu = () => (
  <ul
    css={css`
      display: grid;
      grid-area: menu;
      justify-items: right;
      place-items: bottom / center;
      list-style: none;
      text-align: center;
    `}
  >
    {Object.entries(routes).map(
      ([key, { text, alwaysShow = false }], index) => {
        return (
          <li
            css={css`
              grid-column-start: ${index + 1};
            `}
          >
            <Link
              to={key}
              key={key}
              data-nav-type={alwaysShow ? 'primary' : 'secondary'}
              css={css`
                display: block;
              `}
            >
              {text}
            </Link>
          </li>
        )
      }
    )}
  </ul>
)

const Header = () => {
  return (
    <header
      css={css`
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
