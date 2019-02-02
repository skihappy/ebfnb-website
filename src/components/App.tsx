import React from 'react'
import Header from './Header'
import GlobalStyles from './GlobalStyles'
import Main from './Main'
import { UserProvider } from './UserContext'
import { ThemeProvider } from './ThemeContext'

const App = () => (
  <UserProvider>
    <ThemeProvider>
      <GlobalStyles />
      <Header />
      <Main />
    </ThemeProvider>
  </UserProvider>
)

export default App
