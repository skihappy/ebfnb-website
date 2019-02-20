import { storiesOf } from '@storybook/react'
import React from 'react'
import PageTitle from '../components/PageTitle'
import withNotes from '../../.storybook/notes-addon'

storiesOf('PageTitle', module)
  .addDecorator(withNotes)
  .add('is a happy title', () => <PageTitle>Happy Title</PageTitle>)
  .add(
    'is a list of items',
    () => (
      <PageTitle>
        <ul>
          <li>Item 1.</li>
          <li>Item 2.</li>
          <li>Item 3.</li>
          <li>Item 4.</li>
          <li>Item 5.</li>
          <li>Item 6.</li>
          <li>Item 7.</li>
          <li>Item 8.</li>
        </ul>
      </PageTitle>
    ),
    { notes: 'kjasdckasjdhf' }
  )
