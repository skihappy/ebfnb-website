/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import bgImg from '../assets/movement-painting.jpg'

export const jsxFix = jsx

const Hero = () => (
  <img
    src={bgImg}
    alt="Movement painting by Keith McHenry"
    css={css`
      margin-top: -1rem;
      width: 100%;
    `}
  />
)

export default Hero
