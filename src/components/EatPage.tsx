/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PageTitle from './PageTitle'

export const jsxFix = jsx

const articleCss = css`
  margin-top: 2rem;
  border-top: 2px dotted #ddd;
  h3 {
    margin-top: 0.5rem;
  }
`

const EatPage = () => (
  <React.Fragment>
    <PageTitle documentTitle="Eat with Us">
      Eat with East Bay Food Not Bombs
    </PageTitle>
    <p>We serve six days a week, rain or shine.</p>
    <article css={articleCss}>
      <h3>Monday – Friday, 3:00pm</h3>
      <p>People’s Park, Berkeley</p>
      <p>2556 Haste St. by the corner of Dwight Way & Telegraph Ave.</p>
    </article>
    <article css={articleCss}>
      <h3>Thursday, 1:30pm</h3> <p>National Recycling Center, Oakland</p>
      <p>1312 Kirkham St. by Mandela Pkwy and 14th St. (by the entrance.)</p>
    </article>
    <article css={articleCss}>
      <h3>Sunday, 3:30pm</h3> <p>Sutter Hotel, Oakland</p>
      <p>14th & Jefferson St.</p>
    </article>
  </React.Fragment>
)

export default EatPage
