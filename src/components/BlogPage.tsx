/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import { Link, Router, RouteComponentProps } from '@reach/router'
import PageTitle from './PageTitle'
import data from '../data/blog-content'
import stripHtml from '../other/stripHtml'
import Article from './Article'

export const jsxFix = jsx

const TEASER_LENGTH = 200

type Route<P> = (props: RouteComponentProps<P>) => JSX.Element

const getTeaserContent = content => {
  const strippedContent = stripHtml(content).trim()
  const slicedContent = strippedContent.slice(0, TEASER_LENGTH - 3)
  const teaserContentArray = slicedContent.split(' ')
  teaserContentArray.pop()

  if (strippedContent.length <= TEASER_LENGTH) {
    return strippedContent
  }

  if (strippedContent.charAt(TEASER_LENGTH - 3) === ' ') {
    return `${slicedContent}... `
  }

  return `${teaserContentArray.join(' ')}... `
}

const BlogTeaser = ({ slug, title, date, content, sticky, img }) => (
  <article
    css={css`
      height: 8rem;
    `}
  >
    <h3
      css={css`
        margin-bottom: 0.25rem;
        border-bottom: 2px dotted #d4d4d4;

        &::before {
          content: '${sticky ? '* ' : ''}';
        }
      `}
    >
      <Link to={slug}>{title}</Link>
    </h3>
    <p
      css={css`
        margin-top: 0.25rem;
        padding-right: 25%;
        background-image: url(${img.src});
        background-position: right center;
        background-size: 23% auto;
        background-repeat: no-repeat;
      `}
    >
      <strong>{date} &mdash; </strong>
      {getTeaserContent(content)}
      <Link to={slug}>Read&nbsp;more&nbsp;&raquo;</Link>
    </p>
  </article>
)

// const BlogPost: Route = ({ slug, title, date, content, img }) => (
const BlogPost: Route<{ id: string }> = ({ id }) => {
  const { title, date, content, img } = data
    .filter(({ slug }) => slug === id)
    .pop()
  return (
    <Article key={id}>
      <h3>{title}</h3>
      <p>{date}</p>
      <img src={img.src} alt={img.alt} />
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </Article>
  )
}

const BlogIndex: Route<{}> = () => {
  const posts = data.sort((a, b) => {
    if (a.sticky || a.date > b.date) {
      return -1
    }
    if (b.sticky || b.date > a.date) {
      return 1
    }
    return 0
  })
  return (
    <React.Fragment>
      <PageTitle documentTitle="Blog">East Bay Food Not Bombs Blog</PageTitle>
      <div>
        <ul
          css={css`
            list-style: none;
            padding: 0;
            margin: 0;
          `}
        >
          {posts.map(post => (
            <li>
              <BlogTeaser {...post} />
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  )
}

const BlogPage = () => (
  <Router>
    <BlogIndex path="/" />
    <BlogPost path="/:id" />
  </Router>
)

export default BlogPage
