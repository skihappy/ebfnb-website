/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment } from 'react'
import InternalNav from './InternalNav'
import PageTitle from './PageTitle'
import sections from '../data/aboutContent'
import Article from './Article'
import DangerousHtml from './DangerousHtml'

export const jsxFix = jsx

const AboutPage = () => (
  <Fragment>
    <InternalNav sections={sections.map(({ id, title }) => ({ id, title }))} />
    <PageTitle documentTitle="About Us">
      About East Bay Food Not Bombs
    </PageTitle>
    {sections.map(({ id, title, content }) => (
      <Article key={id}>
        <h3>{title}</h3>
        <DangerousHtml html={content} />
      </Article>
    ))}
  </Fragment>
)

export default AboutPage
