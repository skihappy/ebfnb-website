/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import LazyImage from '../components/LazyImage'
import omniKitchen from '../../public/images/omni-kitchen.jpg'
import packed from '../../public/images/packed.png'
import soon from '../../public/images/pp-50-soon.jpg'
import immigrant from '../../public/images/immigrant.jpg'

export default jsx

const images = [
  {
    src: omniKitchen,
    alt: 'Artwork for the Omni Commons Kitchen fundraiser',
  },
  {
    src: packed,
    alt: 'A packed truck on it’s way to deliver hot food.',
  },
  {
    src: soon,
    alt: 'Flyer for People’s Park 50th Anniversary',
  },
  {
    src: immigrant,
    alt:
      'Rosa, an undocumented immigrant who wants her last name withheld, used to get about $190 per month from SNAP, but stopped taking benefits for fear of deportation. Pictured on May 17, 2017.',
  },
]
storiesOf('LazyImage', module).add('Same story, its lazy.', () => (
  <div
    css={css`
      height: 200px;
      overflow: scroll;
    `}
  >
    {images.map(({ src, alt }) => {
      return (
        <LazyImage
          key={src}
          alt={alt}
          src={src}
          css={css`
            height: 100px;
            display: block;
            margin: 20px;
          `}
        />
      )
    })}
  </div>
))
