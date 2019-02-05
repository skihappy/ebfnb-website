/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import InternalNav from './InternalNav'
import PageTitle from './PageTitle'
import sections from '../data/about-content'
import Article from './Article'
// import cookForPeaceImg from '../assets/cook-for-peace.jpg'

export const jsxFix = jsx

const AboutPage = () => (
  <Fragment>
    <InternalNav sections={sections.map(({ id, title }) => ({ id, title }))} />
    {/* <img
      src={cookForPeaceImg}
      css={css`
          float: right;
          max-width: 50%;
          margin-left: 1rem;
          border: 4px solid #000;
        `}
      alt="Food Not Bombs volunteers being arrested"
    /> */}
    <PageTitle documentTitle="About Us">
      About East Bay Food Not Bombs
    </PageTitle>
    {sections.map(({ id, title, content }) => (
      <Article key={id}>
        <h3>{title}</h3>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Article>
    ))}
  </Fragment>
)

export default AboutPage
