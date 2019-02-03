import React from 'react'
import Header from './Header'
import GlobalStyles from './GlobalStyles'
import Main from './Main'
import { CurrentUserProvider } from './CurrentUserContext'
import { ThemeProvider } from './ThemeContext'

const App = () => (
  <CurrentUserProvider>
    <ThemeProvider>
      <GlobalStyles />
      <Header />
      <Main />
    </ThemeProvider>
  </CurrentUserProvider>
)

export default App
