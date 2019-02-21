// /** @jsx jsx */
// import { css, jsx } from '@emotion/core'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
// import useBoolean, { useBooleanListener } from '../hooks/useBoolean'

export const jsxFix = jsx

// const App = () => {
//   const { get, toggle } = useBoolean(false, 'bool1')
//   const [count, setCount] = useState(0)
//   useBooleanListener('bool1', 'onChange', () => setCount(count => count + 1))
//   const buttonCss = css`
//     border: 2px solid black;
//     color: ${get() ? 'red' : 'green'};
//   `
//   return (
//     <div>
//       <button
//         type="button"
//         css={buttonCss}
//         onClick={() => {
//           toggle()
//         }}
//       >
//         Toggle me
//       </button>
//       <p>
//         You toggled me
//         {count}
//         times but now I am
//         {`${get()}`}
//       </p>
//     </div>
//   )
// }

storiesOf('useBoolean', module).add('use case for useBoolean', () => (
  <h1>ajhscd</h1>
))
