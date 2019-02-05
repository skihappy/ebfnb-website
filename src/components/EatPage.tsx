/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import PageTitle from './PageTitle'

export const jsxFix = jsx

const defaultCss = css`
  margin: 1rem auto 5rem;
  h3 {
    border-bottom: 2px dotted #ddd;
    margin-top: 0.5rem;
  }
`

const imageRightCss = [
  defaultCss,
  css`
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: 3fr 2fr;
    grid-template-rows: 7rem 1rem 1rem 3rem;
    h3 {
      margin-top 2rem;
    }
    h3,
    p {
      grid-row-start: auto;
      grid-row-end: auto;
      grid-column-start: 1;
      grid-column-end: 1;
    }
    img {
      grid-row-start: 1;
      grid-row-end: 4;
      grid-column-start: 2;
      grid-column-end: 2;
    }
  `,
]

const imageLeftCss = [
  defaultCss,
  css`
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: 7rem 1rem 1rem 3rem;
    h3 {
      margin-top 2rem;
    }
    h3,
    p {
      grid-row-start: auto;
      grid-row-end: auto;
      grid-column-start: 2;
      grid-column-end: 2;
    }
    img {
      grid-row-start: 1;
      grid-row-end: 4;
      grid-column-start: 1;
      grid-column-end: 1;
    }
  `,
]

const EatPage = () => (
  <React.Fragment>
    <PageTitle documentTitle="Eat with Us">
      Eat with East Bay Food Not Bombs
    </PageTitle>
    <p>We serve six days a week, rain or shine.</p>
    <article css={imageRightCss}>
      <h3>Monday – Friday, 3:00pm</h3>
      <p>People’s Park, Berkeley</p>
      <p>2556 Haste St. by the corner of Dwight Way & Telegraph Ave.</p>
      <img
        src="/images/serving-food-in-peoples-park.jpg"
        alt="EBFNB serving food in People's Park"
      />
    </article>
    <article css={imageLeftCss}>
      <h3>Thursday, 1:30pm</h3>
      <p>National Recycling Center, Oakland</p>
      <p>1312 Kirkham St. by Mandela Pkwy and 14th St. (by the entrance.)</p>
      <img
        src="/images/serving-at-west-oakland-recycling.jpg"
        alt="EBFNB serving food in People's Park"
      />
    </article>
    <article css={imageRightCss}>
      <h3>Sunday, 3:30pm</h3>
      <p>Sutter Hotel, Oakland</p>
      <p>14th & Jefferson St.</p>
      <img
        src="/images/fruit-juggling.jpg"
        alt="EBFNB serving food in People's Park"
      />
    </article>
  </React.Fragment>
)

export default EatPage
