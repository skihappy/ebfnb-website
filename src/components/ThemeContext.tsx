import React, { ReactNode, Context } from 'react'

const serifFamily = 'Merriweather, serif'
const sansSerifFamily = `'Open Sans', sans-serif`

const orange = '#f70'

const theme = {
  fontSerif: serifFamily,
  fontSansSerif: sansSerifFamily,
  fontDefault: sansSerifFamily,
  fontHeading: serifFamily,
  colors: {
    orange,
  },
}

export const ThemeContext = React.createContext(theme)

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
)
